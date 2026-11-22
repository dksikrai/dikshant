import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { m as motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, CheckCircle2, Loader2, Mail, ShieldCheck, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { toast } from 'sonner';
import { siteConfig } from '@/config/site.js';
import { consumeContactIntent } from '@/lib/contactIntent.js';

/** The enquiry as a WhatsApp message (WhatsApp *bold* markup) and as plain text for email. */
const formatEnquiry = (d, bold = true) => {
  const b = (s) => (bold ? `*${s}*` : s);
  return [
    bold ? '*New enquiry from your portfolio*' : 'New enquiry from your portfolio',
    '',
    `${b('Type:')} ${d.inquiry}`,
    `${b('Subject:')} ${d.subject}`,
    `${b('Name:')} ${d.name}`,
    `${b('Email:')} ${d.email}`,
    d.company ? `${b('Company:')} ${d.company}` : null,
    '',
    d.message,
  ]
    .filter((line) => line !== null)
    .join('\n');
};

// Web3Forms emails every enquiry to you server-side (free key from web3forms.com, set in .env).
// The key is meant to be public. Without it, WhatsApp still works and email falls back to the visitor's mail app.
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
const HAS_KEY = Boolean(ACCESS_KEY) && ACCESS_KEY !== 'YOUR_ACCESS_KEY_HERE';

const deliverByEmail = async (d) => {
  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: ACCESS_KEY,
      subject: `[${d.inquiry}] ${d.subject}`,
      from_name: d.name,
      email: d.email,
      name: d.name,
      company: d.company || '-',
      message: d.message,
      botcheck: '',
    }),
    keepalive: true,
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message || 'Email delivery failed');
};

const MESSAGE_MIN = 20;
const MESSAGE_MAX = 1000;

const INQUIRY_TYPES = [
  { value: 'Project', label: 'Project' },
  { value: 'Consulting', label: 'Consulting' },
  { value: 'Job opportunity', label: 'Job' },
  { value: 'Other', label: 'Other' },
];

const formSchema = z.object({
  inquiry: z.enum(['Project', 'Consulting', 'Job opportunity', 'Other']),
  name: z.string().trim().min(2, 'Please enter your name.').max(80, 'That name is too long.'),
  email: z.string().trim().email('Please enter a valid email address, e.g. name@company.com.'),
  company: z.string().trim().max(100, 'That is too long.').optional(),
  subject: z.string().trim().min(5, 'Please add a short subject (at least 5 characters).').max(120, 'Keep the subject under 120 characters.'),
  message: z
    .string()
    .trim()
    .min(MESSAGE_MIN, `Please share a few more details (at least ${MESSAGE_MIN} characters).`)
    .max(MESSAGE_MAX, `Please keep your message under ${MESSAGE_MAX} characters.`),
  // Honeypot: real users never see or fill this field.
  botcheck: z.string().optional(),
});

/** Label + control + hint/error, wired for screen readers. */
const Field = ({ id, label, required, optional, hint, error, className = '', children }) => (
  <div className={`space-y-2 ${className}`}>
    <div className="flex items-baseline justify-between gap-2">
      <Label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="ml-0.5 text-primary" aria-hidden="true">*</span>}
      </Label>
      {optional && <span className="text-xs text-muted-foreground">Optional</span>}
    </div>
    {children}
    <AnimatePresence initial={false} mode="wait">
      {error ? (
        <motion.p
          key="error"
          id={`${id}-error`}
          role="alert"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="text-[13px] leading-snug text-red-400"
        >
          {error}
        </motion.p>
      ) : hint ? (
        <motion.p
          key="hint"
          id={`${id}-hint`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-[13px] leading-snug text-muted-foreground"
        >
          {hint}
        </motion.p>
      ) : null}
    </AnimatePresence>
  </div>
);

const controlClass = (error) =>
  `glass-input h-12 sm:h-11 rounded-xl px-3.5 text-foreground placeholder:text-muted-foreground/70 ${
    error ? 'border-red-400/60 focus-visible:border-red-400/80 focus-visible:shadow-[0_0_0_3px_rgba(248,113,113,0.2)]' : ''
  }`;

const describedBy = (id, error, hint) => (error ? `${id}-error` : hint ? `${id}-hint` : undefined);

const ContactForm = () => {
  // After submit: links the visitor can use to finish sending (WhatsApp is primary, email is the fallback)
  const [handoff, setHandoff] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: 'onTouched',
    defaultValues: { inquiry: 'Project', name: '', email: '', company: '', subject: '', message: '', botcheck: '' },
  });

  // CTAs elsewhere on the page can pre-fill the inquiry type and subject.
  useEffect(() => {
    const apply = ({ inquiry, subject }) => {
      if (inquiry) setValue('inquiry', inquiry);
      if (subject) setValue('subject', subject, { shouldDirty: true });
    };
    const pending = consumeContactIntent();
    if (pending) apply(pending);
    const onPrefill = (e) => { consumeContactIntent(); apply(e.detail || {}); };
    window.addEventListener('contact:prefill', onPrefill);
    return () => window.removeEventListener('contact:prefill', onPrefill);
  }, [setValue]);

  const messageLength = (watch('message') || '').length;

  const onSubmit = async (data, channel) => {
    if (data.botcheck) return; // bot: silently drop

    const waUrl = siteConfig.whatsappUrlFor(formatEnquiry(data, true));
    const mailUrl = siteConfig.mailtoFor({
      subject: `[${data.inquiry}] ${data.subject}`,
      body: formatEnquiry(data, false),
    });

    if (channel === 'email') {
      if (HAS_KEY) {
        try {
          await deliverByEmail(data);
          setHandoff({ kind: 'emailed', waUrl, mailUrl });
          reset();
        } catch {
          toast.error('Could not send right now. Please use WhatsApp or your mail app instead.');
          setHandoff({ kind: 'mailto', waUrl, mailUrl });
        }
        return;
      }
      window.location.href = mailUrl; // opens the visitor's mail app
      setHandoff({ kind: 'mailto', waUrl, mailUrl });
      reset();
      return;
    }

    // WhatsApp: also keep a copy by email on our side, so the lead is not lost if Send is never pressed.
    if (HAS_KEY) deliverByEmail(data).catch(() => {});

    // Some browsers block pop-ups, so the confirmation screen always has a button that opens WhatsApp too.
    const win = window.open(waUrl, '_blank');
    if (win) win.opener = null;
    setHandoff({ kind: 'whatsapp', opened: Boolean(win), waUrl, mailUrl });
    reset();
  };

  if (handoff) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className="flex flex-col items-center justify-center gap-4 py-10 text-center"
        role="status"
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 300, damping: 16 }}
          className="flex h-16 w-16 items-center justify-center rounded-full glass-pill"
        >
          <CheckCircle2 className="h-8 w-8 text-emerald-400" />
        </motion.span>
        <h3 className="text-xl font-bold text-foreground">
          {handoff.kind === 'emailed' ? 'Message sent' : handoff.kind === 'mailto' ? 'Almost there' : 'Your message is ready'}
        </h3>
        <p className="max-w-sm text-sm text-muted-foreground m-0">
          {handoff.kind === 'emailed'
            ? "Thanks! I've received your message and will reply by email within one business day."
            : handoff.kind === 'mailto'
              ? 'Your mail app should have opened with the message written. Press Send there to deliver it.'
              : handoff.opened
                ? 'WhatsApp should have opened with your message filled in. Press Send there to deliver it. It is not sent until you do.'
                : 'Tap the button below to open WhatsApp with your message filled in, then press Send to deliver it.'}
        </p>
        <div className="flex w-full max-w-xs flex-col gap-2.5">
          {handoff.kind !== 'emailed' && (
            <Button asChild className="h-12 rounded-full font-semibold shadow-lg shadow-primary/25">
              <a href={handoff.kind === 'mailto' ? handoff.mailUrl : handoff.waUrl} target={handoff.kind === 'mailto' ? undefined : '_blank'} rel="noopener noreferrer">
                {handoff.kind === 'mailto' ? <Mail /> : <MessageCircle />}
                {handoff.kind === 'mailto' ? 'Open mail app' : 'Open WhatsApp'}
              </a>
            </Button>
          )}
          {handoff.kind === 'whatsapp' && (
            <Button asChild variant="glass" className="h-11 rounded-full">
              <a href={handoff.mailUrl}>
                <Mail />
                Send by email instead
              </a>
            </Button>
          )}
          {handoff.kind !== 'whatsapp' && (
            <Button asChild variant="glass" className="h-11 rounded-full">
              <a href={handoff.waUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle />
                {handoff.kind === 'emailed' ? 'Also message on WhatsApp' : 'Use WhatsApp instead'}
              </a>
            </Button>
          )}
          <Button variant="ghost" className="rounded-full text-muted-foreground" onClick={() => setHandoff(null)}>
            <ArrowLeft />
            {handoff.kind === 'emailed' ? 'Send another message' : 'Back to the form'}
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit((d) => onSubmit(d, 'whatsapp'))} className="space-y-6" aria-describedby="contact-form-note">
      {/* Inquiry type: iOS-style segmented control */}
      <div className="space-y-2">
        <Label id="inquiry-label" className="text-sm font-medium text-foreground">
          What is this about?
        </Label>
        <Controller
          control={control}
          name="inquiry"
          render={({ field }) => (
            <ToggleGroup
              type="single"
              value={field.value}
              onValueChange={(v) => v && field.onChange(v)} // a segmented control always has a selection
              aria-labelledby="inquiry-label"
              className="glass-pill w-full justify-between gap-0.5 rounded-full p-1 sm:w-fit sm:justify-start"
            >
              {INQUIRY_TYPES.map((t) => (
                <ToggleGroupItem
                  key={t.value}
                  value={t.value}
                  aria-label={t.value}
                  className="relative h-11 flex-1 rounded-full px-4 text-[13px] font-medium text-foreground/60 hover:bg-transparent hover:text-foreground data-[state=on]:bg-transparent data-[state=on]:text-foreground sm:h-9 sm:flex-none"
                >
                  {field.value === t.value && (
                    <motion.span
                      layoutId="inquiry-thumb"
                      className="absolute inset-0 rounded-full border border-white/20 bg-white/[0.14] shadow-[0_2px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.25)]"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative z-10">{t.label}</span>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          )}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Field id="name" label="Full name" required error={errors.name?.message}>
          <Input
            id="name"
            autoComplete="name"
            autoCapitalize="words"
            enterKeyHint="next"
            placeholder="Jane Smith"
            aria-invalid={!!errors.name}
            aria-describedby={describedBy('name', errors.name)}
            className={controlClass(errors.name)}
            {...register('name')}
          />
        </Field>

        <Field id="email" label="Email" required error={errors.email?.message}>
          <Input
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="next"
            placeholder="jane@company.com"
            aria-invalid={!!errors.email}
            aria-describedby={describedBy('email', errors.email)}
            className={controlClass(errors.email)}
            {...register('email')}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Field id="company" label="Company" optional error={errors.company?.message}>
          <Input
            id="company"
            autoComplete="organization"
            enterKeyHint="next"
            placeholder="Acme Inc."
            aria-invalid={!!errors.company}
            aria-describedby={describedBy('company', errors.company)}
            className={controlClass(errors.company)}
            {...register('company')}
          />
        </Field>

        <Field id="subject" label="Subject" required error={errors.subject?.message}>
          <Input
            id="subject"
            enterKeyHint="next"
            placeholder="e.g. Next.js web app for our platform"
            aria-invalid={!!errors.subject}
            aria-describedby={describedBy('subject', errors.subject)}
            className={controlClass(errors.subject)}
            {...register('subject')}
          />
        </Field>
      </div>

      <Field
        id="message"
        label="Message"
        required
        error={errors.message?.message}
        hint="Goals, timeline and anything that helps me reply with a useful answer."
      >
        <Textarea
          id="message"
          rows={6}
          enterKeyHint="enter"
          placeholder="Tell me about your project…"
          aria-invalid={!!errors.message}
          aria-describedby={describedBy('message', errors.message, true)}
          className={`${controlClass(errors.message)} h-auto min-h-[9rem] resize-y py-3`}
          {...register('message')}
        />
        <p
          className={`text-right text-xs tabular-nums ${
            messageLength > MESSAGE_MAX ? 'text-red-400' : 'text-muted-foreground'
          }`}
          aria-live="polite"
        >
          {messageLength} / {MESSAGE_MAX}
        </p>
      </Field>

      {/* Honeypot: hidden from people and assistive tech, bots fill it */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="botcheck">Leave this field empty</label>
        <input id="botcheck" type="text" tabIndex={-1} autoComplete="off" {...register('botcheck')} />
      </div>

      <div className="flex flex-col gap-4 border-t border-white/[0.08] pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p id="contact-form-note" className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground sm:max-w-xs">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
          Choose WhatsApp (opens with your message ready) or email. Your details are used only to reply.</p>

        <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row-reverse">
          <motion.div whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 w-full rounded-full px-7 text-[0.9375rem] font-semibold shadow-lg shadow-primary/25 sm:h-11 sm:w-auto"
            >
              {isSubmitting ? <Loader2 className="animate-spin" /> : <MessageCircle />}
              Send via WhatsApp
            </Button>
          </motion.div>
          <motion.div whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
            <Button
              type="button"
              variant="glass"
              disabled={isSubmitting}
              onClick={handleSubmit((d) => onSubmit(d, 'email'))}
              className="h-12 w-full rounded-full px-6 text-[0.9375rem] font-semibold sm:h-11 sm:w-auto"
            >
              {isSubmitting ? <Loader2 className="animate-spin" /> : <Mail />}
              Send by email
            </Button>
          </motion.div>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;

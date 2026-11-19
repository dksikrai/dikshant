import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { m as motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, Loader2, Mail, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { siteConfig } from '@/config/site.js';

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
const HAS_KEY = Boolean(ACCESS_KEY) && ACCESS_KEY !== 'YOUR_ACCESS_KEY_HERE';

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
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: 'onTouched',
    defaultValues: { inquiry: 'Project', name: '', email: '', company: '', subject: '', message: '', botcheck: '' },
  });

  const messageLength = (watch('message') || '').length;

  const openMailClient = (data) => {
    const body = encodeURIComponent(
      `${data.message}\n\n— ${data.name} (${data.email})${data.company ? `, ${data.company}` : ''}`
    );
    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(`[${data.inquiry}] ${data.subject}`)}&body=${body}`;
  };

  const onSubmit = async (data) => {
    if (data.botcheck) return; // bot: silently drop

    // No API key configured (local dev / fresh deploy): fall back to the visitor's mail client.
    if (!HAS_KEY) {
      openMailClient(data);
      return;
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          from_name: 'Portfolio contact form',
          subject: `[${data.inquiry}] ${data.subject}`,
          name: data.name,
          email: data.email,
          company: data.company || '—',
          inquiry_type: data.inquiry,
          message: data.message,
          botcheck: '',
        }),
      });
      const result = await response.json();

      if (result.success) {
        toast.success('Message sent. I will get back to you soon.');
        setSent(true);
        reset();
      } else {
        throw new Error(result.message || 'Request failed');
      }
    } catch {
      toast.error('Could not send your message.', {
        description: `Please email ${siteConfig.email} directly.`,
        action: { label: 'Open email', onClick: () => openMailClient(data) },
      });
    }
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className="flex flex-col items-center justify-center gap-4 py-12 text-center"
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
        <h3 className="text-xl font-bold text-foreground">Message sent</h3>
        <p className="max-w-xs text-sm text-muted-foreground">
          Thanks for reaching out. I usually reply within one business day.
        </p>
        <Button variant="glass" className="rounded-full" onClick={() => setSent(false)}>
          Send another message
        </Button>
      </motion.div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-6" aria-describedby="contact-form-note">
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
            placeholder="e.g. Laravel API for our platform"
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
          {HAS_KEY
            ? 'Your details are used only to reply to this message.'
            : 'This will open your email app with the message ready to send.'}
        </p>

        <motion.div whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full rounded-full px-7 text-[0.9375rem] font-semibold shadow-lg shadow-primary/25 sm:h-11 sm:w-auto"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" />
                Sending…
              </>
            ) : HAS_KEY ? (
              <>
                <Send />
                Send message
              </>
            ) : (
              <>
                <Mail />
                Compose email
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </form>
  );
};

export default ContactForm;

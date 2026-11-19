import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Copy, Check, MapPin, MessageCircle, Linkedin, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import ContactForm from '@/components/ContactForm.jsx';
import { FadeIn } from '@/lib/motion.jsx';
import { siteConfig } from '@/config/site.js';

const CopyEmailButton = () => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      toast.success('Email copied to clipboard');
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error('Could not copy — please select the address manually.');
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={copy}
      className="h-11 w-11 shrink-0 -my-2"
      aria-label="Copy email address"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? 'check' : 'copy'}
          initial={{ scale: 0.4, opacity: 0, rotate: -30 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0.4, opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="flex"
        >
          {copied ? <Check className="text-emerald-400" /> : <Copy />}
        </motion.span>
      </AnimatePresence>
    </Button>
  );
};

const InfoRow = ({ icon: Icon, label, children }) => (
  <div className="flex items-start gap-3">
    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl glass-pill text-primary">
      <Icon className="h-4 w-4" />
    </span>
    <div className="min-w-0">
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      <div className="text-sm font-medium text-foreground break-words">{children}</div>
    </div>
  </div>
);

const ContactSection = () => (
  <section className="py-20 md:py-28 relative overflow-hidden" id="contact">
    <div className="absolute top-0 left-0 right-0 h-px bg-white/[0.06]" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.06),transparent_65%)] pointer-events-none" />

    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <FadeIn className="text-center mb-14">
        <Badge
          variant="outline"
          className="mb-8 gap-2 rounded-full border-emerald-500/25 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-400"
        >
          <span className="status-dot" />
          Open to consulting &amp; new opportunities
        </Badge>

        <h2
          className="font-extrabold text-foreground mb-5"
          style={{ fontSize: 'clamp(1.875rem, 5vw, 3.5rem)', letterSpacing: '-0.04em', lineHeight: 1.1 }}
        >
          Let&apos;s build something <span className="text-gradient-primary">exceptional</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.0625rem)' }}>
          Scaling a platform, shipping AI-powered workflows, or architecting a production SaaS?
          Tell me about it and I&apos;ll reply within one business day.
        </p>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Contact details */}
        <FadeIn className="lg:col-span-2">
        <Card className="h-full glass-card rounded-3xl border-white/[0.09] bg-transparent">
          <CardHeader>
            <CardTitle className="text-xl">Get in touch</CardTitle>
            <CardDescription>The fastest way to reach me.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <InfoRow icon={Mail} label="Email">
              <span className="flex items-center gap-1">
                <a href={`mailto:${siteConfig.email}`} className="py-2.5 hover:text-primary smooth-transition truncate">
                  {siteConfig.email}
                </a>
                <CopyEmailButton />
              </span>
            </InfoRow>
            <InfoRow icon={MapPin} label="Location">{siteConfig.location}</InfoRow>
            <InfoRow icon={Clock} label="Response time">Within 1 business day</InfoRow>

            <Separator className="bg-white/[0.08]" />

            <div className="flex flex-col gap-2.5">
              <Button asChild className="w-full h-11 justify-start rounded-xl shadow-lg shadow-primary/25">
                <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle />
                  Chat on WhatsApp
                </a>
              </Button>
              <Button asChild variant="glass" className="w-full h-11 justify-start rounded-xl">
                <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin />
                  Connect on LinkedIn
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        </FadeIn>

        {/* Form */}
        <FadeIn className="lg:col-span-3" delay={0.12}>
        <Card className="h-full glass-card rounded-3xl border-white/[0.09] bg-transparent">
          <CardHeader>
            <CardTitle className="text-xl">Send a message</CardTitle>
            <CardDescription>Share a few details and I&apos;ll get back to you.</CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
        </FadeIn>
      </div>
    </div>
  </section>
);

export default ContactSection;

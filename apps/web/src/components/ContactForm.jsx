import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/config/site.js';

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data) => {
    // No API key configured (e.g. local dev / fresh deploy): fall back to the user's mail client.
    if (!ACCESS_KEY || ACCESS_KEY === 'YOUR_ACCESS_KEY_HERE') {
      const body = encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`);
      window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(data.subject)}&body=${body}`;
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("access_key", ACCESS_KEY);
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("subject", data.subject);
      formData.append("message", data.message);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const result = await response.json();
      
      if (result.success) {
        toast.success('Message sent successfully! I will get back to you soon.');
        setSent(true);
        reset();
      } else {
        toast.error('Could not send your message. Please email me directly instead.');
      }
    } catch (error) {
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className="flex flex-col items-center justify-center text-center gap-4 py-12"
        role="status"
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 300, damping: 16 }}
        >
          <CheckCircle2 className="w-14 h-14 text-emerald-400" />
        </motion.span>
        <h3 className="text-xl font-bold text-foreground">Message sent!</h3>
        <p className="text-sm text-muted-foreground max-w-xs">
          Thanks for reaching out. I usually reply within one business day.
        </p>
        <Button variant="outline" onClick={() => setSent(false)}>Send another message</Button>
      </motion.div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-card-foreground">Name</Label>
          <Input
            id="name"
            {...register('name')}
            placeholder="Your name"
            aria-invalid={!!errors.name}
            className={`bg-background text-foreground placeholder:text-muted-foreground ${errors.name ? 'border-destructive focus-visible:ring-destructive' : ''}`}
          />
          {errors.name && (
            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} role="alert" className="text-sm text-destructive">{errors.name.message}</motion.p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email" className="text-card-foreground">Email</Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="your.email@example.com"
            aria-invalid={!!errors.email}
            className={`bg-background text-foreground placeholder:text-muted-foreground ${errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}`}
          />
          {errors.email && (
            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} role="alert" className="text-sm text-destructive">{errors.email.message}</motion.p>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="subject" className="text-card-foreground">Subject</Label>
        <Input
          id="subject"
          {...register('subject')}
          placeholder="What is this about?"
          aria-invalid={!!errors.subject}
          className={`bg-background text-foreground placeholder:text-muted-foreground ${errors.subject ? 'border-destructive focus-visible:ring-destructive' : ''}`}
        />
        {errors.subject && (
          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} role="alert" className="text-sm text-destructive">{errors.subject.message}</motion.p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="message" className="text-card-foreground">Message</Label>
        <Textarea
          id="message"
          {...register('message')}
          placeholder="Your message..."
          rows={6}
          aria-invalid={!!errors.message}
          className={`bg-background text-foreground placeholder:text-muted-foreground resize-none ${errors.message ? 'border-destructive focus-visible:ring-destructive' : ''}`}
        />
        {errors.message && (
          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} role="alert" className="text-sm text-destructive">{errors.message.message}</motion.p>
        )}
      </div>
      
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 active:scale-[0.98]"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Send message
          </>
        )}
      </Button>
    </form>
  );
};

export default ContactForm;
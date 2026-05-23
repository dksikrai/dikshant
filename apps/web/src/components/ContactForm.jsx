import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Send } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      // NOTE: Replace YOUR_ACCESS_KEY_HERE with a real key from Web3Forms.com
      formData.append("access_key", "YOUR_ACCESS_KEY_HERE"); 
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
        reset();
      } else {
        toast.error('Failed to send message. Please check the API configuration.');
      }
    } catch (error) {
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
            <p className="text-sm text-destructive">{errors.name.message}</p>
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
            <p className="text-sm text-destructive">{errors.email.message}</p>
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
          <p className="text-sm text-destructive">{errors.subject.message}</p>
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
          <p className="text-sm text-destructive">{errors.message.message}</p>
        )}
      </div>
      
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 active:scale-[0.98]"
      >
        {isSubmitting ? (
          'Sending...'
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
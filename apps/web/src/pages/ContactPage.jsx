import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Phone, MapPin, Send, Linkedin, Instagram, Clock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'sonner';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { FadeIn } from '@/lib/motion.jsx';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  projectType: z.string().min(1, 'Please select a project type'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectType: ''
    }
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Inquiry sent successfully! I will review your requirements and get back to you shortly.');
      reset();
      setValue('projectType', ''); // Reset select
    } catch (error) {
      toast.error('Failed to send inquiry. Please try again or contact directly via email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <Helmet>
        <title>Contact Dikshant Goyal | Best Web Developer &amp; Laravel Architect in Jaipur</title>
        <meta name="description" content="Looking to hire the best web developer and Laravel architect in Jaipur? Contact Dikshant Goyal for enterprise SaaS platforms, queue-driven systems, custom database designs, and cloud deployments." />
        <meta name="keywords" content="contact web developer jaipur, hire laravel developer jaipur, web development services jaipur, dikshant goyal phone number, best php developer jaipur" />
      </Helmet>

      <Header />

      <main className="flex-grow pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden relative">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/3" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 md:mb-16 text-center max-w-3xl mx-auto"
          >
            {/* Freelance Badge */}
            <div className="flex justify-center mb-6 md:mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm font-bold shadow-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                Open for Freelance Projects
              </span>
            </div>

            <h1 className="mb-4 text-4xl md:text-5xl lg:text-6xl tracking-tight font-extrabold">Let's Build <span className="text-gradient-primary">Together</span></h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed px-2 md:px-0">
              Available for enterprise architecture, high-level consulting, full-stack SaaS development, and architecting scalable custom web applications.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
            {/* Contact Info Sidebar */}
            <FadeIn delay={0.1} className="lg:col-span-1 h-full">
              <Card className="glass-card border-border/50 premium-shadow h-full bg-gradient-to-br from-card/80 to-card overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardContent className="p-6 md:p-8 flex flex-col h-full relative z-10">
                  <h3 className="text-2xl font-bold mb-8">Contact Details</h3>
                  
                  <div className="space-y-6 flex-grow">
                    <a href="mailto:dikshkrai@gmail.com" className="flex items-start gap-4 p-4 -mx-4 rounded-xl hover:bg-muted/50 transition-colors group/link">
                      <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover/link:bg-primary group-hover/link:text-primary-foreground smooth-transition shadow-sm">
                        <Mail className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Email</p>
                        <p className="text-foreground font-semibold truncate text-sm md:text-base">dikshkrai@gmail.com</p>
                      </div>
                    </a>
                    
                    <a href="tel:+919829641370" className="flex items-start gap-4 p-4 -mx-4 rounded-xl hover:bg-muted/50 transition-colors group/link">
                      <div className="p-3 rounded-xl bg-secondary/10 text-secondary group-hover/link:bg-secondary group-hover/link:text-secondary-foreground smooth-transition shadow-sm">
                        <Phone className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Phone / WhatsApp</p>
                        <p className="text-foreground font-semibold text-sm md:text-base">+91 9829641370</p>
                      </div>
                    </a>
                    
                    <div className="flex items-start gap-4 p-4 -mx-4 rounded-xl">
                      <div className="p-3 rounded-xl bg-accent/10 text-accent shadow-sm">
                        <MapPin className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Location</p>
                        <p className="text-foreground font-semibold text-sm md:text-base">Jaipur, India</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 mt-4 border-t border-border/50">
                    <div className="flex items-center gap-2 mb-4 text-xs font-bold text-foreground uppercase tracking-wider">
                      <Clock className="w-4 h-4 text-primary" /> Availability
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground mb-6 leading-relaxed">
                      I typically respond within 1-2 hours during Indian Standard Time (IST) working hours.
                    </p>
                    <div className="flex gap-3">
                      <a href="https://in.linkedin.com/in/csdikshant" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-muted text-muted-foreground hover:bg-[#0A66C2] hover:text-white smooth-transition shadow-sm">
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a href="https://instagram.com/dksikrai" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-muted text-muted-foreground hover:bg-[#E1306C] hover:text-white smooth-transition shadow-sm">
                        <Instagram className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>

            {/* Contact Form */}
            <FadeIn delay={0.2} className="lg:col-span-2">
              <Card className="glass-card border-border/50 premium-shadow">
                <CardContent className="p-6 md:p-10">
                  <div className="flex items-center gap-2 mb-8">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <h3 className="text-xl md:text-2xl font-bold">Send an Inquiry</h3>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-foreground font-semibold">Full Name <span className="text-primary">*</span></Label>
                        <Input
                          id="name"
                          {...register('name')}
                          placeholder="John Doe"
                          className="bg-muted/30 border-border/60 focus-visible:ring-primary focus-visible:bg-background text-foreground h-12 rounded-xl"
                        />
                        {errors.name && <p className="text-xs text-destructive mt-1 font-medium">{errors.name.message}</p>}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-foreground font-semibold">Email Address <span className="text-primary">*</span></Label>
                        <Input
                          id="email"
                          type="email"
                          {...register('email')}
                          placeholder="john@company.com"
                          className="bg-muted/30 border-border/60 focus-visible:ring-primary focus-visible:bg-background text-foreground h-12 rounded-xl"
                        />
                        {errors.email && <p className="text-xs text-destructive mt-1 font-medium">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-foreground font-semibold">Phone Number</Label>
                        <Input
                          id="phone"
                          {...register('phone')}
                          placeholder="+1 (555) 000-0000"
                          className="bg-muted/30 border-border/60 focus-visible:ring-primary focus-visible:bg-background text-foreground h-12 rounded-xl"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="company" className="text-foreground font-semibold">Company Name</Label>
                        <Input
                          id="company"
                          {...register('company')}
                          placeholder="Acme Corp"
                          className="bg-muted/30 border-border/60 focus-visible:ring-primary focus-visible:bg-background text-foreground h-12 rounded-xl"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="projectType" className="text-foreground font-semibold">Inquiry Type <span className="text-primary">*</span></Label>
                      <Select onValueChange={(value) => setValue('projectType', value)}>
                        <SelectTrigger className="bg-muted/30 border-border/60 focus-visible:ring-primary focus-visible:bg-background text-foreground h-12 rounded-xl">
                          <SelectValue placeholder="Select the nature of your inquiry" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-border/60 shadow-xl">
                          <SelectItem value="Consultation" className="py-2.5 cursor-pointer">Technical Consultation</SelectItem>
                          <SelectItem value="Architecture Review" className="py-2.5 cursor-pointer">Architecture Review</SelectItem>
                          <SelectItem value="Freelance Project" className="py-2.5 cursor-pointer text-green-600 dark:text-green-400 font-bold">New Freelance Project</SelectItem>
                          <SelectItem value="Team Mentoring" className="py-2.5 cursor-pointer">Team Mentoring</SelectItem>
                          <SelectItem value="Other" className="py-2.5 cursor-pointer">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.projectType && <p className="text-xs text-destructive mt-1 font-medium">{errors.projectType.message}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-foreground font-semibold">Project Details <span className="text-primary">*</span></Label>
                      <Textarea
                        id="message"
                        {...register('message')}
                        placeholder="Please provide details about your project requirements, timeline, and technical challenges..."
                        rows={5}
                        className="bg-muted/30 border-border/60 focus-visible:ring-primary focus-visible:bg-background text-foreground resize-none p-4 rounded-xl"
                      />
                      {errors.message && <p className="text-xs text-destructive mt-1 font-medium">{errors.message.message}</p>}
                    </div>
                    
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground h-14 text-base md:text-lg font-bold rounded-xl smooth-transition shadow-lg shadow-primary/20"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          Sending...
                        </div>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Send Inquiry
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
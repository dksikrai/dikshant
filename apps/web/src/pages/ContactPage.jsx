import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Phone, MapPin, Send, Linkedin, Instagram, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'sonner';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

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
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Contact Dikshant Goyal | Best Web Developer &amp; Laravel Architect in Jaipur</title>
        <meta name="description" content="Looking to hire the best web developer and Laravel architect in Jaipur? Contact Dikshant Goyal for enterprise SaaS platforms, queue-driven systems, custom database designs, and cloud deployments." />
        <meta name="keywords" content="contact web developer jaipur, hire laravel developer jaipur, web development services jaipur, dikshant goyal phone number, best php developer jaipur" />
      </Helmet>

      <Header />

      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 text-center max-w-3xl mx-auto"
          >
            <h1 className="mb-6">Get in Touch</h1>
            <p className="text-2xl text-primary font-medium mb-4">Enterprise Laravel Solutions</p>
            <p className="text-lg text-muted-foreground">
              Available for high-level consulting, architecture reviews, team mentoring, and architecting scalable custom applications.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Contact Info Sidebar */}
            <motion.div
              initial={false}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1 space-y-8"
            >
              <Card className="bg-card border-border/50 premium-shadow h-full">
                <CardContent className="p-8 flex flex-col h-full">
                  <h3 className="text-2xl font-bold mb-8">Contact Details</h3>
                  
                  <div className="space-y-8 flex-grow">
                    <a href="mailto:dikshkrai@gmail.com" className="flex items-start gap-4 group">
                      <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground smooth-transition">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">Email</p>
                        <p className="text-foreground font-medium">dikshkrai@gmail.com</p>
                      </div>
                    </a>
                    
                    <a href="tel:+919829641370" className="flex items-start gap-4 group">
                      <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground smooth-transition">
                        <Phone className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">Phone</p>
                        <p className="text-foreground font-medium">+91 9829641370</p>
                      </div>
                    </a>
                    
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-primary/10 text-primary">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">Location</p>
                        <p className="text-foreground font-medium">Jaipur, India</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 mt-8 border-t border-border/50">
                    <div className="flex items-center gap-2 mb-6 text-sm font-bold text-foreground uppercase tracking-wider">
                      <Clock className="w-4 h-4 text-primary" /> Availability
                    </div>
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                      Currently accepting inquiries for enterprise projects, technical consulting, and team mentoring engagements.
                    </p>
                    <div className="flex gap-4">
                      <a href="https://in.linkedin.com/in/csdikshant" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground smooth-transition">
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a href="https://instagram.com/dksikrai" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground smooth-transition">
                        <Instagram className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={false}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2"
            >
              <Card className="bg-card border-border/50 premium-shadow">
                <CardContent className="p-8 md:p-10">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-foreground font-semibold">Full Name <span className="text-primary">*</span></Label>
                        <Input
                          id="name"
                          {...register('name')}
                          placeholder="John Doe"
                          className="bg-background border-border/50 focus-visible:ring-primary text-foreground h-12"
                        />
                        {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-foreground font-semibold">Email Address <span className="text-primary">*</span></Label>
                        <Input
                          id="email"
                          type="email"
                          {...register('email')}
                          placeholder="john@company.com"
                          className="bg-background border-border/50 focus-visible:ring-primary text-foreground h-12"
                        />
                        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-foreground font-semibold">Phone Number</Label>
                        <Input
                          id="phone"
                          {...register('phone')}
                          placeholder="+1 (555) 000-0000"
                          className="bg-background border-border/50 focus-visible:ring-primary text-foreground h-12"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="company" className="text-foreground font-semibold">Company Name</Label>
                        <Input
                          id="company"
                          {...register('company')}
                          placeholder="Acme Corp"
                          className="bg-background border-border/50 focus-visible:ring-primary text-foreground h-12"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="projectType" className="text-foreground font-semibold">Inquiry Type <span className="text-primary">*</span></Label>
                      <Select onValueChange={(value) => setValue('projectType', value)}>
                        <SelectTrigger className="bg-background border-border/50 focus-visible:ring-primary text-foreground h-12">
                          <SelectValue placeholder="Select the nature of your inquiry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Consultation">Technical Consultation</SelectItem>
                          <SelectItem value="Architecture Review">Architecture Review</SelectItem>
                          <SelectItem value="Team Mentoring">Team Mentoring</SelectItem>
                          <SelectItem value="Custom Development">Custom Application Development</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.projectType && <p className="text-sm text-destructive">{errors.projectType.message}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-foreground font-semibold">Project Details <span className="text-primary">*</span></Label>
                      <Textarea
                        id="message"
                        {...register('message')}
                        placeholder="Please provide details about your project requirements, timeline, and technical challenges..."
                        rows={6}
                        className="bg-background border-border/50 focus-visible:ring-primary text-foreground resize-none p-4"
                      />
                      {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
                    </div>
                    
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-14 text-lg rounded-xl smooth-transition shadow-lg shadow-primary/20"
                    >
                      {isSubmitting ? (
                        'Submitting Inquiry...'
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Submit Enterprise Inquiry
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
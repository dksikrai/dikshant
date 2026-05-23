import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Download, Phone, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  SiReact, 
  SiNextdotjs, 
  SiNodedotjs, 
  SiLaravel, 
  SiTypescript, 
  SiRedis, 
  SiCloudflare,
  SiJavascript
} from 'react-icons/si';
import { TbApi } from 'react-icons/tb';
import { FaAws } from 'react-icons/fa';

const TechIcon = ({ name, className }) => {
  const iconProps = { className };
  switch (name.toLowerCase()) {
    case 'react': return <SiReact {...iconProps} color="#61DAFB" />;
    case 'next.js': return <SiNextdotjs {...iconProps} />;
    case 'node.js': return <SiNodedotjs {...iconProps} color="#339933" />;
    case 'laravel': return <SiLaravel {...iconProps} color="#FF2D20" />;
    case 'typescript': return <SiTypescript {...iconProps} color="#3178C6" />;
    case 'aws': return <FaAws {...iconProps} color="#232F3E" />;
    case 'redis': return <SiRedis {...iconProps} color="#DC382D" />;
    case 'cloudflare': return <SiCloudflare {...iconProps} color="#F38020" />;
    case 'fabric.js': return <SiJavascript {...iconProps} color="#F7DF1E" />;
    case 'api integration': return <TbApi {...iconProps} color="#00D8FF" />;
    default: return <div className="w-2 h-2 rounded-full bg-primary" />;
  }
};

const FloatingBadge = ({ icon: Icon, color, top, right, bottom, left, delay, duration }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
      animate={{ 
        opacity: [0, 1, 1, 0.8, 1],
        scale: [0.5, 1.1, 1, 1.05, 1],
        y: [0, -40, 20, -10, 0],
        x: [0, 20, -20, 10, 0],
        rotate: [-20, 10, -10, 5, 0]
      }}
      transition={{ 
        duration: duration || 15, 
        delay: delay || 0,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1]
      }}
      className="absolute p-4 rounded-2xl bg-card/40 border border-border/50 backdrop-blur-xl flex items-center justify-center shadow-2xl"
      style={{ 
        top, right, bottom, left, 
        boxShadow: `0 20px 40px -10px ${color}40`,
      }}
    >
      <Icon className="w-10 h-10 drop-shadow-md" color={color} />
    </motion.div>
  );
};

const HeroSection = () => {
  const stack = ['React', 'Next.js', 'Node.js', 'Laravel', 'TypeScript', 'AWS', 'Redis', 'Fabric.js', 'API Integration'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 90, damping: 15 }
    }
  };

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center pt-20 overflow-hidden" id="hero">
      {/* Background Image & Overlays */}
      <div className="absolute inset-0 z-0">
        <motion.img 
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.18 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          src="/hero_development_backdrop.png" 
          alt="Technical development graph" 
          className="w-full h-full object-cover dark:opacity-35 dark:mix-blend-screen transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/80 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,184,217,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.15),transparent_60%)]" />
      </div>

      {/* Advanced Floating Technology Badges */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 hidden md:block">
        <FloatingBadge icon={SiReact} color="#61DAFB" top="15%" right="15%" duration={18} delay={0} />
        <FloatingBadge icon={SiLaravel} color="#FF2D20" top="30%" left="10%" duration={20} delay={2} />
        <FloatingBadge icon={SiNextdotjs} color="#ffffff" bottom="20%" right="18%" duration={16} delay={4} />
        <FloatingBadge icon={SiNodedotjs} color="#339933" bottom="25%" left="20%" duration={22} delay={1} />
        <FloatingBadge icon={FaAws} color="#FF9900" top="20%" left="30%" duration={19} delay={3} />
        <FloatingBadge icon={SiCloudflare} color="#F38020" top="60%" right="25%" duration={21} delay={5} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full py-20">
        <div className="max-w-4xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start text-left"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-8 backdrop-blur-sm shadow-[0_0_15px_rgba(var(--primary),0.2)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Available for Enterprise Opportunities
            </motion.div>

            <motion.h1 variants={itemVariants} className="mb-5 text-foreground font-black tracking-tight drop-shadow-sm">
              Dikshant Goyal
            </motion.h1>
            
            <motion.h2 variants={itemVariants} className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-medium mb-6 leading-tight">
              Senior Full-Stack Developer &nbsp;<span className="text-gradient-primary font-bold">React &amp; Laravel Architect</span>
              <span className="hidden md:inline"> &nbsp;|&nbsp; </span><br className="md:hidden" />
              <span className="text-gradient-accent font-bold">Best Web Developer in Jaipur</span>
            </motion.h2>

            <motion.p variants={itemVariants} className="text-base md:text-lg text-muted-foreground mb-10 max-w-2xl leading-relaxed">
              Architecting production-grade enterprise systems, modern React/Next.js frontends, and scalable Node.js/Laravel backends. As the leading <strong className="text-foreground">full-stack web developer in Jaipur</strong>, I build highly optimized applications, real-time architectures, and robust cloud deployments for global businesses.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-10">
              {stack.map((tech, i) => (
                <span key={i} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-card/60 backdrop-blur-md border border-border/60 shadow-sm text-foreground text-sm font-medium hover:border-primary/50 hover:bg-card/80 hover:-translate-y-1 transition-all duration-300">
                  <TechIcon name={tech} className="w-4 h-4 shrink-0" />
                  {tech}
                </span>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-6 mb-12 text-sm font-medium">
              <a href="mailto:webwithdikshant@gmail.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary smooth-transition">
                <Mail className="w-5 h-5 text-primary" /> webwithdikshant@gmail.com
              </a>
              <a href="https://in.linkedin.com/in/csdikshant" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-primary smooth-transition">
                <Linkedin className="w-5 h-5 text-primary" /> LinkedIn Profile
              </a>
              <a href="tel:+919829641370" className="flex items-center gap-2 text-muted-foreground hover:text-primary smooth-transition">
                <Phone className="w-5 h-5 text-primary" /> +91 9829641370
              </a>
              <span className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary" /> Jaipur, India
              </span>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a
                href="https://wa.me/919829641370?text=Hi%20Dikshant%2C%20I%20saw%20your%20portfolio%20and%20I%27d%20love%20to%20discuss%20a%20project%20with%20you!"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full px-8 h-14 text-base font-bold bg-[#25D366] text-white hover:bg-[#1ebe5d] shadow-lg shadow-[#25D366]/30 hover:scale-105 active:scale-95 smooth-transition gap-3"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>
              <Button onClick={() => { const link = document.createElement('a'); link.href = '/resume.pdf'; link.download = 'Dikshant_Goyal_Resume.pdf'; link.click(); }} variant="outline" size="lg" className="rounded-full px-8 bg-background/50 backdrop-blur-md border-border/50 hover:bg-secondary/10 hover:text-secondary h-14 text-base w-full sm:w-auto transition-all">
                <Download className="w-4 h-4 mr-2" /> Download Resume
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

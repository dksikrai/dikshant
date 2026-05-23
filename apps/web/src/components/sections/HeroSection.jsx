import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, MapPin, Download, Phone, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeIn, TextReveal, isIOS, isTouchDevice, ease } from '@/lib/motion.jsx';
import {
  SiReact, SiNextdotjs, SiNodedotjs, SiLaravel, SiTypescript,
  SiRedis, SiJavascript
} from 'react-icons/si';
import { TbApi } from 'react-icons/tb';
import { FaAws } from 'react-icons/fa';

const TechIcon = ({ name, className }) => {
  const iconProps = { className };
  switch (name.toLowerCase()) {
    case 'react':        return <SiReact {...iconProps} color="#61DAFB" />;
    case 'next.js':      return <SiNextdotjs {...iconProps} />;
    case 'node.js':      return <SiNodedotjs {...iconProps} color="#339933" />;
    case 'laravel':      return <SiLaravel {...iconProps} color="#FF2D20" />;
    case 'typescript':   return <SiTypescript {...iconProps} color="#3178C6" />;
    case 'aws':          return <FaAws {...iconProps} color="#FF9900" />;
    case 'redis':        return <SiRedis {...iconProps} color="#DC382D" />;
    case 'fabric.js':    return <SiJavascript {...iconProps} color="#F7DF1E" />;
    case 'api integration': return <TbApi {...iconProps} color="#00D8FF" />;
    default: return <div className="w-2 h-2 rounded-full bg-primary" />;
  }
};

const stack = ['React', 'Next.js', 'Node.js', 'Laravel', 'TypeScript', 'AWS', 'Redis', 'Fabric.js', 'API Integration'];

const HeroSection = () => {
  const ios = isIOS();

  // Scroll-linked parallax — only on desktop
  const isTouch = isTouchDevice();
  const { scrollY } = useScroll();
  const bgY    = useTransform(scrollY, [0, 500], isTouch ? [0, 0] : [0, 60]);
  const heroY  = useTransform(scrollY, [0, 500], isTouch ? [0, 0] : [0, -30]);
  const heroOp = useTransform(scrollY, [0, 400], isTouch ? [1, 1] : [1, 0]);

  // Simplify hero animation container to just standard whileInView
  // This prevents the mobile stagger rendering bug.
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };
  const item = {
    hidden:  { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: ease.out } },
  };

  return (
    <section
      className="relative min-h-[100dvh] flex items-center justify-center pt-20 overflow-hidden"
      id="hero"
    >
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY }}
      >
        <img
          src="/hero_development_backdrop.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover opacity-[0.18] dark:opacity-[0.32] dark:mix-blend-screen"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/80 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,184,217,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.10),transparent_60%)]" />
      </motion.div>

      {/* Floating decorative orb — desktop only */}
      {!ios && (
        <motion.div
          className="absolute right-[8%] top-[22%] w-72 h-72 rounded-full pointer-events-none hidden lg:block"
          style={{
            background: 'radial-gradient(circle, hsl(199,89%,54%,0.12) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full py-20"
        style={{ y: heroY, opacity: heroOp }}
      >
        <div className="max-w-4xl">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="flex flex-col items-start text-left"
          >
            {/* Available badge */}
            <motion.div
              variants={item}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-semibold mb-5 sm:mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Available for Enterprise Opportunities
            </motion.div>

            {/* Heading — TextReveal word animation */}
            <h1 className="mb-4 text-foreground font-black tracking-tight">
              {isTouch ? (
                <motion.span variants={item}>Dikshant Goyal</motion.span>
              ) : (
                <TextReveal text="Dikshant Goyal" />
              )}
            </h1>

            <motion.h2
              variants={item}
              className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-medium mb-6 leading-tight"
            >
              Senior Full-Stack Developer&nbsp;
              <span className="text-gradient-primary font-bold">React &amp; Laravel Architect</span>
              <span className="hidden md:inline"> | </span>
              <br className="md:hidden" />
              <span className="text-gradient-accent font-bold">Best Web Developer in Jaipur</span>
            </motion.h2>

            <motion.p
              variants={item}
              className="text-base md:text-lg text-muted-foreground mb-10 max-w-2xl leading-relaxed"
            >
              Architecting production-grade enterprise systems, modern React/Next.js frontends, and scalable
              Node.js/Laravel backends. As the leading{' '}
              <strong className="text-foreground">full-stack web developer in Jaipur</strong>, I build highly
              optimized applications, real-time architectures, and robust cloud deployments for global businesses.
            </motion.p>

            {/* Tech stack badges — staggered */}
            <motion.div variants={item} className="flex flex-wrap gap-2 md:gap-3 mb-8 md:mb-10">
              {stack.map((tech, i) => (
                <motion.span
                  key={i}
                  initial={ios ? false : { opacity: 0, scale: 0.85 }}
                  animate={ios ? {} : { opacity: 1, scale: 1 }}
                  transition={{ delay: 0.55 + i * 0.045, duration: 0.35, ease: ease.spring }}
                  whileHover={ios ? {} : { scale: 1.06, y: -2 }}
                  className="inline-flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-xl bg-card/60 border border-border/60 shadow-sm text-foreground text-xs md:text-sm font-medium hover:border-primary/50 hover:bg-card/80 cursor-default transition-colors duration-200"
                >
                  <TechIcon name={tech} className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" />
                  {tech}
                </motion.span>
              ))}
            </motion.div>

            {/* Contact links — 2-col on mobile */}
            <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 md:gap-0 md:flex md:flex-wrap md:gap-6 mb-8 md:mb-12 text-sm font-medium">
              <a href="mailto:webwithdikshant@gmail.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors truncate">
                <Mail className="w-4 h-4 md:w-5 md:h-5 text-primary shrink-0" /> <span className="truncate">webwithdikshant@gmail.com</span>
              </a>
              <a href="https://in.linkedin.com/in/csdikshant" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-4 h-4 md:w-5 md:h-5 text-primary shrink-0" /> LinkedIn Profile
              </a>
              <a href="tel:+919829641370" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Phone className="w-4 h-4 md:w-5 md:h-5 text-primary shrink-0" /> +91 9829641370
              </a>
              <span className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 md:w-5 md:h-5 text-primary shrink-0" /> Jaipur, India
              </span>
            </motion.div>

            {/* CTA Buttons — spring entrance */}
            <motion.div variants={item} className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full">
              <motion.a
                href="https://wa.me/919829641370?text=Hi%20Dikshant%2C%20I%20saw%20your%20portfolio%20and%20I%27d%20love%20to%20hire%20you!"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={ios ? {} : { scale: 1.03, boxShadow: '0 12px 32px rgba(var(--primary),0.35)' }}
                whileTap={ios ? {} : { scale: 0.97 }}
                className="inline-flex items-center justify-center rounded-full px-8 h-14 text-base font-bold bg-primary text-primary-foreground shadow-lg shadow-primary/20 gap-3 transition-colors hover:bg-primary/90"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </motion.a>
              <motion.button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/resume.pdf';
                  link.download = 'Dikshant_Goyal_Resume.pdf';
                  link.click();
                }}
                whileHover={ios ? {} : { scale: 1.03 }}
                whileTap={ios ? {} : { scale: 0.97 }}
                className="inline-flex items-center justify-center rounded-full px-8 h-14 text-base font-semibold bg-background/50 border border-border/50 hover:bg-secondary/10 hover:text-secondary transition-colors w-full sm:w-auto"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      {!isTouch && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.6 }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-muted-foreground/40" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default HeroSection;

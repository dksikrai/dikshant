import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ArrowUpRight, ArrowRight, Terminal } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { FadeIn, isIOS, ease, TextReveal, useCardTilt } from '@/lib/motion.jsx';

const projectsData = [
  {
    name: "Mehta College",
    type: "Enterprise",
    tech: ["WordPress", "Elementor", "PHP", "MySQL"],
    url: "https://www.mehtacollege.com/",
    description: "A comprehensive educational portal for Mehta PG College, featuring student LMS integration, admission workflows, and dynamic academic department management.",
    screenshot: "/mehta_college_screenshot.png"
  },
  {
    name: "Airventory",
    type: "SaaS",
    tech: ["Laravel", "Vue.js", "AWS", "Redis", "Fabric.js"],
    url: "https://www.airventory.io/",
    description: "Enterprise e-commerce fulfillment and shipping automation platform integrated with ShipStation, Fabric.js canvas printing, and AWS Lambda.",
    screenshot: "/airventory_screenshot.png"
  },
  {
    name: "Kritasya Jewels",
    type: "E-commerce",
    tech: ["WordPress", "WooCommerce", "PHP", "MySQL"],
    url: "https://kritasyajewels.com/",
    description: "Premium fine jewelry e-commerce platform featuring advanced multi-attribute filtering, high-resolution product zooms, and secure checkouts.",
    screenshot: "/kritasya_jewels_screenshot.png"
  },
  {
    name: "Mehandipur Balaji Seva",
    type: "Services",
    tech: ["WordPress", "Elementor", "PHP", "WhatsApp API"],
    url: "https://mehandipurbalajiseva.com/",
    description: "Devotional service booking platform facilitating online booking of sawamani prasad and arji offerings, integrated with WhatsApp notifications.",
    screenshot: "/mehandipur_balaji_screenshot.png"
  },
  {
    name: "Bright Hygiene Group",
    type: "Enterprise",
    tech: ["WordPress", "Elementor", "PHP", "Nginx"],
    url: "http://brighthygienegroup.in/",
    description: "Regional pest control and commercial cleaning service platform based in Jaipur, featuring service catalog and automated inquiry booking."
  },
  {
    name: "Aussie Translations",
    type: "Services",
    tech: ["WordPress", "Elementor", "PHP", "Nginx"],
    url: "https://aussietranslations.com.au/",
    description: "High-volume translation agency portal in Australia, offering instant PDF document uploads, automatic word counts, and secure payments."
  },
  {
    name: "Flow Rental",
    type: "Services",
    tech: ["WordPress", "PHP", "Apache", "Custom JS"],
    url: "https://www.flowrental.dk/",
    description: "Danish service rental platform for tool and equipment bookings, integrated with online calendars, custom booking rules, and invoicing."
  },
  {
    name: "MapView AI",
    type: "SaaS",
    tech: ["WordPress", "Cloudflare", "PHP", "Mapbox API"],
    url: "https://mapview.ai/",
    description: "Marketing intelligence SaaS overlaying property leads, zoning maps, and regional demographic insights onto visual interactive maps."
  },
  {
    name: "Zircodata",
    type: "Enterprise",
    tech: ["WordPress", "WooCommerce", "PHP", "SQL Server"],
    url: "https://www.zircodata.com/",
    description: "Australian enterprise document scanning, records storage, data capture, secure backup tape management, and workflow automation portal."
  },
  {
    name: "CleanGuys Germany",
    type: "Services",
    tech: ["WordPress", "WooCommerce", "Elementor", "CSS3"],
    url: "https://cleanguys.de/",
    description: "German commercial facility management, building sanitation, residential maintenance catalog, and custom contact request booking."
  },
  {
    name: "MedTrans",
    type: "Services",
    tech: ["WordPress", "Vue.js", "Elementor", "NAATI API"],
    url: "https://medtrans.com.au/",
    description: "Australian medical transcription and translation agency portal, ensuring strict HIPAA compliance, secure file uploads, and NAATI certificates."
  },
  {
    name: "Legal Translations Australia",
    type: "Services",
    tech: ["WordPress", "WooCommerce", "Bootstrap", "PHP"],
    url: "https://legal-translations.com.au/",
    description: "Specialized legal translation services portal in Australia for legal documents, court records, and NAATI-certified translations."
  },
  {
    name: "EasyITRFile",
    type: "Services",
    tech: ["WordPress", "Elementor", "PHP", "HCDN"],
    url: "https://easyitrfile.com",
    description: "Financial tax filing portal in India for filing GST, Income Tax Returns (ITR), corporate audits, and automated tax calculations."
  },
  {
    name: "Cake Deco Supplies Australia",
    type: "E-commerce",
    tech: ["WooCommerce", "Bootstrap", "Cloudflare", "PHP"],
    url: "https://cakedecosupplies.com.au/",
    description: "Specialized retail and wholesale baking supplies e-commerce store in Australia, supporting massive product variation trees.",
    screenshot: "/cakedeco_screenshot.png"
  },
  {
    name: "Mehta CI",
    type: "Enterprise",
    tech: ["WordPress", "Elementor", "PHP", "Custom CSS"],
    url: "https://www.mehtaci.com/",
    description: "Portfolio website for high-end commercial interiors and workspace design studio, highlighting premium visual case studies.",
    screenshot: "/mehtaci_screenshot.png"
  },
  {
    name: "SalesPundit Australia",
    type: "SaaS",
    tech: ["WordPress", "React", "Elementor", "REST APIs"],
    url: "https://salespundit.com.au/",
    description: "Sales CRM and pipeline manager focusing on customer journey tracing, email marketing integrations, and performance reporting.",
    screenshot: "/salespundit_screenshot.png"
  },
  {
    name: "Salg.nu",
    type: "E-commerce",
    tech: ["HTML5", "CSS3", "JavaScript", "Cloudflare"],
    url: "https://www.salg.nu/",
    description: "Danish deal site presenting daily discount coupons, retail promo codes, and special campaigns for Scandinavian brands."
  },
  {
    name: "Jacksons Retreat NZ",
    type: "Services",
    tech: ["WordPress", "WooCommerce", "Elementor", "Booking APIs"],
    url: "https://www.jacksonsretreat.co.nz/",
    description: "Eco-retreat lodging reservation site in New Zealand, integrated with booking engines, live availability calendars, and local travel guides."
  },
  {
    name: "XFC Gym 247",
    type: "Services",
    tech: ["WordPress", "Elementor", "Apache", "PHP"],
    url: "https://xfcgym247.com.au/",
    description: "Multi-location fitness gym membership checkout, online trainer booking systems, class schedule timetables, and member dashboard portals."
  },
  {
    name: "White Knight Cyber",
    type: "Enterprise",
    tech: ["WordPress", "Elementor", "Nginx", "Nginx WAF"],
    url: "https://whiteknightcyber.com/",
    description: "Cyber defense consulting website offering security audits, pen testing, system assessments, and corporate training intake."
  },
  {
    name: "ITechPanel",
    type: "Services",
    tech: ["WordPress", "React", "Vue.js", "Node.js"],
    url: "http://itechpanel.com/",
    description: "Creative software agency landing page presenting services, case studies, engineering capabilities, and talent recruitment."
  },
  {
    name: "ProfileTag Germany",
    type: "SaaS",
    tech: ["PHP", "Nginx", "Plesk", "Tailwind CSS"],
    url: "https://www.profiletag.de/",
    description: "SaaS tool enabling users to design mobile-optimized biolink pages, digital business cards, and custom QR codes for social marketing.",
    screenshot: "/profiletag_screenshot.png"
  }
];

import {
  SiLaravel, SiVuedotjs, SiRedis, SiJavascript,
  SiWordpress, SiWoocommerce, SiPhp, SiMysql, SiElementor, SiWhatsapp,
  SiNginx, SiApache, SiCloudflare, SiMapbox,
  SiBootstrap, SiReact, SiNodedotjs, SiPlesk, SiTailwindcss
} from 'react-icons/si';
import { TbApi, TbCloud } from 'react-icons/tb';
import { FaAws, FaDatabase, FaCss3, FaHtml5 } from 'react-icons/fa';

const TechIcon = ({ name, className }) => {
  const iconProps = { className };
  const n = name.toLowerCase();
  if (n.includes('laravel')) return <SiLaravel {...iconProps} color="#FF2D20" />;
  if (n.includes('vue')) return <SiVuedotjs {...iconProps} color="#4FC08D" />;
  if (n.includes('aws')) return <FaAws {...iconProps} color="#FF9900" />;
  if (n.includes('redis')) return <SiRedis {...iconProps} color="#DC382D" />;
  if (n.includes('wordpress')) return <SiWordpress {...iconProps} color="#21759B" />;
  if (n.includes('woocommerce')) return <SiWoocommerce {...iconProps} color="#96588A" />;
  if (n.includes('php')) return <SiPhp {...iconProps} color="#777BB4" />;
  if (n.includes('mysql')) return <SiMysql {...iconProps} color="#4479A1" />;
  if (n.includes('elementor')) return <SiElementor {...iconProps} color="#D53184" />;
  if (n.includes('whatsapp')) return <SiWhatsapp {...iconProps} color="#25D366" />;
  if (n.includes('nginx')) return <SiNginx {...iconProps} color="#009639" />;
  if (n.includes('apache')) return <SiApache {...iconProps} color="#D22128" />;
  if (n.includes('cloudflare')) return <SiCloudflare {...iconProps} color="#F38020" />;
  if (n.includes('mapbox')) return <SiMapbox {...iconProps} color="#000000" />;
  if (n.includes('sql server')) return <FaDatabase {...iconProps} color="#CC292B" />;
  if (n.includes('css')) return <FaCss3 {...iconProps} color="#1572B6" />;
  if (n.includes('bootstrap')) return <SiBootstrap {...iconProps} color="#7952B3" />;
  if (n.includes('react')) return <SiReact {...iconProps} color="#61DAFB" />;
  if (n.includes('html')) return <FaHtml5 {...iconProps} color="#E34F26" />;
  if (n.includes('node')) return <SiNodedotjs {...iconProps} color="#339933" />;
  if (n.includes('plesk')) return <SiPlesk {...iconProps} color="#52B0E8" />;
  if (n.includes('tailwind')) return <SiTailwindcss {...iconProps} color="#06B6D4" />;
  if (n.includes('js') || n.includes('javascript') || n.includes('fabric')) return <SiJavascript {...iconProps} color="#F7DF1E" />;
  if (n.includes('api')) return <TbApi {...iconProps} color="#00D8FF" />;
  if (n.includes('hcdn')) return <TbCloud {...iconProps} color="#F38020" />;
  return <Terminal className={className} />;
};

const TechBadge = ({ tech }) => (
  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded bg-muted border border-border text-foreground/80 dark:text-foreground/90">
    <TechIcon name={tech} className="w-3.5 h-3.5 shrink-0" />
    {tech}
  </span>
);

const getDomainFavicon = (url) => {
  try {
    if (url && url.startsWith('http')) {
      const hostname = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
    }
  } catch (e) { /* ignore */ }
  return null;
};

const getGradientFromName = (name) => {
  const gradients = [
    'from-blue-500 to-cyan-400',
    'from-indigo-500 to-purple-500',
    'from-emerald-400 to-teal-500',
    'from-orange-400 to-rose-400',
    'from-pink-500 to-rose-500',
    'from-violet-500 to-fuchsia-500',
    'from-blue-600 to-indigo-600',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return gradients[Math.abs(hash) % gradients.length];
};

const BrowserMockup = ({ project }) => {
  const gradientClass = getGradientFromName(project.name);
  const hostname = project.url !== '#' ? new URL(project.url).hostname : 'localhost';
  
  const [imgSrc, setImgSrc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // If we have a high-performance local screenshot cached, use it instantly.
    if (project.screenshot) {
      setImgSrc(project.screenshot);
      setLoading(false);
      return;
    }

    if (!project.url || project.url === '#') {
      setError(true);
      setLoading(false);
      return;
    }

    // Connect to real-time dynamic Microlink screenshot API (headless viewport: 1280x800)
    const apiUrl = `https://api.microlink.io/?url=${encodeURIComponent(project.url)}&screenshot=true&embed=screenshot.url&viewport.width=1280&viewport.height=800`;
    setImgSrc(apiUrl);
  }, [project.url, project.screenshot]);

  return (
    <div className="w-full h-full relative flex flex-col bg-background/50 border border-border/40 rounded-t-lg overflow-hidden group-hover:border-primary/30 transition-all duration-300">
      {/* Browser Header Controls */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-neutral-900 border-b border-border/50 shrink-0 select-none">
        {/* Apple-style mock buttons */}
        <div className="flex gap-1.5 items-center shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#ff5f56]" />
          <span className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
          <span className="w-2 h-2 rounded-full bg-[#27c93f]" />
        </div>
        {/* address bar with security indicator */}
        <div className="flex items-center gap-1.5 bg-neutral-800 text-neutral-400 rounded-md px-3 py-0.5 text-[9px] truncate max-w-[140px] md:max-w-[160px] mx-auto border border-border/30 font-mono">
          <svg className="w-2.5 h-2.5 text-emerald-500 shrink-0 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
          </svg>
          {hostname}
        </div>
        <div className="w-[32px] shrink-0" />
      </div>

      {/* Embedded Live Screenshot Container */}
      <div className="relative flex-grow overflow-hidden bg-muted">
        {loading && (
          <div className="absolute inset-0 bg-neutral-950 flex flex-col items-center justify-center z-10 gap-3 border-t border-border/30">
            <div className="relative flex items-center justify-center w-10 h-10">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/20 opacity-75" />
              <div className="w-7 h-7 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
            </div>
            <span className="text-[9px] text-neutral-400 font-mono tracking-widest uppercase">FETCHING API SCREEN...</span>
          </div>
        )}

        {!error && imgSrc ? (
          <img
            src={imgSrc}
            alt={`${project.name} Live Screenshot`}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
            onLoad={() => setLoading(false)}
            onError={() => {
              setError(true);
              setLoading(false);
            }}
            loading="lazy"
          />
        ) : (
          /* High-end Branded Solid Gradient Fallback */
          <div className={`w-full h-full relative bg-gradient-to-br ${gradientClass} flex items-center justify-center overflow-hidden`}>
            <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, currentColor 10px, currentColor 11px)' }}></div>
            <div className="relative z-10 p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl group-hover:scale-110 transition-transform duration-500">
              <Globe className="w-8 h-8 text-white/90" strokeWidth={1.5} />
            </div>
          </div>
        )}
        
        {/* Dynamic ambient highlight */}
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </div>
  );
};

const ProjectCard = ({ project, idx }) => {
  const { ref, motionProps } = useCardTilt(6);
  const ios = isIOS();

  return (
    <motion.div
      ref={ref}
      {...(ios ? {} : motionProps)}
      layout
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
      transition={{ duration: 0.35, delay: Math.min(idx * 0.04, 0.4), ease: ease.out }}
      className="perspective-[1000px] h-full"
    >
      <Card className="h-full glass-card border-border/50 premium-shadow hover-glow group flex flex-col overflow-hidden select-none transition-all duration-300 transform-gpu preserve-3d">
        <div className="w-full h-44 bg-muted relative overflow-hidden border-b border-border/50">
          <BrowserMockup project={project} />
          <div className="absolute inset-0 bg-background/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
            >
              View Live <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
        <CardContent className="p-6 relative bg-gradient-to-b from-background to-background/80 flex-grow flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-5">
              <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center group-hover:bg-primary transition-colors duration-200 shrink-0 overflow-hidden p-1.5 border border-border/50">
                {getDomainFavicon(project.url) ? (
                  <img
                    src={getDomainFavicon(project.url)}
                    alt={`${project.name} icon`}
                    className="w-full h-full object-contain rounded-md"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                ) : null}
                <Globe className="w-5 h-5 text-primary group-hover:text-primary-foreground" style={{ display: getDomainFavicon(project.url) ? 'none' : 'block' }} />
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/20">
                {project.type}
              </span>
            </div>

            <h4 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors duration-200 leading-snug">
              {project.name}
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
              {project.description}
            </p>
          </div>

          <div className="pt-4 border-t border-border/50">
            <div className="flex flex-wrap gap-1 mb-3">
              {project.tech.map((t, tIdx) => (
                <TechBadge key={tIdx} tech={t} />
              ))}
            </div>
            <div className="flex items-center justify-end">
              {project.url !== '#' && (
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors p-1" aria-label={`Open ${project.name} in a new tab`}>
                  <ArrowUpRight className="w-5 h-5 shrink-0" />
                </a>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ClientProjectsSection = () => {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'SaaS', 'E-commerce', 'Services', 'Enterprise'];

  const filteredProjects = filter === 'All'
    ? projectsData
    : projectsData.filter(p => p.type === filter);

  return (
    <section className="py-16 md:py-24 bg-muted/30" id="projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <FadeIn className="max-w-2xl">
            <h2 className="mb-4 text-3xl md:text-5xl font-extrabold tracking-tight">
              <TextReveal text="Enterprise Client Portfolio" className="text-gradient-primary" />
            </h2>
            <p className="text-lg text-muted-foreground">
              A curated selection of {projectsData.length} robust web applications, enterprise systems, and
              high-performance e-commerce platforms deployed globally.
            </p>
          </FadeIn>

          <FadeIn delay={0.1} className="flex flex-wrap gap-2">
            {filters.map(f => (
              <motion.button
                key={f}
                onClick={() => setFilter(f)}
                whileHover={isIOS() ? {} : { scale: 1.04 }}
                whileTap={isIOS() ? {} : { scale: 0.96 }}
                className={`relative px-4 py-2 rounded-full text-sm font-bold transition-colors duration-150 ${
                  filter === f
                    ? 'text-white'
                    : 'bg-card border border-border text-foreground/70 hover:bg-primary/10 hover:border-primary/40 hover:text-primary'
                }`}
              >
                {filter === f && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 bg-primary rounded-full shadow-md shadow-primary/25"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{f}</span>
              </motion.button>
            ))}
          </FadeIn>
        </div>

        {/* Project grid — AnimatePresence for filter transitions only */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <ProjectCard key={project.name} project={project} idx={idx} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ClientProjectsSection;

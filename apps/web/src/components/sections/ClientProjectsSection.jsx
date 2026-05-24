import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ArrowUpRight, Terminal, ExternalLink } from 'lucide-react';
import { FadeIn, isIOS, ease } from '@/lib/motion.jsx';
import {
  SiLaravel, SiVuedotjs, SiRedis, SiJavascript,
  SiWordpress, SiWoocommerce, SiPhp, SiMysql, SiElementor,
  SiNginx, SiApache, SiCloudflare, SiMapbox,
  SiBootstrap, SiReact, SiNodedotjs, SiPlesk, SiTailwindcss
} from 'react-icons/si';
import { TbApi, TbCloud } from 'react-icons/tb';
import { FaAws, FaDatabase, FaCss3, FaHtml5 } from 'react-icons/fa';

const featuredProjects = [
  {
    name: 'Airventory',
    type: 'SaaS · Fulfillment Platform',
    url: 'https://www.airventory.io/',
    description: 'Enterprise e-commerce fulfillment automation platform with priority-lane queue processing, ShipStation integration, and Fabric.js canvas for custom product label printing.',
    challenge: 'Manual fulfillment causing 30% error rate and 4-hour processing delays for high-volume operations.',
    architecture: 'Laravel queue system (priority lanes) + Redis deduplication + AWS Lambda + ShipStation API + Fabric.js canvas',
    tech: ['Laravel', 'Redis', 'AWS', 'Vue.js', 'Fabric.js'],
    metric: '10K+ Orders/Month',
    impact: '60% Error Reduction',
    screenshot: '/screenshots/airventory.png',
    featured: true,
  },
  {
    name: 'MapView AI',
    type: 'SaaS · Intelligence Platform',
    url: 'https://mapview.ai/',
    description: 'Marketing intelligence SaaS overlaying property leads, zoning maps, and demographic insights onto interactive Mapbox maps with AI-powered data enrichment.',
    challenge: 'Real estate teams needed visual intelligence dashboards combining disparate data sources with live map overlays.',
    architecture: 'WordPress + Cloudflare CDN + Mapbox GL API + custom PHP data pipeline + AI enrichment layer',
    tech: ['PHP', 'Cloudflare', 'Mapbox API', 'WordPress'],
    metric: 'Real-Time Intelligence',
    impact: 'AI-Enhanced Maps',
    screenshot: '/screenshots/mapview.png',
    featured: true,
  },
  {
    name: 'ProfileTag Germany',
    type: 'SaaS · Digital Identity',
    url: 'https://www.profiletag.de/',
    description: 'SaaS platform enabling users to design mobile-optimized biolink pages, digital business cards, and custom QR codes for social marketing campaigns.',
    challenge: 'German market needed a GDPR-compliant, high-performance biolink SaaS with QR code generation and analytics.',
    architecture: 'PHP + Nginx + Tailwind CSS + custom QR engine + Plesk deployment automation',
    tech: ['PHP', 'Nginx', 'Plesk', 'Tailwind CSS'],
    metric: '1000+ Active Users',
    impact: 'GDPR Compliant',
    screenshot: '/screenshots/profiletag.png',
    featured: true,
  },
];

const allProjects = [
  { name: 'Mehta College', type: 'Enterprise', tech: ['WordPress', 'PHP', 'MySQL'], url: 'https://www.mehtacollege.com/', screenshot: '/screenshots/mehta_college.png' },
  { name: 'Kritasya Jewels', type: 'E-commerce', tech: ['WordPress', 'WooCommerce', 'PHP'], url: 'https://kritasyajewels.com/', screenshot: '/screenshots/kritasyajewels.png' },
  { name: 'Mehandipur Balaji Seva', type: 'Services', tech: ['WordPress', 'PHP', 'WhatsApp API'], url: 'https://mehandipurbalajiseva.com/', screenshot: '/screenshots/mehandipurbalajiseva.png' },
  { name: 'Bright Hygiene Group', type: 'Enterprise', tech: ['WordPress', 'PHP', 'Nginx'], url: 'http://brighthygienegroup.in/', screenshot: '/screenshots/brighthygienegroup.png' },
  { name: 'Aussie Translations', type: 'Services', tech: ['WordPress', 'PHP', 'Nginx'], url: 'https://aussietranslations.com.au/', screenshot: '/screenshots/aussietranslations.png' },
  { name: 'Flow Rental', type: 'Services', tech: ['WordPress', 'PHP', 'Custom JS'], url: 'https://www.flowrental.dk/', screenshot: '/screenshots/flowrental.png' },
  { name: 'Zircodata', type: 'Enterprise', tech: ['WordPress', 'WooCommerce', 'SQL Server'], url: 'https://www.zircodata.com/', screenshot: '/screenshots/zircodata.png' },
  { name: 'CleanGuys Germany', type: 'Services', tech: ['WordPress', 'WooCommerce'], url: 'https://cleanguys.de/', screenshot: '/screenshots/cleanguys.png' },
  { name: 'MedTrans', type: 'Services', tech: ['WordPress', 'Vue.js', 'NAATI API'], url: 'https://medtrans.com.au/', screenshot: '/screenshots/medtrans.png' },
  { name: 'Legal Translations AU', type: 'Services', tech: ['WordPress', 'WooCommerce', 'PHP'], url: 'https://legal-translations.com.au/', screenshot: '/screenshots/legaltranslations.png' },
  { name: 'EasyITRFile', type: 'Services', tech: ['WordPress', 'PHP', 'Elementor'], url: 'https://easyitrfile.com', screenshot: '/screenshots/easyitrfile.png' },
  { name: 'Cake Deco Supplies AU', type: 'E-commerce', tech: ['WooCommerce', 'PHP', 'Cloudflare'], url: 'https://cakedecosupplies.com.au/', screenshot: '/screenshots/cakedecosupplies.png' },
  { name: 'Mehta CI', type: 'Enterprise', tech: ['WordPress', 'PHP', 'Custom CSS'], url: 'https://www.mehtaci.com/', screenshot: '/screenshots/mehtaci.png' },
  { name: 'SalesPundit AU', type: 'SaaS', tech: ['WordPress', 'React', 'REST APIs'], url: 'https://salespundit.com.au/', screenshot: '/screenshots/salespundit.png' },
  { name: 'Salg.nu', type: 'E-commerce', tech: ['HTML5', 'CSS3', 'JavaScript'], url: 'https://www.salg.nu/', screenshot: '/screenshots/salg.png' },
  { name: 'Jacksons Retreat NZ', type: 'Services', tech: ['WordPress', 'WooCommerce', 'Booking APIs'], url: 'https://www.jacksonsretreat.co.nz/', screenshot: '/screenshots/jacksonsretreat.png' },
  { name: 'XFC Gym 247', type: 'Services', tech: ['WordPress', 'Elementor', 'PHP'], url: 'https://xfcgym247.com.au/', screenshot: '/screenshots/xfcgym247.png' },
  { name: 'White Knight Cyber', type: 'Enterprise', tech: ['WordPress', 'Nginx', 'Nginx WAF'], url: 'https://whiteknightcyber.com/', screenshot: '/screenshots/whiteknightcyber.png' },
  { name: 'ITechPanel', type: 'Services', tech: ['WordPress', 'React', 'Node.js'], url: 'http://itechpanel.com/', screenshot: '/screenshots/itechpanel.png' },
];

const TechIcon = ({ name, className }) => {
  const n = name.toLowerCase();
  const p = { className };
  if (n.includes('laravel')) return <SiLaravel {...p} style={{ color: '#FF2D20' }} />;
  if (n.includes('vue')) return <SiVuedotjs {...p} style={{ color: '#4FC08D' }} />;
  if (n.includes('aws')) return <FaAws {...p} style={{ color: '#FF9900' }} />;
  if (n.includes('redis')) return <SiRedis {...p} style={{ color: '#DC382D' }} />;
  if (n.includes('wordpress')) return <SiWordpress {...p} style={{ color: '#21759B' }} />;
  if (n.includes('woocommerce')) return <SiWoocommerce {...p} style={{ color: '#96588A' }} />;
  if (n.includes('php')) return <SiPhp {...p} style={{ color: '#777BB4' }} />;
  if (n.includes('mysql')) return <SiMysql {...p} style={{ color: '#4479A1' }} />;
  if (n.includes('elementor')) return <SiElementor {...p} style={{ color: '#D53184' }} />;
  if (n.includes('nginx')) return <SiNginx {...p} style={{ color: '#009639' }} />;
  if (n.includes('apache')) return <SiApache {...p} style={{ color: '#D22128' }} />;
  if (n.includes('cloudflare')) return <SiCloudflare {...p} style={{ color: '#F38020' }} />;
  if (n.includes('mapbox')) return <SiMapbox {...p} style={{ color: '#aaa' }} />;
  if (n.includes('sql server')) return <FaDatabase {...p} style={{ color: '#CC292B' }} />;
  if (n.includes('css')) return <FaCss3 {...p} style={{ color: '#1572B6' }} />;
  if (n.includes('bootstrap')) return <SiBootstrap {...p} style={{ color: '#7952B3' }} />;
  if (n.includes('react')) return <SiReact {...p} style={{ color: '#61DAFB' }} />;
  if (n.includes('html')) return <FaHtml5 {...p} style={{ color: '#E34F26' }} />;
  if (n.includes('node')) return <SiNodedotjs {...p} style={{ color: '#339933' }} />;
  if (n.includes('plesk')) return <SiPlesk {...p} style={{ color: '#52B0E8' }} />;
  if (n.includes('tailwind')) return <SiTailwindcss {...p} style={{ color: '#06B6D4' }} />;
  if (n.includes('fabric') || n.includes('js') || n.includes('javascript')) return <SiJavascript {...p} style={{ color: '#F7DF1E' }} />;
  if (n.includes('api')) return <TbApi {...p} style={{ color: '#60a5fa' }} />;
  return <Terminal className={className} />;
};

const TechBadge = ({ tech }) => (
  <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold mono-badge px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.08] text-foreground/70">
    <TechIcon name={tech} className="w-3 h-3 shrink-0" />
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

// Featured project card — large horizontal layout
const FeaturedProjectCard = ({ project, index }) => {
  const ios = isIOS();
  const isEven = index % 2 === 0;

  return (
    <motion.div
      variants={ios ? {} : {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 } },
      }}
      className="glass-card rounded-2xl overflow-hidden border border-white/[0.07]"
    >
      <div className={`grid grid-cols-1 lg:grid-cols-2 ${isEven ? '' : 'lg:[&>*:first-child]:order-2'}`}>
        {/* Screenshot */}
        <div className="relative h-56 lg:h-auto bg-background/50 overflow-hidden">
          {project.screenshot ? (
            <img
              src={project.screenshot}
              alt={`${project.name} screenshot`}
              className="w-full h-full object-cover object-top"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500/10 to-cyan-500/5">
              <Globe className="w-12 h-12 text-muted-foreground/30" strokeWidth={1} />
            </div>
          )}
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-background/60" />
        </div>

        {/* Content */}
        <div className="p-7 md:p-9 flex flex-col justify-center gap-5">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="section-label text-indigo-400">{project.type}</span>
              {project.url !== '#' && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground smooth-transition"
                  aria-label={`Visit ${project.name}`}
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
            <h3 className="font-extrabold text-foreground mb-3" style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)' }}>
              {project.name}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-3">
              {project.description}
            </p>
          </div>

          {/* Architecture note */}
          <div className="text-xs text-muted-foreground/70 border-l-2 border-indigo-500/30 pl-3 leading-relaxed">
            <span className="text-indigo-400/70 section-label mr-2">ARCH</span>
            {project.architecture}
          </div>

          {/* Metrics */}
          <div className="flex gap-2 flex-wrap">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {project.metric}
            </span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              {project.impact}
            </span>
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t, i) => (
              <TechBadge key={i} tech={t} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Compact project card for the grid
const CompactProjectCard = ({ project }) => {
  const ios = isIOS();
  const favicon = getDomainFavicon(project.url);

  return (
    <motion.div
      variants={ios ? {} : {
        hidden: { opacity: 0, y: 20, scale: 0.97 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
      }}
      className="glass-card rounded-xl p-5 card-hover flex flex-col gap-3 h-full"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center overflow-hidden p-1">
          {favicon ? (
            <img src={favicon} alt="" className="w-full h-full object-contain rounded" loading="lazy"
              onError={(e) => { e.target.style.display = 'none'; }} />
          ) : (
            <Globe className="w-4 h-4 text-muted-foreground/60" />
          )}
        </div>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-muted-foreground">
          {project.type}
        </span>
      </div>

      {/* Title */}
      <h4 className="font-bold text-foreground text-sm">{project.name}</h4>

      {/* Tech */}
      <div className="flex flex-wrap gap-1 mt-auto">
        {project.tech.slice(0, 3).map((t, i) => (
          <TechBadge key={i} tech={t} />
        ))}
      </div>

      {/* Link */}
      {project.url !== '#' && (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[10px] text-muted-foreground/60 hover:text-primary smooth-transition mt-1"
        >
          <Globe className="w-3 h-3" />
          {new URL(project.url).hostname.replace('www.', '')}
          <ArrowUpRight className="w-3 h-3 ml-auto" />
        </a>
      )}
    </motion.div>
  );
};

const ClientProjectsSection = () => {
  const ios = isIOS();

  return (
    <section className="py-10 md:py-28 relative overflow-hidden" id="projects">
      <div className="absolute top-0 left-0 right-0 h-px bg-white/[0.06]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Featured Projects ── */}
        <FadeIn className="mb-16">
          <div className="section-label mb-4">FEATURED WORK</div>
          <h2 className="font-extrabold text-foreground mb-4" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}>
            Flagship Projects
          </h2>
          <p className="text-muted-foreground max-w-xl" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.0625rem)' }}>
            Production systems with real architecture, real scale, real impact.
          </p>
        </FadeIn>

        <motion.div
          className="space-y-6 mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '60px' }}
          variants={{ hidden: {}, visible: {} }}
        >
          {featuredProjects.map((project, i) => (
            <FeaturedProjectCard key={project.name} project={project} index={i} />
          ))}
        </motion.div>

        {/* ── All Client Work ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
          <FadeIn>
            <div className="section-label mb-3">ALL CLIENT WORK</div>
            <h2 className="font-extrabold text-foreground" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
              {allProjects.length}+ Projects Delivered
            </h2>
          </FadeIn>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '60px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
        >
          {allProjects.map(project => (
            <CompactProjectCard key={project.name} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientProjectsSection;

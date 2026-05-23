import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ArrowUpRight, ArrowRight, Search, Code, Terminal } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const projectsList = [
  {
    name: "Mehta College",
    type: "Enterprise",
    tech: ["WordPress", "Elementor", "PHP", "MySQL"],
    url: "https://www.mehtacollege.com/",
    description: "A comprehensive educational portal for Mehta PG College, featuring student LMS integration, admission workflows, and dynamic academic department management."
  },
  {
    name: "Airventory",
    type: "SaaS",
    tech: ["Laravel", "Vue.js", "AWS", "Redis", "Fabric.js"],
    url: "https://www.airventory.io/",
    description: "Enterprise e-commerce fulfillment and shipping automation platform integrated with ShipStation, Fabric.js canvas printing, and AWS Lambda."
  },
  {
    name: "Kritasya Jewels",
    type: "E-commerce",
    tech: ["WordPress", "WooCommerce", "PHP", "MySQL"],
    url: "https://kritasyajewels.com/",
    description: "Premium fine jewelry e-commerce platform featuring advanced multi-attribute filtering, high-resolution product zooms, and secure checkouts."
  },
  {
    name: "Mehandipur Balaji Seva",
    type: "Services",
    tech: ["WordPress", "Elementor", "PHP", "WhatsApp API"],
    url: "https://mehandipurbalajiseva.com/",
    description: "Devotional service booking platform facilitating online booking of sawamani prasad and arji offerings, integrated with WhatsApp notifications."
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
    description: "Specialized retail and wholesale baking supplies e-commerce store in Australia, supporting massive product variation trees."
  },
  {
    name: "Mehta CI",
    type: "Enterprise",
    tech: ["WordPress", "Elementor", "PHP", "Custom CSS"],
    url: "https://www.mehtaci.com/",
    description: "Portfolio website for high-end commercial interiors and workspace design studio, highlighting premium visual case studies."
  },
  {
    name: "SalesPundit Australia",
    type: "SaaS",
    tech: ["WordPress", "React", "Elementor", "REST APIs"],
    url: "https://salespundit.com.au/",
    description: "Sales CRM and pipeline manager focusing on customer journey tracing, email marketing integrations, and performance reporting."
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
    description: "SaaS tool enabling users to design mobile-optimized biolink pages, digital business cards, and custom QR codes for social marketing."
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
  if (n.includes('aws')) return <FaAws {...iconProps} color="#232F3E" />;
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

const TechBadge = ({ tech }) => {
  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded bg-muted border border-border text-foreground/80 dark:text-foreground/90">
      <TechIcon name={tech} className="w-3.5 h-3.5 shrink-0" />
      {tech}
    </span>
  );
};

const getDomainFavicon = (url) => {
  try {
    if (url && url.startsWith('http')) {
      const hostname = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
    }
  } catch (e) {
    // ignore
  }
  return null;
};

const ProjectImage = ({ url, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [src, setSrc] = useState(`https://s0.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=800&h=600`);

  return (
    <div className="w-full h-full relative">
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted/20 animate-pulse flex items-center justify-center backdrop-blur-sm z-10">
          <div className="w-8 h-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
        </div>
      )}
      <img 
        src={src} 
        alt={alt} 
        className={`w-full h-full object-cover object-top transition-all duration-700 ease-out group-hover:scale-110 ${
          isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
        }`}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setSrc("https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop");
          setIsLoaded(true);
        }}
      />
    </div>
  );
};

const ProjectsPage = () => {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const filters = ['All', 'SaaS', 'E-commerce', 'Services', 'Enterprise'];

  const filteredProjects = projectsList.filter(project => {
    const matchesFilter = filter === 'All' || project.type === filter;
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Projects &amp; Case Studies | Dikshant Goyal - Web Developer in Jaipur</title>
        <meta name="description" content="Explore featured projects, premium eCommerce WooCommerce stores, and customized software systems built by Dikshant Goyal, a top-rated web developer in Jaipur." />
        <meta name="keywords" content="web development projects, WooCommerce developer Jaipur, WordPress developer Jaipur, web developer portfolio Jaipur" />
      </Helmet>

      <Header />

      <main className="flex-grow pt-32 pb-24 relative z-10">
        {/* Background Blobs */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-[20%] left-[-10%] w-[35vw] h-[35vw] rounded-full bg-primary/4 blur-[100px]" />
          <div className="absolute bottom-[20%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-secondary/4 blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 text-center max-w-3xl mx-auto"
          >
            <h1 className="mb-6 text-gradient-primary">Project Directory</h1>
            <p className="text-xl text-muted-foreground">
              A comprehensive directory of {projectsList.length} production applications, custom e-commerce setups, SaaS platforms, and digital solutions deployed globally.
            </p>
          </motion.div>

          {/* Search & Filter Controls */}
          <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12 bg-card/40 backdrop-blur-md p-6 rounded-2xl border border-border/50 premium-shadow">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search projects or tech..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 bg-background border-border/50 focus-visible:ring-primary text-foreground w-full rounded-xl"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 justify-center w-full md:w-auto">
              {filters.map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider smooth-transition ${
                    filter === f 
                      ? 'bg-primary text-white shadow-md shadow-primary/30' 
                      : 'bg-background border border-border/60 text-foreground/70 hover:bg-primary/10 hover:border-primary/40 hover:text-primary'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.name}
                    layout
                    initial={false}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="h-full glass-card border-border/50 premium-shadow hover-glow group flex flex-col overflow-hidden">
                      {/* Image Thumbnail */}
                      <div className="w-full h-44 bg-muted relative overflow-hidden border-b border-border/50">
                        <ProjectImage url={project.url} alt={`${project.name} preview`} />
                        <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent smooth-transition z-10" />
                        <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 smooth-transition duration-300 z-20">
                          <a href={project.url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 smooth-transition">
                            View Live <ArrowRight className="w-4 h-4" />
                          </a>
                        </div>
                      </div>

                      {/* Content Details */}
                      <CardContent className="p-6 relative bg-gradient-to-b from-background to-background/80 flex-grow flex flex-col justify-between">
                        <div>
                          {/* Header */}
                          <div className="flex justify-between items-center mb-4">
                            <div className="w-9 h-9 rounded-lg bg-primary/5 flex items-center justify-center group-hover:bg-primary smooth-transition shrink-0 overflow-hidden p-1.5 border border-border/50">
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
                              <Globe className="w-4 h-4 text-primary group-hover:text-primary-foreground" style={{ display: getDomainFavicon(project.url) ? 'none' : 'block' }} />
                            </div>
                            <Badge variant="outline" className="bg-secondary/10 text-secondary border border-secondary/20 font-bold uppercase tracking-wider text-[10px] px-2 py-0.5 rounded-full">
                              {project.type}
                            </Badge>
                          </div>

                          {/* Title & Description */}
                          <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-primary smooth-transition leading-snug">
                            {project.name}
                          </h3>
                          <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-3 group-hover:text-foreground/90 smooth-transition">
                            {project.description}
                          </p>
                        </div>

                        {/* Tech list & live link */}
                        <div className="pt-4 border-t border-border/50">
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {project.tech.map((t, tIdx) => (
                              <TechBadge key={tIdx} tech={t} />
                            ))}
                          </div>
                          <div className="flex items-center justify-end text-xs text-primary font-bold">
                            {project.url !== '#' && (
                              <a href={project.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline smooth-transition">
                                Visit Site <ArrowUpRight className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                              </a>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="text-center py-20 bg-card/30 rounded-2xl border border-border/50">
              <Code className="w-12 h-12 text-muted-foreground mx-auto mb-4 animate-pulse" />
              <h3 className="text-xl font-bold text-foreground mb-2">No Projects Found</h3>
              <p className="text-muted-foreground">Try clearing your filters or adjusting your search term.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectsPage;
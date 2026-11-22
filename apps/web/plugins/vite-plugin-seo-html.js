/**
 * Build-time prerendering for crawlers (search engines, social cards, LLMs, no-JS clients).
 *
 * The app is a client-rendered SPA, so for every route this plugin writes a real HTML file containing:
 *  - the correct <title>, description, canonical, Open Graph / Twitter tags and robots directive
 *  - semantic static content (React replaces it on mount)
 *  - schema.org JSON-LD for that page
 * It also emits sitemap.xml and 404.html. All content comes from src/config/* (single source of truth).
 */
import fs from 'node:fs';
import path from 'node:path';
import { services, getService, engagementModels, faqs, processSteps } from '../src/config/offer.js';
import { experience, skillGroups, resumeSummary } from '../src/config/resume.js';
import { siteConfig } from '../src/config/site.js';
import { SITE, allPages, getPageMeta, NOT_FOUND } from '../src/config/seo.js';

const U = SITE.url;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const urlOf = (p) => (p === '/' ? `${U}/` : `${U}${p}`);
const ld = (obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;

// ───────────────────────── JSON-LD ─────────────────────────
const person = () => ({
  '@type': 'Person',
  '@id': `${U}/#person`,
  name: 'Dikshant Goyal',
  givenName: 'Dikshant',
  familyName: 'Goyal',
  jobTitle: 'Full-Stack Developer & Technical Consultant',
  description: getPageMeta('/').description,
  url: `${U}/`,
  image: SITE.image,
  email: `mailto:${siteConfig.email}`,
  telephone: siteConfig.phone,
  worksFor: { '@type': 'Organization', name: 'iTechPanel LLP' },
  sameAs: [siteConfig.links.linkedin, siteConfig.links.github, siteConfig.links.twitter],
  address: { '@type': 'PostalAddress', addressLocality: 'Jaipur', addressRegion: 'Rajasthan', addressCountry: 'IN' },
  knowsAbout: [...new Set(skillGroups.flatMap((g) => g.items))],
});

const serviceNode = (s) => ({
  '@type': 'Service',
  '@id': `${U}/services/${s.id}#service`,
  name: s.title,
  description: s.metaDescription,
  url: `${U}/services/${s.id}`,
  serviceType: s.title,
  provider: { '@id': `${U}/#person` },
  areaServed: 'Worldwide',
});

const faqNode = (list, id) => ({
  '@type': 'FAQPage',
  ...(id ? { '@id': id } : {}),
  mainEntity: list.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});

const crumbs = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: it.url })),
});

const professionalService = () => ({
  '@type': 'ProfessionalService',
  '@id': `${U}/#service`,
  name: 'Dikshant Goyal — Software Development & Technical Consulting',
  url: `${U}/services`,
  image: SITE.image,
  description: getPageMeta('/services').description,
  provider: { '@id': `${U}/#person` },
  areaServed: 'Worldwide',
  availableLanguage: ['en', 'hi'],
  address: { '@type': 'PostalAddress', addressLocality: 'Jaipur', addressRegion: 'Rajasthan', addressCountry: 'IN' },
  email: siteConfig.email,
  telephone: siteConfig.phone,
  contactPoint: { '@type': 'ContactPoint', contactType: 'sales', email: siteConfig.email, telephone: siteConfig.phone, availableLanguage: ['en', 'hi'] },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Services',
    itemListElement: services.map((s) => ({ '@type': 'Offer', itemOffered: serviceNode(s) })),
  },
});

const jsonLdFor = (page) => {
  const base = { '@context': 'https://schema.org', '@graph': [] };
  const g = base['@graph'];
  const webpage = (type, extra = {}) => ({
    '@type': type,
    '@id': `${urlOf(page.path)}#webpage`,
    url: urlOf(page.path),
    name: page.title,
    description: page.description,
    isPartOf: { '@id': `${U}/#website` },
    inLanguage: 'en',
    primaryImageOfPage: { '@type': 'ImageObject', url: SITE.image, width: 1200, height: 630 },
    ...extra,
  });
  const website = {
    '@type': 'WebSite',
    '@id': `${U}/#website`,
    url: `${U}/`,
    name: SITE.name,
    alternateName: 'Dikshant Goyal',
    description: getPageMeta('/').description,
    inLanguage: 'en',
    publisher: { '@id': `${U}/#person` },
  };
  const home = { name: 'Home', url: `${U}/` };

  if (page.path === '/') {
    g.push(website, webpage('ProfilePage', { about: { '@id': `${U}/#person` } }), person(), professionalService(), faqNode(faqs, `${U}/#faq`));
  } else if (page.path === '/services') {
    g.push(
      website,
      webpage('CollectionPage', { about: { '@id': `${U}/#service` } }),
      person(),
      professionalService(),
      {
        '@type': 'ItemList',
        itemListElement: services.map((s, i) => ({ '@type': 'ListItem', position: i + 1, url: `${U}/services/${s.id}`, name: s.title })),
      },
      crumbs([home, { name: 'Services', url: `${U}/services` }])
    );
  } else if (page.path === '/resume') {
    g.push(
      website,
      webpage('ProfilePage', { mainEntity: { '@id': `${U}/#person` } }),
      person(),
      crumbs([home, { name: 'Resume', url: `${U}/resume` }])
    );
  } else if (page.path.startsWith('/services/')) {
    const s = getService(page.path.split('/')[2]);
    g.push(
      website,
      webpage('WebPage', { mainEntity: { '@id': `${U}/services/${s.id}#service` } }),
      person(),
      serviceNode(s),
      faqNode(s.faqs),
      crumbs([home, { name: 'Services', url: `${U}/services` }, { name: s.title, url: `${U}/services/${s.id}` }])
    );
  }
  return g.length ? ld(base) : '';
};

// ───────────────────────── <head> block ─────────────────────────
const headFor = (page) => {
  const url = urlOf(page.path);
  const ogTitle = page.ogTitle || page.title;
  const robots = page.noindex
    ? 'noindex, follow'
    : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';
  const t = [
    `<title>${esc(page.title)}</title>`,
    `<meta name="title" content="${esc(page.title)}" />`,
    page.description && `<meta name="description" content="${esc(page.description)}" />`,
    page.keywords && `<meta name="keywords" content="${esc(page.keywords)}" />`,
    `<meta name="robots" content="${robots}" />`,
    !page.noindex && `<link rel="canonical" href="${url}" />`,
    !page.noindex && `<link rel="alternate" hreflang="en" href="${url}" />`,
    !page.noindex && `<link rel="alternate" hreflang="x-default" href="${url}" />`,
    `<meta property="og:type" content="${page.path === '/' ? 'website' : page.path === '/resume' ? 'profile' : 'article'}" />`,
    `<meta property="og:site_name" content="${esc(SITE.name)}" />`,
    `<meta property="og:locale" content="${SITE.locale}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${esc(ogTitle)}" />`,
    page.description && `<meta property="og:description" content="${esc(page.description)}" />`,
    `<meta property="og:image" content="${SITE.image}" />`,
    `<meta property="og:image:secure_url" content="${SITE.image}" />`,
    `<meta property="og:image:type" content="image/jpeg" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(SITE.imageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:site" content="${SITE.twitter}" />`,
    `<meta name="twitter:creator" content="${SITE.twitter}" />`,
    `<meta name="twitter:url" content="${url}" />`,
    `<meta name="twitter:title" content="${esc(ogTitle)}" />`,
    page.description && `<meta name="twitter:description" content="${esc(page.description)}" />`,
    `<meta name="twitter:image" content="${SITE.image}" />`,
    `<meta name="twitter:image:alt" content="${esc(SITE.imageAlt)}" />`,
    jsonLdFor(page),
  ];
  return t.filter(Boolean).join('\n\t\t');
};

// ───────────────────────── static body content ─────────────────────────
const S = {
  wrap: 'max-width:960px;margin:0 auto;padding:96px 24px 48px;font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#e8ecff',
  h1: 'font-size:clamp(2.25rem,6vw,4rem);line-height:1.1;letter-spacing:-0.04em;font-weight:800;margin:0 0 20px',
  h2: 'font-size:1.5rem;margin:40px 0 14px',
  p: 'max-width:700px;line-height:1.65;color:#9aa3c7;margin:0 0 20px',
  ul: 'line-height:1.7;color:#c7d0ff;padding-left:20px',
  a: 'color:#fff',
  muted: 'color:#9aa3c7',
};
const nav = () =>
  `<nav aria-label="Primary" style="margin-bottom:24px"><a href="/" style="${S.a}">Home</a> · <a href="/services" style="${S.a}">Services</a> · <a href="/resume" style="${S.a}">Resume</a> · <a href="/#projects" style="${S.muted}">Projects</a> · <a href="/#contact" style="${S.muted}">Contact</a></nav>`;
const serviceLinks = (list) =>
  `<ul style="${S.ul}">${list.map((s) => `<li><a href="/services/${s.id}" style="${S.a}"><strong>${esc(s.title)}</strong></a>: ${esc(s.summary)}</li>`).join('')}</ul>`;
const contact = () =>
  `<h2 style="${S.h2}">Contact</h2><p style="${S.p}">Email <a href="mailto:${esc(siteConfig.email)}" style="${S.a}">${esc(siteConfig.email)}</a> · <a href="${esc(siteConfig.whatsappUrl)}" style="${S.a}">WhatsApp</a> · <a href="${esc(siteConfig.links.linkedin)}" style="${S.a}">LinkedIn</a> · <a href="${esc(siteConfig.links.github)}" style="${S.a}">GitHub</a></p>`;
const faqHtml = (list) =>
  `<dl style="line-height:1.6;color:#c7d0ff">${list.map((f) => `<dt style="font-weight:600;margin-top:12px">${esc(f.q)}</dt><dd style="margin:4px 0 0;${S.muted}">${esc(f.a)}</dd>`).join('')}</dl>`;

const bodyFor = (page) => {
  let inner;
  if (page.path === '/') {
    inner = `${nav()}
  <p style="color:#7ee8fa;font-size:14px;margin:0 0 16px">Available for consulting &amp; new projects</p>
  <h1 style="${S.h1}">Full-Stack Developer &amp; Technical Consultant: Web Apps, APIs, AI &amp; Cloud.</h1>
  <p style="${S.p}">Dikshant Goyal builds production web applications, backends, integrations and AI automation with Next.js, React, Node.js, Python, Laravel and AWS, and sets up and secures the servers they run on. Based in Jaipur, India, working with clients worldwide.</p>
  <p><a href="/#contact" style="${S.a}">Book a consultation</a> · <a href="/services" style="${S.muted}">All services</a> · <a href="/resume" style="${S.muted}">Resume</a></p>
  <h2 style="${S.h2}">Services &amp; consulting</h2>${serviceLinks(services)}
  <h2 style="${S.h2}">Ways to work together</h2>
  <ul style="${S.ul}">${engagementModels.map((m) => `<li><strong>${esc(m.title)}</strong>: ${esc(m.bestFor)}</li>`).join('')}</ul>
  <h2 style="${S.h2}">Frequently asked questions</h2>${faqHtml(faqs)}${contact()}`;
  } else if (page.path === '/services') {
    inner = `${nav()}<h1 style="${S.h1}">Web, API, AI &amp; DevOps Services</h1>
  <p style="${S.p}">I'm Dikshant Goyal, a full-stack developer and technical consultant. I help businesses design, build, speed up and run software using Next.js, React, Node.js, Python, Laravel and AWS.</p>
  ${serviceLinks(services)}
  <h2 style="${S.h2}">Ways to work together</h2>
  <ul style="${S.ul}">${engagementModels.map((m) => `<li><strong>${esc(m.title)}</strong>: ${esc(m.bestFor)}</li>`).join('')}</ul>
  <h2 style="${S.h2}">How a project runs</h2>
  <ol style="${S.ul}">${processSteps.map((s) => `<li><strong>${esc(s.title)}</strong>: ${esc(s.text)}</li>`).join('')}</ol>
  <h2 style="${S.h2}">Frequently asked questions</h2>${faqHtml(faqs)}${contact()}`;
  } else if (page.path === '/resume') {
    inner = `${nav()}<h1 style="${S.h1}">Dikshant Goyal</h1>
  <p style="color:#7ee8fa;margin:0 0 12px">Full-Stack Developer &amp; Technical Consultant</p>
  <p style="${S.p}">${esc(resumeSummary)}</p>
  <p><a href="${esc(siteConfig.resume)}" style="${S.a}">Download resume (PDF)</a></p>
  <h2 style="${S.h2}">Skills</h2>
  <ul style="${S.ul}">${skillGroups.map((g) => `<li><strong>${esc(g.group)}</strong>: ${esc(g.items.join(', '))}</li>`).join('')}</ul>
  <h2 style="${S.h2}">Experience</h2>
  ${experience.map((r) => `<h3 style="margin:20px 0 4px">${esc(r.title)}, ${esc(r.company)}</h3><p style="margin:0;${S.muted}">${esc(r.date)} · ${esc(r.location)}</p><ul style="${S.ul}">${r.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>`).join('')}${contact()}`;
  } else if (page.path.startsWith('/services/')) {
    const s = getService(page.path.split('/')[2]);
    const related = services.filter((x) => x.id !== s.id).slice(0, 3);
    inner = `${nav()}<p style="${S.muted};margin:0 0 12px"><a href="/" style="${S.muted}">Home</a> / <a href="/services" style="${S.muted}">Services</a> / ${esc(s.title)}</p>
  <h1 style="${S.h1}">${esc(s.title)}</h1><p style="${S.p}">${esc(s.intro)}</p>
  <h2 style="${S.h2}">What's included</h2><ul style="${S.ul}">${s.includes.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
  <h2 style="${S.h2}">Technologies</h2><p style="${S.p}">${esc(s.tech.join(', '))}</p>
  <h2 style="${S.h2}">Who this is for</h2><ul style="${S.ul}">${s.idealFor.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
  <h2 style="${S.h2}">Frequently asked questions</h2>${faqHtml(s.faqs)}
  <h2 style="${S.h2}">Related services</h2>${serviceLinks(related)}${contact()}`;
  } else {
    inner = `${nav()}<h1 style="${S.h1}">Page not found</h1><p style="${S.p}">The page you are looking for does not exist. <a href="/" style="${S.a}">Go to the home page</a>.</p>`;
  }
  return `<div id="seo-fallback" style="${S.wrap}">${inner}</div>`;
};

// ───────────────────────── sitemap ─────────────────────────
const sitemap = () => {
  const today = new Date().toISOString().slice(0, 10);
  const rows = allPages().map((p) => {
    const priority = p.path === '/' ? '1.0' : p.path === '/services' ? '0.9' : p.path.startsWith('/services/') ? '0.8' : '0.6';
    const img =
      p.path === '/'
        ? `\n    <image:image><image:loc>${SITE.image}</image:loc><image:title>${esc(getPageMeta('/').ogTitle)}</image:title></image:image>`
        : '';
    return `  <url>\n    <loc>${urlOf(p.path)}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${p.path === '/' ? 'weekly' : 'monthly'}</changefreq>\n    <priority>${priority}</priority>${img}\n  </url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${rows.join('\n')}\n</urlset>\n`;
};

// ───────────────────────── plugin ─────────────────────────
const HEAD_RE = /<!--seo:head-->[\s\S]*?<!--\/seo:head-->/;
const BODY_RE = /<!--seo:body-->[\s\S]*?<!--\/seo:body-->/;
const wrapHead = (page) => `<!--seo:head-->\n\t\t${headFor(page)}\n\t\t<!--/seo:head-->`;
const wrapBody = (page) => `<!--seo:body-->${bodyFor(page)}<!--/seo:body-->`;

export default function seoHtmlPlugin() {
  let outDir;
  return {
    name: 'seo-html',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        // In dev/preview the requested path is known; in the build we render the home page.
        const reqPath = (ctx?.originalUrl || '/').split('?')[0].split('#')[0];
        const page = getPageMeta(reqPath);
        return html.replace('<!--SEO_HEAD-->', wrapHead(page)).replace('<!--SEO_BODY-->', wrapBody(page));
      },
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap() });
      // llms.txt: contact details are filled in from src/config/site.js
      const llms = fs
        .readFileSync(new URL('./llms.template.txt', import.meta.url), 'utf8')
        .replace('{{EMAIL}}', siteConfig.email)
        .replace('{{PHONE}}', siteConfig.phoneDisplay);
      this.emitFile({ type: 'asset', fileName: 'llms.txt', source: llms });
    },
    closeBundle() {
      const indexPath = path.join(outDir, 'index.html');
      if (!fs.existsSync(indexPath)) return;
      const template = fs.readFileSync(indexPath, 'utf8');
      const write = (rel, page) => {
        const out = template.replace(HEAD_RE, () => wrapHead(page)).replace(BODY_RE, () => wrapBody(page));
        const file = path.join(outDir, rel);
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(file, out);
      };
      allPages().filter((p) => p.path !== '/').forEach((p) => write(`${p.path.slice(1)}/index.html`, p));
      write('404.html', NOT_FOUND);
    },
  };
}

/**
 * Per-page SEO metadata. Imported by the client (lib/seo.js, to keep <head> correct during
 * client-side navigation) and by the build-time prerenderer (plugins/vite-plugin-seo-html.js).
 */
import { services, getService } from './offer.js';

export const SITE = {
  url: 'https://dikshant-ivory.vercel.app',
  name: 'Dikshant Goyal — Portfolio',
  author: 'Dikshant Goyal',
  twitter: '@csdikshant',
  image: 'https://dikshant-ivory.vercel.app/og-image.jpg',
  imageAlt:
    'Dikshant Goyal — Full-Stack Developer & Technical Consultant. Next.js, Node.js, Python, Laravel and AWS.',
  locale: 'en_US',
};

const HOME = {
  path: '/',
  title: 'Dikshant Goyal | Full-Stack Developer & Technical Consultant',
  ogTitle: 'Dikshant Goyal — Full-Stack Developer & Technical Consultant',
  description:
    'Full-stack developer & technical consultant in Jaipur, India. Web apps, APIs, AI automation and server setup with Next.js, React, Node.js, Python, Laravel and AWS.',
  keywords:
    'Dikshant Goyal, full-stack developer, technical consultant, Next.js developer, React developer, Node.js developer, Python developer, Laravel developer, AWS, server setup, DevOps, OpenAI integration, freelance developer India, Jaipur',
};

const SERVICES_HUB = {
  path: '/services',
  title: 'Web, API, AI & DevOps Services | Dikshant Goyal',
  ogTitle: 'Services: Web, API, AI & DevOps — Dikshant Goyal',
  description:
    'Hire a full-stack developer and technical consultant: web apps, APIs, AI automation, ecommerce integrations, cloud and server setup, audits and project management.',
  keywords:
    'hire full-stack developer, web development services, API development, AI automation, AWS server setup, technical consultant, software audit, freelance developer India',
};

const RESUME = {
  path: '/resume',
  title: 'Resume | Dikshant Goyal, Full-Stack Developer',
  ogTitle: 'Resume — Dikshant Goyal, Full-Stack Developer & Technical Consultant',
  description:
    'Resume of Dikshant Goyal: experience, skills and achievements across Next.js, React, Node.js, Python, Laravel, AWS and technical project management. Download the PDF.',
  keywords: 'Dikshant Goyal resume, full-stack developer resume, Laravel developer CV, Node.js developer, technical project manager',
};

export const NOT_FOUND = {
  path: '/404',
  title: 'Page not found | Dikshant Goyal',
  ogTitle: 'Page not found | Dikshant Goyal',
  description: 'This page could not be found.',
  noindex: true,
};

export const serviceMeta = (s) => ({
  path: `/services/${s.id}`,
  title: `${s.metaTitle} | Dikshant Goyal`,
  ogTitle: `${s.title} — Dikshant Goyal`,
  description: s.metaDescription,
  keywords: `${s.title}, ${s.tech.join(', ')}, freelance, consultant, Dikshant Goyal`,
});

export const allPages = () => [HOME, SERVICES_HUB, ...services.map(serviceMeta), RESUME];

export const getPageMeta = (path) => {
  const clean = (path || '/').replace(/\/+$/, '') || '/';
  const found = allPages().find((p) => p.path === clean);
  if (found) return found;
  const m = clean.match(/^\/services\/([^/]+)$/);
  if (m && getService(m[1])) return serviceMeta(getService(m[1]));
  return NOT_FOUND;
};

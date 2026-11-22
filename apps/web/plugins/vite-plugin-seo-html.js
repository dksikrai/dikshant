/**
 * Generates crawler-visible content from src/config/offer.js (the single source of truth):
 *  - <!--SEO_FALLBACK--> : semantic static HTML placed inside #root. Search engines, social/LLM
 *    crawlers and no-JS clients see real content; React replaces it on mount.
 *  - <!--SEO_JSONLD-->   : schema.org graph (WebSite, ProfilePage, Person, ProfessionalService + Services, FAQPage).
 */
import { services, engagementModels, faqs } from '../src/config/offer.js';
import { siteConfig } from '../src/config/site.js';

const U = 'https://dikshant-ivory.vercel.app';
const IMG = `${U}/og-image.jpg`;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const DESC =
  'Backend & product engineer and technical consultant in Jaipur building scalable Laravel APIs, Redis/Horizon queue systems, AWS infrastructure and OpenAI-powered SaaS platforms.';

const jsonld = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebSite', '@id': `${U}/#website`, url: `${U}/`, name: 'Dikshant Goyal — Portfolio', alternateName: 'Dikshant Goyal', description: DESC, inLanguage: 'en', publisher: { '@id': `${U}/#person` } },
    { '@type': 'ProfilePage', '@id': `${U}/#webpage`, url: `${U}/`, name: 'Dikshant Goyal | Backend & Product Engineer – Laravel, AWS, OpenAI', isPartOf: { '@id': `${U}/#website` }, about: { '@id': `${U}/#person` }, primaryImageOfPage: { '@type': 'ImageObject', url: IMG, width: 1200, height: 630 }, inLanguage: 'en' },
    {
      '@type': 'Person', '@id': `${U}/#person`, name: 'Dikshant Goyal', givenName: 'Dikshant', familyName: 'Goyal',
      jobTitle: 'Backend & Product Engineer, Technical Consultant', description: DESC, url: `${U}/`, image: IMG,
      email: `mailto:${siteConfig.email}`, telephone: siteConfig.phone,
      worksFor: { '@type': 'Organization', name: 'iTechPanel LLP' },
      sameAs: [siteConfig.links.linkedin, siteConfig.links.github, siteConfig.links.twitter],
      address: { '@type': 'PostalAddress', addressLocality: 'Jaipur', addressRegion: 'Rajasthan', addressCountry: 'IN' },
      knowsAbout: ['Laravel', 'PHP', 'Redis', 'Laravel Horizon', 'AWS', 'OpenAI API', 'RAG Systems', 'SaaS Architecture', 'API Development', 'Queue Systems', 'Shopify', 'WooCommerce', 'React', 'Next.js', 'TypeScript', 'Docker', 'CI/CD'],
    },
    {
      '@type': 'ProfessionalService', '@id': `${U}/#service`, name: 'Dikshant Goyal — Software Development & Technical Consulting',
      url: `${U}/#services`, image: IMG, description: DESC, provider: { '@id': `${U}/#person` },
      areaServed: 'Worldwide', availableLanguage: ['en', 'hi'],
      address: { '@type': 'PostalAddress', addressLocality: 'Jaipur', addressRegion: 'Rajasthan', addressCountry: 'IN' },
      email: siteConfig.email, telephone: siteConfig.phone,
      contactPoint: { '@type': 'ContactPoint', contactType: 'sales', email: siteConfig.email, telephone: siteConfig.phone, availableLanguage: ['en', 'hi'] },
      hasOfferCatalog: {
        '@type': 'OfferCatalog', name: 'Services',
        itemListElement: services.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.title, description: s.summary, provider: { '@id': `${U}/#person` }, areaServed: 'Worldwide' } })),
      },
    },
    { '@type': 'FAQPage', '@id': `${U}/#faq`, mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
  ],
});

const fallback = () => `
<div id="seo-fallback" style="max-width:960px;margin:0 auto;padding:96px 24px 48px;font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#e8ecff">
  <p style="color:#7ee8fa;font-size:14px;margin:0 0 16px">Available for consulting &amp; new projects</p>
  <h1 style="font-size:clamp(2.5rem,6vw,4.5rem);line-height:1.08;letter-spacing:-0.05em;font-weight:800;margin:0 0 20px">I Build Scalable Backend Systems, AI Workflows &amp; Production SaaS.</h1>
  <p style="max-width:640px;line-height:1.6;color:#9aa3c7;margin:0 0 24px">Dikshant Goyal is a backend &amp; product engineer and technical consultant in Jaipur, India: production-grade Laravel APIs, queue-driven architectures, AWS, and AI-powered automation. From first scope to launch and support.</p>
  <nav aria-label="Primary"><a href="#contact" style="color:#fff">Book a consultation</a> · <a href="#services" style="color:#9aa3c7">Services</a> · <a href="#projects" style="color:#9aa3c7">Projects</a> · <a href="/resume.pdf" style="color:#9aa3c7">Resume</a></nav>
  <h2 style="font-size:1.5rem;margin:48px 0 16px">Services &amp; consulting</h2>
  <ul style="line-height:1.7;color:#c7d0ff;padding-left:20px">${services.map((s) => `<li><strong>${esc(s.title)}</strong>: ${esc(s.summary)}</li>`).join('')}</ul>
  <h2 style="font-size:1.5rem;margin:32px 0 16px">Ways to work together</h2>
  <ul style="line-height:1.7;color:#c7d0ff;padding-left:20px">${engagementModels.map((m) => `<li><strong>${esc(m.title)}</strong>: ${esc(m.bestFor)}</li>`).join('')}</ul>
  <h2 style="font-size:1.5rem;margin:32px 0 16px">Frequently asked questions</h2>
  <dl style="line-height:1.6;color:#c7d0ff">${faqs.map((f) => `<dt style="font-weight:600;margin-top:12px">${esc(f.q)}</dt><dd style="margin:4px 0 0;color:#9aa3c7">${esc(f.a)}</dd>`).join('')}</dl>
  <h2 style="font-size:1.5rem;margin:32px 0 16px">Contact</h2>
  <p style="color:#c7d0ff">Email <a href="mailto:${esc(siteConfig.email)}" style="color:#fff">${esc(siteConfig.email)}</a> · <a href="${esc(siteConfig.whatsappUrl)}" style="color:#fff">WhatsApp</a> · <a href="${esc(siteConfig.links.linkedin)}" style="color:#fff">LinkedIn</a> · <a href="${esc(siteConfig.links.github)}" style="color:#fff">GitHub</a></p>
</div>`;

export default function seoHtmlPlugin() {
  return {
    name: 'seo-html',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return html
          .replace('<!--SEO_JSONLD-->', `<script type="application/ld+json">${JSON.stringify(jsonld())}</script>`)
          .replace('<!--SEO_FALLBACK-->', fallback());
      },
    },
  };
}

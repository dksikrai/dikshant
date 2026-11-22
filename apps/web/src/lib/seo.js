import { useEffect } from 'react';
import { SITE, getPageMeta } from '@/config/seo.js';

/** Update (or create) a tag in <head>, reusing the tag that the prerendered HTML already contains. */
const setTag = (selector, tag, attrs, contentAttr, value) => {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    document.head.appendChild(el);
  }
  el.setAttribute(contentAttr, value);
};
const meta = (key, value, by = 'name') =>
  setTag(`meta[${by}="${key}"]`, 'meta', { [by]: key }, 'content', value);

/**
 * Keeps title / description / canonical / OG / Twitter / robots in sync with the current route.
 * Direct visits get the same values from the prerendered HTML; this covers in-app navigation.
 */
export const useSeo = (path) => {
  useEffect(() => {
    const p = getPageMeta(path);
    const url = `${SITE.url}${p.path === '/' ? '/' : p.path}`;
    document.title = p.title;
    meta('title', p.title);
    if (p.description) {
      meta('description', p.description);
      meta('og:description', p.description, 'property');
      meta('twitter:description', p.description);
    }
    if (p.keywords) meta('keywords', p.keywords);
    meta('og:title', p.ogTitle || p.title, 'property');
    meta('twitter:title', p.ogTitle || p.title);
    meta('og:url', url, 'property');
    meta('twitter:url', url);
    if (p.noindex) document.head.querySelector('link[rel="canonical"]')?.remove();
    else setTag('link[rel="canonical"]', 'link', { rel: 'canonical' }, 'href', url);
    meta(
      'robots',
      p.noindex ? 'noindex, follow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
    );
  }, [path]);
};

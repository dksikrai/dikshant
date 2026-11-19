/**
 * glass.js — progressive enhancement for the liquid-glass surfaces.
 *
 * 1. initGlassPointer(): a soft specular highlight that follows the cursor over
 *    `.glass-card` / `.glass-pill` (hover-capable devices only, rAF-throttled).
 * 2. enableRefraction(el): real optical refraction (SVG feDisplacementMap used from
 *    `backdrop-filter`) for ONE element. Only Chromium desktop supports referencing an SVG
 *    filter from backdrop-filter, so everything else keeps the pure-CSS glass.
 *
 * No dependencies. Everything here is optional: if it returns early, the CSS glass is intact.
 */

const SVG_NS = 'http://www.w3.org/2000/svg';

// ─── 1. Pointer-tracking specular highlight ───────────────────────────────────

let pointerReady = false;

export const initGlassPointer = () => {
  if (pointerReady || typeof window === 'undefined') return undefined;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
  pointerReady = true;

  let frame = 0;
  let last = null;

  const apply = () => {
    frame = 0;
    if (!last) return;
    const el = last.target.closest?.('.glass-card, .glass-pill');
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${last.clientX - r.left}px`);
    el.style.setProperty('--my', `${last.clientY - r.top}px`);
  };

  const onMove = (e) => {
    last = e;
    if (!frame) frame = requestAnimationFrame(apply);
  };

  window.addEventListener('pointermove', onMove, { passive: true });
  return () => {
    window.removeEventListener('pointermove', onMove);
    pointerReady = false;
  };
};

// ─── 2. Refraction (desktop Chromium only) ───────────────────────────────────

const supportsRefraction = () => {
  if (typeof window === 'undefined') return false;
  const uaData = navigator.userAgentData;
  const isChromium = uaData
    ? uaData.brands.some((b) => /Chromium/i.test(b.brand))
    : /Chrome\//.test(navigator.userAgent) && !/Edg\/|OPR\//.test(navigator.userAgent);
  const desktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return isChromium && desktop && !reduce;
};

/**
 * Builds a displacement map for a rounded rectangle (capsule when radius >= height/2).
 * R/G channels encode the inward displacement (128 = neutral) inside a `bezel`-px rim.
 */
const buildDisplacementMap = (w, h, radius, bezel) => {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  const img = ctx.createImageData(w, h);
  const hw = w / 2;
  const hh = h / 2;
  const r = Math.min(radius, hh, hw);

  for (let y = 0; y < h; y += 1) {
    for (let x = 0; x < w; x += 1) {
      const px = x + 0.5 - hw;
      const py = y + 0.5 - hh;
      const qx = Math.abs(px) - (hw - r);
      const qy = Math.abs(py) - (hh - r);
      const outX = Math.max(qx, 0);
      const outY = Math.max(qy, 0);
      const sd = Math.hypot(outX, outY) + Math.min(Math.max(qx, qy), 0) - r; // <0 inside
      const d = -sd; // distance in from the edge

      let dx = 0;
      let dy = 0;
      if (d >= 0 && d < bezel) {
        // Outward normal of the rounded-rect SDF
        let gx;
        let gy;
        if (qx > 0 && qy > 0) {
          const len = Math.hypot(qx, qy) || 1;
          gx = (qx / len) * Math.sign(px);
          gy = (qy / len) * Math.sign(py);
        } else if (qx > qy) {
          gx = Math.sign(px);
          gy = 0;
        } else {
          gx = 0;
          gy = Math.sign(py);
        }
        const t = d / bezel; // 0 at the edge → 1 inside
        const m = (1 - t) * (1 - t); // strongest at the rim, eases to zero
        dx = -gx * m; // inward
        dy = -gy * m;
      }

      const i = (y * w + x) * 4;
      img.data[i] = Math.round(128 + dx * 127);
      img.data[i + 1] = Math.round(128 + dy * 127);
      img.data[i + 2] = 128;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return canvas.toDataURL('image/png');
};

let refractionCount = 0;

/**
 * Turns on refraction for `el` (a rounded element with a `backdrop-filter`).
 * Returns a cleanup function. Safe to call anywhere: it no-ops where unsupported.
 */
export const enableRefraction = (el, { bezel = 22, scale = 34, radius = 9999 } = {}) => {
  if (!el || !supportsRefraction()) return undefined;

  refractionCount += 1;
  const id = `glass-refract-${refractionCount}`;

  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('width', '0');
  svg.setAttribute('height', '0');
  svg.style.cssText = 'position:absolute;pointer-events:none;';
  svg.innerHTML = `
    <defs>
      <filter id="${id}" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"
              primitiveUnits="userSpaceOnUse" x="0" y="0" width="1" height="1">
        <feImage id="${id}-map" href="" x="0" y="0" width="1" height="1" preserveAspectRatio="none" result="map"/>
        <feDisplacementMap in="SourceGraphic" in2="map" scale="${scale}" xChannelSelector="R" yChannelSelector="G"/>
      </filter>
    </defs>`;
  document.body.appendChild(svg);

  const filter = svg.querySelector('filter');
  const image = svg.querySelector('feImage');

  const update = () => {
    const w = Math.round(el.offsetWidth);
    const h = Math.round(el.offsetHeight);
    if (!w || !h) return;
    const href = buildDisplacementMap(w, h, radius, bezel);
    [filter, image].forEach((n) => {
      n.setAttribute('width', w);
      n.setAttribute('height', h);
    });
    image.setAttribute('href', href);
    el.style.setProperty('--glass-refract', `url(#${id})`);
    el.setAttribute('data-glass-refract', '');
  };

  let raf = 0;
  const schedule = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(update);
  };

  update();
  const ro = new ResizeObserver(schedule);
  ro.observe(el);

  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    el.removeAttribute('data-glass-refract');
    el.style.removeProperty('--glass-refract');
    svg.remove();
  };
};

/**
 * Single source of truth for what is being sold.
 * Consumed by: the Services / Engagement / FAQ sections, the static crawler HTML in index.html,
 * and the Service + FAQPage JSON-LD (via plugins/vite-plugin-seo-html.js). Edit here only.
 */
export const services = [
  {
    id: 'backend-api',
    icon: 'Server',
    title: 'Backend & API Development',
    summary:
      'Production-grade Laravel/PHP APIs, multi-tenant SaaS back-ends and third-party integrations built to stay fast and maintainable as you grow.',
    outcomes: ['REST / GraphQL APIs', 'Multi-tenant SaaS & billing', 'Clean, tested, documented code'],
  },
  {
    id: 'ai-automation',
    icon: 'Bot',
    title: 'AI Automation & OpenAI Integration',
    summary:
      'Turn manual, repetitive work into automated workflows: OpenAI integrations, RAG pipelines and document processing that save real staff hours.',
    outcomes: ['RAG & document pipelines', 'Workflow automation', 'Human-in-the-loop review'],
  },
  {
    id: 'ecommerce-integrations',
    icon: 'ShoppingCart',
    title: 'Ecommerce & Marketplace Integrations',
    summary:
      'Connect Shopify, WooCommerce, Etsy, payment and shipping platforms with webhook-driven, queue-based order processing that does not drop orders.',
    outcomes: ['Shopify / WooCommerce / Etsy', 'Shipping & payment automation', 'Reliable order pipelines'],
  },
  {
    id: 'cloud-performance',
    icon: 'Gauge',
    title: 'Cloud, Queues & Performance',
    summary:
      'AWS infrastructure, Redis + Horizon queues, query optimisation and fast fixes for production issues, so your system is quick and stays up.',
    outcomes: ['AWS deployment & monitoring', 'Redis / Horizon queues', 'Slow-query & bottleneck fixes'],
  },
  {
    id: 'architecture-audit',
    icon: 'ClipboardCheck',
    title: 'Architecture Review & Code Audit',
    summary:
      'A time-boxed, independent review of your codebase, database and infrastructure, delivered as a written report with a prioritised roadmap.',
    outcomes: ['System & database design review', 'Scaling and risk assessment', 'Prioritised action plan'],
  },
  {
    id: 'technical-delivery',
    icon: 'Users',
    title: 'Technical Project Management',
    summary:
      'Plan, coordinate and ship software across developers, designers and QA, with clear scope, milestones and honest status reporting.',
    outcomes: ['Scoping & roadmaps', 'Team coordination', 'On-time, predictable delivery'],
  },
];

export const engagementModels = [
  {
    id: 'fixed',
    icon: 'Target',
    title: 'Fixed-Scope Project',
    bestFor: 'New builds, integrations and well-defined features',
    points: ['Agreed deliverables and timeline', 'Milestone-based delivery', 'Predictable cost after scoping'],
  },
  {
    id: 'retainer',
    icon: 'Repeat',
    title: 'Monthly Retainer',
    bestFor: 'Ongoing product development and maintenance',
    points: ['Reserved monthly capacity', 'Flexible priorities each sprint', 'Continuity on your codebase'],
    featured: true,
  },
  {
    id: 'consulting',
    icon: 'Lightbulb',
    title: 'Consulting & Audit',
    bestFor: 'Scaling problems, slow systems and technical decisions',
    points: ['Time-boxed engagement', 'Written findings and roadmap', 'Hands-on or advisory'],
  },
];

export const processSteps = [
  { title: 'Discover', text: 'We talk through your goals, constraints, existing systems and timeline.' },
  { title: 'Propose', text: 'You receive a clear scope, milestones and an estimate, with no vague hand-waving.' },
  { title: 'Build', text: 'Iterative delivery with regular demos on a staging environment so there are no surprises.' },
  { title: 'Launch & Support', text: 'Safe deployment, monitoring, documentation and a proper handover.' },
];

export const faqs = [
  {
    q: 'What kind of work do you take on?',
    a: 'Backend and API development (Laravel/PHP), AI and OpenAI automation, ecommerce and marketplace integrations, AWS and queue/performance work, architecture reviews, and technical project management.',
  },
  {
    q: 'How does pricing work?',
    a: 'It depends on scope. After an initial conversation I share a fixed quote for well-defined projects, or an estimate and rate for retainers and consulting. You always know the cost before work starts.',
  },
  {
    q: 'How quickly will you reply?',
    a: 'Within one business day. Use the contact form, email or WhatsApp, whichever you prefer.',
  },
  {
    q: 'Can you take over or improve an existing codebase?',
    a: 'Yes. I usually start with a short audit so we agree on what is there, what is risky and what to fix first, before committing to a larger scope.',
  },
  {
    q: 'Do you work with clients in other countries and time zones?',
    a: 'Yes. I am based in Jaipur, India (IST) and work remotely with clients across time zones, with agreed overlap hours and written updates.',
  },
  {
    q: 'Who owns the code, and can you sign an NDA?',
    a: 'You own the code and infrastructure we build for you. I am happy to sign an NDA before we discuss your project in detail.',
  },
];

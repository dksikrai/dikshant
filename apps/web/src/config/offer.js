/**
 * Single source of truth for what is being sold.
 * Consumed by: home Services/Engagement/FAQ sections, the /services and /services/:slug pages,
 * the prerendered static HTML and all JSON-LD (via plugins/vite-plugin-seo-html.js). Edit here only.
 */
export const services = [
  {
    id: 'technical-project-management',
    shortTitle: 'Project Management',
    icon: 'Users',
    title: 'Technical Project Management',
    metaTitle: 'Technical Project Manager & Software Delivery Lead',
    metaDescription:
      'Plan, coordinate and ship software projects across developers, designers and QA with clear scope, milestones and honest status reporting.',
    summary:
      'Plan, coordinate and ship software across developers, designers and QA, with clear scope, milestones and honest status reporting.',
    intro:
      'Projects slip when scope is vague and nobody owns delivery. I lead the planning and coordination of software work, translating business goals into a clear plan, and keeping stakeholders informed without the jargon. Because I am an engineer too, I can also review the technical decisions.',
    includes: [
      'Scope, requirements and roadmap',
      'Sprint planning and milestone tracking',
      'Coordination across developers, designers and QA',
      'Risk, dependency and stakeholder management',
      'Release planning and quality gates',
      'Clear weekly status reports',
    ],
    tech: ['Agile / Scrum', 'Jira', 'GitHub', 'CI/CD'],
    idealFor: [
      'Teams without a dedicated delivery lead',
      'Business owners managing an outsourced development team',
      'Projects that are late, over budget or unclear',
    ],
    faqs: [
      {
        q: 'Can you manage an existing team?',
        a: 'Yes. I can coordinate your developers and designers, or bring my own, and keep scope, timelines and quality on track.',
      },
      {
        q: 'Do you stay hands-on technically?',
        a: 'Yes. I am an engineer first, so I can review architecture and unblock the team rather than only tracking tasks.',
      },
    ],
  },
  {
    id: 'web-app-development',
    shortTitle: 'Web App Development',
    icon: 'Layers',
    title: 'Full-Stack Web Application Development',
    metaTitle: 'Full-Stack Web App Development: Next.js, React, Node.js',
    metaDescription:
      'Custom web applications, SaaS products and dashboards built with Next.js, React, Node.js, Python or Laravel. Fast, SEO-friendly and built to scale.',
    summary:
      'Custom web apps, SaaS products, dashboards and marketing sites, built with the stack that fits your problem rather than the one I happen to prefer.',
    intro:
      'I build complete web applications, from the database and API to a fast, accessible interface. I work across Next.js, React, Node.js, Python, PHP/Laravel and TypeScript, so the technology is chosen for your team, budget and growth plans instead of being forced onto every project.',
    includes: [
      'Product scoping and a written technical plan',
      'Responsive, accessible front-end in React or Next.js',
      'API and database design',
      'Authentication, user roles and payments',
      'SEO-friendly rendering and Core Web Vitals tuning',
      'Deployment, monitoring and handover documentation',
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'Node.js', 'Python', 'Laravel', 'PostgreSQL', 'MySQL', 'Tailwind CSS'],
    idealFor: [
      'Startups launching an MVP',
      'Businesses replacing spreadsheets with an internal tool',
      'Teams modernising an ageing PHP or WordPress site',
    ],
    faqs: [
      {
        q: 'Which technology stack will you use?',
        a: 'The one that fits your product and team. Next.js and React for rich front-ends, Node.js, Python or Laravel for the back-end, and PostgreSQL or MySQL for data. I explain the trade-offs before we decide.',
      },
      {
        q: 'Can you build an MVP quickly?',
        a: 'Yes. I scope a lean first release around the features that prove your idea, ship it, and then iterate based on real usage.',
      },
    ],
  },
  {
    id: 'backend-api-development',
    shortTitle: 'Backend & APIs',
    icon: 'Server',
    title: 'Backend & API Development',
    metaTitle: 'Backend & API Development: Node.js, Python, Laravel',
    metaDescription:
      'Scalable REST and GraphQL APIs, microservices and integrations in Node.js, Python or Laravel/PHP, with queues, caching and clear documentation.',
    summary:
      'Scalable REST and GraphQL APIs, queues and integrations in Node.js, Python or PHP/Laravel, built to stay fast and maintainable as you grow.',
    intro:
      'A good backend is invisible: it is fast, secure and easy to extend. I design and build APIs and services in Node.js, Python and PHP/Laravel, with queues, caching and automated tests, and I document them so other developers can work with them confidently.',
    includes: [
      'REST and GraphQL API design',
      'Authentication, authorisation and rate limiting',
      'Database modelling and query optimisation',
      'Queues, webhooks and background jobs with Redis',
      'Third-party integrations: payments, shipping, CRMs',
      'Automated tests and API documentation',
    ],
    tech: ['Node.js', 'Python', 'Laravel', 'PHP', 'Redis', 'PostgreSQL', 'MySQL', 'GraphQL', 'REST'],
    idealFor: [
      'Products outgrowing their first backend',
      'Mobile apps that need a reliable API',
      'Companies connecting internal systems together',
    ],
    faqs: [
      {
        q: 'Node.js, Python or Laravel: which should I choose?',
        a: 'It depends on your team and workload. Node.js suits real-time and JavaScript-heavy stacks, Python suits data and AI work, and Laravel gives very fast delivery for business applications. I recommend one after understanding your requirements.',
      },
      {
        q: 'Can you add features to our existing API?',
        a: 'Yes. I review the code first, agree on conventions with your team, and then extend it without a risky rewrite.',
      },
    ],
  },
  {
    id: 'ai-automation',
    shortTitle: 'AI Automation',
    icon: 'Bot',
    title: 'AI Automation & OpenAI Integration',
    metaTitle: 'AI Automation & OpenAI Integration Services',
    metaDescription:
      'Add AI to your product or automate manual work: OpenAI integrations, RAG chatbots over your documents and document-processing pipelines in Python or Node.js.',
    summary:
      'Turn manual, repetitive work into automated workflows with OpenAI integrations, RAG chatbots and document processing that save real staff hours.',
    intro:
      'AI is most useful when it is attached to a real business process. I help you find the work worth automating, build it with OpenAI and your own data, and add the review steps and guardrails that make the results trustworthy.',
    includes: [
      'Use-case discovery and feasibility check',
      'OpenAI / LLM integration into your product or workflow',
      'RAG chatbots and semantic search over your own content',
      'Document, email and data-extraction pipelines',
      'Human review plus cost and quality guardrails',
      'Monitoring and ongoing prompt improvement',
    ],
    tech: ['OpenAI API', 'Python', 'Node.js', 'RAG', 'Embeddings', 'LangChain', 'PostgreSQL', 'Redis'],
    idealFor: [
      'Teams drowning in manual document or support work',
      'Products that want to ship AI features',
      'Businesses that want a chatbot grounded in their own content',
    ],
    faqs: [
      {
        q: 'Is my data safe when using OpenAI?',
        a: 'I design for data minimisation: only the data that is needed is sent, secrets stay on the server, and sensitive workflows include review steps. We can also discuss providers with stricter data terms.',
      },
      {
        q: 'How do you keep AI answers accurate?',
        a: 'Retrieval over your own content, clear prompts, evaluation on real examples and a human-in-the-loop step wherever mistakes are costly.',
      },
    ],
  },
  {
    id: 'ecommerce-integrations',
    shortTitle: 'Shopify & Ecommerce',
    icon: 'ShoppingCart',
    title: 'Ecommerce & Marketplace Integrations',
    metaTitle: 'Shopify, WooCommerce & Etsy Integration Developer',
    metaDescription:
      'Connect Shopify, WooCommerce, Etsy, payment and shipping platforms with reliable, webhook-driven order automation and inventory sync.',
    summary:
      'Connect Shopify, WooCommerce, Etsy, payment and shipping platforms with webhook-driven, queue-based order processing that does not drop orders.',
    intro:
      'Selling on several channels means orders, stock and shipping data have to agree everywhere. I build the integrations and automation that keep them in sync, with retries, duplicate protection and logging so your operations team can trust the numbers.',
    includes: [
      'OAuth store connections and product sync',
      'Webhook-driven order processing with retries',
      'Inventory, shipping-label and payment automation',
      'Custom checkout and WooCommerce / Shopify customisation',
      'Duplicate protection, logging and alerting',
      'Admin dashboards for operations teams',
    ],
    tech: ['Shopify', 'WooCommerce', 'Etsy API', 'Stripe', 'ShipStation', 'Node.js', 'Laravel', 'Redis', 'AWS'],
    idealFor: [
      'Sellers running multiple storefronts or marketplaces',
      'Stores with manual order and fulfilment steps',
      'Businesses that need a custom checkout or payment flow',
    ],
    faqs: [
      {
        q: 'Can you integrate a platform that has no ready-made plugin?',
        a: 'Yes. If the platform has an API or webhooks I can build a custom integration, using queues and retries so orders are never lost.',
      },
      {
        q: 'Do you customise WooCommerce and Shopify themes?',
        a: 'Yes, including custom checkout flows, plugins and performance tuning.',
      },
    ],
  },
  {
    id: 'cloud-server-devops',
    shortTitle: 'Cloud & Server Setup',
    icon: 'Cloud',
    title: 'Cloud, Server & DevOps Setup',
    metaTitle: 'AWS, Linux Server & DevOps Setup Services',
    metaDescription:
      'Server setup, AWS deployment, Docker, CI/CD pipelines, monitoring and backups. Secure, repeatable infrastructure for your web app or API.',
    summary:
      'AWS and Linux server setup, Docker, CI/CD, monitoring and backups: secure, repeatable infrastructure for your web app or API.',
    intro:
      'Great software still needs a reliable home. I set up and harden servers and cloud infrastructure, automate deployments and put monitoring and backups in place, so releases are routine and outages are rare.',
    includes: [
      'AWS architecture and deployment (EC2, S3, RDS, SQS and more)',
      'Linux server provisioning, Nginx and SSL',
      'Docker and containerised deployments',
      'CI/CD pipelines with GitHub Actions',
      'Monitoring, logging, alerting and backups',
      'Server hardening, cost review and handover documentation',
    ],
    tech: ['AWS', 'Linux', 'Nginx', 'Docker', 'GitHub Actions', 'Redis', 'MySQL', 'PostgreSQL'],
    idealFor: [
      'Apps running on a single, hand-configured server',
      'Teams that want automated, low-risk deployments',
      'Businesses worried about backups and security',
    ],
    faqs: [
      {
        q: 'Can you migrate our site or app to AWS?',
        a: 'Yes. I plan the migration, test it on staging and cut over with minimal downtime and a rollback plan.',
      },
      {
        q: 'Do you manage servers after the setup?',
        a: 'I can provide ongoing maintenance and monitoring on a monthly retainer.',
      },
    ],
  },
  {
    id: 'architecture-audit',
    shortTitle: 'Architecture Audit',
    icon: 'ClipboardCheck',
    title: 'Architecture Review & Code Audit',
    metaTitle: 'Software Architecture Review & Code Audit',
    metaDescription:
      'Independent review of your codebase, database and infrastructure with a written report and a prioritised roadmap. Find risks and bottlenecks early.',
    summary:
      'A time-boxed, independent review of your codebase, database and infrastructure, delivered as a written report with a prioritised roadmap.',
    intro:
      'If you are inheriting a codebase, planning to scale, or simply unsure about the technical health of your product, an independent review gives you facts instead of opinions. You receive a clear report of risks, bottlenecks and quick wins, ranked by impact.',
    includes: [
      'Codebase quality and security review',
      'Database schema and query analysis',
      'Infrastructure and deployment review',
      'Scalability and bottleneck assessment',
      'Prioritised written roadmap',
      'Walkthrough call with your team',
    ],
    tech: ['Laravel', 'Node.js', 'Python', 'React', 'Next.js', 'MySQL', 'PostgreSQL', 'AWS'],
    idealFor: [
      'Founders or buyers doing technical due diligence',
      'Teams that inherited code from another developer or agency',
      'Products about to scale and worried about the foundations',
    ],
    faqs: [
      {
        q: 'How long does an audit take?',
        a: 'Typically one to two weeks depending on the size of the system. I confirm the timeline after a short scoping call.',
      },
      {
        q: 'Will you fix the issues you find?',
        a: 'That is up to you. The report is yours to use with any team, and I can implement the fixes as a follow-on project.',
      },
    ],
  },
  {
    id: 'performance-support',
    shortTitle: 'Performance Tuning',
    icon: 'Zap',
    title: 'Performance Optimisation & Production Support',
    metaTitle: 'Website & API Performance Optimisation Expert',
    metaDescription:
      'Fix slow pages, heavy database queries and production incidents. Core Web Vitals, caching, query tuning and ongoing maintenance for your app.',
    summary:
      'Fix slow pages, heavy queries and production issues fast, with Core Web Vitals work, caching and ongoing maintenance.',
    intro:
      'Slow pages and flaky systems cost you customers. I measure first, find the real bottleneck, and fix it, whether that is a database query, a missing cache, an oversized front-end bundle or a misbehaving queue.',
    includes: [
      'Profiling and bottleneck diagnosis',
      'Database and query optimisation',
      'Caching strategy with Redis, CDN and HTTP headers',
      'Core Web Vitals and front-end performance',
      'Production debugging and incident response',
      'Monthly maintenance and monitoring',
    ],
    tech: ['Redis', 'MySQL', 'PostgreSQL', 'Next.js', 'React', 'Laravel', 'Node.js', 'AWS'],
    idealFor: [
      'Sites and apps that feel slow or time out under load',
      'Teams firefighting recurring production issues',
      'Businesses that want ongoing technical maintenance',
    ],
    faqs: [
      {
        q: 'My site is slow. Where do you start?',
        a: 'With measurement: profiling, query logs and real-user metrics, so the biggest bottleneck gets fixed first instead of guessing.',
      },
      {
        q: 'Can you provide ongoing support?',
        a: 'Yes, as a monthly retainer covering fixes, updates and monitoring.',
      },
    ],
  },
];

export const getService = (id) => services.find((s) => s.id === id);

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
    bestFor: 'Ongoing product development, maintenance and server care',
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
    a: 'Full-stack web applications (Next.js, React, Node.js, Python, Laravel), APIs and backends, AI and OpenAI automation, ecommerce integrations, AWS and server setup, performance work, architecture reviews and technical project management.',
  },
  {
    q: 'Which programming languages and frameworks do you work with?',
    a: 'JavaScript and TypeScript (React, Next.js, Node.js), Python, and PHP (Laravel, WordPress), plus SQL databases, Redis and AWS. I pick the right tool for your project instead of forcing one stack.',
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
    q: 'Can you set up and manage my server?',
    a: 'Yes. I provision and secure Linux servers and AWS infrastructure, set up deployments, monitoring and backups, and can maintain them on a monthly retainer.',
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

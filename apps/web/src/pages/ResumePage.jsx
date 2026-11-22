import React from 'react';
import { Link } from 'react-router-dom';
import { Download, ArrowRight, MapPin, Mail, Github, Linkedin } from 'lucide-react';
import PageShell, { Breadcrumbs } from '@/components/PageShell.jsx';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site.js';
import { experience, skillGroups, resumeSummary } from '@/config/resume.js';
import { startInquiry } from '@/lib/contactIntent.js';
import { useSeo } from '@/lib/seo.js';

const ContactSection = React.lazy(() => import('@/components/sections/ContactSection.jsx'));

const H2 = ({ children }) => (
  <h2 className="text-foreground font-bold mb-6" style={{ fontSize: 'clamp(1.35rem, 3vw, 1.75rem)', letterSpacing: '-0.02em' }}>
    {children}
  </h2>
);

const ResumePage = () => {
  useSeo('/resume');
  return (
    <PageShell>
      <article className="site-container pb-16">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Resume' }]} />

        <header className="flex flex-col gap-4 max-w-3xl">
          <h1 className="text-foreground" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1 }}>
            Dikshant Goyal
          </h1>
          <p className="text-primary font-semibold m-0" style={{ fontSize: '1.125rem' }}>
            Full-Stack Developer &amp; Technical Consultant
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 m-0 p-0 list-none text-sm text-muted-foreground">
            <li className="flex items-center gap-1.5"><MapPin size={15} aria-hidden="true" />{siteConfig.location}</li>
            <li className="flex items-center gap-1.5"><Mail size={15} aria-hidden="true" /><a className="hover:text-foreground" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></li>
            <li className="flex items-center gap-1.5"><Linkedin size={15} aria-hidden="true" /><a className="hover:text-foreground" href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li className="flex items-center gap-1.5"><Github size={15} aria-hidden="true" /><a className="hover:text-foreground" href={siteConfig.links.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
          </ul>
          <p className="text-muted-foreground max-w-3xl m-0" style={{ fontSize: '1.0625rem', lineHeight: 1.7 }}>{resumeSummary}</p>
          <div className="flex flex-wrap gap-3 pt-1">
            <Button asChild size="lg" className="h-12 rounded-full px-7 font-semibold shadow-lg shadow-primary/30">
              <a href={siteConfig.resume} download={siteConfig.resumeFilename}>
                <Download strokeWidth={2} />
                Download PDF
              </a>
            </Button>
            <Button variant="glass" size="lg" className="h-12 rounded-full px-7 font-semibold" onClick={() => startInquiry({ inquiry: 'Consulting', subject: 'Consultation request' })}>
              Hire me
              <ArrowRight strokeWidth={2.5} />
            </Button>
          </div>
        </header>

        <section className="mt-14" aria-labelledby="skills-h">
          <H2><span id="skills-h">Skills</span></H2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 m-0">
            {skillGroups.map((g) => (
              <div key={g.group} className="glass-card rounded-2xl p-5">
                <dt className="text-foreground font-semibold mb-3">{g.group}</dt>
                <dd className="m-0 flex flex-wrap gap-2">
                  {g.items.map((i) => (
                    <span key={i} className="text-[0.8125rem] font-medium px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/[0.08] text-foreground/80">
                      {i}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-14" aria-labelledby="exp-h">
          <H2><span id="exp-h">Experience</span></H2>
          <ol className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start m-0 p-0 list-none">
            {experience.map((r) => (
              <li key={`${r.title}-${r.date}`} className="glass-card rounded-2xl p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-foreground font-bold m-0" style={{ fontSize: '1.125rem' }}>{r.title}</h3>
                  <span className="text-sm text-muted-foreground">{r.date}</span>
                </div>
                <p className="text-primary text-sm font-medium mt-1 mb-3">{r.company} · {r.location}</p>
                <p className="text-muted-foreground m-0 mb-3 text-[0.9375rem] leading-relaxed">{r.description}</p>
                <ul className="m-0 pl-5 flex flex-col gap-1.5 text-[0.875rem] text-foreground/80 leading-relaxed">
                  {r.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14 glass-card rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-foreground font-bold m-0 mb-1 text-lg">See the work behind the resume</h2>
            <p className="text-muted-foreground m-0 text-sm">Case studies and 19+ delivered projects on the home page.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="glass" className="rounded-full"><Link to="/#projects">View projects</Link></Button>
            <Button asChild variant="glass" className="rounded-full"><Link to="/services">Services</Link></Button>
          </div>
        </section>
      </article>
      <React.Suspense fallback={null}>
        <ContactSection />
      </React.Suspense>
    </PageShell>
  );
};

export default ResumePage;

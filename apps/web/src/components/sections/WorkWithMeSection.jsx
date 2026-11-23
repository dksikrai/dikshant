/**
 * WorkWithMeSection.jsx: one fork for the two kinds of visitor.
 * Hiring teams get the profile and resume; clients get the path from first call to launch.
 * Illustrations are inline line art in the page's own accent, no stock imagery.
 */

import React from 'react';
import { ArrowRight, Check, Download, Linkedin, Mail, CalendarCheck, MessageCircle, Github, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SectionHeader from '@/components/SectionHeader.jsx';
import { FadeIn } from '@/lib/motion.jsx';
import { siteConfig } from '@/config/site.js';
import { startInquiry } from '@/lib/contactIntent.js';

// ─── Illustrations ────────────────────────────────────────────────────────────

/** A resume page with a profile mark, a skills line and a "selected" tick. */
const ResumeIllustration = () => (
  <svg viewBox="0 0 320 168" fill="none" className="h-full w-full" aria-hidden="true">
    <rect x="96" y="14" width="128" height="148" rx="10" fill="hsl(222 26% 10%)" stroke="hsl(0 0% 100% / 0.14)" />
    <circle cx="124" cy="44" r="12" stroke="hsl(var(--primary))" strokeWidth="1.5" />
    <path d="M118 48l4-5 3 3 5-7" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="146" y="36" width="56" height="5" rx="2.5" fill="hsl(0 0% 100% / 0.55)" />
    <rect x="146" y="47" width="36" height="4" rx="2" fill="hsl(var(--primary) / 0.7)" />
    <g fill="hsl(0 0% 100% / 0.16)">
      <rect x="112" y="72" width="96" height="4" rx="2" />
      <rect x="112" y="84" width="82" height="4" rx="2" />
      <rect x="112" y="96" width="92" height="4" rx="2" />
    </g>
    <g stroke="hsl(var(--primary) / 0.55)">
      <rect x="112" y="114" width="30" height="14" rx="7" />
      <rect x="148" y="114" width="26" height="14" rx="7" />
      <rect x="180" y="114" width="28" height="14" rx="7" />
    </g>
    <rect x="112" y="138" width="60" height="4" rx="2" fill="hsl(0 0% 100% / 0.16)" />
    {/* shortlist stack behind */}
    <rect x="48" y="30" width="38" height="52" rx="6" fill="hsl(222 26% 12%)" stroke="hsl(0 0% 100% / 0.08)" />
    <rect x="234" y="40" width="38" height="52" rx="6" fill="hsl(222 26% 12%)" stroke="hsl(0 0% 100% / 0.08)" />
    <circle cx="253" cy="112" r="15" fill="hsl(var(--primary))" />
    <path d="M246 112l5 5 9-10" stroke="hsl(var(--primary-foreground))" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Browser window wired to three build stages: scope, build, launch. */
const ProjectIllustration = () => (
  <svg viewBox="0 0 320 168" fill="none" className="h-full w-full" aria-hidden="true">
    <rect x="20" y="18" width="150" height="118" rx="10" fill="hsl(222 26% 10%)" stroke="hsl(0 0% 100% / 0.14)" />
    <path d="M20 40h150" stroke="hsl(0 0% 100% / 0.1)" />
    <circle cx="34" cy="29" r="3" fill="hsl(0 0% 100% / 0.2)" />
    <circle cx="45" cy="29" r="3" fill="hsl(0 0% 100% / 0.2)" />
    <circle cx="56" cy="29" r="3" fill="hsl(0 0% 100% / 0.2)" />
    <rect x="34" y="54" width="70" height="7" rx="3.5" fill="hsl(0 0% 100% / 0.5)" />
    <rect x="34" y="68" width="100" height="4" rx="2" fill="hsl(0 0% 100% / 0.16)" />
    <rect x="34" y="78" width="84" height="4" rx="2" fill="hsl(0 0% 100% / 0.16)" />
    <rect x="34" y="94" width="48" height="16" rx="8" fill="hsl(var(--primary))" />
    <rect x="34" y="118" width="26" height="8" rx="3" stroke="hsl(0 0% 100% / 0.14)" />
    <rect x="66" y="118" width="26" height="8" rx="3" stroke="hsl(0 0% 100% / 0.14)" />
    <rect x="98" y="118" width="26" height="8" rx="3" stroke="hsl(0 0% 100% / 0.14)" />
    {/* pipeline */}
    <path d="M170 77h30M232 77h30" stroke="hsl(var(--primary) / 0.6)" strokeDasharray="3 4" />
    <g stroke="hsl(var(--primary))" strokeWidth="1.5">
      <circle cx="216" cy="77" r="16" fill="hsl(222 26% 10%)" />
      <circle cx="282" cy="77" r="16" fill="hsl(var(--primary))" />
    </g>
    <path d="M209 77h14M217 70l7 7-7 7" stroke="hsl(var(--primary))" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M275 77l5 5 9-10" stroke="hsl(var(--primary-foreground))" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <g fontFamily="Geist Mono, ui-monospace, monospace" fontSize="9" fill="hsl(0 0% 100% / 0.5)" textAnchor="middle">
      <text x="216" y="108">build</text>
      <text x="282" y="108">live</text>
    </g>
  </svg>
);

// ─── Card ─────────────────────────────────────────────────────────────────────

const PathCard = ({ eyebrow, title, intro, points, illustration, actions }) => (
  <article className="glass-card flex h-full flex-col gap-6 rounded-3xl p-6 md:p-8">
    <div className="h-40 overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03]">{illustration}</div>
    <div className="flex flex-col gap-3">
      <span className="section-label">{eyebrow}</span>
      <h3 className="text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground">{intro}</p>
    </div>
    <ul className="flex flex-col gap-2.5">
      {points.map((p) => (
        <li key={p} className="flex items-start gap-2.5 text-sm text-foreground/85">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <span>{p}</span>
        </li>
      ))}
    </ul>
    <div className="mt-auto flex flex-col gap-3 pt-2">{actions}</div>
  </article>
);

// ─── Section ──────────────────────────────────────────────────────────────────

export default function WorkWithMeSection() {
  return (
    <section id="work-with-me" className="site-section">
      <div className="site-container">
        <SectionHeader
          label="Work with me"
          title="Hiring a developer, or starting a project?"
          description="Two short paths. Pick yours and you will find the resume, the projects and the fastest way to reach me."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <FadeIn delay={0.05} className="h-full">
            <PathCard
              eyebrow="For hiring teams"
              title="The profile in one minute"
              intro="Three years of production work, now leading delivery while staying hands-on in the code."
              illustration={<ResumeIllustration />}
              points={[
                'Project Manager at iTechPanel LLP, promoted through four roles since 2024',
                'Next.js, Node.js, Python, Laravel, AWS and OpenAI in production',
                'Commerce integrations, queues and webhooks, cutting load times by up to 40%',
              ]}
              actions={
                <>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button asChild size="lg" className="h-11 rounded-lg px-5">
                      <a href={siteConfig.resume} download={siteConfig.resumeFilename}>
                        <Download />
                        Download resume
                      </a>
                    </Button>
                    <Button asChild variant="glass" size="lg" className="h-11 rounded-lg px-5">
                      <a href="#career">View experience</a>
                    </Button>
                  </div>
                  <ul className="m-0 flex list-none gap-2 p-0" aria-label="Profiles">
                    {[
                      ['LinkedIn', siteConfig.links.linkedin, Linkedin],
                      ['GitHub', siteConfig.links.github, Github],
                      ['Instagram', siteConfig.links.instagram, Instagram],
                      ['Email', siteConfig.mailtoUrl, Mail],
                    ].map(([label, href, Icon]) => (
                      <li key={label}>
                        <a
                          href={href}
                          target={href.startsWith('mailto') ? undefined : '_blank'}
                          rel="noopener noreferrer"
                          aria-label={label}
                          className="glass-pill flex h-11 w-11 items-center justify-center rounded-lg text-foreground/80"
                        >
                          <Icon className="h-[18px] w-[18px]" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              }
            />
          </FadeIn>

          <FadeIn delay={0.12} className="h-full">
            <PathCard
              eyebrow="For clients"
              title="From first call to launch"
              intro="Tell me what you need built. I reply with a scoped plan, then build and ship it with you."
              illustration={<ProjectIllustration />}
              points={[
                'A 20-minute intro call to understand the goal, no commitment',
                'A written scope with milestones, timeline and cost before work starts',
                'Build, launch and support, with updates at every milestone',
              ]}
              actions={
                <>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button asChild size="lg" className="h-11 rounded-lg px-5">
                      <a href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer">
                        <CalendarCheck />
                        Book a call
                      </a>
                    </Button>
                    <Button asChild variant="glass" size="lg" className="h-11 rounded-lg px-5">
                      <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">
                        <MessageCircle />
                        WhatsApp
                      </a>
                    </Button>
                  </div>
                  <button
                    type="button"
                    onClick={() => startInquiry({ inquiry: 'Consulting', subject: 'Project enquiry' })}
                    className="inline-flex min-h-11 w-fit items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-foreground"
                  >
                    Or send a written brief
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </>
              }
            />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

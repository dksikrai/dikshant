import React from 'react';
import { FadeIn } from '@/lib/motion.jsx';

const strengths = [
  { title: 'Plan', text: 'Requirements, scope, milestones and risks agreed in writing before work starts.' },
  { title: 'Coordinate', text: 'Developers, designers, QA and stakeholders working from one plan, with regular updates.' },
  { title: 'Deliver', text: 'API-driven systems shipped and supported, with the technical depth to back every estimate.' },
];

const AboutSection = () => (
  <section id="about" className="site-section">
    <div className="site-container">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <FadeIn>
            <span className="section-label mb-4 block">About</span>
          </FadeIn>
          <FadeIn delay={0.07}>
            <h2 className="mb-6 text-foreground">A project manager who still reads the code</h2>
          </FadeIn>
          <FadeIn delay={0.12}>
            <p className="mb-5 leading-relaxed text-muted-foreground">
              I am Dikshant Goyal, Project Manager at iTechPanel LLP in Jaipur. I lead planning and
              delivery across software workstreams, coordinating developers, QA and stakeholders for
              integration-heavy and e-commerce platforms.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              I started as a developer, so I can scope work realistically, spot technical risk early
              and step in on the backend when it helps the team move.
            </p>
          </FadeIn>
        </div>

        <ul className="m-0 flex list-none flex-col gap-4 p-0">
          {strengths.map((s, i) => (
            <FadeIn key={s.title} delay={0.1 + i * 0.07}>
              <li className="glass-card flex gap-5 rounded-2xl p-5">
                <span className="font-mono text-sm text-primary">0{i + 1}</span>
                <div>
                  <h3 className="mb-1 text-foreground" style={{ fontSize: '1.0625rem' }}>{s.title}</h3>
                  <p className="m-0 text-sm text-muted-foreground">{s.text}</p>
                </div>
              </li>
            </FadeIn>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default AboutSection;

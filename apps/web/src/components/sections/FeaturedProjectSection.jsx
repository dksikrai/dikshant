
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Activity, Database, Shield, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const FeaturedProjectSection = () => {
  const [imgSrc, setImgSrc] = useState("/airventory_dashboard.png");
  const [isLoaded, setIsLoaded] = useState(false);
  const tech = ['Laravel', 'PHP 8+', 'Redis', 'Hostinger Horizons', 'MySQL', 'AWS Lambda', 'S3', 'Fabric.js', 'REST APIs', 'YunExpress', 'ShipStation'];
  const metrics = [
    { label: "Uptime", value: "99.9%" },
    { label: "API Response", value: "<100ms" },
    { label: "Concurrent Users", value: "10k+" },
    { label: "Faster via Redis", value: "300%" },
    { label: "DB Load Reduction", value: "70%" },
    { label: "Daily Images Rendered", value: "1000+" }
  ];

  return (
    <section className="py-16 md:py-20 bg-background relative overflow-hidden" id="featured-project">
      {/* Abstract Background Element */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <h2 className="m-0">Flagship Case Study</h2>
            <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">Enterprise</Badge>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl">
            A comprehensive overview of architectural decision-making and scale in a production SaaS platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Content Side */}
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05 }}
          >
            <h3 className="text-4xl font-extrabold mb-2 text-foreground">Airventory.io</h3>
            <p className="text-lg text-primary font-semibold mb-6">Complete Fulfillment & Asset Management Platform</p>
            
            <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
              Engineered a highly scalable SaaS architecture designed to automate shipping workflows, manage complex asset processing, and deliver sub-100ms API responses under heavy load. The platform features robust customer support & admin management, shipping integrations via YunExpress & ShipStation, image conversion using AWS Lambda, and custom product/printing design creation powered by Fabric.js JSON.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {tech.map((t, i) => (
                <Badge key={i} variant="outline" className="bg-background border-border/50 text-xs">
                  {t}
                </Badge>
              ))}
            </div>

            <div className="space-y-8 mb-10">
              <div>
                <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-foreground mb-4">
                  <Database className="w-4 h-4 text-primary" /> Key Systems Built
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Customer Support & Admin", "YunExpress & ShipStation", "Fabric.js Product Design", 
                    "Lambda Image Conversion", "Printing Design Generation", "Fulfillment Automation", 
                    "Order Tracking", "Operational Dashboards"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/70" /> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-foreground mb-4">
                  <Shield className="w-4 h-4 text-primary" /> Architecture Highlights
                </h4>
                <div className="flex flex-wrap gap-3">
                  {["Queue-driven via Redis+Horizon", "Async Image Transformation", "Multi-role Architecture", "Eloquent Query Optimization", "Production-safe Deployments"].map((item, idx) => (
                    <span key={idx} className="px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-xs font-bold text-primary">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a href="https://www.airventory.io/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 smooth-transition shadow-lg shadow-primary/20">
                Marketing Site <ArrowUpRight className="w-4 h-4 ml-2" />
              </a>
              <a href="https://administrator.airventory.io/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/90 smooth-transition">
                Admin Portal <ArrowUpRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </motion.div>

          {/* Visual/Metrics Side */}
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            className="space-y-8"
          >
            {/* Image Card */}
            <div className="relative rounded-2xl overflow-hidden border border-border/50 premium-shadow bg-card aspect-[4/3] group">
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent z-10" />
              
              {/* Pulse skeleton loader */}
              {!isLoaded && (
                <div className="absolute inset-0 bg-muted/20 animate-pulse flex items-center justify-center backdrop-blur-md z-15">
                  <div className="w-12 h-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
                </div>
              )}
              
              <img 
                src={imgSrc} 
                alt="Airventory Platform Dashboard" 
                className={`w-full h-full object-cover object-top transition-all duration-700 ease-out group-hover:scale-105 ${
                  isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
                }`}
                onLoad={() => setIsLoaded(true)}
                onError={() => {
                  setImgSrc("/airventory_dashboard.png");
                  setIsLoaded(true);
                }}
              />
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <div className="glass p-4 rounded-xl backdrop-blur-md">
                  <div className="flex items-center gap-3 text-sm font-medium">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    System Status: Operational & Highly Available
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics Grid */}
            <Card className="glass-card hover-glow">
              <CardContent className="p-6">
                <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-foreground mb-6">
                  <Activity className="w-4 h-4 text-accent" /> Performance Impact
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  {metrics.map((metric, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className="text-2xl md:text-3xl font-extrabold text-foreground mb-1">{metric.value}</span>
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{metric.label}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjectSection;

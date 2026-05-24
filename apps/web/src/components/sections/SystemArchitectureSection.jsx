import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Database, Cpu, Cloud, ArrowRight, Zap, Shield, Key } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { FadeIn, ease, isIOS, TextReveal } from '@/lib/motion.jsx';

const architectures = [
  {
    id: "saas",
    title: "High-Traffic SaaS Stack",
    description: "Multi-tier architecture engineered for global scale, rapid response times, and near zero-downtime under heavy concurrent workloads.",
    nodes: [
      { id: "dns", name: "Cloudflare WAF", icon: Shield, type: "edge", x: 10, y: 50, details: "Global CDN, DDOS mitigation, custom WAF rules, and SSL/TLS termination at the edge." },
      { id: "lb", name: "Nginx Load Balancer", icon: Cloud, type: "proxy", x: 30, y: 50, details: "Nginx reverse proxy distributing HTTP requests across scalable app instances via round-robin." },
      { id: "app", name: "Laravel API Cluster", icon: Cpu, type: "app", x: 52, y: 30, details: "Scalable PHP 8.2 API server executing core Laravel business logic and auth controllers." },
      { id: "queue", name: "Horizon Queues", icon: Server, type: "worker", x: 52, y: 70, details: "Redis-backed queue workers handling heavy async mailers, CSV processing, and API syncs." },
      { id: "cache", name: "Redis Cache Grid", icon: Zap, type: "cache", x: 74, y: 30, details: "In-memory database cache store running cache locks and fast session grid management." },
      { id: "db", name: "RDS PostgreSQL", icon: Database, type: "db", x: 90, y: 50, details: "AWS Relational Database executing complex SQL queries, fully indexed and replica-synced." }
    ],
    connections: [
      { from: "dns", to: "lb" },
      { from: "lb", to: "app" },
      { from: "lb", to: "queue" },
      { from: "app", to: "cache" },
      { from: "queue", to: "cache" },
      { from: "app", to: "db" },
      { from: "queue", to: "db" }
    ]
  },
  {
    id: "websockets",
    title: "Real-Time WebSockets Engine",
    description: "Event-driven duplex socket architecture designed for instant notifications, chat engines, and canvas collaboration tools.",
    nodes: [
      { id: "client", name: "React Client", icon: Cloud, type: "edge", x: 10, y: 50, details: "Framer Motion frontend initiating persistent WebSocket connection via Socket.io client bindings." },
      { id: "gw", name: "API Gateway / Nginx", icon: Shield, type: "proxy", x: 34, y: 50, details: "Layer 7 proxy handling WebSocket protocol upgrade handshakes and routing traffic." },
      { id: "socket", name: "Socket.io NodeJS", icon: Cpu, type: "app", x: 58, y: 30, details: "Node.js cluster managing active socket channels, event listeners, and broad client connections." },
      { id: "pubsub", name: "Redis Pub/Sub Store", icon: Zap, type: "cache", x: 58, y: 70, details: "Redis adapter synchronizing multi-process socket rooms across servers in the scaling cluster." },
      { id: "db", name: "MongoDB Core", icon: Database, type: "db", x: 88, y: 50, details: "Non-relational document database saving persistent chat histories, messages, and room layouts." }
    ],
    connections: [
      { from: "client", to: "gw" },
      { from: "gw", to: "socket" },
      { from: "socket", to: "pubsub" },
      { from: "pubsub", to: "gw" },
      { from: "socket", to: "db" }
    ]
  },
  {
    id: "integrations",
    title: "Webhook & API Pipeline",
    description: "Highly robust data integration engine processing webhooks asynchronously with automated retries and dead-letter queue (DLQ) logging.",
    nodes: [
      { id: "source", name: "Stripe / Shopify API", icon: Key, type: "edge", x: 10, y: 50, details: "External webhook event dispatchers firing secure JSON payload updates." },
      { id: "receiver", name: "Laravel Receiver", icon: Shield, type: "proxy", x: 34, y: 50, details: "Ultra-fast endpoint validating webhook request signatures and persisting raw request logs." },
      { id: "sqs", name: "AWS SQS Queue", icon: Server, type: "worker", x: 58, y: 30, details: "Fully-managed Amazon Simple Queue Service storing jobs with backoff configurations." },
      { id: "worker", name: "Lambda Webhook Worker", icon: Cpu, type: "app", x: 58, y: 70, details: "AWS Lambda serverless workers parsing events and sync-updating customer balances." },
      { id: "db", name: "DynamoDB Storage", icon: Database, type: "db", x: 88, y: 50, details: "High-performance AWS NoSQL store indexing transactions and webhook log histories." }
    ],
    connections: [
      { from: "source", to: "receiver" },
      { from: "receiver", to: "sqs" },
      { from: "receiver", to: "worker" },
      { from: "sqs", to: "db" },
      { from: "worker", to: "db" }
    ]
  }
];

const typeStyles = {
  edge: "bg-cyan-500/10 border-cyan-500/35 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]",
  proxy: "bg-blue-500/10 border-blue-500/35 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)]",
  app: "bg-emerald-500/10 border-emerald-500/35 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]",
  worker: "bg-purple-500/10 border-purple-500/35 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.15)]",
  cache: "bg-amber-500/10 border-amber-500/35 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.15)]",
  db: "bg-rose-500/10 border-rose-500/35 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.15)]"
};

const SystemArchitectureSection = () => {
  const [activeArch, setActiveArch] = useState(architectures[0]);
  const [hoveredNode, setHoveredNode] = useState(null);
  const ios = isIOS();

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-background" id="architecture">
      {/* Background gradients */}
      <div className="absolute top-[20%] right-[-10%] w-[35%] h-[35%] rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.03),transparent_65%)] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[35%] h-[35%] rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--secondary)/0.03),transparent_65%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 md:mb-16">
          <FadeIn className="max-w-2xl">
            <h2 className="mb-4 text-3xl md:text-5xl font-extrabold tracking-tight">
              <TextReveal text="System Design Blueprint" className="text-gradient-primary" />
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Explore how I design high-performance, robust, and scalable cloud architectures. Interactive node graph mapping direct data flow pipelines.
            </p>
          </FadeIn>

          {/* Architecture Selector Buttons */}
          <FadeIn delay={0.12} className="flex flex-wrap gap-2 shrink-0">
            {architectures.map((arch) => (
              <motion.button
                key={arch.id}
                onClick={() => {
                  setActiveArch(arch);
                  setHoveredNode(null);
                }}
                whileHover={ios ? {} : { scale: 1.03 }}
                whileTap={ios ? {} : { scale: 0.97 }}
                className={`relative px-4 py-2 rounded-full text-xs md:text-sm font-bold border transition-all ${
                  activeArch.id === arch.id
                    ? 'text-white border-transparent'
                    : 'bg-card border-border text-foreground/75 hover:bg-primary/5 hover:border-primary/40 hover:text-primary'
                }`}
              >
                {activeArch.id === arch.id && (
                  <motion.span
                    layoutId="arch-pill"
                    className="absolute inset-0 bg-primary rounded-full shadow-lg shadow-primary/20"
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />
                )}
                <span className="relative z-10">{arch.title}</span>
              </motion.button>
            ))}
          </FadeIn>
        </div>

        {/* Blueprint Arena Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          
          {/* Interactive Node Graph Grid Panel */}
          <Card className="lg:col-span-2 glass-card border-border/40 premium-shadow bg-neutral-950/40 relative overflow-hidden flex flex-col justify-center min-h-[360px] md:min-h-[420px] p-4 select-none">
            {/* SVG Connections & Particle Stream Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="flow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="hsl(var(--secondary))" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
                </linearGradient>
                <mask id="line-mask">
                  <rect x="0" y="0" width="100%" height="100%" fill="white" />
                </mask>
              </defs>

              <AnimatePresence mode="wait">
                <motion.g
                  key={activeArch.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeArch.connections.map((conn, idx) => {
                    const fromNode = activeArch.nodes.find(n => n.id === conn.from);
                    const toNode = activeArch.nodes.find(n => n.id === conn.to);
                    if (!fromNode || !toNode) return null;

                    // Convert percentages to coordinate anchors
                    const x1 = `${fromNode.x}%`;
                    const y1 = `${fromNode.y}%`;
                    const x2 = `${toNode.x}%`;
                    const y2 = `${toNode.y}%`;

                    const isActive = hoveredNode === fromNode.id || hoveredNode === toNode.id;

                    return (
                      <g key={idx}>
                        {/* Connecting Back Line */}
                        <line
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke={isActive ? "hsl(var(--primary)/0.45)" : "rgba(255,255,255,0.06)"}
                          strokeWidth={isActive ? 2.5 : 1.5}
                          className="transition-all duration-300"
                        />
                        {/* Flowing SVG Particle Stream */}
                        {!ios && (
                          <motion.circle
                            r={isActive ? 3.5 : 2}
                            fill={isActive ? "hsl(var(--secondary))" : "hsl(var(--primary))"}
                            className="shadow-sm shadow-primary"
                            initial={{ offsetDistance: "0%" }}
                            animate={{
                              offsetPath: `M 0 0 L 100 100`, // virtual trigger fallback
                              offsetDistance: ["0%", "100%"]
                            }}
                            transition={{
                              duration: 3 + idx * 0.5,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                            style={{
                              motionPath: `path('M ${fromNode.x * 6} ${fromNode.y * 4} L ${toNode.x * 6} ${toNode.y * 4}')`, // proportional scale paths
                              cx: `${fromNode.x}%`,
                              cy: `${fromNode.y}%`
                            }}
                          />
                        )}
                      </g>
                    );
                  })}
                </motion.g>
              </AnimatePresence>
            </svg>

            {/* Dynamic Node Positions */}
            <div className="absolute inset-0 w-full h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeArch.id}
                  className="w-full h-full relative"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3, ease: ease.out }}
                >
                  {activeArch.nodes.map((node) => {
                    const NodeIcon = node.icon;
                    const isHovered = hoveredNode === node.id;
                    const styleClass = typeStyles[node.type] || "";

                    return (
                      <motion.button
                        key={node.id}
                        onMouseEnter={() => setHoveredNode(node.id)}
                        onMouseLeave={() => setHoveredNode(null)}
                        onClick={() => setHoveredNode(node.id === hoveredNode ? null : node.id)}
                        style={{
                          left: `${node.x}%`,
                          top: `${node.y}%`,
                          x: "-50%",
                          y: "-50%"
                        }}
                        className={`absolute z-20 flex flex-col items-center gap-1.5 p-3 rounded-2xl border text-center transition-all cursor-pointer ${styleClass} ${
                          isHovered ? 'scale-110 border-primary/50 shadow-[0_0_20px_rgba(0,184,217,0.3)]' : 'opacity-85'
                        }`}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="p-1 rounded-lg">
                          <NodeIcon className="w-5 h-5 md:w-6 md:h-6 shrink-0" />
                        </div>
                        <span className="text-[10px] md:text-xs font-bold font-mono tracking-tight">{node.name}</span>
                      </motion.button>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
          </Card>

          {/* Technical Info Panel */}
          <Card className="glass-card border-border/40 premium-shadow bg-gradient-to-br from-card/30 to-card/10 flex flex-col justify-between overflow-hidden">
            <CardContent className="p-6 md:p-8 flex flex-col justify-between h-full gap-6">
              
              {/* Architecture Core Summary */}
              <div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary uppercase tracking-widest mb-4 inline-block">
                  Architecture Overview
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 leading-snug">
                  {activeArch.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {activeArch.description}
                </p>
              </div>

              {/* Node Detailed Dynamic Box */}
              <div className="relative min-h-[140px] border border-border/40 rounded-2xl bg-neutral-950/40 p-5 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {hoveredNode ? (
                    (() => {
                      const selectedNode = activeArch.nodes.find(n => n.id === hoveredNode);
                      if (!selectedNode) return null;
                      const SelectedNodeIcon = selectedNode.icon;
                      
                      return (
                        <motion.div
                          key={selectedNode.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.18, ease: ease.out }}
                          className="flex flex-col gap-3"
                        >
                          <div className="flex items-center gap-2 text-primary">
                            <SelectedNodeIcon className="w-4 h-4 shrink-0" />
                            <span className="text-xs font-bold uppercase tracking-wider font-mono">{selectedNode.name}</span>
                          </div>
                          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                            {selectedNode.details}
                          </p>
                        </motion.div>
                      );
                    })()
                  ) : (
                    <motion.div
                      key="default-prompt"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center flex flex-col items-center gap-2 text-neutral-500"
                    >
                      <Zap className="w-6 h-6 animate-pulse text-primary/45" />
                      <p className="text-xs font-medium max-w-[200px] leading-relaxed">
                        Hover or tap on any server node in the blueprint graph to explore its live technical specification details.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Action Button */}
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/95 transition-all shadow-md shadow-primary/10 group"
              >
                Discuss Custom Infrastructure
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
              </a>

            </CardContent>
          </Card>

        </div>
      </div>
    </section>
  );
};

export default SystemArchitectureSection;

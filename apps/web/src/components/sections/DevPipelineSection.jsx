import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitBranch, ShieldCheck, Terminal as TerminalIcon, Cpu, Globe, ArrowRight, Play, CheckCircle, RefreshCw, Layers, ListOrdered } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { FadeIn, ease, isIOS, TextReveal } from '@/lib/motion.jsx';

const pipelineStages = [
  {
    id: 'push',
    name: 'Git Commit',
    icon: GitBranch,
    color: 'hsl(199, 89%, 42%)',
    bgColor: 'rgba(6, 182, 212, 0.1)',
    glow: 'rgba(6, 182, 212, 0.3)',
    description: 'Signed git commit triggered via repository hook.'
  },
  {
    id: 'security',
    name: 'Security Audit',
    icon: ShieldCheck,
    color: 'hsl(255, 65%, 58%)',
    bgColor: 'rgba(124, 58, 237, 0.1)',
    glow: 'rgba(124, 58, 237, 0.3)',
    description: 'Static analysis (ESLint, SonarQube) & security scan.'
  },
  {
    id: 'test',
    name: 'Testing Suite',
    icon: TerminalIcon,
    color: 'hsl(142, 70%, 45%)',
    bgColor: 'rgba(16, 185, 129, 0.1)',
    glow: 'rgba(16, 185, 129, 0.3)',
    description: 'Concurrent database testing & React unit checks.'
  },
  {
    id: 'redis',
    name: 'Redis Horizon',
    icon: Layers,
    color: 'hsl(32, 95%, 44%)',
    bgColor: 'rgba(245, 158, 11, 0.1)',
    glow: 'rgba(245, 158, 11, 0.3)',
    description: 'Queue synchronization & async task execution buffers.'
  },
  {
    id: 'live',
    name: 'Global Edge',
    icon: Globe,
    color: 'hsl(346, 87%, 43%)',
    bgColor: 'rgba(244, 63, 94, 0.1)',
    glow: 'rgba(244, 63, 94, 0.3)',
    description: 'Multi-region AWS cluster deploy & Cloudflare purge.'
  }
];

const DevPipelineSection = () => {
  const [complexity, setComplexity] = useState(40);
  const [workers, setWorkers] = useState(4);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStageIndex, setCurrentStageIndex] = useState(-1);
  const [logs, setLogs] = useState([]);
  const [completedStages, setCompletedStages] = useState({});
  const [successConfetti, setSuccessConfetti] = useState(false);
  const terminalEndRef = useRef(null);
  const ios = isIOS();

  // Handle auto-scrolling terminal logs
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  // Log message generator helper
  const addLog = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs((prev) => [...prev, { timestamp, message, type }]);
  };

  const resetPipeline = () => {
    setIsRunning(false);
    setCurrentStageIndex(-1);
    setLogs([]);
    setCompletedStages({});
    setSuccessConfetti(false);
  };

  const executePipeline = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setCurrentStageIndex(0);
    setCompletedStages({});
    setSuccessConfetti(false);
    setLogs([]);

    // Calculate latency adjustments based on complexity & worker settings
    const testDelay = Math.round(complexity * 35);
    const workerBenefit = Math.max(1, 10 - workers);
    const queueDelay = Math.round(workerBenefit * 250);

    // ── STAGE 0: GIT COMMIT ──
    addLog('GIT: Initiating connection to repository server...', 'info');
    await new Promise(r => setTimeout(r, 600));
    addLog('GIT: SSH commit signature validated successfully.', 'success');
    addLog('GIT: Tracing SHA key: [csd_2f7ba1c89f] pushed by csDikshant.', 'info');
    setCurrentStageIndex(0);
    await new Promise(r => setTimeout(r, 800));
    setCompletedStages(prev => ({ ...prev, push: true }));
    addLog('✓ STAGE 1: Git push completed successfully.', 'success');

    // ── STAGE 1: SECURITY AUDIT ──
    setCurrentStageIndex(1);
    addLog('LINT: Scanning 14 target typescript controller modules...', 'info');
    await new Promise(r => setTimeout(r, 700));
    addLog('LINT: Running ES-Audit & SonarQube static check suites...', 'info');
    await new Promise(r => setTimeout(r, testDelay));
    addLog('✓ LINT: 0 errors / 0 warnings detected in repository sources.', 'success');
    addLog('SECURITY: Validating anti-XSS middlewares & sanitizers...', 'info');
    await new Promise(r => setTimeout(r, 500));
    setCompletedStages(prev => ({ ...prev, security: true }));
    addLog('✓ STAGE 2: Security scanning successfully passed.', 'success');

    // ── STAGE 2: TESTING SUITE ──
    setCurrentStageIndex(2);
    addLog('TEST: Preparing integration DB replicas & test harnesses...', 'info');
    await new Promise(r => setTimeout(r, 600));
    addLog(`TEST: Launching 32 unit assertion pipelines (Complexity Factor: ${complexity}%)...`, 'info');
    await new Promise(r => setTimeout(r, testDelay * 1.5));
    addLog('TEST: ✓ Jest test-suite assertion matrix passed.', 'success');
    addLog('TEST: ✓ Playwright E2E browser tests compiled, all passes verified.', 'success');
    setCompletedStages(prev => ({ ...prev, test: true }));
    addLog('✓ STAGE 3: Client & server verification tests complete.', 'success');

    // ── STAGE 3: REDIS HORIZON WORKERS ──
    setCurrentStageIndex(3);
    addLog(`REDIS: Connecting to cluster database at 127.0.0.1:6379...`, 'info');
    await new Promise(r => setTimeout(r, 500));
    addLog(`QUEUE: Processing heavy payload arrays using ${workers} concurrent Horizon threads...`, 'info');
    await new Promise(r => setTimeout(r, queueDelay));
    addLog(`QUEUE: Handled async database indexing pipeline in ${Math.round(queueDelay * 0.4)}ms.`, 'success');
    addLog('QUEUE: Automated notification alerts dispatched to client sockets.', 'info');
    setCompletedStages(prev => ({ ...prev, redis: true }));
    addLog('✓ STAGE 4: Laravel Redis task scheduler executed.', 'success');

    // ── STAGE 4: GLOBAL EDGE DEPLOY ──
    setCurrentStageIndex(4);
    addLog('AWS: Packing lightweight ECS container docker images...', 'info');
    await new Promise(r => setTimeout(r, 800));
    addLog('AWS: Deploying Docker containers to AWS ECS scaling matrix...', 'info');
    await new Promise(r => setTimeout(r, 700));
    addLog('CLOUDFLARE: Dispatching Cache purge webhook command globally...', 'info');
    await new Promise(r => setTimeout(r, 500));
    addLog('CLOUDFLARE: DNS edges successfully propagated in 28ms.', 'success');
    setCompletedStages(prev => ({ ...prev, live: true }));
    setCurrentStageIndex(5);
    setSuccessConfetti(true);
    addLog('====================================================', 'success');
    addLog('✓ SYSTEM STACK FULLY DEPLOYED AND OPERATIONAL!', 'success');
    addLog('Host node online at: https://dikshantgoyal.com (v3.2.0)', 'success');
    addLog('====================================================', 'success');
    setIsRunning(false);
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-background" id="pipeline">
      {/* Dynamic background lights */}
      <div className="absolute top-[30%] left-[-15%] w-[45%] h-[45%] rounded-full bg-[radial-gradient(circle_at_center,hsl(199,89%,42%,0.03),transparent_65%)] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-15%] w-[45%] h-[45%] rounded-full bg-[radial-gradient(circle_at_center,hsl(142,70%,45%,0.03),transparent_65%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 md:mb-16">
          <FadeIn>
            <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 uppercase tracking-widest mb-4 inline-block">
              CI/CD Automation
            </span>
            <h2 className="mb-4 text-3xl md:text-5xl font-extrabold tracking-tight">
              <TextReveal text="Interactive Delivery Pipeline" className="text-gradient-primary" />
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Experience the automated workflow I build for immediate, zero-downtime, and high-reliability project delivery. Run the simulator, tweak the parameters, and view the automated log stream.
            </p>
          </FadeIn>
        </div>

        {/* Modular Control Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Controls & Pipeline Interactive Block (Left) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Tuning Sliders Panel */}
            <Card className="glass-card border-border/40 premium-shadow bg-card/60 backdrop-blur-md">
              <CardContent className="p-6 flex flex-col gap-6">
                <h3 className="text-base font-bold text-foreground flex items-center gap-2 mb-1">
                  <Cpu className="w-4 h-4 text-primary shrink-0" />
                  Pipeline Core Tuners
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Slider 1: Code Complexity */}
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-muted-foreground">Code Complexity</span>
                      <span className="text-primary font-mono">{complexity}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={complexity}
                      disabled={isRunning}
                      onChange={(e) => setComplexity(Number(e.target.value))}
                      className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-primary disabled:opacity-40"
                    />
                    <span className="text-[10px] text-muted-foreground/80 leading-snug">
                      Higher complexity replicates deeper lint layers and increases unit test suite execution times.
                    </span>
                  </div>

                  {/* Slider 2: Redis Horizon Threads */}
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-muted-foreground">Horizon Thread Workers</span>
                      <span className="text-primary font-mono">{workers} workers</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="8"
                      value={workers}
                      disabled={isRunning}
                      onChange={(e) => setWorkers(Number(e.target.value))}
                      className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-primary disabled:opacity-40"
                    />
                    <span className="text-[10px] text-muted-foreground/80 leading-snug">
                      Scaling concurrent Laravel Redis worker count decreases backoff queue latency in processing pipelines.
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stages Visual Roadmap Canvas */}
            <Card className="glass-card border-border/40 premium-shadow bg-neutral-950/40 overflow-hidden relative p-6 flex flex-col justify-center flex-grow min-h-[300px]">
              
              {/* Dynamic Connecting Lines SVG */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block" xmlns="http://www.w3.org/2000/svg">
                {pipelineStages.slice(0, -1).map((stage, i) => {
                  const stepPercent = 100 / (pipelineStages.length - 1);
                  const x1 = `${10 + i * stepPercent}%`;
                  const x2 = `${10 + (i + 1) * stepPercent}%`;
                  const isLineActive = isRunning && currentStageIndex >= i;
                  
                  return (
                    <g key={stage.id}>
                      <line
                        x1={x1}
                        y1="50%"
                        x2={x2}
                        y2="50%"
                        stroke={isLineActive ? pipelineStages[i].color : 'rgba(255, 255, 255, 0.05)'}
                        strokeWidth={isLineActive ? 2.5 : 1.5}
                        className="transition-colors duration-500"
                      />
                      {isLineActive && currentStageIndex === i && (
                        <motion.circle
                          r="4"
                          fill={pipelineStages[i + 1].color}
                          initial={{ cx: x1 }}
                          animate={{ cx: [x1, x2] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                          style={{ cy: "50%" }}
                        />
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Steps Layout */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10 w-full">
                {pipelineStages.map((stage, index) => {
                  const StageIcon = stage.icon;
                  const isStageCurrent = currentStageIndex === index;
                  const isStageCompleted = completedStages[stage.id] || currentStageIndex > index;
                  const isStageIdle = currentStageIndex < index;

                  return (
                    <div key={stage.id} className="flex md:flex-col items-center gap-4 md:gap-3 w-full md:w-auto relative group">
                      
                      {/* Interactive Step Badge */}
                      <motion.div
                        animate={
                          isStageCurrent
                            ? { scale: [1, 1.12, 1], borderColor: stage.color }
                            : isStageCompleted
                            ? { scale: 1, borderColor: 'rgba(16, 185, 129, 0.5)' }
                            : { scale: 1, borderColor: 'rgba(255,255,255,0.08)' }
                        }
                        transition={isStageCurrent ? { repeat: Infinity, duration: 1.5 } : { duration: 0.3 }}
                        style={{
                          backgroundColor: isStageCompleted
                            ? 'rgba(16, 185, 129, 0.08)'
                            : isStageCurrent
                            ? stage.bgColor
                            : 'rgba(255,255,255,0.02)',
                          boxShadow: isStageCurrent ? `0 0 15px ${stage.glow}` : 'none'
                        }}
                        className={`w-12 h-12 rounded-2xl border flex items-center justify-center relative shrink-0 transition-colors duration-300`}
                      >
                        {isStageCompleted ? (
                          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                        ) : (
                          <StageIcon
                            style={{ color: isStageCurrent ? stage.color : 'rgba(255,255,255,0.4)' }}
                            className="w-5 h-5 shrink-0 transition-colors"
                          />
                        )}

                        {/* Staggered Index Label */}
                        <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-neutral-900 border border-border/50 text-[10px] font-bold font-mono rounded-full flex items-center justify-center">
                          {index + 1}
                        </div>
                      </motion.div>

                      {/* Step Labels */}
                      <div className="text-left md:text-center">
                        <h4
                          style={{ color: isStageCompleted ? 'white' : isStageCurrent ? stage.color : 'rgba(255,255,255,0.5)' }}
                          className="text-xs font-bold font-mono tracking-tight transition-colors duration-300"
                        >
                          {stage.name}
                        </h4>
                        <p className="text-[10px] text-muted-foreground/80 md:hidden max-w-[200px] mt-0.5 leading-snug">
                          {stage.description}
                        </p>
                      </div>

                      {/* Hover Tooltip - Desktop only */}
                      <div className="hidden md:block absolute bottom-16 left-1/2 -translate-x-1/2 w-48 p-2.5 rounded-xl bg-card border border-border/50 text-left opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100 z-30 shadow-lg">
                        <p className="text-[10px] font-bold text-foreground mb-0.5">{stage.name}</p>
                        <p className="text-[9px] text-muted-foreground leading-normal">{stage.description}</p>
                      </div>

                    </div>
                  );
                })}
              </div>

              {/* Status Ribbon (Terminal Trigger Overlay) */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={executePipeline}
                  disabled={isRunning}
                  className={`relative px-8 py-3.5 rounded-xl text-sm font-bold shadow-md active:scale-95 smooth-transition flex items-center gap-2.5 w-full sm:w-auto justify-center select-none ${
                    isRunning
                      ? 'bg-neutral-800 border border-neutral-700 text-neutral-500 cursor-not-allowed'
                      : 'bg-primary text-primary-foreground hover:bg-primary/95 shadow-primary/20 hover:shadow-primary/30'
                  }`}
                >
                  {isRunning ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin shrink-0" />
                      Deploy Pipeline Active...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current shrink-0" />
                      Execute Deployment Pipeline
                    </>
                  )}
                </button>

                {(isRunning || logs.length > 0) && (
                  <button
                    onClick={resetPipeline}
                    className="px-6 py-3.5 rounded-xl text-sm font-semibold border border-border/50 hover:bg-neutral-800/40 text-muted-foreground smooth-transition w-full sm:w-auto"
                  >
                    Clear Console
                  </button>
                )}
              </div>
            </Card>

          </div>

          {/* Dev Terminal Interactive Screen (Right) */}
          <div className="lg:col-span-5 flex flex-col">
            <Card className="glass-card border-border/40 premium-shadow bg-neutral-950 flex flex-col h-[400px] lg:h-full overflow-hidden select-text relative">
              
              {/* Terminal Frame Header */}
              <div className="px-4 py-3 bg-neutral-900/60 border-b border-border/40 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="text-[10px] font-bold font-mono text-muted-foreground/80 tracking-wide">
                  dikshant@aws-node-prod:~
                </div>
                <div className="w-6 h-1 bg-border/20 rounded-full" />
              </div>

              {/* Terminal Output Stream */}
              <div className="p-4 flex-grow overflow-y-auto font-mono text-[11px] leading-relaxed flex flex-col gap-2.5 scrollbar-thin scrollbar-thumb-neutral-800">
                <AnimatePresence>
                  {logs.length === 0 ? (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.5 }}
                      exit={{ opacity: 0 }}
                      className="h-full flex flex-col items-center justify-center gap-3 text-neutral-500 text-center px-4"
                    >
                      <TerminalIcon className="w-8 h-8 opacity-40 shrink-0" />
                      <p className="text-xs font-semibold max-w-[200px] leading-normal">
                        Terminal shell ready. Click the deployment trigger to stream secure pipeline actions.
                      </p>
                    </motion.div>
                  ) : (
                    logs.map((log, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.15 }}
                        className="flex items-start gap-2.5"
                      >
                        <span className="text-neutral-600 shrink-0 select-none">[{log.timestamp}]</span>
                        <span
                          className={
                            log.type === 'success'
                              ? 'text-emerald-400 font-bold'
                              : log.type === 'warn'
                              ? 'text-amber-400 font-semibold'
                              : 'text-neutral-300'
                          }
                        >
                          {log.message}
                        </span>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
                <div ref={terminalEndRef} />
              </div>

              {/* High-tech status footer overlay */}
              {successConfetti && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center gap-2.5 z-20 backdrop-blur-md shadow-lg"
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    ✓
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-white uppercase tracking-wider font-mono">Build Success</p>
                    <p className="text-[9px] text-emerald-400/90 font-mono">v3.2.0 deployed in {Math.round(1800 + complexity * 35 + Math.max(1, 10 - workers) * 250)}ms</p>
                  </div>
                </motion.div>
              )}
            </Card>
          </div>

        </div>

      </div>
    </section>
  );
};

export default DevPipelineSection;

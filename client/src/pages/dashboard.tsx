import { Navigation } from "@/components/layout/Navigation";
import { CharterLayer } from "@/components/governance/CharterLayer";
import { SynergyGraph } from "@/components/governance/SynergyGraph";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Activity, MessageSquare, AlertOctagon, Zap, Terminal, Code, Cpu, RefreshCw, Database } from "lucide-react";
import bgImage from "@assets/generated_images/abstract_neural_network_governance_background.png";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const [blitzStatus, setBlitzStatus] = useState("IDLE");
  const [logs, setLogs] = useState<Array<{id: string, time: string, msg: string, type: 'info' | 'warn' | 'success'}>>([
    { id: '1', time: new Date().toLocaleTimeString(), msg: "NeuralBlitz Interface Initialized...", type: 'info' }
  ]);
  const [activeTokens, setActiveTokens] = useState(0);
  const [latency, setLatency] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Simulated NeuralBlitz API integration
  useEffect(() => {
    const interval = setInterval(() => {
      const messages = [
        "Analyzing packet synchronization...",
        "Optimizing synaptic weights via NeuralBlitz-v4...",
        "Governance check: Neutralizing potential bias vector...",
        "Epoch completion: Loss 0.0024 | Val_Acc 0.998",
        "Scaling inference nodes to region: US-EAST",
        "Synergy Engine: Quantum alignment achieved.",
        "Epistemic Inquiry: Resolving knowledge gap in ethics module...",
        "NeuralBlitz API: Requesting burst mode...",
      ];
      
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      const types: Array<'info' | 'warn' | 'success'> = ['info', 'success', 'info', 'info'];
      const randomType = types[Math.floor(Math.random() * types.length)];
      
      setLogs(prev => [...prev.slice(-15), {
        id: Math.random().toString(),
        time: new Date().toLocaleTimeString(),
        msg: randomMsg,
        type: randomType
      }]);

      setLatency(Math.floor(Math.random() * 25) + 5);
      setActiveTokens(prev => Math.max(0, prev + Math.floor(Math.random() * 100) - 40));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const runBlitzBurst = () => {
    setBlitzStatus("BURST_MODE");
    setActiveTokens(prev => prev + 500);
    setLogs(prev => [...prev, {
      id: 'burst',
      time: new Date().toLocaleTimeString(),
      msg: "NEURALBLITZ BURST INITIATED: Max throughput enabled.",
      type: 'success'
    }]);
    setTimeout(() => setBlitzStatus("OPERATIONAL"), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      <Navigation />
      
      <main className="md:pl-64 pt-16 md:pt-0 pb-24 md:pb-0 min-h-screen relative overflow-hidden">
        {/* Animated Background Image Overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ 
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            mixBlendMode: 'screen' 
          }}
        />

        {/* Scanline Effect */}
        <div className="absolute inset-0 z-1 pointer-events-none bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-20" />

        <div className="relative z-10 p-4 md:p-8 space-y-4 md:space-y-6">
          <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-white/10 pb-4 md:pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary text-primary-foreground">V4.2.0</span>
                <h1 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight">
                  NeuralBlitz <span className="text-primary">Integrator</span>
                </h1>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground max-w-2xl font-display">
                Holistic Architecture • Ethical Charter Fabric • Synergy Engine v9.8
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="text-right flex-shrink-0">
                <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1">
                  API Latency
                </div>
                <div className="text-primary font-mono font-bold text-lg">
                  {latency}ms
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1">
                  Neural Status
                </div>
                <motion.div 
                  animate={blitzStatus === "BURST_MODE" ? { scale: [1, 1.1, 1] } : {}}
                  className={cn(
                    "flex items-center gap-2 font-mono font-bold text-sm px-3 py-1 rounded border",
                    blitzStatus === "BURST_MODE" ? "bg-primary/20 border-primary text-primary" : "bg-green-500/10 border-green-500/30 text-green-400"
                  )}
                >
                  <Activity className={cn("w-4 h-4", blitzStatus === "BURST_MODE" && "animate-pulse")} />
                  {blitzStatus}
                </motion.div>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-12 gap-6 h-auto md:h-[650px]">
            {/* Left Column: Governance & API Controls */}
            <div className="col-span-12 md:col-span-4 flex flex-col gap-6">
              <CharterLayer />
              <Card className="bg-black/40 border-primary/20 backdrop-blur-md overflow-hidden shrink-0">
                <CardHeader className="py-3 px-4 border-b border-white/10">
                  <CardTitle className="text-xs font-mono text-primary flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    BLITZ API CONTROLS
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 flex gap-4">
                  <button 
                    onClick={runBlitzBurst}
                    className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded font-display font-bold text-sm hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
                    data-testid="button-burst-mode"
                  >
                    <Zap className="w-4 h-4 fill-current" />
                    BURST MODE
                  </button>
                  <button 
                    className="flex-1 bg-white/5 border border-white/10 text-white px-4 py-2 rounded font-display font-bold text-sm hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                    data-testid="button-sync-weights"
                  >
                    <RefreshCw className="w-4 h-4" />
                    SYNC WEIGHTS
                  </button>
                </CardContent>
              </Card>
            </div>

            {/* Middle Column: Visualizations & Real-time Logs */}
            <div className="col-span-12 md:col-span-5 flex flex-col gap-6 h-full">
               <Card className="flex-1 bg-black/40 border-primary/20 backdrop-blur-md overflow-hidden flex flex-col">
                 <CardHeader className="py-3 px-4 border-b border-white/10">
                   <CardTitle className="text-xs font-mono text-primary flex items-center gap-2">
                     <Cpu className="w-4 h-4" />
                     SYNERGY ENGINE (QUANTUM CORE)
                   </CardTitle>
                 </CardHeader>
                 <div className="flex-1 p-4">
                   <SynergyGraph />
                 </div>
                 <div className="p-4 border-t border-white/10 flex justify-around text-center">
                    <div>
                      <div className="text-[10px] font-mono text-muted-foreground uppercase">Tokens/sec</div>
                      <div className="text-xl font-mono text-white">{(activeTokens / 10).toFixed(1)}k</div>
                    </div>
                    <div className="border-l border-white/10 h-8 mt-1" />
                    <div>
                      <div className="text-[10px] font-mono text-muted-foreground uppercase">Stability</div>
                      <div className="text-xl font-mono text-white">0.9992</div>
                    </div>
                 </div>
               </Card>

               <Card className="h-48 md:h-1/3 bg-black/40 border-white/10 backdrop-blur-md flex flex-col overflow-hidden">
                 <CardHeader className="py-3 px-4 border-b border-white/10 flex justify-between items-center">
                   <CardTitle className="text-xs font-mono text-white flex items-center gap-2">
                     <Terminal className="w-4 h-4" />
                     NEURALBLITZ STREAM LOG
                   </CardTitle>
                   <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500/50" />
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
                   </div>
                 </CardHeader>
                 <div className="flex-1 overflow-hidden p-2">
                    <div 
                      ref={scrollRef}
                      className="h-full overflow-y-auto font-mono text-[10px] space-y-1.5 p-2 bg-black/20 rounded border border-white/5 scrollbar-hide"
                    >
                      <AnimatePresence initial={false}>
                        {logs.map((log) => (
                          <motion.div
                            key={log.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={cn(
                              "flex gap-2",
                              log.type === 'warn' ? "text-amber-400" : 
                              log.type === 'success' ? "text-primary" : "text-muted-foreground"
                            )}
                          >
                            <span className="opacity-40">[{log.time}]</span>
                            <span className="opacity-60 text-white/50">$</span>
                            <span className="truncate">{log.msg}</span>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                 </div>
               </Card>
            </div>

            {/* Right Column: Alerts & Global Stats */}
            <div className="col-span-12 md:col-span-3 h-full flex flex-col gap-4">
              <Card className="bg-destructive/10 border-destructive/30 backdrop-blur-md">
                 <CardHeader className="py-3 px-4 border-b border-destructive/20">
                   <CardTitle className="text-xs font-mono text-destructive flex items-center gap-2">
                     <AlertOctagon className="w-4 h-4" />
                     GOVERNANCE ALERTS
                   </CardTitle>
                 </CardHeader>
                 <CardContent className="p-4 space-y-3">
                   <motion.div 
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="p-2 bg-black/40 rounded border border-destructive/20 text-[10px] text-white flex items-start gap-2"
                   >
                     <div className="w-2 h-2 rounded-full bg-destructive mt-1 shrink-0" />
                     <div>
                        <div className="font-bold">DRIFT DETECTED</div>
                        <div className="opacity-70">Sector X-9 in ethical subspace.</div>
                     </div>
                   </motion.div>
                   <div className="p-2 bg-white/5 rounded border border-white/10 text-[10px] text-muted-foreground">
                      No active policy violations in the last 24h.
                   </div>
                 </CardContent>
              </Card>

              <div className="flex-1 rounded-lg border border-dashed border-white/10 p-6 flex flex-col items-center justify-center text-center bg-black/20 relative group overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 space-y-4">
                  <div className="p-4 rounded-full bg-primary/10 border border-primary/20 mx-auto w-fit">
                    <Code className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <div className="text-5xl font-display font-bold text-white tracking-tighter">99.9<span className="text-primary text-2xl">%</span></div>
                    <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mt-2">
                      Ethical Compliance Score
                    </div>
                  </div>
                  <div className="w-full bg-white/5 h-1 rounded overflow-hidden">
                    <motion.div 
                      className="bg-primary h-full"
                      animate={{ width: "99.9%" }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </div>

              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-4">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-secondary/20 border border-secondary flex items-center justify-center text-secondary">
                        <Database className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-bold text-white">Provenance Sync</div>
                        <div className="text-[10px] text-muted-foreground font-mono">HASH: 0x4f...92e1</div>
                      </div>
                   </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

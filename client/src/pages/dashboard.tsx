import { Navigation } from "@/components/layout/Navigation";
import { CharterLayer } from "@/components/governance/CharterLayer";
import { SynergyGraph } from "@/components/governance/SynergyGraph";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Activity, MessageSquare, AlertOctagon, Zap, Terminal, Code, Cpu, RefreshCw, Database, ChevronRight, Play, Settings2 } from "lucide-react";
import bgImage from "@assets/generated_images/abstract_neural_network_governance_background.png";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function Dashboard() {
  const [blitzStatus, setBlitzStatus] = useState("OPERATIONAL");
  const [activeModel, setActiveModel] = useState("Synergy-v9.8-Quantum");
  const [activeMode, setActiveMode] = useState("Holistic");
  const [logs, setLogs] = useState<Array<{id: string, time: string, msg: string, type: 'info' | 'warn' | 'success', details?: string}>>([
    { id: '1', time: new Date().toLocaleTimeString(), msg: "NeuralBlitz Interface Initialized...", type: 'info', details: "Core systems initialized. Version 4.2.0 boot sequence complete." }
  ]);
  const [activeTokens, setActiveTokens] = useState(1200);
  const [latency, setLatency] = useState(12);
  const [selectedLog, setSelectedLog] = useState<null | typeof logs[0]>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const models = ["Synergy-v9.8-Quantum", "Aegis-v4-Stable", "Blitz-x1-Pro"];
  const modes = ["Holistic", "Restricted", "Debug", "Burst"];

  useEffect(() => {
    const interval = setInterval(() => {
      const messages = [
        { m: "Analyzing packet synchronization...", d: "Synchronizing nodes across US-EAST and EU-WEST clusters." },
        { m: "Optimizing synaptic weights via NeuralBlitz-v4...", d: "Adjusting weights for improved ethical alignment in sector 7." },
        { m: "Governance check: Neutralizing bias vector...", d: "Bias detected in demographic slice 'Age 18-24'. Automatic correction applied." },
        { m: "Epoch completion: Loss 0.0024 | Val_Acc 0.998", d: "Training cycle successful. Model performance exceeding benchmarks." },
        { m: "Scaling inference nodes to region: US-EAST", d: "Auto-scaling active. 12 new nodes added." },
        { m: "Synergy Engine: Quantum alignment achieved.", d: "Coherence levels at 99.98%." },
        { m: "Epistemic Inquiry: Resolving knowledge gap...", d: "Identified ambiguity in legal framework sector. Generating counter-factuals." },
      ];
      
      const entry = messages[Math.floor(Math.random() * messages.length)];
      const types: Array<'info' | 'warn' | 'success'> = ['info', 'success', 'info', 'info'];
      const randomType = types[Math.floor(Math.random() * types.length)];
      
      setLogs(prev => [...prev.slice(-20), {
        id: Math.random().toString(),
        time: new Date().toLocaleTimeString(),
        msg: entry.m,
        type: randomType,
        details: entry.d
      }]);

      setLatency(Math.floor(Math.random() * 25) + 5);
      setActiveTokens(prev => Math.max(800, prev + Math.floor(Math.random() * 200) - 100));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const runBlitzBurst = () => {
    setBlitzStatus("BURST_MODE");
    setActiveMode("Burst");
    setActiveTokens(prev => prev + 2000);
    toast.success("NEURALBLITZ BURST ENABLED", {
      description: "Throughput increased by 400%",
    });
    setLogs(prev => [...prev, {
      id: 'burst-' + Date.now(),
      time: new Date().toLocaleTimeString(),
      msg: "NEURALBLITZ BURST INITIATED",
      type: 'success',
      details: "Maximum compute resources allocated to inference stream."
    }]);
    setTimeout(() => {
      setBlitzStatus("OPERATIONAL");
      setActiveMode("Holistic");
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      <Navigation />
      
      <main className="md:pl-64 pt-16 md:pt-0 pb-24 md:pb-0 min-h-screen relative overflow-hidden">
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

        <div className="absolute inset-0 z-1 pointer-events-none bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-20" />

        <div className="relative z-10 p-4 md:p-8 space-y-4 md:space-y-6">
          <header className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 border-b border-white/10 pb-4 md:pb-6">
            <div className="space-y-4 w-full md:w-auto">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary text-primary-foreground">V4.2.0</span>
                <h1 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight">
                  NeuralBlitz <span className="text-primary">Integrator</span>
                </h1>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest block">Active Model</label>
                  <div className="flex gap-1">
                    {models.map(m => (
                      <button 
                        key={m}
                        onClick={() => { setActiveModel(m); toast.info(`Switched to ${m}`); }}
                        className={cn(
                          "px-2 py-1 rounded text-[10px] font-mono border transition-all",
                          activeModel === m ? "bg-primary/20 border-primary text-primary" : "bg-white/5 border-white/10 text-muted-foreground hover:text-white"
                        )}
                      >
                        {m.split('-')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest block">Core Mode</label>
                  <div className="flex gap-1">
                    {modes.map(m => (
                      <button 
                        key={m}
                        onClick={() => { setActiveMode(m); toast.info(`Mode set to ${m}`); }}
                        className={cn(
                          "px-2 py-1 rounded text-[10px] font-mono border transition-all",
                          activeMode === m ? "bg-secondary/20 border-secondary text-secondary" : "bg-white/5 border-white/10 text-muted-foreground hover:text-white"
                        )}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 bg-black/40 backdrop-blur-md p-4 rounded-lg border border-white/10">
               <div className="text-right flex-shrink-0">
                <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1">Latency</div>
                <div className="text-primary font-mono font-bold text-lg leading-none">{latency}ms</div>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="text-right flex-shrink-0">
                <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1">Status</div>
                <div className={cn(
                    "flex items-center gap-2 font-mono font-bold text-sm",
                    blitzStatus === "BURST_MODE" ? "text-primary" : "text-green-400"
                  )}>
                  <span className={cn("w-2 h-2 rounded-full", blitzStatus === "BURST_MODE" ? "bg-primary animate-pulse" : "bg-green-500")} />
                  {blitzStatus}
                </div>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-12 gap-6 h-auto md:h-[650px]">
            <div className="col-span-12 md:col-span-4 flex flex-col gap-6">
              <CharterLayer />
              <Card className="bg-black/40 border-primary/20 backdrop-blur-md overflow-hidden shrink-0">
                <CardHeader className="py-3 px-4 border-b border-white/10">
                  <CardTitle className="text-xs font-mono text-primary flex items-center gap-2">
                    <Zap className="w-4 h-4" /> ENGINE OVERRIDE
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 flex flex-col gap-3">
                  <button 
                    onClick={runBlitzBurst}
                    className="w-full bg-primary text-primary-foreground px-4 py-3 rounded font-display font-bold text-sm hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    <Zap className="w-4 h-4 fill-current" /> INITIATE BURST STREAM
                  </button>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="bg-white/5 border border-white/10 text-white p-2 rounded text-[10px] font-mono hover:bg-white/10 transition-all flex items-center gap-2">
                      <Settings2 className="w-3 h-3" /> TUNING
                    </button>
                    <button className="bg-white/5 border border-white/10 text-white p-2 rounded text-[10px] font-mono hover:bg-white/10 transition-all flex items-center gap-2">
                      <Play className="w-3 h-3" /> SIMULATE
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="col-span-12 md:col-span-5 flex flex-col gap-6 h-full">
               <Card className="flex-1 bg-black/40 border-primary/20 backdrop-blur-md overflow-hidden flex flex-col">
                 <CardHeader className="py-3 px-4 border-b border-white/10 flex justify-between items-center">
                   <CardTitle className="text-xs font-mono text-primary flex items-center gap-2">
                     <Cpu className="w-4 h-4" /> QUANTUM CORE
                   </CardTitle>
                   <span className="text-[10px] font-mono text-muted-foreground">REFRESH: 60Hz</span>
                 </CardHeader>
                 <div className="flex-1 p-4">
                   <SynergyGraph />
                 </div>
                 <div className="p-4 border-t border-white/10 flex justify-around text-center bg-white/2">
                    <div>
                      <div className="text-[10px] font-mono text-muted-foreground uppercase">Rate</div>
                      <div className="text-xl font-mono text-white">{(activeTokens / 10).toFixed(1)}k/s</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-muted-foreground uppercase">Stability</div>
                      <div className="text-xl font-mono text-white">0.9992</div>
                    </div>
                 </div>
               </Card>

               <Card className="h-64 md:h-1/3 bg-black/40 border-white/10 backdrop-blur-md flex flex-col overflow-hidden group">
                 <CardHeader className="py-3 px-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                   <CardTitle className="text-xs font-mono text-white flex items-center gap-2">
                     <Terminal className="w-4 h-4" /> ACTIVE STREAM LOG
                   </CardTitle>
                   <span className="text-[10px] font-mono text-primary/50">CLICK LOG FOR DETAILS</span>
                 </CardHeader>
                 <div className="flex-1 overflow-hidden p-2">
                    <div 
                      ref={scrollRef}
                      className="h-full overflow-y-auto font-mono text-[10px] space-y-1 p-2 bg-black/20 rounded border border-white/5 scrollbar-hide"
                    >
                      <AnimatePresence initial={false}>
                        {logs.map((log) => (
                          <motion.button
                            key={log.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            onClick={() => setSelectedLog(log)}
                            className={cn(
                              "flex gap-2 w-full text-left p-1 rounded hover:bg-white/5 transition-colors group/item",
                              log.type === 'warn' ? "text-amber-400/80 hover:text-amber-400" : 
                              log.type === 'success' ? "text-primary/80 hover:text-primary" : "text-muted-foreground/80 hover:text-white"
                            )}
                          >
                            <span className="opacity-40 shrink-0">[{log.time}]</span>
                            <span className="truncate flex-1">{log.msg}</span>
                            <ChevronRight className="w-3 h-3 opacity-0 group-hover/item:opacity-40 shrink-0" />
                          </motion.button>
                        ))}
                      </AnimatePresence>
                    </div>
                 </div>
               </Card>
            </div>

            <div className="col-span-12 md:col-span-3 h-full flex flex-col gap-4">
              <Card className="bg-destructive/10 border-destructive/30 backdrop-blur-md">
                 <CardHeader className="py-3 px-4 border-b border-destructive/20">
                   <CardTitle className="text-xs font-mono text-destructive flex items-center gap-2">
                     <AlertOctagon className="w-4 h-4" /> ALERTS
                   </CardTitle>
                 </CardHeader>
                 <CardContent className="p-4 space-y-3">
                   <motion.div 
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="p-3 bg-black/60 rounded border border-destructive/30 text-[10px] text-white space-y-1"
                   >
                      <div className="font-bold flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-destructive" />
                        DRIFT DETECTED
                      </div>
                      <div className="opacity-70 leading-relaxed">System identified minor semantic drift in Sector X-9. Alignment corrected.</div>
                   </motion.div>
                 </CardContent>
              </Card>

              <div className="flex-1 rounded-lg border border-dashed border-white/10 p-6 flex flex-col items-center justify-center text-center bg-black/40 hover:bg-black/60 transition-colors group">
                <div className="space-y-4">
                  <div className="p-4 rounded-full bg-primary/10 border border-primary/20 mx-auto w-fit group-hover:scale-110 transition-transform">
                    <Code className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <div className="text-5xl font-display font-bold text-white tracking-tighter">99.9<span className="text-primary text-2xl">%</span></div>
                    <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mt-2">Ethical Compliance</div>
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
                        <div className="text-[10px] text-muted-foreground font-mono">OK: 0x4f...92e1</div>
                      </div>
                   </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Dialog open={!!selectedLog} onOpenChange={() => setSelectedLog(null)}>
        <DialogContent className="bg-black/95 border-primary/30 backdrop-blur-xl text-white">
          <DialogHeader>
            <DialogTitle className="font-mono text-primary flex items-center gap-2">
              <Terminal className="w-5 h-5" /> LOG DETAILS
            </DialogTitle>
            <DialogDescription className="text-muted-foreground font-mono text-xs">
              [{selectedLog?.time}] - Event ID: {selectedLog?.id.slice(0, 8)}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 bg-white/5 rounded border border-white/10">
              <div className="text-xs text-muted-foreground uppercase font-mono mb-2">Message</div>
              <div className="text-lg font-display text-white">{selectedLog?.msg}</div>
            </div>
            <div className="p-4 bg-white/5 rounded border border-white/10">
              <div className="text-xs text-muted-foreground uppercase font-mono mb-2">Payload Details</div>
              <div className="text-sm font-mono text-white/80 leading-relaxed italic">
                "{selectedLog?.details}"
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <div className="text-[10px] text-muted-foreground uppercase font-mono mb-1">Type</div>
                <div className="text-xs font-mono text-primary uppercase">{selectedLog?.type}</div>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <div className="text-[10px] text-muted-foreground uppercase font-mono mb-1">Protocol</div>
                <div className="text-xs font-mono text-white">NeuralBlitz-V4</div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

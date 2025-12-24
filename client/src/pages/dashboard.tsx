import { Navigation } from "@/components/layout/Navigation";
import { CharterLayer } from "@/components/governance/CharterLayer";
import { SynergyGraph } from "@/components/governance/SynergyGraph";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Activity, MessageSquare, AlertOctagon, Zap, Terminal, Code, Cpu, RefreshCw, Database, ChevronRight, Play, Settings2, Search, Sliders, BarChart3, Radio } from "lucide-react";
import bgImage from "@assets/generated_images/abstract_neural_network_governance_background.png";
import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useSimulator } from "@/lib/store";
import { Slider } from "@/components/ui/slider";

export default function Dashboard() {
  const { blitzStatus, activeModel, activeMode, logs, activeTokens, latency, setBlitzStatus, setActiveModel, setActiveMode, addLog, updateStats } = useSimulator();
  const [selectedLog, setSelectedLog] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [temperature, setTemperature] = useState([0.7]);
  const [synapseStrength, setSynapseStrength] = useState([85]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const models = ["Synergy-v9.8-Quantum", "Aegis-v4-Stable", "Blitz-x1-Pro"];
  const modes = ["Holistic", "Restricted", "Debug", "Burst"];

  useEffect(() => {
    const interval = setInterval(() => {
      const messages = [
        { m: "Packet sync analysis...", d: "Synchronizing nodes.", c: 'neural' },
        { m: "Synaptic weight optimization...", d: "Sector 7 alignment.", c: 'neural' },
        { m: "Bias neutralized...", d: "Demographic slice corrected.", c: 'governance' },
        { m: "Epoch 42 complete.", d: "Val_Acc 0.998", c: 'neural' },
        { m: "Causal inquiry active...", d: "Tracing logic chain for token #9281.", c: 'epistemic' },
        { m: "Data integrity verification...", d: "Hash 0x4f...92e1 validated.", c: 'data' },
      ];
      const entry = messages[Math.floor(Math.random() * messages.length)];
      addLog({ msg: entry.m, details: entry.d, type: 'info', category: entry.c as any });
      
      const tokenMultiplier = activeMode === "Burst" ? 5 : (synapseStrength[0] / 50);
      updateStats(
        Math.max(800, Math.floor(activeTokens + (Math.random() * 200 - 100) * tokenMultiplier)),
        Math.floor((Math.random() * 25 + 5) * (temperature[0] + 0.5))
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [activeTokens, addLog, updateStats, synapseStrength, temperature, activeMode]);

  const filteredLogs = useMemo(() => logs.filter(l => 
    l.msg.toLowerCase().includes(search.toLowerCase()) || 
    l.details?.toLowerCase().includes(search.toLowerCase()) ||
    l.category.toLowerCase().includes(search.toLowerCase())
  ), [logs, search]);

  const runBlitzBurst = () => {
    setBlitzStatus("BURST");
    setActiveMode("Burst");
    setSynapseStrength([100]);
    toast.success("NEURALBLITZ BURST ACTIVE", { description: "Quantum core at 100% capacity." });
    addLog({ msg: "EMERGENCY BURST INITIATED", details: "All governance limiters temporarily bypassed for max throughput.", type: 'warn', category: 'neural' });
    setTimeout(() => {
      setBlitzStatus("OPERATIONAL");
      setActiveMode("Holistic");
      setSynapseStrength([85]);
    }, 8000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      <Navigation />
      
      <main className="md:pl-64 pt-16 md:pt-0 pb-24 md:pb-0 min-h-screen relative overflow-hidden">
        {/* Visual FX */}
        <motion.div 
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute inset-0 z-0 pointer-events-none opacity-40"
          style={{ 
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            mixBlendMode: 'screen' 
          }}
        />
        <div className="absolute inset-0 z-1 pointer-events-none bg-grid-white/[0.02] bg-[length:32px_32px]" />

        <div className="relative z-10 p-4 md:p-8 space-y-6">
          <header className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 border-b border-white/10 pb-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/50 flex items-center justify-center shadow-[0_0_15px_rgba(0,255,255,0.2)]">
                  <Zap className="w-6 h-6 text-primary animate-pulse" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-4xl font-display font-bold text-white tracking-tighter uppercase italic">
                    AEGIS <span className="text-primary">Synergy</span>
                  </h1>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em]">
                    Core Integration • Level 09 • Stable
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Throughput", val: `${(activeTokens / 10).toFixed(1)}k`, icon: Radio, color: "text-primary" },
                { label: "Latency", val: `${latency}ms`, icon: Activity, color: "text-secondary" },
                { label: "Stability", val: "0.9992", icon: BarChart3, color: "text-green-400" },
                { label: "Synapse", val: `${synapseStrength[0]}%`, icon: Cpu, color: "text-amber-400" },
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-3 rounded-lg backdrop-blur-sm min-w-[120px]">
                  <div className="flex items-center gap-2 mb-1">
                    <stat.icon className={cn("w-3 h-3", stat.color)} />
                    <span className="text-[9px] font-mono text-muted-foreground uppercase">{stat.label}</span>
                  </div>
                  <div className="text-lg font-mono font-bold text-white">{stat.val}</div>
                </div>
              ))}
            </div>
          </header>

          <div className="grid grid-cols-12 gap-6">
            {/* Control Knobs Column */}
            <div className="col-span-12 lg:col-span-3 space-y-6">
              <Card className="bg-black/60 border-primary/20 backdrop-blur-md">
                <CardHeader className="py-3 px-4 border-b border-white/10">
                  <CardTitle className="text-xs font-mono text-primary flex items-center gap-2">
                    <Sliders className="w-4 h-4" /> ENGINE TUNING
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between text-[10px] font-mono uppercase">
                      <span className="text-muted-foreground">Temperature</span>
                      <span className="text-primary">{temperature[0]}</span>
                    </div>
                    <Slider value={temperature} onValueChange={setTemperature} max={2} step={0.1} className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-[10px] font-mono uppercase">
                      <span className="text-muted-foreground">Synapse Strength</span>
                      <span className="text-secondary">{synapseStrength[0]}%</span>
                    </div>
                    <Slider value={synapseStrength} onValueChange={setSynapseStrength} max={100} step={1} className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4" />
                  </div>
                  <div className="pt-2">
                    <button 
                      onClick={runBlitzBurst}
                      className={cn(
                        "w-full py-3 rounded font-display font-bold text-xs uppercase tracking-widest transition-all",
                        activeMode === "Burst" ? "bg-primary text-primary-foreground animate-pulse shadow-[0_0_20px_rgba(0,255,255,0.4)]" : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                      )}
                    >
                      {activeMode === "Burst" ? "BURST ACTIVE" : "INITIATE BURST"}
                    </button>
                  </div>
                </CardContent>
              </Card>

              <CharterLayer />
            </div>

            {/* Main Viz & Logs Column */}
            <div className="col-span-12 lg:col-span-6 space-y-6">
              <Card className="bg-black/60 border-white/10 h-[400px] flex flex-col relative overflow-hidden group">
                <div className="absolute top-4 right-4 z-20 flex gap-2">
                  {modes.map(m => (
                    <button 
                      key={m} 
                      onClick={() => setActiveMode(m)}
                      className={cn(
                        "px-2 py-0.5 rounded text-[9px] font-mono border transition-all",
                        activeMode === m ? "bg-primary text-primary-foreground border-primary" : "bg-black/50 border-white/10 text-muted-foreground"
                      )}
                    >
                      {m}
                    </button>
                  ))}
                </div>
                <div className="flex-1">
                  <SynergyGraph />
                </div>
              </Card>

              <Card className="bg-black/60 border-white/10 flex flex-col h-[300px]">
                <CardHeader className="p-3 border-b border-white/10 flex justify-between items-center bg-white/2">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-primary" />
                    <span className="text-xs font-mono uppercase tracking-widest">Universal Intelligence Stream</span>
                  </div>
                  <div className="relative w-48">
                    <Search className="w-3 h-3 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input 
                      value={search} 
                      onChange={e => setSearch(e.target.value)} 
                      placeholder="Filter entities..." 
                      className="bg-black/40 border border-white/10 rounded px-7 py-1 text-[10px] font-mono focus:outline-none focus:border-primary w-full" 
                    />
                  </div>
                </CardHeader>
                <ScrollArea className="flex-1 p-2" ref={scrollRef}>
                  <div className="space-y-0.5">
                    {filteredLogs.slice().reverse().map(log => (
                      <button 
                        key={log.id} 
                        onClick={() => setSelectedLog(log)} 
                        className="w-full text-left p-1 text-[10px] font-mono hover:bg-white/5 flex items-center gap-3 rounded border border-transparent hover:border-white/5 group transition-all"
                      >
                        <span className="text-muted-foreground shrink-0 tabular-nums">[{log.time}]</span>
                        <span className={cn(
                          "shrink-0 w-2 h-2 rounded-full",
                          log.category === 'governance' ? 'bg-primary shadow-[0_0_5px_rgba(0,255,255,0.5)]' : 
                          log.category === 'epistemic' ? 'bg-secondary' : 'bg-white/20'
                        )} />
                        <span className="font-bold text-white/40 group-hover:text-white/70 uppercase text-[9px] w-16">{log.category}</span>
                        <span className="truncate flex-1 text-white/70 group-hover:text-white transition-colors">{log.msg}</span>
                        <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-40 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </Card>
            </div>

            {/* Right Data Column */}
            <div className="col-span-12 lg:col-span-3 space-y-6">
              <Card className="bg-black/60 border-white/10">
                <CardHeader className="py-3 px-4 border-b border-white/10 flex justify-between items-center">
                  <CardTitle className="text-xs font-mono text-white">REPOS & DATA</CardTitle>
                  <Database className="w-3 h-3 text-muted-foreground" />
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  {[
                    { label: "Neural Engine", status: "0x4f...92e1", progress: 85 },
                    { label: "Governance Fabric", status: "0x7a...11b2", progress: 100 },
                    { label: "Epistemic Inquiry", status: "0x2c...dd54", progress: 62 },
                  ].map((repo, i) => (
                    <div key={repo.label} className="space-y-2">
                      <div className="flex justify-between text-[10px] font-mono">
                        <span className="text-white/80">{repo.label}</span>
                        <span className="text-primary">{repo.status}</span>
                      </div>
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${repo.progress}%` }}
                          className="h-full bg-primary/40"
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-destructive/10 border-destructive/20 backdrop-blur-md">
                 <CardHeader className="py-3 px-4 border-b border-destructive/10">
                   <CardTitle className="text-xs font-mono text-destructive flex items-center gap-2">
                     <AlertOctagon className="w-4 h-4" /> CRITICAL ALERTS
                   </CardTitle>
                 </CardHeader>
                 <CardContent className="p-4">
                    <div className="bg-black/40 rounded border border-destructive/20 p-2 text-[10px] text-white/80 font-mono">
                       <span className="text-destructive font-bold">ALRT:</span> Semantic drift in X-9 subspace detected. Automated realignment sequence triggered.
                    </div>
                 </CardContent>
              </Card>

              <div className="p-6 rounded-xl border border-white/10 bg-gradient-to-br from-primary/10 to-transparent flex flex-col items-center justify-center text-center group">
                 <div className="text-5xl font-display font-bold text-white tracking-tighter mb-1">
                   99.<span className="text-primary">92</span>
                 </div>
                 <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em]">Compliance Score</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Dialog open={!!selectedLog} onOpenChange={() => setSelectedLog(null)}>
        <DialogContent className="bg-black/95 border-primary/30 backdrop-blur-xl text-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display font-bold text-xl tracking-tight uppercase flex items-center gap-3">
              <Terminal className="w-6 h-6 text-primary" /> Event Diagnostics
            </DialogTitle>
            <DialogDescription className="font-mono text-[10px] text-muted-foreground border-b border-white/10 pb-4">
              TIMESTAMP: {selectedLog?.time} • ENTITY: {selectedLog?.id}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 p-4 rounded border border-white/10">
                <div className="text-[9px] font-mono text-muted-foreground uppercase mb-1">System Message</div>
                <div className="text-sm font-display text-white">{selectedLog?.msg}</div>
              </div>
              <div className="bg-white/5 p-4 rounded border border-white/10">
                <div className="text-[9px] font-mono text-muted-foreground uppercase mb-1">Classification</div>
                <div className="text-sm font-mono text-primary uppercase">{selectedLog?.category}</div>
              </div>
            </div>
            <div className="bg-white/5 p-4 rounded border border-white/10">
              <div className="text-[9px] font-mono text-muted-foreground uppercase mb-1">Payload Trace</div>
              <div className="text-sm font-mono text-white/70 italic leading-relaxed">
                "{selectedLog?.details || "No secondary payload identified for this neural event."}"
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button 
                onClick={() => setSelectedLog(null)}
                className="px-4 py-2 bg-primary text-primary-foreground font-display font-bold text-[10px] rounded uppercase tracking-widest hover:brightness-110 transition-all"
              >
                Close Diagnostic
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

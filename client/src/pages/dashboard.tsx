import { Navigation } from "@/components/layout/Navigation";
import { CharterLayer } from "@/components/governance/CharterLayer";
import { SynergyGraph } from "@/components/governance/SynergyGraph";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Activity, MessageSquare, AlertOctagon, Zap, Terminal, Code, Cpu, RefreshCw, Database, ChevronRight, Play, Settings2, Search } from "lucide-react";
import bgImage from "@assets/generated_images/abstract_neural_network_governance_background.png";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useSimulator } from "@/lib/store";

export default function Dashboard() {
  const { blitzStatus, activeModel, activeMode, logs, activeTokens, latency, setBlitzStatus, setActiveModel, setActiveMode, addLog, updateStats } = useSimulator();
  const [selectedLog, setSelectedLog] = useState<any>(null);
  const [search, setSearch] = useState("");
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
      ];
      const entry = messages[Math.floor(Math.random() * messages.length)];
      addLog({ msg: entry.m, details: entry.d, type: 'info', category: entry.c as any });
      updateStats(
        Math.max(800, activeTokens + Math.floor(Math.random() * 200) - 100),
        Math.floor(Math.random() * 25) + 5
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [activeTokens, addLog, updateStats]);

  const filteredLogs = logs.filter(l => 
    l.msg.toLowerCase().includes(search.toLowerCase()) || 
    l.details?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      <Navigation />
      <main className="md:pl-64 pt-16 md:pt-0 pb-24 md:pb-0 min-h-screen relative overflow-hidden">
        <div className="relative z-10 p-4 md:p-8 space-y-4 md:space-y-6">
          <header className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 border-b border-white/10 pb-4 md:pb-6">
            <div className="space-y-4">
              <h1 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight">
                NeuralBlitz <span className="text-primary">Control</span>
              </h1>
              <div className="flex flex-wrap gap-4">
                <div className="flex gap-1 bg-white/5 p-1 rounded-md border border-white/10">
                  {models.map(m => (
                    <button key={m} onClick={() => setActiveModel(m)} className={cn("px-2 py-1 rounded text-[10px] font-mono transition-all", activeModel === m ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-white")}>{m.split('-')[0]}</button>
                  ))}
                </div>
                <div className="flex gap-1 bg-white/5 p-1 rounded-md border border-white/10">
                  {modes.map(m => (
                    <button key={m} onClick={() => setActiveMode(m)} className={cn("px-2 py-1 rounded text-[10px] font-mono transition-all", activeMode === m ? "bg-secondary text-secondary-foreground" : "text-muted-foreground hover:text-white")}>{m}</button>
                  ))}
                </div>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-4 space-y-6">
              <CharterLayer />
              <Card className="bg-black/40 border-white/10">
                <CardHeader className="py-2 border-b border-white/10"><CardTitle className="text-xs font-mono">Simulator</CardTitle></CardHeader>
                <CardContent className="p-4"><button onClick={() => setBlitzStatus("BURST")} className="w-full bg-primary p-2 rounded text-xs font-bold">ACTIVATE BURST</button></CardContent>
              </Card>
            </div>
            
            <div className="col-span-12 md:col-span-8 space-y-6">
              <Card className="bg-black/40 border-white/10 flex flex-col h-[400px]">
                <CardHeader className="p-4 border-b border-white/10 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4" />
                    <span className="text-xs font-mono">Universal Stream</span>
                  </div>
                  <div className="relative">
                    <Search className="w-3 h-3 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search logs..." className="bg-white/5 border border-white/10 rounded px-7 py-1 text-[10px] focus:outline-none focus:border-primary w-40" />
                  </div>
                </CardHeader>
                <ScrollArea className="flex-1 p-2">
                  <AnimatePresence>
                    {filteredLogs.reverse().map(log => (
                      <button key={log.id} onClick={() => setSelectedLog(log)} className="w-full text-left p-1 text-[10px] font-mono hover:bg-white/5 flex gap-2 rounded">
                        <span className="text-muted-foreground shrink-0">[{log.time}]</span>
                        <span className={cn("shrink-0 uppercase", log.category === 'governance' ? 'text-primary' : 'text-secondary')}>{log.category}</span>
                        <span className="truncate">{log.msg}</span>
                      </button>
                    ))}
                  </AnimatePresence>
                </ScrollArea>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Dialog open={!!selectedLog} onOpenChange={() => setSelectedLog(null)}>
        <DialogContent className="bg-black border-primary/30 text-white">
          <DialogHeader><DialogTitle className="text-primary">{selectedLog?.msg}</DialogTitle></DialogHeader>
          <div className="p-4 bg-white/5 rounded font-mono text-sm">{selectedLog?.details}</div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

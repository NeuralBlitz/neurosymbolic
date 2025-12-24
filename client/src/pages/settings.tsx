import { Navigation } from "@/components/layout/Navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Settings, Shield, Lock, Bell, Cpu, Zap, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useSimulator } from "@/lib/store";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const settingsItems = [
  { id: "charter", title: "Charter Constraints", icon: Shield, desc: "Manage hard-coded axiomatic principles", status: "ENABLED" },
  { id: "privacy", title: "Privacy Protocols", icon: Lock, desc: "Differential privacy budget and masking", status: "STRICT" },
  { id: "risk", title: "Risk Thresholds", icon: Bell, desc: "Automated alert triggers for drift", status: "0.85 ALPHA" },
  { id: "synergy", title: "Synergy Tuning", icon: Cpu, desc: "NeuralBlitz quantum core parameters", status: "AUTO" },
];

export default function GovernanceConfig() {
  const { activeModel, setActiveModel, activeMode, setActiveMode } = useSimulator();
  const [search, setSearch] = useState("");

  const filtered = settingsItems.filter(s => 
    s.title.toLowerCase().includes(search.toLowerCase()) || 
    s.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      <Navigation />
      <main className="md:pl-64 pt-16 md:pt-0 pb-24 md:pb-0 min-h-screen relative">
        <div className="relative z-10 p-4 md:p-8 space-y-6">
          <header className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold text-white tracking-tight flex items-center gap-3">
                <Settings className="text-primary" /> Governance Configuration
              </h1>
              <p className="text-muted-foreground mt-2 max-w-2xl font-display text-sm">
                Control the 'Governance-as-Code' engine parameters.
              </p>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search config..." 
                className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-primary/50 transition-all w-full md:w-64"
              />
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-black/40 border-primary/20 col-span-full">
              <CardHeader className="py-3 px-4 border-b border-white/10">
                <CardTitle className="text-xs font-mono text-primary flex items-center gap-2">
                  <Cpu className="w-4 h-4" /> ENGINE RUNTIME SELECTORS
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-4">
                    <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Active Neural Core</label>
                    <div className="grid grid-cols-1 gap-2">
                       {["Synergy-v9.8-Quantum", "Aegis-v4-Stable", "Blitz-x1-Pro"].map(m => (
                         <button 
                           key={m}
                           onClick={() => { setActiveModel(m); toast.success(`Active Core: ${m}`); }}
                           className={cn(
                             "w-full text-left px-4 py-3 rounded border font-mono text-sm transition-all",
                             activeModel === m ? "bg-primary/10 border-primary text-primary" : "bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10"
                           )}
                         >
                           {m}
                         </button>
                       ))}
                    </div>
                 </div>
                 <div className="space-y-4">
                    <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Inference Mode</label>
                    <div className="grid grid-cols-1 gap-2">
                       {["Holistic", "Restricted", "Debug", "Burst"].map(m => (
                         <button 
                           key={m}
                           onClick={() => { setActiveMode(m); toast.success(`Inference Mode: ${m}`); }}
                           className={cn(
                             "w-full text-left px-4 py-3 rounded border font-mono text-sm transition-all",
                             activeMode === m ? "bg-secondary/10 border-secondary text-secondary" : "bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10"
                           )}
                         >
                           {m}
                         </button>
                       ))}
                    </div>
                 </div>
              </CardContent>
            </Card>

            {filtered.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="bg-black/40 border-white/10 hover:border-primary/30 transition-all group h-full">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                        <s.icon className="w-5 h-5" />
                      </div>
                      <CardTitle className="text-lg font-display text-white">{s.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{s.desc}</p>
                    <div className="mt-4 flex items-center justify-between">
                       <span className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                         {s.status}
                       </span>
                       <button className="text-[10px] font-mono text-white/50 hover:text-primary uppercase tracking-widest transition-colors">Configure</button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="sticky bottom-8 z-20">
            <Card className="bg-primary/10 border-primary/30 backdrop-blur-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xl">
              <div className="flex items-center gap-4">
                <Zap className="text-primary w-8 h-8 animate-pulse" />
                <div>
                  <h3 className="text-white font-display font-bold text-lg">Push Systemic Fusion</h3>
                  <p className="text-xs text-muted-foreground">Force synchronization across all active inference nodes globally.</p>
                </div>
              </div>
              <button 
                onClick={() => toast.success("SYSTEMIC FUSION DEPLOYED", { description: "All nodes synchronized." })}
                className="w-full md:w-auto bg-primary text-primary-foreground px-8 py-3 rounded font-display font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(0,255,255,0.3)]"
              >
                DEPLOY GLOBAL CONFIG
              </button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

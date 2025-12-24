import { Navigation } from "@/components/layout/Navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Settings, Shield, Lock, Bell, Cpu, Zap } from "lucide-react";
import { motion } from "framer-motion";

const settings = [
  { title: "Charter Constraints", icon: Shield, desc: "Manage hard-coded axiomatic principles", status: "ENABLED" },
  { title: "Privacy Protocols", icon: Lock, desc: "Differential privacy budget and masking", status: "STRICT" },
  { title: "Risk Thresholds", icon: Bell, desc: "Automated alert triggers for drift", status: "0.85 ALPHA" },
  { title: "Synergy Tuning", icon: Cpu, desc: "NeuralBlitz quantum core parameters", status: "AUTO" },
];

export default function GovernanceConfig() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      <Navigation />
      <main className="md:pl-64 pt-16 md:pt-0 pb-24 md:pb-0 min-h-screen relative">
        <div className="relative z-10 p-4 md:p-8 space-y-6">
          <header className="border-b border-white/10 pb-6">
            <h1 className="text-3xl font-display font-bold text-white tracking-tight flex items-center gap-3">
              <Settings className="text-primary" /> Governance Configuration
            </h1>
            <p className="text-muted-foreground mt-2 max-w-2xl font-display">
              Define the 'Governance-as-Code' paradigm and real-time feedback loops.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {settings.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="bg-black/40 border-white/10 hover:border-primary/30 transition-all group">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                        <s.icon className="w-5 h-5" />
                      </div>
                      <CardTitle className="text-lg font-display text-white">{s.title}</CardTitle>
                    </div>
                    <span className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                      {s.status}
                    </span>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{s.desc}</p>
                    <div className="mt-4 flex gap-2">
                       <button className="text-[10px] font-mono text-white/50 hover:text-primary uppercase tracking-widest transition-colors">Configure</button>
                       <span className="text-white/10">|</span>
                       <button className="text-[10px] font-mono text-white/50 hover:text-destructive uppercase tracking-widest transition-colors">Reset</button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <Card className="bg-primary/5 border-primary/20 p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Zap className="text-primary w-8 h-8" />
              <div>
                <h3 className="text-white font-display font-bold">Apply Systemic Fusion</h3>
                <p className="text-xs text-muted-foreground">Synchronize all governance gates across active inference nodes.</p>
              </div>
            </div>
            <button className="bg-primary text-primary-foreground px-6 py-2 rounded font-display font-bold text-sm hover:brightness-110 active:scale-95 transition-all">
              DEPLOY CONFIG
            </button>
          </Card>
        </div>
      </main>
    </div>
  );
}

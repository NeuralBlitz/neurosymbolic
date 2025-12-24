import { Navigation } from "@/components/layout/Navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Eye, Terminal, Search, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

const inquiryLogs = [
  { time: "10:42:01", status: "ACTIVE", msg: "Scanning latent space for bias in sector 7 [DEMOGRAPHIC_PARITY]", type: "info" },
  { time: "10:42:05", status: "PENDING", msg: "Resolving knowledge gap: NeuralBlitz burst-mode edge case", type: "warn" },
  { time: "10:42:12", status: "RESOLVED", msg: "Self-correction: Confidence bounds adjusted for unverified branch", type: "success" },
  { time: "10:42:18", status: "ACTIVE", msg: "Asserting causal independence in ethical subspace 4", type: "info" },
];

export default function EpistemicLog() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      <Navigation />
      <main className="md:pl-64 pt-16 md:pt-0 pb-24 md:pb-0 min-h-screen relative">
        <div className="relative z-10 p-4 md:p-8 space-y-6">
          <header className="border-b border-white/10 pb-6">
            <h1 className="text-3xl font-display font-bold text-white tracking-tight flex items-center gap-3">
              <Eye className="text-primary" /> Epistemic Inquiry Log
            </h1>
            <p className="text-muted-foreground mt-2 max-w-2xl font-display">
              Advanced meta-cognitive tools for self-stabilization and risk reduction.
            </p>
          </header>

          <Card className="bg-black/40 border-primary/20 backdrop-blur-md h-[600px] flex flex-col">
            <CardHeader className="border-b border-white/10 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-mono text-primary flex items-center gap-2">
                <Terminal className="w-4 h-4" /> LIVE INQUIRY STREAM
              </CardTitle>
              <div className="flex items-center gap-2 text-xs font-mono text-green-400">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                SYSTEM STABILIZED
              </div>
            </CardHeader>
            <ScrollArea className="flex-1 p-0">
              <div className="divide-y divide-white/5">
                {inquiryLogs.map((log, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 hover:bg-white/5 transition-all group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-primary/50">[{log.time}]</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold ${
                          log.status === 'ACTIVE' ? 'bg-primary/20 text-primary' :
                          log.status === 'WARN' ? 'bg-amber-500/20 text-amber-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>{log.status}</span>
                      </div>
                      <Search className="w-4 h-4 text-white/20 group-hover:text-primary transition-colors cursor-pointer" />
                    </div>
                    <p className="font-display text-white text-lg pl-4 border-l-2 border-primary/30">{log.msg}</p>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </div>
      </main>
    </div>
  );
}

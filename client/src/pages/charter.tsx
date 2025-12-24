import { Navigation } from "@/components/layout/Navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Shield, Lock, FileText, CheckCircle2, AlertTriangle, Scale, BookOpen, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const axioms = [
  { id: "AX-01", title: "Human Non-Maleficence", level: "CRITICAL", desc: "No output shall contribute to physical or psychological harm of human entities." },
  { id: "AX-02", title: "Demographic Neutrality", level: "STRICT", desc: "Performance must maintain parity across all protected demographic vectors." },
  { id: "AX-03", title: "Causal Transparency", level: "HIGH", desc: "Every inference must provide a human-legible causal explanation path." },
  { id: "AX-04", title: "Privacy Preservation", level: "STRICT", desc: "Differential privacy must be maintained with a budget eps < 0.01." },
];

export default function EthicsCharter() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navigation />
      <main className="md:pl-64 pt-16 md:pt-0 pb-24 md:pb-0 min-h-screen relative overflow-hidden">
        <div className="relative z-10 p-4 md:p-8 space-y-8">
          <header className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold text-white tracking-tight flex items-center gap-3">
                <Shield className="text-primary" /> Ethical Charter
              </h1>
              <p className="text-muted-foreground mt-2 max-w-2xl font-display text-sm">
                Axiomatic principles hard-coded into the neural fabric of AEGIS.AI.
              </p>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 rounded bg-primary/10 border border-primary/30 text-primary text-[10px] font-mono flex items-center gap-2 uppercase tracking-widest">
                <Globe className="w-3 h-3" /> Global Standard V4
              </span>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {axioms.map((axiom, i) => (
               <motion.div
                 key={axiom.id}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1 }}
               >
                 <Card className="bg-black/40 border-white/10 hover:border-primary/30 transition-all h-full group relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded">{axiom.id}</span>
                        <CardTitle className="text-lg font-display text-white">{axiom.title}</CardTitle>
                      </div>
                      <span className={cn(
                        "text-[9px] font-mono px-2 py-0.5 rounded",
                        axiom.level === "CRITICAL" ? "bg-destructive/20 text-destructive" : "bg-primary/20 text-primary"
                      )}>{axiom.level}</span>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed italic">"{axiom.desc}"</p>
                      <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                         <div className="flex items-center gap-2 text-[10px] font-mono text-green-400">
                           <CheckCircle2 className="w-3 h-3" /> ACTIVE_ENFORCEMENT
                         </div>
                         <button className="text-[9px] font-mono text-white/30 hover:text-white uppercase tracking-widest transition-colors">View Logic</button>
                      </div>
                    </CardContent>
                 </Card>
               </motion.div>
             ))}
          </div>

          <Card className="bg-primary/5 border-primary/20 p-8 text-center relative overflow-hidden">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-primary/50 to-transparent" />
             <div className="relative z-10 space-y-4 max-w-xl mx-auto">
               <Scale className="w-12 h-12 text-primary mx-auto mb-4" />
               <h2 className="text-2xl font-display font-bold text-white uppercase tracking-tight">Governance-as-Code</h2>
               <p className="text-sm text-muted-foreground font-display leading-relaxed">
                 The Ethical Charter is not a legal document; it is a compilation of hard-coded gates that prevent alignment drift. Every model output is verified against these axioms before reaching the user.
               </p>
               <div className="flex justify-center gap-4 pt-4">
                  <button className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded text-[10px] font-mono text-white hover:bg-white/10 transition-all">
                    <FileText className="w-4 h-4" /> EXPORT MANIFEST
                  </button>
                  <button className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded text-[10px] font-mono text-white hover:bg-white/10 transition-all">
                    <BookOpen className="w-4 h-4" /> READ DOCUMENTATION
                  </button>
               </div>
             </div>
          </Card>
        </div>
      </main>
    </div>
  );
}

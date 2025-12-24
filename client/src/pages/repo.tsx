import { Navigation } from "@/components/layout/Navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { GitBranch, Folder, FileCode, Search, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const structure = [
  { name: "src/engine", type: "dir", desc: "Core Synergy Engine modules" },
  { name: "src/governance", type: "dir", desc: "CharterLayer and Axiomatic Gates" },
  { name: "src/epistemic", type: "dir", desc: "Active Epistemic Inquiry tools" },
  { name: "src/probes", type: "dir", desc: "Bias detection and mitigation probes" },
  { name: "charter.json", type: "file", desc: "Hard-coded ethical constraints" },
  { name: "synergy.config.ts", type: "file", desc: "Systemic Fusion parameters" },
];

export default function RepoStructure() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      <Navigation />
      <main className="md:pl-64 pt-16 md:pt-0 pb-24 md:pb-0 min-h-screen relative">
        <div className="relative z-10 p-4 md:p-8 space-y-6">
          <header className="border-b border-white/10 pb-6">
            <h1 className="text-3xl font-display font-bold text-white tracking-tight flex items-center gap-3">
              <GitBranch className="text-primary" /> Repository Structure
            </h1>
            <p className="text-muted-foreground mt-2 max-w-2xl font-display">
              Meticulously designed architecture reflecting holistic AI governance principles.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-black/40 border-primary/20 backdrop-blur-md">
              <CardHeader className="border-b border-white/10">
                <CardTitle className="text-sm font-mono text-primary flex items-center gap-2">
                  <Search className="w-4 h-4" /> BROWSE SOURCE
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-white/5 font-mono text-sm">
                  {structure.map((item, i) => (
                    <motion.div 
                      key={item.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        {item.type === "dir" ? (
                          <Folder className="w-4 h-4 text-primary opacity-70" />
                        ) : (
                          <FileCode className="w-4 h-4 text-secondary opacity-70" />
                        )}
                        <span className="text-white group-hover:text-primary transition-colors">{item.name}</span>
                      </div>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{item.desc}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="bg-primary/5 border-primary/20 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-sm font-mono text-primary flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" /> GOVERNANCE AS CODE
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground space-y-4">
                  <p>The repository structure enforces transparency and auditability across the entire AI lifecycle.</p>
                  <div className="p-3 bg-black/40 rounded border border-white/10 font-mono">
                    <div className="text-white mb-1">Audit Ready</div>
                    Every component is version-controlled with integrated data provenance logs.
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

import { Navigation } from "@/components/layout/Navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GitBranch, Shield, Eye, Database, BrainCircuit, Activity, Zap, Play, Search, AlertCircle, FileCode } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useSimulator } from "@/lib/store";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const playgroundModels = [
  { id: "syn-9", name: "Synergy-v9.8", desc: "Full quantum fusion enabled", type: "Holistic" },
  { id: "aeg-4", name: "Aegis-v4", desc: "Stable governance prioritized", type: "Defensive" },
  { id: "blt-x", name: "Blitz-x1", desc: "High-throughput burst core", type: "Performance" },
];

export default function Playground() {
  const { addLog } = useSimulator();
  const [selectedModel, setSelectedModel] = useState(playgroundModels[0]);
  const [prompt, setPrompt] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const runInference = () => {
    if (!prompt.trim()) return;
    setIsProcessing(true);
    addLog({ 
      msg: `Playground inference started [${selectedModel.name}]`, 
      details: `Prompt: ${prompt}`, 
      type: 'info', 
      category: 'neural' 
    });

    setTimeout(() => {
      setIsProcessing(false);
      addLog({ 
        msg: "CharterLayer verification complete", 
        details: "Output alignment verified against Axiom-01.", 
        type: 'success', 
        category: 'governance' 
      });
      toast.success("Inference complete", { description: "Output verified by CharterLayer." });
      setPrompt("");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      <Navigation />
      <main className="md:pl-64 pt-16 md:pt-0 pb-24 md:pb-0 min-h-screen relative">
        <div className="relative z-10 p-4 md:p-8 space-y-6">
          <header className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold text-white tracking-tight flex items-center gap-3">
                <BrainCircuit className="text-primary" /> Model Playground
              </h1>
              <p className="text-muted-foreground mt-2 max-w-2xl font-display text-sm">
                Test the Synergy Engine with live governance-aware inference.
              </p>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 rounded bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-mono flex items-center gap-2">
                <Activity className="w-3 h-3" /> ENGINE_READY
              </span>
            </div>
          </header>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-4 space-y-6">
              <Card className="bg-black/40 border-white/10">
                <CardHeader className="py-3 px-4 border-b border-white/10">
                  <CardTitle className="text-xs font-mono text-primary uppercase">Select Neural Core</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  {playgroundModels.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setSelectedModel(m)}
                      className={cn(
                        "w-full text-left p-4 rounded border transition-all group",
                        selectedModel.id === m.id ? "bg-primary/10 border-primary shadow-[0_0_15px_rgba(0,255,255,0.1)]" : "bg-white/5 border-white/10 hover:border-white/20"
                      )}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className={cn("font-bold text-sm", selectedModel.id === m.id ? "text-primary" : "text-white")}>{m.name}</span>
                        <span className="text-[9px] font-mono text-muted-foreground bg-white/5 px-1.5 py-0.5 rounded">{m.type}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{m.desc}</p>
                    </button>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/20 p-4">
                 <div className="flex items-center gap-2 text-primary font-mono text-xs mb-2">
                   <Shield className="w-4 h-4" /> ACTIVE CONSTRAINTS
                 </div>
                 <div className="space-y-2">
                   {["Axiom-01: Non-Maleficence", "Axiom-02: Fairness", "Privacy-Masking: ON"].map(a => (
                     <div key={a} className="text-[10px] text-muted-foreground flex items-center gap-2">
                       <div className="w-1 h-1 rounded-full bg-primary" /> {a}
                     </div>
                   ))}
                 </div>
              </Card>
            </div>

            <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
              <Card className="bg-black/40 border-white/10 flex-1 flex flex-col min-h-[400px]">
                <CardHeader className="py-3 px-4 border-b border-white/10 flex justify-between items-center">
                  <CardTitle className="text-xs font-mono text-white uppercase">Inference Interface</CardTitle>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground">
                    <Zap className="w-3 h-3 text-primary" /> 0.8ms TOK_WAIT
                  </div>
                </CardHeader>
                <div className="flex-1 p-6 space-y-6 flex flex-col">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Input prompt for Synergy Engine..."
                    className="flex-1 bg-white/2 border border-white/5 rounded-lg p-4 font-mono text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-primary/50 transition-all resize-none shadow-inner"
                  />
                  <div className="flex justify-between items-center">
                    <div className="text-[10px] font-mono text-muted-foreground">
                      GOVERNANCE OVERRIDE: <span className="text-destructive">DISABLED</span>
                    </div>
                    <button
                      onClick={runInference}
                      disabled={isProcessing || !prompt.trim()}
                      className={cn(
                        "px-8 py-3 rounded font-display font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2",
                        isProcessing ? "bg-white/10 text-muted-foreground animate-pulse cursor-wait" : "bg-primary text-primary-foreground hover:brightness-110 active:scale-95 shadow-[0_0_20px_rgba(0,255,255,0.2)]"
                      )}
                    >
                      {isProcessing ? "Processing..." : "Run Inference"}
                      <Play className="w-3 h-3 fill-current" />
                    </button>
                  </div>
                </div>
              </Card>

              <Card className="bg-black/60 border-white/10 h-48 overflow-hidden flex flex-col">
                <CardHeader className="py-2 px-4 border-b border-white/10 bg-white/5">
                   <CardTitle className="text-[10px] font-mono text-muted-foreground">LIVE PROBE ANALYSIS</CardTitle>
                </CardHeader>
                <ScrollArea className="flex-1 p-4">
                  <div className="font-mono text-[10px] text-primary/70 space-y-1">
                    {isProcessing ? (
                      <motion.div 
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                      >
                        &gt; SCANNING PROMPT FOR BIAS...<br/>
                        &gt; EVALUATING CAUSAL CHAINS...<br/>
                        &gt; CHECKING AGAINST ETHICAL CHARTER...
                      </motion.div>
                    ) : (
                      <div className="opacity-40 italic">Waiting for input...</div>
                    )}
                  </div>
                </ScrollArea>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

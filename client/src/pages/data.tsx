import { Navigation } from "@/components/layout/Navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Database, Search, ShieldCheck, History } from "lucide-react";
import { motion } from "framer-motion";

const provenanceData = [
  { hash: "0x4f...92e1", source: "Training Corpus A", type: "DATASET", timestamp: "2025-12-24 10:45:00" },
  { hash: "0x7a...11b2", source: "Human Feedback Loop 4", type: "ALIGNMENT", timestamp: "2025-12-24 10:48:22" },
  { hash: "0x2c...dd54", source: "Synergy Engine Core", type: "MODEL_WEIGHTS", timestamp: "2025-12-24 10:52:10" },
];

export default function DataProvenance() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      <Navigation />
      <main className="md:pl-64 pt-16 md:pt-0 pb-24 md:pb-0 min-h-screen relative">
        <div className="relative z-10 p-4 md:p-8 space-y-6">
          <header className="border-b border-white/10 pb-6">
            <h1 className="text-3xl font-display font-bold text-white tracking-tight flex items-center gap-3">
              <Database className="text-primary" /> Data Provenance
            </h1>
            <p className="text-muted-foreground mt-2 max-w-2xl font-display">
              End-to-end traceability for every component in the AI lifecycle.
            </p>
          </header>

          <Card className="bg-black/40 border-primary/20 backdrop-blur-md">
            <CardHeader className="border-b border-white/10 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-mono text-primary flex items-center gap-2">
                <History className="w-4 h-4" /> TRACEABILITY LOGS
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Filter by hash..." 
                  className="bg-white/5 border border-white/10 rounded-full py-1.5 pl-9 pr-4 text-xs font-mono focus:outline-none focus:border-primary/50 transition-all"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs">
                  <thead>
                    <tr className="border-b border-white/5 text-muted-foreground uppercase tracking-widest bg-white/2">
                      <th className="p-4 font-medium">Hash</th>
                      <th className="p-4 font-medium">Source Origin</th>
                      <th className="p-4 font-medium">Type</th>
                      <th className="p-4 font-medium">Timestamp</th>
                      <th className="p-4 font-medium text-right">Verification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {provenanceData.map((data, i) => (
                      <motion.tr 
                        key={data.hash}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="hover:bg-white/5 transition-colors group"
                      >
                        <td className="p-4 text-primary">{data.hash}</td>
                        <td className="p-4 text-white opacity-80">{data.source}</td>
                        <td className="p-4">
                           <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[10px]">
                             {data.type}
                           </span>
                        </td>
                        <td className="p-4 text-muted-foreground">{data.timestamp}</td>
                        <td className="p-4 text-right">
                           <ShieldCheck className="w-4 h-4 text-green-400 inline" />
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

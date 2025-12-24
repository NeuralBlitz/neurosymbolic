import { Navigation } from "@/components/layout/Navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Eye, Terminal, Search } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSimulator } from "@/lib/store";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function EpistemicLog() {
  const { logs } = useSimulator();
  const [search, setSearch] = useState("");
  const [selectedLog, setSelectedLog] = useState<any>(null);
  
  const epistemicLogs = logs.filter(l => l.category === 'epistemic' || l.category === 'neural');
  const filtered = epistemicLogs.filter(l => l.msg.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navigation />
      <main className="md:pl-64 pt-16 md:pt-0 pb-24 md:pb-0 min-h-screen relative">
        <div className="p-4 md:p-8 space-y-6">
          <header className="border-b border-white/10 pb-6 flex justify-between items-end">
            <h1 className="text-3xl font-display font-bold text-white flex items-center gap-3"><Eye className="text-primary" /> Epistemic Inquiry</h1>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Filter inquiries..." className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-primary" />
            </div>
          </header>

          <Card className="bg-black/40 border-white/10 h-[600px] flex flex-col">
            <ScrollArea className="flex-1">
              <div className="divide-y divide-white/5">
                {filtered.reverse().map((log, i) => (
                  <button key={log.id} onClick={() => setSelectedLog(log)} className="w-full text-left p-6 hover:bg-white/5 transition-all">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-xs text-primary/50">[{log.time}]</span>
                    </div>
                    <p className="font-display text-white text-lg pl-4 border-l-2 border-primary/30">{log.msg}</p>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </div>
      </main>
      <Dialog open={!!selectedLog} onOpenChange={() => setSelectedLog(null)}>
        <DialogContent className="bg-black border-primary/30 text-white">
          <DialogHeader><DialogTitle className="text-primary">Inquiry Detail</DialogTitle></DialogHeader>
          <div className="p-4 bg-white/5 rounded font-mono text-sm">{selectedLog?.details}</div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

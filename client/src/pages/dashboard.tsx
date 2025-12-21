import { AppSidebar } from "@/components/layout/AppSidebar";
import { CharterLayer } from "@/components/governance/CharterLayer";
import { SynergyGraph } from "@/components/governance/SynergyGraph";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Activity, MessageSquare, AlertOctagon } from "lucide-react";
import bgImage from "@assets/generated_images/abstract_neural_network_governance_background.png";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      <AppSidebar />
      
      <main className="pl-64 min-h-screen relative">
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 z-0 opacity-40 pointer-events-none"
          style={{ 
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            mixBlendMode: 'screen' 
          }}
        />

        <div className="relative z-10 p-8 space-y-6">
          <header className="flex items-end justify-between border-b border-white/10 pb-6">
            <div>
              <h1 className="text-3xl font-display font-bold text-white tracking-tight">
                System Overview
              </h1>
              <p className="text-muted-foreground mt-2 max-w-2xl">
                Real-time monitoring of Holistic Neural Architecture with integrated ethical governance modules.
              </p>
            </div>
            <div className="text-right">
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">
                Current State
              </div>
              <div className="flex items-center gap-2 text-green-400 font-mono font-bold">
                <Activity className="w-4 h-4" />
                OPERATIONAL
              </div>
            </div>
          </header>

          <div className="grid grid-cols-12 gap-6 h-[600px]">
            {/* Left Column: Charter Layer (Governance) */}
            <div className="col-span-4 h-full">
              <CharterLayer />
            </div>

            {/* Middle Column: Synergy Engine (Visualization) */}
            <div className="col-span-5 flex flex-col gap-6 h-full">
               <Card className="flex-1 bg-black/40 border-primary/20 backdrop-blur-md overflow-hidden flex flex-col">
                 <CardHeader className="py-3 px-4 border-b border-white/10">
                   <CardTitle className="text-sm font-mono text-primary flex items-center gap-2">
                     <Activity className="w-4 h-4" />
                     SYNERGY ENGINE VISUALIZATION
                   </CardTitle>
                 </CardHeader>
                 <div className="flex-1 p-4">
                   <SynergyGraph />
                 </div>
               </Card>

               <Card className="h-1/3 bg-black/40 border-white/10 backdrop-blur-md">
                 <CardHeader className="py-3 px-4 border-b border-white/10">
                   <CardTitle className="text-sm font-mono text-white flex items-center gap-2">
                     <MessageSquare className="w-4 h-4" />
                     ACTIVE EPISTEMIC INQUIRY
                   </CardTitle>
                 </CardHeader>
                 <ScrollArea className="h-full p-4">
                   <div className="space-y-3">
                     {[
                       "Querying latent space for bias in sector 7...",
                       "Self-correction: Reducing confidence in unverified branch.",
                       "Simulating counter-factuals for ethical alignment check.",
                       "Updating causal model based on new evidence."
                     ].map((log, i) => (
                       <div key={i} className="flex gap-2 text-sm font-mono text-muted-foreground">
                         <span className="text-primary opacity-50">[{new Date().toLocaleTimeString()}]</span>
                         <span>{log}</span>
                       </div>
                     ))}
                   </div>
                 </ScrollArea>
               </Card>
            </div>

            {/* Right Column: Alerts & Metrics */}
            <div className="col-span-3 h-full flex flex-col gap-4">
              <Card className="bg-destructive/10 border-destructive/30 backdrop-blur-md">
                 <CardHeader className="py-3 px-4 border-b border-destructive/20">
                   <CardTitle className="text-sm font-mono text-destructive flex items-center gap-2">
                     <AlertOctagon className="w-4 h-4" />
                     RISK ALERTS
                   </CardTitle>
                 </CardHeader>
                 <CardContent className="p-4 space-y-2">
                   <div className="p-2 bg-black/40 rounded border border-destructive/20 text-xs text-white">
                     Drift detected in Module X-9
                   </div>
                 </CardContent>
              </Card>

              <div className="flex-1 rounded-lg border border-dashed border-white/10 p-4 flex items-center justify-center text-center">
                <div className="space-y-2">
                  <div className="text-4xl font-display font-bold text-white">99.9%</div>
                  <div className="text-xs font-mono text-muted-foreground uppercase">
                    Ethical Compliance Score
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

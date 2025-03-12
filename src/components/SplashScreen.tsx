
import { Wifi } from "lucide-react";

export function SplashScreen() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl" />
        <div className="animate-pulse relative">
          <div className="glass-card p-6 rounded-full mb-6">
            <Wifi className="w-16 h-16 text-white" />
          </div>
        </div>
      </div>
      <h1 className="text-3xl font-bold text-gradient mb-2 fade-in-up">Report It</h1>
      <p className="text-muted-foreground text-center max-w-xs fade-in-up" style={{ animationDelay: '0.2s' }}>
        Connecting citizens with solutions
      </p>
    </div>
  );
}


import { Wifi } from "lucide-react";

export function SplashScreen() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="animate-pulse">
        <div className="bg-blue-500 text-white p-6 rounded-full mb-6 shadow-lg">
          <Wifi className="w-16 h-16" />
        </div>
      </div>
      <h1 className="text-3xl font-bold text-blue-800 mb-2">Report It</h1>
      <p className="text-blue-600 text-center max-w-xs">
        Connecting citizens with solutions
      </p>
    </div>
  );
}

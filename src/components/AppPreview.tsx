
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone } from "lucide-react";

interface AppPreviewProps {
  url: string;
  appName: string;
}

export function AppPreview({ url, appName }: AppPreviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Smartphone className="h-4 w-4" />
          App Preview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="relative border-8 border-gray-800 rounded-3xl overflow-hidden w-48 h-80 bg-white">
            {/* Status bar */}
            <div className="absolute top-0 left-0 right-0 h-5 bg-gray-900 flex items-center justify-between px-3">
              <div className="w-10 h-1.5 bg-gray-700 rounded-full"></div>
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 bg-gray-700 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-gray-700 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-gray-700 rounded-full"></div>
              </div>
            </div>
            
            {/* App header */}
            <div className="mt-5 bg-blue-600 text-white px-3 py-2 text-xs font-medium">
              {appName || "Android App Preview"}
            </div>
            
            {/* App content */}
            <div className="p-2 h-full">
              {url ? (
                <div className="text-xs text-center">
                  <div className="w-full h-32 bg-gray-100 mb-2 flex items-center justify-center">
                    <span className="text-gray-400">Website Preview</span>
                  </div>
                  <p className="text-gray-600 truncate">{url}</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center text-xs text-gray-400">
                  <p>Enter a website URL</p>
                  <p>to see a preview</p>
                </div>
              )}
            </div>
            
            {/* Navigation bar */}
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gray-100 flex items-center justify-around px-4">
              <div className="w-6 h-6 rounded-full bg-gray-300"></div>
              <div className="w-10 h-2 rounded-full bg-gray-300"></div>
              <div className="w-6 h-6 rounded-full bg-gray-300"></div>
            </div>
          </div>
          
          <div className="mt-6 text-xs text-gray-500 text-center">
            <p>This is a simplified preview.</p>
            <p>Actual app appearance may vary.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

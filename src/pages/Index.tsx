
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Steps } from "@/components/Steps";
import { AppPreview } from "@/components/AppPreview";
import { toast } from "sonner";
import { MobileIcon, Globe, Settings, Package } from "lucide-react";

const Index = () => {
  const [url, setUrl] = useState("");
  const [appName, setAppName] = useState("");
  const [packageName, setPackageName] = useState("com.example.app");
  const [currentStep, setCurrentStep] = useState(1);
  
  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      toast.error("Please enter a website URL");
      return;
    }
    
    // Basic URL validation
    try {
      new URL(url);
      setCurrentStep(2);
      toast.success("Website URL validated successfully!");
    } catch (error) {
      toast.error("Please enter a valid URL");
    }
  };
  
  const handleCreateApp = () => {
    if (!appName) {
      toast.error("Please enter an app name");
      return;
    }
    
    if (!packageName.match(/^[a-z][a-z0-9_]*(\.[a-z0-9_]+)+[0-9a-z_]$/i)) {
      toast.error("Please enter a valid package name (e.g., com.example.myapp)");
      return;
    }
    
    toast.success("App configuration saved successfully!");
    setCurrentStep(3);
  };
  
  const handleGenerateApp = () => {
    toast.loading("Generating your Android app...");
    
    // Simulate app generation with a timeout
    setTimeout(() => {
      toast.dismiss();
      toast.success("Android app generated successfully! 🎉");
      setCurrentStep(4);
    }, 3000);
  };

  return (
    <div className="container py-8 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
          Site to Android Wizard
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Transform any website into a native Android application in minutes
        </p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-[1fr_300px]">
        <div>
          <Steps currentStep={currentStep} />
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>
                {currentStep === 1 && "Step 1: Enter Website URL"}
                {currentStep === 2 && "Step 2: Configure App Details"}
                {currentStep === 3 && "Step 3: Generate Android App"}
                {currentStep === 4 && "Success! Your App is Ready"}
              </CardTitle>
              <CardDescription>
                {currentStep === 1 && "Provide the URL of the website you want to convert"}
                {currentStep === 2 && "Customize your Android application settings"}
                {currentStep === 3 && "Review your settings and generate the app"}
                {currentStep === 4 && "Your Android app has been generated successfully"}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {currentStep === 1 && (
                <form onSubmit={handleUrlSubmit}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="url">Website URL</Label>
                      <div className="flex space-x-2">
                        <Input 
                          id="url" 
                          placeholder="https://example.com" 
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                        />
                        <Button type="submit">Validate</Button>
                      </div>
                    </div>
                  </div>
                </form>
              )}
              
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="appName">App Name</Label>
                    <Input 
                      id="appName" 
                      placeholder="My Web App" 
                      value={appName}
                      onChange={(e) => setAppName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="packageName">Package Name</Label>
                    <Input 
                      id="packageName" 
                      placeholder="com.example.app" 
                      value={packageName}
                      onChange={(e) => setPackageName(e.target.value)}
                    />
                    <p className="text-sm text-gray-500">
                      Must be in format: com.example.app
                    </p>
                  </div>
                  
                  <Tabs defaultValue="basic">
                    <TabsList className="grid grid-cols-2">
                      <TabsTrigger value="basic">Basic</TabsTrigger>
                      <TabsTrigger value="advanced">Advanced</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="basic" className="space-y-4 pt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Globe className="w-5 h-5" />
                          <span>Allow offline access</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="offline" className="rounded" />
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Settings className="w-5 h-5" />
                          <span>Landscape mode</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="landscape" className="rounded" />
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="advanced" className="space-y-4 pt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Package className="w-5 h-5" />
                          <span>Enable deep linking</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="deeplink" className="rounded" />
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <MobileIcon className="w-5 h-5" />
                          <span>Native transitions</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="transitions" className="rounded" checked />
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              )}
              
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Configuration Summary</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-gray-600">Website URL:</div>
                      <div className="font-medium">{url}</div>
                      
                      <div className="text-gray-600">App Name:</div>
                      <div className="font-medium">{appName}</div>
                      
                      <div className="text-gray-600">Package Name:</div>
                      <div className="font-medium">{packageName}</div>
                    </div>
                  </div>
                  
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Next Steps</h3>
                    <p className="text-sm">
                      After generating, you'll need to:
                    </p>
                    <ol className="list-decimal list-inside text-sm mt-2 space-y-1">
                      <li>Download the generated project</li>
                      <li>Open it with Android Studio</li>
                      <li>Build and run on your device or emulator</li>
                    </ol>
                  </div>
                </div>
              )}
              
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-lg font-medium mb-2">Android App Created!</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Your Android app has been generated and is ready for use.
                    </p>
                    <Button variant="outline">Download Project (.zip)</Button>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Usage Instructions</h3>
                    <ol className="list-decimal list-inside text-sm mt-2 space-y-1">
                      <li>Extract the downloaded project</li>
                      <li>Open Android Studio and select "Open an existing project"</li>
                      <li>Navigate to the extracted folder and select it</li>
                      <li>Wait for Gradle to sync the project</li>
                      <li>Click Run to deploy to your device or emulator</li>
                    </ol>
                  </div>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex justify-between">
              {currentStep > 1 && (
                <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                  Back
                </Button>
              )}
              
              {currentStep === 1 && (
                <Button className="ml-auto" onClick={handleUrlSubmit}>
                  Next: Configure App
                </Button>
              )}
              
              {currentStep === 2 && (
                <Button className="ml-auto" onClick={handleCreateApp}>
                  Next: Generate App
                </Button>
              )}
              
              {currentStep === 3 && (
                <Button className="ml-auto" onClick={handleGenerateApp}>
                  Generate Android App
                </Button>
              )}
              
              {currentStep === 4 && (
                <Button className="ml-auto" variant="outline" onClick={() => setCurrentStep(1)}>
                  Create Another App
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
        
        <div>
          <AppPreview url={url} appName={appName} />
        </div>
      </div>
    </div>
  );
};

export default Index;

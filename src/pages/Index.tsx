
import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Wifi, ThumbsUp, Filter, MessageCircle, Users, Star, Plus } from "lucide-react";
import { IssueFeed } from "@/components/IssueFeed";
import { SplashScreen } from "@/components/SplashScreen";
import { IssueType } from "@/types/issue";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [selectedTab, setSelectedTab] = useState("issues");
  const [filter, setFilter] = useState("all");
  const [issues, setIssues] = useState<IssueType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading issues from an API
  useEffect(() => {
    const loadIssues = async () => {
      // Show splash screen for 2 seconds
      setTimeout(() => {
        setShowSplash(false);
      }, 2000);

      // Simulate API fetch delay
      setTimeout(() => {
        const mockIssues: IssueType[] = [
          {
            id: "1",
            title: "Pothole on Main Street",
            description: "Large pothole causing traffic and vehicle damage",
            caseNumber: "RD-2023-001",
            category: "Roads",
            status: "ongoing",
            upvotes: 24,
            image: "/placeholder.svg",
            location: "Main St & 5th Ave",
            reportedDate: "2023-05-15",
            comments: [
              { id: "c1", user: "Jane Smith", text: "This has been an issue for months!", date: "2023-05-16" },
              { id: "c2", user: "John Doe", text: "My car was damaged because of this", date: "2023-05-17" }
            ]
          },
          {
            id: "2",
            title: "Broken Water Pipeline",
            description: "Water pipeline leakage causing water wastage and road damage",
            caseNumber: "WS-2023-042",
            category: "Water Supply",
            status: "pending",
            upvotes: 36,
            image: "/placeholder.svg",
            location: "Oak Avenue",
            reportedDate: "2023-05-10",
            comments: [
              { id: "c3", user: "Alice Johnson", text: "Water pressure is very low in the area", date: "2023-05-11" }
            ]
          },
          {
            id: "3",
            title: "Street Light Not Working",
            description: "5 consecutive street lights not working causing safety concerns",
            caseNumber: "EL-2023-078",
            category: "Electricity",
            status: "resolved",
            upvotes: 15,
            image: "/placeholder.svg",
            location: "Pine Street",
            reportedDate: "2023-05-01",
            comments: [
              { id: "c4", user: "Bob Wilson", text: "Thank you for fixing this quickly!", date: "2023-05-08" }
            ]
          }
        ];
        
        setIssues(mockIssues);
        setIsLoading(false);
      }, 2500);
    };

    loadIssues();
  }, []);

  const handleUpvote = (id: string) => {
    setIssues(prevIssues => 
      prevIssues.map(issue => 
        issue.id === id ? { ...issue, upvotes: issue.upvotes + 1 } : issue
      )
    );
    toast.success("Issue upvoted!");
  };

  const handleFilterChange = (category: string) => {
    setFilter(category);
  };

  const handleAddIssue = () => {
    toast.info("New issue reporting will be available soon!");
  };

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <div className="container max-w-md mx-auto py-4 px-4">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="bg-blue-500 text-white p-2 rounded-full mr-2">
            <Wifi className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold">Report It</h1>
        </div>
        <Button onClick={handleAddIssue} size="icon" variant="ghost">
          <Plus className="w-6 h-6" />
        </Button>
      </header>

      <Tabs defaultValue="issues" className="mb-6">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger 
            value="issues" 
            onClick={() => setSelectedTab("issues")}
          >
            Issues
          </TabsTrigger>
          <TabsTrigger 
            value="protests" 
            onClick={() => setSelectedTab("protests")}
          >
            Protests
          </TabsTrigger>
          <TabsTrigger 
            value="candidates" 
            onClick={() => setSelectedTab("candidates")}
          >
            Candidates
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="issues" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Issues</h2>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={() => toast.info("Filter options will be expanded soon!")}
            >
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
            {["all", "Roads", "Water Supply", "Electricity", "Waste"].map((category) => (
              <Badge 
                key={category} 
                variant={filter === category ? "default" : "outline"}
                className="cursor-pointer whitespace-nowrap"
                onClick={() => handleFilterChange(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
          
          <IssueFeed 
            issues={issues.filter(issue => filter === "all" || issue.category === filter)} 
            onUpvote={handleUpvote}
            isLoading={isLoading}
          />
        </TabsContent>
        
        <TabsContent value="protests" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <h3 className="font-medium text-lg">Upcoming Protests</h3>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <div>
                    <h4 className="font-medium">Main Street Repair Protest</h4>
                    <p className="text-sm text-gray-500">June 15, 2023 • 34 participants</p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Users className="w-4 h-4" />
                    Join
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Water Supply Improvement</h4>
                    <p className="text-sm text-gray-500">June 22, 2023 • 19 participants</p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Users className="w-4 h-4" />
                    Join
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <p className="text-xs text-gray-500">All protests are organized peacefully in accordance with local regulations.</p>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <h3 className="font-medium text-lg">Group Discussions</h3>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <div>
                    <h4 className="font-medium">Road Maintenance Chat</h4>
                    <p className="text-sm text-gray-500">42 members • 15 new messages</p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1">
                    <MessageCircle className="w-4 h-4" />
                    Chat
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Water Supply Solutions</h4>
                    <p className="text-sm text-gray-500">28 members • 7 new messages</p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1">
                    <MessageCircle className="w-4 h-4" />
                    Chat
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="candidates" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <h3 className="font-medium text-lg">Active Candidates</h3>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div>
                      <h4 className="font-medium flex items-center">
                        Sarah Johnson 
                        <Star className="w-4 h-4 text-yellow-500 ml-1 fill-yellow-500" />
                      </h4>
                      <p className="text-sm text-gray-500">Roads Department • 4.8 ★</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div>
                      <h4 className="font-medium">Michael Chen</h4>
                      <p className="text-sm text-gray-500">Water Resources • 4.2 ★</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => toast.info("Candidate registration will be available soon!")}
              >
                Register as Candidate
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;


import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { IssueType } from "@/types/issue";

interface NewIssueFormProps {
  categories: string[];
  onAddIssue: (issue: Omit<IssueType, "id" | "comments" | "upvotes" | "reportedDate">) => void;
}

export function NewIssueForm({ categories, onAddIssue }: NewIssueFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  
  const generateCaseNumber = () => {
    const prefix = category.substring(0, 2).toUpperCase();
    const year = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-${year}-${randomNum}`;
  };
  
  const handleSubmit = (close: () => void) => {
    if (!title || !description || !category || !location) {
      toast.error("Please fill in all fields");
      return;
    }
    
    const newIssue = {
      title,
      description,
      category,
      location,
      caseNumber: generateCaseNumber(),
      status: "pending" as const,
      image: "/placeholder.svg",
    };
    
    onAddIssue(newIssue);
    setTitle("");
    setDescription("");
    setCategory("");
    setLocation("");
    close();
    toast.success("Issue reported successfully!");
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost" className="glow-button">
          <Plus className="w-6 h-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-card max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-xl">Report New Issue</DialogTitle>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Enter issue title"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Describe the issue in detail"
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input 
              id="location" 
              value={location} 
              onChange={(e) => setLocation(e.target.value)} 
              placeholder="Enter location"
            />
          </div>
        </div>
        
        <div className="flex justify-end gap-2">
          <DialogTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogTrigger>
          <DialogTrigger asChild>
            <Button onClick={(e) => {
              const closeDialog = () => {
                const triggerButton = e.currentTarget.closest("button[data-state]");
                if (triggerButton) {
                  (triggerButton as HTMLButtonElement).click();
                }
              };
              handleSubmit(closeDialog);
            }}>
              Submit Issue
            </Button>
          </DialogTrigger>
        </div>
      </DialogContent>
    </Dialog>
  );
}

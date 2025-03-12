
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface FilterModalProps {
  categories: string[];
  statuses: string[];
  selectedCategories: string[];
  selectedStatuses: string[];
  onApplyFilters: (categories: string[], statuses: string[]) => void;
}

export function FilterModal({
  categories,
  statuses,
  selectedCategories,
  selectedStatuses,
  onApplyFilters
}: FilterModalProps) {
  const [tempCategories, setTempCategories] = useState<string[]>(selectedCategories);
  const [tempStatuses, setTempStatuses] = useState<string[]>(selectedStatuses);
  
  const handleCategoryChange = (category: string) => {
    setTempCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  const handleStatusChange = (status: string) => {
    setTempStatuses(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };
  
  const handleApply = (close: () => void) => {
    onApplyFilters(tempCategories, tempStatuses);
    close();
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1 glow-button"
        >
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-card max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-xl">Filter Issues</DialogTitle>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Categories</h3>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`category-${category}`} 
                    checked={tempCategories.includes(category)}
                    onCheckedChange={() => handleCategoryChange(category)}
                  />
                  <label 
                    htmlFor={`category-${category}`}
                    className="text-sm cursor-pointer"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-sm font-medium mb-2">Status</h3>
            <div className="grid grid-cols-2 gap-2">
              {statuses.map((status) => (
                <div key={status} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`status-${status}`}
                    checked={tempStatuses.includes(status)}
                    onCheckedChange={() => handleStatusChange(status)}
                  />
                  <label 
                    htmlFor={`status-${status}`}
                    className="text-sm cursor-pointer"
                  >
                    {status}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-2">
          <DialogTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogTrigger>
          <DialogTrigger asChild>
            {(props) => (
              <Button onClick={() => handleApply(props.onClick)}>Apply Filters</Button>
            )}
          </DialogTrigger>
        </div>
      </DialogContent>
    </Dialog>
  );
}

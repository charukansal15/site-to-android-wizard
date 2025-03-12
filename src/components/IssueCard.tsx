
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp } from "lucide-react";
import { IssueType } from "@/types/issue";
import { useNavigate } from "react-router-dom";

interface IssueCardProps {
  issue: IssueType;
  onUpvote: (id: string) => void;
}

export function IssueCard({ issue, onUpvote }: IssueCardProps) {
  // This would be used for navigation in a real app
  // const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleClick = () => {
    // In a real app, this would navigate to the issue details page
    // navigate(`/issue/${issue.id}`);
    // For now, just console log
    console.log(`Viewing issue: ${issue.id}`);
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer" onClick={handleClick}>
      <div className="h-32 bg-gray-200 relative">
        <img 
          src={issue.image} 
          alt={issue.title}
          className="h-full w-full object-cover" 
        />
        <Badge 
          className={`absolute top-2 right-2 ${getStatusColor(issue.status)}`}
        >
          {issue.status}
        </Badge>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium">{issue.title}</h3>
        </div>
        <p className="text-xs text-gray-500">
          Case #{issue.caseNumber} • {issue.location}
        </p>
      </CardHeader>
      
      <CardContent className="pb-2">
        <p className="text-sm text-gray-700 line-clamp-2">{issue.description}</p>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="outline">{issue.category}</Badge>
          <span className="text-xs text-gray-500">
            {new Date(issue.reportedDate).toLocaleDateString()}
          </span>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-1"
          onClick={(e) => {
            e.stopPropagation();
            onUpvote(issue.id);
          }}
        >
          <ThumbsUp className="w-4 h-4" />
          <span>{issue.upvotes}</span>
        </Button>
      </CardFooter>
    </Card>
  );
}

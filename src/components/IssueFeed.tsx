
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";
import { IssueType } from "@/types/issue";
import { IssueCard } from "@/components/IssueCard";
import { Separator } from "@/components/ui/separator";

interface IssueFeedProps {
  issues: IssueType[];
  onUpvote: (id: string) => void;
  isLoading: boolean;
}

export function IssueFeed({ issues, onUpvote, isLoading }: IssueFeedProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-24 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </CardContent>
            <CardFooter>
              <div className="h-8 bg-gray-200 rounded w-24"></div>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (issues.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <p className="text-gray-500">No issues found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {issues.map((issue) => (
        <IssueCard key={issue.id} issue={issue} onUpvote={onUpvote} />
      ))}
    </div>
  );
}

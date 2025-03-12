
export interface CommentType {
  id: string;
  user: string;
  text: string;
  date: string;
}

export interface IssueType {
  id: string;
  title: string;
  description: string;
  caseNumber: string;
  category: string;
  status: 'ongoing' | 'pending' | 'resolved';
  upvotes: number;
  image: string;
  location: string;
  reportedDate: string;
  comments: CommentType[];
}

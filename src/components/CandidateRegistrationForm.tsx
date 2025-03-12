
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UserPlus } from "lucide-react";
import { toast } from "sonner";

interface CandidateRegistrationFormProps {
  departments: string[];
  onRegisterCandidate: (candidateData: {
    name: string;
    department: string;
    experience: string;
    email: string;
    phone: string;
  }) => void;
}

export const CandidateRegistrationForm = ({
  departments,
  onRegisterCandidate,
}: CandidateRegistrationFormProps) => {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState(departments[0] || "");
  const [experience, setExperience] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (closeDialog: () => void) => {
    if (!name || !department || !experience || !email || !phone) {
      toast.error("Please fill in all fields");
      return;
    }

    onRegisterCandidate({
      name,
      department,
      experience,
      email,
      phone
    });

    // Reset form
    setName("");
    setDepartment(departments[0] || "");
    setExperience("");
    setEmail("");
    setPhone("");

    // Close dialog
    closeDialog();
    
    toast.success("Registration submitted successfully!");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <UserPlus className="w-4 h-4 mr-2" />
          Register as Candidate
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Register as a Candidate</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <select
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="experience">Experience (years)</Label>
            <Input
              id="experience"
              type="number"
              min="0"
              placeholder="5"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john.doe@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              placeholder="(123) 456-7890"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col space-y-2 sm:flex-row sm:justify-end sm:space-x-2 sm:space-y-0">
          <DialogTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogTrigger>
          <DialogClose asChild>
            <Button onClick={() => {
              if (!name || !department || !experience || !email || !phone) {
                toast.error("Please fill in all fields");
                return;
              }
              
              onRegisterCandidate({
                name,
                department,
                experience,
                email,
                phone
              });
              
              // Reset form
              setName("");
              setDepartment(departments[0] || "");
              setExperience("");
              setEmail("");
              setPhone("");
              
              toast.success("Registration submitted successfully!");
            }}>
              Submit Application
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

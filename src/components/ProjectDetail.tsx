import { Project } from "@/types/project";
import { formatCurrency } from "@/lib/utils";
import { Calendar, Mail, Phone, Flag, Upload } from "lucide-react";
import { Progress } from "./ui/progress";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useToast } from "@/hooks/use-toast";

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
}

const ProjectDetail = ({ project, onClose }: ProjectDetailProps) => {
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [reportCategory, setReportCategory] = useState("");
  const [reportDescription, setReportDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsReportDialogOpen(false);
      
      // Reset form
      setReportCategory("");
      setReportDescription("");
      
      // Show success toast
      toast({
        title: "Report Submitted",
        description: "Thank you for your feedback. Your report has been submitted successfully.",
      });
    }, 1000);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <button
        onClick={onClose}
        className="mb-4 text-muted-foreground hover:text-foreground"
      >
        ← Back to Projects
      </button>

      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-secondary mb-2">{project.title}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>📍 {project.location.city}, {project.location.county}</span>
              <span className="chip">{project.sector}</span>
            </div>
          </div>
          <Button 
            variant="destructive" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={() => setIsReportDialogOpen(true)}
          >
            <Flag className="h-4 w-4" />
            Report Issue
          </Button>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Scope</h2>
          <p className="text-muted-foreground">{project.scope}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Budget Breakdown</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {project.budget.breakdown.map((item, index) => (
              <div key={index} className="bg-muted p-4 rounded-lg">
                <div className="text-sm text-muted-foreground">{item.category}</div>
                <div className="text-lg font-medium">
                  {formatCurrency(item.amount)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Timeline</h2>
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Start: {project.timeline.start}</span>
              <span>End: {project.timeline.end}</span>
            </div>
            <div className="space-y-2">
              {project.timeline.milestones.map((milestone, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 mt-1 text-primary" />
                  <div>
                    <div className="font-medium">{milestone.date}</div>
                    <div className="text-sm text-muted-foreground">
                      {milestone.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Project Progress</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Overall Progress</span>
              <span className="font-medium">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-2" />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Updates</h2>
          <div className="space-y-4">
            {project.updates.map((update, index) => (
              <div key={index} className="flex items-start gap-2">
                <Calendar className="w-4 h-4 mt-1 text-primary" />
                <div>
                  <div className="font-medium">{update.date}</div>
                  <div className="text-sm text-muted-foreground">
                    {update.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Implementing Agency</h2>
          <div className="bg-muted p-4 rounded-lg">
            <div className="font-medium mb-2">{project.implementingAgency.name}</div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>{project.implementingAgency.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>{project.implementingAgency.contact.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Report an Issue</DialogTitle>
            <DialogDescription>
              Help us improve by reporting issues with this project. Your feedback matters.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleReportSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">Report Category</label>
              <Select value={reportCategory} onValueChange={setReportCategory} required>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="delay">Project Delay</SelectItem>
                  <SelectItem value="mismanagement">Mismanagement of Funds</SelectItem>
                  <SelectItem value="completion">Project Completion</SelectItem>
                  <SelectItem value="other">Other Issues</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <Textarea 
                id="description" 
                placeholder="Please describe the issue in detail..." 
                value={reportDescription}
                onChange={(e) => setReportDescription(e.target.value)}
                className="min-h-[120px]"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="evidence" className="text-sm font-medium">Upload Evidence (Optional)</label>
              <div className="border-2 border-dashed border-muted rounded-md p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                <Input 
                  id="evidence" 
                  type="file" 
                  className="hidden" 
                  accept="image/*,video/*" 
                  multiple
                />
                <label htmlFor="evidence" className="cursor-pointer flex flex-col items-center">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">
                    Click to upload or drag and drop
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">
                    Images or videos (max 10MB)
                  </span>
                </label>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-medium">Location (Optional)</label>
              <Input 
                id="location" 
                type="text" 
                placeholder="Enter location or share your current location" 
                defaultValue={`${project.location.city}, ${project.location.county}`}
              />
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                className="mt-1 text-xs"
                onClick={() => {
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                      (position) => {
                        toast({
                          title: "Location detected",
                          description: `Lat: ${position.coords.latitude}, Long: ${position.coords.longitude}`,
                        });
                      },
                      () => {
                        toast({
                          title: "Location error",
                          description: "Unable to get your location. Please enable location services.",
                          variant: "destructive",
                        });
                      }
                    );
                  }
                }}
              >
                Use Current Location
              </Button>
            </div>
            
            <DialogFooter className="mt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsReportDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting || !reportCategory || !reportDescription}
              >
                {isSubmitting ? "Submitting..." : "Submit Report"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectDetail;

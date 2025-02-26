
import { Progress } from "./ui/progress";

interface ProjectCardProps {
  title: string;
  description: string;
  progress: number;
  status: "ongoing" | "completed" | "delayed";
  sector: string;
  location: string;
}

const ProjectCard = ({ title, description, progress, status, sector, location }: ProjectCardProps) => {
  return (
    <div className="project-card">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-secondary mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
        </div>
        <div className={`status-chip ${status}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <div className="flex gap-2">
          <div className="chip">{sector}</div>
          <div className="chip">{location}</div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

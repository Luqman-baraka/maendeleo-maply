
import { Progress } from "./ui/progress";
import { Card, CardContent } from "./ui/card";

interface ProjectCardProps {
  title: string;
  description: string;
  progress: number;
  status: "ongoing" | "completed" | "delayed";
  sector: string;
  location: string;
  imageUrl?: string;
}

const ProjectCard = ({ 
  title, 
  description, 
  progress, 
  status, 
  sector, 
  location, 
  imageUrl 
}: ProjectCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {imageUrl && (
        <div className="w-full h-48 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      <CardContent className="p-5">
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
      </CardContent>
    </Card>
  );
};

export default ProjectCard;

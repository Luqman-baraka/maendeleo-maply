
import { Progress } from "./ui/progress";
import { Card, CardContent } from "./ui/card";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";

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
  // Default placeholder image if imageUrl is not provided
  const defaultImage = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1470&auto=format&fit=crop";
  
  const getStatusIcon = () => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 mr-1" />;
      case "delayed":
        return <AlertTriangle className="h-4 w-4 mr-1" />;
      case "ongoing":
        return <Clock className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  const getStatusClass = () => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "delayed":
        return "bg-red-100 text-red-800";
      case "ongoing":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="w-full h-48 overflow-hidden">
        <img 
          src={imageUrl || defaultImage} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-secondary mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{description}</p>
          </div>
          <div className={`flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusClass()}`}>
            {getStatusIcon()}
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

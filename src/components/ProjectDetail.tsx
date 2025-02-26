
import { Project } from "@/types/project";
import { formatCurrency } from "@/lib/utils";
import { Calendar, Mail, Phone } from "lucide-react";
import { Progress } from "./ui/progress";

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
}

const ProjectDetail = ({ project, onClose }: ProjectDetailProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <button
        onClick={onClose}
        className="mb-4 text-muted-foreground hover:text-foreground"
      >
        ← Back to Projects
      </button>

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-secondary mb-2">{project.title}</h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>📍 {project.location.city}, {project.location.county}</span>
            <span className="chip">{project.sector}</span>
          </div>
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
    </div>
  );
};

export default ProjectDetail;

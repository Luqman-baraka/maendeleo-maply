
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Project } from "@/types/project";
import ProjectCard from "@/components/ProjectCard";
import ProjectDetail from "@/components/ProjectDetail";
import Header from "@/components/Header";
import { Search } from "lucide-react";

// Sample data - you would typically fetch this from an API
const projectsData: Project[] = [
  {
    id: "1",
    title: "Mombasa County Hospital Expansion",
    location: {
      city: "Mombasa",
      county: "Mombasa County"
    },
    sector: "Health",
    scope: "Construction of a new wing, upgrading existing wards, and modernizing medical equipment.",
    budget: {
      total: 150000000,
      breakdown: [
        { category: "Construction", amount: 90000000 },
        { category: "Medical Equipment", amount: 40000000 },
        { category: "Staffing & Training", amount: 15000000 },
        { category: "Planning & Permits", amount: 5000000 }
      ]
    },
    timeline: {
      start: "March 2024",
      end: "March 2025",
      milestones: [
        { date: "June 2024", description: "Foundation and structural work" },
        { date: "October 2024", description: "Interior and medical equipment installation" },
        { date: "January 2025", description: "Staff recruitment and training" }
      ]
    },
    progress: 10,
    updates: [
      { date: "2024-03-01", description: "Groundbreaking ceremony held 🎉" },
      { date: "2024-03-15", description: "Initial site clearing completed" }
    ],
    implementingAgency: {
      name: "Mombasa County Government - Ministry of Health",
      contact: {
        phone: "+254 41 2311111",
        email: "info@mombasacounty.go.ke"
      }
    }
  },
  // ... Add more projects similarly
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projectsData.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.location.county.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        {selectedProject ? (
          <ProjectDetail
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        ) : (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-secondary mb-6">
                Development Projects
              </h1>
              <div className="max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search projects by name, sector, or location..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="cursor-pointer"
                >
                  <ProjectCard
                    title={project.title}
                    description={project.scope}
                    progress={project.progress}
                    status={project.progress === 100 ? "completed" : project.progress < 20 ? "ongoing" : "delayed"}
                    sector={project.sector}
                    location={`${project.location.city}, ${project.location.county}`}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Projects;

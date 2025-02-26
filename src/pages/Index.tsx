import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import ProjectMap from "@/components/ProjectMap";
import ProjectCard from "@/components/ProjectCard";
import { MapPin, FileText, TrendingUp, AlertTriangle } from "lucide-react";

const projects = [
  {
    title: "Mombasa-Nairobi Railway Extension",
    description: "Extension of the Standard Gauge Railway from Mombasa to Nairobi.",
    progress: 75,
    status: "ongoing" as const,
    sector: "Infrastructure",
    location: "Mombasa",
  },
  {
    title: "Rural Electrification Project",
    description: "Connecting remote villages to the national power grid.",
    progress: 90,
    status: "completed" as const,
    sector: "Energy",
    location: "Machakos",
  },
  {
    title: "Community Health Center",
    description: "Construction of a modern health facility for the local community.",
    progress: 40,
    status: "delayed" as const,
    sector: "Healthcare",
    location: "Kisumu",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Hero Section */}
        <section className="text-center mb-16 animate-fadeIn">
          <h1 className="text-4xl font-bold text-secondary mb-4">
            Track Development Projects Across Kenya
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Monitor progress, ensure transparency, and participate in Kenya's development journey.
          </p>
          <div className="flex justify-center gap-4">
            <Button className="button-primary" onClick={() => window.location.href = '/projects'}>View Projects</Button>
            <Button className="button-secondary">Report Issue</Button>
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { icon: MapPin, label: "Active Projects", value: "234" },
            { icon: FileText, label: "Reports Filed", value: "1,432" },
            { icon: TrendingUp, label: "Completion Rate", value: "78%" },
            { icon: AlertTriangle, label: "Issues Resolved", value: "891" },
          ].map((stat, index) => (
            <div key={index} className="project-card">
              <stat.icon className="h-6 w-6 text-primary mb-4" />
              <p className="text-2xl font-semibold text-secondary">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* Map Section */}
        <section className="mb-16">
          <h2 className="section-title">Project Map</h2>
          <ProjectMap />
        </section>

        {/* Projects Section */}
        <section>
          <h2 className="section-title">Recent Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;

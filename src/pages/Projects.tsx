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
    },
    imageUrl: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=1528&auto=format&fit=crop"
  },
  {
    id: "2",
    title: "Kijani Green Schools Initiative",
    location: {
      city: "Nyeri",
      county: "Nyeri County"
    },
    sector: "Education & Environment",
    scope: "Establish eco-friendly school environments by planting trees, installing rainwater harvesting systems, and integrating renewable energy sources.",
    budget: {
      total: 25000000,
      breakdown: [
        { category: "Tree Planting", amount: 5000000 },
        { category: "Solar Panels", amount: 12000000 },
        { category: "Rainwater Systems", amount: 6000000 },
        { category: "Training & Workshops", amount: 2000000 }
      ]
    },
    timeline: {
      start: "January 2024",
      end: "December 2024",
      milestones: [
        { date: "March 2024", description: "Tree planting in first 3 schools" },
        { date: "June 2024", description: "Solar panel installation" },
        { date: "October 2024", description: "Rainwater harvesting systems" }
      ]
    },
    progress: 40,
    updates: [
      { date: "2024-01-15", description: "Project launched with community event" },
      { date: "2024-02-28", description: "2,000 trees planted across 5 schools" },
      { date: "2024-03-20", description: "Solar panels installed in 3 schools" }
    ],
    implementingAgency: {
      name: "Ministry of Education - Environmental Division",
      contact: {
        phone: "+254 20 4567890",
        email: "green.schools@education.go.ke"
      }
    },
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1528&auto=format&fit=crop"
  },
  {
    id: "3",
    title: "Mashinani Water Access Project",
    location: {
      city: "Lodwar",
      county: "Turkana County"
    },
    sector: "Water & Sanitation",
    scope: "Provide clean drinking water to rural communities through borehole drilling and solar-powered water pumps.",
    budget: {
      total: 35000000,
      breakdown: [
        { category: "Borehole Drilling", amount: 20000000 },
        { category: "Solar Pumps", amount: 10000000 },
        { category: "Water Filtration", amount: 3000000 },
        { category: "Training", amount: 2000000 }
      ]
    },
    timeline: {
      start: "February 2024",
      end: "November 2024",
      milestones: [
        { date: "April 2024", description: "Site assessment and community engagement" },
        { date: "June 2024", description: "First borehole drilling" },
        { date: "September 2024", description: "Solar pump installation" }
      ]
    },
    progress: 30,
    updates: [
      { date: "2024-02-10", description: "Project initiated with county officials" },
      { date: "2024-03-05", description: "2 boreholes drilled serving 3,000 residents" },
      { date: "2024-03-18", description: "Water filtration system installed at local school" }
    ],
    implementingAgency: {
      name: "Ministry of Water & Irrigation",
      contact: {
        phone: "+254 20 8765432",
        email: "water.access@water.go.ke"
      }
    },
    imageUrl: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?q=80&w=1528&auto=format&fit=crop"
  },
  {
    id: "4",
    title: "Digital Classrooms for Rural Schools",
    location: {
      city: "Kisii",
      county: "Kisii County"
    },
    sector: "Education & ICT",
    scope: "Provide digital learning tools, including tablets and internet connectivity, to underdeveloped schools.",
    budget: {
      total: 18000000,
      breakdown: [
        { category: "Tablets & Equipment", amount: 10000000 },
        { category: "Internet Infrastructure", amount: 5000000 },
        { category: "Teacher Training", amount: 2000000 },
        { category: "Content Development", amount: 1000000 }
      ]
    },
    timeline: {
      start: "January 2024",
      end: "August 2024",
      milestones: [
        { date: "February 2024", description: "School assessment and selection" },
        { date: "April 2024", description: "Equipment procurement and distribution" },
        { date: "June 2024", description: "Teacher training programs" }
      ]
    },
    progress: 60,
    updates: [
      { date: "2024-01-20", description: "Project launched in partnership with tech companies" },
      { date: "2024-02-15", description: "100 tablets distributed to 5 schools" },
      { date: "2024-03-10", description: "Internet access established in 3 schools" }
    ],
    implementingAgency: {
      name: "Ministry of ICT & Digital Economy",
      contact: {
        phone: "+254 20 2345678",
        email: "digital.education@ict.go.ke"
      }
    },
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1528&auto=format&fit=crop"
  },
  {
    id: "5",
    title: "Mama Health Clinic Expansion",
    location: {
      city: "Bungoma",
      county: "Bungoma County"
    },
    sector: "Health",
    scope: "Expand a community health center to provide maternal and child health services.",
    budget: {
      total: 45000000,
      breakdown: [
        { category: "Construction", amount: 30000000 },
        { category: "Medical Equipment", amount: 10000000 },
        { category: "Training", amount: 3000000 },
        { category: "Outreach Programs", amount: 2000000 }
      ]
    },
    timeline: {
      start: "December 2023",
      end: "October 2024",
      milestones: [
        { date: "February 2024", description: "Construction commencement" },
        { date: "June 2024", description: "Building structure completion" },
        { date: "August 2024", description: "Equipment installation" }
      ]
    },
    progress: 60,
    updates: [
      { date: "2023-12-10", description: "Project officially launched by County Governor" },
      { date: "2024-02-05", description: "Construction of maternity ward started" },
      { date: "2024-03-15", description: "Medical supplies and equipment donated" }
    ],
    implementingAgency: {
      name: "Ministry of Health - Maternal Care Division",
      contact: {
        phone: "+254 20 9876543",
        email: "maternal.health@health.go.ke"
      }
    },
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?q=80&w=1528&auto=format&fit=crop"
  },
  {
    id: "6",
    title: "Youth & Women Agribusiness Hub",
    location: {
      city: "Meru",
      county: "Meru County"
    },
    sector: "Agriculture & Youth Empowerment",
    scope: "Support young farmers and women entrepreneurs by providing training, funding, and market access for agribusiness initiatives.",
    budget: {
      total: 30000000,
      breakdown: [
        { category: "Training Programs", amount: 8000000 },
        { category: "Startup Funding", amount: 15000000 },
        { category: "Market Access Support", amount: 5000000 },
        { category: "Administrative Costs", amount: 2000000 }
      ]
    },
    timeline: {
      start: "November 2023",
      end: "November 2024",
      milestones: [
        { date: "January 2024", description: "Training curriculum development" },
        { date: "March 2024", description: "First cohort training" },
        { date: "July 2024", description: "Funding allocation to startups" }
      ]
    },
    progress: 45,
    updates: [
      { date: "2023-11-20", description: "Program launched with stakeholder workshop" },
      { date: "2024-01-30", description: "50 young farmers trained on modern techniques" },
      { date: "2024-03-15", description: "20 agribusiness startups funded" }
    ],
    implementingAgency: {
      name: "Ministry of Agriculture & Youth Affairs",
      contact: {
        phone: "+254 20 7654321",
        email: "youth.agribusiness@agriculture.go.ke"
      }
    },
    imageUrl: "https://images.unsplash.com/photo-1495107334309-fcf20f6a8343?q=80&w=1470&auto=format&fit=crop"
  },
  {
    id: "7",
    title: "Road to Prosperity - Rural Roads Rehabilitation",
    location: {
      city: "Garissa",
      county: "Garissa County"
    },
    sector: "Infrastructure & Transport",
    scope: "Improve road networks in rural areas to enhance access to markets, schools, and healthcare.",
    budget: {
      total: 80000000,
      breakdown: [
        { category: "Road Construction", amount: 60000000 },
        { category: "Drainage Systems", amount: 15000000 },
        { category: "Community Training", amount: 3000000 },
        { category: "Project Management", amount: 2000000 }
      ]
    },
    timeline: {
      start: "January 2024",
      end: "December 2024",
      milestones: [
        { date: "March 2024", description: "Road survey and planning" },
        { date: "May 2024", description: "First phase construction" },
        { date: "October 2024", description: "Drainage system installation" }
      ]
    },
    progress: 25,
    updates: [
      { date: "2024-01-15", description: "Project initiated with community consultation" },
      { date: "2024-02-28", description: "10km of road upgraded with gravel and drainage" },
      { date: "2024-03-10", description: "Community participation in maintenance training" }
    ],
    implementingAgency: {
      name: "Ministry of Transport & Infrastructure",
      contact: {
        phone: "+254 20 6543210",
        email: "rural.roads@transport.go.ke"
      }
    },
    imageUrl: "https://images.unsplash.com/photo-1518899711965-a2a94f8a09a4?q=80&w=1474&auto=format&fit=crop"
  },
  {
    id: "8",
    title: "Slums Lighting & Security Project",
    location: {
      city: "Nairobi",
      county: "Nairobi County"
    },
    sector: "Urban Development & Security",
    scope: "Install solar-powered streetlights in informal settlements to improve security and night-time business operations.",
    budget: {
      total: 22000000,
      breakdown: [
        { category: "Solar Streetlights", amount: 15000000 },
        { category: "Installation", amount: 5000000 },
        { category: "Community Engagement", amount: 1500000 },
        { category: "Monitoring & Evaluation", amount: 500000 }
      ]
    },
    timeline: {
      start: "February 2024",
      end: "July 2024",
      milestones: [
        { date: "March 2024", description: "Community mapping and planning" },
        { date: "April 2024", description: "First phase installation" },
        { date: "June 2024", description: "Impact assessment" }
      ]
    },
    progress: 70,
    updates: [
      { date: "2024-02-05", description: "Project launched in Kibera" },
      { date: "2024-03-01", description: "50 solar streetlights installed" },
      { date: "2024-03-20", description: "Crime rates reduced by 30% in lit areas" }
    ],
    implementingAgency: {
      name: "Nairobi Metropolitan Services",
      contact: {
        phone: "+254 20 5432109",
        email: "urban.lighting@nms.go.ke"
      }
    },
    imageUrl: "https://images.unsplash.com/photo-1625813506062-0aeb70b6a1b9?q=80&w=1374&auto=format&fit=crop"
  }
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
                    imageUrl={project.imageUrl}
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

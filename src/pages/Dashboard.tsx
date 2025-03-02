
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { Progress } from "@/components/ui/progress";
import { Project } from "@/types/project";
import { formatCurrency } from "@/lib/utils";

const Dashboard = () => {
  const { user, profile, signOut } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      fetchProjects();
    }
  }, [user, navigate]);

  const fetchProjects = async () => {
    try {
      // This is a mock implementation - would normally fetch from Supabase
      // For now we're using sample data
      const data = [
        {
          id: "1",
          title: "Mombasa County Hospital Expansion",
          location: {
            city: "Mombasa",
            county: "Mombasa County",
          },
          sector: "Health",
          scope: "Construction of a new wing, upgrading existing wards, and modernizing medical equipment.",
          budget: {
            total: 150000000,
            breakdown: [
              { category: "Construction", amount: 90000000 },
              { category: "Medical Equipment", amount: 40000000 },
              { category: "Staffing & Training", amount: 15000000 },
              { category: "Planning & Permits", amount: 5000000 },
            ],
          },
          timeline: {
            start: "2024-03-01",
            end: "2025-03-01",
            milestones: [
              { date: "2024-06-15", description: "Foundation and structural work" },
              { date: "2024-10-15", description: "Interior and medical equipment installation" },
              { date: "2025-01-15", description: "Staff recruitment and training" },
            ],
          },
          progress: 10,
          updates: [
            { date: "2024-03-01", description: "Groundbreaking ceremony held" },
            { date: "2024-03-15", description: "Initial site clearing completed" },
          ],
          implementingAgency: {
            name: "Mombasa County Government - Ministry of Health",
            contact: {
              phone: "+254 41 2311111",
              email: "info@mombasacounty.go.ke",
            },
          },
        },
        {
          id: "2",
          title: "Rural Schools Digital Program",
          location: {
            city: "",
            county: "Machakos County",
          },
          sector: "Education",
          scope: "Providing tablets, digital learning content, and teacher training for rural schools",
          budget: {
            total: 45000000,
            breakdown: [
              { category: "Devices & Software", amount: 25000000 },
              { category: "Teacher Training", amount: 10000000 },
              { category: "Internet & Infrastructure", amount: 7000000 },
              { category: "Administrative Costs", amount: 3000000 },
            ],
          },
          timeline: {
            start: "2024-02-01",
            end: "2024-08-01",
            milestones: [
              { date: "2024-04-15", description: "Distribution of first batch of devices" },
              { date: "2024-06-15", description: "Training workshops for teachers" },
              { date: "2024-08-01", description: "System testing and program review" },
            ],
          },
          progress: 20,
          updates: [
            { date: "2024-02-10", description: "Pilot program launched in 5 schools" },
            { date: "2024-03-05", description: "Internet installation ongoing in 10 schools" },
          ],
          implementingAgency: {
            name: "Ministry of Education - ICT Division",
            contact: {
              phone: "+254 20 3344556",
              email: "info@education.go.ke",
            },
          },
        },
      ] as Project[];
      
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-primary/90 text-white shadow">
        <div className="container mx-auto px-4">
          <div className="py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Staff Dashboard</h1>
              <p>Welcome, {profile?.position} at {profile?.department}</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" className="bg-white text-primary hover:bg-white/90" onClick={() => navigate("/projects")}>
                View Projects
              </Button>
              <Button variant="outline" className="bg-white text-primary hover:bg-white/90" onClick={signOut}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Projects</CardTitle>
              <CardDescription>Active government projects</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{projects.length}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Budget</CardTitle>
              <CardDescription>Combined project budgets</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {formatCurrency(projects.reduce((acc, project) => acc + project.budget.total, 0))}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Average Progress</CardTitle>
              <CardDescription>All active projects</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress 
                value={projects.reduce((acc, project) => acc + project.progress, 0) / projects.length} 
                className="h-2 mt-2" 
              />
              <p className="text-3xl font-bold mt-2">
                {Math.floor(projects.reduce((acc, project) => acc + project.progress, 0) / projects.length)}%
              </p>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-xl font-bold mb-4">Your Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <CardHeader className="bg-slate-100 pb-2">
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>
                  {project.location.city && `${project.location.city}, `}{project.location.county}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Progress</p>
                    <div className="flex items-center gap-2">
                      <Progress value={project.progress} className="h-2 flex-1" />
                      <span className="text-sm font-medium">{project.progress}%</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Budget</p>
                    <p className="font-medium">{formatCurrency(project.budget.total)}</p>
                  </div>
                  
                  <div className="flex gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Start Date</p>
                      <p className="font-medium">{new Date(project.timeline.start).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">End Date</p>
                      <p className="font-medium">{new Date(project.timeline.end).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate(`/projects/${project.id}`)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


import { Button } from "./ui/button";
import { MenuIcon, Search } from "lucide-react";
import { Input } from "./ui/input";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <Button variant="ghost" size="icon" className="lg:hidden">
              <MenuIcon className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold text-secondary">Maendeleo Tracker</h1>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-6">
              <a href="#projects" className="nav-link">Projects</a>
              <a href="#map" className="nav-link">Map</a>
              <a href="#report" className="nav-link">Report</a>
              <a href="#insights" className="nav-link">Insights</a>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block w-72">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  className="pl-10"
                />
              </div>
            </div>
            <Button className="button-primary">Report Issue</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

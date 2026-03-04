import PortfolioClient from "./client";

// Mock projects data for build
const mockProjects = [
  {
    id: "1",
    name: "E-commerce Platform",
    client_name: "TechCorp Inc.",
    description: "Modern e-commerce platform with advanced features",
    status: "completed",
    project_type: "Web Application",
    technologies: ["React", "Node.js", "PostgreSQL"],
    is_featured: true,
    is_public: true,
  },
  {
    id: "2", 
    name: "Mobile Banking App",
    client_name: "FinanceFirst",
    description: "Secure mobile banking application",
    status: "completed", 
    project_type: "Mobile App",
    technologies: ["React Native", "Node.js"],
    is_featured: true,
    is_public: true,
  },
];

export default function PortfolioPage() {
  return <PortfolioClient projects={mockProjects} />;
}
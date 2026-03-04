import ResearchSamplesClient from "./client";

// Mock research papers data for build
const mockPapers = [
  {
    id: "1",
    title: "Machine Learning Applications in Healthcare",
    abstract: "Exploring innovative ML approaches in medical diagnosis",
    authors: ["Dr. Sarah Chen", "Dr. Alex Morgan"],
    publication_date: "2024-01-15T00:00:00Z",
    journal: "Journal of AI Research",
    tags: ["Machine Learning", "Healthcare", "AI"],
  },
  {
    id: "2",
    title: "Quantum Computing and Cryptography",
    abstract: "Next-generation encryption methods using quantum principles", 
    authors: ["Dr. Emily Johnson"],
    publication_date: "2024-01-10T00:00:00Z",
    journal: "Quantum Computing Journal",
    tags: ["Quantum Computing", "Cryptography"],
  },
];

export default function ResearchSamplesPage() {
  return <ResearchSamplesClient samples={mockPapers} />;
}

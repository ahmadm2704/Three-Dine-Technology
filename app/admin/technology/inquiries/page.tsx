import { Mail, Clock, CheckCircle } from "lucide-react";

// Mock inquiries data
const mockInquiries = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    subject: "Website Development",
    message: "We need a new company website",
    status: "new",
    created_at: "2024-01-15T00:00:00Z",
  },
  {
    id: "2",
    name: "Jane Smith", 
    email: "jane@company.com",
    subject: "Mobile App Development",
    message: "Looking for iOS app development",
    status: "responded",
    created_at: "2024-01-10T00:00:00Z",
  },
];

export default function AdminTechInquiriesPage() {
    const inquiries = mockInquiries;

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-black uppercase text-black">Inquiries</h1>
                <p className="text-gray-500">Messages from the Contact Us form.</p>
            </div>

            <div className="space-y-4">
                {!inquiries || inquiries.length === 0 ? (
                    <div className="text-center text-gray-400 italic py-12 bg-white border border-gray-100">
                        No inquiries yet.
                    </div>
                ) : (
                    inquiries.map((inquiry: any) => (
                        <div key={inquiry.id} className="bg-white border-l-4 border-black p-6 shadow-sm hover:shadow-md transition-shadow relative">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-bold">{inquiry.subject || "No Subject"}</h3>
                                <span className="text-xs font-mono text-gray-400">{new Date(inquiry.created_at).toLocaleDateString()}</span>
                            </div>
                            <div className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-4 flex items-center">
                                <Mail className="w-3 h-3 mr-2" /> {inquiry.email} <span className="mx-2 text-gray-300">|</span> {inquiry.name}
                            </div>
                            <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 font-mono text-sm">
                                {inquiry.message}
                            </p>
                            <div className="mt-4 flex justify-end">
                                <div className="flex items-center text-xs font-bold uppercase tracking-widest text-gray-400">
                                    <Clock className="w-3 h-3 mr-1" /> {inquiry.status}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

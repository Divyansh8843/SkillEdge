import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import Navigation from "../components/Navigation";
import ContactModal from "../components/ContactModal";

interface HelpRequest {
  id: string;
  studentName: string;
  studentEmail: string;
  subject: string;
  description: string;
  timestamp: Date;
  status: "pending" | "accepted" | "completed";
}

const AcceptRequest = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState<HelpRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<HelpRequest[]>([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState({
    name: "",
    email: "",
  });
  const [acceptedRequests, setAcceptedRequests] = useState<string[]>([]);

  // Load requests from localStorage
  useEffect(() => {
    const loadRequests = () => {
      const savedRequests = localStorage.getItem("allRequests");
      if (savedRequests) {
        try {
          const allRequests = JSON.parse(savedRequests);
          // Filter out user's own requests and only show pending requests
          const availableRequests = allRequests.filter(
            (req: HelpRequest) =>
              req.studentEmail !== user?.email && req.status === "pending"
          );
          setRequests(availableRequests);
        } catch (error) {
          console.error("Error loading requests:", error);
        }
      }
    };

    loadRequests();

    // Load accepted requests for this user
    const savedAccepted = localStorage.getItem(
      `acceptedRequests_${user?.email}`
    );
    if (savedAccepted) {
      try {
        setAcceptedRequests(JSON.parse(savedAccepted));
      } catch (error) {
        console.error("Error loading accepted requests:", error);
      }
    }
  }, [user?.email]);

  // Filter requests based on search
  useEffect(() => {
    const filtered = requests.filter(
      (request) =>
        request.subject.toLowerCase().includes(searchFilter.toLowerCase()) ||
        request.description
          .toLowerCase()
          .includes(searchFilter.toLowerCase()) ||
        request.studentName.toLowerCase().includes(searchFilter.toLowerCase())
    );
    setFilteredRequests(filtered);
  }, [requests, searchFilter]);

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - new Date(date).getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const handleAcceptRequest = (request: HelpRequest) => {
    // Update the request status in localStorage
    const savedRequests = localStorage.getItem("allRequests");
    if (savedRequests) {
      try {
        const allRequests = JSON.parse(savedRequests);
        const updatedRequests = allRequests.map((req: HelpRequest) =>
          req.id === request.id ? { ...req, status: "accepted" } : req
        );
        localStorage.setItem("allRequests", JSON.stringify(updatedRequests));
      } catch (error) {
        console.error("Error updating request:", error);
      }
    }

    // Add to user's accepted requests
    const newAcceptedRequests = [...acceptedRequests, request.id];
    setAcceptedRequests(newAcceptedRequests);
    localStorage.setItem(
      `acceptedRequests_${user?.email}`,
      JSON.stringify(newAcceptedRequests)
    );

    // Remove from available requests
    setRequests((prev) => prev.filter((req) => req.id !== request.id));

    // Show contact modal
    setSelectedStudent({
      name: request.studentName,
      email: request.studentEmail,
    });
    setIsModalOpen(true);
  };

  const isRequestAccepted = (requestId: string) => {
    return acceptedRequests.includes(requestId);
  };

  return (
    <>
      <Navigation />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
        <div className="container mx-auto px-6 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Help Others Learn
            </h1>
            <p className="text-slate-300 text-lg">
              Hi {user?.name}! Find students who need your expertise.
            </p>
          </div>

          {/* Search Filter */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by subject, description, or student name..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full px-4 py-3 pl-12 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
              />
              <svg
                className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 transform -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">
                {requests.length}
              </div>
              <div className="text-slate-300">Available Requests</div>
            </div>
            <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">
                {acceptedRequests.length}
              </div>
              <div className="text-slate-300">Requests You've Accepted</div>
            </div>
            <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                {filteredRequests.length}
              </div>
              <div className="text-slate-300">Matching Search</div>
            </div>
          </div>

          {/* Requests Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request) => (
                <div
                  key={request.id}
                  className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center text-white font-semibold">
                        {request.studentName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">
                          {request.studentName}
                        </h3>
                        <p className="text-sm text-slate-400">
                          {formatTimeAgo(request.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="inline-block bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-sm font-medium mb-3">
                      {request.subject}
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {request.description}
                    </p>
                  </div>

                  <button
                    onClick={() => handleAcceptRequest(request)}
                    disabled={isRequestAccepted(request.id)}
                    className={`w-full font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                      isRequestAccepted(request.id)
                        ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
                    }`}>
                    {isRequestAccepted(request.id) ? (
                      <>
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Already Accepted
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Accept Request
                      </>
                    )}
                  </button>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <div className="text-slate-400 text-lg">
                  {searchFilter
                    ? "No requests match your search"
                    : "No help requests available"}
                </div>
                <p className="text-slate-500 mt-2">
                  {searchFilter
                    ? "Try adjusting your search terms"
                    : "Check back later for new requests from students who need help!"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        helperName={selectedStudent.name}
        helperEmail={selectedStudent.email}
      />
    </>
  );
};

export default AcceptRequest;

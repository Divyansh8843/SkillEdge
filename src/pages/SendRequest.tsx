import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import Navigation from "../components/Navigation";

interface HelpRequest {
  id: string;
  studentName: string;
  studentEmail: string;
  subject: string;
  description: string;
  timestamp: Date;
  status: "pending" | "accepted" | "completed";
}

const SendRequest = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    subject: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [userRequests, setUserRequests] = useState<HelpRequest[]>([]);

  // Load user's requests from localStorage
  useEffect(() => {
    const savedRequests = localStorage.getItem("userRequests");
    if (savedRequests) {
      try {
        const requests = JSON.parse(savedRequests);
        setUserRequests(
          requests.filter(
            (req: HelpRequest) => req.studentEmail === user?.email
          )
        );
      } catch (error) {
        console.error("Error loading requests:", error);
      }
    }
  }, [user?.email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);

    // Create new request
    const newRequest: HelpRequest = {
      id: Date.now().toString(),
      studentName: user.name,
      studentEmail: user.email,
      subject: formData.subject,
      description: formData.description,
      timestamp: new Date(),
      status: "pending",
    };

    // Save to localStorage (in a real app, this would be an API call)
    const existingRequests = JSON.parse(
      localStorage.getItem("allRequests") || "[]"
    );
    const updatedRequests = [newRequest, ...existingRequests];
    localStorage.setItem("allRequests", JSON.stringify(updatedRequests));

    // Update user's requests
    setUserRequests((prev) => [newRequest, ...prev]);

    // Reset form
    setFormData({ subject: "", description: "" });
    setSubmitSuccess(true);
    setIsSubmitting(false);

    // Hide success message after 3 seconds
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-yellow-400 bg-yellow-400/20";
      case "accepted":
        return "text-green-400 bg-green-400/20";
      case "completed":
        return "text-blue-400 bg-blue-400/20";
      default:
        return "text-gray-400 bg-gray-400/20";
    }
  };

  return (
    <>
      <Navigation />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
        <div className="container mx-auto px-6 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Send Help Request
            </h1>
            <p className="text-slate-300 text-lg">
              Hi {user?.name}! What do you need help with today?
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Request Form */}
            <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                Submit New Request
              </h2>

              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
                  <p className="text-green-400 font-medium">
                    ✅ Request submitted successfully!
                  </p>
                  <p className="text-green-300 text-sm mt-1">
                    Your request has been posted to the help feed.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-slate-300 mb-2">
                    Subject/Topic *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g., Calculus, JavaScript, History"
                    required
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-slate-300 mb-2">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe what you need help with in detail..."
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-cyan-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Request</span>
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* User's Requests */}
            <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                Your Requests
              </h2>

              {userRequests.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📝</div>
                  <p className="text-slate-400 text-lg">No requests yet</p>
                  <p className="text-slate-500 mt-2">
                    Submit your first help request to get started!
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {userRequests.map((request) => (
                    <div
                      key={request.id}
                      className="bg-slate-700/50 border border-slate-600 rounded-lg p-4 hover:border-cyan-400/50 transition-all">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-white">
                          {request.subject}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              request.status
                            )}`}>
                            {request.status}
                          </span>
                          <span className="text-xs text-slate-400">
                            {formatTimeAgo(new Date(request.timestamp))}
                          </span>
                        </div>
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {request.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SendRequest;

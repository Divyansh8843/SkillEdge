import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Preloader from "../components/Preloader";
import Navigation from "../components/Navigation";
import HelpRequestForm from "../components/HelpRequestForm";
import RequestFeed from "../components/RequestFeed";
import ContactModal from "../components/ContactModal";

interface HelpRequest {
  id: string;
  studentName: string;
  subject: string;
  description: string;
  timestamp: Date;
}

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [requests, setRequests] = useState<HelpRequest[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHelper, setSelectedHelper] = useState({ name: "", email: "" });
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    feedback: "",
  });
  const navigate = useNavigate();

  // Initialize with sample requests
  useEffect(() => {
    const sampleRequests: HelpRequest[] = [
      {
        id: "1",
        studentName: "Alex Chen",
        subject: "Calculus II",
        description:
          "Need help understanding integration by parts. Struggling with the formula application.",
        timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      },
      {
        id: "2",
        studentName: "Sarah Johnson",
        subject: "JavaScript",
        description:
          "Can someone explain async/await and promises? Getting confused with the syntax.",
        timestamp: new Date(Date.now() - 32 * 60 * 1000), // 32 minutes ago
      },
      {
        id: "3",
        studentName: "Mike Rodriguez",
        subject: "Chemistry",
        description:
          "Need help balancing chemical equations for my organic chemistry homework.",
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      },
    ];
    setRequests(sampleRequests);
  }, []);

  const handleNewRequest = (
    newRequest: Omit<HelpRequest, "id" | "timestamp">
  ) => {
    const request: HelpRequest = {
      ...newRequest,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setRequests((prev) => [request, ...prev]);
  };

  const handleAcceptRequest = (request: HelpRequest) => {
    // Simulate helper assignment
    const helpers = [
      { name: "Emma Wilson", email: "emma.wilson@college.edu" },
      { name: "David Kim", email: "david.kim@college.edu" },
      { name: "Lisa Thompson", email: "lisa.thompson@college.edu" },
    ];
    const randomHelper = helpers[Math.floor(Math.random() * helpers.length)];

    setSelectedHelper(randomHelper);
    setIsModalOpen(true);

    // Remove the accepted request from the list
    setRequests((prev) => prev.filter((r) => r.id !== request.id));
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    alert("Thank you for your feedback! We will get back to you soon.");
    setContactForm({ name: "", email: "", feedback: "" });
  };

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {!isLoading && (
        <>
          <Navigation />

          {/* Hero Section */}
          <section
            id="home"
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-16">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="text-center lg:text-left">
                  <h1 className="text-5xl lg:text-7xl font-bold mb-6">
                    <span className="block text-white">Collaborate.</span>
                    <span className="block text-white">Learn.</span>
                    <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                      Grow.
                    </span>
                  </h1>
                  <p className="text-xl text-slate-300 mb-8">
                    Peer-to-peer learning simplified.
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <button
                      onClick={() => navigate("/send-request")}
                      className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold py-4 px-8 rounded-lg hover:from-cyan-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-3">
                      <span>Send Request</span>
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                      </svg>
                    </button>

                    <button
                      onClick={() => navigate("/accept-request")}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold py-4 px-8 rounded-lg hover:from-green-600 hover:to-emerald-600 transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-3">
                      <span>Help Others</span>
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-80 h-80 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-full animate-pulse" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl">📚</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section id="how-it-works" className="py-20 bg-slate-800/50">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white mb-4">
                  How It Works
                </h2>
                <p className="text-slate-300 text-lg">
                  Simple steps to collaborative learning
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    icon: "➕",
                    title: "Submit Request",
                    description:
                      "Share what you need help with and let peers know your learning goals.",
                  },
                  {
                    icon: "📋",
                    title: "Browse Feed",
                    description:
                      "View live requests from fellow students in your learning community.",
                  },
                  {
                    icon: "🤝",
                    title: "Accept & Help",
                    description:
                      "Accept requests where you can help and connect with fellow learners.",
                  },
                  {
                    icon: "🎓",
                    title: "Learn Together",
                    description:
                      "Collaborate, share knowledge, and grow your skills together.",
                  },
                ].map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-slate-300">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Help Request Form */}
          <HelpRequestForm onSubmit={handleNewRequest} />

          {/* Live Request Feed */}
          <RequestFeed
            requests={requests}
            onAcceptRequest={handleAcceptRequest}
          />

          {/* About Section */}
          <section id="about" className="py-20 bg-slate-800/50">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl font-bold text-white mb-6">
                    About SkillEdge
                  </h2>
                  <p className="text-slate-300 text-lg mb-8">
                    We believe learning is better when shared. SkillEdge
                    connects students within your college community, making it
                    easy to find help and offer assistance.
                  </p>

                  <div className="space-y-4">
                    {[
                      { icon: "⚡", label: "Fast Connections" },
                      { icon: "🛡️", label: "Secure Platform" },
                      { icon: "👥", label: "Collaborative Learning" },
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="text-2xl">{feature.icon}</div>
                        <span className="text-slate-300 font-medium">
                          {feature.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-24 h-24 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 rounded-lg animate-pulse"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-20 bg-slate-900/50">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">
                  Contact & Feedback
                </h2>
                <p className="text-slate-300 text-lg">
                  We'd love to hear from you
                </p>
              </div>

              <div className="max-w-2xl mx-auto">
                <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="contactName"
                          className="block text-sm font-medium text-slate-300 mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          id="contactName"
                          value={contactForm.name}
                          onChange={(e) =>
                            setContactForm((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          required
                          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="contactEmail"
                          className="block text-sm font-medium text-slate-300 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          id="contactEmail"
                          value={contactForm.email}
                          onChange={(e) =>
                            setContactForm((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                          required
                          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="feedback"
                        className="block text-sm font-medium text-slate-300 mb-2">
                        Feedback
                      </label>
                      <textarea
                        id="feedback"
                        value={contactForm.feedback}
                        onChange={(e) =>
                          setContactForm((prev) => ({
                            ...prev,
                            feedback: e.target.value,
                          }))
                        }
                        placeholder="Share your thoughts..."
                        required
                        rows={4}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-cyan-600 hover:to-purple-600 transition-all duration-200 flex items-center justify-center gap-2">
                      <span>Send Feedback</span>
                      <span>❤️</span>
                    </button>
                  </form>
                </div>

                <div className="flex justify-center gap-6 mt-8">
                  <a
                    href="#"
                    className="text-slate-400 hover:text-cyan-400 transition-colors">
                    <svg
                      className="w-8 h-8"
                      fill="currentColor"
                      viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-cyan-400 transition-colors">
                    <svg
                      className="w-8 h-8"
                      fill="currentColor"
                      viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-12 bg-slate-900 border-t border-slate-800">
            <div className="container mx-auto px-6">
              <div className="text-center">
                <div className="mb-4">
                  <span className="text-2xl font-bold text-white">Skill</span>
                  <span className="text-2xl font-bold text-cyan-400">Edge</span>
                </div>
                <p className="text-slate-400">
                  &copy; 2024 SkillEdge. Empowering collaborative learning.
                </p>
              </div>
            </div>
          </footer>

          {/* Contact Modal */}
          <ContactModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            helperName={selectedHelper.name}
            helperEmail={selectedHelper.email}
          />
        </>
      )}
    </>
  );
};

export default Index;

import { useState } from "react";

interface HelpRequest {
  id: string;
  studentName: string;
  subject: string;
  description: string;
  timestamp: Date;
}

const HelpRequestForm = ({
  onSubmit,
}: {
  onSubmit: (request: Omit<HelpRequest, "id" | "timestamp">) => void;
}) => {
  const [formData, setFormData] = useState({
    studentName: "",
    subject: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ studentName: "", subject: "", description: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="py-16 bg-slate-800/50">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-2">
              Need Academic Help?
            </h3>
            <p className="text-slate-300 mb-6">
              Submit your request and connect with peers who can assist you.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="studentName"
                  className="block text-sm font-medium text-slate-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="studentName"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-slate-300 mb-2">
                  Subject/Topic
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
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe what you need help with..."
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-cyan-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2">
                <span>Submit Request</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HelpRequestForm;

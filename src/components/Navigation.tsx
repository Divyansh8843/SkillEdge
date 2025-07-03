import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { href: "/", label: "Home", type: "route" },
    { href: "#how-it-works", label: "How It Works", type: "scroll" },
    { href: "#about", label: "About", type: "scroll" },
    { href: "#contact", label: "Contact", type: "scroll" },
  ];

  const authenticatedNavItems = [
    { href: "/send-request", label: "Send Request", type: "route" },
    { href: "/accept-request", label: "Accept Request", type: "route" },
  ];

  const handleNavigation = (href: string, type: string) => {
    if (type === "route") {
      navigate(href);
    } else {
      // For scroll navigation, first navigate to home if not already there
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
    setIsMobileMenuOpen(false);
  };

  const handleAuthAction = (action: string) => {
    if (action === "login") {
      setShowAuthModal(true);
    } else {
      logout();
      navigate("/");
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div
              className="flex items-center cursor-pointer"
              onClick={() => navigate("/")}>
              <h1 className="text-2xl font-bold">
                <span className="text-white">Skill</span>
                <span className="text-cyan-400">Edge</span>
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavigation(item.href, item.type)}
                  className="text-slate-300 hover:text-cyan-400 transition-colors font-medium">
                  {item.label}
                </button>
              ))}

              {isAuthenticated &&
                authenticatedNavItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleNavigation(item.href, item.type)}
                    className="text-slate-300 hover:text-cyan-400 transition-colors font-medium">
                    {item.label}
                  </button>
                ))}
            </div>

            {/* Auth Section */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={user?.picture}
                      alt={user?.name}
                      className="w-8 h-8 rounded-full border-2 border-cyan-400"
                    />
                    <span className="text-white font-medium">{user?.name}</span>
                  </div>
                  <button
                    onClick={() => handleAuthAction("logout")}
                    className="text-slate-300 hover:text-red-400 transition-colors font-medium">
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleAuthAction("login")}
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-cyan-600 hover:to-purple-600 transition-all font-medium">
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-slate-300 hover:text-white transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 md:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed top-16 left-0 right-0 bg-slate-900 border-b border-slate-800 shadow-lg">
            <div className="container mx-auto px-6 py-4">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleNavigation(item.href, item.type)}
                    className="text-left text-slate-300 hover:text-cyan-400 transition-colors font-medium py-2">
                    {item.label}
                  </button>
                ))}

                {isAuthenticated &&
                  authenticatedNavItems.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => handleNavigation(item.href, item.type)}
                      className="text-left text-slate-300 hover:text-cyan-400 transition-colors font-medium py-2">
                      {item.label}
                    </button>
                  ))}

                <div className="border-t border-slate-700 pt-4">
                  {isAuthenticated ? (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <img
                          src={user?.picture}
                          alt={user?.name}
                          className="w-8 h-8 rounded-full border-2 border-cyan-400"
                        />
                        <span className="text-white font-medium">
                          {user?.name}
                        </span>
                      </div>
                      <button
                        onClick={() => handleAuthAction("logout")}
                        className="text-left text-red-400 hover:text-red-300 transition-colors font-medium py-2">
                        Logout
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleAuthAction("login")}
                      className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-cyan-600 hover:to-purple-600 transition-all font-medium">
                      Sign In
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowAuthModal(false)}
          />
          <div className="relative bg-slate-800 border border-slate-700 rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">
                Sign In to SkillEdge
              </h3>
              <button
                onClick={() => setShowAuthModal(false)}
                className="text-slate-400 hover:text-white transition-colors">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="text-center mb-6">
              <p className="text-slate-300 mb-4">
                Sign in with your Google account to send and accept help
                requests.
              </p>

              <GoogleAuth onSuccess={() => setShowAuthModal(false)} />
            </div>

            <div className="text-xs text-slate-500 text-center">
              By signing in, you agree to our terms of service and privacy
              policy.
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;

import { useState } from "react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  helperName: string;
  helperEmail: string;
}

const ContactModal = ({
  isOpen,
  onClose,
  helperName,
  helperEmail,
}: ContactModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-slate-800 border border-slate-700 rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white">
            Connection Established!
          </h3>
          <button
            onClick={onClose}
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

        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
            {helperName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h4 className="text-xl font-semibold text-white">{helperName}</h4>
            <p className="text-cyan-400">{helperEmail}</p>
          </div>
        </div>

        <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
          <p className="text-slate-300 text-center">
            🎉 Contact information has been sent to both parties!
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-slate-700 text-white py-3 px-4 rounded-lg hover:bg-slate-600 transition-colors">
            Close
          </button>
          <button
            onClick={() => (window.location.href = `mailto:${helperEmail}`)}
            className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-3 px-4 rounded-lg hover:from-cyan-600 hover:to-purple-600 transition-all">
            Send Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;

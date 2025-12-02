import { useEffect } from 'react';
import { X } from 'lucide-react';

export default function ReusableGlassModal({
  title,
  children,
  onClose,
  size = 'lg',
  icon
}) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = 'unset');
  }, []);

  useEffect(() => {
    const handleEscape = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const sizeClasses = {
    sm: 'max-w-lg',
    md: 'max-w-xl',
    lg: 'max-w-3xl',
    xl: 'max-w-4xl',
    '2xl': 'max-w-5xl',
    '3xl': 'max-w-6xl'
  };

  return (
    <div
      className="
        fixed inset-0 flex items-center justify-center 
        bg-gradient-to-br from-slate-900/80 via-blue-900/80 to-slate-900/80 
        backdrop-blur-md z-50 p-4 animate-fadeIn
      "
      onClick={onClose}
    >
      {/* Cercles decoratifs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                     w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

      {/* Carte Glass */}
      <div
        className={`
          relative w-full ${sizeClasses[size]}
          bg-gradient-to-br from-white/15 via-white/10 to-white/5 
          backdrop-blur-2xl rounded-3xl 
          border-2 border-white/20 
          shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] 
          max-h-[95vh] flex flex-col 
          overflow-hidden animate-slideUp
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Border glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/20 via-transparent to-purple-400/20 opacity-50 pointer-events-none"></div>

        {/* Header */}
        <div className="relative flex items-center justify-between p-6 pb-4 border-b border-white/10">
          <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg flex items-center gap-3">
            {icon && <span className="text-blue-400">{icon}</span>}
            {title}
          </h2>

          {/* Close */}
          <button
            onClick={onClose}
            className="group relative w-10 h-10 flex items-center justify-center rounded-full 
                     bg-white/10 hover:bg-red-500/20 
                     border border-white/20 hover:border-red-400/50
                     transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <X className="w-5 h-5 text-white group-hover:text-red-400 transition-colors" />
          </button>
        </div>

        {/* Content */}
        <div className="relative flex-1 p-6 overflow-y-auto hide-scrollbar">
          {children}
        </div>

        {/* Glow */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-900/30 to-transparent pointer-events-none rounded-b-3xl"></div>
      </div>

      {/* Animations + Scrollbar hide */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(50px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        /* ─── Scrollbars invisibles ────────────────────────── */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `}</style>
    </div>
  );
}

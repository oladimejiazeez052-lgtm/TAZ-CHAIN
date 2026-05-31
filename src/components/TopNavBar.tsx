import { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

interface TopNavBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenInquiry: () => void;
  onOpenConsultant: () => void;
}

export default function TopNavBar({
  activeTab,
  setActiveTab,
  onOpenInquiry,
  onOpenConsultant,
}: TopNavBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "portfolio", label: "Portfolio" },
    { id: "academy", label: "Coding Academy" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-md fixed top-0 w-full z-50 border-b border-gray-200/80 transition-all duration-300">
      <div className="flex justify-between items-center max-w-[1280px] mx-auto px-6 h-16">
        {/* Brand logo */}
        <button
          onClick={() => setActiveTab("home")}
          className="font-sans text-xl font-extrabold tracking-tight cursor-pointer focus:outline-none transition-transform hover:scale-[1.02] active:scale-95 flex items-center gap-1.5"
        >
          <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-500 bg-clip-text text-transparent">TAZ</span>
          <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent font-black">CHAIN</span>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 items-center">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`relative font-sans font-bold text-sm py-2 px-1 focus:outline-none transition-all duration-200 cursor-pointer ${
                activeTab === item.id
                  ? "text-violet-600"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {item.label}
              {activeTab === item.id && (
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-violet-600 via-fuchsia-500 to-rose-400 rounded-full" />
              )}
            </button>
          ))}
          <button
            onClick={onOpenConsultant}
            className="flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r from-pink-500/10 via-fuchsia-500/10 to-violet-500/10 text-fuchsia-700 border border-fuchsia-300 hover:from-fuchsia-600 hover:to-violet-600 hover:text-white hover:shadow-md hover:shadow-fuchsia-500/20 transition-all cursor-pointer"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 animate-ping" />
            AI Architect
          </button>
        </div>

        {/* CTA Actions */}
        <div className="hidden md:flex items-center space-x-3">
          <button
            onClick={onOpenInquiry}
            className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-500 text-white hover:opacity-95 font-sans font-bold text-sm px-6 py-2.5 rounded-lg shadow-md shadow-fuchsia-500/20 hover:shadow-lg transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-gray-700 p-2 focus:outline-none cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-gray-200 absolute top-16 left-0 w-full px-6 py-6 flex flex-col space-y-4 shadow-xl animate-fade-in z-50">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`text-left font-sans font-bold text-base py-2 border-b border-gray-100 focus:outline-none transition-colors last:border-b-0 cursor-pointer ${
                activeTab === item.id 
                  ? "text-violet-600 bg-gradient-to-r from-violet-500/5 to-transparent pl-2 rounded-l" 
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => {
              onOpenConsultant();
              setMobileMenuOpen(false);
            }}
            className="text-left font-sans font-bold text-base py-2 text-fuchsia-600 border-b border-gray-100 cursor-pointer bg-gradient-to-r from-fuchsia-500/5 to-transparent pl-2 rounded-l"
          >
            AI Architect Tool ✨
          </button>
          <button
            onClick={() => {
              onOpenInquiry();
              setMobileMenuOpen(false);
            }}
            className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-500 text-white font-sans font-bold text-sm py-3 px-4 rounded-lg w-full text-center cursor-pointer inline-flex items-center justify-center gap-1.5 shadow-md shadow-fuchsia-500/10"
          >
            Get Started <ArrowRight size={16} />
          </button>
        </div>
      )}
    </nav>
  );
}

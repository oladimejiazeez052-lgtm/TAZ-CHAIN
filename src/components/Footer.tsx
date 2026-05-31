import { Project } from "../types";

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onSelectProject?: (proj: Project) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  return (
    <footer className="w-full bg-slate-950 py-16 border-t border-fuchsia-500/20 text-white mt-auto relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-violet-600 via-fuchsia-500 to-rose-455 opacity-90" />
      <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        <div className="md:col-span-2">
          <div className="font-sans text-2xl font-black mb-4 flex items-center gap-1 select-none">
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">TAZ</span>
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">CHAIN</span>
          </div>
          <p className="text-gray-400 text-sm max-w-sm font-sans mb-4">
            Professional technical excellence, engineering enterprise architecture, scalably deployed infrastructure, and premium user experiences.
          </p>
          <p className="text-gray-500 text-xs">
            © 2026 TAZ CHAIN. All Rights Reserved. Professional Technical Excellence.
          </p>
        </div>

        <div>
          <h4 className="font-sans font-bold text-sm text-gray-200 uppercase tracking-wider mb-4">Solutions</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <button
                onClick={() => setActiveTab("home")}
                className="text-gray-400 hover:text-white hover:opacity-100 transition-all font-sans cursor-pointer focus:outline-none"
              >
                Services & Solutions
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("portfolio")}
                className="text-gray-400 hover:text-white hover:opacity-100 transition-all font-sans cursor-pointer focus:outline-none"
              >
                Our Technical Portfolio
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("academy")}
                className="text-gray-400 hover:text-white hover:opacity-100 transition-all font-sans cursor-pointer focus:outline-none"
              >
                Coding Academy for Kids
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-sans font-bold text-sm text-gray-200 uppercase tracking-wider mb-4">Legal</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="#" className="text-gray-400 hover:text-white hover:opacity-100 transition-all font-sans">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white hover:opacity-100 transition-all font-sans">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white hover:opacity-100 transition-all font-sans">
                Contact Global Node
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

import React, { useState, useEffect } from "react";
import {
  Globe,
  Users2,
  Package,
  Layers,
  Calendar,
  Settings2,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Cpu,
  ShieldAlert,
  MapPin,
  Mail,
  Phone,
  ArrowRight,
  Sparkles,
  Info,
  ChevronDown,
  Loader2,
  Award,
  BookOpen,
  MousePointerClick
} from "lucide-react";
import TopNavBar from "./components/TopNavBar";
import Footer from "./components/Footer";
import ProjectInquiryForm from "./components/ProjectInquiryForm";
import AIConsultant from "./components/AIConsultant";
import { PORTFOLIO_PROJECTS } from "./data";
import { Project, InquiryFormData } from "./types";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [isInquiryOpen, setIsInquiryOpen] = useState<boolean>(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Slideshow for Hero Background Photos (Big, Bold & Professional)
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const heroSlides = [
    "/src/assets/images/hero_illustration_1780258840139.png",
    "/src/assets/images/hero_ill_two_1780290909447.png",
    "/src/assets/images/hero_ill_three_1780290926773.png"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // States for Contact form page
  const [contactForm, setContactForm] = useState<InquiryFormData>({
    projectType: "web",
    budgetRange: "100k",
    timeline: "Standard",
    firstName: "",
    lastName: "",
    email: "",
    description: "",
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactErrors, setContactErrors] = useState<{ [key: string]: string }>({});

  // Active Portfolio filters state
  const [selectedCategory, setSelectedCategory] = useState<string>("All Projects");

  const filterCategories = ["All Projects", "Web Apps", "E-Commerce", "Dashboards", "Platforms"];

  const filteredProjects = selectedCategory === "All Projects"
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter(proj => proj.category === selectedCategory);

  // Handle Contact Submit
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};
    if (!contactForm.firstName.trim()) errors.firstName = "Name is required.";
    if (!contactForm.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(contactForm.email)) {
      errors.email = "Please input a valid work email.";
    }

    if (Object.keys(errors).length > 0) {
      setContactErrors(errors);
      return;
    }

    setContactSubmitted(true);
  };

  return (
    <div className="bg-[#F9FAFB] text-[#111827] min-h-screen flex flex-col font-sans antialiased overflow-x-hidden selection:bg-blue-100 selection:text-blue-700">
      {/* Top Navbar */}
      <TopNavBar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setActiveProject(null); // Reset detail page
        }}
        onOpenInquiry={() => setIsInquiryOpen(true)}
        onOpenConsultant={() => setActiveTab("ai-consultant")}
      />

      {/* Main Container Content */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {/* PROJECT DETAIL CASE STUDY MODE */}
          {activeProject ? (
            <motion.div
              key="detail"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.3 }}
              className="max-w-[1280px] mx-auto px-6 pt-24 pb-16 w-full"
            >
              {/* Breadcrumb back */}
              <button
                onClick={() => setActiveProject(null)}
                className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:underline mb-8 cursor-pointer focus:outline-none"
              >
                ← Back to List
              </button>

              <div className="mb-8">
                <span className="font-sans text-xs font-bold text-blue-600 uppercase tracking-wider mb-2 block">
                  Case Study • {activeProject.categoryLabel}
                </span>
                <h1 className="font-sans text-3xl md:text-5xl font-extrabold tracking-tight text-[#111827] mb-4">
                  {activeProject.title}
                </h1>
                <p className="font-sans text-base text-gray-600 max-w-4xl leading-relaxed">
                  {activeProject.description}
                </p>
              </div>

              {/* Specs parameters bar */}
              <div className="flex flex-wrap gap-8 mb-12 border-y border-gray-200 py-6">
                <div>
                  <span className="text-xs font-bold text-gray-500 block mb-1 uppercase tracking-wider">Client</span>
                  <span className="font-sans text-sm font-semibold text-[#111827]">{activeProject.client}</span>
                </div>
                <div className="sm:border-l sm:border-gray-200 sm:pl-8">
                  <span className="text-xs font-bold text-gray-500 block mb-1 uppercase tracking-wider">Timeline</span>
                  <span className="font-sans text-sm font-semibold text-[#111827]">{activeProject.timeline}</span>
                </div>
                <div className="sm:border-l sm:border-gray-200 sm:pl-8">
                  <span className="text-xs font-bold text-gray-500 block mb-1 uppercase tracking-wider">Taz Role</span>
                  <span className="font-sans text-sm font-semibold text-[#111827]">{activeProject.role}</span>
                </div>
              </div>

              {/* Pristine device frame preview */}
              <div className="w-full aspect-[21/9] h-[300px] md:h-[500px] bg-gray-50 rounded-xl overflow-hidden relative shadow-sm mb-12 border border-gray-200">
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="w-full h-full object-cover select-none"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-gray-950/80 to-transparent p-6 text-white flex justify-between items-end">
                  <div className="font-sans text-sm font-semibold opacity-95">Live System Mock-Up Reference</div>
                  <div className="text-xs bg-blue-600 text-white px-3 py-1 rounded-md font-bold">100% Deployed</div>
                </div>
              </div>

              {/* Challenge vs Solution bento columns */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
                <div className="lg:col-span-5 bg-white border border-gray-200 p-8 rounded-xl shadow-sm">
                  <div className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 border border-red-200 text-xs font-bold px-3 py-1 rounded-full mb-4">
                    <ShieldAlert size={14} />
                    The Challenge
                  </div>
                  <h3 className="font-sans text-xl font-bold text-gray-950 mb-4">Fragmented Systems & Process Latency</h3>
                  <p className="font-sans text-sm text-gray-600 leading-relaxed">
                    {activeProject.challenge}
                  </p>
                </div>

                <div className="lg:col-span-7 bg-white border border-gray-200 p-8 rounded-xl shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/25 rounded-bl-[100px]" />
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold px-3 py-1 rounded-full mb-4">
                      <Sparkles size={14} />
                      Taz Architectural Solution
                    </div>
                    <h3 className="font-sans text-xl font-bold text-gray-950 mb-4">A Unified cloud-native system</h3>
                    <p className="font-sans text-sm text-gray-600 mb-6 leading-relaxed">
                      {activeProject.solution}
                    </p>
                    <ul className="space-y-3">
                      {activeProject.solutionPoints.map((point, index) => (
                        <li key={index} className="flex items-center gap-2.5 text-sm font-semibold text-gray-900">
                          <CheckCircle2 size={16} className="text-blue-600" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Architectural foundations */}
              <div className="mb-12 bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
                <h3 className="font-sans text-xl font-bold text-gray-950 mb-6 text-center">Tech Foundations</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {activeProject.techStack.map((tech, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 border border-gray-200/50 rounded-lg p-4 flex items-center gap-3.5 hover:border-blue-300 hover:bg-white transition-all duration-200"
                    >
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                        <Cpu size={20} />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Sub-module</div>
                        <div className="font-sans text-sm font-semibold text-gray-900">{tech}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metrics Showcase indicators */}
              <div className="bg-neutral-950 text-white rounded-xl p-8 mb-12 shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                  {activeProject.metrics.map((metric, idx) => (
                    <div key={idx} className="border-l border-blue-500 pl-6">
                      <div className="text-3xl font-extrabold text-blue-400 mb-1">{metric.value}</div>
                      <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonial quote card */}
              <div className="bg-white border border-gray-200 rounded-xl p-8 max-w-3xl mx-auto text-center relative mb-12 shadow-sm text-gray-950">
                <span className="font-serif text-5xl text-blue-200 absolute top-4 left-6 select-none font-black block">“</span>
                <p className="font-sans text-base leading-relaxed text-gray-900 italic mb-6 relative z-10">
                  "{activeProject.testimonial.quote}"
                </p>
                <div className="flex flex-col items-center">
                  <img
                    src={activeProject.testimonial.avatar}
                    alt={activeProject.testimonial.author}
                    className="w-12 h-12 rounded-full object-cover border border-gray-200 mb-2"
                  />
                  <div className="text-sm font-bold text-gray-900">{activeProject.testimonial.author}</div>
                  <div className="text-xs text-gray-500">{activeProject.testimonial.role}</div>
                </div>
              </div>

              {/* Action and back bottom */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <button
                  onClick={() => setIsInquiryOpen(true)}
                  className="bg-blue-600 text-white font-sans font-medium text-sm px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-sm cursor-pointer"
                >
                  Book Scoping Consultation
                </button>
                <button
                  onClick={() => {
                    setActiveProject(null);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="border border-gray-200 text-gray-600 font-sans font-medium text-sm px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Return to Portfolio
                </button>
              </div>

            </motion.div>
          ) : activeTab === "home" ? (
            /* Tab 1: HOME PAGE (Digital Solutions For Growing Businesses) */
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pt-16 pb-16 flex flex-col"
            >
              {/* Hero Banner Section with Moving Background Illustration */}
              <section className="relative pt-20 pb-28 px-6 overflow-hidden flex items-center min-h-[640px] bg-gradient-to-br from-violet-100/40 via-fuchsia-50/20 to-orange-100/30 border-b border-gray-200">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-fuchsia-200/20 rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4 pointer-events-none z-0" />
                <div className="absolute bottom-0 left-10 w-[550px] h-[550px] bg-amber-200/20 rounded-full blur-3xl pointer-events-none z-0" />

                {/* Dynamic Floating Background Illustration with Ken Burns Slideshow (Big, Bold & Enterprise-Grade) */}
                <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[55%] xl:w-[60%] pointer-events-none select-none overflow-hidden z-0 flex items-center justify-center lg:justify-end lg:pr-6">
                  {/* Glowing background circles for depth */}
                  <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-violet-300/50 via-fuchsia-300/40 to-amber-300/40 rounded-full blur-3xl pointer-events-none transform translate-x-20 translate-y-10 animate-pulse" />
                  
                  {/* Layered images for a completely seamless crossfade with individual slow Ken Burns scale */}
                  {heroSlides.map((slide, idx) => {
                    const isActive = currentHeroSlide === idx;
                    return (
                      <motion.div
                        key={slide}
                        initial={{ opacity: 0 }}
                        animate={{ 
                          opacity: isActive ? 1 : 0,
                          scale: isActive ? [1.02, 1.09, 1.02] : 1.02,
                        }}
                        transition={{ 
                          opacity: { duration: 1.4, ease: "easeInOut" },
                          scale: { duration: 25, repeat: Infinity, ease: "linear" }
                        }}
                        className="absolute inset-0 flex items-center justify-center lg:justify-end p-4 sm:p-8 lg:p-12 w-full h-full opacity-20 sm:opacity-30 lg:opacity-100 transition-opacity duration-500"
                      >
                        <img
                          src={slide}
                          alt={`Digital Enterprise Solutions Slide ${idx + 1}`}
                          referrerPolicy="no-referrer"
                          className="w-[380px] h-[380px] sm:w-[480px] sm:h-[480px] md:w-[540px] md:h-[540px] lg:w-[640px] lg:h-[640px] xl:w-[760px] xl:h-[760px] object-contain relative z-10 select-none pointer-events-none filter hue-rotate-[10deg] saturate-[1.15] drop-shadow-2xl"
                        />
                      </motion.div>
                    );
                  })}

                  {/* Parallax drifting circular accent nodes to make the background feel alive */}
                  <motion.div
                    animate={{ y: [0, -25, 15, 0], x: [0, -12, 18, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute right-[22%] top-[30%] w-4 h-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 opacity-60 blur-[1px] hidden lg:block z-20"
                  />
                  <motion.div
                    animate={{ y: [0, 20, -18, 0], x: [0, 18, -12, 0] }}
                    transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute right-[32%] bottom-[25%] w-5 h-5 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 opacity-50 blur-[1px] hidden lg:block z-20"
                  />
                  <motion.div
                    animate={{ y: [0, -10, -25, 0], x: [0, -15, -8, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute right-[12%] bottom-[35%] w-3 h-3 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-400 opacity-60 blur-[1px] hidden lg:block z-20"
                  />
                  <motion.div
                    animate={{ y: [0, 22, -8, 0], rotate: [0, 180, 360] }}
                    transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                    className="absolute right-[18%] top-[18%] w-10 h-10 rounded-lg border border-fuchsia-500/20 bg-fuchsia-50/10 flex items-center justify-center opacity-80 hidden lg:flex z-20"
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-fuchsia-500/50 animate-ping" />
                  </motion.div>
                </div>

                <div className="max-w-[1280px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 pointer-events-none">
                  {/* Content grid - handles interactive clicks inside while keeping the design clean */}
                  <div className="lg:col-span-8 xl:col-span-7 space-y-6 pointer-events-auto">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500/10 to-orange-500/10 backdrop-blur-xs px-4 py-1.5 rounded-full w-max border border-fuchsia-200/60 shadow-xs">
                      <TrendingUp size={14} className="text-fuchsia-600 animate-pulse" />
                      <span className="font-sans text-xs font-bold bg-gradient-to-r from-violet-600 via-fuchsia-600 to-orange-600 bg-clip-text text-transparent uppercase tracking-wider">Enterprise-Grade Performance</span>
                    </div>
                    <h1 className="font-sans text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight select-none">
                      <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-500 bg-clip-text text-transparent">Digital Solutions</span> For <br />
                      <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent font-black">Growing Businesses</span>
                    </h1>
                    <p className="font-sans text-base sm:text-lg text-slate-700 max-w-2xl leading-relaxed font-medium">
                      We engineer robust, scalable systems that turn complex administrative workflows into seamless, high-fidelity digital platforms. Optimized for conversions, data consistency, and high speed.
                    </p>
                    <div className="flex flex-wrap items-center gap-4 pt-2">
                      <button
                        onClick={() => {
                          setActiveTab("portfolio");
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-500 text-white font-sans font-bold text-sm px-7 py-4 rounded-xl shadow-md shadow-fuchsia-500/15 hover:shadow-lg hover:shadow-fuchsia-500/20 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
                      >
                        Explore Solutions
                      </button>
                      <button
                        onClick={() => setIsInquiryOpen(true)}
                        className="bg-white hover:bg-orange-50 text-orange-750 border-2 border-orange-200/80 font-sans font-bold text-sm px-7 py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-95 cursor-pointer shadow-xs"
                      >
                        Request Consultation
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Bento Grid: Capabilities Section with Colorful Accent Cards */}
              <section className="py-24 px-6 bg-gradient-to-b from-slate-50 via-pink-50/10 to-violet-50/20 border-y border-gray-200">
                <div className="max-w-[1280px] mx-auto space-y-16">
                  <div className="max-w-3xl space-y-3">
                    <h2 className="font-sans text-2xl md:text-4xl font-extrabold text-slate-900">
                      Comprehensive <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent underline decoration-violet-300">Capabilities</span>
                    </h2>
                    <p className="font-sans text-sm md:text-base text-slate-700 font-medium">
                      Modular, custom-tailored systems designed to unify your workflow and accelerate growth.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* websites (Large Card) - Violet-Fuchsia theme */}
                    <div className="md:col-span-8 bg-gradient-to-br from-violet-500/10 via-fuchsia-500/5 to-white border border-violet-200/80 rounded-2xl p-8 shadow-xs flex flex-col justify-between group overflow-hidden relative min-h-[250px] transition-all hover:scale-[1.01] hover:shadow-md hover:border-violet-300">
                      <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-violet-400/20 to-fuchsia-400/20 rounded-bl-full pointer-events-none" />
                      <div className="w-12 h-12 rounded-xl bg-violet-600 text-white flex items-center justify-center mb-4 shrink-0 shadow-lg shadow-violet-500/20 transition-transform group-hover:rotate-6">
                        <Globe size={24} />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-violet-700 tracking-wider block mb-1">Interactive Web Fronts</span>
                        <h3 className="font-sans text-xl font-bold text-slate-950 mb-2">Business Websites</h3>
                        <p className="font-sans text-xs sm:text-sm text-slate-700 leading-relaxed max-w-xl font-medium">
                          High-fidelity, lightning-fast digital storefronts optimized for conversions and built on modern technical stacks to guarantee search viability.
                        </p>
                      </div>
                    </div>

                    {/* CRM system - Emerald theme */}
                    <div className="md:col-span-4 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-white border border-emerald-200/80 rounded-2xl p-8 shadow-xs flex flex-col justify-between group overflow-hidden relative min-h-[250px] transition-all hover:scale-[1.01] hover:shadow-md hover:border-emerald-300">
                      <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-bl-full pointer-events-none" />
                      <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-4 shrink-0 shadow-lg shadow-emerald-500/20 transition-transform group-hover:-rotate-6">
                        <Users2 size={24} />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider block mb-1">Automation pipelines</span>
                        <h3 className="font-sans text-lg font-bold text-slate-950 mb-2">CRM Systems</h3>
                        <p className="font-sans text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold">
                          Centralized relationship management systems tailored to your specific organizational pipelines.
                        </p>
                      </div>
                    </div>

                    {/* Inventory system - Orange/Amber theme */}
                    <div className="md:col-span-4 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-white border border-amber-200/80 rounded-2xl p-8 shadow-xs flex flex-col justify-between group overflow-hidden relative min-h-[250px] transition-all hover:scale-[1.01] hover:shadow-md hover:border-amber-300">
                      <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-bl-full pointer-events-none" />
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white flex items-center justify-center mb-4 shrink-0 shadow-lg shadow-amber-500/20 transition-transform group-hover:scale-105">
                        <Package size={24} />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider block mb-1">Real-time sync</span>
                        <h3 className="font-sans text-lg font-bold text-slate-950 mb-2">Inventory Tracking</h3>
                        <p className="font-sans text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold">
                          Real-time dispatch synchronization and automated restock logic to eliminate transaction bottlenecks.
                        </p>
                      </div>
                    </div>

                    {/* Customer Portal - Royal Indigo/Violet theme */}
                    <div className="md:col-span-4 bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-white border border-indigo-200/80 rounded-2xl p-8 shadow-xs flex flex-col justify-between group overflow-hidden relative min-h-[250px] transition-all hover:scale-[1.01] hover:shadow-md hover:border-indigo-300">
                      <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-indigo-400/20 to-violet-400/20 rounded-bl-full pointer-events-none" />
                      <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-4 shrink-0 shadow-lg shadow-indigo-500/20 transition-transform group-hover:translate-y-[-2px]">
                        <Layers size={24} />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-indigo-700 tracking-wider block mb-1">Encrypted nodes</span>
                        <h3 className="font-sans text-lg font-bold text-slate-950 mb-2">Secure Portals</h3>
                        <p className="font-sans text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold">
                          Self-service client environments that protect sensitive records while mitigating team support loads.
                        </p>
                      </div>
                    </div>

                    {/* Booking System - Coral/Rose theme */}
                    <div className="md:col-span-4 bg-gradient-to-br from-rose-500/10 via-pink-500/5 to-white border border-rose-200/80 rounded-2xl p-8 shadow-xs flex flex-col justify-between group overflow-hidden relative min-h-[250px] transition-all hover:scale-[1.01] hover:shadow-md hover:border-rose-300">
                      <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-rose-400/20 to-pink-400/20 rounded-bl-full pointer-events-none" />
                      <div className="w-12 h-12 rounded-xl bg-rose-500 text-white flex items-center justify-center mb-4 shrink-0 shadow-lg shadow-rose-500/20 transition-transform group-hover:rotate-12">
                        <Calendar size={24} />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-rose-700 tracking-wider block mb-1">Timezone Aligned</span>
                        <h3 className="font-sans text-lg font-bold text-slate-950 mb-2">Booking Software</h3>
                        <p className="font-sans text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold">
                          Frictionless scheduling engines with timezone sync algorithms and secure integration parameters.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Asymmetric Benefits section */}
              <section className="py-24 px-6 bg-white overflow-hidden">
                <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                  <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-6">
                    <h2 className="font-sans text-2xl md:text-4xl font-extrabold text-gray-950 tracking-tight">
                      Engineered for Velocity and Scale
                    </h2>
                    <p className="font-sans text-sm md:text-base text-gray-600 leading-relaxed">
                      We replace brittle legacy silos with highly cohesive, standardized infrastructures. Every API, service class, and front-facing component is engineered to operate transparently.
                    </p>
                    <button
                      onClick={() => setIsInquiryOpen(true)}
                      className="bg-gray-950 text-white font-sans font-semibold text-xs px-6 py-3 rounded-lg hover:bg-gray-800 select-none cursor-pointer duration-200"
                    >
                      Read Our Process Details
                    </button>
                  </div>

                  <div className="lg:col-span-7 space-y-6">
                    {[
                      { icon: <TrendingUp />, title: "Sub-Second Performance", desc: "Our Next.js setups and edge caching deploy guidelines deliver sub-second time-to-first-byte scores worldwide." },
                      { icon: <ShieldAlert />, title: "Institutional Security", desc: "Role-Based Access Control and SSL payload configurations protect your systems from data leaks by default." },
                      { icon: <Settings2 />, title: "Frictionless Sync Layers", desc: "Synchronize third-party API providers, Stripe accounts, or inventory databases without state conflicts." }
                    ].map((ben, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-xl border border-gray-200 p-6 flex gap-6 hover:shadow-xs transition-all duration-300">
                        <div className="p-3 bg-blue-50 text-blue-600 border border-blue-100 rounded-lg shrink-0 h-max">
                          {ben.icon}
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-sans text-base font-bold text-gray-950">{ben.title}</h3>
                          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{ben.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Founder Biography Section */}
              <section className="py-24 px-6 bg-gradient-to-br from-slate-50 via-violet-50/10 to-fuchsia-50/10 border-t border-gray-200 overflow-hidden relative">
                {/* Visual decorative ambient effects */}
                <div className="absolute top-1/4 right-0 w-80 h-80 bg-fuchsia-200/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-violet-200/15 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-[1280px] mx-auto relative z-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Biography details on the left */}
                    <div className="lg:col-span-7 space-y-6">
                      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 text-fuchsia-700 border border-fuchsia-200/80 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-505 animate-pulse" />
                        Meet the Founder
                      </div>
                      <h2 className="font-sans text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                        Architecting Excellence <br />
                        <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-500 bg-clip-text text-transparent font-black">With Data-Driven Rigor</span>
                      </h2>
                      <div className="font-sans text-slate-700 text-sm md:text-base leading-relaxed space-y-4 font-medium">
                        <p>
                          My name is <strong className="text-slate-950 font-bold">Tajudeen Azeez Olanrewaju</strong>. I am the Lead Developer and AI Architect behind TazChain, where we engineer robust digital ecosystems for growing businesses. With a professional foundation in biochemistry, I bring a unique, data-driven approach to technical architecture.
                        </p>
                        <p>
                          At TazChain, I specialize in developing high-fidelity web platforms and custom automation pipelines designed for speed, consistency, and conversion. My work is dedicated to providing technical excellence—from complex administrative workflows to bespoke coding mentorship—ensuring that every solution we deploy is built for enterprise-grade performance.
                        </p>
                        <p>
                          Today, I bridge those worlds to architect enterprise-grade digital systems. Whether I am building high-performance web storefronts, optimizing automated CRM pipelines, or fostering the next generation of coders through our Unified Learning Environments, my mission is the same: transforming complex challenges into seamless, scalable growth for your business.
                        </p>
                      </div>

                      {/* Achievements stats under the bio */}
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-violet-100">
                        <div>
                          <span className="text-xs text-slate-500 font-bold block uppercase tracking-wider">SPECIALIZATION</span>
                          <span className="font-sans text-sm font-extrabold text-slate-900 block mt-1">AI & Web Architect</span>
                        </div>
                        <div>
                          <span className="text-xs text-slate-500 font-bold block uppercase tracking-wider">FOUNDATION</span>
                          <span className="font-sans text-sm font-extrabold text-slate-900 block mt-1">Biochemistry & Systems</span>
                        </div>
                        <div>
                          <span className="text-xs text-slate-500 font-bold block uppercase tracking-wider">MISSION</span>
                          <span className="font-sans text-sm font-extrabold text-slate-900 block mt-1">Enterprise Scalability</span>
                        </div>
                      </div>
                    </div>

                    {/* Picture on the right hand side */}
                    <div className="lg:col-span-5 flex justify-center">
                      <div className="relative group max-w-[400px] w-full">
                        {/* Glowing backdrop border line */}
                        <div className="absolute -inset-1.5 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-500 rounded-2xl blur-md opacity-25 group-hover:opacity-45 transition-opacity duration-500" />
                        
                        {/* Perfect container frame */}
                        <div className="relative bg-white rounded-2xl p-2.5 shadow-xl border border-violet-200/50 overflow-hidden">
                          <div className="rounded-xl overflow-hidden aspect-[3/4] relative bg-slate-50">
                            <img
                              src="/src/assets/images/tajudeen_portrait_1780292508469.png"
                              alt="Tajudeen Azeez Olanrewaju"
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                              referrerPolicy="no-referrer"
                            />
                            {/* Linear elegant bottom gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-90" />
                            
                            {/* Portrait info banner */}
                            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3.5 rounded-xl border border-violet-100/50 shadow-lg">
                              <div className="font-sans text-sm font-black text-slate-900">Tajudeen Azeez Olanrewaju</div>
                              <div className="flex items-center justify-between mt-0.5">
                                <span className="text-[10px] text-fuchsia-700 font-extrabold uppercase tracking-wider">Lead Developer & AI Architect</span>
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Proven Impact case studies list section */}
              <section className="py-24 px-6 bg-white border-t border-gray-200">
                <div className="max-w-[1280px] mx-auto space-y-12">
                  <div className="flex flex-wrap justify-between items-end gap-x-6 gap-y-4">
                    <div className="max-w-2xl space-y-2">
                      <h2 className="font-sans text-2xl md:text-4xl font-extrabold text-gray-950">Proven Impact</h2>
                      <p className="font-sans text-sm text-gray-600">
                        Examine how our system layouts directly solve transaction limits across real schools and logistics agencies.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setActiveTab("portfolio");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="text-blue-600 font-sans font-bold text-sm flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      View Full Portfolio <ChevronRight size={16} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {PORTFOLIO_PROJECTS.slice(0, 2).map((proj) => (
                      <div
                        key={proj.id}
                        onClick={() => {
                          setActiveProject(proj);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                      >
                        <div className="h-64 overflow-hidden relative bg-[#ededf9] aspect-video">
                          <img
                            src={proj.image}
                            alt={proj.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 select-none"
                          />
                        </div>
                        <div className="p-6 space-y-2">
                          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">{proj.categoryLabel}</span>
                          <h3 className="font-sans text-base sm:text-lg font-bold text-gray-950 tracking-tight">{proj.title}</h3>
                          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-2">{proj.description}</p>
                          <div className="pt-4 flex items-center gap-1 text-xs font-bold text-blue-600">
                            View Case Study Metrics <ChevronRight size={14} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Bottom CTA Block with Colorful High-Energy Backdrop */}
              <section className="py-20 px-6 max-w-[1280px] mx-auto w-full">
                <div className="bg-gradient-to-r from-violet-700 via-fuchsia-700 to-rose-600 text-white rounded-3xl p-8 md:p-14 text-center flex flex-col items-center relative overflow-hidden shadow-xl shadow-fuchsia-950/10 border border-fuchsia-500/30">
                  {/* Absolute backdrop overlays to elevate depth */}
                  <div className="absolute -top-10 -left-10 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
                  <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-amber-400/20 rounded-full blur-2xl" />
                  
                  <div className="relative z-10 max-w-2xl space-y-6">
                    <span className="bg-white/15 text-white/95 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest border border-white/20 select-none inline-block">
                      Let's collaborate
                    </span>
                    <h2 className="font-sans text-3xl md:text-4xl font-black text-white leading-tight">
                      Ready to scale your next digital infrastructure?
                    </h2>
                    <p className="text-pink-100 text-xs sm:text-sm md:text-base leading-relaxed font-medium">
                      Book an architecture session directly. Let our engineers translate system diagrams into pristine, highly-colorful functional codebases.
                    </p>
                    <button
                      onClick={() => setIsInquiryOpen(true)}
                      className="bg-white hover:bg-amber-100 text-violet-950 font-sans font-bold text-xs sm:text-sm px-8 py-4 rounded-xl transition-all hover:scale-[1.03] active:scale-95 shadow-lg shadow-violet-950/20 cursor-pointer"
                    >
                      Book Scoping Consultation Now ✨
                    </button>
                  </div>
                </div>
              </section>
            </motion.div>
          ) : activeTab === "services" ? (
            /* Tab 2: SERVICES - SCHOOL SOLUTIONS (Education Technology focus) */
            <motion.div
              key="services"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pt-24 pb-16 px-6 max-w-[1280px] mx-auto w-full space-y-16"
            >
              <section className="text-center max-w-3xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-rose-500/10 text-fuchsia-700 border border-fuchsia-200/80 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 animate-pulse" />
                  Educational technology Division
                </div>
                <h1 className="font-sans text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 select-none leading-tight">
                  Technology Solutions For <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-500 bg-clip-text text-transparent">Modern Education</span>
                </h1>
                <p className="font-sans text-base text-slate-700 font-medium leading-relaxed">
                  Empowering institutional excellence through bespoke digital frameworks. From secure student logs to robust automated scoring systems, we compile reliability at scale.
                </p>
              </section>

              {/* Bento Grid layout representing our premium education modular systems */}
              <section className="bg-white rounded-3xl border border-violet-100 p-8 md:p-12 shadow-md shadow-fuchsia-500/5">
                <h2 className="font-sans text-2xl font-bold text-slate-900 mb-8 text-center sm:text-left bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                  Comprehensive Academic Infrastructure
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { title: "School Websites", desc: "Speed-optimized CMS frameworks with customized, eye-safe event sections for prospective guardians.", color: "from-violet-500 to-fuchsia-500 bg-violet-50 text-violet-700 border-violet-100 hover:border-violet-300" },
                    { title: "Admission Portals", desc: "Role-based verification dashboards that secure applicant records and automate fee tracking.", color: "from-fuchsia-500 to-rose-500 bg-fuchsia-50 text-fuchsia-700 border-fuchsia-100 hover:border-fuchsia-300" },
                    { title: "Student Portals", desc: "Centralized schedules and grade registers with atomic transaction limits per classroom node.", color: "from-rose-500 to-orange-500 bg-rose-50 text-rose-700 border-rose-100 hover:border-rose-300" },
                    { title: "Attendance Logs", desc: "Sync logs integrating RFID registers to dispatch real-time absence alerts to guardians instantly.", color: "from-emerald-500 to-teal-500 bg-emerald-50 text-emerald-700 border-emerald-100 hover:border-emerald-300" },
                    { title: "Result Management", desc: "Highly secure grading databases with complex math logic and automatic report card render streams.", color: "from-indigo-500 to-violet-500 bg-indigo-50 text-indigo-700 border-indigo-100 hover:border-indigo-300" },
                    { title: "E-Learning Integrations", desc: "Bespoke learning platforms allowing localized lecture video hosting, tests, and course rosters.", color: "from-amber-500 to-orange-500 bg-amber-50 text-amber-700 border-amber-100 hover:border-amber-300" }
                  ].map((srv, idx) => (
                    <div
                      key={idx}
                      className={`bg-slate-50/60 rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${srv.color.split(" ").slice(-2).join(" ")}`}
                    >
                      <div>
                        <span className={`w-10 h-10 rounded-xl bg-gradient-to-r ${srv.color.split(" ").slice(0, 3).join(" ")} text-white font-bold text-sm flex items-center justify-center mb-4 shadow-sm`}>
                          0{idx + 1}
                        </span>
                        <h3 className="font-sans text-base font-bold text-slate-900 mb-2">{srv.title}</h3>
                        <p className="text-xs text-slate-600 leading-relaxed font-semibold">{srv.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Dynamic EduChain case study highlighted block with Colorful parameters */}
              <section className="bg-gradient-to-br from-violet-950 via-slate-950 to-fuchsia-950 rounded-3xl overflow-hidden p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-white relative border border-fuchsia-500/20 shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="space-y-4 max-w-xl text-center md:text-left z-10 font-sans">
                  <span className="text-[10px] font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent uppercase tracking-widest block font-sans">★ Featured Education Tech case study</span>
                  <h3 className="font-sans text-2xl md:text-3xl font-black tracking-tight text-white leading-tight">
                    EduChain School Portal Architecture
                  </h3>
                  <p className="text-xs md:text-sm text-fuchsia-100/80 leading-relaxed font-sans font-medium">
                     Read how we consolidated six brittle software modules into a unified PostgreSQL-backed environment for EduCore Systems, improving daily staff workloads by 40% natively.
                  </p>
                  <div className="flex gap-6 justify-center md:justify-start pt-2">
                    <div className="border-l-2 border-fuchsia-500 pl-4">
                      <span className="text-2xl font-black bg-gradient-to-r from-pink-400 to-rose-450 bg-clip-text text-transparent block">40%</span>
                      <span className="text-[9px] text-zinc-400 uppercase font-bold tracking-wider">Workflow saved</span>
                    </div>
                    <div className="border-l-2 border-amber-500 pl-4">
                      <span className="text-2xl font-black bg-gradient-to-r from-amber-400 to-orange-450 bg-clip-text text-transparent block">99.9%</span>
                      <span className="text-[9px] text-zinc-400 uppercase font-bold tracking-wider">Uptime logged</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    const eduProj = PORTFOLIO_PROJECTS.find(p => p.id === "educhain");
                    if (eduProj) {
                      setActiveProject(eduProj);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-rose-500 text-white font-sans font-bold text-sm px-7 py-4 rounded-xl shadow-lg shadow-fuchsia-500/20 hover:opacity-95 select-none hover:scale-[1.03] active:scale-95 shrink-0 cursor-pointer transition-all z-10"
                >
                  Read Case Study Details →
                </button>
              </section>
            </motion.div>
          ) : activeTab === "portfolio" ? (
            /* Tab 3: PORTFOLIO - OUR WORK */
            <motion.div
              key="portfolio"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pt-24 pb-16 px-6 max-w-[1280px] mx-auto w-full space-y-12"
            >
              <section className="text-center md:text-left max-w-2xl">
                <h1 className="font-sans text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
                  Our <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-500 bg-clip-text text-transparent">Work Portfolio</span>
                </h1>
                <p className="font-sans text-base text-slate-700 font-medium">
                  A curated selection of technical solutions engineered for scale, performance, and institutional reliability.
                </p>
              </section>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-2.5 py-4 border-b border-violet-100">
                {filterCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`font-sans font-extrabold text-xs px-5 py-2.5 rounded-full cursor-pointer transition-all border select-none ${
                      selectedCategory === cat
                        ? "bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-500 text-white border-transparent shadow-md shadow-fuchsia-500/15 animate-fade-in hover:opacity-95"
                        : "bg-white text-slate-700 border-gray-250 hover:bg-violet-50/50 hover:text-violet-600 hover:border-violet-300"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Projects list */}
              {filteredProjects.length === 0 ? (
                <div className="py-20 text-center font-sans text-slate-500 italic text-sm">
                  No projects match the selected category.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProjects.map((proj) => (
                    <div
                      key={proj.id}
                      onClick={() => {
                        setActiveProject(proj);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col group cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-fuchsia-500/5 hover:border-fuchsia-350"
                    >
                      {/* image aspect banner */}
                      <div className="h-52 overflow-hidden relative bg-slate-55 shadow-inner">
                        <img
                          src={proj.image}
                          alt={proj.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 select-none"
                        />
                        <span className="absolute top-3 right-3 bg-gradient-to-r from-violet-500/90 to-fuchsia-500/90 backdrop-blur-xs px-3.5 py-1 rounded-full text-[9px] font-extrabold text-white tracking-widest uppercase shadow-md select-none">
                          {proj.categoryLabel}
                        </span>
                      </div>

                      {/* content block */}
                      <div className="p-6 flex-grow flex flex-col justify-between gap-4">
                        <div className="space-y-2">
                          <h3 className="font-sans text-base sm:text-lg font-bold text-slate-900 tracking-tight group-hover:text-fuchsia-600 transition-colors">{proj.title}</h3>
                          <p className="text-xs text-slate-650 leading-relaxed font-semibold line-clamp-3">{proj.description}</p>
                        </div>

                        <div className="pt-4 border-t border-gray-100 flex flex-col gap-2.5 text-xs text-slate-700 font-bold">
                          <div className="flex items-center gap-1.5 truncate">
                            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500" />
                            {proj.techStack.join(", ")}
                          </div>
                          {proj.id === "educhain" && (
                            <div className="text-[10px] font-black text-rose-600 uppercase tracking-wider flex items-center gap-1 italic select-none">
                              ⭐ Custom School Audit Integrated
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ) : activeTab === "academy" ? (
            /* Tab 4: CODING ACADEMY (Kids Learn) */
            <motion.div
              key="academy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pt-24 pb-16 px-6 max-w-[1280px] mx-auto w-full space-y-16 animate-fade-in"
            >
              <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-550/10 via-emerald-550/10 to-amber-550/10 text-teal-700 px-4 py-1.5 rounded-full border border-teal-200 text-xs font-bold uppercase tracking-wider shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-550 animate-ping" />
                    Taz Chain Education Node
                  </div>
                  <h1 className="font-sans text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight select-none">
                    Coding For Kids <br />
                    <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent font-black">Building Future Tech Talent</span>
                  </h1>
                  <p className="font-sans text-base text-slate-700 font-medium">
                    Equip your children with standard coding frameworks. We translate analytical problem solving into accessible, gamified course tracks run by certified mentors.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-2">
                    <button
                      onClick={() => setIsInquiryOpen(true)}
                      className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-sans font-bold text-sm px-7 py-3.5 rounded-xl shadow-md shadow-teal-500/20 hover:shadow-lg transition-all hover:scale-[1.02] active:scale-95 cursor-pointer inline-flex items-center gap-1.5"
                    >
                      Explore Programs <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                {/* illustration banner block with Colorful outline overlay */}
                <div className="h-[350px] lg:h-[450px] bg-gradient-to-br from-teal-100 to-orange-100 rounded-3xl p-1.5 overflow-hidden relative shadow-md border border-teal-200/50">
                  <div className="w-full h-full rounded-[20px] overflow-hidden relative bg-white">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzdWTEikBVjVXc2mH1huoo1mzz_8RolfmB6CRIvbys5Wk36IF0AdheEgKN3cmzrL1VBgriyNCdUKxftALQZkNYem8Es4NdP8g1zXNaDglSRQdoR9PwJomURs4Oy30su7EZhOQZBH0xgt9q8NQvUa1-cU80a5iaBiM9YGllmLCNKnfJV2SjXi-Ir7o4xE_2-xHFLPdyEpnxBRfvmUupdSaaeM0y9Yl00dK-YokAJR1HcKOInKtfl1Teb1G9Uu3J0zKhmS9DSeX1aQ"
                      alt="Students learn technology"
                      className="w-full h-full object-cover select-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/30 to-transparent" />
                  </div>
                </div>
              </section>

              {/* Bento Grid logic with Bright Kids Tech tones */}
              <section className="space-y-12">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <h2 className="font-sans text-2xl md:text-3xl font-extrabold text-slate-900">What Children Learn</h2>
                  <p className="font-sans text-xs sm:text-sm text-slate-700 font-medium">
                    A secure tech-stack curriculum designed to build mathematical, coding foundations.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  <div className="md:col-span-8 bg-gradient-to-br from-fuchsia-500/10 to-white border border-fuchsia-200 rounded-2xl p-8 shadow-xs flex flex-col justify-between group relative overflow-hidden min-h-[220px] transition-all hover:shadow-md hover:border-fuchsia-300">
                    <span className="w-12 h-8 rounded-lg bg-fuchsia-100 text-fuchsia-700 border border-fuchsia-200 flex items-center justify-center font-bold text-xs shrink-0 mb-4 font-mono select-none">
                      Web
                    </span>
                    <div>
                      <h3 className="font-sans text-lg font-bold text-slate-950 mb-2">Web Development</h3>
                      <p className="font-sans text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold">
                        Building responsive layouts from scratch using HTML5 registers and CSS variables, advancing into JavaScript events and React layouts.
                      </p>
                    </div>
                  </div>

                  <div className="md:col-span-4 bg-gradient-to-br from-indigo-900 to-slate-900 text-white border border-indigo-700 rounded-2xl p-8 shadow-xs flex flex-col justify-between group relative overflow-hidden min-h-[220px] transition-all hover:shadow-md hover:border-indigo-500">
                    <span className="w-12 h-8 rounded-lg bg-indigo-500/30 text-indigo-200 flex items-center justify-center font-bold text-xs shrink-0 mb-4 font-mono select-none">
                      Game
                    </span>
                    <div>
                      <h3 className="font-sans text-lg font-bold text-white mb-2">Game Design</h3>
                      <p className="font-sans text-xs text-indigo-100 leading-relaxed font-medium">
                        Compiling interactive rendering, physics registers, loop coordination, and customized sprite assets.
                      </p>
                    </div>
                  </div>

                  <div className="md:col-span-6 bg-gradient-to-br from-amber-500/10 to-white border border-amber-200 rounded-2xl p-6 shadow-xs transition-all hover:shadow-md hover:border-amber-300">
                    <h3 className="font-sans text-base font-bold text-slate-950 mb-1.5 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      Computational Logic
                    </h3>
                    <p className="text-xs text-slate-700 leading-relaxed font-sans font-semibold">Developing sequential debugging strategies, data registers reasoning, and mathematical algorithms.</p>
                  </div>

                  <div className="md:col-span-6 bg-gradient-to-br from-emerald-500/10 to-white border border-emerald-200 rounded-2xl p-6 shadow-xs transition-all hover:shadow-md hover:border-emerald-300">
                    <h3 className="font-sans text-base font-bold text-slate-950 mb-1.5 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Fundamentals
                    </h3>
                    <p className="text-xs text-slate-700 leading-relaxed font-sans font-semibold">Introducing arrays, functional encapsulation variables, loops structures, and parameters mapping.</p>
                  </div>
                </div>
              </section>

              {/* Classroom environments comparison */}
              <section className="bg-gradient-to-br from-slate-50 via-teal-50/10 to-emerald-50/10 rounded-2xl border border-teal-200/60 p-8 space-y-8">
                <div className="text-center space-y-2 max-w-xl mx-auto">
                  <h3 className="font-sans text-xl font-extrabold text-slate-900">Unified Learning Environments</h3>
                  <p className="text-xs text-slate-700 font-semibold">Select the class parameters that align with your child's pace.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white border border-violet-100 rounded-2xl p-6 flex flex-col gap-4 shadow-sm transition-all hover:scale-[1.01] hover:border-violet-300">
                    <h4 className="font-sans text-base font-bold text-slate-950 flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-violet-600 animate-pulse" />
                      Virtual Classrooms
                    </h4>
                    <p className="text-xs text-slate-700 font-semibold">Interactive group grids led by certified, live instructors with real-time remote debugging sync. Caps at 6 students.</p>
                  </div>
                  <div className="bg-white border border-teal-100 rounded-2xl p-6 flex flex-col gap-4 shadow-sm transition-all hover:scale-[1.01] hover:border-teal-300">
                    <h4 className="font-sans text-base font-bold text-slate-950 flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-teal-600 animate-pulse" />
                      In-Person Labs
                    </h4>
                    <p className="text-xs text-slate-700 font-semibold">Direct mentorship at physical hubs. Promotes physical computing kits (microcontrollers, motors) and peer programming.</p>
                  </div>
                </div>
              </section>
            </motion.div>
          ) : activeTab === "contact" ? (
            /* Tab 5: CONTACT PAGE */
            <motion.div
              key="contact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pt-24 pb-16 px-6 max-w-[1280px] mx-auto w-full space-y-16 animate-fade-in"
            >
              <section className="max-w-2xl">
                <h1 className="font-sans text-3xl md:text-4xl font-extrabold tracking-tight text-gray-950 mb-3 block">
                  Let's build the exceptional.
                </h1>
                <p className="font-sans text-base text-gray-600 leading-relaxed">
                  Whether scaling system architectures, migrating databases, or modernizing local workflows, TAZ CHAIN has elite tech specialists ready to partner.
                </p>
              </section>

              {/* Info vs Form container */}
              <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                {/* Left side maps */}
                <div className="lg:col-span-5 flex flex-col gap-8">
                  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-6">
                    <h2 className="font-sans text-lg font-bold text-gray-950 mb-2 border-b border-gray-100 pb-2">Direct lines</h2>
                    
                    <div className="flex gap-4 items-start">
                      <Mail className="text-violet-600 shrink-0 mt-0.5" size={18} />
                      <div>
                        <span className="text-[10px] font-bold text-gray-500 uppercase block mb-0.5">Email</span>
                        <span className="font-sans text-sm font-bold text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text select-all">oladimejiazeez052@gmail.com</span>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start">
                      <Phone className="text-fuchsia-600 shrink-0 mt-0.5" size={18} />
                      <div>
                        <span className="text-[10px] font-bold text-gray-500 uppercase block mb-0.5">Phone</span>
                        <span className="font-sans text-sm font-bold text-transparent bg-gradient-to-r from-fuchsia-600 to-rose-500 bg-clip-text select-all">08109408629</span>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start">
                      <MapPin className="text-amber-500 shrink-0 mt-0.5" size={18} />
                      <div>
                        <span className="text-[10px] font-bold text-gray-500 uppercase block mb-0.5">Location</span>
                        <p className="font-sans text-sm font-bold text-transparent bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text select-all">
                          Lagos, Nigeria
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* minimall map placeholder */}
                  <div className="bg-gray-100 rounded-xl overflow-hidden h-64 relative border border-gray-200 shadow-sm flex items-center justify-center">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAACQBR683VLjrbktCgbOYvvoD1upHff4VzojQEoKMPazduCa0YpYEWwMDDetgrwBxS7PtAGu2vYVd-KdL_JVC16topHkIYcWttFz4cmtcPEwcszU6ogi_aJ6Pp-LvWbqhmHK6k6Vc0x94nGO_euXDlGq_luTzEJubvZmiztY2sh3yYuYsdVbrbbmZs1vVaB6Gu0K3gy7tgEI1yHPel26TLYrtJOFec7I9KK5f5EUDUVtUcz1-cUeWxF8rxhXHKRJ2kHJkusGNGBg"
                      alt="HQ location Map"
                      className="w-full h-full object-cover select-none"
                    />
                    <div className="absolute bg-white py-2 px-4 rounded-lg border border-gray-200 shadow-sm flex items-center gap-1.5 animate-bounce">
                      <span className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-ping" />
                      <span className="font-sans text-[11px] font-bold text-gray-900">San Francisco Node</span>
                    </div>
                  </div>
                </div>

                {/* Right side form */}
                <div className="lg:col-span-7 bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                  {!contactSubmitted ? (
                    <form onSubmit={handleContactSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">First Name *</label>
                          <input
                            type="text"
                            required
                            value={contactForm.firstName}
                            onChange={(e) => {
                              setContactForm({ ...contactForm, firstName: e.target.value });
                              if (contactErrors.firstName) setContactErrors({ ...contactErrors, firstName: "" });
                            }}
                            placeholder="Sarah"
                            className="w-full bg-white border border-gray-250 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-600 transition-all font-sans"
                          />
                          {contactErrors.firstName && <span className="text-xs text-red-600 mt-1">{contactErrors.firstName}</span>}
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Last Name *</label>
                          <input
                            type="text"
                            value={contactForm.lastName}
                            onChange={(e) => setContactForm({ ...contactForm, lastName: e.target.value })}
                            placeholder="Jenkins"
                            className="w-full bg-white border border-gray-250 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-600 transition-all font-sans"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Work Email *</label>
                        <input
                          type="email"
                          required
                          value={contactForm.email}
                          onChange={(e) => {
                            setContactForm({ ...contactForm, email: e.target.value });
                            if (contactErrors.email) setContactErrors({ ...contactErrors, email: "" });
                          }}
                          placeholder="sarah@educore.system"
                          className="w-full bg-white border border-gray-250 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-600 transition-all font-sans"
                        />
                        {contactErrors.email && <span className="text-xs text-red-600 mt-1">{contactErrors.email}</span>}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Business Type</label>
                          <select
                            value={contactForm.projectType}
                            onChange={(e) => setContactForm({ ...contactForm, projectType: e.target.value })}
                            className="w-full bg-white border border-gray-250 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-600 transition-all font-sans"
                          >
                            <option value="enterprise">Enterprise Core</option>
                            <option value="scale">SaaS Startup</option>
                            <option value="agency">Integrations Agency</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Target Budget</label>
                          <select
                            value={contactForm.budgetRange}
                            onChange={(e) => setContactForm({ ...contactForm, budgetRange: e.target.value })}
                            className="w-full bg-white border border-gray-250 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-600 transition-all font-sans"
                          >
                            <option value="10k">$10k - $50k</option>
                            <option value="100k">$50k - $150k</option>
                            <option value="150k">$150k+</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Goals & Objectives</label>
                        <textarea
                          value={contactForm.description}
                          onChange={(e) => setContactForm({ ...contactForm, description: e.target.value })}
                          placeholder="Briefly state your desired features or current process blocks..."
                          rows={4}
                          className="w-full bg-white border border-gray-250 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-600 transition-all resize-none font-sans"
                        />
                      </div>

                      <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-sans font-medium text-sm px-6 py-3 rounded-lg transition-colors shadow-sm cursor-pointer block w-full text-center"
                      >
                        Submit Consultation Request
                      </button>
                    </form>
                  ) : (
                    /* Inquiry Submitted success state screen from mockup */
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12 flex flex-col items-center justify-center border border-gray-200 bg-gray-50 rounded-xl p-8"
                    >
                      <CheckCircle2 className="text-blue-600 mb-4 animate-fade-in" size={48} />
                      <h3 className="font-sans text-xl font-bold text-gray-950 mb-2">Inquiry Submitted Successfully</h3>
                      <p className="font-sans text-gray-600 text-xs sm:text-sm leading-relaxed max-w-md mb-6">
                        Your technical parameters have been securely piped down to our San Francisco architectural Board. Expect a response calendar invite sent to <strong className="text-gray-950">{contactForm.email}</strong> within 24 business hours.
                      </p>
                      <button
                        onClick={() => {
                          setContactSubmitted(false);
                          setContactForm({
                            projectType: "web",
                            budgetRange: "100k",
                            timeline: "Standard",
                            firstName: "",
                            lastName: "",
                            email: "",
                            description: "",
                          });
                        }}
                        className="border border-gray-250 text-xs font-semibold text-gray-650 px-4 py-2.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer focus:outline-none"
                      >
                        Submit another request
                      </button>
                    </motion.div>
                  )}
                </div>
              </section>
            </motion.div>
          ) : activeTab === "ai-consultant" ? (
            /* Tab 6: AI PROJECT CONSULTANT PLAYGROUND */
            <motion.div
              key="ai-consultant"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex-grow flex flex-col"
            >
              <AIConsultant onOpenInquiry={() => setIsInquiryOpen(true)} />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>

      {/* Shared Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* STEP-BY-STEP PROJECT PLANNER OVERLAY */}
      {isInquiryOpen && (
        <ProjectInquiryForm onClose={() => setIsInquiryOpen(false)} />
      )}
    </div>
  );
}

import { useState, useEffect } from "react";
import {
  Sparkles,
  HelpCircle,
  Clock,
  Code2,
  CalendarDays,
  FileCheck2,
  Trash2,
  History,
  RotateCw,
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { AIRecommendation, RecentQuery } from "../types";

interface AIConsultantProps {
  onOpenInquiry: () => void;
}

const STORAGE_KEY = "taz_chain_ai_queries_v1";

export default function AIConsultant({ onOpenInquiry }: AIConsultantProps) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIRecommendation | null>(null);
  const [history, setHistory] = useState<RecentQuery[]>([]);
  const [errorMsg, setErrorMsg] = useState("");

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse query history from localStorage", e);
      }
    }
  }, []);

  // Sync history to localStorage
  const saveHistory = (updatedHistory: RecentQuery[]) => {
    setHistory(updatedHistory);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  };

  const handleClearHistory = () => {
    saveHistory([]);
  };

  const selectPreset = (type: string) => {
    let presetText = "";
    if (type === "school") {
      presetText =
        "I need a secure school management portal for an institution that integrates enrollment workflow, roles for administrators/faculty/parents, attendance tracking logs, and a secure result management database.";
    } else if (type === "ecommerce") {
      presetText =
        "Looking to build a super-scalable e-commerce platform for high-end luxury products with robust product category grids, checkout pipelines with Stripe API integration, and dynamic stock tracking systems.";
    } else if (type === "blockchain") {
      presetText =
        "We want to develop an enterprise-grade analytics dashboard that tracks real-time cryptocurrency balances, processes thousands of smart contract events, and utilizes D3 visual map graphs.";
    }
    setPrompt(presetText);
    setErrorMsg("");
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setErrorMsg("Please describe your project first.");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setResult(null);

    try {
      const response = await fetch("/api/consultant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to generate proposal due to server error.");
      }

      const recommendation: AIRecommendation = await response.json();
      setResult(recommendation);

      // Append to query history
      const newQuery: RecentQuery = {
        id: Math.random().toString(36).substring(7),
        prompt: prompt.length > 35 ? prompt.substring(0, 35) + "..." : prompt,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        recommendation,
      };

      const updatedHistory = [newQuery, ...history.slice(0, 4)];
      saveHistory(updatedHistory);

    } catch (err: any) {
      console.error("AI Consultant Request Failure:", err);
      // Give a precise, structured fallback so it never remains completely broken
      setErrorMsg(
        err.message || "Failed to contact Taz Chain AI. Ensure your GEMINI_API_KEY is configured inside Settings."
      );
    } finally {
      setLoading(false);
    }
  };

  const selectHistoryItem = (item: RecentQuery) => {
    setResult(item.recommendation);
    // Don't auto-fill prompt to keep current query clean, but allow user review
  };

  return (
    <div className="flex-grow flex flex-col pt-24 pb-16 px-6 max-w-[1280px] mx-auto w-full gap-8">
      
      {/* Upper Content Section */}
      <div className="flex flex-col lg:flex-row gap-8 w-full items-start">
        
        {/* Left Sidebar History list */}
        <aside className="w-full lg:w-1/4 shrink-0 flex flex-col gap-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm sticky top-[100px] w-full">
            <h3 className="font-sans font-bold text-sm text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              <History size={16} className="text-blue-600" />
              Recent Queries
            </h3>

            {history.length === 0 ? (
              <div className="py-8 text-center text-xs text-gray-400 italic font-sans animate-fade-in">
                No recent architectural queries log found.
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {history.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => selectHistoryItem(item)}
                    className="text-left w-full px-3 py-2 rounded-lg hover:bg-gray-50 text-xs text-gray-650 font-semibold truncate hover:text-blue-600 border border-transparent hover:border-gray-100 transition-all cursor-pointer focus:outline-none"
                  >
                    <span className="block font-bold text-[10px] text-blue-600 uppercase mb-0.5 tracking-wider">
                      {item.timestamp}
                    </span>
                    {item.prompt}
                  </button>
                ))}
              </div>
            )}

            {history.length > 0 && (
              <div className="mt-6 pt-4 border-t border-gray-100">
                <button
                  onClick={handleClearHistory}
                  className="w-full flex items-center justify-center gap-1.5 text-center text-xs text-red-650 hover:text-red-750 font-semibold hover:underline cursor-pointer focus:outline-none"
                >
                  <Trash2 size={13} />
                  Clear History
                </button>
              </div>
            )}
          </div>
        </aside>

        {/* Main Interface Content input */}
        <div className="flex-1 w-full space-y-8">
          <section className="text-center md:text-left">
            <h1 className="font-sans text-3xl md:text-4xl font-extrabold tracking-tight text-gray-950 mb-3 block">
              AI Project Consultant
            </h1>
            <p className="font-sans text-base text-gray-600 leading-relaxed max-w-3xl">
              Describe your specific software target or system vision below. Our server-side Taz AI will evaluate the components, architect a complete stack, estimate construction weeks, and list necessary services.
            </p>
          </section>

          {/* Interactive input panel */}
          <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="mb-4">
              <label htmlFor="project-prompt" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Describe your project vision...
              </label>
              <textarea
                id="project-prompt"
                value={prompt}
                onChange={(e) => {
                  setPrompt(e.target.value);
                  if (errorMsg) setErrorMsg("");
                }}
                placeholder="E.g., I need a secure portal for a private school that handles student records, parent communication, and fee processing..."
                rows={5}
                className="w-full bg-white border border-gray-250 rounded-lg p-4 text-gray-950 text-sm font-sans outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
              />
              {errorMsg && (
                <div className="text-xs text-red-650 mt-2 font-semibold animate-fade-in">
                  ⚠️ {errorMsg}
                </div>
              )}
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-xs font-bold text-gray-500 mr-1 font-sans">Suggested Presets:</span>
              <button
                onClick={() => selectPreset("school")}
                className="bg-white hover:bg-gray-50 text-xs font-sans font-bold text-gray-600 border border-gray-250 rounded-full px-4 py-1.5 transition-colors cursor-pointer focus:outline-none"
              >
                School Portal
              </button>
              <button
                onClick={() => selectPreset("ecommerce")}
                className="bg-white hover:bg-[#ededf9]/20 text-xs font-sans font-bold text-gray-600 border border-gray-250 rounded-full px-4 py-1.5 transition-colors cursor-pointer focus:outline-none"
              >
                E-commerce App
              </button>
              <button
                onClick={() => selectPreset("blockchain")}
                className="bg-white hover:bg-[#ededf9]/20 text-xs font-sans font-bold text-gray-600 border border-gray-250 rounded-full px-4 py-1.5 transition-colors cursor-pointer focus:outline-none"
              >
                Blockchain Dashboard
              </button>
            </div>

            {/* Generate Action Button */}
            <div className="flex justify-end">
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="bg-blue-600 text-white font-sans font-medium text-sm px-6 py-3 rounded-lg select-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer inline-flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-xs"
              >
                {loading ? (
                  <>
                    <RotateCw className="animate-spin" size={16} />
                    Analyzing Architecture...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Generate Recommendation
                  </>
                )}
              </button>
            </div>
          </section>

          {/* Results Block */}
          <AnimatePresence mode="wait">
            {/* Shimmer skeleton screen mockup based on design system States */}
            {loading && (
              <motion.div
                key="skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6 pt-4"
              >
                {/* pulsing shimmer */}
                <div className="bg-white border border-gray-250 rounded-xl p-6 shadow-sm animate-pulse space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-gray-100"></div>
                  <div className="h-6 w-1/3 bg-gray-100 rounded"></div>
                  <div className="space-y-2 pt-2">
                    <div className="h-4 w-full bg-gray-100 rounded"></div>
                    <div className="h-4 w-5/6 bg-gray-100 rounded"></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[1, 2, 3].map((card) => (
                    <div key={card} className="bg-white border border-gray-250 rounded-xl p-6 shadow-sm animate-pulse space-y-4">
                      <div className="w-10 h-10 rounded bg-gray-100"></div>
                      <div className="h-4 w-2/3 bg-gray-100 rounded"></div>
                      <div className="space-y-2">
                        <div className="h-3 w-5/6 bg-gray-100 rounded"></div>
                        <div className="h-3 w-3/4 bg-gray-100 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Generated Proposal Content */}
            {!loading && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6 pt-4"
              >
                {/* 1. Project Evaluation Summary */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/20 rounded-bl-[100px] pointer-events-none"></div>
                  <h2 className="font-sans text-lg font-bold text-blue-600 mb-3 flex items-center gap-2">
                    <FileCheck2 size={20} />
                    Project Summary Proposal
                  </h2>
                  <p className="font-sans text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                    {result.summary}
                  </p>
                </div>

                {/* Bento Grid Specifications */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Category 1: Services Need */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs flex flex-col justify-between">
                    <div>
                      <h3 className="font-sans text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-1.5 border-b border-gray-100 pb-2">
                        <Code2 size={14} className="text-blue-600" />
                        Services Required
                      </h3>
                      <ul className="space-y-3 font-sans text-sm text-gray-900 font-semibold">
                        {result.services.map((svc, sIdx) => (
                          <li key={sIdx} className="flex items-center gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                            {svc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Category 2: Recommended Tech Stack */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs flex flex-col justify-between">
                    <div>
                      <h3 className="font-sans text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-1.5 border-b border-gray-100 pb-2">
                        <Code2 size={14} className="text-blue-600" />
                        Target Tech Stack
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {result.techStack.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="bg-gray-50 text-gray-600 px-2.5 py-1 rounded-md text-xs font-sans font-bold border border-gray-200 shadow-none"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Category 3: Timeline range */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs flex flex-col justify-between text-center items-center">
                    <div className="w-full">
                      <h3 className="font-sans text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 flex justify-center items-center gap-1.5 border-b border-gray-100 pb-2">
                        <CalendarDays size={14} className="text-blue-600" />
                        Timeline Estimate
                      </h3>
                      <div className="pt-2">
                        <span className="text-4xl md:text-5xl font-extrabold text-blue-600 tracking-tight">{result.timelineWeeks}</span>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-2">Weeks to MVP Alpha Release</p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Strategic Advice */}
                {result.alternativeOptions && (
                  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs">
                    <h3 className="font-sans text-sm font-bold text-gray-950 mb-2 flex items-center gap-1.5">
                      <HelpCircle size={16} className="text-blue-600" />
                      Strategy Advice & Notes
                    </h3>
                    <p className="font-sans text-xs text-gray-600 leading-relaxed font-sans">
                      {result.alternativeOptions}
                    </p>
                  </div>
                )}

                {/* CTA Overlay Call */}
                <div className="bg-neutral-950 rounded-xl p-6 border border-neutral-800 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6 text-white text-center sm:text-left">
                  <div>
                    <h3 className="font-sans text-lg font-bold text-white mb-1">Ready to scale this architecture?</h3>
                    <p className="text-xs text-gray-400 font-sans">Schedule a free technical briefing with our developers to lock in the specs.</p>
                  </div>
                  <button
                    onClick={onOpenInquiry}
                    className="bg-white text-gray-950 font-sans font-medium text-xs px-5 py-3 rounded-lg hover:bg-gray-50 select-none transition-colors inline-flex items-center gap-1 shrink-0 cursor-pointer"
                  >
                    Book Free Consultation
                    <ExternalLink size={14} />
                  </button>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}

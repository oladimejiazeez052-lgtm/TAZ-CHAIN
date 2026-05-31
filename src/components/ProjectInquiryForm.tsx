import React, { useState } from "react";
import {
  X,
  Globe,
  Smartphone,
  Database,
  MessagesSquare,
  Check,
  ArrowRight,
  ArrowLeft,
  Send,
  Info
} from "lucide-react";
import { motion } from "motion/react";

interface ProjectInquiryFormProps {
  onClose: () => void;
}

export default function ProjectInquiryForm({ onClose }: ProjectInquiryFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [projectType, setProjectType] = useState("Web Application");
  const [budgetRange, setBudgetRange] = useState("$10k - $50k");
  const [timeline, setTimeline] = useState("Standard (1 to 3 months)");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateStep3 = () => {
    const newErrors: { [key: string]: string } = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required.";
    if (!lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!email.trim()) {
      newErrors.email = "Work email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please input a valid work email.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 3) {
      if (validateStep3()) {
        setCurrentStep(4);
      }
    } else if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const progressPercentage = ((currentStep - 1) / 3) * 100;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 15 }}
        transition={{ duration: 0.25 }}
        className="bg-white w-full max-w-3xl rounded-xl border border-gray-200 shadow-xl overflow-hidden flex flex-col my-8"
      >
        {/* Header Controls */}
        <header className="px-6 py-4 flex justify-between items-center bg-white border-b border-violet-100">
          <div className="flex items-center gap-2">
            <span className="font-sans text-lg font-extrabold flex items-center gap-1">
              <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">TAZ</span>
              <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent font-black">CHAIN</span>
            </span>
            <span className="text-[10px] uppercase bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-rose-500/10 text-fuchsia-700 px-3 py-1 rounded-full font-bold border border-fuchsia-200">
              Project Planner
            </span>
          </div>
          <button
            onClick={onClose}
            className="flex items-center gap-1 text-gray-500 hover:text-rose-600 transition-colors font-sans font-bold text-sm cursor-pointer"
          >
            <X size={18} />
            Exit
          </button>
        </header>

        {/* Form Body */}
        <div className="flex-1 p-6 md:p-8">
          {!submitted ? (
            <>
              {/* Stepper Status */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="font-sans text-2xl font-bold bg-gradient-to-r from-violet-700 to-fuchsia-700 bg-clip-text text-transparent">Start a Project</h2>
                    <p className="text-sm text-slate-600 mt-1 font-semibold">Briefly outline your goals and our architecture board will review</p>
                  </div>
                  <span className="text-xs font-bold text-fuchsia-700 bg-fuchsia-50 border border-fuchsia-100 px-3.5 py-1 rounded-full">
                    Step {currentStep} of 4
                  </span>
                </div>

                {/* Progress Indicators Bar */}
                <div className="relative flex items-center justify-between w-full h-1.5 bg-gray-100 rounded-full">
                  <div
                    className="absolute left-0 top-0 h-1.5 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-455 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                  {[1, 2, 3, 4].map((step) => {
                    const stepLabels = ["Type", "Scope", "Details", "Review"];
                    const isCompleted = step < currentStep;
                    const isActive = step === currentStep;
                    return (
                      <button
                        key={step}
                        disabled={step > currentStep}
                        onClick={() => setCurrentStep(step)}
                        className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center font-sans text-xs font-black transition-all duration-300 border focus:outline-none cursor-pointer ${
                          isCompleted
                            ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white border-transparent"
                            : isActive
                            ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white border-transparent shadow shadow-fuchsia-500/20"
                            : "bg-white text-gray-500 border-gray-250 hover:border-violet-600"
                        }`}
                      >
                        {isCompleted ? <Check size={14} /> : step}
                        <span
                          className={`absolute -bottom-6 text-[11px] font-bold tracking-tight whitespace-nowrap hidden sm:block ${
                            isActive || isCompleted
                              ? "text-fuchsia-700"
                              : "text-gray-500"
                          }`}
                        >
                          {stepLabels[step - 1]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Form Content Steps */}
              <div className="min-h-[280px] pt-4">
                {/* STEP 1: PROJECT TYPE */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4 animate-fade-in"
                  >
                    <h3 className="font-sans text-lg font-bold text-slate-800 mb-4">What type of project is this?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        {
                          id: "Web Application",
                          desc: "Custom platforms, dashboards, and enterprise portals.",
                          icon: <Globe className="text-violet-600" size={20} />,
                          activeColor: "border-violet-420 bg-violet-50/35",
                          bgIcon: "bg-violet-50 text-violet-600"
                        },
                        {
                          id: "Mobile App",
                          desc: "Native or cross-platform iOS and Android applications.",
                          icon: <Smartphone className="text-fuchsia-600" size={20} />,
                          activeColor: "border-fuchsia-420 bg-fuchsia-50/35",
                          bgIcon: "bg-fuchsia-50 text-fuchsia-600"
                        },
                        {
                          id: "Data Infrastructure",
                          desc: "Cloud sync pipelines, database migration, and analytical grids.",
                          icon: <Database className="text-rose-600" size={20} />,
                          activeColor: "border-rose-420 bg-rose-50/35",
                          bgIcon: "bg-rose-50 text-rose-600"
                        },
                        {
                          id: "Technical Consulting",
                          desc: "Secure architecture audits, strategy sheets, and code advice.",
                          icon: <MessagesSquare className="text-amber-600" size={20} />,
                          activeColor: "border-amber-420 bg-amber-50/35",
                          bgIcon: "bg-amber-50 text-amber-600"
                        }
                      ].map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setProjectType(type.id)}
                          className={`flex items-start text-left p-4 rounded-xl border transition-all duration-300 focus:outline-none cursor-pointer ${
                            projectType === type.id
                              ? `${type.activeColor} shadow-md`
                              : "border-gray-205 hover:border-violet-405 hover:bg-gray-50"
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 shrink-0 transition-colors ${
                            projectType === type.id ? "bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10" : type.bgIcon
                          }`}>
                            {type.icon}
                          </div>
                          <div>
                            <h4 className="font-sans text-sm font-black text-slate-900">{type.id}</h4>
                            <p className="text-xs text-slate-650 mt-1 leading-relaxed font-semibold">{type.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: BUDGET & TIMELINE */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="font-sans text-base font-extrabold text-slate-800 mb-3">Estimated Budget Range</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-sans">
                        {["Under $10k", "$10k - $50k", "$50k - $150k", "$150k+"].map((range) => (
                          <button
                            key={range}
                            type="button"
                            onClick={() => setBudgetRange(range)}
                            className={`w-full py-3.5 rounded-xl border font-sans text-xs font-black tracking-wide transition-all text-center focus:outline-none cursor-pointer ${
                              budgetRange === range
                                ? "border-fuchsia-400 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 text-fuchsia-700 shadow-xs"
                                : "border-gray-250 hover:border-violet-300 text-slate-700 hover:bg-gray-50"
                            }`}
                          >
                            {range}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-sans text-base font-extrabold text-slate-800 mb-3">Target Timeline</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {[
                          { id: "Expedited (Under 1 month)", label: "⚡ Expedited", desc: "Less than 1 month cycle" },
                          { id: "Standard (1 to 3 months)", label: "📅 Standard", desc: "1 to 3 months delivery" },
                          { id: "Flexible (3+ months)", label: "🌱 Flexible", desc: "3+ months development cycle" }
                        ].map((time) => (
                          <button
                            key={time.id}
                            type="button"
                            onClick={() => setTimeline(time.id)}
                            className={`text-left p-4 rounded-xl border transition-all duration-300 focus:outline-none cursor-pointer ${
                              timeline === time.id
                                ? "border-violet-400 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/5 shadow-xs"
                                : "border-gray-205 hover:border-fuchsia-305 hover:bg-gray-50"
                            }`}
                          >
                            <h4 className="font-sans text-sm font-black text-slate-900">{time.label}</h4>
                            <p className="text-xs text-slate-650 font-semibold mt-1">{time.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: DETAILS */}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4 animate-fade-in"
                  >
                     <h3 className="font-sans text-lg font-bold text-gray-950 mb-4">Contact & Specifics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">First Name *</label>
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => {
                            setFirstName(e.target.value);
                            if (errors.firstName) setErrors({ ...errors, firstName: "" });
                          }}
                          placeholder="Sarah"
                          className="w-full bg-white border border-gray-250 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-600 transition-all"
                        />
                        {errors.firstName && <span className="text-xs text-red-650 mt-1 block">{errors.firstName}</span>}
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Last Name *</label>
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => {
                            setLastName(e.target.value);
                            if (errors.lastName) setErrors({ ...errors, lastName: "" });
                          }}
                          placeholder="Jenkins"
                          className="w-full bg-white border border-gray-250 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-600 transition-all"
                        />
                        {errors.lastName && <span className="text-xs text-red-650 mt-1 block">{errors.lastName}</span>}
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Work Email *</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors({ ...errors, email: "" });
                        }}
                        placeholder="sarah@educore.system"
                        className="w-full bg-white border border-gray-250 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-600 transition-all font-sans"
                      />
                      {errors.email && <span className="text-xs text-red-650 mt-1 block">{errors.email}</span>}
                    </div>

                    <div className="mt-4">
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Project Objectives / Brief description</label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe your current system challenges, scaling priorities, or desired timelines (optional)..."
                        rows={4}
                        className="w-full bg-white border border-gray-250 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-600 transition-all resize-none font-sans"
                      />
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: REVIEW */}
                {currentStep === 4 && (
                  <motion.div
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <h3 className="font-sans text-lg font-bold text-gray-950 mb-4">Review Your Inquiry</h3>
                    <div className="bg-gray-50 rounded-xl p-5 border border-gray-205 space-y-4 text-sm">
                      <div className="flex justify-between items-start border-b border-gray-200/60 pb-3">
                        <div>
                          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Project Type</span>
                          <span className="font-semibold text-gray-950">{projectType}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setCurrentStep(1)}
                          className="text-blue-600 text-xs font-bold hover:underline focus:outline-none cursor-pointer"
                        >
                          Edit
                        </button>
                      </div>

                      <div className="flex justify-between items-start border-b border-gray-200/60 pb-3">
                        <div>
                          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Scale Config</span>
                          <span className="font-semibold text-gray-950">{budgetRange} Budget • {timeline} Timeline</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setCurrentStep(2)}
                          className="text-blue-600 text-xs font-bold hover:underline focus:outline-none cursor-pointer"
                        >
                          Edit
                        </button>
                      </div>

                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Point of Contact</span>
                          <span className="font-semibold text-gray-950 block">{firstName} {lastName}</span>
                          <span className="text-xs text-gray-500">{email}</span>
                          {description && (
                            <p className="text-xs text-gray-650 italic mt-2 border-l-2 border-blue-200 pl-2 max-h-16 overflow-y-auto">
                              "{description}"
                            </p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => setCurrentStep(3)}
                          className="text-blue-600 text-xs font-bold hover:underline focus:outline-none cursor-pointer"
                        >
                          Edit
                        </button>
                      </div>
                    </div>

                    <div className="bg-blue-50/30 p-4 rounded-xl flex gap-3 items-start border border-blue-100/55">
                      <Info className="text-blue-600 shrink-0 mt-0.5" size={16} />
                      <p className="text-xs text-blue-900 font-sans leading-relaxed">
                        By submitting, you authorize Taz Chain specialists to analyze these data specifications under strict NDA agreements by default. We expect to reply back within 24 business hours.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
              {/* Form Controls Footer */}
              <div className="mt-8 pt-6 border-t border-violet-100 flex justify-between items-center">
                <button
                  type="button"
                  onClick={handleBack}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold select-none border border-gray-255 text-slate-700 hover:bg-violet-50/50 transition-colors cursor-pointer ${
                    currentStep === 1 ? "invisible" : ""
                  }`}
                >
                  <ArrowLeft size={16} />
                  Back
                </button>

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-1.5 bg-gradient-to-r from-violet-600 to-fuchsia-650 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:opacity-95 select-none cursor-pointer transition-all hover:scale-[1.02] active:scale-95"
                  >
                    Continue
                    <ArrowRight size={16} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white px-7 py-3 rounded-xl text-sm font-bold hover:opacity-95 select-none cursor-pointer transition-all hover:scale-[1.02] active:scale-95 shadow-md shadow-orange-550/20"
                  >
                    Submit Inquiry
                    <Send size={15} />
                  </button>
                )}
              </div>
            </>
          ) : (
            /* SUCCESS STATE SCREEN with glowing joyful parameters */
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center py-12 font-sans bg-gradient-to-br from-teal-500/5 via-emerald-500/5 to-white rounded-3xl p-6 border border-emerald-550/15"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-full flex items-center justify-center mb-6 shadow-md shadow-emerald-500/20 animate-bounce">
                <Check size={32} strokeWidth={3} />
              </div>
              <h2 className="font-sans text-2xl font-black text-slate-900 mb-3">Inquiry Received Successfully</h2>
              <p className="font-sans text-sm text-slate-700 font-semibold max-w-sm md:max-w-md leading-relaxed mb-8">
                Your specs on <strong className="bg-gradient-to-r from-violet-605 to-fuchsia-605 bg-clip-text text-transparent font-black">{projectType}</strong> have been logged inside our SF architectural queue. Our lead architect, Sarah Jenkins, will evaluate the timeline and email you back at <span className="font-extrabold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">{email}</span> within 24 business hours.
              </p>
              <button
                onClick={onClose}
                className="bg-gradient-to-r from-teal-555 to-emerald-600 text-white font-sans font-bold text-sm px-7 py-3.5 rounded-xl hover:opacity-95 shadow-md shadow-teal-500/20 transition-all hover:scale-102 cursor-pointer"
              >
                Return to Solutions
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

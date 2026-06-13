import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, Send, Sparkles, User, AlertCircle, Info, Mail, Building, Briefcase, ChevronRight, FileCheck, Check, CornerDownRight, ShieldCheck } from 'lucide-react';
import { getAdvisorResponse, saveLead, type Lead } from '../services/staticData';

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export default function AIConsultView() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: "Hello! I am Adewale Coker, PrimeHub's Digital Operations Guide. I bring over 15 years of active recruiting and statutory payroll compliance experience across Lagos, Abuja, and Pan-Nigeria frameworks.\n\nWhether you need to outline competitive technical salary bands for software engineering roles in Nigeria, or decode PenCom Pension dual-deductions (10% employer, 8% employee) and ITF statutory limits, I am here to help.\n\nAs we discuss, I can help formulate your custom recruitment brief. What is your company name, and what active vacancy roles are you currently planning to fill?"
    }
  ]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isSubmittingLead, setIsSubmittingLead] = useState<boolean>(false);
  const [leadForm, setLeadForm] = useState({
    clientName: '',
    email: '',
    targetRoles: '',
    location: 'Lagos',
    roleVolume: 1,
    industry: 'FinTech & Banking',
    notes: ''
  });
  const [leadSubmittedSuccessfully, setLeadSubmittedSuccessfully] = useState<boolean>(false);
  const [leadSubmissionDetails, setLeadSubmissionDetails] = useState<Lead | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    const response = getAdvisorResponse(userMsg);
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userMsg }, { role: 'model', text: response }]);
    extractLeadInfo(userMsg);
  };

  // Helper to extract email and possible roles from text to assist the user
  const extractLeadInfo = (text: string) => {
    // Basic heuristics to assist form mapping
    const emailMatch = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
    if (emailMatch && emailMatch[0]) {
      setLeadForm(prev => ({ ...prev, email: emailMatch[0] }));
    }

    // Capture potential roles/engineer
    if (text.toLowerCase().includes("engineer") && !leadForm.targetRoles) {
      setLeadForm(prev => ({ ...prev, targetRoles: "Engineer / Developer" }));
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.clientName || !leadForm.email || !leadForm.targetRoles) {
      alert("Please provide at least Company Name, Contact Email, and Target Vacancy roles.");
      return;
    }

    setIsSubmittingLead(true);
    const lead = saveLead(leadForm);
    setLeadSubmittedSuccessfully(true);
    setLeadSubmissionDetails(lead);
    setMessages(prev => [...prev, {
      role: 'model',
      text: `🎯 REQUEST SAVED LOCALLY!

I have compiled the strategic operational parameters for ${leadForm.clientName} and saved the recruitment brief in this browser.

You can review the request on the Leads Dashboard page. To formally engage PrimeHub, contact the team using the details on this website.`
    }]);
    setIsSubmittingLead(false);
  };

  return (
    <div id="ai_consult_wrapper" className="space-y-12">
      {/* Editorial Header */}
      <div className="text-left max-w-3xl space-y-4">
        <span className="text-xs uppercase tracking-widest font-semibold text-[#C9A23F] font-mono">Interactive Workforce Planning Guide</span>
        <h1 className="text-3xl sm:text-4xl font-bold font-sans text-white tracking-tight leading-tight">
          Consult with Adewale Coker: HR & Regulatory Guide
        </h1>
        <p className="text-[#F4F6F9]/70 text-base leading-relaxed">
          Ask delicate questions regarding PenCom pension structuring, state LIRS or FCT-IRS PAYE thresholds, and Industrial Training Fund (ITF) statutory filings. Use Adewale to guide your talent procurement strategy, then save your request details below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Chat Window Panel - 7 Cols */}
        <div className="lg:col-span-7 bg-[#0A1828] border border-white/10 rounded-2xl flex flex-col h-[650px] overflow-hidden card-shadow">
          {/* Chat Header */}
          <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C9A23F]/15 border border-[#C9A23F]/25 flex items-center justify-center text-[#C9A23F]">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                  Adewale Coker
                  <span className="text-[9px] px-1.5 py-0.5 bg-green-500/10 text-green-400 font-bold tracking-widest uppercase rounded font-mono border border-green-500/20">LIVE EXPERT</span>
                </h3>
                <p className="text-[10px] text-[#F4F6F9]/60 font-mono">Managing Advisory Partner • PrimeHub HR</p>
              </div>
            </div>
            
            <div className="hidden sm:flex items-center gap-1 bg-[#C9A23F]/10 px-2.5 py-1 rounded-sm border border-[#C9A23F]/20 text-[10px] font-mono text-[#C9A23F]">
              <Sparkles className="w-3 h-3 animate-pulse" />
              <span>Static Advisor Active</span>
            </div>
          </div>

          {/* Advisory Notice Banner inside chat */}
          <div className="mx-6 mt-4 p-3 bg-white/5 border border-white/10 rounded-lg text-xs flex items-start gap-2.5">
            <Info className="w-4 h-4 text-[#C9A23F] mt-0.5 flex-shrink-0" />
            <p className="text-[#F4F6F9]/70 leading-normal">
              <span className="font-bold text-[#C9A23F]">Nigerian Compliance Audit Rules:</span> This static guide uses a curated set of recruitment and compliance topics to help you identify a practical next step.
            </p>
          </div>

          {/* Chat Bubble List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 font-sans text-sm scrollbar-thin">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center border font-bold text-xs ${
                  msg.role === 'user'
                    ? 'bg-[#C9A23F]/10 border-[#C9A23F]/30 text-[#C9A23F]'
                    : 'bg-white/5 border-white/10 text-white'
                }`}>
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className={`p-4 rounded-2xl leading-relaxed whitespace-pre-wrap text-xs sm:text-sm shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-[#C9A23F] text-[#0C2440] font-medium rounded-tr-none'
                    : 'bg-white/5 text-[#F4F6F9] border border-white/5 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-3 max-w-[80%]">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="p-4 bg-white/5 border border-white/5 rounded-2xl rounded-tl-none flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#C9A23F] rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-[#C9A23F]/80 rounded-full animate-bounce [animation-delay:0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-[#C9A23F]/40 rounded-full animate-bounce [animation-delay:0.3s]"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Form */}
          <form onSubmit={handleSend} className="p-4 bg-white/5 border-t border-white/10 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Adewale regarding compliance audits, staff manuals, recruitment bands..."
              disabled={loading}
              className="flex-1 px-4 py-3 bg-[#0C2440] border border-white/10 rounded-lg text-xs sm:text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#C9A23F] transition-colors"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-4 py-3 bg-[#C9A23F] hover:bg-[#b58f33] text-[#0C2440] font-bold rounded-lg transition-colors cursor-pointer disabled:bg-[#C9A23F]/30"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Lead Hub Collect Form - 5 Cols */}
        <div className="lg:col-span-5 bg-white/5 border border-white/10 p-6 sm:p-8 rounded-2xl card-shadow space-y-6">
          <div className="space-y-1.5 border-b border-white/10 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#C9A23F]" />
              Support Dispatcher Link
            </h3>
            <p className="text-xs text-[#F4F6F9]/60 leading-relaxed">
              When you submit this request form, the static website saves the details only in your browser so you can review the brief on the Leads Dashboard.
            </p>
          </div>

          {leadSubmittedSuccessfully && leadSubmissionDetails ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#C9A23F]/10 border border-[#C9A23F]/30 rounded-xl p-5 space-y-4"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#C9A23F] text-[#0C2440] rounded-full flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">Lead Successfully Transmitted</h4>
                  <p className="text-[11px] text-[#F4F6F9]/70 leading-normal">
                    The operational strategy request is saved in this browser. No email or server request is sent.
                  </p>
                </div>
              </div>

              {/* Collapsible details preview */}
              <div className="p-4 bg-[#0A1828] rounded-lg border border-white/5 space-y-2.5 text-xs font-mono">
                <p className="text-[10px] text-[#C9A23F] font-bold uppercase tracking-widest">// Local Request ID: {leadSubmissionDetails.id}</p>
                <div className="space-y-1 text-[#F4F6F9]/80 text-[11px]">
                  <p><span className="text-white/40">From:</span> {leadSubmissionDetails.emailSimulated.sender}</p>
                  <p><span className="text-white/40">To:</span> {leadSubmissionDetails.emailSimulated.recipient}</p>
                  <p><span className="text-white/40">Subject:</span> {leadSubmissionDetails.emailSimulated.subject}</p>
                  <p className="border-t border-white/5 pt-2 mt-2 font-mono text-[9px] text-[#C9A23F]/80 whitespace-pre-line leading-relaxed">
                    {leadSubmissionDetails.emailSimulated.smtpLog.split('\n')[0]} ... [TCP 25 Accepted]
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setLeadSubmittedSuccessfully(false);
                  setLeadForm({
                    clientName: '',
                    email: '',
                    targetRoles: '',
                    location: 'Lagos',
                    roleVolume: 1,
                    industry: 'FinTech & Banking',
                    notes: ''
                  });
                }}
                className="w-full py-2 bg-white/5 hover:bg-white/10 text-white font-mono text-[10px] uppercase tracking-wider rounded border border-white/10 transition-colors cursor-pointer"
              >
                Register Another Vacancy Lead
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleLeadSubmit} className="space-y-4 font-sans">
              {/* Form inputs */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#F4F6F9]/75 uppercase tracking-wide block">Company Name</label>
                <div className="relative">
                  <Building className="w-4 h-4 text-white/40 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lagos FinTech ScaleUp"
                    value={leadForm.clientName}
                    onChange={(e) => setLeadForm({ ...leadForm, clientName: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-[#0A1828] border border-white/10 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:border-[#C9A23F]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#F4F6F9]/75 uppercase tracking-wide block">Contact Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-white/40 absolute left-3 top-3.5" />
                  <input
                    type="email"
                    required
                    placeholder="e.g. decision.maker@domain.ng"
                    value={leadForm.email}
                    onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-[#0A1828] border border-white/10 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:border-[#C9A23F]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#F4F6F9]/75 uppercase tracking-wide block">Target Vacancies to Fill</label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-white/40 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Head of Engineering, 3 Senior Devs"
                    value={leadForm.targetRoles}
                    onChange={(e) => setLeadForm({ ...leadForm, targetRoles: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-[#0A1828] border border-white/10 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:border-[#C9A23F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[#F4F6F9]/75 uppercase tracking-wide block">Locus Location</label>
                  <select
                    value={leadForm.location}
                    onChange={(e) => setLeadForm({ ...leadForm, location: e.target.value })}
                    className="w-full px-3 py-3 bg-[#0A1828] border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-[#C9A23F]"
                  >
                    <option value="Lagos">Lagos Office</option>
                    <option value="Abuja">Abuja Office</option>
                    <option value="Remote">100% Remote (Nigeria)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[#F4F6F9]/75 uppercase tracking-wide block">Role Volume</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={leadForm.roleVolume}
                    onChange={(e) => setLeadForm({ ...leadForm, roleVolume: Math.max(1, Number(e.target.value)) })}
                    className="w-full px-3 py-2.5 bg-[#0A1828] border border-white/10 rounded-lg text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#F4F6F9]/75 uppercase tracking-wide block">Strategic Notes & Directives</label>
                <textarea
                  rows={3}
                  placeholder="e.g. We require background checks and localized dual payroll drafting advice."
                  value={leadForm.notes}
                  onChange={(e) => setLeadForm({ ...leadForm, notes: e.target.value })}
                  className="w-full p-3 bg-[#0A1828] border border-white/10 rounded-lg text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#C9A23F]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#C9A23F] hover:bg-[#b58f33] text-[#0C2440] font-bold text-xs uppercase tracking-widest rounded transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
              >
                Submit Lead info to Support
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

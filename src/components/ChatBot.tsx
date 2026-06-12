import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  ShieldCheck, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  Briefcase,
  Layers,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isLeadCard?: boolean;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hello! I am your PrimeHub AI People Systems Advisor. I can help answer questions regarding PenCom regulations, dual statutory deductions (10% Employer, 8% Employee), NSITF workmen compliance, or sourcing passive executives and engineering talent across Lagos and Abuja.\n\nCould you tell me what specific workforce or compliance challenges you are hoping to tackle today? \n\n(P.S. Please feel free to use our Rapid Lead form below at any point to register a priority support request!)"
    }
  ]);
  const [userInput, setUserInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  
  // Lead Collection State
  const [companyName, setCompanyName] = useState<string>('');
  const [workEmail, setWorkEmail] = useState<string>('');
  const [targetRoles, setTargetRoles] = useState<string>('');
  const [isLeadSubmitting, setIsLeadSubmitting] = useState<boolean>(false);
  const [leadSubmitted, setLeadSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, loading]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!userInput.trim()) return;

    const userMsgText = userInput.trim();
    setUserInput('');
    
    // Add user message to state
    const userMsgId = `user-${Date.now()}`;
    const newMessages: ChatMessage[] = [
      ...messages,
      { id: userMsgId, role: 'user', text: userMsgText }
    ];
    setMessages(newMessages);
    setLoading(true);

    try {
      // Map history structure required by the /api/chat endpoint
      const history = newMessages.slice(0, -1).map(m => ({
        role: m.role,
        text: m.text
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMsgText,
          history: history
        })
      });

      if (res.ok) {
        const data = await res.json();
        setMessages(prev => [
          ...prev,
          { id: `bot-${Date.now()}`, role: 'model', text: data.text || "I am processing your corporate guidelines setup..." }
        ]);
      } else {
        setMessages(prev => [
          ...prev,
          { id: `bot-${Date.now()}`, role: 'model', text: "Apologies, my connectivity with the Lagos Advisory core was temporarily interrupted. Please feel free to register your staffing parameters directly using the 'Rapid Proposal Request' form above." }
        ]);
      }
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { id: `bot-${Date.now()}`, role: 'model', text: "I am currently responding under Offline Expert Advisor Mode. In Nigeria, any company with 3 or more employee registries must contribute a minimum of 18% total baseline payroll to licensed PFAs under the Pension Reform Act of 2014.\n\nKindly fill out our Rapid Lead card below, and a senior human advisor will contact you within 24 hours." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !workEmail.trim() || !targetRoles.trim()) {
      setErrorMessage("Kindly complete all lead parameters before dispatching.");
      return;
    }

    setIsLeadSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientName: companyName.trim(),
          email: workEmail.trim(),
          targetRoles: targetRoles.trim(),
          location: 'Lagos/Abuja Hybrid',
          roleVolume: 1,
          industry: 'Technology',
          notes: 'Source: Floating AI Chat Bot Lead Capture. Verified during active diagnostic consultation.'
        })
      });

      if (response.ok) {
        setLeadSubmitted(true);
        // Add supportive message from Assistant
        setMessages(prev => [
          ...prev,
          {
            id: `sys-${Date.now()}`,
            role: 'model',
            text: `🎉 Lead Registered Successfully!\n\nThank you, I have logged **${companyName.trim()}**'s request in our secure lead database with contact email **${workEmail.trim()}** for priority **${targetRoles.trim()}** hiring support.\n\nOur Senior Partner has received this dossier. We will perform retroactive PenCom compliance checks prior to your discovery call.`
          }
        ]);
      } else {
        setErrorMessage("Failed to register. Please retry or email hello@primehubhr.com.ng");
      }
    } catch (err) {
      setErrorMessage("Network error connecting to client registry. Try again.");
    } finally {
      setIsLeadSubmitting(false);
    }
  };

  return (
    <div id="ai_live_chat_root" className="fixed bottom-6 right-6 z-50 text-left">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chat_panel_container"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25 }}
            className="w-[360px] sm:w-[400px] h-[580px] bg-[#0A1828] border border-white/10 rounded-2xl shadow-2xl flex flex-col justify-between overflow-hidden relative"
          >
            {/* Header */}
            <div className="bg-[#0C2440] p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full border border-[#C9A23F] flex items-center justify-center relative bg-[#C9A23F]/10">
                  <Bot className="w-4 h-4 text-[#C9A23F] animate-pulse" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-500 border border-[#0C2440]"></span>
                </div>
                <div>
                  <h3 className="font-bold text-xs text-white tracking-wide uppercase">AI Compliance Bot</h3>
                  <p className="text-[9px] text-[#C9A23F] font-mono uppercase tracking-wider">PrimeHub Expert Advisor</p>
                </div>
              </div>
              
              <button 
                id="close_chat_btn"
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/5 text-gray-400 hover:text-white rounded-full transition-colors outline-none cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages and Floating dynamic Lead Form */}
            <div className="flex-grow p-4 overflow-y-auto space-y-4 flex flex-col justify-between bg-[#0A1828]/95 scrollbar-thin">
              <div className="space-y-4 flex-grow">
                {messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'model' && (
                      <div className="w-6 h-6 rounded-full border border-[#C9A23F]/40 bg-[#C9A23F]/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="w-3.5 h-3.5 text-[#C9A23F]" />
                      </div>
                    )}
                    <div 
                      className={`p-3 rounded-2xl text-xs max-w-[85%] leading-relaxed ${
                        msg.role === 'user' 
                          ? 'bg-[#C9A23F] text-[#0C2440] font-semibold rounded-tr-none' 
                          : 'bg-white/5 border border-white/10 text-white/90 rounded-tl-none whitespace-pre-wrap'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                
                {loading && (
                  <div className="flex gap-2.5 justify-start items-center">
                    <div className="w-6 h-6 rounded-full border border-[#C9A23F]/40 bg-[#C9A23F]/10 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-3.5 h-3.5 text-[#C9A23F] animate-spin" />
                    </div>
                    <div className="p-2 px-3 bg-white/5 border border-white/10 rounded-2xl rounded-tl-none text-[10px] text-gray-400 font-mono tracking-wider flex items-center gap-2">
                      <Loader2 className="w-3 h-3 animate-spin text-[#C9A23F]" />
                      Analyzing regulatory guidelines...
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Collapsible Micro Lead-Capture Form built directly into chatbot */}
              <div className="mt-4 pt-4 border-t border-white/10">
                {!leadSubmitted ? (
                  <div className="bg-[#0C2440] p-3.5 rounded-xl border border-[#C9A23F]/20 text-left space-y-3">
                    <div className="flex items-center gap-1.5 border-b border-white/10 pb-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#C9A23F]" />
                      <span className="text-[10px] font-bold text-white uppercase tracking-widest font-mono">🎯 Rapid Proposal Capture</span>
                    </div>

                    <form onSubmit={handleLeadSubmit} className="space-y-2.5">
                      {errorMessage && (
                        <p className="text-[10px] text-red-300 bg-red-950/40 p-1.5 rounded border border-red-900/30 font-mono">
                          {errorMessage}
                        </p>
                      )}
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-0.5">
                          <label htmlFor="chat_company" className="text-[9px] text-[#F4F6F9]/60 font-semibold uppercase">Company *</label>
                          <input
                            id="chat_company"
                            type="text"
                            placeholder="Acme Nigeria"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="w-full bg-[#0A1828] border border-white/10 rounded p-1.5 text-xs text-white focus:outline-none focus:border-[#C9A23F] transition-colors"
                          />
                        </div>
                        <div className="space-y-0.5">
                          <label htmlFor="chat_email" className="text-[9px] text-[#F4F6F9]/60 font-semibold uppercase">Work Email *</label>
                          <input
                            id="chat_email"
                            type="email"
                            placeholder="hr@acme.ng"
                            value={workEmail}
                            onChange={(e) => setWorkEmail(e.target.value)}
                            className="w-full bg-[#0A1828] border border-white/10 rounded p-1.5 text-xs text-white focus:outline-none focus:border-[#C9A23F] transition-colors"
                          />
                        </div>
                      </div>

                      <div className="space-y-0.5">
                        <label htmlFor="chat_roles" className="text-[9px] text-[#F4F6F9]/60 font-semibold uppercase">Hiring Needs / Roles *</label>
                        <input
                          id="chat_roles"
                          type="text"
                          placeholder="e.g. 2 Senior Developers, Finance Manager"
                          value={targetRoles}
                          onChange={(e) => setTargetRoles(e.target.value)}
                          className="w-full bg-[#0A1828] border border-white/10 rounded p-1.5 text-xs text-white focus:outline-none focus:border-[#C9A23F] transition-colors"
                        />
                      </div>

                      <button
                        id="chat_dispatch_btn"
                        type="submit"
                        disabled={isLeadSubmitting}
                        className="w-full py-2 bg-[#C9A23F] text-[#0C2440] hover:bg-[#b58f33] font-bold text-[10px] uppercase tracking-wider rounded transition-all flex items-center justify-center gap-1 cursor-pointer"
                      >
                        {isLeadSubmitting ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            Dispatching dossier...
                          </>
                        ) : (
                          <>
                            Secure SLA Priority Dispatch
                            <ArrowRight className="w-3 h-3" />
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="bg-emerald-950/20 border border-emerald-900/30 p-3 rounded-lg text-center flex flex-col items-center gap-1.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <p className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider font-mono">Dossier Dispatched Successfully</p>
                    <p className="text-[9px] text-emerald-300/70">Verified & logged for local regulatory assessment.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Input Footer */}
            <form onSubmit={handleSendMessage} className="bg-[#0C2440] p-3 border-t border-white/10 flex items-center gap-2">
              <input
                id="chat_text_input"
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ask about PenCom calculations, NSITF, or talent..."
                className="flex-grow bg-[#0A1828] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#C9A23F] transition-colors"
              />
              <button
                id="chat_send_submit"
                type="submit"
                className="p-2 bg-[#C9A23F] hover:bg-[#b58f33] text-[#0C2440] rounded-lg transition-colors cursor-pointer outline-none"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Launch Button */}
      <button 
        id="chat_floating_toggle"
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#C9A23F] text-[#0C2440] rounded-full hover:bg-[#b58f33] flex items-center justify-center shadow-2xl transition-all cursor-pointer relative group scale-100 active:scale-95 duration-150 border-2 border-[#0A1828]"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 45, opacity: 0 }}
              className="absolute"
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -45, opacity: 0 }}
              className="absolute"
            >
              <MessageSquare className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Micro Alert Ping */}
        {!isOpen && (
          <span className="absolute top-0 right-0 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        )}
      </button>
    </div>
  );
}

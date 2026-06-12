import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Mail, Terminal, Calendar, MapPin, Building, Hash, Code, Trash, CheckCircle2, ShieldAlert, Users, Compass, Globe, Sparkles, RefreshCw, X, ArrowRight } from 'lucide-react';

interface Lead {
  id: string;
  clientName: string;
  email: string;
  targetRoles: string;
  location: string;
  roleVolume: number;
  industry: string;
  notes?: string;
  timestamp: string;
  emailSimulated: {
    sent: boolean;
    recipient: string;
    sender: string;
    subject: string;
    body: string;
    smtpLog: string;
  };
}

export default function LeadsDashboardView() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const fetchLeads = async () => {
    setIsRefreshing(true);
    try {
      const response = await fetch('/api/leads');
      if (response.ok) {
        const data = await response.json();
        setLeads(data.leads || []);
        if (data.leads && data.leads.length > 0 && !selectedLead) {
          setSelectedLead(data.leads[0]);
        }
      }
    } catch (err) {
      console.error("Failed to fetch leads:", err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Rules-based regulatory recommendation generator
  const getComplianceCheckmarks = (lead: Lead) => {
    const checks = [];
    if (lead.location === 'Lagos') {
      checks.push({
        title: "LIRS PAYE Registration",
        desc: "State of residency filing mandatory directly to Lagos State Internal Revenue Service.",
        status: "Urgent Audit"
      });
    } else if (lead.location === 'Abuja') {
      checks.push({
        title: "FCT-IRS Tax Alignment",
        desc: "State of residency filing mandatory directly to Federal Capital Territory Internal Revenue Service.",
        status: "Urgent Audit"
      });
    } else {
      checks.push({
        title: "Remote Cross-Border PAYE",
        desc: "Filing based on remote localization tax rules (dual state doubletax avoidance).",
        status: "Active Tracking"
      });
    }

    checks.push({
      title: "NSITF 1% Contribution",
      desc: "Mandatory Employee Compensation Act filing of 1% complete monthly payroll. Covers work incidents.",
      status: "Required Setup"
    });

    if (lead.roleVolume >= 3) {
      checks.push({
        title: "PRA 2014 Pension Dual-Deduction",
        desc: "Mandatory 10% Employer and 8% Employee contribution structured with licensed PFA.",
        status: "Required Setup"
      });
    } else {
      checks.push({
        title: "PRA 2014 Advisory",
        desc: "Voluntary participation or preparatory dual-pension enrollment advisory.",
        status: "Low Risk"
      });
    }

    if (lead.industry === 'FinTech & Banking' || lead.notes?.toLowerCase().includes("handbook") || lead.notes?.toLowerCase().includes("itf")) {
      checks.push({
        title: "ITF 1% Payroll Levy",
        desc: "Requires 1% annual payroll fee filing. Recoverable via staff training audit refund channels.",
        status: "Compliance Lock"
      });
    }

    return checks;
  };

  return (
    <div id="leads_dashboard_wrapper" className="space-y-12">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="text-left max-w-2xl space-y-3">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#C9A23F] font-mono">Simulated Support Mail Inbox</span>
          <h1 className="text-3xl font-bold font-sans text-white tracking-tight leading-tight">
            Qualified Vacancy Leads & SMTP Dispatch Log env
          </h1>
          <p className="text-[#F4F6F9]/70 text-sm leading-relaxed">
            Every lead collected via the Sourcing Hub or Adewale's AI Chat has been successfully filed here. Review their localized operational specs alongside the exact SMTP mail logs sent to support.
          </p>
        </div>

        <button
          onClick={fetchLeads}
          disabled={isRefreshing}
          className="px-4 py-2.5 bg-white/5 border border-white/10 text-white rounded-md text-xs font-mono uppercase tracking-wider hover:bg-white/10 hover:border-[#C9A23F]/50 transition-all cursor-pointer flex items-center gap-2"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-[#C9A23F] ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Reload Server Store</span>
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20 bg-white/5 border border-white/10 rounded-2xl">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-t-transparent border-[#C9A23F] mx-auto"></div>
          <p className="text-xs text-[#F4F6F9]/40 mt-4 font-mono">Loading telemetry database...</p>
        </div>
      ) : leads.length === 0 ? (
        <div className="text-center py-20 bg-white/5 border border-dashed border-white/10 rounded-2xl space-y-4">
          <Globe className="w-10 h-10 text-white/20 mx-auto" />
          <h3 className="font-bold text-white text-base">No registered vacancy leads yet</h3>
          <p className="text-xs text-[#F4F6F9]/60 max-w-md mx-auto">
            Venture over to our <span className="text-[#C9A23F] font-semibold">AI Consult Partner</span> page to submit your company's strategic specifications!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Leads Table list - 5 Cols */}
          <div className="lg:col-span- così space-y-4 lg:col-span-5">
            <h3 className="text-xs font-mono uppercase tracking-wider text-white border-b border-white/10 pb-2">
              Registered Companies ({leads.length})
            </h3>

            <div className="space-y-3 max-h-[580px] overflow-y-auto pr-2 scrollbar-thin">
              {leads.map((lead) => {
                const isActive = selectedLead?.id === lead.id;
                return (
                  <div
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className={`p-4 border rounded-xl transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#C9A23F]/10 border-[#C9A23F] text-[#C9A23F]'
                        : 'bg-white/5 border-white/10 hover:bg-white/10 text-white'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-[#C9A23F] font-semibold">{lead.id}</span>
                        <h4 className="font-bold text-sm text-white group-hover:text-[#C9A23F]">{lead.clientName}</h4>
                      </div>
                      <span className="text-[9px] px-2 py-0.5 bg-white/5 border border-white/10 rounded font-mono uppercase">
                        {lead.location}
                      </span>
                    </div>

                    <p className="text-[11px] text-[#F4F6F9]/60 truncate mt-2 leading-relaxed">
                      Desired: <span className="text-white/80 font-medium">{lead.targetRoles}</span>
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-white/40 pt-3 border-t border-white/5 mt-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-white/30" />
                        {new Date(lead.timestamp).toLocaleDateString()}
                      </span>
                      <span className="font-mono text-[#C9A23F]">
                        {lead.roleVolume} Active Role{lead.roleVolume > 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sourcing Analytics and Mail Preview - 7 Cols */}
          <div className="lg:col-span-7 bg-[#0A1828] border border-white/10 rounded-2xl p-6 sm:p-8 card-shadow space-y-8 min-h-[580px]">
            {selectedLead ? (
              <div className="space-y-8 animate-fadeIn">
                {/* Header */}
                <div className="border-b border-white/10 pb-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono uppercase bg-[#C9A23F]/15 border border-[#C9A23F]/30 text-[#C9A23F] px-2.5 py-1 rounded">
                      Lead Diagnostics
                    </span>
                    <span className="text-xs text-white/50 font-mono">{selectedLead.id}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">{selectedLead.clientName}</h3>
                  <p className="text-xs text-[#C9A23F] font-mono leading-relaxed truncate">Contact: {selectedLead.email}</p>
                </div>

                {/* Sourcing details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-1">
                    <p className="text-[#F4F6F9]/45 text-[9px] uppercase tracking-wider">Business Sector</p>
                    <p className="text-white font-sans font-bold">{selectedLead.industry}</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-1">
                    <p className="text-[#F4F6F9]/45 text-[9px] uppercase tracking-wider">Vacancies Depth</p>
                    <p className="text-white font-sans font-bold">{selectedLead.targetRoles}</p>
                  </div>
                </div>

                {/* Rules-based Compliance Engine details */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5 border-b border-white/5 pb-1">
                    <Compass className="w-3.5 h-3.5 text-[#C9A23F]" />
                    Suggested Nigerian Compliance Matrix
                  </h4>
                  <div className="grid grid-cols-1 gap-3 text-xs leading-relaxed">
                    {getComplianceCheckmarks(selectedLead).map((chk, i) => (
                      <div key={i} className="p-3.5 bg-white/5 border border-white/10 rounded-lg flex gap-3 items-start justify-between">
                        <div className="space-y-1">
                          <p className="font-bold text-white font-sans">{chk.title}</p>
                          <p className="text-[#F4F6F9]/60 text-[11px] leading-relaxed mt-0.5">{chk.desc}</p>
                        </div>
                        <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded ${
                          chk.status === 'Urgent Audit'
                            ? 'bg-red-950/40 text-red-400 border border-red-950'
                            : 'bg-amber-950/40 text-amber-450 border border-amber-900/40'
                        }`}>
                          {chk.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Extra Notes if provided */}
                {selectedLead.notes && (
                  <div className="p-4 bg-[#C9A23F]/5 border border-[#C9A23F]/20 rounded-xl space-y-1">
                    <span className="text-[9px] uppercase tracking-wider font-semibold font-mono text-[#C9A23F]">Client Brief Directives:</span>
                    <p className="text-xs text-[#F4F6F9]/80 leading-relaxed italic mt-1 font-sans">
                      &ldquo;{selectedLead.notes}&rdquo;
                    </p>
                  </div>
                )}

                {/* Simulated Email & SMTP Logs Terminal */}
                <div className="space-y-3 bg-[#050D18] rounded-xl border border-white/10 p-5 font-mono overflow-x-auto text-[11px] leading-relaxed">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-[10px] text-white/50 flex items-center gap-1.5 uppercase font-mono">
                      <Terminal className="w-3.5 h-3.5 text-green-400" />
                      SMTP Mail Delivery Log console
                    </span>
                    <span className="text-[9px] px-2 py-0.5 bg-green-500/10 text-green-400 rounded-lg border border-green-500/20 font-bold tracking-widest uppercase">
                      SENT SUCCESS
                    </span>
                  </div>

                  <div className="space-y-4 pt-2 text-[#F4F6F9]/90 text-[11px] max-h-[260px] overflow-y-auto">
                    {/* Simulated eMail metadata headers */}
                    <div className="space-y-1 border-b border-white/5 pb-3">
                      <p><span className="text-white/40">RFC-822-sender:</span> {selectedLead.emailSimulated.sender}</p>
                      <p><span className="text-white/40">RFC-822-recipient:</span> {selectedLead.emailSimulated.recipient}</p>
                      <p><span className="text-white/40">RFC-822-subject:</span> {selectedLead.emailSimulated.subject}</p>
                    </div>

                    <div className="text-green-300 leading-normal font-mono text-[10px] whitespace-pre-wrap">
                      {selectedLead.emailSimulated.smtpLog}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-20 bg-white/5 border border-dashed border-white/10 rounded-2xl">
                <FileText className="w-10 h-10 text-white/20 mx-auto" />
                <h3 className="font-bold text-white text-base">Select a registered lead</h3>
                <p className="text-xs text-[#F4F6F9]/60 max-w-sm mx-auto">
                  Click on any company from the roster on the left to review their SMTP logs and calculated labor compliance strategy parameters.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

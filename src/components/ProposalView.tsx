import React, { useState } from 'react';
import { Page } from '../types';
import { Calendar, Briefcase, FileText, CheckCircle2, DollarSign, Clock, HelpCircle, GraduationCap, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Phase {
  id: number;
  title: string;
  weeks: string;
  description: string;
  activities: string[];
  deliverables: string[];
  keyMetric: string;
}

export default function ProposalView() {
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);
  
  // RETAINER CALCULATOR STATE
  const [volume, setVolume] = useState<number>(3);
  const [difficulty, setDifficulty] = useState<'Standard' | 'Specialized' | 'Executive'>('Specialized');
  const [includeHandbook, setIncludeHandbook] = useState<boolean>(true);
  const [includeAudit, setIncludeAudit] = useState<boolean>(true);

  // REQUEST-BASED LOCK STATE FOR CONFIDENTIAL PRICING
  const [isPricingUnlocked, setIsPricingUnlocked] = useState<boolean>(false);
  const [clientName, setClientName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleRequestPricing = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !email.trim()) {
      setErrorMsg("Please provide both your Company Name and Work Email.");
      return;
    }
    setIsSubmitting(true);
    setErrorMsg(null);
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientName: clientName.trim(),
          email: email.trim(),
          targetRoles: `${volume} x ${difficulty} Vacancies`,
          location: 'Lagos',
          roleVolume: volume,
          industry: 'FinTech & Banking',
          notes: `Requested confidential retainer pricing index for ${volume} ${difficulty} role(s). Include Handbook: ${includeHandbook ? 'YES' : 'NO'}. Include Compliance Audit: ${includeAudit ? 'YES' : 'NO'}.`
        }),
      });

      if (response.ok) {
        setIsPricingUnlocked(true);
      } else {
        setErrorMsg("Failed to dispatch pricing request. Please try again.");
      }
    } catch (err) {
      setErrorMsg("Internal connection error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const phases: Phase[] = [
    {
      id: 1,
      title: 'Phase I: Discovery Stage',
      weeks: 'Weeks 1–2',
      description: 'We audit your current recruitment methods and align on clear targets.',
      activities: [
        'Stakeholder alignment interviews to identify operational bottlenecks.',
        'Current-state HR operations & regulatory compliance audit.',
        'Synthesizing roles requirement profiles and standardizing compensation metrics.',
        'Building the formal 12-week operational SLA parameters.'
      ],
      deliverables: [
        'Hiring Process Gap Analysis Report',
        'Compliance Readiness Scorecard',
        'Role-specific Requirement Definitions'
      ],
      keyMetric: 'Clear baseline and target roles finalized by Day 10.'
    },
    {
      id: 2,
      title: 'Phase II: Design Stage',
      weeks: 'Weeks 3–4',
      description: 'We construct structure-oriented criteria models and launch high-impact sourcing systems.',
      activities: [
        'Creating objective evaluation scorecards to minimize interviewer bias.',
        'Developing the optimized Candidate Attraction playbook with branding assets.',
        'Deploying and configuring robust Applicant Tracking Systems (ATS) pipeline workflow.',
        'Standardizing the dual-structured vetting assessments.'
      ],
      deliverables: [
        'Standard Structured Interview Guide',
        'Candidate Attraction and Employer Brand Deck',
        'Custom Applicant Tracking System Pipeline Blueprint'
      ],
      keyMetric: 'Active sourcing pipelines live for all prioritized roles by Day 25.'
    },
    {
      id: 3,
      title: 'Phase III: Pilot Stage',
      weeks: 'Weeks 5–8',
      description: 'We drive energetic active hunting campaigns and train internal teams.',
      activities: [
        'Executing active outbound outreach on premium channels (LinkedIn, networks).',
        'Internal HR manager training on structured evaluation metrics.',
        'Direct candidate screening, testing, and presenting tier-1 shortlists.',
        'Managing local regulatory files remediation (ITF, NSITF, Pension sign-offs).'
      ],
      deliverables: [
        'Tier-1 Vetted Shortlists & Portfolio Assessment Decks',
        'Staff Selection Training Deck for internal stakeholders',
        'Interim Compliance Verification Audit Certificate'
      ],
      keyMetric: 'First set of formal employment offers sent by Week 7.'
    },
    {
      id: 4,
      title: 'Phase IV: Scale Stage',
      weeks: 'Weeks 9–12',
      description: 'We orchestrate onboarding, verify operational health, and execute formal handover.',
      activities: [
        'Guiding structured onboarding sequence to minimize initial churn.',
        'Reviewing pilot progress and finalizing the long-term workforce registry.',
        'Consolidating all frameworks into a handover file.',
        'Formal closing alignment with internal operational heads.'
      ],
      deliverables: [
        'Standard 90-Day New Hire Retention Calendar',
        'Comprehensive Custom Recruiting Playbook Handover File',
        'Final Operations SLA & Audit Readiness Report'
      ],
      keyMetric: '100% handover completed with 90-day retention checkpoints live.'
    }
  ];

  // CALCULATE SLA EXPECTATIONS
  const calculateSLA = () => {
    let baseTime = 30; // standard days
    let multiplier = 1;
    let basePriceMultiplier = 1;

    if (difficulty === 'Specialized') {
      baseTime = 40;
      multiplier = 1.35;
      basePriceMultiplier = 1.4;
    } else if (difficulty === 'Executive') {
      baseTime = 55;
      multiplier = 1.8;
      basePriceMultiplier = 2.0;
    }

    // adjustments based on volume
    const volumeAdjustment = Math.max(0.8, 1 - (volume * 0.015)); // slight economy of scale
    const finalDaysMin = Math.round(baseTime * volumeAdjustment);
    const finalDaysMax = Math.round((baseTime + 10) * volumeAdjustment);

    // approximate premium advisory retainer price in Naira (NGN)
    let retainerFee = 1200000; // base monthly retainer
    retainerFee = retainerFee * basePriceMultiplier * (1 + (volume * 0.12));
    
    if (includeHandbook) retainerFee += 350000;
    if (includeAudit) retainerFee += 250000;

    // expected retention
    const retentionRate = difficulty === 'Executive' ? '90%' : '85%';

    return {
      daysMin: finalDaysMin,
      daysMax: finalDaysMax,
      monthlyRetainer: retainerFee,
      retentionRate,
      weeksRequired: difficulty === 'Executive' ? 14 : 12,
      complianceSafetyChance: '98%'
    };
  };

  const slaResults = calculateSLA();

  return (
    <div id="proposal_view_wrapper" className="space-y-16">
      {/* Editorial Header */}
      <div className="text-left max-w-3xl space-y-4">
        <span className="text-xs uppercase tracking-widest font-semibold text-[#C9A23F] font-mono">Operational Proposal</span>
        <h1 className="text-3xl sm:text-4xl font-bold font-sans text-white tracking-tight leading-tight">
          Standardizing the 12-Week Strategic Hiring Plan
        </h1>
        <p className="text-[#F4F6F9]/70 text-base leading-relaxed">
          Our proposal is built around speed, accountability, and absolute compliance. We do not just find candidates; we standardise your operational hiring infrastructure to achieve a lasting 90-day retention curve.
        </p>
      </div>

      {/* Interactive 12-Week Phase Grid */}
      <section id="interactive_proposal_timeline" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Tabs */}
        <div className="lg:col-span-4 space-y-3">
          <p className="text-xs text-[#F4F6F9]/50 font-mono uppercase tracking-wider mb-2 px-1">Engagement Phases</p>
          {phases.map((phase, idx) => {
            const isSelected = activePhaseIndex === idx;
            return (
              <button
                key={phase.id}
                id={`phase_tab_btn_${phase.id}`}
                onClick={() => setActivePhaseIndex(idx)}
                className={`w-full text-left p-5 rounded-xl border transition-all text-sm outline-none cursor-pointer flex items-start gap-4 ${
                  isSelected
                    ? 'bg-[#C9A23F]/10 border-[#C9A23F] text-white shadow-lg'
                    : 'bg-white/5 hover:bg-white/10 border-white/10 text-white/80'
                }`}
              >
                <div className={`p-2 rounded-lg font-mono text-xs w-9 h-9 flex items-center justify-center font-bold ${
                  isSelected ? 'bg-[#C9A23F] text-[#0C2440]' : 'bg-white/5 text-[#F4F6F9]/60'
                }`}>
                  0{phase.id}
                </div>
                <div className="space-y-1">
                  <p className={`font-mono text-xs opacity-70 ${isSelected ? 'text-[#C9A23F]' : 'text-[#F4F6F9]/50'}`}>
                    {phase.weeks}
                  </p>
                  <p className="font-bold text-sm leading-tight">{phase.title}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Phase Detail Panel */}
        <div className="lg:col-span-8 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 card-shadow min-h-[420px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePhaseIndex}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: -10, x: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <span className="text-xs font-mono font-bold text-[#C9A23F] uppercase tracking-widest block mb-1">
                    {phases[activePhaseIndex].weeks}
                  </span>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    {phases[activePhaseIndex].title}
                  </h3>
                </div>
                <div className="bg-[#0A1828] border border-white/10 text-[#F4F6F9]/80 px-4 py-2 rounded-lg text-xs font-mono">
                  SLA Target: <span className="font-bold text-[#C9A23F]">{phases[activePhaseIndex].keyMetric}</span>
                </div>
              </div>

              <p className="text-[#F4F6F9]/70 text-sm leading-relaxed font-sans">
                {phases[activePhaseIndex].description}
              </p>

              {/* Grid of details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-[#C9A23F]" />
                    Key Activities & Operations
                  </h4>
                  <ul className="space-y-2 text-[#F4F6F9]/70 text-sm">
                    {phases[activePhaseIndex].activities.map((act, i) => (
                      <li key={i} className="flex gap-2 items-start leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C9A23F] mt-2 flex-shrink-0"></span>
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 font-mono">
                    <FileText className="w-3.5 h-3.5 text-[#C9A23F]" />
                    Tangible Deliverables
                  </h4>
                  <ul className="space-y-2 text-[#F4F6F9]/70 text-sm">
                    {phases[activePhaseIndex].deliverables.map((del, i) => (
                      <li key={i} className="flex gap-2 items-center leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-[#C9A23F] flex-shrink-0" />
                        <span className="font-medium text-white/90">{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="border-t border-white/10 pt-5 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F4F6F9]/40">
            <p>Each milestone is signed off by your project sponsor prior to next-phase execution.</p>
            <span className="font-mono text-[#C9A23F] font-semibold uppercase tracking-wider text-[10px]">PrimeHub Quality SLA certified</span>
          </div>
        </div>
      </section>

      {/* Retainer & SLA Calculator Map */}
      <section id="retainer_calculator" className="bg-[#0A1828] border border-white/10 rounded-3xl p-6 sm:p-10 space-y-10">
        <div className="text-left space-y-2">
          <span className="px-2.5 py-1 bg-[#C9A23F]/15 text-[#C9A23F] border border-[#C9A23F]/25 text-[10px] font-mono rounded-md font-semibold tracking-wider uppercase">
            ENGAGEMENT CALCULATOR
          </span>
          <h2 className="text-2xl font-bold text-white tracking-tight">Project Retainer & SLA Parameter Estimator</h2>
          <p className="text-sm text-[#F4F6F9]/60">Tune the variables below to map standard recruitment SLA timings, required onboarding structures, and monthly advisory retainer coefficients.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Panel */}
          <div className="lg:col-span-7 bg-white/5 p-6 sm:p-8 rounded-2xl border border-white/10 card-shadow space-y-8">
            {/* Target Hires Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-white">Target Role Vacancies</label>
                <span className="px-3 py-1 bg-[#0A1828] border border-white/10 rounded-md font-mono text-sm font-bold text-[#C9A23F]">{volume} Roles</span>
              </div>
              <input
                id="volume_slider"
                type="range"
                min="1"
                max="20"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full accent-[#C9A23F] cursor-ew-resize h-1.5 bg-[#0C2440] rounded-lg"
              />
              <p className="text-[11px] text-[#F4F6F9]/40 leading-normal">Scale discount scales automatically beyond 3 prioritized roles.</p>
            </div>

            {/* Sourcing Difficulty Group */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-white block">Typical Candidate Difficulty</label>
              <div className="grid grid-cols-3 gap-3">
                {(['Standard', 'Specialized', 'Executive'] as const).map((diff) => {
                  const active = difficulty === diff;
                  return (
                    <button
                      key={diff}
                      id={`difficulty_btn_${diff.toLowerCase()}`}
                      onClick={() => setDifficulty(diff)}
                      className={`py-3 px-2 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer outline-none ${
                        active
                          ? 'bg-[#C9A23F]/15 border-[#C9A23F] text-[#C9A23F] font-bold'
                          : 'bg-white/5 border-white/10 text-[#F4F6F9]/70 hover:bg-white/10'
                      }`}
                    >
                      {diff}
                      <span className="block text-[10px] font-normal opacity-60 mt-1">
                        {diff === 'Standard' ? 'Front-Line Ops' : diff === 'Specialized' ? 'Tech/Finance Execs' : 'C-Suite MDs'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Compliance Add-ons Checklist */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-white block">Included Foundations & Audits</label>
              <div className="space-y-3">
                <label className="flex items-start gap-3 p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg cursor-pointer transition-colors text-sm text-[#F4F6F9]/80 select-none">
                  <input
                    id="include_handbook_chk"
                    type="checkbox"
                    checked={includeHandbook}
                    onChange={(e) => setIncludeHandbook(e.target.checked)}
                    className="mt-1 accent-[#C9A23F] w-4 h-4"
                  />
                  <div>
                    <p className="font-bold text-white">Complete Custom Employee Handbook & Playbook</p>
                    <p className="text-[11px] text-[#F4F6F9]/55 mt-0.5">Drafting 12 section playbooks, standardizing disciplinary codes and leave definitions matching Nigerian labor laws.</p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg cursor-pointer transition-colors text-sm text-[#F4F6F9]/80 select-none">
                  <input
                    id="include_audit_chk"
                    type="checkbox"
                    checked={includeAudit}
                    onChange={(e) => setIncludeAudit(e.target.checked)}
                    className="mt-1 accent-[#C9A23F] w-4 h-4"
                  />
                  <div>
                    <p className="font-bold text-white">Comprehensive Payroll Taxes & Compliance Audit</p>
                    <p className="text-[11px] text-[#F4F6F9]/55 mt-0.5">Analyzing structures for ITF contributions, payroll PAYE filings, Pension Reform compliance, and NSITF premium ratings.</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Results Summary Sidebar */}
          <div className="lg:col-span-5 bg-[#0C2440] text-[#F4F6F9] rounded-2xl p-6 sm:p-8 space-y-6 border border-white/10 shadow-xl">
            <h3 className="text-lg font-bold tracking-tight border-b border-white/10 pb-4 text-white font-mono uppercase text-xs tracking-wider">Estimated Parametric SLA Outcome</h3>
            
            <div className="space-y-6">
              {/* Estimated Time to Fill */}
              <div className="flex gap-4 items-start">
                <div className="p-2 bg-[#0A1828] text-[#C9A23F] border border-white/5 rounded-lg">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-[#F4F6F9]/50 uppercase tracking-widest">SLA Time-to-Fill Commit</p>
                  <p className="text-2xl font-bold text-white mt-1 font-mono">{slaResults.daysMin}–{slaResults.daysMax} Days</p>
                  <p className="text-[11px] text-[#F4F6F9]/50 mt-1">Average candidate delivered within {Math.round(slaResults.daysMin / 2)} days.</p>
                </div>
              </div>

              {/* Expected Churn Check */}
              <div className="flex gap-4 items-start">
                <div className="p-2 bg-[#0A1828] text-[#C9A23F] border border-white/5 rounded-lg">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-[#F4F6F9]/50 uppercase tracking-widest">Target 90-Day Retention</p>
                  <p className="text-2xl font-bold text-white mt-1 font-mono">{slaResults.retentionRate}</p>
                  <p className="text-[11px] text-[#F4F6F9]/50 mt-1">Backed by structured cultural scorecards & active vetting.</p>
                </div>
              </div>

              {/* Expected Churn Check */}
              <div className="flex gap-4 items-start">
                <div className="p-2 bg-[#0A1828] text-[#C9A23F] border border-white/5 rounded-lg">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-[#F4F6F9]/50 uppercase tracking-widest">Regulatory Safety Rating</p>
                  <p className="text-2xl font-bold text-white mt-1 font-mono">{slaResults.complianceSafetyChance} Compliant</p>
                  <p className="text-[11px] text-[#F4F6F9]/50 mt-1">Insured against standard audit penal variables.</p>
                </div>
              </div>

              {/* Expected Churn Check */}
              <div className="flex flex-col gap-4 border-t border-white/10 pt-5">
                <div className="flex gap-4 items-start">
                  <div className="p-2 bg-[#0A1828] text-[#C9A23F] border border-white/5 rounded-lg">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <div className="w-full">
                    <p className="text-[10px] font-mono text-[#F4F6F9]/50 uppercase tracking-widest">Calculated Project Index Fee</p>
                    {isPricingUnlocked ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        <p className="text-3xl font-bold text-[#C9A23F] mt-1 font-mono">
                          ₦{slaResults.monthlyRetainer.toLocaleString()}
                        </p>
                        <p className="text-[11px] text-green-400 mt-1 font-semibold flex items-center gap-1">
                          ✓ Confidentially Unlocked & Logged to Leads Desk
                        </p>
                      </motion.div>
                    ) : (
                      <div>
                        <p className="text-sm font-bold text-[#C9A23F] mt-1 font-mono uppercase bg-[#C9A23F]/10 px-2.5 py-1.5 rounded-md border border-[#C9A23F]/20 inline-block">
                          Confidential - Submit Request
                        </p>
                        <p className="text-[10px] text-[#F4F6F9]/60 mt-1.5 leading-relaxed">
                          Pricing index ranges are confidential under Nigerian SLA policies. Submit your organization parameters to secure the pricing profile.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {!isPricingUnlocked && (
                  <form onSubmit={handleRequestPricing} className="bg-[#0A1828] p-4 rounded-xl border border-white/10 space-y-3 mt-2">
                    <p className="text-[10px] font-bold text-[#C9A23F] uppercase tracking-wider font-mono">Request Confidential Quote</p>
                    
                    <div className="space-y-1">
                      <input
                        type="text"
                        required
                        placeholder="Company Name"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full px-2.5 py-2 bg-[#0C2440] border border-white/10 rounded text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#C9A23F]"
                      />
                    </div>

                    <div className="space-y-1">
                      <input
                        type="email"
                        required
                        placeholder="Work Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-2.5 py-2 bg-[#0C2440] border border-white/10 rounded text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#C9A23F]"
                      />
                    </div>

                    {errorMsg && (
                      <p className="text-[10px] text-red-400 leading-tight font-mono">{errorMsg}</p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-2 bg-[#C9A23F] hover:bg-[#b58f33] text-[#0C2440] font-bold text-[10px] uppercase tracking-wider rounded transition-colors cursor-pointer"
                    >
                      {isSubmitting ? "Submitting Request..." : "Request Fee Estimate"}
                    </button>
                  </form>
                )}
              </div>
            </div>

            <div className="bg-[#0A1828] border border-white/10 p-4 rounded-xl text-[10px] text-[#F4F6F9]/50 leading-relaxed">
              <span className="font-bold text-[#C9A23F]">Disclaimer:</span> This is a strategic projection matching historical benchmarks across Nigerian companies. Final pricing and timelines are formalized following the discovery phase.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import React, { useState } from 'react';
import { 
  Building, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Calendar, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  ChevronRight,
  ShieldCheck,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { saveLead } from '../services/staticData';

export default function ContactView() {
  const [clientName, setClientName] = useState<string>('');
  const [industry, setIndustry] = useState<string>('Finance & Banking');
  const [contactName, setContactName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [serviceNeeded, setServiceNeeded] = useState<string>('Executive Search');
  const [challenges, setChallenges] = useState<string>('');

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [blueprint, setBlueprint] = useState<any | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !contactName.trim() || !email.trim()) {
      setApiError("Kindly verify that Company Name, Contact Name, and Work Email are present.");
      return;
    }

    setLoading(true);
    setApiError(null);
    saveLead({
      clientName: clientName.trim(),
      email: email.trim(),
      targetRoles: serviceNeeded,
      location: 'Lagos',
      roleVolume: 1,
      industry,
      notes: `Contact Name: ${contactName.trim()}
Primary Service: ${serviceNeeded}
Challenges: ${challenges.trim()}`,
    });

    setBlueprint(generateTails(clientName, industry, serviceNeeded, contactName));
    setSubmitted(true);
    setLoading(false);
  };

  const generateTails = (firm: string, ind: string, service: string, contact: string) => {
    let timelineDays = 30;
    let complianceTasks: string[] = [];
    let implementationPhases: any[] = [];

    if (service === 'Executive Search') {
      timelineDays = 45;
      complianceTasks = [
        'Confidential candidate verification including PenCom dual enrollment validation',
        'State tax residency checks (LIRS / FCT-IRS) for senior compensation index structuring',
        'Legally draft Executive Employment Contract with custom protective non-compete clauses'
      ];
      implementationPhases = [
        { name: 'Weeks 1-2: Profile Formulation', desc: 'Craft high-context candidate scorecards and ideal persona markers.' },
        { name: 'Weeks 3-5: Passive Sourcing Filters', desc: 'Sourcing passive tech leaders and executives from our secure network.' },
        { name: 'Weeks 6-8: Screenings & Offers', desc: 'Present top 3 shortlists, run cognitive tests, and close contracts.' }
      ];
    } else if (service === 'HR Consulting & Strategy') {
      timelineDays = 60;
      complianceTasks = [
        'Perform internal workforce audit to assess pension and training tax liabilities',
        'ITF compliance tracking & setup to prevent penalties if annual turnover is over ₦50M',
        'Draft 12-section custom Staff Handbook aligned with Nigerian trade dispute standards'
      ];
      implementationPhases = [
        { name: 'Weeks 1-3: Operations Audit', desc: 'Review current payroll, contracts, and statutory contribution registries.' },
        { name: 'Weeks 4-6: Manual Formulation', desc: 'Custom build employee handbooks, dispute handling files, and policy guidelines.' },
        { name: 'Weeks 7-9: Alignment & Onboard', desc: 'Roll out manager workshops and configure performance metric scorecards.' }
      ];
    } else if (service === 'Talent Assessment') {
      timelineDays = 30;
      complianceTasks = [
        'Formulate bias-free selection benchmarks compliant with local non-discriminatory codes',
        'Audit job specifications against local university curricula standards',
        'Perform basic cognitive, emotional, and technical screen test matrix'
      ];
      implementationPhases = [
        { name: 'Week 1: Test Calibration', desc: 'Deploy tailored psychometric and coding tests relative to the industry.' },
        { name: 'Weeks 2-3: Deployment Cycle', desc: 'Review candidate responses with our automated assessment engine.' },
        { name: 'Week 4: Review Handoff', desc: 'Deliver top shortlist scorecards and feedback to hiring managers.' }
      ];
    } else {
      // Payroll & Compliance
      timelineDays = 40;
      complianceTasks = [
        'Establish direct interface with LIRS/FCT-IRS for automated statutory tax payroll schedules',
        'Integrate 1% gross payroll contribution schedule under the NSITF workmen compensation plan',
        'Optimize pension remittance calculations to avoid retroactive PenCom penalties'
      ];
      implementationPhases = [
        { name: 'Weeks 1-2: Payroll Mapping', desc: 'Reconcile previous salaries against legal allowances (housing, transport hubs).' },
        { name: 'Weeks 3-4: Portal Registries', desc: 'Create LIRS, NSITF, and PenCom company accounts if missing.' },
        { name: 'Weeks 5-6: Live Run & Handover', desc: 'Automate tax computations with verified spreadsheets and handoff.' }
      ];
    }

    return {
      firm,
      ind,
      service,
      contact,
      timelineDays,
      complianceTasks,
      phases: implementationPhases
    };
  };

  const handleReset = () => {
    setClientName('');
    setContactName('');
    setEmail('');
    setChallenges('');
    setSubmitted(false);
    setBlueprint(null);
  };

  return (
    <div id="contact_proposal_view_root" className="space-y-12">
      {/* Hero Section */}
      <section id="contact_hero" className="bg-[#0A1828]/60 border border-white/10 rounded-3xl p-8 sm:p-12 relative overflow-hidden card-shadow">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-3xl space-y-4 text-left">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#C9A23F] font-mono">ENQUIRE TODAY</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-white tracking-tight leading-tight">
            Request a Tailored HR or Recruitment Proposal
          </h1>
          <p className="text-[#F4F6F9]/70 text-base leading-relaxed max-w-2xl">
            Partner with Nigeria's leading executive HR firm. Share your unique challenges with us, and we'll craft a customized strategy to elevate your workforce and business operations.
          </p>
        </div>
      </section>

      {/* Main Grid: Form on left, Success Document OR Timeline on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: The Interactive Form (Grounded in bento design) */}
        <div className="lg:col-span-8 bg-white/5 border border-white/10 p-6 sm:p-8 rounded-2xl card-shadow text-left">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Let's build your solution.</h2>
                <p className="text-xs text-[#F4F6F9]/60 leading-normal">
                  Please provide the details below so our senior consultants can prepare a precise proposal.
                </p>
              </div>

              {apiError && (
                <div className="p-4 bg-red-950/40 border border-red-900/30 text-red-300 text-xs rounded-lg">
                  <span className="font-bold">Error:</span> {apiError}
                </div>
              )}

              {/* Section: Company Info */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#C9A23F] uppercase tracking-wider font-mono flex items-center gap-2 border-b border-white/10 pb-2">
                  <span className="w-1.5 h-4 bg-[#C9A23F] inline-block rounded-full"></span>
                  Company Profile
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="company_name" className="text-xs font-semibold text-[#F4F6F9]/70">Company Name *</label>
                    <input
                      id="company_name"
                      type="text"
                      required
                      placeholder="Acme Corp Ltd."
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-4 py-3 bg-[#0C2440] border border-white/10 rounded-lg text-sm text-white placeholder-white/30 focus:border-[#C9A23F] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="industry_select" className="text-xs font-semibold text-[#F4F6F9]/70">Industry</label>
                    <select
                      id="industry_select"
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="w-full px-4 py-3 bg-[#0C2440] border border-white/10 rounded-lg text-sm text-white focus:border-[#C9A23F] focus:outline-none transition-colors"
                    >
                      <option className="bg-[#000e22]">Finance & Banking</option>
                      <option className="bg-[#000e22]">Technology</option>
                      <option className="bg-[#000e22]">Oil & Gas</option>
                      <option className="bg-[#000e22]">Manufacturing</option>
                      <option className="bg-[#000e22]">Healthcare</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="contact_name" className="text-xs font-semibold text-[#F4F6F9]/70">Contact Name *</label>
                    <input
                      id="contact_name"
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-4 py-3 bg-[#0C2440] border border-white/10 rounded-lg text-sm text-white placeholder-white/30 focus:border-[#C9A23F] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="work_email" className="text-xs font-semibold text-[#F4F6F9]/70">Work Email *</label>
                    <input
                      id="work_email"
                      type="email"
                      required
                      placeholder="jane@acme.com.ng"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-[#0C2440] border border-white/10 rounded-lg text-sm text-white placeholder-white/30 focus:border-[#C9A23F] focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Section: Service Details */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#C9A23F] uppercase tracking-wider font-mono flex items-center gap-2 border-b border-white/10 pb-2">
                  <span className="w-1.5 h-4 bg-[#C9A23F] inline-block rounded-full"></span>
                  Service Requirements
                </h3>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#F4F6F9]/70 block">Primary Service Needed *</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      'Executive Search',
                      'HR Consulting & Strategy',
                      'Talent Assessment',
                      'Payroll & Compliance'
                    ].map((svc) => (
                      <label 
                        key={svc}
                        className={`flex items-center p-3.5 border rounded-lg cursor-pointer transition-colors text-xs select-none ${
                          serviceNeeded === svc 
                            ? 'bg-[#C9A23F]/10 border-[#C9A23F] text-white' 
                            : 'bg-white/5 border-white/10 hover:bg-white/10 text-[#F4F6F9]/80'
                        }`}
                      >
                        <input
                          type="radio"
                          name="service"
                          value={svc}
                          checked={serviceNeeded === svc}
                          onChange={() => setServiceNeeded(svc)}
                          className="text-[#C9A23F] focus:ring-[#C9A23F] focus:ring-offset-0 bg-[#0C2440] border-white/20 w-4 h-4 mr-2.5"
                        />
                        <span className="font-medium">{svc}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="challenges" className="text-xs font-semibold text-[#F4F6F9]/70">Describe your current HR challenges or recruitment needs</label>
                  <textarea
                    id="challenges"
                    placeholder="We are looking to scale our operations team, transition to structured pension plans, draft compliant local contracts..."
                    rows={4}
                    value={challenges}
                    onChange={(e) => setChallenges(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0C2440] border border-white/10 rounded-lg text-sm text-white placeholder-white/30 focus:border-[#C9A23F] focus:outline-none transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Submit Action */}
              <div className="pt-2">
                <button
                  id="submit_request_btn"
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-4 bg-[#C9A23F] text-[#0C2440] hover:bg-[#b58f33] font-bold text-xs uppercase tracking-wider rounded-sm inline-flex items-center justify-center gap-2 cursor-pointer transition-colors outline-none disabled:opacity-55"
                >
                  {loading ? (
                    <>
                      <Clock className="w-4 h-4 animate-spin" />
                      Dispatched parameters...
                    </>
                  ) : (
                    <>
                      Submit Proposal Request
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* RESPONSE BLUEPRINT: Sourcing / Operational roadmap generated dynamically */
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="border-b border-white/10 pb-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] px-2.5 py-1 bg-green-500/15 text-green-400 border border-green-500/20 font-bold rounded font-mono uppercase tracking-wider">
                    Proposal Request Dispatched
                  </span>
                  <span className="text-[10px] text-[#F4F6F9]/40 font-mono">REF: PR-{Date.now().toString().slice(-7)}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Tailored Engagement Strategy Blueprint</h3>
                <p className="text-xs text-[#F4F6F9]/60 leading-normal">
                  Formulated for <span className="font-semibold text-white">{blueprint?.firm}</span> ({blueprint?.ind}) based on your parameters. A senior partner has been assigned.
                </p>
              </div>

              {/* Strategic Index Key Metrics */}
              <div className="grid grid-cols-2 gap-4 bg-[#0A1828]/60 p-4 border border-white/10 rounded-xl font-mono text-xs text-left">
                <div>
                  <p className="text-[#F4F6F9]/40 text-[9px] uppercase tracking-widest block font-bold">Primary Target Service</p>
                  <p className="font-bold text-[#C9A23F] mt-1 text-sm">{blueprint?.service}</p>
                </div>
                <div>
                  <p className="text-[#F4F6F9]/40 text-[9px] uppercase tracking-widest block font-bold">Speed-to-Deploy SLA</p>
                  <p className="font-bold text-white mt-1 text-sm">~{blueprint?.timelineDays} Days Handoff</p>
                </div>
              </div>

              {/* State Compliance Checklist */}
              <div className="space-y-3 text-left">
                <h4 className="text-[11px] font-bold text-white uppercase tracking-widest font-mono flex items-center gap-1.5 border-b border-white/5 pb-1">
                  <ShieldCheck className="w-4 h-4 text-[#C9A23F]" />
                  Localized Mandatory Statutory Remittances (Nigeria)
                </h4>
                <ul className="space-y-3">
                  {blueprint?.complianceTasks.map((task: string, i: number) => (
                    <li key={i} className="flex gap-2.5 items-start text-xs text-[#F4F6F9]/75 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#C9A23F] flex-shrink-0 mt-0.5" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Core Phased Roadmap */}
              <div className="space-y-4 text-left pt-2 border-t border-white/10">
                <h4 className="text-[11px] font-bold text-white uppercase tracking-widest font-mono flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#C9A23F]" />
                  12-Week Sourcing & Alignment Roadmap
                </h4>
                <div className="space-y-3.5">
                  {blueprint?.phases.map((ph: any, i: number) => (
                    <div key={i} className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                      <div className="p-1 px-1.5 bg-[#C9A23F]/15 border border-[#C9A23F]/35 text-[#C9A23F] rounded font-mono text-[10px] font-bold select-none mt-0.5">
                        PH:0{i+1}
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-white text-xs">{ph.name}</p>
                        <p className="text-[#F4F6F9]/60 text-xs mt-0.5 leading-normal">{ph.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider rounded-sm border border-white/10"
                >
                  Submit Another Proposal
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* RIGHT COLUMN: What Happens Next? Timeline Sidebar */}
        <div className="lg:col-span-4 space-y-6 text-left">
          <div className="bg-[#0A1828]/60 p-6 rounded-2xl border border-white/10 shadow-lg sticky top-24 space-y-6">
            <h3 className="font-sans font-bold text-lg text-white border-b border-white/10 pb-2">
              What Happens Next?
            </h3>
            
            <div className="relative pl-5 space-y-6 before:absolute before:inset-y-0 before:left-[11px] before:w-px before:bg-white/10 before:top-2 before:bottom-2">
              {/* Timeline Item 1 */}
              <div className="relative">
                <div className="absolute -left-5 top-1.5 w-6 h-6 rounded-full bg-[#0C2440] border border-[#C9A23F] flex items-center justify-center font-bold text-[#C9A23F] text-[10px] shadow z-10">
                  1
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-[#C9A23F]">Instant Confirmation</h4>
                  <p className="text-xs text-[#F4F6F9]/65 leading-relaxed">
                    You will receive an automated email acknowledging receipt of your request.
                  </p>
                </div>
              </div>

              {/* Timeline Item 2 */}
              <div className="relative">
                <div className="absolute -left-5 top-1.5 w-6 h-6 rounded-full bg-[#0C2440] border border-white/20 flex items-center justify-center font-bold text-[#F4F6F9]/60 text-[10px] shadow z-10">
                  2
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-white">Discovery Call</h4>
                  <p className="text-xs text-[#F4F6F9]/65 leading-relaxed">
                    A senior consultant will contact you within 24 hours to discuss specifics.
                  </p>
                </div>
              </div>

              {/* Timeline Item 3 */}
              <div className="relative">
                <div className="absolute -left-5 top-1.5 w-6 h-6 rounded-full bg-[#0C2440] border border-white/20 flex items-center justify-center font-bold text-[#F4F6F9]/60 text-[10px] shadow z-10">
                  3
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-white">Proposal Delivery</h4>
                  <p className="text-xs text-[#F4F6F9]/65 leading-relaxed">
                    Receive a tailored, comprehensive proposal outlining strategy, timeline, and investment.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 text-xs space-y-2.5 text-[#F4F6F9]/60 leading-normal">
              <p className="font-bold text-[#C9A23F] uppercase tracking-wider text-[10px] font-mono">Immediate Assurances</p>
              <p>✓ Demo submissions are stored only in this browser.</p>
              <p>✓ We respect NDAs prior to any initial discovery call.</p>
            </div>
          </div>
        </div>

      </div>

      {/* Office locations footer bar */}
      <section id="office_locations" className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/10 pt-10">
        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl flex gap-4 items-start text-left">
          <div className="p-3 bg-[#0C2440] text-[#C9A23F] rounded-xl border border-white/5">
            <Building className="w-5 h-5" />
          </div>
          <div className="space-y-1 text-sm">
            <span className="text-[10px] font-bold text-[#C9A23F] uppercase tracking-widest font-mono">Headquarters</span>
            <h4 className="font-bold text-white">Lagos Office</h4>
            <p className="text-[#F4F6F9]/70 text-xs leading-relaxed">
              19, Onanefe Schuler Street, GIG Estate, Addo, Ajah, Lagos State, Nigeria.
            </p>
            <p className="text-[11px] text-[#F4F6F9]/40 pt-1">
              Tel: <span className="font-bold text-[#C9A23F]">+234 07036417393</span>
            </p>
          </div>
        </div>

        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl flex gap-4 items-start text-left">
          <div className="p-3 bg-[#0C2440] text-[#C9A23F] rounded-xl border border-white/5">
            <Building className="w-5 h-5" />
          </div>
          <div className="space-y-1 text-sm">
            <span className="text-[10px] font-bold text-[#C9A23F] uppercase tracking-widest font-mono">Administrative Hub</span>
            <h4 className="font-bold text-white">Abuja Office</h4>
            <p className="text-[#F4F6F9]/70 text-xs leading-relaxed">
              Central Business District, Diplomatic Envoy Zone, FCT-Abuja, Nigeria.
            </p>
            <p className="text-[11px] text-[#F4F6F9]/40 pt-1">
              Tel: <span className="font-bold text-[#C9A23F]">+234 07036417393</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

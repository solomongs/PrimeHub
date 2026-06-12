import React from 'react';
import { motion } from 'motion/react';
import { 
  UserCheck, 
  Gavel, 
  TrendingUp, 
  GraduationCap, 
  Users, 
  Wallet, 
  Brain, 
  Laptop, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface ServiceItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  keyDeliverables: string[];
}

export default function ServicesView() {
  const services: ServiceItem[] = [
    {
      id: 'recruitment',
      icon: <UserCheck className="w-6 h-6 text-[#C9A23F]" />,
      title: 'Recruitment',
      description: 'End-to-end talent acquisition targeting top-tier professionals aligned with your corporate culture and strategic goals.',
      keyDeliverables: ['Executive Search', 'Volume Hiring', 'Candidate Assessment']
    },
    {
      id: 'compliance',
      icon: <Gavel className="w-6 h-6 text-[#C9A23F]" />,
      title: 'HR Operations & Compliance',
      description: 'Structuring robust HR frameworks to ensure regulatory adherence and operational efficiency within the Nigerian labor landscape.',
      keyDeliverables: ['Policy Drafting', 'Audit & Remediation', 'Employee Handbooks']
    },
    {
      id: 'talent',
      icon: <TrendingUp className="w-6 h-6 text-[#C9A23F]" />,
      title: 'Talent & Performance',
      description: 'Developing systems to measure, manage, and maximize employee output while fostering continuous professional growth.',
      keyDeliverables: ['Appraisal Systems', 'Succession Planning', 'KPI Development']
    },
    {
      id: 'graduate',
      icon: <GraduationCap className="w-6 h-6 text-[#C9A23F]" />,
      title: 'Graduate Intake',
      description: 'Designing and executing structured programs to attract, assess, and onboard high-potential fresh graduates.',
      keyDeliverables: ['Program Design', 'Campus Outreach', 'Assessment Centers']
    },
    {
      id: 'diversity',
      icon: <Users className="w-6 h-6 text-[#C9A23F]" />,
      title: 'Diversity Hiring',
      description: 'Implementing strategies to build inclusive teams, ensuring representation across various demographics and skill sets.',
      keyDeliverables: ['Bias-Free Screening', 'Targeted Sourcing', 'Inclusion Audits']
    },
    {
      id: 'compensation',
      icon: <Wallet className="w-6 h-6 text-[#C9A23F]" />,
      title: 'Compensation Benchmarking',
      description: 'Data-driven analysis to structure competitive salary and benefit packages tailored to the Nigerian market.',
      keyDeliverables: ['Market Salary Surveys', 'Benefits Structuring', 'Equity Analysis']
    },
    {
      id: 'managers',
      icon: <Brain className="w-6 h-6 text-[#C9A23F]" />,
      title: 'Manager Enablement',
      description: 'Equipping mid-to-senior leaders with the tools and training required to manage teams effectively and drive business outcomes.',
      keyDeliverables: ['Leadership Workshops', 'Coaching Programs', 'Conflict Resolution']
    },
    {
      id: 'hris',
      icon: <Laptop className="w-6 h-6 text-[#C9A23F]" />,
      title: 'HRIS Advisory',
      description: 'Consulting on the selection, implementation, and optimization of Human Resource Information Systems to digitize HR operations.',
      keyDeliverables: ['System Audits', 'Vendor Selection', 'Implementation Support']
    }
  ];

  return (
    <div id="services_view_wrapper" className="space-y-16">
      {/* Editorial Header / Hero */}
      <section className="bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-12 relative overflow-hidden card-shadow">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#C9A23F]/5 rounded-full filter blur-3xl -z-10 translate-x-20 -translate-y-20"></div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#C9A23F] font-mono">Our Capabilities</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-sans text-white tracking-tight leading-tight">
              Modular HR Consulting Services for Growing Nigerian Companies
            </h1>
            <p className="text-[#F4F6F9]/70 text-base leading-relaxed max-w-2xl">
              Tailored solutions designed to scale with your business, ensuring compliance, performance, and strategic talent acquisition in a dynamic market.
            </p>
            <div className="pt-2">
              <a
                href="#services_grid_anchor"
                className="px-6 py-3 bg-[#C9A23F] hover:bg-[#b58f33] text-[#0C2440] font-bold text-xs uppercase tracking-wider rounded-sm inline-flex items-center gap-2 cursor-pointer transition-colors"
              >
                Explore Our Solution Matrix
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-xl border border-white/10 h-[320px]">
            <img 
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1000" 
              alt="Close-up of two professional black executives shaking hands in a bright, modern Nigerian corporate setting" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section id="services_grid_anchor" className="space-y-8 scrolling-mt-24">
        <div className="text-left space-y-2 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Structured Corporate Frameworks</h2>
          <p className="text-[#F4F6F9]/60 text-sm">
            We provide deep operational consulting across specialized HR domains to optimize employee output and secure regulatory adherence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, idx) => (
            <motion.div
              key={svc.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.3) }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#C9A23F]/50 hover:bg-white/[0.08] transition-all flex flex-col justify-between group relative overflow-hidden card-shadow"
            >
              <div>
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#C9A23F]/10 transition-colors">
                  {svc.icon}
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-[#C9A23F] transition-colors mb-3">
                  {svc.title}
                </h3>
                <p className="text-sm text-[#F4F6F9]/75 mb-6 leading-relaxed">
                  {svc.description}
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-[#0A1828]/60 p-4 rounded-xl border border-white/5 text-xs">
                  <p className="font-bold text-[#C9A23F] uppercase tracking-wider text-[10px] mb-2 font-mono">Key Deliverables</p>
                  <ul className="space-y-2">
                    {svc.keyDeliverables.map((deliv, i) => (
                      <li key={i} className="flex items-center gap-2 text-[#F4F6F9]/70">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A23F] flex-shrink-0" />
                        <span>{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Advisory Note */}
      <section className="bg-[#0A1828] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-left max-w-xl">
          <h4 className="text-sm font-mono uppercase tracking-wider text-[#C9A23F] font-bold flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            Bespoke Pricing Models
          </h4>
          <p className="text-sm text-white font-semibold">Need custom SLAs or combined capabilities?</p>
          <p className="text-xs text-[#F4F6F9]/60 leading-normal">
            Whether you are launching a Pan-African remote team, scaling graduate pipelines across Nigerian universities, or looking for continuous payroll audits, we tailor packages to match your direct corporate index.
          </p>
        </div>
        <div>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              window.location.hash = '#contact';
            }}
            className="px-5 py-3 bg-[#C9A23F] hover:bg-[#b58f33] text-[#0C2440] font-sans font-bold text-xs uppercase tracking-wider rounded-sm transition-all whitespace-nowrap"
          >
            Request Engagement Quote
          </a>
        </div>
      </section>
    </div>
  );
}

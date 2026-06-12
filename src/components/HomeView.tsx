import React from 'react';
import { Page } from '../types';
import { ArrowRight, ShieldCheck, Zap, Users, Trophy, ChevronRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface HomeViewProps {
  onNavigate: (page: Page) => void;
}

export default function HomeView({ onNavigate }: HomeViewProps) {
  const stats = [
    { label: 'Avg. Time-to-Fill', value: '30–45 Days', subtitle: 'Lagos/Abuja market average is 65+ days' },
    { label: 'Offer Acceptance', value: '75%–85%', subtitle: 'High candidates buy-in via precise selling' },
    { label: '90-Day Retention', value: '85%+', subtitle: 'Structured screening & cultural alignment' },
    { label: 'Compliance Index', value: '100%', subtitle: 'Audit-ready files for NSITF, ITF & Pensions' }
  ];

  const features = [
    {
      icon: <Users className="w-6 h-6 text-[#C9A23F]" />,
      title: 'Premium Executive Search & Tech Recruiting',
      description: 'We source tier-1 engineers, executive leaders, and operations managers across Nigeria. Leveraging active headhunting instead of passive job boards.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#C9A23F]" />,
      title: 'Nigerian Labor Compliance Bulletproofing',
      description: 'Deducting payroll variables can be legal minefields. We manage your compliance setup with NSITF, ITF statutory contributions, Pension Reform Act, and PAYE registries.'
    },
    {
      icon: <Zap className="w-6 h-6 text-[#C9A23F]" />,
      title: 'SLA-Driven Performance Standards',
      description: 'We replace opaque headhunting fees with crystal-clear Service Level Agreements. Get a transparent pipeline with weekly analytics reports and candidate analytics scorecards.'
    },
    {
      icon: <Trophy className="w-6 h-6 text-[#C9A23F]" />,
      title: 'Standardized Handover Playbooks',
      description: 'We do not just find people; we build your hiring engines. Every 12-week engagement hands over a custom Recruiting Playbook, Employee Handbook, and Standard Contracts.'
    }
  ];

  const industries = [
    'FinTech & Banking', 'Logistics & Supply Chain', 'E-commerce & Retail', 
    'Oil & Gas / Energy', 'Healthcare Services', 'FMCG & Manufacturing'
  ];

  return (
    <div id="home_view_wrapper" className="space-y-20">
      {/* Hero Section */}
      <section id="hero_section" className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 pt-6 items-center">
        <div className="lg:col-span-7 space-y-6 text-left">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-[#C9A23F]/10 text-[#C9A23F] border border-[#C9A23F]/20 text-xs font-semibold uppercase tracking-widest rounded-full"
          >
            <span className="w-2 h-2 rounded-full bg-[#C9A23F] animate-pulse"></span>
            PEOPLE • PERFORMANCE • PARTNERSHIP
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-sans font-bold text-white tracking-tight leading-tight"
          >
            Build Durable People Systems to Scale Your business in <span className="text-[#C9A23F]">Nigeria</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-[#F4F6F9]/70 leading-relaxed max-w-2xl"
          >
            PrimeHub helps companies hire fast, stay compliant, and build high-performance talent systems. Solve your critical roles, eliminate hiring bottlenecks, and build audit-ready HR foundations in 12 weeks.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <button
              id="cta_proposal_btn"
              onClick={() => onNavigate('proposal')}
              className="px-6 py-3.5 bg-[#C9A23F] text-[#0C2440] hover:bg-[#b58f33] font-semibold text-xs uppercase tracking-wider rounded-sm inline-flex items-center justify-center gap-2 cursor-pointer transition-colors outline-none"
            >
              Explore 12-Week Proposal
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              id="cta_profile_btn"
              onClick={() => onNavigate('profile')}
              className="px-6 py-3.5 bg-white/5 border border-white/10 text-white hover:bg-white/10 font-semibold text-xs uppercase tracking-wider rounded-sm inline-flex items-center justify-center gap-2 cursor-pointer transition-all outline-none"
            >
              View Company Profile
            </button>
          </motion.div>
        </div>

        {/* Hero Image Side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-[#C9A23F]/10 to-transparent rounded-2xl"></div>
          <img
            src="/src/assets/images/primehub_team_1781189008371.jpg"
            alt="PrimeHub Corporate Leadership Team in Lagos"
            className="w-full h-[460px] object-cover rounded-2xl shadow-xl border border-white/10"
            referrerPolicy="no-referrer"
          />
          {/* Subtle Float badging based on instructions */}
          <div className="absolute -bottom-6 -left-6 bg-[#0A1828] text-[#F4F6F9] p-5 rounded-xl shadow-lg border border-white/10 max-w-xs hidden sm:block">
            <p className="text-xs text-[#C9A23F] uppercase tracking-widest font-mono">Operations Hub</p>
            <p className="font-semibold text-xs mt-1 text-white/90">Lagos, Abuja & Remote networks matching local & diaspora talent pools.</p>
          </div>
        </motion.div>
      </section>

      {/* Core Real-Time SLA Dashboard */}
      <section id="sla_dashboard" className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8 card-shadow space-y-8">
        <div className="text-center md:text-left space-y-2">
          <h2 className="text-2xl font-bold text-white tracking-tight">Our Committed Performance Metrics</h2>
          <p className="text-sm text-[#F4F6F9]/60">We replace standard recruiting agency guesswork with contractual Service Level Agreements.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all stat-card"
            >
              <p className="text-xs font-semibold text-[#F4F6F9]/50 uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-bold text-[#C9A23F] mt-2 font-mono">{stat.value}</p>
              <p className="text-xs text-[#F4F6F9]/60 mt-2 leading-relaxed">{stat.subtitle}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why PrimeHub - Beautiful Split View */}
      <section id="why_primehub" className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Designed for Fast-Scaling & Compliance-Minded Companies
          </h2>
          <p className="text-[#F4F6F9]/75">
            Hiring talent and managing regulatory compliance in Nigeria is full of systemic bottlenecks. We manage the process end-to-end, so you can focus entirely on development and business growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="p-8 bg-white/5 border border-white/10 hover:border-[#C9A23F]/50 rounded-2xl card-shadow transition-all group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="p-3 bg-[#C9A23F]/10 rounded-xl w-fit group-hover:bg-[#C9A23F]/20 transition-all">
                  {feat.icon}
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-[#C9A23F] transition-colors">
                  {feat.title}
                </h3>
                <p className="text-[#F4F6F9]/70 text-sm leading-relaxed">
                  {feat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Client Sectors & Industries */}
      <section id="sectors" className="py-10 border-t border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">
          <div className="lg:col-span-1 text-left space-y-2">
            <h3 className="text-sm font-bold text-[#C9A23F] uppercase tracking-wider font-mono">Expertise Sectors</h3>
            <p className="text-xl font-bold text-white leading-snug">Diverse Industry Reach</p>
            <p className="text-xs text-[#F4F6F9]/50">Matching unique competencies across private & public sectors.</p>
          </div>
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {industries.map((ind, idx) => (
              <div key={idx} className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/5 hover:bg-[#C9A23F]/10 transition-colors">
                <CheckCircle2 className="w-4 h-4 text-[#C9A23F] flex-shrink-0" />
                <span className="text-sm font-medium text-white/90">{ind}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta_section" className="bg-[#0A1828] text-[#F4F6F9] rounded-3xl overflow-hidden relative p-8 md:p-14 border border-white/10 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#C9A23F]/5 rounded-full filter blur-3xl -z-10 translate-x-20 -translate-y-20"></div>
        <div className="max-w-3xl space-y-6">
          <p className="text-xs text-[#C9A23F] font-mono uppercase tracking-widest font-semibold">WANT TO HIRE FASTER AND SECURE OPERATIONS?</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Generate a Custom Recruitment Strategy for Your Roles</h2>
          <p className="text-[#F4F6F9]/70 leading-relaxed text-sm md:text-base">
            Provide details of your active vacancies or consulting needs. Our strategy generator calculates direct regulatory requirements, candidate sourcing channels, realistic SLAs, and generates a structured strategy blueprint customized to Lagos, Abuja, or Remote setups in Nigeria.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              id="cta_briefing_bottom"
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 bg-[#C9A23F] text-[#0C2440] hover:bg-[#b58f33] font-bold text-xs uppercase tracking-wider rounded-sm inline-flex items-center justify-center gap-2 cursor-pointer transition-colors active:scale-[98%]"
            >
              Start Custom Strategy Generator
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              id="cta_proposal_bottom"
              onClick={() => onNavigate('proposal')}
              className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider rounded-sm inline-flex items-center justify-center cursor-pointer transition-colors border border-white/10"
            >
              Interactive 12-Week Timeline
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

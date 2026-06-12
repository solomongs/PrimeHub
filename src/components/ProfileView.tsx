import React from 'react';
import { ComplianceFramework } from '../types';
import { ShieldCheck, Mail, Phone, MapPin, Building, Globe, Send, UserCheck, Star, Award, Notebook } from 'lucide-react';
import { motion } from 'motion/react';

export default function ProfileView() {
  const complianceFrameworks: ComplianceFramework[] = [
    {
      name: 'Pension Reform Act (PRA 2014)',
      short: 'Pension Compliance',
      description: 'Mandatory registration with recognized Pension Fund Administrators (PFAs). Structuring the legal minimum dual payroll deductions: 10% Employer and 8% Employee contributions.',
      penaltyRisk: 'High',
      authority: 'National Pension Commission (PenCom)',
      requiredFor: 'All Nigerian corporate entities employing 3 or more individuals.'
    },
    {
      name: 'Nigeria Social Insurance Trust Fund (NSITF)',
      short: 'Employee Compensation Act',
      description: 'Securing mandatory employee compensation covers. Enterprise filing of 1% statutory premium of complete monthly payroll against work-related hazards.',
      penaltyRisk: 'High',
      authority: 'Nigeria Social Insurance Trust Fund',
      requiredFor: 'Every private and public corporate entity operating in Nigeria.'
    },
    {
      name: 'Industrial Training Fund (ITF Act)',
      short: 'Training & Development Levy',
      description: 'Mandatory filing of 1% total annual payroll fee for personnel training development programs. Enables statutory 50% refund recovery channels upon certified internal staff audits.',
      penaltyRisk: 'Medium',
      authority: 'Industrial Training Fund Governing Council',
      requiredFor: 'All employers with 5 or more employees or annual turnover of ₦50M+.'
    },
    {
      name: 'PAYE Inland Revenue Registries',
      short: 'State PAYE Registry (LIRS/FIRS)',
      description: 'Standard pay-as-you-earn registries configuration. Filing direct personal income tax variables to respective state internal revenue units (e.g., LIRS for Lagos, AbIRS for Abuja).',
      penaltyRisk: 'High',
      authority: 'State-level Internal Revenue Services',
      requiredFor: 'All employees resident in respective states in Nigeria.'
    }
  ];

  const coreTeam = [
    {
      name: 'Adewale Coker',
      role: 'Managing Partner / Core Operations',
      bio: 'Over 14 years architecting modern recruitment frameworks for Tier-1 commercial banks & fintech scaling ventures across Lagos and external hubs.',
      image: '/src/assets/images/male_consultant_1781187762228.png'
    },
    {
      name: 'Amara Nwachukwu',
      role: 'Head of Regulatory Affairs & Compliance',
      bio: 'Ex-auditor specializing in Nigerian labor relations, PenCom directives, and state PAYE structures. Ensuring 100% legal coverage.',
      image: '/src/assets/images/female_leader_1781187749079.png'
    }
  ];

  const coreDifferentiators = [
    {
      title: 'Active Outbound Headhunting',
      desc: 'We do not wait for passive CV applications. We actively source high-fit passive leaders and developers directly from custom sector registries.'
    },
    {
      title: 'Complete Lifecycle Integration',
      desc: 'Most talent agencies disappear once the contract is signed. We persist for 12 weeks to guide onboarding checklists, structured roles metrics and regulatory compliance filings.'
    },
    {
      title: 'Nigerian Regulatory Experts',
      desc: 'Nigeria’s labor administration is complex. We offer complete legal coverage from NSITF setups, PenCom filings, to state-level tax management.'
    },
    {
      title: 'Rigorous Technical Vetting Matrices',
      desc: 'Our selection is backed by specialized peer-led coding matrices, standard cultural assessments, and structured cognitive scorecards.'
    }
  ];

  return (
    <div id="profile_view_wrapper" className="space-y-16">
      {/* Editorial Header */}
      <div className="text-left max-w-3xl space-y-4">
        <span className="text-xs uppercase tracking-widest font-semibold text-[#C9A23F] font-mono">Primehub Overview</span>
        <h1 className="text-3xl sm:text-4xl font-bold font-sans text-white tracking-tight leading-tight">
          Nigeria’s Trusted Strategic Partner for People, Performance & Compliance
        </h1>
        <p className="text-[#F4F6F9]/70 text-base leading-relaxed">
          PrimeHub helps Nigerian companies establish faster hiring timelines, eliminate regulatory audits risk, and design sound, high-retention personnel systems.
        </p>
      </div>

      {/* Two-Column split stats or brief */}
      <section id="one_pager_core" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 card-shadow space-y-8">
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Our Operating Mission</h3>
            <p className="text-[#F4F6F9]/70 text-sm leading-relaxed">
              We started PrimeHub because we saw high-potential scaling firms in Lagos, Abuja, and foreign companies setting up local offshore operations struggle with the complex, manual, and high-risk regulatory nature of Nigerian labor processes. We solve this by bridging high-integrity, SLA-driven recruiting services with active state-level compliance engineering.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2">Core Differentiators</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {coreDifferentiators.map((diff, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C9A23F]"></div>
                    <span className="font-bold text-white text-sm">{diff.title}</span>
                  </div>
                  <p className="text-[#F4F6F9]/60 text-xs leading-relaxed pl-3">{diff.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Corporate Fact Sheet */}
        <div className="lg:col-span-4 bg-[#0A1828] text-[#F4F6F9] rounded-2xl p-6 space-y-5 border border-white/10 shadow-xl">
          <h3 className="font-bold text-xs uppercase tracking-wider font-mono text-[#C9A23F] pb-3 border-b border-white/10">
            Corporate Profile
          </h3>
          <div className="space-y-4 text-xs font-sans">
            <div>
              <p className="text-[#C9A23F]/80 uppercase tracking-wider font-mono text-[10px]">Founding Tagline</p>
              <p className="font-medium text-sm mt-1 text-white">People. Performance. Partnership.</p>
            </div>
            <div>
              <p className="text-[#C9A23F]/80 uppercase tracking-wider font-mono text-[10px]">Principal Offices</p>
              <p className="font-medium text-sm mt-1 text-white">Lagos & Abuja, Nigeria</p>
            </div>
            <div>
              <p className="text-[#C9A23F]/80 uppercase tracking-wider font-mono text-[10px]">Headquarters Location</p>
              <p className="font-medium text-xs mt-1 leading-relaxed text-white">19, Onanefe Schuler Street, GIG Estate, Addo, Ajah, Lagos</p>
            </div>
            <div>
              <p className="text-[#C9A23F]/80 uppercase tracking-wider font-mono text-[10px]">Primary Contact Code</p>
              <p className="font-medium text-sm mt-1 text-white">07036417393</p>
            </div>
            <div>
              <p className="text-[#C9A23F]/80 uppercase tracking-wider font-mono text-[10px]">Corporate Portal URL</p>
              <p className="font-medium text-sm mt-1 text-[#C9A23F]">primehubhr.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section id="compliance_frameworks" className="space-y-6">
        <div className="text-left space-y-2">
          <h2 className="text-2xl font-bold text-white tracking-tight">Nigerian Statutory Labor Compliance Registries</h2>
          <p className="text-sm text-[#F4F6F9]/60">Every scaling business in Nigeria must comply with the following four key pillars. We integrate these setups directly into our 12-week hiring playbook.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {complianceFrameworks.map((cf, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-6 card-shadow flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase bg-white/5 px-2.5 py-1 rounded font-mono font-bold text-[#C9A23F]">
                    {cf.short}
                  </span>
                  <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold ${
                    cf.penaltyRisk === 'High' 
                      ? 'bg-red-950/40 text-red-450 border border-red-900/40' 
                      : 'bg-amber-950/40 text-amber-450 border border-amber-900/40'
                  }`}>
                    Audit Risk: {cf.penaltyRisk}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">{cf.name}</h3>
                <p className="text-[#F4F6F9]/70 text-xs leading-relaxed">{cf.description}</p>
              </div>

              <div className="pt-3 border-t border-white/10 text-[10px] text-[#F4F6F9]/40 space-y-1">
                <p><span className="font-semibold text-[#F4F6F9]/60">Regulatory Body:</span> {cf.authority}</p>
                <p><span className="font-semibold text-[#F4F6F9]/60">Required For:</span> {cf.requiredFor}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Meet Lead consultants */}
      <section id="team_advisory" className="space-y-8">
        <h2 className="text-2xl font-bold text-white tracking-tight">Lead Advisory Partners</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {coreTeam.map((member, i) => (
            <div key={i} className="flex flex-col sm:flex-row gap-6 p-6 bg-white/5 border border-white/10 rounded-2xl card-shadow items-start sm:items-center">
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full object-cover border border-[#C9A23F]/30 flex-shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-2">
                <span className="text-[10px] text-[#C9A23F] uppercase tracking-wider font-mono font-bold">{member.role}</span>
                <h3 className="text-lg font-bold text-white">{member.name}</h3>
                <p className="text-[#F4F6F9]/70 text-xs leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

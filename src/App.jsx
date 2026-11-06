import React, { useState } from 'react';
import { 
  BarChart, Bar, ScatterChart, Scatter, 
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend 
} from 'recharts';
import { 
  Calendar, Download, X, Database, Sliders, CheckCircle2, 
  ChevronDown, ArrowUpRight, ShieldCheck, Cpu, Building2, LayoutDashboard,
  ExternalLink, Users, AlertTriangle, RefreshCw, BarChart3, TrendingUp,
  Sparkles, ArrowRight, Shield, Zap, Check, ChevronRight, Layers
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('welcome');
  
  // Dashboard & Interactive States
  const [activeDatePreset, setActiveDatePreset] = useState('30d');
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [selectedKpiModal, setSelectedKpiModal] = useState(null);
  const [isExporting, setIsExporting] = useState(false);
  const [showSchemaModal, setShowSchemaModal] = useState(false);
  const [showCompanyBriefModal, setShowCompanyBriefModal] = useState(false);

  // ML Sandbox State
  const [loanAmnt, setLoanAmnt] = useState(18500);
  const [intRate, setIntRate] = useState(12.8);
  const [annualInc, setAnnualInc] = useState(72000);
  const [termMonths, setTermMonths] = useState(36);
  const [dti, setDti] = useState(18.5);

  // Term factor added: 60-month loans carry higher cumulative risk of default (+8.0% probability)
  const termFactor = termMonths === 60 ? 0.08 : 0.0;
  const baseRisk = ((loanAmnt / annualInc) * 0.40) + ((intRate / 24) * 0.35) + ((dti / 40) * 0.17) + termFactor;
  const calculatedDefaultRisk = Math.min(Math.max(Number(baseRisk.toFixed(3)), 0.04), 0.94);
  const isHighRisk = calculatedDefaultRisk >= 0.62;

  // Dynamic Datasets for 3 Date Ranges
  const portfolioSnapshots = {
    '30d': {
      label: 'Last 30 Days (Oct 2026)',
      pillLabel: 'Last 30 Days',
      kpi1: { val: '1.96%', delta: '0.14% below baseline', arrowColor: '#3b82f6', isGood: true },
      kpi2: { val: '9.8%', delta1: '4.7% below baseline', delta2: '0.2% below target', arrowColor: '#2b295c', isGood: true },
      kpi3: { val: '2.98%', delta1: '0.42% below baseline', delta2: '0.2% below target', arrowColor: '#58558f', isGood: true },
      kpi4: { val: '4:1', baseline: '6.2', target: 'Below 4:1', arrowColor: '#06b6d4', isGood: true },
      incomeData: [
        { type: 'Working', median: 145000, meanDelta: 40000 },
        { type: 'Pensioner', median: 110000, meanDelta: 22000 },
        { type: 'State servant', median: 172000, meanDelta: 38000 },
        { type: 'Commercial associate', median: 185000, meanDelta: 42000 },
      ],
      purposeData: [
        { purpose: 'debt_consolidation', principal: 4.85 },
        { purpose: 'credit_card', principal: 2.62 },
        { purpose: 'other', principal: 0.68 },
        { purpose: 'home_improvement', principal: 0.55 },
        { purpose: 'major_purchase', principal: 0.24 },
        { purpose: 'small_business', principal: 0.18 },
        { purpose: 'medical', principal: 0.15 },
        { purpose: 'moving', principal: 0.12 },
        { purpose: 'car', principal: 0.11 },
        { purpose: 'vacation', principal: 0.08 },
        { purpose: 'house', principal: 0.07 },
        { purpose: 'renewable_energy', principal: 0.02 },
      ],
      scatterData: [
        { amt_annuity: 22000, amt_goods_price: 450000 },
        { amt_annuity: 31000, amt_goods_price: 680000 },
        { amt_annuity: 42000, amt_goods_price: 900000 },
        { amt_annuity: 51000, amt_goods_price: 1120000 },
        { amt_annuity: 64000, amt_goods_price: 1350000 },
        { amt_annuity: 72000, amt_goods_price: 1540000 },
        { amt_annuity: 85000, amt_goods_price: 1800000 },
        { amt_annuity: 96000, amt_goods_price: 2050000 },
        { amt_annuity: 38000, amt_goods_price: 810000 },
        { amt_annuity: 55000, amt_goods_price: 1220000 },
      ]
    },
    'q3': {
      label: 'Q3 2026 (Jul - Sep)',
      pillLabel: 'Q3 2026',
      kpi1: { val: '2.45%', delta: '0.35% above baseline', arrowColor: '#ef4444', isGood: false },
      kpi2: { val: '14.2%', delta1: '0.3% below baseline', delta2: '4.2% above target', arrowColor: '#ef4444', isGood: false },
      kpi3: { val: '3.80%', delta1: '0.40% above baseline', delta2: '0.80% above target', arrowColor: '#ef4444', isGood: false },
      kpi4: { val: '5.8:1', baseline: '6.2', target: 'Below 4:1', arrowColor: '#f59e0b', isGood: false },
      incomeData: [
        { type: 'Working', median: 95000, meanDelta: 20000 },
        { type: 'Pensioner', median: 70000, meanDelta: 15000 },
        { type: 'State servant', median: 120000, meanDelta: 25000 },
        { type: 'Commercial associate', median: 130000, meanDelta: 30000 },
      ],
      purposeData: [
        { purpose: 'debt_consolidation', principal: 2.10 },
        { purpose: 'credit_card', principal: 1.40 },
        { purpose: 'other', principal: 0.40 },
        { purpose: 'home_improvement', principal: 0.35 },
        { purpose: 'major_purchase', principal: 0.15 },
        { purpose: 'small_business', principal: 0.10 },
        { purpose: 'medical', principal: 0.08 },
        { purpose: 'moving', principal: 0.06 },
        { purpose: 'car', principal: 0.05 },
        { purpose: 'vacation', principal: 0.04 },
        { purpose: 'house', principal: 0.03 },
        { purpose: 'renewable_energy', principal: 0.01 },
      ],
      scatterData: [
        { amt_annuity: 15000, amt_goods_price: 300000 },
        { amt_annuity: 24000, amt_goods_price: 480000 },
        { amt_annuity: 36000, amt_goods_price: 720000 },
        { amt_annuity: 44000, amt_goods_price: 880000 },
        { amt_annuity: 58000, amt_goods_price: 1100000 },
        { amt_annuity: 65000, amt_goods_price: 1200000 },
      ]
    },
    'ytd': {
      label: 'Year-to-Date 2026',
      pillLabel: 'Year-to-Date',
      kpi1: { val: '1.65%', delta: '0.45% below baseline', arrowColor: '#10b981', isGood: true },
      kpi2: { val: '8.4%', delta1: '6.1% below baseline', delta2: '1.6% below target', arrowColor: '#10b981', isGood: true },
      kpi3: { val: '2.50%', delta1: '0.90% below baseline', delta2: '0.50% below target', arrowColor: '#10b981', isGood: true },
      kpi4: { val: '3.6:1', baseline: '6.2', target: 'Below 4:1', arrowColor: '#10b981', isGood: true },
      incomeData: [
        { type: 'Working', median: 190000, meanDelta: 55000 },
        { type: 'Pensioner', median: 140000, meanDelta: 30000 },
        { type: 'State servant', median: 210000, meanDelta: 50000 },
        { type: 'Commercial associate', median: 235000, meanDelta: 60000 },
      ],
      purposeData: [
        { purpose: 'debt_consolidation', principal: 6.80 },
        { purpose: 'credit_card', principal: 3.90 },
        { purpose: 'other', principal: 1.10 },
        { purpose: 'home_improvement', principal: 0.95 },
        { purpose: 'major_purchase', principal: 0.45 },
        { purpose: 'small_business', principal: 0.35 },
        { purpose: 'medical', principal: 0.28 },
        { purpose: 'moving', principal: 0.22 },
        { purpose: 'car', principal: 0.19 },
        { purpose: 'vacation', principal: 0.15 },
        { purpose: 'house', principal: 0.12 },
        { purpose: 'renewable_energy', principal: 0.05 },
      ],
      scatterData: [
        { amt_annuity: 30000, amt_goods_price: 600000 },
        { amt_annuity: 45000, amt_goods_price: 950000 },
        { amt_annuity: 60000, amt_goods_price: 1300000 },
        { amt_annuity: 75000, amt_goods_price: 1650000 },
        { amt_annuity: 90000, amt_goods_price: 1950000 },
        { amt_annuity: 105000, amt_goods_price: 2300000 },
        { amt_annuity: 115000, amt_goods_price: 2500000 },
      ]
    }
  };

  const currentData = portfolioSnapshots[activeDatePreset];

  // OpenNPL Sample Flagged Table Data
  const openNPLFlaggedLoans = [
    { id: 'LN-94021', borrower: 'B-7712', amount: '$24,500', dpd: 94, status: 'EBA Impaired', provision: '$12,250' },
    { id: 'LN-88104', borrower: 'B-3091', amount: '$18,000', dpd: 112, status: 'Defaulted', provision: '$18,000' },
    { id: 'LN-62943', borrower: 'B-9442', amount: '$31,200', dpd: 91, status: 'EBA Impaired', provision: '$15,600' },
    { id: 'LN-41098', borrower: 'B-1120', amount: '$9,400', dpd: 120, status: 'Defaulted', provision: '$9,400' },
  ];

  // KPI Specs
  const kpiSpecs = {
    '30-Day Delinquency Inflow Rate': {
      type: 'Leading KPI',
      owner: 'Credit Risk Portfolio Manager',
      formula: '(Outstanding Principal 1-30 Days Past Due / Total Active Outstanding Portfolio Principal) * 100',
      target: '< 1.80%',
      threshold: '> 3.00%',
      baseline: '2.10%',
      sources: 'credit.loan_origination, credit.loan_payment, credit.ref_loan_status',
      action: 'If the rate exceeds 3.00%, trigger automated payment reminders (SMS/email), initiate early collections outreach, and tighten approval cutoffs on incoming applications.'
    },
    'High-Risk Origination Share': {
      type: 'Leading KPI',
      owner: 'Chief Risk Officer (CRO)',
      formula: '(Funded Principal of Loans with ML Default Probability >= 0.65 / Total Funded Principal) * 100',
      target: '< 10.00%',
      threshold: '> 18.00%',
      baseline: '14.50%',
      sources: 'credit.loan_application, credit.loan_origination, credit.bureau_record',
      action: 'If high-risk volume exceeds 18.00%, pause automated instant loan approvals, lower borrowing caps on unsecured tiers, and require senior credit committee approval.'
    },
    'Gross Non-Performing Loan Ratio': {
      type: 'Lagging KPI (EBA Regulatory)',
      owner: 'Head of Regulatory Reporting & Compliance',
      formula: '(Gross Principal of Loans >= 90 Days Past Due or Impaired / Total Gross Loan Portfolio Principal) * 100',
      target: '< 3.00%',
      threshold: '>= 5.00% (EBA supervisory threshold)',
      baseline: '3.40%',
      sources: 'credit.loan_origination, credit.loan_payment, openNPL data bridge',
      action: 'If the ratio reaches 5.00%, execute the OpenNPL regulatory reporting export, raise loan loss provisions, and submit an NPL reduction strategy to regulators.'
    },
    'Fraud False Positive Ratio': {
      type: 'Leading KPI',
      owner: 'Fraud Analytics Lead',
      formula: 'Count of Legitimate Card Transactions Declined / Count of Confirmed Fraudulent Transactions Caught',
      target: '< 4.0 : 1',
      threshold: '> 8.0 : 1',
      baseline: '6.2 : 1',
      sources: 'credit.card_transaction, credit.fraud_case',
      action: 'If the ratio exceeds 8.0:1, recalibrate model decision thresholds, review recent rule additions for false triggers, and use step-up OTP authentication.'
    }
  };

  const handleExportCSV = () => {
    setIsExporting(true);
    setTimeout(() => {
      const csvContent = "data:text/csv;charset=utf-8," 
        + "Metric_Name,Value,Status,Timeframe\n"
        + `30_Day_Delinquency_Inflow_Rate,${currentData.kpi1.val},${currentData.kpi1.delta},${currentData.label}\n`
        + `High_Risk_Origination_Share,${currentData.kpi2.val},${currentData.kpi2.delta1},${currentData.label}\n`
        + `Gross_NPL_Ratio,${currentData.kpi3.val},${currentData.kpi3.delta1},${currentData.label}\n`
        + `Fraud_False_Positive_Ratio,${currentData.kpi4.val},Baseline_${currentData.kpi4.baseline},${currentData.label}\n`;

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `finsight_snapshot_${activeDatePreset}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsExporting(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 selection:bg-blue-600 selection:text-white flex flex-col">
      
      {/* ======================= TOP NAVIGATION WITH TABS ======================= */}
      <header className="border-b border-slate-800/80 bg-[#0b101e]/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Logo & Domain */}
          <div 
            onClick={() => setActiveTab('welcome')} 
            className="flex items-center space-x-3 cursor-pointer group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center font-black text-white text-base shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform font-heading">
              FS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-base tracking-tight text-white group-hover:text-blue-400 transition-colors">
                  FinSight Analytics
                </span>
                <span className="text-[10px] font-mono-clean tracking-wide bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full font-semibold">
                  finsightanalytics.com
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-none mt-0.5 font-medium">Loan &amp; Credit Portfolio Intelligence</p>
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <nav className="flex items-center space-x-1 bg-[#10172a] p-1.5 rounded-xl border border-slate-800/80">
            <button 
              onClick={() => setActiveTab('welcome')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${activeTab === 'welcome' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'}`}>
              <Building2 size={14} /> Company Cover
            </button>
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'}`}>
              <LayoutDashboard size={14} /> Analyst Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('simulator')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${activeTab === 'simulator' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'}`}>
              <Sliders size={14} /> ML Sandbox
            </button>
            <button 
              onClick={() => setActiveTab('opennpl')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${activeTab === 'opennpl' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'}`}>
              <ShieldCheck size={14} /> OpenNPL Bridge
            </button>
          </nav>

          {/* Quick Tools */}
          <div className="flex items-center space-x-2.5">
            <button 
              onClick={() => setShowSchemaModal(true)}
              className="hidden md:flex items-center gap-1.5 text-xs bg-slate-900 border border-slate-700/80 hover:border-blue-500/50 text-blue-400 px-3 py-1.5 rounded-lg font-mono-clean transition cursor-pointer">
              <Database size={13} /> 26-Table ERD
            </button>
            <a 
              href="https://github.com/ja-ada05/fintech_sample/tree/main/sql_schema" 
              target="_blank" 
              rel="noreferrer"
              className="hidden lg:flex items-center gap-1 text-xs bg-slate-800/80 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg font-medium transition">
              GitHub DDL <ExternalLink size={12} />
            </a>
          </div>

        </div>
      </header>

      {/* ======================= BRIEF BANNER (CLICKABLE) ======================= */}
      <section className="bg-gradient-to-r from-[#0a1020] via-[#0e172e] to-[#0a1020] border-b border-slate-800/90 py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-1.5">
              
              <button 
                onClick={() => setShowCompanyBriefModal(true)}
                className="text-[11px] font-mono-clean font-bold tracking-wider uppercase text-blue-400 bg-blue-950/70 hover:bg-blue-900/60 border border-blue-700/60 hover:border-blue-500 px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-sm group">
                <Sparkles size={12} className="text-blue-400 group-hover:rotate-12 transition-transform" />
                <span>COMPANY PROFILE &amp; MISSION</span>
                <span className="text-[10px] text-blue-300 font-normal opacity-80">(Click to Read)</span>
              </button>

              <span className="text-xs text-slate-400">• UST 3DSA-1 Business Intelligence</span>
            </div>

            <h2 className="text-base md:text-lg font-heading font-bold text-white tracking-tight">
              FinSight Analytics: Turning Financial Data into Smarter Decisions
            </h2>
            <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
              Consolidated 26-table data warehouse serving interactive portfolio health metrics, real-time fraud scoring, and European Banking Authority (EBA) compliance.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {activeTab !== 'dashboard' ? (
              <button 
                onClick={() => setActiveTab('dashboard')}
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-blue-900/40 transition cursor-pointer font-heading">
                Launch Analyst Dashboard <ArrowRight size={14} />
              </button>
            ) : (
              <div className="text-right text-xs">
                <span className="text-slate-400 block">Status: <strong className="text-emerald-400">Pipeline Active</strong></span>
                <span className="text-slate-400 block font-mono-clean text-[11px]">Latency: &lt;500ms</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ======================= MAIN CONTENT TABS ======================= */}
      <main className="flex-1">

        {/* ========================================================================= */}
        {/* TAB 1: COVER PAGE / WELCOME PAGE */}
        {/* ========================================================================= */}
        {activeTab === 'welcome' && (
          <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">
            
            {/* Hero Section */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0c1326] via-[#101b38] to-[#0a1020] border border-blue-900/40 p-8 md:p-14 shadow-2xl">
              <div className="max-w-3xl space-y-4 relative z-10">
                <span className="text-xs font-mono-clean font-bold tracking-widest uppercase text-blue-400 bg-blue-950/80 border border-blue-800/60 px-3 py-1 rounded-full inline-block">
                  FinTech Business Intelligence Platform
                </span>
                <h1 className="text-4xl md:text-5xl font-heading font-black text-white tracking-tight leading-tight">
                  Turning Financial Data into <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Smarter Decisions.</span>
                </h1>
                <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-2xl font-light">
                  FinSight Analytics bridges the disconnect between operational transactional banking systems and strategic portfolio risk management. 
                  We consolidate 26 relational tables from Home Credit, LendingClub, and ULB Fraud streams into an actionable analytical view with AI-driven predictive intelligence.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <button 
                    onClick={() => setActiveTab('dashboard')}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 shadow-xl shadow-blue-600/30 transition transform hover:-translate-y-0.5 cursor-pointer font-heading">
                    Explore Analyst Dashboard <ArrowRight size={16} />
                  </button>
                  <button 
                    onClick={() => setActiveTab('simulator')}
                    className="bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 px-5 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 transition cursor-pointer">
                    <Sliders size={16} className="text-blue-400" /> Test ML Inference
                  </button>
                  <button 
                    onClick={() => setShowSchemaModal(true)}
                    className="text-xs text-blue-400 hover:text-blue-300 font-mono-clean underline flex items-center gap-1 cursor-pointer">
                    Inspect 26-Table Schema <ChevronRight size={12} />
                  </button>
                </div>
              </div>
            </div>

            {/* Mission & Vision */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#0f172a]/90 rounded-2xl p-7 border border-slate-800 shadow-xl space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/15 text-blue-400 flex items-center justify-center font-bold">
                  <Zap size={20} />
                </div>
                <h3 className="text-lg font-heading font-bold text-white">Our Mission</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  To empower financial institutions with reliable, data-driven insights for better financial decision-making, early loan delinquency intervention, and proactive fraud prevention.
                </p>
              </div>

              <div className="bg-[#0f172a]/90 rounded-2xl p-7 border border-slate-800 shadow-xl space-y-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-600/15 text-cyan-400 flex items-center justify-center font-bold">
                  <Shield size={20} />
                </div>
                <h3 className="text-lg font-heading font-bold text-white">Our Vision</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  To become a trusted provider of intelligent financial analytics and credit portfolio management solutions, leading the transition from reactive rules to predictive machine learning risk models.
                </p>
              </div>
            </div>

            {/* Capabilities */}
            <div className="space-y-5">
              <div className="text-center max-w-2xl mx-auto space-y-1">
                <span className="text-[11px] font-mono-clean uppercase tracking-wider text-blue-400">What We Deliver</span>
                <h2 className="text-2xl font-heading font-bold text-white">Platform Capabilities &amp; Architecture</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-[#0e1628] rounded-2xl p-6 border border-slate-800 hover:border-slate-700 transition">
                  <span className="text-blue-400 font-mono-clean text-xs font-bold">01 • PORTFOLIO MONITORING</span>
                  <h4 className="text-base font-heading font-bold text-white mt-1 mb-2">Credit &amp; Loan Oversight</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Track repayment behavior, early delinquency inflow (1-30 DPD), and gross non-performing loans with automated risk mitigation thresholds.
                  </p>
                </div>

                <div className="bg-[#0e1628] rounded-2xl p-6 border border-slate-800 hover:border-slate-700 transition">
                  <span className="text-blue-400 font-mono-clean text-xs font-bold">02 • ARTIFICIAL INTELLIGENCE</span>
                  <h4 className="text-base font-heading font-bold text-white mt-1 mb-2">Predictive ML Inference</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Dual inference design: scheduled batch scoring across transactions alongside real-time FastAPI endpoints (&lt;500ms) for loan origination risk.
                  </p>
                </div>

                <div className="bg-[#0e1628] rounded-2xl p-6 border border-slate-800 hover:border-slate-700 transition">
                  <span className="text-blue-400 font-mono-clean text-xs font-bold">03 • REGULATORY COMPLIANCE</span>
                  <h4 className="text-base font-heading font-bold text-white mt-1 mb-2">OpenNPL &amp; EBA Integration</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Automated mapping of bank tables into standardized European Banking Authority (EBA) NPL template blocks for instant compliance audit reporting.
                  </p>
                </div>
              </div>
            </div>

            {/* Meet Our Team */}
            <div className="bg-[#0e1628] rounded-3xl p-8 border border-slate-800 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
                <div>
                  <h3 className="text-xl font-heading font-bold text-white flex items-center gap-2">
                    <Users className="text-blue-400" size={22} /> Meet Our Team
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    3DSA-1 • DSA4157: Business Intelligence • University of Santo Tomas
                  </p>
                </div>
                <span className="text-xs font-mono-clean text-blue-400 bg-blue-950/60 px-3 py-1 rounded-full border border-blue-800/40 self-start sm:self-auto">
                  FinSight Analytics Core
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800/90 text-center hover:border-blue-500/40 transition">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 font-heading font-black text-sm flex items-center justify-center mx-auto mb-3 shadow-inner">AA</div>
                  <h4 className="font-heading font-bold text-white text-sm">ADA, Adrian</h4>
                  <span className="text-xs text-blue-400 font-medium block mt-0.5">Project Architect</span>
                </div>

                <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800/90 text-center hover:border-indigo-500/40 transition">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 font-heading font-black text-sm flex items-center justify-center mx-auto mb-3 shadow-inner">ML</div>
                  <h4 className="font-heading font-bold text-white text-sm">LOMINOQUE, Marga</h4>
                  <span className="text-xs text-indigo-400 font-medium block mt-0.5">UI/UX Designer</span>
                </div>

                <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800/90 text-center hover:border-cyan-500/40 transition">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-600/20 text-cyan-400 font-heading font-black text-sm flex items-center justify-center mx-auto mb-3 shadow-inner">JV</div>
                  <h4 className="font-heading font-bold text-white text-sm">VILLENA, Jerel</h4>
                  <span className="text-xs text-cyan-400 font-medium block mt-0.5">Business Strategist</span>
                </div>

                <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800/90 text-center hover:border-emerald-500/40 transition">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 font-heading font-black text-sm flex items-center justify-center mx-auto mb-3 shadow-inner">BM</div>
                  <h4 className="font-heading font-bold text-white text-sm">MATA, Bienn</h4>
                  <span className="text-xs text-emerald-400 font-medium block mt-0.5">Web Developer</span>
                </div>

                <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800/90 text-center hover:border-purple-500/40 transition">
                  <div className="w-12 h-12 rounded-2xl bg-purple-600/20 text-purple-400 font-heading font-black text-sm flex items-center justify-center mx-auto mb-3 shadow-inner">SC</div>
                  <h4 className="font-heading font-bold text-white text-sm">COPIA, Naijel</h4>
                  <span className="text-xs text-purple-400 font-medium block mt-0.5">Data Analyst</span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: ANALYST DASHBOARD */}
        {/* ========================================================================= */}
        {activeTab === 'dashboard' && (
          <div className="flex flex-row min-h-[calc(100vh-140px)]">
            
            {/* LEFT PURPLE SIDEBAR ACCENT */}
            <aside className="w-16 md:w-24 bg-[#58558f] flex-shrink-0 flex flex-col items-center py-8 justify-between shadow-2xl">
              <div className="flex flex-col items-center gap-6">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center font-heading font-black text-white text-base shadow-inner">
                  FS
                </div>
                <div className="w-6 h-0.5 bg-white/20 rounded-full"></div>
              </div>
              <div className="text-white/40 text-[9px] font-mono-clean [writing-mode:vertical-rl] rotate-180 tracking-widest uppercase">
                Portfolio Monitoring • FIGMA SPEC
              </div>
            </aside>

            {/* DASHBOARD CONTENT */}
            <div className="flex-1 p-6 md:p-8 max-w-[1450px] mx-auto overflow-x-hidden space-y-6">
              
              {/* Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 gap-4">
                <div>
                  <h1 className="text-3xl font-heading font-extrabold text-white tracking-tight">Loan Portfolio Monitoring</h1>
                  <p className="text-sm text-slate-400 font-medium mt-0.5">
                    Demo Analyst 1 - Risk Management • <span className="text-blue-400 font-bold">{currentData.label}</span>
                  </p>
                </div>

                <div className="flex items-center gap-3 relative">
                  
                  {/* Date Range Button */}
                  <div className="relative">
                    <button 
                      onClick={() => setShowDateDropdown(!showDateDropdown)}
                      className="bg-[#0052cc] hover:bg-[#0043a8] text-white px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 shadow-lg shadow-blue-900/30 transition active:scale-95 cursor-pointer font-heading">
                      <Calendar size={17} />
                      <span>Date Range: {currentData.pillLabel}</span>
                      <ChevronDown size={15} />
                    </button>

                    {showDateDropdown && (
                      <div className="absolute right-0 mt-2 w-64 bg-[#10182b] rounded-2xl shadow-2xl border border-slate-700 z-50 p-2 animate-in fade-in zoom-in-95 duration-100">
                        <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider font-mono-clean">
                          Select Time Window
                        </div>
                        <button 
                          onClick={() => { setActiveDatePreset('30d'); setShowDateDropdown(false); }}
                          className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition cursor-pointer ${activeDatePreset === '30d' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-slate-300 hover:bg-slate-800'}`}>
                          <div>
                            <span className="block font-bold">Last 30 Days (Oct 2026)</span>
                            <span className="text-[10px] text-slate-400">Baseline Target (1.96% Inflow)</span>
                          </div>
                          {activeDatePreset === '30d' && <CheckCircle2 size={16} />}
                        </button>
                        <button 
                          onClick={() => { setActiveDatePreset('q3'); setShowDateDropdown(false); }}
                          className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition cursor-pointer ${activeDatePreset === 'q3' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-slate-300 hover:bg-slate-800'}`}>
                          <div>
                            <span className="block font-bold">Q3 2026 (Jul - Sep)</span>
                            <span className="text-[10px] text-slate-400">Spike Stress Period (2.45% Inflow)</span>
                          </div>
                          {activeDatePreset === 'q3' && <CheckCircle2 size={16} />}
                        </button>
                        <button 
                          onClick={() => { setActiveDatePreset('ytd'); setShowDateDropdown(false); }}
                          className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition cursor-pointer ${activeDatePreset === 'ytd' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-slate-300 hover:bg-slate-800'}`}>
                          <div>
                            <span className="block font-bold">Year-to-Date 2026</span>
                            <span className="text-[10px] text-slate-400">Cumulative Book (1.65% Inflow)</span>
                          </div>
                          {activeDatePreset === 'ytd' && <CheckCircle2 size={16} />}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Export Button */}
                  <button 
                    onClick={handleExportCSV}
                    disabled={isExporting}
                    className="bg-[#0052cc] hover:bg-[#0043a8] text-white px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 shadow-lg shadow-blue-900/30 transition active:scale-95 cursor-pointer font-heading">
                    <Download size={17} className={isExporting ? "animate-bounce" : ""} />
                    <span>{isExporting ? "Exporting..." : "Export Data"}</span>
                  </button>
                </div>
              </div>

              {/* TWO COLUMN GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* 3 CHARTS */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Chart 1 */}
                    <div className="bg-[#10182b] rounded-2xl p-5 border border-slate-800 shadow-xl">
                      <h3 className="text-xs font-bold text-slate-300 text-center mb-2 font-heading">
                        Mean and Median Amount of Income by Income Type
                      </h3>
                      <div className="h-56">
                        <ResponsiveContainer width="100%" height="100%" key={`income-${activeDatePreset}`}>
                          <BarChart data={currentData.incomeData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                            <XAxis dataKey="type" tick={{ fontSize: 9, fill: '#94a3b8' }} interval={0} angle={-8} textAnchor="end" />
                            <YAxis tick={{ fontSize: 9, fill: '#94a3b8' }} tickFormatter={(v) => `${v / 1000}k`} domain={[0, 300000]} />
                            <Tooltip formatter={(v) => [`$${v.toLocaleString()}`, '']} contentStyle={{ backgroundColor: '#0f172a', borderRadius: '10px', fontSize: '11px', border: '1px solid #334155' }} />
                            <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '6px' }} />
                            <Bar dataKey="median" stackId="a" fill="#1e3a8a" name="Median" animationDuration={500} />
                            <Bar dataKey="meanDelta" stackId="a" fill="#60a5fa" name="Mean" radius={[4, 4, 0, 0]} animationDuration={500} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                      <span className="text-[10px] text-slate-500 text-center block mt-1 font-mono-clean">Income Type (Home Credit)</span>
                    </div>

                    {/* Chart 2 */}
                    <div className="bg-[#10182b] rounded-2xl p-5 border border-slate-800 shadow-xl">
                      <h3 className="text-xs font-bold text-slate-300 text-center mb-2 font-heading">
                        amt_goods_price vs. amt_annuity
                      </h3>
                      <div className="h-56">
                        <ResponsiveContainer width="100%" height="100%" key={`scatter-${activeDatePreset}`}>
                          <ScatterChart margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                            <XAxis type="number" dataKey="amt_annuity" tick={{ fontSize: 9, fill: '#94a3b8' }} tickFormatter={(v) => `${v / 1000}k`} domain={[0, 130000]} />
                            <YAxis type="number" dataKey="amt_goods_price" tick={{ fontSize: 9, fill: '#94a3b8' }} tickFormatter={(v) => `${v / 1000000}M`} domain={[0, 2600000]} />
                            <Tooltip formatter={(val) => [`$${val.toLocaleString()}`, '']} contentStyle={{ backgroundColor: '#0f172a', borderRadius: '10px', fontSize: '11px', border: '1px solid #334155' }} />
                            <Scatter name="Exposure" data={currentData.scatterData} fill="#38bdf8" fillOpacity={0.85} animationDuration={500} />
                          </ScatterChart>
                        </ResponsiveContainer>
                      </div>
                      <span className="text-[10px] text-slate-500 text-center block mt-1 font-mono-clean">amt_annuity (Home Credit)</span>
                    </div>

                  </div>

                  {/* Chart 3 */}
                  <div className="bg-[#10182b] rounded-2xl p-5 border border-slate-800 shadow-xl">
                    <h3 className="text-xs font-bold text-slate-300 text-center mb-3 font-heading">
                      Total Principal by Loan Purpose (LendingClub)
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%" key={`purpose-${activeDatePreset}`}>
                        <BarChart data={currentData.purposeData} layout="vertical" margin={{ top: 5, right: 20, left: 65, bottom: 10 }}>
                          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#1e293b" />
                          <XAxis type="number" tick={{ fontSize: 10, fill: '#94a3b8' }} tickFormatter={(v) => `${v}M`} domain={[0, 7.5]} />
                          <YAxis dataKey="purpose" type="category" tick={{ fontSize: 9, fill: '#cbd5e1' }} width={90} />
                          <Tooltip formatter={(val) => [`$${val}M Principal`, 'Exposure']} contentStyle={{ backgroundColor: '#0f172a', borderRadius: '10px', fontSize: '11px', border: '1px solid #334155' }} />
                          <Bar dataKey="principal" fill="#2563eb" radius={[0, 4, 4, 0]} animationDuration={500} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <span className="text-[10px] text-slate-500 text-center block mt-1 font-mono-clean">Total Principal ($M)</span>
                  </div>

                </div>

                {/* 4 KPI TRACKERS */}
                <div className="lg:col-span-4 space-y-4">
                  
                  {/* KPI 1 */}
                  <div 
                    onClick={() => setSelectedKpiModal('30-Day Delinquency Inflow Rate')}
                    className="bg-[#10182b] rounded-2xl p-5 border border-slate-800 hover:border-blue-500/60 shadow-xl transition cursor-pointer group">
                    <div className="flex justify-between items-start">
                      <h4 className="text-xs font-bold text-slate-300 font-heading">30-Day Delinquency Inflow Rate</h4>
                      <span className="text-[10px] text-slate-500 font-mono-clean">Leading</span>
                    </div>
                    <div className="mt-2 text-center py-1">
                      <span className={`text-4xl font-heading font-black tracking-tight transition-colors duration-300 ${currentData.kpi1.isGood ? 'text-white' : 'text-red-400'}`}>
                        {currentData.kpi1.val}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-slate-400 px-2">
                      <svg className="w-14 h-9 -rotate-6" viewBox="0 0 60 40" fill="none" stroke={currentData.kpi1.arrowColor} strokeWidth="3.5" strokeLinecap="round">
                        <path d="M 5,5 Q 15,35 50,30" />
                        <path d="M 42,23 L 52,30 L 44,38" fill="none" />
                      </svg>
                      <div className="text-right">
                        <span className={`font-semibold flex items-center justify-end gap-0.5 text-xs ${currentData.kpi1.isGood ? 'text-emerald-400' : 'text-red-400'}`}>
                          {currentData.kpi1.isGood ? '↓' : '↑'} {currentData.kpi1.delta}
                        </span>
                        <span className="text-[10px] text-slate-500 block">Target: &lt; 1.80%</span>
                      </div>
                    </div>
                  </div>

                  {/* KPI 2 */}
                  <div 
                    onClick={() => setSelectedKpiModal('High-Risk Origination Share')}
                    className="bg-[#10182b] rounded-2xl p-5 border border-slate-800 hover:border-blue-500/60 shadow-xl transition cursor-pointer group">
                    <div className="flex justify-between items-start">
                      <h4 className="text-xs font-bold text-slate-300 font-heading">High-Risk Origination Share</h4>
                      <span className="text-[10px] text-slate-500 font-mono-clean">Leading</span>
                    </div>
                    <div className="mt-2 text-center py-1">
                      <span className={`text-4xl font-heading font-black tracking-tight transition-colors duration-300 ${currentData.kpi2.isGood ? 'text-white' : 'text-red-400'}`}>
                        {currentData.kpi2.val}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-slate-400 px-2">
                      <svg className="w-14 h-9 -rotate-6" viewBox="0 0 60 40" fill="none" stroke={currentData.kpi2.arrowColor} strokeWidth="3.5" strokeLinecap="round">
                        <path d="M 5,5 Q 15,35 50,30" />
                        <path d="M 42,23 L 52,30 L 44,38" fill="none" />
                      </svg>
                      <div className="text-right text-[11px] leading-tight space-y-0.5">
                        <span className={`font-semibold block ${currentData.kpi2.isGood ? 'text-emerald-400' : 'text-red-400'}`}>
                          {currentData.kpi2.isGood ? '↓' : '↑'} {currentData.kpi2.delta1}
                        </span>
                        <span className={`font-semibold block ${currentData.kpi2.isGood ? 'text-emerald-400' : 'text-red-400'}`}>
                          {currentData.kpi2.isGood ? '↓' : '↑'} {currentData.kpi2.delta2}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* KPI 3 */}
                  <div 
                    onClick={() => setSelectedKpiModal('Gross Non-Performing Loan Ratio')}
                    className="bg-[#10182b] rounded-2xl p-5 border border-slate-800 hover:border-blue-500/60 shadow-xl transition cursor-pointer group">
                    <div className="flex justify-between items-start">
                      <h4 className="text-xs font-bold text-slate-300 font-heading">Gross Non-Performing Loan Ratio</h4>
                      <span className="text-[10px] text-indigo-400 font-mono-clean font-semibold">EBA Trigger</span>
                    </div>
                    <div className="mt-2 text-center py-1">
                      <span className={`text-4xl font-heading font-black tracking-tight transition-colors duration-300 ${currentData.kpi3.isGood ? 'text-white' : 'text-red-400'}`}>
                        {currentData.kpi3.val}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-slate-400 px-2">
                      <svg className="w-14 h-9 -rotate-6" viewBox="0 0 60 40" fill="none" stroke={currentData.kpi3.arrowColor} strokeWidth="3.5" strokeLinecap="round">
                        <path d="M 5,5 Q 15,35 50,30" />
                        <path d="M 42,23 L 52,30 L 44,38" fill="none" />
                      </svg>
                      <div className="text-right text-[11px] leading-tight space-y-0.5">
                        <span className={`font-semibold block ${currentData.kpi3.isGood ? 'text-emerald-400' : 'text-red-400'}`}>
                          {currentData.kpi3.isGood ? '↓' : '↑'} {currentData.kpi3.delta1}
                        </span>
                        <span className={`font-semibold block ${currentData.kpi3.isGood ? 'text-emerald-400' : 'text-red-400'}`}>
                          {currentData.kpi3.isGood ? '↓' : '↑'} {currentData.kpi3.delta2}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* KPI 4 */}
                  <div 
                    onClick={() => setSelectedKpiModal('Fraud False Positive Ratio')}
                    className="bg-[#10182b] rounded-2xl p-5 border border-slate-800 hover:border-blue-500/60 shadow-xl transition cursor-pointer group">
                    <div className="flex justify-between items-start">
                      <h4 className="text-xs font-bold text-slate-300 font-heading">Fraud False Positive Ratio</h4>
                      <span className="text-[10px] text-slate-500 font-mono-clean">Fraud Ops</span>
                    </div>
                    <div className="mt-2 text-center py-1">
                      <span className="text-4xl font-heading font-black tracking-tight text-white">
                        {currentData.kpi4.val}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-slate-400 px-2">
                      <svg className="w-14 h-9 -rotate-6" viewBox="0 0 60 40" fill="none" stroke={currentData.kpi4.arrowColor} strokeWidth="3.5" strokeLinecap="round">
                        <path d="M 5,5 Q 15,35 50,30" />
                        <path d="M 42,23 L 52,30 L 44,38" fill="none" />
                      </svg>
                      <div className="text-right text-[11px] leading-tight">
                        <span className="text-slate-400 block">Baseline {currentData.kpi4.baseline}</span>
                        <span className="text-emerald-400 font-semibold block">Target {currentData.kpi4.target}</span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: ML PREDICTION SANDBOX */}
        {/* ========================================================================= */}
        {activeTab === 'simulator' && (
          <div className="max-w-7xl mx-auto p-6 md:p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h1 className="text-2xl font-heading font-black text-white flex items-center gap-2">
                  <Cpu className="text-blue-500" size={24} />
                  Predictive Risk &amp; Machine Learning Inference Sandbox
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Demonstrating sub-500ms real-time scoring served via FastAPI with scikit-learn &amp; XGBoost artifacts[cite: 83, 84].
                </p>
              </div>
              <span className="px-3 py-1 rounded bg-slate-900 border border-slate-800 text-xs font-mono-clean text-blue-400">
                Pipeline: batch_scoring + real_time_api
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Sliders Input Panel */}
              <div className="lg:col-span-7 bg-[#10182b] rounded-2xl p-6 border border-slate-800 space-y-6 shadow-xl">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono-clean">Applicant Credit Parameters</h2>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1.5 font-medium">
                      <span className="text-slate-300">Requested Principal Amount</span>
                      <span className="text-blue-400 font-bold font-mono-clean text-sm">${loanAmnt.toLocaleString()}</span>
                    </div>
                    <input 
                      type="range" min="1000" max="40000" step="500" value={loanAmnt}
                      onChange={(e) => setLoanAmnt(Number(e.target.value))}
                      className="w-full accent-blue-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1.5 font-medium">
                      <span className="text-slate-300">Annual Stated Income</span>
                      <span className="text-blue-400 font-bold font-mono-clean text-sm">${annualInc.toLocaleString()}</span>
                    </div>
                    <input 
                      type="range" min="18000" max="220000" step="2000" value={annualInc}
                      onChange={(e) => setAnnualInc(Number(e.target.value))}
                      className="w-full accent-blue-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1.5 font-medium">
                      <span className="text-slate-300">Interest Rate (%)</span>
                      <span className="text-blue-400 font-bold font-mono-clean text-sm">{intRate}%</span>
                    </div>
                    <input 
                      type="range" min="5" max="30" step="0.5" value={intRate}
                      onChange={(e) => setIntRate(Number(e.target.value))}
                      className="w-full accent-blue-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1.5 font-medium">
                      <span className="text-slate-300">Debt-to-Income (DTI) %</span>
                      <span className="text-blue-400 font-bold font-mono-clean text-sm">{dti}%</span>
                    </div>
                    <input 
                      type="range" min="2" max="45" step="0.5" value={dti}
                      onChange={(e) => setDti(Number(e.target.value))}
                      className="w-full accent-blue-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div className="pt-2">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-slate-300 font-medium">Loan Term (Amortization Period)</span>
                      <span className="text-xs font-mono-clean text-blue-400">{termMonths} Months ({termMonths === 60 ? '+8% Risk' : 'Standard'})</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => setTermMonths(36)}
                        className={`py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${termMonths === 36 ? 'bg-blue-600/30 border-blue-500 text-blue-300 shadow-md' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'}`}>
                        36 Months Standard
                      </button>
                      <button 
                        onClick={() => setTermMonths(60)}
                        className={`py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${termMonths === 60 ? 'bg-blue-600/30 border-blue-500 text-blue-300 shadow-md' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'}`}>
                        60 Months Extended (+Risk)
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Inference Output Display */}
              <div className="lg:col-span-5 bg-gradient-to-br from-[#10182b] to-[#080d1a] rounded-2xl p-6 border border-slate-800 flex flex-col justify-between shadow-xl">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="text-[11px] font-mono-clean text-emerald-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                      Real-time Inference: 284ms
                    </span>
                    <span className="text-[11px] font-mono-clean text-slate-500">FastAPI /predict</span>
                  </div>

                  <div className="mt-6 text-center">
                    <span className="text-xs uppercase tracking-wider text-slate-400 font-medium font-mono-clean">Estimated Default Probability</span>
                    <div className={`text-6xl font-heading font-black mt-2 tracking-tight transition-all duration-300 ${isHighRisk ? 'text-red-400' : calculatedDefaultRisk > 0.35 ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {(calculatedDefaultRisk * 100).toFixed(1)}%
                    </div>
                    <span className="text-xs text-slate-500 mt-1 block">Model Confidence Score: 0.91 AUC</span>
                  </div>

                  <div className="mt-6 space-y-2">
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Threshold Boundary</span>
                      <span className={isHighRisk ? 'text-red-400 font-bold' : 'text-slate-300'}>High-Risk Cutoff (0.62)</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden p-0.5">
                      <div 
                        className={`h-full rounded-full transition-all duration-300 ${isHighRisk ? 'bg-red-500' : calculatedDefaultRisk > 0.35 ? 'bg-amber-400' : 'bg-emerald-400'}`}
                        style={{ width: `${calculatedDefaultRisk * 100}%` }}>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 bg-[#0c1220] rounded-xl p-4 border border-slate-800 text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Underwriting Tier:</span>
                      <span className="font-semibold text-white">{isHighRisk ? 'Tier 4 - High Default Risk' : 'Tier 1 - Prime Standard'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Automated Protocol:</span>
                      <span className={`font-semibold ${isHighRisk ? 'text-red-400' : 'text-emerald-400'}`}>
                        {isHighRisk ? 'Referred to Senior Committee' : 'Instant Pre-Approval Eligible'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-800 text-[11px] text-slate-500 font-mono-clean text-center">
                  Target Entity: credit.loan_application (SK_ID_CURR)
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: OPENNPL REGULATORY BRIDGE */}
        {/* ========================================================================= */}
        {activeTab === 'opennpl' && (
          <div className="max-w-7xl mx-auto p-6 md:p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h1 className="text-2xl font-heading font-black text-white flex items-center gap-2">
                  <ShieldCheck className="text-blue-500" size={24} />
                  OpenNPL &amp; European Banking Authority (EBA) Regulatory Center
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Automated extraction bridge mapping loan schemas to EBA templates for non-performing loan detection (&gt;90 DPD)[cite: 78, 79].
                </p>
              </div>
              <button 
                onClick={handleExportCSV}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-900/30 font-heading">
                <Download size={14} /> Export EBA Report (.CSV)
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#10182b] p-5 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 font-medium font-mono-clean">EBA Supervisory Threshold</span>
                <p className="text-3xl font-heading font-black text-white mt-1">5.00%</p>
                <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
                  <CheckCircle2 size={13} /> Current Portfolio: 2.98% (Compliant)
                </p>
              </div>
              <div className="bg-[#10182b] p-5 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 font-medium font-mono-clean">Template Blocks Mapped</span>
                <p className="text-3xl font-heading font-black text-blue-400 mt-1">3 Blocks</p>
                <p className="text-xs text-slate-400 mt-2">Counterparty, Loan Core, Historical Repayment[cite: 79]</p>
              </div>
              <div className="bg-[#10182b] p-5 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 font-medium font-mono-clean">Total Flagged Exposure (&gt;90 DPD)</span>
                <p className="text-3xl font-heading font-black text-red-400 mt-1">$83,100</p>
                <p className="text-xs text-slate-400 mt-2">Allocated Provisions: $55,250</p>
              </div>
            </div>

            {/* Flagged Accounts Table */}
            <div className="bg-[#10182b] rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
              <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center">
                <h3 className="font-heading font-bold text-sm text-white">Flagged Non-Performing Exposures (NPL Queue)</h3>
                <span className="text-xs font-mono-clean text-slate-400">OpenNPL Django Bridge: Active</span>
              </div>
              <table className="min-w-full divide-y divide-slate-800 text-xs">
                <thead className="bg-slate-900/80 text-slate-400 text-left font-medium">
                  <tr>
                    <th className="px-6 py-3.5">Loan ID</th>
                    <th className="px-6 py-3.5">Borrower ID</th>
                    <th className="px-6 py-3.5">Gross Exposure</th>
                    <th className="px-6 py-3.5">Days Past Due (DPD)</th>
                    <th className="px-6 py-3.5">EBA Status</th>
                    <th className="px-6 py-3.5">Required Provision</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {openNPLFlaggedLoans.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-800/40 transition">
                      <td className="px-6 py-3.5 font-mono-clean text-blue-400 font-bold">{row.id}</td>
                      <td className="px-6 py-3.5 text-slate-300 font-mono-clean">{row.borrower}</td>
                      <td className="px-6 py-3.5 font-bold text-white font-mono-clean">{row.amount}</td>
                      <td className="px-6 py-3.5 text-red-400 font-bold">{row.dpd} DPD</td>
                      <td className="px-6 py-3.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-red-950 text-red-400 border border-red-800/60">
                          {row.status}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 font-mono-clean text-slate-300">{row.provision}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>

      {/* ======================= MODAL: COMPANY PROFILE BRIEF ======================= */}
      {showCompanyBriefModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="bg-[#0f172a] border border-slate-700/80 rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <button 
              onClick={() => setShowCompanyBriefModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 cursor-pointer">
              <X size={18} />
            </button>

            <span className="text-[10px] font-mono-clean uppercase tracking-widest text-blue-400 bg-blue-950/70 border border-blue-800/60 px-2.5 py-0.5 rounded-full font-bold">
              Company Profile &amp; Business Intelligence Scope
            </span>
            <h2 className="text-2xl font-heading font-black text-white mt-2">
              FinSight Analytics
            </h2>
            <p className="text-xs text-blue-300/80 font-mono-clean">Domain: finsightanalytics.com • Cost: ₱571.99/year[cite: 73]</p>

            <div className="space-y-4 text-xs text-slate-300 mt-4 leading-relaxed">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                <h4 className="font-heading font-bold text-white text-sm">Strategic Goal</h4>
                <p>
                  To convert transactional credit and banking records into actionable intelligence, allowing lending management to maximize loan portfolio returns while proactively controlling credit delinquency, mitigating transaction fraud, and maintaining solvency within regulatory capital limits[cite: 76].
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                  <strong className="text-white block font-heading mb-1">Target Client Personas</strong>
                  <ul className="text-slate-400 space-y-1">
                    <li>• Credit &amp; Fraud Analysts[cite: 72]</li>
                    <li>• Lending &amp; Credit Managers[cite: 72]</li>
                    <li>• Regulatory Compliance Officers[cite: 72]</li>
                    <li>• Individual Borrowers[cite: 72]</li>
                  </ul>
                </div>

                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                  <strong className="text-white block font-heading mb-1">Proposed Tech Stack</strong>
                  <ul className="text-slate-400 space-y-1 font-mono-clean text-[11px]">
                    <li>• Next.js + Tailwind CSS + Recharts[cite: 83]</li>
                    <li>• FastAPI (Python 3.14 Serving)[cite: 83]</li>
                    <li>• PostgreSQL (Supabase 26 Tables)[cite: 83]</li>
                    <li>• OpenNPL (Django 5.2 Container)[cite: 83]</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center text-xs">
              <button 
                onClick={() => { setShowCompanyBriefModal(false); setActiveTab('welcome'); }}
                className="text-blue-400 hover:text-blue-300 font-heading font-semibold cursor-pointer">
                View Full Team &amp; Mission Page →
              </button>
              <button 
                onClick={() => setShowCompanyBriefModal(false)}
                className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-xl font-heading font-semibold cursor-pointer">
                Close Brief
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================= MODAL: 26-TABLE SCHEMA INSPECTOR ======================= */}
      {showSchemaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="bg-[#0f172a] border border-slate-700/80 rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative">
            <button 
              onClick={() => setShowSchemaModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 cursor-pointer">
              <X size={18} />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <Database size={18} className="text-blue-400" />
              <h3 className="font-heading font-bold text-white text-base">Consolidated 26-Table Bank Schema (GitHub DDL)</h3>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Joined across 4 datasets: Home Credit Default Risk, ULB Credit Card Fraud, LendingClub Accepted, and Bank Loan Status[cite: 81].
            </p>

            <div className="space-y-3 text-xs max-h-96 overflow-y-auto pr-1">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="font-heading font-bold text-blue-400 block mb-1">Credit &amp; Applications (8 tables)</span>
                <span className="font-mono-clean text-[11px] text-slate-300">
                  borrower, loan_application, previous_application, bureau_record, bureau_balance, credit_card_balance, installment_payment, pos_cash_balance[cite: 90]
                </span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="font-heading font-bold text-blue-400 block mb-1">Secondary Loan Book (3 tables)</span>
                <span className="font-mono-clean text-[11px] text-slate-300">loan_origination, loan_payment, loan_rejection[cite: 90]</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="font-heading font-bold text-blue-400 block mb-1">Fraud Detection Stream (2 tables)</span>
                <span className="font-mono-clean text-[11px] text-slate-300">card_transaction, fraud_case[cite: 90]</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="font-heading font-bold text-blue-400 block mb-1">12 Reference Dimensions &amp; Shared Date</span>
                <span className="font-mono-clean text-[11px] text-slate-300">
                  dim_date, ref_contract_type, ref_income_type, ref_education_type, ref_family_status, ref_housing_type, ref_occupation_type, ref_organization_type, ref_credit_status, ref_loan_status, ref_portfolio, ref_channel, ref_payment_type[cite: 90]
                </span>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-800 flex justify-between items-center text-xs">
              <a 
                href="https://github.com/ja-ada05/fintech_sample/tree/main/sql_schema" 
                target="_blank" 
                rel="noreferrer"
                className="text-blue-400 hover:underline flex items-center gap-1 font-mono-clean">
                View SQL Schema on GitHub <ExternalLink size={12} />
              </a>
              <button 
                onClick={() => setShowSchemaModal(false)}
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-xl font-heading font-semibold cursor-pointer">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================= MODAL: KPI DRILL-DOWN ======================= */}
      {selectedKpiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="bg-[#0f172a] rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-700/80 relative">
            <button 
              onClick={() => setSelectedKpiModal(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition cursor-pointer">
              <X size={18} />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase font-mono-clean">
                {kpiSpecs[selectedKpiModal].type}
              </span>
              <span className="text-xs text-slate-400">• Owner: {kpiSpecs[selectedKpiModal].owner}</span>
            </div>

            <h2 className="text-xl font-heading font-black text-white">{selectedKpiModal}</h2>
            
            <div className="mt-4 p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono-clean text-xs text-slate-300 leading-relaxed">
              <span className="font-bold text-slate-400 text-[10px] block uppercase font-sans mb-1">Standard Formula</span>
              {kpiSpecs[selectedKpiModal].formula}
            </div>

            <div className="grid grid-cols-3 gap-3 my-4 text-center">
              <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-semibold font-mono-clean">Baseline</span>
                <span className="text-sm font-bold text-white font-mono-clean">{kpiSpecs[selectedKpiModal].baseline}</span>
              </div>
              <div className="p-2.5 bg-emerald-950/60 rounded-xl border border-emerald-800/40">
                <span className="text-[10px] text-emerald-400 block font-semibold font-mono-clean">Target</span>
                <span className="text-sm font-bold text-emerald-400 font-mono-clean">{kpiSpecs[selectedKpiModal].target}</span>
              </div>
              <div className="p-2.5 bg-red-950/60 rounded-xl border border-red-800/40">
                <span className="text-[10px] text-red-400 block font-semibold font-mono-clean">Threshold Cap</span>
                <span className="text-sm font-bold text-red-400 font-mono-clean">{kpiSpecs[selectedKpiModal].threshold}</span>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div>
                <strong className="text-amber-400 block mb-0.5 font-heading">Automated Remediation Protocol:</strong>
                <p className="leading-relaxed bg-amber-950/20 p-2.5 rounded-xl border border-amber-900/40 text-amber-200">
                  {kpiSpecs[selectedKpiModal].action}
                </p>
              </div>
              <div>
                <strong className="text-slate-400 text-[10px] block uppercase font-mono-clean">Data Sources</strong>
                <span className="font-mono-clean text-slate-400">{kpiSpecs[selectedKpiModal].sources}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
              <button 
                onClick={() => setSelectedKpiModal(null)}
                className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-xl text-xs font-heading font-semibold cursor-pointer">
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
import React, { useState } from 'react';
import {
  Lock,
  FileText,
  Layers,
  Network,
  History,
  CheckCircle2,
  ArrowRight,
  Fingerprint,
  Scale,
  ShieldAlert,
  Clock,
  Check,
  BookOpen,
  ListChecks,
  Activity,
  Key,
  Shield,
  Hash,
  Server,
  ChevronRight,
  Menu,
  X,
  Eye,
  FileCheck,
  UserCheck,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

interface LandingPageProps {
  onEnterApp: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  // Navigation State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Active Custody Timeline Stage
  const [activeTimelineStage, setActiveTimelineStage] = useState(0);

  // Selected Document in Table
  const [selectedDocIndex, setSelectedDocIndex] = useState(0);

  // Selected Investigation Tree Node
  const [selectedTreeNode, setSelectedTreeNode] = useState<string>('case');

  // Active SIH Dossier Tab
  const [activeDossierTab, setActiveDossierTab] = useState<
    'statement' | 'challenges' | 'mandates' | 'lifecycle'
  >('statement');

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Operational Timeline: Exact Timestamps & Real Forensic Metadata
  const timelineEvents = [
    {
      time: '09:42',
      stage: 'COLLECTED',
      title: 'Scene of Crime Physical Recovery',
      officer: 'Senior Investigator Sharma',
      badge: 'SV-INV-104',
      dept: 'Special Anti-Cartel Wing',
      location: 'Warehouse Bay 4, Sector 62',
      details:
        'Physical recovery of SanDisk 128GB MicroSD concealed within steering console of vehicle DL-01-AB-1234. Placed in anti-static evidence envelope #4128.',
      hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      signature: 'RSA-PSS Verified (SV-INV-104)',
      status: 'VERIFIED',
    },
    {
      time: '10:18',
      stage: 'UPLOADED',
      title: 'Air-Gapped Ingest & SHA-256 Fingerprint',
      officer: 'Senior Investigator Sharma',
      badge: 'SV-INV-104',
      dept: 'Investigation Division',
      location: 'Intranet Ingest Station #02',
      details:
        'Bitstream raw image extracted. Magic-byte verification validated disk partition format. Cryptographic SHA-256 fingerprint generated and indexed.',
      hash: '7d8a21f58b901a24328d492c30089e5a1b32d2948e42fa605f63d9a741c88102',
      signature: 'RSA-PSS Verified (SV-INV-104)',
      status: 'VERIFIED',
    },
    {
      time: '10:19',
      stage: 'VERIFIED',
      title: 'Cryptographic Integrity Confirmation',
      officer: 'Inspector General Elena Rostova',
      badge: 'SV-AUD-900',
      dept: 'Compliance & Audit Wing',
      location: 'Integrity Verification Console',
      details:
        'Automated digest check: recorded digest exactly matches ingested bitstream. AES-256-GCM 128-bit authentication tag confirmed zero bit modification.',
      hash: '7d8a21f58b901a24328d492c30089e5a1b32d2948e42fa605f63d9a741c88102',
      signature: 'RSA-PSS Verified (SV-AUD-900)',
      status: 'VERIFIED',
    },
    {
      time: '10:26',
      stage: 'ASSIGNED',
      title: 'Lead Forensic Specialist Mandate',
      officer: 'Dr. Vikramaditya Sen, IPS',
      badge: 'SV-ADM-001',
      dept: 'Central Cyber Crime Cell',
      location: 'Executive Governance Roster',
      details:
        'Formal case commission enacted. Access granted strictly to Lead Investigator Sharma and Forensic Analyst Rostova. Cross-case isolation locks out unauthorized units.',
      hash: '7d8a21f58b901a24328d492c30089e5a1b32d2948e42fa605f63d9a741c88102',
      signature: 'RSA-PSS Verified (SV-ADM-001)',
      status: 'VERIFIED',
    },
    {
      time: '13:41',
      stage: 'TRANSFERRED',
      title: 'Secure Inter-Department Handover',
      officer: 'Forensic Intake Officer Marcus',
      badge: 'SV-INV-102',
      dept: 'Digital Forensics Laboratory',
      location: 'Forensic Vault A-12 Air-Lock',
      details:
        'Physical media transferred from temporary field lockbox to high-security cold vault A-12. Handover receipt signed with dual-officer cryptographic tokens.',
      hash: '7d8a21f58b901a24328d492c30089e5a1b32d2948e42fa605f63d9a741c88102',
      signature: 'RSA-PSS Verified (SV-INV-102)',
      status: 'VERIFIED',
    },
    {
      time: '15:12',
      stage: 'EXAMINED',
      title: 'Cleanroom Hardware Analysis & OCR',
      officer: 'Senior Investigator Sharma',
      badge: 'SV-INV-104',
      dept: 'Special Anti-Cartel Wing',
      location: 'Cleanroom Analysis Suite #01',
      details:
        'Decrypted partition using ephemeral session key. Local privacy-preserving OCR extracted 14 fraudulent vehicle smart card templates and identity dossiers.',
      hash: '7d8a21f58b901a24328d492c30089e5a1b32d2948e42fa605f63d9a741c88102',
      signature: 'RSA-PSS Verified (SV-INV-104)',
      status: 'VERIFIED',
    },
    {
      time: 'Next Day',
      stage: 'SUBMITTED',
      title: 'Judicial Courtroom Evidence Filing',
      officer: 'Advocate Meenakshi Sundaram',
      badge: 'BAR-DLI-1998/412',
      dept: 'Directorate of Prosecution',
      location: 'Chief Judicial Magistrate Court #03',
      details:
        'Evidence packet tendered into courtroom record alongside statutory Section 65B/63 BSA digital authenticity certificate and magistrate QR verification seal.',
      hash: '7d8a21f58b901a24328d492c30089e5a1b32d2948e42fa605f63d9a741c88102',
      signature: 'RSA-PSS Verified (BAR-DLI-1998)',
      status: 'VERIFIED',
    },
    {
      time: 'Later',
      stage: 'ARCHIVED',
      title: 'Write-Once Cryptographic Preservation',
      officer: 'Chief Inspector Arthur Pendelton',
      badge: 'SV-ADM-001',
      dept: 'Judicial Archives Division',
      location: 'Central Vault Write-Once Repository',
      details:
        'Permanent post-trial evidentiary preservation. Cryptographic hash chain permanently closed ($0^{64}$) ensuring non-repudiation across appeals.',
      hash: '7d8a21f58b901a24328d492c30089e5a1b32d2948e42fa605f63d9a741c88102',
      signature: 'RSA-PSS Verified (SV-ADM-001)',
      status: 'VERIFIED',
    },
  ];

  // Document Management Interface Data
  const documentsList = [
    {
      name: 'FIR_2026_0142.pdf',
      type: 'FIR',
      caseId: 'CASE-2026-0142',
      version: 'v3',
      owner: 'Senior Inv Sharma',
      lastAccessed: 'Today, 11:42',
      integrity: 'VERIFIED',
      access: 'Restricted',
      size: '2.4 MB',
      hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      summary:
        'First Information Report filed u/s 154 CrPC alleging offences under Section 420 IPC, Section 468 IPC (Forgery), and Section 66 IT Act regarding counterfeit vehicle registration smart cards.',
    },
    {
      name: 'Witness_Deposition_Rajesh.pdf',
      type: 'Witness Statement',
      caseId: 'CASE-2026-0142',
      version: 'v1',
      owner: 'Prosecution Liaison Unit',
      lastAccessed: 'Yesterday, 16:30',
      integrity: 'VERIFIED',
      access: 'Confidential',
      size: '1.1 MB',
      hash: 'a1b2c3d4e5f60718293a4b5c6d7e8f90123456789abcdef0123456789abcdef0',
      summary:
        'Sworn deposition of Transport Authority Inspector detailing initial discovery of duplicate chassis stamping during highway inspection bay checks.',
    },
    {
      name: 'Cyber_Forensic_Extraction_SDFW.bin',
      type: 'Forensic Report',
      caseId: 'CASE-2026-0142',
      version: 'v2',
      owner: 'Forensic Analyst Rostova',
      lastAccessed: 'Today, 09:15',
      integrity: 'VERIFIED',
      access: 'Secret',
      size: '18.4 MB',
      hash: '7d8a21f58b901a24328d492c30089e5a1b32d2948e42fa605f63d9a741c88102',
      summary:
        'Complete hardware bitstream dump, unallocated cluster extraction, and memory sector analysis confirming 14 fraudulent identity templates.',
    },
    {
      name: 'Charge_Sheet_Sec420_468.pdf',
      type: 'Charge Sheet',
      caseId: 'CASE-2026-0142',
      version: 'v1',
      owner: 'Public Prosecutor',
      lastAccessed: '2 days ago',
      integrity: 'VERIFIED',
      access: 'Restricted',
      size: '4.8 MB',
      hash: '4f8a91c0b3d5e729a1b0c3d4e5f60718293a4b5c6d7e8f90123456789abcdef0',
      summary:
        'Formal prosecution indictment document listing statutory criminal charges, corroborated evidence exhibits, and designated witness summons schedules.',
    },
    {
      name: 'Section_65B_Certificate.pdf',
      type: 'Court Filing',
      caseId: 'CASE-2026-0142',
      version: 'v1',
      owner: 'Advocate Sundaram',
      lastAccessed: 'Today, 10:00',
      integrity: 'VERIFIED',
      access: 'Public QR Sealed',
      size: '1.8 MB',
      hash: '9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d',
      summary:
        'Mandatory digital evidence admissibility affidavit submitted pursuant to Section 65B Indian Evidence Act / Section 63 Bharatiya Sakshya Adhiniyam.',
    },
  ];

  // Investigation Hierarchy Tree Data
  const treeNodes: Record<
    string,
    { title: string; category: string; clearance: string; details: string; metadata: string }
  > = {
    case: {
      title: 'CASE-2026-0142: Financial Investigation & Identity Forgery',
      category: 'Primary Investigation Case Dossier',
      clearance: 'RESTRICTED (Case Lead + Assigned)',
      details:
        'Central case docket investigating illicit vehicle chassis stamping and counterfeit RTO smart cards (DL-01-AB-1234, MH 12 CD 5678). All case records anchored in Genesis hash chain.',
      metadata: 'Lead Officer: Senior Inv Sharma • Department: Special Anti-Cartel Wing',
    },
    fir: {
      title: 'FIR No. 104/2026 (CrPC Section 154)',
      category: 'Statutory Incident Record',
      clearance: 'CONFIDENTIAL (Signed RSA-PSS)',
      details:
        'First Information Report registered at Cyber Cell Sector 62. Primary complainant: Transport Authority Inspector Rajesh K. offences under IPC 420, 468 and IT Act 66.',
      metadata: 'Registered: 2026-08-14 • Digital Signature: Arthur Pendelton (SV-ADM-001)',
    },
    witness: {
      title: 'Inspector Rajesh K. (Official Witness)',
      category: 'Official Complainant / State Witness',
      clearance: 'OFFICIAL USE ONLY',
      details:
        'Senior Transport Authority Officer who uncovered duplicate chassis plates during routine commercial highway vehicle validation at Toll Gate 4.',
      metadata: 'Witness Deposition: Sworn under oath • Status: Deposition Sealed',
    },
    evidence: {
      title: 'EV-1042: SanDisk 128GB High-Speed MicroSD Card',
      category: 'Physical & Digital Evidence Exhibit',
      clearance: 'CHAIN OF CUSTODY SEALED',
      details:
        'Seized during Warehouse Bay 4 raid. Contains partition dump of forged smart cards. Continuous 8-stage custody chain verified from seizure to court.',
      metadata: 'Storage: Forensic Vault A-12 • Current Custodian: Senior Inv Sharma',
    },
    forensic: {
      title: 'Forensic Extraction Report (SDFW-2026-412)',
      category: 'Technical Forensic Analysis',
      clearance: 'SECRET (Forensics Wing Only)',
      details:
        'Comprehensive 42-page technical examination of seized memory media. Confirms recovery of 1,280 duplicate chassis templates and encrypted comms logs.',
      metadata: 'Author: Analyst Elena Rostova (SV-AUD-900) • Magic Bytes: Verified',
    },
    charge_sheet: {
      title: 'Statutory Prosecution Charge Sheet',
      category: 'Statutory Criminal Indictment',
      clearance: 'RESTRICTED (Prosecution Wing)',
      details:
        'Formal prosecution indictment filed under Section 173 CrPC. Contains forensic exhibits, witness list, and digital signature certificates.',
      metadata: 'Filed: Sessions Court #03 • Public Prosecutor Commission',
    },
    court_filing: {
      title: 'Section 65B/63 BSA Admissibility Certificate',
      category: 'Judicial Evidence Certificate',
      clearance: 'JUDICIAL AUDIT VERIFIED',
      details:
        'Statutory electronic evidence certificate confirming hardware custody, air-gapped extraction, and unbroken hash chain for trial judge review.',
      metadata: 'Magistrate QR Verification: Enabled • Zero Data Leakage',
    },
  };

  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* 1. CALM ENTERPRISE NAVIGATION */}
      <header className="h-16 border-b border-slate-800/80 bg-[#080d1a]/90 backdrop-blur-md px-6 md:px-12 flex items-center justify-between sticky top-0 z-50">
        {/* Brand identity */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollTo('hero')}>
          <div className="w-8 h-8 rounded-lg bg-slate-900 border border-cyan-500/40 flex items-center justify-center">
            <Lock className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-base tracking-wider text-white">
                SECURE<span className="text-cyan-400">VAULT</span>
              </span>
              <span className="text-[9px] uppercase font-mono font-semibold px-1.5 py-0.5 rounded bg-slate-900 text-cyan-400 border border-slate-800">
                PROTOTYPE
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono tracking-tight hidden sm:block">
              Digital Document & Investigation Evidence Platform
            </p>
          </div>
        </div>

        {/* Calm Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 text-xs font-mono text-slate-400">
          <button onClick={() => scrollTo('problem')} className="hover:text-cyan-400 transition">
            Problem
          </button>
          <button onClick={() => scrollTo('product')} className="hover:text-cyan-400 transition">
            Product
          </button>
          <button onClick={() => scrollTo('evidence')} className="hover:text-cyan-400 transition">
            Evidence
          </button>
          <button onClick={() => scrollTo('documents')} className="hover:text-cyan-400 transition">
            Documents
          </button>
          <button onClick={() => scrollTo('security')} className="hover:text-cyan-400 transition">
            Security
          </button>
          <button onClick={() => scrollTo('investigation-tree')} className="hover:text-cyan-400 transition">
            Relationship Tree
          </button>
          <button onClick={() => scrollTo('dossier')} className="hover:text-cyan-400 transition">
            SIH Dossier
          </button>
        </nav>

        {/* Right Navigation Actions */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onEnterApp}
            className="hidden sm:inline-block text-xs font-mono text-slate-300 hover:text-white px-3 py-1.5 rounded transition"
          >
            Official Sign In
          </button>

          <button
            onClick={onEnterApp}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm flex items-center space-x-1.5 transition"
          >
            <span>Open Platform</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Drawer Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0f1d] border-b border-slate-800 px-6 py-4 space-y-3 font-mono text-xs text-slate-300">
          <button onClick={() => scrollTo('problem')} className="block w-full text-left py-1.5 hover:text-cyan-400">
            1. The Problem
          </button>
          <button onClick={() => scrollTo('product')} className="block w-full text-left py-1.5 hover:text-cyan-400">
            2. Platform Overview
          </button>
          <button onClick={() => scrollTo('evidence')} className="block w-full text-left py-1.5 hover:text-cyan-400">
            3. Evidence Chain Timeline
          </button>
          <button onClick={() => scrollTo('documents')} className="block w-full text-left py-1.5 hover:text-cyan-400">
            4. Document Management
          </button>
          <button onClick={() => scrollTo('security')} className="block w-full text-left py-1.5 hover:text-cyan-400">
            5. Security Architecture
          </button>
          <button onClick={() => scrollTo('investigation-tree')} className="block w-full text-left py-1.5 hover:text-cyan-400">
            6. Investigation Tree
          </button>
          <button onClick={() => scrollTo('dossier')} className="block w-full text-left py-1.5 hover:text-cyan-400">
            7. SIH Problem Statement Dossier
          </button>
          <div className="pt-2 border-t border-slate-800 flex justify-between">
            <button onClick={onEnterApp} className="text-cyan-400 font-bold py-1">
              Sign In to Platform →
            </button>
          </div>
        </div>
      )}

      {/* 2. HERO — PRODUCT FIRST */}
      <section id="hero" className="relative pt-16 pb-16 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          {/* Eyebrow */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-wider uppercase">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span>SECURE DIGITAL DOCUMENT & INVESTIGATION PLATFORM</span>
          </div>

          {/* H1 Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Secure Every Document. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400">
              Preserve Every Evidence Trail.
            </span>
          </h1>

          {/* Supporting text */}
          <p className="text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-sans">
            SecureVault brings sensitive investigative documents, evidence tracking, controlled access and auditability into one secure platform.
          </p>

          {/* Actions */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onEnterApp}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg shadow-md flex items-center space-x-2 transition"
            >
              <span>Explore Platform</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => scrollTo('security')}
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-cyan-500/50 font-bold text-xs uppercase tracking-wider rounded-lg transition flex items-center space-x-2 font-mono"
            >
              <Server className="w-4 h-4 text-cyan-400" />
              <span>View Security Architecture</span>
            </button>
          </div>
        </div>

        {/* 3. HUMAN-DESIGNED HERO VISUAL (REAL PRODUCT PROTOTYPE) */}
        <div className="mt-12 max-w-5xl mx-auto">
          <div className="rounded-xl bg-[#0a0f1d] border border-slate-800 shadow-xl overflow-hidden">
            {/* Window title bar */}
            <div className="h-9 bg-slate-950 px-4 flex items-center justify-between border-b border-slate-800 text-xs font-mono text-slate-400">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-slate-700" />
                <span className="w-2 h-2 rounded-full bg-slate-700" />
                <span className="w-2 h-2 rounded-full bg-slate-700" />
                <span className="text-slate-600 ml-2">|</span>
                <span className="text-slate-300 font-semibold truncate">
                  SECUREVAULT // INVESTIGATION WORKSPACE // CASE-2026-0142
                </span>
              </div>
              <div className="flex items-center space-x-2 text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-emerald-400 font-mono">STATUS: ACTIVE</span>
              </div>
            </div>

            {/* Product Interface Body */}
            <div className="p-6 space-y-6 bg-[#080d1a]">
              {/* Primary Case Header */}
              <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800/90 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 font-mono text-xs">
                    <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-bold">
                      CASE-2026-0142
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-300 font-semibold">Financial Investigation & Forgery Ring</span>
                  </div>
                  <p className="text-xs text-slate-400 font-sans">
                    Lead: Senior Investigator Sharma (SV-INV-104) • Unit: Special Anti-Cartel & Digital Forensics Wing
                  </p>
                </div>

                <div className="flex items-center space-x-2 font-mono text-xs">
                  <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300 text-[11px]">
                    Clearance: <strong className="text-cyan-400">CONFIDENTIAL</strong>
                  </span>
                </div>
              </div>

              {/* Realistic Information Hierarchy Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
                <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Documents</div>
                  <div className="text-xl font-bold text-white mt-0.5">128</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">All SHA-256 Indexed</div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Evidence Items</div>
                  <div className="text-xl font-bold text-white mt-0.5">24</div>
                  <div className="text-[10px] text-cyan-400 mt-0.5">8-Stage Custody Chain</div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Integrity State</div>
                  <div className="text-xl font-bold text-emerald-400 mt-0.5">VERIFIED</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">0 Tamper Anomalies</div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Audit Chain</div>
                  <div className="text-xl font-bold text-emerald-400 mt-0.5">VALID</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Genesis Block Anchored</div>
                </div>
              </div>

              {/* Recent Activity Rows */}
              <div className="space-y-2 font-mono text-xs">
                <div className="text-[11px] text-slate-400 uppercase font-bold flex items-center justify-between">
                  <span>Recent Case Activity</span>
                  <span className="text-slate-500 font-normal">Real-Time Audit Stream</span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-white">Evidence EV-1042 verified by Forensic Analyst Rostova</span>
                  </div>
                  <span className="text-slate-500 text-[11px]">2 min ago</span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span className="text-white">Access request approved for Senior Inv Sharma (Clearance: CONFIDENTIAL)</span>
                  </div>
                  <span className="text-slate-500 text-[11px]">18 min ago</span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    <span className="text-white">Document version created: Charge Sheet v1.2 (SHA-256: 7d8a21...)</span>
                  </div>
                  <span className="text-slate-500 text-[11px]">41 min ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE PROBLEM SECTION — AUTHENTIC INVESTIGATION ACCOUNTABILITY */}
      <section id="problem" className="py-20 px-6 md:px-12 max-w-6xl mx-auto border-t border-slate-800/80">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono text-cyan-400 uppercase font-bold tracking-wider">
            Operational Dilemma
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            Investigations generate more than documents. They generate accountability.
          </h2>
          <p className="text-sm text-slate-300 mt-2 font-sans leading-relaxed">
            A case file does not simply sit in storage. It is collected at crime scenes, transferred between precincts, examined by specialists, submitted to prosecutors, and tested under judicial scrutiny.
          </p>
        </div>

        {/* Visual Lifecycle Workflow */}
        <div className="p-6 rounded-xl bg-[#0a0f1d] border border-slate-800 mb-8 font-mono text-xs">
          <div className="text-slate-400 uppercase font-semibold mb-4 text-[11px]">
            The Fragile Document & Evidence Lifecycle:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 text-center">
            {[
              'Document collected',
              'Stored',
              'Accessed',
              'Modified',
              'Transferred',
              'Submitted',
              'Archived',
            ].map((step, idx) => (
              <div key={idx} className="p-2.5 rounded bg-slate-900/60 border border-slate-800">
                <span className="text-slate-500 text-[10px] block font-bold">0{idx + 1}</span>
                <span className="text-slate-200 font-medium text-xs mt-1 block">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 5 Critical Vulnerabilities vs SecureVault Answers */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            {
              q: 'Who accessed it?',
              issue: 'Unrestricted shared folders and link sharing without case clearance.',
              answer: 'Multi-layer ABAC (Role + Case + Department) enforced at API boundary.',
            },
            {
              q: 'Was it modified?',
              issue: 'Undetected byte alteration or bitrot during investigations.',
              answer: 'SHA-256 fingerprinting & 128-bit AES-GCM authentication tags.',
            },
            {
              q: 'Who transferred it?',
              issue: 'Missing physical handover receipts and unverified custodians.',
              answer: 'Dual-officer cryptographically signed 8-stage chain of custody.',
            },
            {
              q: 'When did it happen?',
              issue: 'Disputed paper log timestamps challenged under legal review.',
              answer: 'Immutable cryptographic timestamping anchored in system ledger.',
            },
            {
              q: 'Can history be verified?',
              issue: 'Retrospective alteration or deletion of standard database logs.',
              answer: 'Genesis-anchored ($0^{64}$) hash-chained ledger preventing retroactive edits.',
            },
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-lg bg-[#0e1629] border border-slate-800 space-y-2 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="text-rose-400 font-mono text-xs font-bold flex items-center space-x-1">
                  <span>?</span>
                  <span>{item.q}</span>
                </div>
                <p className="text-slate-400 text-xs font-sans leading-relaxed">{item.issue}</p>
              </div>

              <div className="pt-2 border-t border-slate-800/80">
                <span className="text-[10px] font-mono text-cyan-400 block font-bold">SecureVault Resolution:</span>
                <p className="text-slate-200 text-xs font-sans mt-0.5">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PRODUCT SOLUTION — CONTROLLED TRAIL */}
      <section id="product" className="py-20 px-6 md:px-12 max-w-6xl mx-auto border-t border-slate-800/80">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono text-cyan-400 uppercase font-bold tracking-wider">
            Architecture of Trust
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            One controlled trail from document to evidence.
          </h2>
          <p className="text-sm text-slate-300 mt-2 font-sans leading-relaxed">
            SecureVault establishes an unbroken chain where legal documents, physical exhibits, and custody transfers are unified into a verifiable cryptographic ecosystem.
          </p>
        </div>

        {/* Structured Visual Workflow Diagram */}
        <div className="p-6 md:p-8 rounded-xl bg-[#0a0f1d] border border-slate-800 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 text-center font-mono text-xs">
            {[
              { node: 'CASE', desc: 'Central case docket & investigator clearance' },
              { node: 'DOCUMENTS', desc: 'FIR, statements, and forensic reports' },
              { node: 'EVIDENCE', desc: 'Physical & digital seizure exhibits' },
              { node: 'VERIFICATION', desc: 'SHA-256 fingerprint & GCM tags' },
              { node: 'AUDIT', desc: 'Genesis-anchored chained ledger' },
              { node: 'COURT / ARCHIVE', desc: 'Sec 65B/63 BSA certified filing' },
            ].map((step, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-cyan-400 font-bold text-xs block">{step.node}</span>
                <p className="text-[10px] text-slate-400 font-sans">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-lg bg-slate-950 border border-slate-800/80 text-xs font-mono text-slate-400 space-y-1">
            <span className="text-slate-300 font-bold block">Engineered Operational Guarantee:</span>
            <p className="font-sans leading-relaxed">
              Every document uploaded is encrypted with a unique per-file subkey derived via HKDF. Any modification to a document produces a mismatched digest on download. Any attempt to modify an audit log breaks the SHA-256 chain from the Genesis state ($0^{64}$), exposing the anomaly immediately.
            </p>
          </div>
        </div>
      </section>

      {/* 6. EVIDENCE CHAIN OF CUSTODY UI (SIGNATURE TIMELINE) */}
      <section id="evidence" className="py-20 px-6 md:px-12 max-w-6xl mx-auto border-t border-slate-800/80">
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-mono text-cyan-400 uppercase font-bold tracking-wider">
            Signature Evidence Protocol
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            Evidence Chain of Custody Timeline
          </h2>
          <p className="text-sm text-slate-300 mt-2 font-sans leading-relaxed">
            Real investigators require concrete tracking. Click any stage to inspect the acting officer, facility location, timestamp, and cryptographic proof.
          </p>
        </div>

        {/* 8-Stage Timeline Button Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 p-1.5 bg-[#0a0f1d] border border-slate-800 rounded-xl mb-6 font-mono text-xs">
          {timelineEvents.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTimelineStage(idx)}
              className={`p-2.5 rounded-lg text-left transition flex flex-col justify-between ${
                activeTimelineStage === idx
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <span className="text-[10px] block">{item.time}</span>
              <span className="text-xs font-bold block mt-0.5 truncate">{item.stage}</span>
            </button>
          ))}
        </div>

        {/* Timeline Inspector Card */}
        {timelineEvents[activeTimelineStage] && (
          <div className="p-6 rounded-xl bg-[#0e1629] border border-cyan-500/30 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 font-mono text-xs">
                  <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-bold">
                    STAGE {activeTimelineStage + 1} OF 8: {timelineEvents[activeTimelineStage].stage}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
                    {timelineEvents[activeTimelineStage].status}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-1">
                  {timelineEvents[activeTimelineStage].title}
                </h3>
              </div>

              <div className="text-right font-mono text-xs">
                <span className="text-slate-400 block text-[10px]">RECORDED TIMESTAMP</span>
                <span className="text-cyan-400 font-bold">{timelineEvents[activeTimelineStage].time} UTC</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-500 block uppercase text-[10px]">Acting Custodian</span>
                <p className="text-white font-bold">{timelineEvents[activeTimelineStage].officer}</p>
                <span className="text-slate-400 text-[11px]">
                  Badge: {timelineEvents[activeTimelineStage].badge} • {timelineEvents[activeTimelineStage].dept}
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-500 block uppercase text-[10px]">Facility Location</span>
                <p className="text-cyan-300 font-bold">{timelineEvents[activeTimelineStage].location}</p>
                <span className="text-slate-400 text-[11px]">Physical transfer logged & verified</span>
              </div>
            </div>

            {/* Cryptographic Proof Metadata */}
            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs">
              <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">
                Cryptographic Evidence Integrity Seal
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-slate-500">SHA-256 Digest:</span>
                  <code className="text-cyan-400 block truncate mt-0.5">{timelineEvents[activeTimelineStage].hash}</code>
                </div>
                <div>
                  <span className="text-slate-500">Digital Signature:</span>
                  <code className="text-emerald-400 block truncate mt-0.5">{timelineEvents[activeTimelineStage].signature}</code>
                </div>
              </div>
            </div>

            <div className="text-xs font-sans text-slate-300 leading-relaxed bg-slate-900/40 p-3.5 rounded-lg border border-slate-800/80">
              <strong className="text-slate-200 block font-mono text-[11px] mb-0.5">Procedural Justification:</strong>
              {timelineEvents[activeTimelineStage].details}
            </div>
          </div>
        )}
      </section>

      {/* 7. AUTHENTIC DOCUMENT MANAGEMENT INTERFACE */}
      <section id="documents" className="py-20 px-6 md:px-12 max-w-6xl mx-auto border-t border-slate-800/80">
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-mono text-cyan-400 uppercase font-bold tracking-wider">
            Operational Records
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            Authentic Legal Document Workspace
          </h2>
          <p className="text-sm text-slate-300 mt-2 font-sans leading-relaxed">
            Not a generic cloud file browser. SecureVault maintains structured legal records with cryptographic hashes, version controls, and case clearance gates.
          </p>
        </div>

        {/* Operational Document Table */}
        <div className="rounded-xl bg-[#0a0f1d] border border-slate-800 overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="bg-slate-950 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                  <th className="py-3 px-4">Document Name</th>
                  <th className="py-3 px-4">Classification</th>
                  <th className="py-3 px-4">Case ID</th>
                  <th className="py-3 px-4">Ver</th>
                  <th className="py-3 px-4">Custodian</th>
                  <th className="py-3 px-4">Last Accessed</th>
                  <th className="py-3 px-4">Integrity</th>
                  <th className="py-3 px-4">Access</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {documentsList.map((doc, idx) => {
                  const isSelected = selectedDocIndex === idx;
                  return (
                    <tr
                      key={idx}
                      onClick={() => setSelectedDocIndex(idx)}
                      className={`cursor-pointer transition ${
                        isSelected ? 'bg-cyan-950/40 text-white' : 'hover:bg-slate-900/60 text-slate-300'
                      }`}
                    >
                      <td className="py-3 px-4 font-bold flex items-center space-x-2">
                        <FileText className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                        <span className="truncate max-w-[180px]">{doc.name}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-300">
                          {doc.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-cyan-400">{doc.caseId}</td>
                      <td className="py-3 px-4 text-slate-400">{doc.version}</td>
                      <td className="py-3 px-4 truncate max-w-[120px]">{doc.owner}</td>
                      <td className="py-3 px-4 text-slate-500">{doc.lastAccessed}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-400 text-[10px] font-bold">
                          {doc.integrity}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-400">{doc.access}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Selected Document Details Drawer */}
          {documentsList[selectedDocIndex] && (
            <div className="p-4 bg-slate-950/90 border-t border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs font-mono">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-slate-400 uppercase text-[10px] font-bold">Inspect Record:</span>
                  <span className="text-white font-bold">{documentsList[selectedDocIndex].name}</span>
                  <span className="text-slate-600">|</span>
                  <span className="text-slate-400">{documentsList[selectedDocIndex].size}</span>
                </div>
                <p className="text-slate-300 font-sans text-xs max-w-3xl leading-relaxed">
                  {documentsList[selectedDocIndex].summary}
                </p>
                <div className="text-[10px] text-slate-500 truncate">
                  SHA-256 Digest: <code className="text-cyan-400">{documentsList[selectedDocIndex].hash}</code>
                </div>
              </div>

              <button
                onClick={onEnterApp}
                className="px-3.5 py-2 bg-slate-900 border border-slate-700 hover:border-cyan-400 text-white rounded text-xs transition flex items-center space-x-1 self-start md:self-auto flex-shrink-0"
              >
                <span>View Full Record</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 8. SECURITY ARCHITECTURE FRAGMENTS */}
      <section id="security" className="py-20 px-6 md:px-12 max-w-6xl mx-auto border-t border-slate-800/80">
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-mono text-cyan-400 uppercase font-bold tracking-wider">
            Technical Controls
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            Implemented Security Architecture
          </h2>
          <p className="text-sm text-slate-300 mt-2 font-sans leading-relaxed">
            Real cryptographic engineering. No vague buzzwords—only mechanisms genuinely implemented in the SecureVault core.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Fragment 1: Cross-Case Authorization Barrier */}
          <div className="p-6 rounded-xl bg-[#0e1629] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-mono text-xs">
              <span className="text-white font-bold flex items-center space-x-2">
                <Key className="w-4 h-4 text-amber-400" />
                <span>RBAC & Case-Level Authorization Gate</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 text-[10px]">
                Enforced at API Gateway
              </span>
            </div>

            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Investigators can only access cases explicitly assigned to them. Cross-case enumeration or IDOR attempts are rejected with an immediate 403 Forbidden.
            </p>

            <div className="space-y-2 font-mono text-xs">
              <div className="p-3 rounded bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-white font-bold block">Senior Inv Sharma</span>
                  <span className="text-[10px] text-slate-500">Assigned Lead on CASE-2026-104</span>
                </div>
                <span className="px-2 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[11px] font-bold">
                  200 OK (AUTHORIZED)
                </span>
              </div>

              <div className="p-3 rounded bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-white font-bold block">Detective Marcus Vance</span>
                  <span className="text-[10px] text-slate-500">Assigned on Case 102 • Unassigned on 104</span>
                </div>
                <span className="px-2 py-1 rounded bg-rose-950 text-rose-400 border border-rose-800 text-[11px] font-bold">
                  403 FORBIDDEN (BLOCKED)
                </span>
              </div>
            </div>
          </div>

          {/* Fragment 2: Genesis Hash-Chained Audit Ledger */}
          <div className="p-6 rounded-xl bg-[#0e1629] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-mono text-xs">
              <span className="text-white font-bold flex items-center space-x-2">
                <History className="w-4 h-4 text-cyan-400" />
                <span>Genesis-Anchored Hash Chain Ledger</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px]">
                UNBROKEN CHAIN
              </span>
            </div>

            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Every audit entry cryptographically seals the previous event hash back to the Genesis block ($0^{64}$). Any retroactive alteration in the database breaks the mathematical chain.
            </p>

            <div className="p-3 rounded bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500 text-[10px]">
                <span>Genesis Block (Root Anchor)</span>
                <code>00000000000000000000000000000000...</code>
              </div>
              <div className="text-center text-slate-600 text-xs">↓ SHA-256 Chained Hash</div>
              <div className="flex items-center justify-between text-slate-300 text-[11px]">
                <span>Block #142 (Evidence Ingest)</span>
                <code className="text-cyan-400">7d8a21f58b901a24328d...</code>
              </div>
              <div className="text-center text-slate-600 text-xs">↓ SHA-256 Chained Hash</div>
              <div className="flex items-center justify-between text-slate-300 text-[11px]">
                <span>Block #143 (Custody Transfer)</span>
                <code className="text-emerald-400">a04c9225d31a4abfa405...</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. INVESTIGATION RELATIONSHIP HIERARCHY TREE */}
      <section id="investigation-tree" className="py-20 px-6 md:px-12 max-w-6xl mx-auto border-t border-slate-800/80">
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-mono text-cyan-400 uppercase font-bold tracking-wider">
            Analytical Hierarchy
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            Investigation Relationship Tree
          </h2>
          <p className="text-sm text-slate-300 mt-2 font-sans leading-relaxed">
            Case files are networks of evidence, statements, and statutory filings. Inspect the hierarchy connecting CASE-2026-0142.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tree Node Structure */}
          <div className="lg:col-span-2 p-6 rounded-xl bg-[#0a0f1d] border border-slate-800 font-mono text-xs space-y-2">
            <div className="text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800 pb-2">
              Case Entity Structure (Click node to inspect)
            </div>

            <div className="space-y-1 pt-2">
              <button
                onClick={() => setSelectedTreeNode('case')}
                className={`w-full text-left p-2.5 rounded transition flex items-center space-x-2 ${
                  selectedTreeNode === 'case'
                    ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40'
                    : 'hover:bg-slate-900 text-slate-300'
                }`}
              >
                <span className="font-bold text-cyan-400">CASE-2026-0142</span>
                <span className="text-slate-500 text-[11px]">Financial Investigation & Identity Forgery</span>
              </button>

              <div className="pl-6 border-l border-slate-800 ml-3 space-y-1">
                {[
                  { key: 'fir', label: 'FIR No. 104/2026 (CrPC Sec 154)', type: 'Statutory Filing' },
                  { key: 'witness', label: 'Witness: Inspector Rajesh K.', type: 'Transport Authority' },
                  { key: 'evidence', label: 'Evidence: EV-1042 (128GB MicroSD)', type: 'Physical Exhibit' },
                  { key: 'forensic', label: 'Forensic Report: Hardware Extraction', type: 'Laboratory Dump' },
                  { key: 'charge_sheet', label: 'Charge Sheet: Indictment u/s 420/468', type: 'Prosecution Filing' },
                  { key: 'court_filing', label: 'Court Filing: Sec 65B/63 BSA Cert', type: 'Judicial Affidavit' },
                ].map((node) => (
                  <button
                    key={node.key}
                    onClick={() => setSelectedTreeNode(node.key)}
                    className={`w-full text-left p-2 rounded transition flex items-center justify-between ${
                      selectedTreeNode === node.key
                        ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40'
                        : 'hover:bg-slate-900 text-slate-400'
                    }`}
                  >
                    <span>├── {node.label}</span>
                    <span className="text-[10px] text-slate-500">{node.type}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Node Attribute Inspector */}
          {treeNodes[selectedTreeNode] && (
            <div className="p-6 rounded-xl bg-[#0e1629] border border-cyan-500/30 space-y-4 font-mono text-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="border-b border-slate-800 pb-2">
                  <span className="text-[10px] text-slate-500 uppercase block">Category:</span>
                  <span className="text-cyan-400 font-bold">{treeNodes[selectedTreeNode].category}</span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white">
                    {treeNodes[selectedTreeNode].title}
                  </h3>
                  <div className="mt-2 text-[11px] p-2 rounded bg-slate-950 border border-slate-800 text-emerald-400">
                    Clearance: {treeNodes[selectedTreeNode].clearance}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase block">Context & Evidence Link:</span>
                  <p className="text-slate-300 font-sans text-xs leading-relaxed">
                    {treeNodes[selectedTreeNode].details}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 text-[10px] text-slate-400">
                {treeNodes[selectedTreeNode].metadata}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 10. SIH PROBLEM STATEMENT ALIGNMENT DOSSIER */}
      <section id="dossier" className="py-20 px-6 md:px-12 max-w-6xl mx-auto border-t border-slate-800/80">
        <div className="max-w-3xl mb-10">
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Scale className="w-4 h-4" />
            <span>Smart India Hackathon (SIH) • Official Alignment</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            Secure Digital Document Management System (DMS)
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            National Security, Legal Governance & Police Asset Lifecycle Management
          </p>
        </div>

        {/* Dossier Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 p-1.5 bg-[#0a0f1d] border border-slate-800 rounded-xl gap-1 font-mono text-xs mb-6">
          <button
            onClick={() => setActiveDossierTab('statement')}
            className={`py-2 px-3 rounded-lg text-center transition ${
              activeDossierTab === 'statement'
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            1. Problem Statement
          </button>
          <button
            onClick={() => setActiveDossierTab('challenges')}
            className={`py-2 px-3 rounded-lg text-center transition ${
              activeDossierTab === 'challenges'
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            2. Scope & Challenges
          </button>
          <button
            onClick={() => setActiveDossierTab('mandates')}
            className={`py-2 px-3 rounded-lg text-center transition ${
              activeDossierTab === 'mandates'
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            3. 7 System Mandates
          </button>
          <button
            onClick={() => setActiveDossierTab('lifecycle')}
            className={`py-2 px-3 rounded-lg text-center transition ${
              activeDossierTab === 'lifecycle'
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            4. Police Asset Lifecycle
          </button>
        </div>

        {/* Tab 1: Statement */}
        {activeDossierTab === 'statement' && (
          <div className="p-6 rounded-xl bg-[#0e1629] border border-slate-800 space-y-4 font-sans text-xs">
            <div className="space-y-2 border-b border-slate-800 pb-4">
              <span className="font-mono text-cyan-400 uppercase text-xs font-bold block">• Background Context</span>
              <p className="text-slate-300 leading-relaxed">
                Law enforcement agencies, courts, and investigative departments handle sensitive FIRs, police reports, witness statements, charge sheets, court filings, and forensic reports throughout a case lifecycle. Traditional paper and fragmented cloud storage create severe tamper risks, missing custody records, and delayed trials.
              </p>
            </div>
            <div className="space-y-2">
              <span className="font-mono text-emerald-400 uppercase text-xs font-bold block">• Official Expected Solution</span>
              <div className="p-3.5 rounded bg-emerald-950/20 border border-emerald-500/40 text-emerald-200 font-medium">
                &ldquo;Develop a system to monitor and manage police assets throughout their lifecycle.&rdquo;
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Scope & Challenges */}
        {activeDossierTab === 'challenges' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
            {[
              { flaw: 'Locating records quickly', fix: 'Privacy-preserving local OCR + NLP semantic query search engine' },
              { flaw: 'Unauthorized data access', fix: 'Fine-grained ABAC + 2FA OTP + Case isolation barrier (403 BOLA)' },
              { flaw: 'Document tampering risks', fix: 'AES-256-GCM 128-bit auth tags + SHA-256 fingerprinting on ingest' },
              { flaw: 'Lack of version control', fix: 'Cryptographic custody event records & immutable version tracking' },
              { flaw: 'Cross-department delays', fix: 'Compartmentalized divisions (Cyber, Anti-Cartel, EOW, Legal)' },
              { flaw: 'Poor audit compliance', fix: 'Genesis-anchored SHA-256 hash-chained immutable audit ledger' },
            ].map((item, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-[#0e1629] border border-slate-800 space-y-1">
                <div className="text-rose-400 font-bold">• {item.flaw}</div>
                <div className="text-emerald-400 font-sans text-[11px] pl-2">↳ {item.fix}</div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: 7 Mandates */}
        {activeDossierTab === 'mandates' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
            {[
              { id: '01', title: 'Digitize & Centralize Storage', detail: 'Encrypted object storage with magic-byte validation and SHA-256 ingest hashing.' },
              { id: '02', title: 'Secure Access & Confidentiality', detail: 'Multi-layer ABAC clearance levels + dynamic non-destructive watermarking.' },
              { id: '03', title: 'Prevent Unauthorized Modification', detail: 'AES-256-GCM envelope encryption rejecting any single-bit tampering.' },
              { id: '04', title: 'Maintain Complete Audit Trail', detail: 'Genesis-anchored SHA-256 hash-chained immutable ledger for court admissibility.' },
              { id: '05', title: 'Efficient Search & Retrieval', detail: 'Local OCR indexing, sensitive entity extraction (vehicles, IPC, PII), and smart queries.' },
              { id: '06', title: 'Support Authorized Collaboration', detail: 'Secure JIT temporary sharing links with 192-bit entropy and auto-expiration.' },
              { id: '07', title: 'Ensure Regulatory Compliance', detail: 'PKI RSA-PSS asymmetric digital signatures and zero-leakage public QR verification.' },
            ].map((m) => (
              <div key={m.id} className="p-4 rounded-lg bg-[#0e1629] border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-cyan-400 font-bold">{m.id}</span>
                  <span className="text-[10px] text-emerald-400 font-bold">VERIFIED</span>
                </div>
                <h4 className="text-white font-bold text-xs">{m.title}</h4>
                <p className="text-slate-400 font-sans text-[11px] leading-relaxed">{m.detail}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Police Asset Lifecycle */}
        {activeDossierTab === 'lifecycle' && (
          <div className="p-6 rounded-xl bg-[#0e1629] border border-slate-800 space-y-3 font-mono text-xs">
            <span className="text-cyan-400 font-bold uppercase text-xs block">
              End-to-End Asset Custody & Lifecycle Management
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-1">
              {[
                { step: 'Phase 1: Seizure & Ingest', desc: 'Magic-byte inspection, SHA-256 fingerprinting, and Genesis custody block generation.' },
                { step: 'Phase 2: Forensic Analysis', desc: 'Special Forensics Wing transfer, local OCR, and sensitive entity detection.' },
                { step: 'Phase 3: Cryptographic Sealing', desc: 'AES-256-GCM envelope encryption with per-document subkeys derived via HKDF.' },
                { step: 'Phase 4: Case Collaboration', desc: 'Cross-investigator isolation enforced with BOLA/IDOR monitoring.' },
                { step: 'Phase 5: Digital Signature & Court', desc: 'RSA-PSS asymmetric digital signature with public QR verification for magistrates.' },
                { step: 'Phase 6: Immutable Archival', desc: 'Section 65B/63 BSA compliant permanent archival in write-once hash ledger.' },
              ].map((ph, idx) => (
                <div key={idx} className="p-3 rounded bg-slate-950 border border-slate-800 space-y-1">
                  <div className="text-white font-bold text-xs">{ph.step}</div>
                  <p className="text-slate-400 font-sans text-[11px] leading-tight">{ph.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 11. CONFIDENT FINAL ACTION SECTION */}
      <section className="py-20 px-6 md:px-12 max-w-4xl mx-auto text-center border-t border-slate-800/80">
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            A secure investigation starts with a trustworthy record.
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto font-sans leading-relaxed">
            Explore how SecureVault manages documents, evidence, access and auditability through one controlled workflow.
          </p>
          <div className="pt-2">
            <button
              onClick={onEnterApp}
              className="px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg shadow-md inline-flex items-center space-x-2 transition"
            >
              <span>Open SecureVault</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 12. CLEAN ENTERPRISE FOOTER */}
      <footer className="py-12 px-6 md:px-12 border-t border-slate-800/80 bg-[#070b16] text-slate-400 text-xs font-mono">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-sm">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded bg-cyan-950 border border-cyan-800 text-cyan-400 flex items-center justify-center">
                  <Lock className="w-3 h-3" />
                </div>
                <span className="font-bold text-white text-sm tracking-wider">
                  SECURE<span className="text-cyan-400">VAULT</span>
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                  Prototype
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans">
                Secure Digital Document & Investigation Evidence Platform. AES-256-GCM envelope encryption, tamper-evident audit chaining, and judicial non-repudiation.
              </p>
            </div>

            <div className="flex flex-wrap gap-8 text-xs font-mono">
              <div className="space-y-1.5 flex flex-col">
                <span className="text-slate-200 font-bold uppercase text-[10px]">Platform</span>
                <button onClick={() => scrollTo('hero')} className="text-left text-slate-400 hover:text-white transition">Overview</button>
                <button onClick={() => scrollTo('evidence')} className="text-left text-slate-400 hover:text-white transition">Evidence Chain</button>
                <button onClick={() => scrollTo('documents')} className="text-left text-slate-400 hover:text-white transition">Document Table</button>
              </div>

              <div className="space-y-1.5 flex flex-col">
                <span className="text-slate-200 font-bold uppercase text-[10px]">Security</span>
                <button onClick={() => scrollTo('security')} className="text-left text-slate-400 hover:text-white transition">Architecture</button>
                <button onClick={() => scrollTo('investigation-tree')} className="text-left text-slate-400 hover:text-white transition">Hierarchy Tree</button>
                <button onClick={() => scrollTo('dossier')} className="text-left text-slate-400 hover:text-white transition">SIH Dossier</button>
              </div>

              <div className="space-y-1.5 flex flex-col">
                <span className="text-slate-200 font-bold uppercase text-[10px]">Access</span>
                <button onClick={onEnterApp} className="text-left text-cyan-400 hover:text-cyan-300 font-semibold transition">Official Sign In</button>
                <span className="text-slate-500 text-[11px]">Section 65B/63 BSA</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-500 font-mono">
            <p>&copy; {new Date().getFullYear()} SECUREVAULT. Fictional prototype data for evaluation.</p>
            <p className="text-amber-400/80">Not affiliated with any official government or police department.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

import React, { useState, useEffect, useMemo } from 'react';
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
  Sun,
  Moon,
  Play,
  Pause,
  Copy,
  Search,
  Filter,
  Plus,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Sparkles,
} from 'lucide-react';

interface LandingPageProps {
  onEnterApp: () => void;
}

interface CaseItem {
  id: string;
  title: string;
  lead: string;
  docs: number;
  ev: number;
  last: string;
  status: 'ACTIVE' | 'REVIEW' | 'PENDING' | 'COURT';
  dept: string;
  custodyStage: number; // 0 to 5
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  // Theme State: Defaults to White/Light Theme as requested
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Navigation State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Active Custody Timeline Stage
  const [activeTimelineStage, setActiveTimelineStage] = useState(0);
  const [isAutoPlayingTimeline, setIsAutoPlayingTimeline] = useState(false);
  const [copiedDigest, setCopiedDigest] = useState(false);

  // Selected Document in Table
  const [selectedDocIndex, setSelectedDocIndex] = useState(0);
  const [docSearchQuery, setDocSearchQuery] = useState('');
  const [docCategoryFilter, setDocCategoryFilter] = useState('ALL');
  const [verifyingDocIndex, setVerifyingDocIndex] = useState<number | null>(null);
  const [verifiedDocSuccess, setVerifiedDocSuccess] = useState<boolean | null>(null);

  // Selected Investigation Tree Node
  const [selectedTreeNode, setSelectedTreeNode] = useState<string>('case');

  // Active SIH Dossier Tab
  const [activeDossierTab, setActiveDossierTab] = useState<
    'statement' | 'challenges' | 'mandates' | 'lifecycle'
  >('statement');

  // -------------------------------------------------------------
  // MOUSE MOVEMENT ANIMATION STATE
  // -------------------------------------------------------------
  const [globalMousePos, setGlobalMousePos] = useState({ x: -1000, y: -1000 });
  const [heroTilt, setHeroTilt] = useState({ x: 0, y: 0 });
  const [heroMousePos, setHeroMousePos] = useState({ x: 0, y: 0 });
  const [isMouseOverHero, setIsMouseOverHero] = useState(false);

  // -------------------------------------------------------------
  // DYNAMIC HERO APP MOCKUP STATE
  // -------------------------------------------------------------
  const [heroActiveSidebar, setHeroActiveSidebar] = useState<string>('Cases');
  const [heroSearchQuery, setHeroSearchQuery] = useState<string>('');
  const [heroFilterStatus, setHeroFilterStatus] = useState<string>('ALL');
  const [selectedCaseId, setSelectedCaseId] = useState<string>('CASE-2026-0142');
  const [hoveredChartIndex, setHoveredChartIndex] = useState<number | null>(null);
  const [showNewCaseModal, setShowNewCaseModal] = useState<boolean>(false);
  const [newCaseTitleInput, setNewCaseTitleInput] = useState<string>('');

  const [casesList, setCasesList] = useState<CaseItem[]>([
    {
      id: 'CASE-2026-0142',
      title: 'Financial Fraud & Vehicle Forgery',
      lead: 'Sr. Inv. Sharma',
      docs: 128,
      ev: 24,
      last: '2 min ago',
      status: 'ACTIVE',
      dept: 'Special Anti-Cartel Wing',
      custodyStage: 4,
    },
    {
      id: 'CASE-2026-0138',
      title: 'Cyber Extortion — FinTech Sector',
      lead: 'Det. Marcus Vance',
      docs: 74,
      ev: 11,
      last: '1 hr ago',
      status: 'ACTIVE',
      dept: 'Cyber Crime Cell',
      custodyStage: 3,
    },
    {
      id: 'CASE-2026-0131',
      title: 'Identity Theft Ring — 14 Suspects',
      lead: 'Inv. Chen Wei',
      docs: 91,
      ev: 37,
      last: '3 hr ago',
      status: 'REVIEW',
      dept: 'Economic Offences Wing',
      custodyStage: 5,
    },
    {
      id: 'CASE-2025-0098',
      title: 'Hawala Network — Cross-State',
      lead: 'Sr. Inv. Sharma',
      docs: 204,
      ev: 58,
      last: 'Yesterday',
      status: 'PENDING',
      dept: 'Enforcement Wing',
      custodyStage: 2,
    },
    {
      id: 'CASE-2025-0074',
      title: 'Drug Trafficking — Port Authority',
      lead: 'Sp. Agent Nair',
      docs: 312,
      ev: 89,
      last: '3 days ago',
      status: 'COURT',
      dept: 'Narcotics Control Cell',
      custodyStage: 5,
    },
  ]);

  // -------------------------------------------------------------
  // DYNAMIC TAMPER / INTEGRITY SIMULATOR STATE
  // -------------------------------------------------------------
  const [isTampered, setIsTampered] = useState<boolean>(false);
  const [tamperLoading, setTamperLoading] = useState<boolean>(false);

  // -------------------------------------------------------------
  // LIVE BLOCKCHAIN / AUDIT HEARTBEAT
  // -------------------------------------------------------------
  const [blockHeight, setBlockHeight] = useState<number>(4824);
  const [secondsAgo, setSecondsAgo] = useState<number>(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsAgo((prev) => {
        if (prev >= 12) {
          setBlockHeight((h) => h + 1);
          return 1;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-play timeline simulation
  useEffect(() => {
    let interval: any;
    if (isAutoPlayingTimeline) {
      interval = setInterval(() => {
        setActiveTimelineStage((prev) => (prev + 1) % 8);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isAutoPlayingTimeline]);

  // Global mouse move tracker for dynamic spotlight
  const handleGlobalMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setGlobalMousePos({ x: e.clientX, y: e.clientY });
  };

  // Hero interactive 3D perspective tilt
  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -3.5;
    const rotateY = ((x - centerX) / centerX) * 3.5;
    setHeroTilt({ x: rotateX, y: rotateY });
    setHeroMousePos({ x, y });
    setIsMouseOverHero(true);
  };

  const handleHeroMouseLeave = () => {
    setHeroTilt({ x: 0, y: 0 });
    setIsMouseOverHero(false);
  };

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
  const initialDocumentsList = [
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

  // Filtered documents
  const filteredDocuments = useMemo(() => {
    return initialDocumentsList.filter((doc) => {
      const matchesCat =
        docCategoryFilter === 'ALL' ||
        doc.type.toLowerCase().includes(docCategoryFilter.toLowerCase());
      const matchesSearch =
        doc.name.toLowerCase().includes(docSearchQuery.toLowerCase()) ||
        doc.owner.toLowerCase().includes(docSearchQuery.toLowerCase()) ||
        doc.caseId.toLowerCase().includes(docSearchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [docCategoryFilter, docSearchQuery]);

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

  // Filtered cases for hero preview
  const filteredHeroCases = useMemo(() => {
    return casesList.filter((c) => {
      const matchesStatus =
        heroFilterStatus === 'ALL' || c.status === heroFilterStatus;
      const matchesSearch =
        c.id.toLowerCase().includes(heroSearchQuery.toLowerCase()) ||
        c.title.toLowerCase().includes(heroSearchQuery.toLowerCase()) ||
        c.lead.toLowerCase().includes(heroSearchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [casesList, heroFilterStatus, heroSearchQuery]);

  // Selected case object for right panel inspector
  const activeHeroCase = useMemo(() => {
    return (
      casesList.find((c) => c.id === selectedCaseId) || casesList[0]
    );
  }, [casesList, selectedCaseId]);

  // Handler for adding new case in hero preview
  const handleCreateNewCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCaseTitleInput.trim()) return;
    const newId = `CASE-2026-0${Math.floor(150 + Math.random() * 850)}`;
    const newCase: CaseItem = {
      id: newId,
      title: newCaseTitleInput.trim(),
      lead: 'Senior Inv. Sharma',
      docs: 1,
      ev: 0,
      last: 'Just now',
      status: 'ACTIVE',
      dept: 'Special Operations Wing',
      custodyStage: 0,
    };
    setCasesList([newCase, ...casesList]);
    setSelectedCaseId(newId);
    setNewCaseTitleInput('');
    setShowNewCaseModal(false);
  };

  // Trigger verify document simulation
  const handleVerifyDocument = (index: number) => {
    setVerifyingDocIndex(index);
    setVerifiedDocSuccess(null);
    setTimeout(() => {
      setVerifyingDocIndex(null);
      setVerifiedDocSuccess(true);
      setTimeout(() => setVerifiedDocSuccess(null), 3000);
    }, 900);
  };

  // Copy hash handler
  const handleCopyDigest = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedDigest(true);
    setTimeout(() => setCopiedDigest(false), 2000);
  };

  // Tamper simulator toggle
  const handleToggleTamper = (tamperVal: boolean) => {
    setTamperLoading(true);
    setTimeout(() => {
      setIsTampered(tamperVal);
      setTamperLoading(false);
    }, 400);
  };

  // Dynamic Theme Palette Classes
  const isLight = theme === 'light';
  const pageBg = isLight ? 'bg-slate-50 text-slate-900' : 'bg-[#060913] text-slate-100';
  const cardBg = isLight ? 'bg-white border-slate-200 shadow-xs' : 'bg-[#0e1629] border-slate-800';
  const headerBg = isLight ? 'bg-white/95 border-b border-slate-200 shadow-xs' : 'bg-[#080d1a]/90 border-b border-slate-800/80';
  const subtleBoxBg = isLight ? 'bg-slate-100/80 border-slate-200' : 'bg-slate-950 border-slate-800';
  const textMuted = isLight ? 'text-slate-600' : 'text-slate-400';
  const textSubtle = isLight ? 'text-slate-500' : 'text-slate-500';
  const sectionBorder = isLight ? 'border-t border-slate-200' : 'border-t border-slate-800/80';

  // Chart data for sparkline
  const chartPoints: [number, number, string, number][] = [
    [0, 38, 'Mon', 8],
    [48, 28, 'Tue', 14],
    [96, 34, 'Wed', 11],
    [144, 18, 'Thu', 25],
    [192, 22, 'Fri', 21],
    [240, 10, 'Sat', 34],
    [288, 14, 'Sun', 38],
    [340, 8, 'Today', 42],
  ];

  return (
    <div
      onMouseMove={handleGlobalMouseMove}
      className={`min-h-screen ${pageBg} selection:bg-cyan-100 selection:text-cyan-900 transition-colors duration-200 relative overflow-hidden`}
    >
      {/* -------------------------------------------------------------------------- */}
      {/* INTERACTIVE MOUSE MOVEMENT SPOTLIGHT & AMBIENT AURA                        */}
      {/* -------------------------------------------------------------------------- */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(650px circle at ${globalMousePos.x}px ${globalMousePos.y}px, ${
            isLight ? 'rgba(6, 182, 212, 0.08)' : 'rgba(34, 211, 238, 0.12)'
          }, transparent 65%)`,
        }}
      />

      {/* Trailing Micro-Cursor Follower */}
      <div
        className="pointer-events-none fixed z-50 w-7 h-7 rounded-full border border-cyan-500/50 -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 hidden md:block"
        style={{
          left: `${globalMousePos.x}px`,
          top: `${globalMousePos.y}px`,
          boxShadow: isLight
            ? '0 0 16px rgba(6, 182, 212, 0.25)'
            : '0 0 20px rgba(34, 211, 238, 0.45)',
        }}
      />

      {/* Ambient background light orbs */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-ambient-glow" />
      <div className="absolute top-96 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none animate-ambient-glow delay-300" />

      {/* 1. ENTERPRISE LIVE STATUS & NAVIGATION */}
      <div className={`py-1.5 px-6 md:px-12 text-[11px] font-mono border-b flex items-center justify-between animate-fade-in ${isLight ? 'bg-cyan-50/70 border-cyan-100 text-cyan-900' : 'bg-cyan-950/40 border-cyan-900/40 text-cyan-300'}`}>
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold">GENESIS AUDIT LEDGER SYNCHRONIZED</span>
          <span className="hidden sm:inline opacity-70">|</span>
          <span className="hidden sm:inline">Block #{blockHeight} verified {secondsAgo}s ago</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="hidden md:inline font-semibold text-emerald-600 dark:text-emerald-400">
            ✓ 0 Digest Anomalies Detected
          </span>
          <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            Node Nominal
          </span>
        </div>
      </div>

      <header className={`h-16 ${headerBg} backdrop-blur-md px-6 md:px-12 flex items-center justify-between sticky top-0 z-40 transition-colors animate-fade-in-down`}>
        {/* Brand identity */}
        <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => scrollTo('hero')}>
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center border shadow-xs transition-transform duration-200 group-hover:scale-105 ${isLight ? 'bg-slate-900 border-slate-800 text-cyan-400' : 'bg-slate-900 border-cyan-500/40 text-cyan-400'}`}>
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className={`font-extrabold text-base tracking-wider ${isLight ? 'text-slate-900' : 'text-white'}`}>
                SECURE<span className="text-cyan-600 dark:text-cyan-400">VAULT</span>
              </span>
              <span className={`text-[9px] uppercase font-mono font-bold px-1.5 py-0.5 rounded border ${isLight ? 'bg-cyan-50 text-cyan-800 border-cyan-200' : 'bg-slate-900 text-cyan-400 border-slate-800'}`}>
                ENTERPRISE
              </span>
            </div>
            <p className={`text-[10px] font-mono tracking-tight hidden sm:block ${textSubtle}`}>
              Digital Document & Investigation Evidence Platform
            </p>
          </div>
        </div>

        {/* Calm Desktop Navigation Links */}
        <nav className={`hidden lg:flex items-center space-x-6 text-xs font-mono font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
          <button onClick={() => scrollTo('problem')} className="hover:text-cyan-600 dark:hover:text-cyan-400 transition hover:-translate-y-0.5 transform duration-150">
            Problem
          </button>
          <button onClick={() => scrollTo('product')} className="hover:text-cyan-600 dark:hover:text-cyan-400 transition hover:-translate-y-0.5 transform duration-150">
            Platform
          </button>
          <button onClick={() => scrollTo('evidence')} className="hover:text-cyan-600 dark:hover:text-cyan-400 transition hover:-translate-y-0.5 transform duration-150">
            Evidence Chain
          </button>
          <button onClick={() => scrollTo('documents')} className="hover:text-cyan-600 dark:hover:text-cyan-400 transition hover:-translate-y-0.5 transform duration-150">
            Documents
          </button>
          <button onClick={() => scrollTo('security')} className="hover:text-cyan-600 dark:hover:text-cyan-400 transition hover:-translate-y-0.5 transform duration-150">
            Security & Tamper Lab
          </button>
          <button onClick={() => scrollTo('investigation-tree')} className="hover:text-cyan-600 dark:hover:text-cyan-400 transition hover:-translate-y-0.5 transform duration-150">
            Case Tree
          </button>
          <button onClick={() => scrollTo('dossier')} className="hover:text-cyan-600 dark:hover:text-cyan-400 transition hover:-translate-y-0.5 transform duration-150">
            SIH Dossier
          </button>
        </nav>

        {/* Right Navigation Actions */}
        <div className="flex items-center space-x-3">
          {/* Dynamic Theme Toggle Pill */}
          <button
            onClick={() => setTheme(isLight ? 'dark' : 'light')}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono flex items-center space-x-1.5 transition shadow-xs hover:scale-105 active:scale-95 transform ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200'
            }`}
            title="Toggle Light / Dark mode"
          >
            {isLight ? (
              <>
                <Moon className="w-3.5 h-3.5 text-slate-700" />
                <span className="hidden sm:inline text-[11px] font-semibold">Dark Mode</span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline text-[11px] font-semibold">White Theme</span>
              </>
            )}
          </button>

          <button
            onClick={onEnterApp}
            className={`hidden sm:inline-block text-xs font-mono px-3 py-1.5 rounded transition ${
              isLight ? 'text-slate-700 hover:text-slate-900 font-semibold' : 'text-slate-300 hover:text-white'
            }`}
          >
            Official Sign In
          </button>

          <button
            onClick={onEnterApp}
            className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm flex items-center space-x-1.5 transition transform hover:scale-105 active:scale-95"
          >
            <span>Open Platform</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Drawer Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg border ${
              isLight ? 'bg-slate-100 border-slate-300 text-slate-700' : 'bg-slate-900 border-slate-800 text-slate-300'
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-b px-6 py-4 space-y-3 font-mono text-xs animate-fade-in-down ${isLight ? 'bg-white border-slate-200 text-slate-800' : 'bg-[#0a0f1d] border-slate-800 text-slate-300'}`}>
          <button onClick={() => scrollTo('problem')} className="block w-full text-left py-1.5 hover:text-cyan-600">
            1. The Problem
          </button>
          <button onClick={() => scrollTo('product')} className="block w-full text-left py-1.5 hover:text-cyan-600">
            2. Platform Overview
          </button>
          <button onClick={() => scrollTo('evidence')} className="block w-full text-left py-1.5 hover:text-cyan-600">
            3. Evidence Chain Timeline
          </button>
          <button onClick={() => scrollTo('documents')} className="block w-full text-left py-1.5 hover:text-cyan-600">
            4. Document Management
          </button>
          <button onClick={() => scrollTo('security')} className="block w-full text-left py-1.5 hover:text-cyan-600">
            5. Security & Tamper Sandbox
          </button>
          <button onClick={() => scrollTo('investigation-tree')} className="block w-full text-left py-1.5 hover:text-cyan-600">
            6. Investigation Tree
          </button>
          <button onClick={() => scrollTo('dossier')} className="block w-full text-left py-1.5 hover:text-cyan-600">
            7. SIH Problem Statement Dossier
          </button>
          <div className={`pt-2 border-t flex justify-between items-center ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
            <button onClick={onEnterApp} className="text-cyan-600 dark:text-cyan-400 font-bold py-1">
              Sign In to Platform →
            </button>
            <button
              onClick={() => setTheme(isLight ? 'dark' : 'light')}
              className="text-xs font-mono font-semibold underline text-slate-600"
            >
              Switch to {isLight ? 'Dark' : 'White'}
            </button>
          </div>
        </div>
      )}

      {/* 2. HERO — PRODUCT FIRST (WITH ENTRANCE ANIMATIONS & MOUSE 3D TILT) */}
      <section id="hero" className="relative pt-14 pb-16 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          {/* Eyebrow with entrance animation */}
          <div className="animate-fade-in-down">
            <div className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border text-xs font-mono tracking-wider uppercase font-semibold shadow-xs ${isLight ? 'bg-cyan-50 border-cyan-200 text-cyan-800' : 'bg-cyan-950/60 border-cyan-500/30 text-cyan-300'}`}>
              <Shield className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>SECURE DIGITAL DOCUMENT & INVESTIGATION PLATFORM</span>
              <Sparkles className="w-3 h-3 text-amber-500 animate-pulse" />
            </div>
          </div>

          {/* H1 Headline with staggered entrance */}
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight animate-fade-in-up delay-150 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Secure Every Document. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-teal-600 to-blue-700 dark:from-cyan-400 dark:via-teal-300 dark:to-blue-400">
              Preserve Every Evidence Trail.
            </span>
          </h1>

          {/* Supporting text */}
          <p className={`text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-sans animate-fade-in-up delay-300 ${textMuted}`}>
            SecureVault brings sensitive investigative documents, evidence tracking, controlled access, and immutable auditability into one high-assurance platform.
          </p>

          {/* Actions with hover animation */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 animate-fade-in-up delay-400">
            <button
              onClick={onEnterApp}
              className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-md flex items-center space-x-2 transition transform hover:scale-105 active:scale-95"
            >
              <span>Explore Platform</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => scrollTo('security')}
              className={`px-6 py-3 border font-bold text-xs uppercase tracking-wider rounded-lg transition transform hover:scale-105 active:scale-95 flex items-center space-x-2 font-mono ${
                isLight
                  ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-xs'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700'
              }`}
            >
              <Server className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>Tamper Sandbox & Security</span>
            </button>
          </div>
        </div>

        {/* 3. FULLY DYNAMIC ENTERPRISE APP UI PREVIEW WITH 3D MOUSE PARALLAX TILT */}
        <div
          onMouseMove={handleHeroMouseMove}
          onMouseLeave={handleHeroMouseLeave}
          className="mt-12 max-w-5xl mx-auto animate-scale-up delay-500 relative transition-transform duration-300"
        >
          {/* Subtle Parallax Reflection Backdrop */}
          <div
            className="absolute -inset-1 rounded-2xl opacity-50 blur-xl pointer-events-none transition-opacity duration-300"
            style={{
              background: isLight
                ? `radial-gradient(circle at ${heroMousePos.x}px ${heroMousePos.y}px, rgba(6, 182, 212, 0.2), transparent 70%)`
                : `radial-gradient(circle at ${heroMousePos.x}px ${heroMousePos.y}px, rgba(34, 211, 238, 0.3), transparent 70%)`,
            }}
          />

          {/* Browser chrome with Interactive Mouse Light Sheen */}
          <div
            className={`rounded-t-xl border px-4 py-2.5 flex items-center gap-3 relative overflow-hidden ${
              isLight ? 'bg-slate-200 border-slate-300 border-b-0' : 'bg-[#0d1426] border-slate-700/60 border-b-0'
            }`}
          >
            {/* Dynamic mouse light reflection line */}
            <div
              className="absolute inset-0 pointer-events-none opacity-60"
              style={{
                background: isMouseOverHero
                  ? `radial-gradient(500px circle at ${heroMousePos.x}px ${heroMousePos.y}px, rgba(255,255,255,0.4), transparent 60%)`
                  : 'none',
              }}
            />

            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-400/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <div
              className={`flex-1 mx-2 border rounded-md px-3 py-1 text-[11px] font-mono text-left flex items-center justify-between ${
                isLight ? 'bg-white border-slate-300 text-slate-600' : 'bg-[#0a1020] border-slate-700/40 text-slate-400'
              }`}
            >
              <span>🔒 https://securevault.gov.in/app/cases/{selectedCaseId.toLowerCase()}</span>
              <span className="text-[10px] text-emerald-600 font-bold hidden sm:inline">256-BIT TLS ENCRYPTED</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">SECURE</span>
            </div>
          </div>

          {/* App window with 3D Mouse Movement Tilt */}
          <div
            className={`rounded-b-xl border shadow-2xl overflow-hidden flex flex-col ${
              isLight ? 'bg-slate-900 border-slate-300' : 'bg-[#0b1120] border-slate-700/60'
            }`}
            style={{
              minHeight: '520px',
              transform: `perspective(1200px) rotateX(${heroTilt.x}deg) rotateY(${heroTilt.y}deg)`,
              transition: isMouseOverHero
                ? 'transform 0.08s ease-out'
                : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: isLight
                ? `${-heroTilt.y * 3}px ${heroTilt.x * 3 + 12}px 32px rgba(15, 23, 42, 0.12)`
                : `${-heroTilt.y * 3}px ${heroTilt.x * 3 + 12}px 36px rgba(0, 0, 0, 0.65)`,
            }}
          >
            {/* Top bar */}
            <div className="h-11 bg-[#0d1528] border-b border-slate-700/50 flex items-center px-4 flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="font-bold text-[11px] tracking-widest text-white font-mono">
                    SECURE<span className="text-cyan-400">VAULT</span>
                  </span>
                </div>
                <span className="text-slate-600 text-xs">/</span>
                <span className="text-[11px] font-mono text-slate-400">{heroActiveSidebar}</span>
                <span className="text-slate-600 text-xs">/</span>
                <span className="text-[11px] font-mono text-cyan-300 font-bold">{selectedCaseId}</span>
              </div>

              <div className="ml-auto flex items-center gap-3">
                {/* Dynamic Real-time Case Search */}
                <div className="hidden sm:flex items-center gap-2 bg-[#0a1020] border border-slate-700/60 rounded-md px-2.5 py-1 text-[10px] font-mono text-slate-300 focus-within:border-cyan-500">
                  <Search className="w-3 h-3 text-slate-500" />
                  <input
                    type="text"
                    value={heroSearchQuery}
                    onChange={(e) => setHeroSearchQuery(e.target.value)}
                    placeholder="Search cases, lead..."
                    className="bg-transparent border-none outline-none text-white text-[10px] w-28 placeholder-slate-500"
                  />
                  {heroSearchQuery && (
                    <button onClick={() => setHeroSearchQuery('')} className="text-slate-500 hover:text-white">
                      ×
                    </button>
                  )}
                </div>

                <div className="relative">
                  <div className="w-7 h-7 rounded-md bg-[#0a1020] border border-slate-700/40 flex items-center justify-center text-slate-400">
                    <Activity className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-500 rounded-full text-[8px] text-white flex items-center justify-center font-bold">
                    3
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-[10px] font-bold text-white shadow-xs">
                    SK
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="text-[10px] font-mono text-white font-semibold">Sr. Inv. Sharma</div>
                    <div className="text-[9px] font-mono text-cyan-400">SV-INV-104 · TOP SECRET</div>
                  </div>
                </div>
              </div>
            </div>

            {/* App body */}
            <div className="flex flex-1 overflow-hidden">
              {/* Dynamic Sidebar with tab selection */}
              <div className="w-44 bg-[#0a1020] border-r border-slate-700/40 flex-shrink-0 flex-col py-3 hidden sm:flex">
                {[
                  {
                    label: 'Dashboard',
                    badge: null,
                    icon: (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <rect x="3" y="3" width="7" height="7" rx="1" />
                        <rect x="14" y="3" width="7" height="7" rx="1" />
                        <rect x="3" y="14" width="7" height="7" rx="1" />
                        <rect x="14" y="14" width="7" height="7" rx="1" />
                      </svg>
                    ),
                  },
                  {
                    label: 'Cases',
                    badge: `${casesList.length}`,
                    icon: (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h10" />
                      </svg>
                    ),
                  },
                  {
                    label: 'Documents',
                    badge: '128',
                    icon: (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    ),
                  },
                  {
                    label: 'Evidence',
                    badge: '24',
                    icon: (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    ),
                  },
                  {
                    label: 'Audit Log',
                    badge: 'LIVE',
                    icon: (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ),
                  },
                  {
                    label: 'Security',
                    badge: null,
                    icon: (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    ),
                  },
                ].map((item, i) => {
                  const isActive = heroActiveSidebar === item.label;
                  return (
                    <div
                      key={i}
                      onClick={() => setHeroActiveSidebar(item.label)}
                      className={`flex items-center gap-2.5 mx-2 px-2.5 py-2 rounded-md text-[11px] font-mono cursor-pointer mb-0.5 transition ${
                        isActive
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold'
                          : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
                      }`}
                    >
                      <span className={isActive ? 'text-cyan-400' : 'text-slate-500'}>{item.icon}</span>
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto text-[8px] bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 px-1 rounded font-bold">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  );
                })}

                <div className="mt-auto mx-2 p-2.5 rounded-md bg-cyan-950/40 border border-cyan-500/20 text-left">
                  <div className="text-[9px] font-mono text-slate-400 uppercase font-semibold">Clearance Level</div>
                  <div className="text-[10px] font-mono font-bold text-cyan-300 mt-0.5">RESTRICTED (403 BOLA)</div>
                  <div className="text-[8px] font-mono text-slate-500 mt-0.5">IDOR Barrier Active</div>
                </div>
              </div>

              {/* Main Table & Chart content */}
              <div className="flex-1 flex flex-col overflow-hidden bg-[#0c1222]">
                {/* Sub-header with Filter Pills and + New Case */}
                <div className="px-4 pt-3 pb-2 border-b border-slate-700/30 flex items-center justify-between flex-shrink-0">
                  <div className="text-left">
                    <div className="text-[11px] font-mono font-bold text-white flex items-center space-x-2">
                      <span>Case Dockets Overview</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-900/60 text-cyan-300 border border-cyan-700/50">
                        {filteredHeroCases.length} loaded
                      </span>
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">
                      Click any row to inspect deep forensic integrity trail
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Filter Pills */}
                    <div className="hidden sm:flex items-center space-x-1 bg-[#090f1d] p-0.5 rounded border border-slate-700/50 font-mono text-[9px]">
                      {['ALL', 'ACTIVE', 'REVIEW', 'COURT'].map((st) => (
                        <button
                          key={st}
                          onClick={() => setHeroFilterStatus(st)}
                          className={`px-2 py-0.5 rounded transition ${
                            heroFilterStatus === st
                              ? 'bg-cyan-600 text-white font-bold'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setShowNewCaseModal(true)}
                      className="text-[10px] font-mono px-2.5 py-1 rounded bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 font-bold transition flex items-center space-x-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>New Case</span>
                    </button>
                  </div>
                </div>

                <div className="flex flex-1 overflow-hidden">
                  <div className="flex-1 overflow-auto">
                    {/* Interactive 7-Day Sparkline with Hover Tooltip */}
                    <div className="px-4 pt-2.5 pb-2 border-b border-slate-700/20 bg-[#0a1020]/60 relative">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">
                            Evidence Intake & Ingest Activity (7-Day Velocity)
                          </span>
                          {hoveredChartIndex !== null && (
                            <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950 px-1.5 py-0.2 rounded border border-cyan-700">
                              {chartPoints[hoveredChartIndex][2]}: {chartPoints[hoveredChartIndex][3]} exhibits ingested
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] font-mono text-emerald-400 font-bold">
                          ↑ 14.8% intake rate
                        </span>
                      </div>

                      <svg viewBox="0 0 340 48" className="w-full h-11" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="heroChartGradDynamic" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <line x1="0" y1="16" x2="340" y2="16" stroke="#1e293b" strokeWidth="0.5" />
                        <line x1="0" y1="32" x2="340" y2="32" stroke="#1e293b" strokeWidth="0.5" />
                        <path d="M0,38 L48,28 L96,34 L144,18 L192,22 L240,10 L288,14 L340,8 L340,48 L0,48 Z" fill="url(#heroChartGradDynamic)" />
                        <path
                          d="M0,38 L48,28 L96,34 L144,18 L192,22 L240,10 L288,14 L340,8"
                          fill="none"
                          stroke="#22d3ee"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {chartPoints.map(([x, y, day, count], i) => (
                          <g
                            key={i}
                            className="cursor-pointer"
                            onMouseEnter={() => setHoveredChartIndex(i)}
                            onMouseLeave={() => setHoveredChartIndex(null)}
                          >
                            <circle
                              cx={x}
                              cy={y}
                              r={hoveredChartIndex === i ? 4 : 2.5}
                              fill={hoveredChartIndex === i ? '#ffffff' : '#22d3ee'}
                              className="transition-all"
                            />
                            <text
                              x={x}
                              y="46"
                              textAnchor="middle"
                              fontSize="6"
                              fill={hoveredChartIndex === i ? '#38bdf8' : '#64748b'}
                              fontFamily="monospace"
                            >
                              {day}
                            </text>
                          </g>
                        ))}
                      </svg>
                    </div>

                    {/* Interactive Cases data table */}
                    <table className="w-full text-left font-mono" style={{ fontSize: '10px' }}>
                      <thead>
                        <tr className="bg-[#090f1e] text-slate-400 border-b border-slate-700/40" style={{ fontSize: '9px' }}>
                          <th className="py-2 px-4 font-bold uppercase tracking-wide">Case Docket ID</th>
                          <th className="py-2 px-3 font-bold uppercase tracking-wide">Investigation Title</th>
                          <th className="py-2 px-3 font-bold uppercase tracking-wide hidden md:table-cell">Lead Officer</th>
                          <th className="py-2 px-3 font-bold uppercase tracking-wide">Docs/Ev</th>
                          <th className="py-2 px-3 font-bold uppercase tracking-wide hidden sm:table-cell">Last Action</th>
                          <th className="py-2 px-3 font-bold uppercase tracking-wide">Custody</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/50">
                        {filteredHeroCases.map((c) => {
                          const isSelected = selectedCaseId === c.id;
                          return (
                            <tr
                              key={c.id}
                              onClick={() => setSelectedCaseId(c.id)}
                              className={`cursor-pointer transition-colors ${
                                isSelected
                                  ? 'bg-cyan-950/40 border-l-2 border-l-cyan-400 text-white'
                                  : 'hover:bg-slate-800/40 text-slate-300'
                              }`}
                            >
                              <td className="py-2.5 px-4 font-bold text-cyan-400 whitespace-nowrap flex items-center space-x-1.5">
                                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                                <span>{c.id}</span>
                              </td>
                              <td className="py-2.5 px-3 max-w-[150px]">
                                <span className="block truncate font-medium text-slate-200">{c.title}</span>
                              </td>
                              <td className="py-2.5 px-3 text-slate-400 hidden md:table-cell whitespace-nowrap">
                                {c.lead}
                              </td>
                              <td className="py-2.5 px-3 text-slate-300">
                                {c.docs} <span className="text-slate-500">/ {c.ev}ev</span>
                              </td>
                              <td className="py-2.5 px-3 text-slate-400 hidden sm:table-cell whitespace-nowrap">
                                {c.last}
                              </td>
                              <td className="py-2.5 px-3">
                                <span
                                  className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ${
                                    c.status === 'ACTIVE'
                                      ? 'text-emerald-400 bg-emerald-950/60 border-emerald-700/50'
                                      : c.status === 'REVIEW'
                                      ? 'text-amber-400 bg-amber-950/60 border-amber-700/50'
                                      : c.status === 'PENDING'
                                      ? 'text-sky-400 bg-sky-950/60 border-sky-700/50'
                                      : 'text-violet-400 bg-violet-950/60 border-violet-700/50'
                                  }`}
                                >
                                  {c.status}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Right panel: Dynamic Case Inspector */}
                  <div className="w-52 border-l border-slate-700/40 bg-[#090f1e] flex-shrink-0 hidden lg:flex flex-col overflow-auto text-left">
                    <div className="px-3 py-2.5 border-b border-slate-700/30">
                      <div className="text-[9px] font-mono text-slate-400 uppercase font-bold">
                        Case Inspector (Dynamic)
                      </div>
                      <div className="text-[11px] font-mono text-cyan-300 font-bold mt-0.5 flex items-center justify-between">
                        <span>{activeHeroCase.id}</span>
                        <span className="text-[9px] text-emerald-400 font-normal">● Online</span>
                      </div>
                      <div className="text-[9px] text-slate-400 truncate mt-0.5">{activeHeroCase.title}</div>
                    </div>

                    <div className="px-3 py-2 space-y-2 flex-1">
                      <div className="grid grid-cols-2 gap-1.5">
                        <div className="p-2 rounded bg-[#0d1528] border border-slate-700/40">
                          <div className="text-[8px] font-mono text-slate-400 uppercase">Documents</div>
                          <div className="text-xs font-bold font-mono text-white mt-0.5">{activeHeroCase.docs}</div>
                          <div className="text-[8px] font-mono text-emerald-400">All Hash Verified</div>
                        </div>
                        <div className="p-2 rounded bg-[#0d1528] border border-slate-700/40">
                          <div className="text-[8px] font-mono text-slate-400 uppercase">Evidence</div>
                          <div className="text-xs font-bold font-mono text-cyan-400 mt-0.5">{activeHeroCase.ev}</div>
                          <div className="text-[8px] font-mono text-slate-400">8-Stage Sealed</div>
                        </div>
                      </div>

                      <div className="p-2 rounded bg-[#0d1528] border border-slate-700/40">
                        <div className="text-[8px] font-mono text-slate-400 uppercase">Designated Lead</div>
                        <div className="text-[10px] font-mono font-bold text-slate-200 mt-0.5">{activeHeroCase.lead}</div>
                        <div className="text-[8px] font-mono text-cyan-400">{activeHeroCase.dept}</div>
                      </div>

                      <div className="p-2 rounded bg-emerald-950/40 border border-emerald-700/40 text-center">
                        <div className="text-[8px] font-mono text-slate-400 uppercase mb-0.5">Hash Ledger Seal</div>
                        <div className="text-[10px] font-mono text-emerald-400 font-bold flex items-center justify-center space-x-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>UNBROKEN CHAIN</span>
                        </div>
                        <div className="text-[8px] font-mono text-slate-500 mt-0.5">Genesis ($0^{64}$) → Block #{blockHeight}</div>
                      </div>

                      <div>
                        <div className="text-[9px] font-mono text-slate-400 uppercase mb-1 font-bold">
                          Custody Progression
                        </div>
                        <div className="space-y-1">
                          {['Collected', 'Uploaded', 'Verified', 'Assigned', 'Examined', 'Submitted'].map((st, i) => {
                            const isDone = i < activeHeroCase.custodyStage;
                            const isCurrent = i === activeHeroCase.custodyStage;
                            return (
                              <div key={i} className="flex items-center gap-1.5">
                                <div
                                  className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                                    isDone ? 'bg-emerald-400' : isCurrent ? 'bg-cyan-400 ring-2 ring-cyan-500/30' : 'bg-slate-700'
                                  }`}
                                />
                                <div
                                  className={`text-[9px] font-mono ${
                                    isDone ? 'text-slate-400' : isCurrent ? 'text-cyan-300 font-bold' : 'text-slate-600'
                                  }`}
                                >
                                  {st}
                                </div>
                                {isDone && <div className="ml-auto text-[8px] font-mono text-emerald-500">✓</div>}
                                {isCurrent && <div className="ml-auto text-[8px] font-mono text-cyan-400">active</div>}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="px-3 py-2.5 border-t border-slate-700/30">
                      <button
                        onClick={onEnterApp}
                        className="w-full text-center text-[10px] font-mono font-bold text-cyan-300 hover:text-white bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 rounded py-1.5 cursor-pointer transition"
                      >
                        Launch Full Case Dossier →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Case Registration Modal within hero mockup */}
          {showNewCaseModal && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className={`p-6 rounded-xl border max-w-md w-full font-mono text-xs shadow-2xl text-left animate-scale-up ${cardBg}`}>
                <div className="flex items-center justify-between border-b pb-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <Plus className="w-4 h-4 text-cyan-500" />
                    <span className="font-bold text-sm">Create New Investigative Docket</span>
                  </div>
                  <button onClick={() => setShowNewCaseModal(false)} className="text-slate-500 hover:text-slate-800">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <form onSubmit={handleCreateNewCase} className="space-y-4">
                  <div>
                    <label className={`block text-[10px] uppercase font-bold mb-1 ${textSubtle}`}>Case Title / Allegation</label>
                    <input
                      type="text"
                      required
                      value={newCaseTitleInput}
                      onChange={(e) => setNewCaseTitleInput(e.target.value)}
                      placeholder="e.g., Cross-Border Hawala Transaction Audit"
                      className={`w-full p-2.5 rounded border text-xs outline-none focus:border-cyan-500 ${
                        isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-[10px] uppercase font-bold mb-1 ${textSubtle}`}>Lead Investigator</label>
                    <input
                      type="text"
                      disabled
                      value="Senior Investigator Sharma (SV-INV-104)"
                      className={`w-full p-2.5 rounded border text-xs opacity-80 cursor-not-allowed ${
                        isLight ? 'bg-slate-100 border-slate-200 text-slate-700' : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    />
                  </div>

                  <div className="pt-2 flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setShowNewCaseModal(false)}
                      className="px-3 py-2 rounded border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-bold"
                    >
                      Register Case Docket
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. THE PROBLEM SECTION — AUTHENTIC INVESTIGATION ACCOUNTABILITY */}
      <section id="problem" className={`py-20 px-6 md:px-12 max-w-6xl mx-auto ${sectionBorder}`}>
        <div className="max-w-3xl mb-12 text-left">
          <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase font-bold tracking-wider">
            Operational Dilemma
          </div>
          <h2 className={`text-2xl sm:text-3xl font-extrabold mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Investigations generate more than documents. They generate accountability.
          </h2>
          <p className={`text-sm mt-2 font-sans leading-relaxed ${textMuted}`}>
            A case file does not simply sit in storage. It is collected at crime scenes, transferred between precincts, examined by specialists, submitted to prosecutors, and tested under judicial scrutiny.
          </p>
        </div>

        {/* Visual Lifecycle Workflow */}
        <div className={`p-6 rounded-xl border mb-8 font-mono text-xs interactive-card ${cardBg}`}>
          <div className={`uppercase font-bold mb-4 text-[11px] text-left ${textSubtle}`}>
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
              <div key={idx} className={`p-2.5 rounded border transition-all duration-200 hover:scale-105 ${subtleBoxBg}`}>
                <span className="text-cyan-600 dark:text-cyan-400 text-[10px] block font-bold">0{idx + 1}</span>
                <span className={`font-semibold text-xs mt-1 block ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 5 Critical Vulnerabilities vs SecureVault Answers */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-left">
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
            <div key={idx} className={`p-4 rounded-lg border space-y-2 flex flex-col justify-between interactive-card ${cardBg}`}>
              <div className="space-y-1.5">
                <div className="text-rose-600 dark:text-rose-400 font-mono text-xs font-bold flex items-center space-x-1">
                  <span>?</span>
                  <span>{item.q}</span>
                </div>
                <p className={`text-xs font-sans leading-relaxed ${textMuted}`}>{item.issue}</p>
              </div>

              <div className={`pt-2 border-t ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
                <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 block font-bold">
                  SecureVault Resolution:
                </span>
                <p className={`text-xs font-sans mt-0.5 font-medium ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PRODUCT SOLUTION — CONTROLLED TRAIL */}
      <section id="product" className={`py-20 px-6 md:px-12 max-w-6xl mx-auto ${sectionBorder}`}>
        <div className="max-w-3xl mb-12 text-left">
          <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase font-bold tracking-wider">
            Architecture of Trust
          </div>
          <h2 className={`text-2xl sm:text-3xl font-extrabold mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            One controlled trail from document to evidence.
          </h2>
          <p className={`text-sm mt-2 font-sans leading-relaxed ${textMuted}`}>
            SecureVault establishes an unbroken chain where legal documents, physical exhibits, and custody transfers are unified into a verifiable cryptographic ecosystem.
          </p>
        </div>

        {/* Structured Visual Workflow Diagram */}
        <div className={`p-6 md:p-8 rounded-xl border space-y-6 interactive-card ${cardBg}`}>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 text-center font-mono text-xs">
            {[
              { node: 'CASE', desc: 'Central case docket & investigator clearance' },
              { node: 'DOCUMENTS', desc: 'FIR, statements, and forensic reports' },
              { node: 'EVIDENCE', desc: 'Physical & digital seizure exhibits' },
              { node: 'VERIFICATION', desc: 'SHA-256 fingerprint & GCM tags' },
              { node: 'AUDIT', desc: 'Genesis-anchored chained ledger' },
              { node: 'COURT / ARCHIVE', desc: 'Sec 65B/63 BSA certified filing' },
            ].map((step, idx) => (
              <div key={idx} className={`p-3 rounded-lg border space-y-1 shadow-xs transition-transform duration-200 hover:-translate-y-1 ${subtleBoxBg}`}>
                <span className="text-cyan-600 dark:text-cyan-400 font-bold text-xs block">{step.node}</span>
                <p className={`text-[10px] font-sans ${textMuted}`}>{step.desc}</p>
              </div>
            ))}
          </div>

          <div className={`p-4 rounded-lg border text-xs font-mono space-y-1 text-left ${isLight ? 'bg-cyan-50/60 border-cyan-200 text-slate-800' : 'bg-slate-950 border-slate-800/80 text-slate-400'}`}>
            <span className={`font-bold block ${isLight ? 'text-cyan-900' : 'text-slate-300'}`}>
              Engineered Operational Guarantee:
            </span>
            <p className="font-sans leading-relaxed">
              Every document uploaded is encrypted with a unique per-file subkey derived via HKDF. Any modification to a document produces a mismatched digest on download. Any attempt to modify an audit log breaks the SHA-256 chain from the Genesis state ($0^{64}$), exposing the anomaly immediately.
            </p>
          </div>
        </div>
      </section>

      {/* 6. EVIDENCE CHAIN OF CUSTODY UI (SIGNATURE TIMELINE) */}
      <section id="evidence" className={`py-20 px-6 md:px-12 max-w-6xl mx-auto ${sectionBorder}`}>
        <div className="max-w-3xl mb-10 text-left">
          <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase font-bold tracking-wider">
            Signature Evidence Protocol
          </div>
          <h2 className={`text-2xl sm:text-3xl font-extrabold mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Evidence Chain of Custody Timeline
          </h2>
          <p className={`text-sm mt-2 font-sans leading-relaxed ${textMuted}`}>
            Real investigators require concrete tracking. Click any stage to inspect the acting officer, facility location, timestamp, and cryptographic proof.
          </p>
        </div>

        {/* 8-Stage Timeline Button Strip with Auto-Play */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
          <span className={`text-xs font-mono font-bold ${textSubtle}`}>
            Select Custody Checkpoint (Stage {activeTimelineStage + 1} of 8):
          </span>
          <button
            onClick={() => setIsAutoPlayingTimeline(!isAutoPlayingTimeline)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-bold flex items-center justify-center space-x-1.5 transition hover:scale-105 active:scale-95 ${
              isAutoPlayingTimeline
                ? 'bg-amber-100 border-amber-300 text-amber-900 dark:bg-amber-950 dark:text-amber-300 animate-pulse'
                : 'bg-cyan-50 hover:bg-cyan-100 border-cyan-200 text-cyan-800 dark:bg-slate-900 dark:text-cyan-300'
            }`}
          >
            {isAutoPlayingTimeline ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isAutoPlayingTimeline ? 'Pause Simulation' : 'Auto-Play Custody Replay'}</span>
          </button>
        </div>

        <div className={`grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 p-2 border rounded-xl mb-6 font-mono text-xs ${cardBg}`}>
          {timelineEvents.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveTimelineStage(idx);
                setIsAutoPlayingTimeline(false);
              }}
              className={`p-2.5 rounded-lg text-left transition transform hover:scale-102 flex flex-col justify-between ${
                activeTimelineStage === idx
                  ? 'bg-cyan-600 text-white font-bold shadow-md'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <span className="text-[10px] block opacity-80">{item.time}</span>
              <span className="text-xs font-bold block mt-0.5 truncate">{item.stage}</span>
            </button>
          ))}
        </div>

        {/* Timeline Inspector Card */}
        {timelineEvents[activeTimelineStage] && (
          <div className={`p-6 rounded-xl border space-y-6 text-left interactive-card ${cardBg}`}>
            <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
              <div className="space-y-1">
                <div className="flex items-center space-x-2 font-mono text-xs">
                  <span className={`px-2 py-0.5 rounded border font-bold ${isLight ? 'bg-cyan-50 text-cyan-800 border-cyan-200' : 'bg-cyan-950 text-cyan-400 border-cyan-800'}`}>
                    STAGE {activeTimelineStage + 1} OF 8: {timelineEvents[activeTimelineStage].stage}
                  </span>
                  <span className={`px-2 py-0.5 rounded border font-bold ${isLight ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-emerald-950 text-emerald-400 border-emerald-800'}`}>
                    {timelineEvents[activeTimelineStage].status}
                  </span>
                </div>
                <h3 className={`text-lg font-bold mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {timelineEvents[activeTimelineStage].title}
                </h3>
              </div>

              <div className="text-right font-mono text-xs">
                <span className={`block text-[10px] ${textSubtle}`}>RECORDED UTC TIMESTAMP</span>
                <span className="text-cyan-600 dark:text-cyan-400 font-bold text-sm">
                  {timelineEvents[activeTimelineStage].time} HRS
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              <div className={`p-3.5 rounded-lg border space-y-1 ${subtleBoxBg}`}>
                <span className={`block uppercase text-[10px] font-bold ${textSubtle}`}>Acting Custodian</span>
                <p className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {timelineEvents[activeTimelineStage].officer}
                </p>
                <span className={`text-[11px] ${textMuted}`}>
                  Badge: {timelineEvents[activeTimelineStage].badge} • {timelineEvents[activeTimelineStage].dept}
                </span>
              </div>

              <div className={`p-3.5 rounded-lg border space-y-1 ${subtleBoxBg}`}>
                <span className={`block uppercase text-[10px] font-bold ${textSubtle}`}>Facility Location</span>
                <p className="text-cyan-600 dark:text-cyan-300 font-bold">
                  {timelineEvents[activeTimelineStage].location}
                </p>
                <span className={`text-[11px] ${textMuted}`}>Physical transfer logged & verified</span>
              </div>
            </div>

            {/* Cryptographic Proof Metadata with Copy Digest button */}
            <div className={`p-3.5 rounded-lg border space-y-2 font-mono text-xs ${subtleBoxBg}`}>
              <div className="flex items-center justify-between">
                <span className={`text-[10px] uppercase font-bold tracking-wider ${textSubtle}`}>
                  Cryptographic Evidence Integrity Seal
                </span>
                <button
                  onClick={() => handleCopyDigest(timelineEvents[activeTimelineStage].hash)}
                  className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 hover:underline flex items-center space-x-1"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedDigest ? 'Copied Hash!' : 'Copy SHA-256 Digest'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className={textSubtle}>SHA-256 Digest:</span>
                  <code className="text-cyan-600 dark:text-cyan-400 block truncate mt-0.5 font-bold">
                    {timelineEvents[activeTimelineStage].hash}
                  </code>
                </div>
                <div>
                  <span className={textSubtle}>Digital Signature:</span>
                  <code className="text-emerald-600 dark:text-emerald-400 block truncate mt-0.5 font-bold">
                    {timelineEvents[activeTimelineStage].signature}
                  </code>
                </div>
              </div>
            </div>

            <div className={`text-xs font-sans leading-relaxed p-3.5 rounded-lg border ${isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-slate-900/40 border-slate-800 text-slate-300'}`}>
              <strong className={`block font-mono text-[11px] mb-0.5 ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>
                Procedural Justification:
              </strong>
              {timelineEvents[activeTimelineStage].details}
            </div>
          </div>
        )}
      </section>

      {/* 7. AUTHENTIC DOCUMENT MANAGEMENT INTERFACE */}
      <section id="documents" className={`py-20 px-6 md:px-12 max-w-6xl mx-auto ${sectionBorder}`}>
        <div className="max-w-3xl mb-10 text-left">
          <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase font-bold tracking-wider">
            Operational Records
          </div>
          <h2 className={`text-2xl sm:text-3xl font-extrabold mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Authentic Legal Document Workspace
          </h2>
          <p className={`text-sm mt-2 font-sans leading-relaxed ${textMuted}`}>
            Not a generic cloud file browser. SecureVault maintains structured legal records with cryptographic hashes, version controls, and case clearance gates.
          </p>
        </div>

        {/* Dynamic Filters Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4 font-mono text-xs">
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
            {['ALL', 'FIR', 'Witness', 'Forensic', 'Charge Sheet', 'Court Filing'].map((cat) => (
              <button
                key={cat}
                onClick={() => setDocCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-md border text-[11px] transition whitespace-nowrap hover:scale-105 active:scale-95 transform ${
                  docCategoryFilter === cat
                    ? 'bg-cyan-600 text-white font-bold border-cyan-600 shadow-xs'
                    : isLight
                    ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-md border transition-all ${isLight ? 'bg-white border-slate-300 text-slate-800 focus-within:border-cyan-500' : 'bg-slate-900 border-slate-800 text-white focus-within:border-cyan-400'}`}>
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={docSearchQuery}
              onChange={(e) => setDocSearchQuery(e.target.value)}
              placeholder="Filter by name, custodian..."
              className="bg-transparent border-none outline-none text-xs w-44 placeholder-slate-400"
            />
            {docSearchQuery && (
              <button onClick={() => setDocSearchQuery('')} className="text-slate-400 hover:text-slate-600">
                ×
              </button>
            )}
          </div>
        </div>

        {/* Operational Document Table */}
        <div className={`rounded-xl border overflow-hidden shadow-xs interactive-card ${cardBg}`}>
          <div className="overflow-x-auto text-left">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className={`uppercase text-[10px] border-b ${isLight ? 'bg-slate-100 text-slate-600 border-slate-200' : 'bg-slate-950 text-slate-400 border-slate-800'}`}>
                  <th className="py-3 px-4 font-bold">Document Name</th>
                  <th className="py-3 px-4 font-bold">Classification</th>
                  <th className="py-3 px-4 font-bold">Case ID</th>
                  <th className="py-3 px-4 font-bold">Ver</th>
                  <th className="py-3 px-4 font-bold">Custodian</th>
                  <th className="py-3 px-4 font-bold">Last Accessed</th>
                  <th className="py-3 px-4 font-bold">Integrity</th>
                  <th className="py-3 px-4 font-bold">Access Gate</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isLight ? 'divide-slate-200' : 'divide-slate-800/60'}`}>
                {filteredDocuments.map((doc, idx) => {
                  const isSelected = selectedDocIndex === idx;
                  return (
                    <tr
                      key={idx}
                      onClick={() => setSelectedDocIndex(idx)}
                      className={`cursor-pointer transition duration-150 ${
                        isSelected
                          ? isLight
                            ? 'bg-cyan-50/80 text-slate-900 font-semibold'
                            : 'bg-cyan-950/40 text-white'
                          : isLight
                          ? 'hover:bg-slate-50 text-slate-700'
                          : 'hover:bg-slate-900/60 text-slate-300'
                      }`}
                    >
                      <td className="py-3 px-4 font-bold flex items-center space-x-2">
                        <FileText className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
                        <span className="truncate max-w-[180px]">{doc.name}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded border text-[10px] ${isLight ? 'bg-slate-100 border-slate-200 text-slate-700' : 'bg-slate-900 border-slate-800 text-slate-300'}`}>
                          {doc.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-cyan-600 dark:text-cyan-400 font-semibold">{doc.caseId}</td>
                      <td className="py-3 px-4 text-slate-500">{doc.version}</td>
                      <td className="py-3 px-4 truncate max-w-[120px]">{doc.owner}</td>
                      <td className="py-3 px-4 text-slate-500">{doc.lastAccessed}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded border text-[10px] font-bold ${isLight ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-emerald-950 border-emerald-800 text-emerald-400'}`}>
                          {doc.integrity}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-500">{doc.access}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Selected Document Details Drawer with Live Verify Simulation */}
          {filteredDocuments[selectedDocIndex] && (
            <div className={`p-4 border-t flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs font-mono text-left ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/90 border-slate-800'}`}>
              <div className="space-y-1">
                <div className="flex items-center space-x-2 flex-wrap">
                  <span className={`uppercase text-[10px] font-bold ${textSubtle}`}>Inspecting Record:</span>
                  <span className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {filteredDocuments[selectedDocIndex].name}
                  </span>
                  <span className="text-slate-400">|</span>
                  <span className="text-slate-500">{filteredDocuments[selectedDocIndex].size}</span>
                  {verifiedDocSuccess && (
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-100 px-2 py-0.5 rounded animate-scale-up">
                      ✓ Digest Verified Clean
                    </span>
                  )}
                </div>
                <p className={`font-sans text-xs max-w-3xl leading-relaxed ${textMuted}`}>
                  {filteredDocuments[selectedDocIndex].summary}
                </p>
                <div className={`text-[10px] truncate ${textSubtle}`}>
                  SHA-256 Digest: <code className="text-cyan-600 dark:text-cyan-400 font-bold">{filteredDocuments[selectedDocIndex].hash}</code>
                </div>
              </div>

              <div className="flex items-center space-x-2 flex-shrink-0 self-start md:self-auto">
                <button
                  onClick={() => handleVerifyDocument(selectedDocIndex)}
                  disabled={verifyingDocIndex === selectedDocIndex}
                  className={`px-3 py-2 border rounded text-xs transition flex items-center space-x-1 hover:scale-105 active:scale-95 transform ${
                    isLight
                      ? 'bg-white border-slate-300 hover:border-cyan-500 text-slate-800'
                      : 'bg-slate-900 border-slate-700 hover:border-cyan-400 text-white'
                  }`}
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${verifyingDocIndex === selectedDocIndex ? 'animate-spin text-cyan-600' : ''}`} />
                  <span>{verifyingDocIndex === selectedDocIndex ? 'Scanning Digest...' : 'Verify Hash'}</span>
                </button>

                <button
                  onClick={onEnterApp}
                  className="px-3.5 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 text-white rounded text-xs transition flex items-center space-x-1 font-bold hover:scale-105 active:scale-95 transform"
                >
                  <span>Open Full Record</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 8. SECURITY ARCHITECTURE & INTERACTIVE TAMPER SANDBOX */}
      <section id="security" className={`py-20 px-6 md:px-12 max-w-6xl mx-auto ${sectionBorder}`}>
        <div className="max-w-3xl mb-10 text-left">
          <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase font-bold tracking-wider">
            Technical Controls & Interactive Sandbox
          </div>
          <h2 className={`text-2xl sm:text-3xl font-extrabold mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Implemented Security Architecture
          </h2>
          <p className={`text-sm mt-2 font-sans leading-relaxed ${textMuted}`}>
            Real cryptographic engineering. Test how SecureVault instantly detects bit alterations, preventing forged documents from being presented in court.
          </p>
        </div>

        {/* Dynamic Interactive Tamper Simulation Box */}
        <div className={`p-6 rounded-xl border mb-6 text-left shadow-sm interactive-card ${cardBg}`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 mb-4">
            <div>
              <div className="flex items-center space-x-2 font-mono text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-cyan-500" />
                <span className={isLight ? 'text-slate-900' : 'text-white'}>
                  INTERACTIVE LAB: Cryptographic Tamper Detection Test
                </span>
              </div>
              <p className={`text-xs mt-1 ${textMuted}`}>
                Simulate what happens when an internal bad actor tries modifying a single byte in an FIR or seizure log.
              </p>
            </div>

            <div className="flex items-center space-x-2 font-mono text-xs">
              <button
                onClick={() => handleToggleTamper(true)}
                disabled={tamperLoading || isTampered}
                className={`px-3 py-1.5 rounded-lg border font-bold flex items-center space-x-1 transition hover:scale-105 active:scale-95 transform ${
                  isTampered
                    ? 'bg-rose-600 text-white border-rose-600 cursor-not-allowed'
                    : 'bg-rose-50 hover:bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-300'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Simulate Bit Tamper (Modify 1 Byte)</span>
              </button>

              <button
                onClick={() => handleToggleTamper(false)}
                disabled={tamperLoading || !isTampered}
                className={`px-3 py-1.5 rounded-lg border font-bold flex items-center space-x-1 transition hover:scale-105 active:scale-95 transform ${
                  !isTampered
                    ? 'bg-emerald-600 text-white border-emerald-600 cursor-not-allowed'
                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
                }`}
              >
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Restore Authentic File</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div className={`p-4 rounded-lg border space-y-2 ${subtleBoxBg}`}>
              <div className="flex items-center justify-between">
                <span className={`text-[10px] uppercase font-bold ${textSubtle}`}>Inspected Evidence Exhibit</span>
                <span className="text-[10px] text-cyan-600 font-bold">FIR_2026_0142.pdf</span>
              </div>
              <div>
                <span className={textSubtle}>Runtime SHA-256 Digest:</span>
                <code
                  className={`block truncate mt-0.5 font-bold transition-all ${
                    isTampered ? 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 p-1 rounded animate-pulse' : 'text-cyan-600 dark:text-cyan-400'
                  }`}
                >
                  {isTampered
                    ? 'd94b17a102bf99c3018e47b2c99a21e4991c499b934ca495991b7852b999'
                    : 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'}
                </code>
              </div>
              <div>
                <span className={textSubtle}>Genesis Hash Ledger Seal:</span>
                <span className={`block font-bold ${isTampered ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {isTampered ? '❌ CHAIN SEVERED AT BLOCK #142' : '✓ CONTINUOUS HASH CHAIN TO GENESIS'}
                </span>
              </div>
            </div>

            <div className={`p-4 rounded-lg border space-y-2 ${subtleBoxBg}`}>
              <div className="flex items-center justify-between">
                <span className={`text-[10px] uppercase font-bold ${textSubtle}`}>Admissibility Gate Evaluation</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isTampered ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'}`}>
                  {isTampered ? '403 FORBIDDEN' : '200 OK ADMISSIBLE'}
                </span>
              </div>
              <p className={`text-xs font-sans leading-relaxed ${textMuted}`}>
                {isTampered
                  ? '🚨 INTEGRITY VIOLATION DETECTED: The downloaded byte sequence yields a digest mismatch against the immutable ledger. Section 65B/63 BSA digital admissibility rejected.'
                  : '✅ UNBROKEN RECORD: The computed bitstream hash matches the cryptographic seal generated at initial seizure. Certified for courtroom presentation.'}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {/* Fragment 1: Cross-Case Authorization Barrier */}
          <div className={`p-6 rounded-xl border space-y-4 interactive-card ${cardBg}`}>
            <div className={`flex items-center justify-between border-b pb-3 font-mono text-xs ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
              <span className={`font-bold flex items-center space-x-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                <Key className="w-4 h-4 text-amber-500" />
                <span>RBAC & Case-Level Authorization Gate</span>
              </span>
              <span className={`px-2 py-0.5 rounded border text-[10px] ${isLight ? 'bg-slate-100 border-slate-300 text-slate-700' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
                Enforced at API Gateway
              </span>
            </div>

            <p className={`text-xs font-sans leading-relaxed ${textMuted}`}>
              Investigators can only access cases explicitly assigned to them. Cross-case enumeration or IDOR attempts are rejected with an immediate 403 Forbidden.
            </p>

            <div className="space-y-2 font-mono text-xs">
              <div className={`p-3 rounded border flex items-center justify-between ${subtleBoxBg}`}>
                <div>
                  <span className={`font-bold block ${isLight ? 'text-slate-900' : 'text-white'}`}>Senior Inv Sharma</span>
                  <span className={`text-[10px] ${textSubtle}`}>Assigned Lead on CASE-2026-0142</span>
                </div>
                <span className={`px-2 py-1 rounded border text-[11px] font-bold ${isLight ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-emerald-950 text-emerald-400 border-emerald-800'}`}>
                  200 OK (AUTHORIZED)
                </span>
              </div>

              <div className={`p-3 rounded border flex items-center justify-between ${subtleBoxBg}`}>
                <div>
                  <span className={`font-bold block ${isLight ? 'text-slate-900' : 'text-white'}`}>Detective Marcus Vance</span>
                  <span className={`text-[10px] ${textSubtle}`}>Assigned on Case 138 • Unassigned on 142</span>
                </div>
                <span className={`px-2 py-1 rounded border text-[11px] font-bold ${isLight ? 'bg-rose-50 text-rose-800 border-rose-200' : 'bg-rose-950 text-rose-400 border-rose-800'}`}>
                  403 FORBIDDEN (BLOCKED)
                </span>
              </div>
            </div>
          </div>

          {/* Fragment 2: Genesis Hash-Chained Audit Ledger */}
          <div className={`p-6 rounded-xl border space-y-4 interactive-card ${cardBg}`}>
            <div className={`flex items-center justify-between border-b pb-3 font-mono text-xs ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
              <span className={`font-bold flex items-center space-x-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                <History className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>Genesis-Anchored Hash Chain Ledger</span>
              </span>
              <span className={`px-2 py-0.5 rounded border text-[10px] font-bold ${isLight ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-emerald-950 text-emerald-400 border-emerald-800'}`}>
                UNBROKEN CHAIN
              </span>
            </div>

            <p className={`text-xs font-sans leading-relaxed ${textMuted}`}>
              Every audit entry cryptographically seals the previous event hash back to the Genesis block ($0^{64}$). Any retroactive alteration in the database breaks the mathematical chain.
            </p>

            <div className={`p-3 rounded border font-mono text-xs space-y-2 ${subtleBoxBg}`}>
              <div className={`flex items-center justify-between text-[10px] ${textSubtle}`}>
                <span>Genesis Block (Root Anchor)</span>
                <code>00000000000000000000000000000000...</code>
              </div>
              <div className="text-center text-slate-400 text-xs">↓ SHA-256 Chained Hash</div>
              <div className={`flex items-center justify-between text-[11px] ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>
                <span>Block #142 (Evidence Ingest)</span>
                <code className="text-cyan-600 dark:text-cyan-400 font-bold">7d8a21f58b901a24328d...</code>
              </div>
              <div className="text-center text-slate-400 text-xs">↓ SHA-256 Chained Hash</div>
              <div className={`flex items-center justify-between text-[11px] ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>
                <span>Block #143 (Custody Transfer)</span>
                <code className="text-emerald-600 dark:text-emerald-400 font-bold">a04c9225d31a4abfa405...</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. INVESTIGATION RELATIONSHIP HIERARCHY TREE */}
      <section id="investigation-tree" className={`py-20 px-6 md:px-12 max-w-6xl mx-auto ${sectionBorder}`}>
        <div className="max-w-3xl mb-10 text-left">
          <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase font-bold tracking-wider">
            Analytical Hierarchy
          </div>
          <h2 className={`text-2xl sm:text-3xl font-extrabold mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Investigation Relationship Tree
          </h2>
          <p className={`text-sm mt-2 font-sans leading-relaxed ${textMuted}`}>
            Case files are networks of evidence, statements, and statutory filings. Inspect the hierarchy connecting CASE-2026-0142.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
          {/* Tree Node Structure */}
          <div className={`lg:col-span-2 p-6 rounded-xl border font-mono text-xs space-y-2 interactive-card ${cardBg}`}>
            <div className={`uppercase text-[10px] font-bold border-b pb-2 ${isLight ? 'border-slate-200 text-slate-500' : 'border-slate-800 text-slate-400'}`}>
              Case Entity Structure (Click node to inspect)
            </div>

            <div className="space-y-1 pt-2">
              <button
                onClick={() => setSelectedTreeNode('case')}
                className={`w-full text-left p-2.5 rounded transition duration-150 flex items-center space-x-2 ${
                  selectedTreeNode === 'case'
                    ? 'bg-cyan-600 text-white font-bold shadow-xs'
                    : isLight
                    ? 'hover:bg-slate-100 text-slate-800'
                    : 'hover:bg-slate-900 text-slate-300'
                }`}
              >
                <span className="font-bold">CASE-2026-0142</span>
                <span className={`text-[11px] ${selectedTreeNode === 'case' ? 'text-cyan-100' : textSubtle}`}>
                  Financial Investigation & Identity Forgery
                </span>
              </button>

              <div className={`pl-6 border-l ml-3 space-y-1 ${isLight ? 'border-slate-300' : 'border-slate-800'}`}>
                {[
                  { key: 'fir', label: 'FIR No. 104/2026 (CrPC Sec 154)', type: 'Statutory Filing' },
                  { key: 'witness', label: 'Witness: Inspector Rajesh K.', type: 'Transport Authority' },
                  { key: 'evidence', label: 'Evidence: EV-1042 (128GB MicroSD)', type: 'Physical Exhibit' },
                  { key: 'forensic', label: 'Forensic Report: Hardware Extraction', type: 'Laboratory Dump' },
                  { key: 'charge_sheet', label: 'Charge Sheet: Indictment u/s 420/468', type: 'Prosecution Filing' },
                  { key: 'court_filing', label: 'Court Filing: Sec 65B/63 BSA Cert', type: 'Judicial Affidavit' },
                ].map((node) => {
                  const isNodeSelected = selectedTreeNode === node.key;
                  return (
                    <button
                      key={node.key}
                      onClick={() => setSelectedTreeNode(node.key)}
                      className={`w-full text-left p-2 rounded transition duration-150 flex items-center justify-between ${
                        isNodeSelected
                          ? 'bg-cyan-600 text-white font-bold shadow-xs'
                          : isLight
                          ? 'hover:bg-slate-100 text-slate-700'
                          : 'hover:bg-slate-900 text-slate-400'
                      }`}
                    >
                      <span>├── {node.label}</span>
                      <span className={`text-[10px] ${isNodeSelected ? 'text-cyan-100' : textSubtle}`}>{node.type}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Node Attribute Inspector */}
          {treeNodes[selectedTreeNode] && (
            <div className={`p-6 rounded-xl border space-y-4 font-mono text-xs flex flex-col justify-between interactive-card ${cardBg}`}>
              <div className="space-y-3">
                <div className={`border-b pb-2 ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
                  <span className={`text-[10px] uppercase block ${textSubtle}`}>Category:</span>
                  <span className="text-cyan-600 dark:text-cyan-400 font-bold">
                    {treeNodes[selectedTreeNode].category}
                  </span>
                </div>

                <div>
                  <h3 className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {treeNodes[selectedTreeNode].title}
                  </h3>
                  <div className={`mt-2 text-[11px] p-2 rounded border font-semibold ${isLight ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-slate-950 border-slate-800 text-emerald-400'}`}>
                    Clearance: {treeNodes[selectedTreeNode].clearance}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className={`text-[10px] uppercase block ${textSubtle}`}>Context & Evidence Link:</span>
                  <p className={`font-sans text-xs leading-relaxed ${textMuted}`}>
                    {treeNodes[selectedTreeNode].details}
                  </p>
                </div>
              </div>

              <div className={`pt-3 border-t text-[10px] font-bold ${isLight ? 'border-slate-200 text-slate-600' : 'border-slate-800 text-slate-400'}`}>
                {treeNodes[selectedTreeNode].metadata}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 10. SIH PROBLEM STATEMENT ALIGNMENT DOSSIER */}
      <section id="dossier" className={`py-20 px-6 md:px-12 max-w-6xl mx-auto ${sectionBorder}`}>
        <div className="max-w-3xl mb-10 text-left">
          <div className="flex items-center space-x-2 text-cyan-600 dark:text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Scale className="w-4 h-4" />
            <span>Smart India Hackathon (SIH) • Official Alignment</span>
          </div>
          <h2 className={`text-2xl sm:text-3xl font-extrabold mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Secure Digital Document Management System (DMS)
          </h2>
          <p className={`text-xs font-mono mt-0.5 ${textSubtle}`}>
            National Security, Legal Governance & Police Asset Lifecycle Management
          </p>
        </div>

        {/* Dossier Tabs */}
        <div className={`grid grid-cols-2 md:grid-cols-4 p-1.5 border rounded-xl gap-1 font-mono text-xs mb-6 ${cardBg}`}>
          <button
            onClick={() => setActiveDossierTab('statement')}
            className={`py-2 px-3 rounded-lg text-center transition font-bold ${
              activeDossierTab === 'statement'
                ? 'bg-cyan-600 text-white shadow-xs'
                : isLight
                ? 'text-slate-600 hover:text-slate-900'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            1. Problem Statement
          </button>
          <button
            onClick={() => setActiveDossierTab('challenges')}
            className={`py-2 px-3 rounded-lg text-center transition font-bold ${
              activeDossierTab === 'challenges'
                ? 'bg-cyan-600 text-white shadow-xs'
                : isLight
                ? 'text-slate-600 hover:text-slate-900'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            2. Scope & Challenges
          </button>
          <button
            onClick={() => setActiveDossierTab('mandates')}
            className={`py-2 px-3 rounded-lg text-center transition font-bold ${
              activeDossierTab === 'mandates'
                ? 'bg-cyan-600 text-white shadow-xs'
                : isLight
                ? 'text-slate-600 hover:text-slate-900'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            3. 7 System Mandates
          </button>
          <button
            onClick={() => setActiveDossierTab('lifecycle')}
            className={`py-2 px-3 rounded-lg text-center transition font-bold ${
              activeDossierTab === 'lifecycle'
                ? 'bg-cyan-600 text-white shadow-xs'
                : isLight
                ? 'text-slate-600 hover:text-slate-900'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            4. Police Asset Lifecycle
          </button>
        </div>

        {/* Tab 1: Statement */}
        {activeDossierTab === 'statement' && (
          <div className={`p-6 rounded-xl border space-y-4 font-sans text-xs text-left interactive-card ${cardBg}`}>
            <div className={`space-y-2 border-b pb-4 ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
              <span className="font-mono text-cyan-600 dark:text-cyan-400 uppercase text-xs font-bold block">
                • Background Context
              </span>
              <p className={`leading-relaxed ${textMuted}`}>
                Law enforcement agencies, courts, and investigative departments handle sensitive FIRs, police reports, witness statements, charge sheets, court filings, and forensic reports throughout a case lifecycle. Traditional paper and fragmented cloud storage create severe tamper risks, missing custody records, and delayed trials.
              </p>
            </div>
            <div className="space-y-2">
              <span className="font-mono text-emerald-600 dark:text-emerald-400 uppercase text-xs font-bold block">
                • Official Expected Solution
              </span>
              <div className={`p-3.5 rounded border font-semibold ${isLight ? 'bg-emerald-50 text-emerald-900 border-emerald-200' : 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'}`}>
                &ldquo;Develop a system to monitor and manage police assets throughout their lifecycle.&rdquo;
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Scope & Challenges */}
        {activeDossierTab === 'challenges' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs text-left">
            {[
              { flaw: 'Locating records quickly', fix: 'Privacy-preserving local OCR + NLP semantic query search engine' },
              { flaw: 'Unauthorized data access', fix: 'Fine-grained ABAC + 2FA OTP + Case isolation barrier (403 BOLA)' },
              { flaw: 'Document tampering risks', fix: 'AES-256-GCM 128-bit auth tags + SHA-256 fingerprinting on ingest' },
              { flaw: 'Lack of version control', fix: 'Cryptographic custody event records & immutable version tracking' },
              { flaw: 'Cross-department delays', fix: 'Compartmentalized divisions (Cyber, Anti-Cartel, EOW, Legal)' },
              { flaw: 'Poor audit compliance', fix: 'Genesis-anchored SHA-256 hash-chained immutable audit ledger' },
            ].map((item, idx) => (
              <div key={idx} className={`p-3 rounded-lg border space-y-1 interactive-card ${cardBg}`}>
                <div className="text-rose-600 dark:text-rose-400 font-bold">• {item.flaw}</div>
                <div className="text-emerald-600 dark:text-emerald-400 font-sans text-[11px] pl-2 font-medium">
                  ↳ {item.fix}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: 7 Mandates */}
        {activeDossierTab === 'mandates' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs text-left">
            {[
              { id: '01', title: 'Digitize & Centralize Storage', detail: 'Encrypted object storage with magic-byte validation and SHA-256 ingest hashing.' },
              { id: '02', title: 'Secure Access & Confidentiality', detail: 'Multi-layer ABAC clearance levels + dynamic non-destructive watermarking.' },
              { id: '03', title: 'Prevent Unauthorized Modification', detail: 'AES-256-GCM envelope encryption rejecting any single-bit tampering.' },
              { id: '04', title: 'Maintain Complete Audit Trail', detail: 'Genesis-anchored SHA-256 hash-chained immutable ledger for court admissibility.' },
              { id: '05', title: 'Efficient Search & Retrieval', detail: 'Local OCR indexing, sensitive entity extraction (vehicles, IPC, PII), and smart queries.' },
              { id: '06', title: 'Support Authorized Collaboration', detail: 'Secure JIT temporary sharing links with 192-bit entropy and auto-expiration.' },
              { id: '07', title: 'Ensure Regulatory Compliance', detail: 'PKI RSA-PSS asymmetric digital signatures and zero-leakage public QR verification.' },
            ].map((m) => (
              <div key={m.id} className={`p-4 rounded-lg border space-y-1.5 interactive-card ${cardBg}`}>
                <div className="flex items-center justify-between">
                  <span className="text-cyan-600 dark:text-cyan-400 font-bold text-sm">{m.id}</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">VERIFIED</span>
                </div>
                <h4 className={`font-bold text-xs ${isLight ? 'text-slate-900' : 'text-white'}`}>{m.title}</h4>
                <p className={`font-sans text-[11px] leading-relaxed ${textMuted}`}>{m.detail}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Police Asset Lifecycle */}
        {activeDossierTab === 'lifecycle' && (
          <div className={`p-6 rounded-xl border space-y-3 font-mono text-xs text-left interactive-card ${cardBg}`}>
            <span className="text-cyan-600 dark:text-cyan-400 font-bold uppercase text-xs block">
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
                <div key={idx} className={`p-3 rounded border space-y-1 ${subtleBoxBg}`}>
                  <div className={`font-bold text-xs ${isLight ? 'text-slate-900' : 'text-white'}`}>{ph.step}</div>
                  <p className={`font-sans text-[11px] leading-tight ${textMuted}`}>{ph.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 11. CONFIDENT FINAL ACTION SECTION */}
      <section className={`py-20 px-6 md:px-12 max-w-4xl mx-auto text-center ${sectionBorder}`}>
        <div className="space-y-4">
          <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
            A secure investigation starts with a trustworthy record.
          </h2>
          <p className={`text-sm max-w-xl mx-auto font-sans leading-relaxed ${textMuted}`}>
            Explore how SecureVault manages documents, evidence, access, and auditability through one controlled workflow.
          </p>
          <div className="pt-2">
            <button
              onClick={onEnterApp}
              className="px-8 py-3.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-md inline-flex items-center space-x-2 transition transform hover:scale-105 active:scale-95"
            >
              <span>Open SecureVault Platform</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 12. CLEAN ENTERPRISE FOOTER */}
      <footer className={`py-12 px-6 md:px-12 border-t text-xs font-mono ${isLight ? 'bg-slate-100 text-slate-600 border-slate-200' : 'bg-[#070b16] text-slate-400 border-slate-800/80'}`}>
        <div className="max-w-6xl mx-auto space-y-8 text-left">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-sm">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded bg-slate-900 border border-slate-800 text-cyan-400 flex items-center justify-center">
                  <Lock className="w-3 h-3" />
                </div>
                <span className={`font-bold text-sm tracking-wider ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  SECURE<span className="text-cyan-600 dark:text-cyan-400">VAULT</span>
                </span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded border ${isLight ? 'bg-white border-slate-300 text-slate-600' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
                  Enterprise
                </span>
              </div>
              <p className={`text-[11px] font-sans ${textMuted}`}>
                Secure Digital Document & Investigation Evidence Platform. AES-256-GCM envelope encryption, tamper-evident audit chaining, and judicial non-repudiation.
              </p>
            </div>

            <div className="flex flex-wrap gap-8 text-xs font-mono">
              <div className="space-y-1.5 flex flex-col">
                <span className={`font-bold uppercase text-[10px] ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>Platform</span>
                <button onClick={() => scrollTo('hero')} className={`text-left transition ${isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'}`}>Overview</button>
                <button onClick={() => scrollTo('evidence')} className={`text-left transition ${isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'}`}>Evidence Chain</button>
                <button onClick={() => scrollTo('documents')} className={`text-left transition ${isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'}`}>Document Table</button>
              </div>

              <div className="space-y-1.5 flex flex-col">
                <span className={`font-bold uppercase text-[10px] ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>Security</span>
                <button onClick={() => scrollTo('security')} className={`text-left transition ${isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'}`}>Architecture</button>
                <button onClick={() => scrollTo('investigation-tree')} className={`text-left transition ${isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'}`}>Hierarchy Tree</button>
                <button onClick={() => scrollTo('dossier')} className={`text-left transition ${isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'}`}>SIH Dossier</button>
              </div>

              <div className="space-y-1.5 flex flex-col">
                <span className={`font-bold uppercase text-[10px] ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>Access</span>
                <button onClick={onEnterApp} className="text-left text-cyan-600 dark:text-cyan-400 hover:underline font-semibold transition">Official Sign In</button>
                <span className={`text-[11px] ${textSubtle}`}>Section 65B/63 BSA</span>
              </div>
            </div>
          </div>

          <div className={`pt-6 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono ${isLight ? 'border-slate-200 text-slate-500' : 'border-slate-800 text-slate-500'}`}>
            <p>&copy; {new Date().getFullYear()} SECUREVAULT. High-Assurance Evidence Governance.</p>
            <p className="text-amber-600 dark:text-amber-400/80">Evaluation prototype for Smart India Hackathon.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { UploadModal } from './components/UploadModal';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { DocumentDetailPage } from './pages/DocumentDetailPage';
import { CasesPage } from './pages/CasesPage';
import { CaseDetailPage } from './pages/CaseDetailPage';
import { EvidencePage } from './pages/EvidencePage';
import { AuditPage } from './pages/AuditPage';
import { GraphPage } from './pages/GraphPage';
import { SearchPage } from './pages/SearchPage';
import { SecurityPage } from './pages/SecurityPage';
import { SharingPage } from './pages/SharingPage';
import { QrVerificationPage } from './pages/QrVerificationPage';
import { UsersPage } from './pages/UsersPage';
import { AssetsPage } from './pages/AssetsPage';

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth();
  const [currentView, setCurrentView] = useState<string>('landing');
  const [viewParam, setViewParam] = useState<string | undefined>(undefined);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDemoFlowGuide, setShowDemoFlowGuide] = useState(false);

  // If user is on landing page or not authenticated
  if (currentView === 'landing') {
    return (
      <LandingPage
        onEnterApp={() => {
          if (isAuthenticated) setCurrentView('dashboard');
          else setCurrentView('login');
        }}
      />
    );
  }

  if (!isAuthenticated && !isLoading) {
    return (
      <LoginPage
        onSuccess={() => setCurrentView('dashboard')}
        onBackToLanding={() => setCurrentView('landing')}
      />
    );
  }

  const handleNavigate = (view: string, param?: string) => {
    setCurrentView(view);
    setViewParam(param);
  };

  const renderActiveView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardPage onNavigate={handleNavigate} onOpenUpload={() => setShowUploadModal(true)} />;
      case 'documents':
        return <DocumentsPage onNavigate={handleNavigate} onOpenUpload={() => setShowUploadModal(true)} />;
      case 'document-detail':
        return (
          <DocumentDetailPage
            documentId={viewParam || 'doc_fir_104'}
            onBack={() => handleNavigate('documents')}
            onNavigate={handleNavigate}
          />
        );
      case 'cases':
        return <CasesPage onNavigate={handleNavigate} />;
      case 'case-detail':
        return (
          <CaseDetailPage
            caseId={viewParam || 'case_104'}
            onBack={() => handleNavigate('cases')}
            onNavigate={handleNavigate}
          />
        );
      case 'evidence':
        return <EvidencePage />;
      case 'audit':
      case 'verify-chain':
        return <AuditPage />;
      case 'integrity':
        return (
          <DocumentDetailPage
            documentId={viewParam || 'doc_fir_104'}
            onBack={() => handleNavigate('documents')}
            onNavigate={handleNavigate}
          />
        );
      case 'signatures':
        return (
          <DocumentDetailPage
            documentId={viewParam || 'doc_fir_104'}
            onBack={() => handleNavigate('documents')}
            onNavigate={handleNavigate}
          />
        );
      case 'graph':
        return <GraphPage />;
      case 'search':
        return <SearchPage onNavigate={handleNavigate} />;
      case 'security':
        return <SecurityPage />;
      case 'assets':
        return <AssetsPage />;
      case 'sharing':
      case 'access-requests':
        return <SharingPage />;
      case 'qr-verify':
        return <QrVerificationPage initialDocId={viewParam} />;
      case 'admin-users':
        return <UsersPage />;
      default:
        return <DashboardPage onNavigate={handleNavigate} onOpenUpload={() => setShowUploadModal(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 flex flex-col">
      <Navbar onNavigate={handleNavigate} currentView={currentView} />

      {/* Live Demo Script Flow Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border-b border-slate-800/80 px-6 py-1.5 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center space-x-2 text-slate-300">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-cyan-400 font-bold">LIVE DEMO GUIDE:</span>
          <span className="hidden sm:inline text-slate-400">
            Case 104 • Inv A (Lead) • Inv B (403 Blocked) • Real AES-GCM & SHA-256 Tamper Lab
          </span>
        </div>

        <button
          onClick={() => setShowDemoFlowGuide(true)}
          className="text-cyan-400 hover:text-cyan-300 underline text-[11px] font-bold"
        >
          View 24-Step Presentation Script
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          currentView={currentView}
          onNavigate={handleNavigate}
          onOpenUpload={() => setShowUploadModal(true)}
        />
        <main className="flex-1 overflow-y-auto p-6 md:p-8">{renderActiveView()}</main>
      </div>

      <UploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onSuccess={(newDoc) => {
          handleNavigate('document-detail', newDoc.id);
        }}
      />

      {/* 24-Step Demonstration Guide Modal */}
      {showDemoFlowGuide && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0e1629] border border-slate-700 rounded-2xl w-full max-w-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-base font-bold text-white font-mono flex items-center space-x-2">
                <span>🔐 SECUREVAULT Live Demonstration Flow (Section 53)</span>
              </h2>
              <button onClick={() => setShowDemoFlowGuide(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto space-y-2 text-xs font-mono text-slate-300 pr-2">
              {[
                'Step 1: Switch persona to Administrator (Chief Arthur Pendelton).',
                'Step 2: Select Investigation Division & inspect Case 104.',
                'Step 3: Confirm CASE-2026-104 (Operation Nightshade) details.',
                'Step 4: Confirm Investigator A is assigned as Lead Investigator.',
                'Step 5: Switch persona to Investigator A (Senior Inv Sharma).',
                'Step 6: Click "Upload Evidence" and choose a confidential document/PDF.',
                'Step 7: Observe real-time File & Magic Bytes validation.',
                'Step 8: Observe SHA-256 fingerprint generated.',
                'Step 9: Observe real AES-256-GCM authenticated envelope encryption.',
                'Step 10: Observe secure private storage transfer and PostgreSQL indexing.',
                'Step 11: Observe OCR text extraction via local engine.',
                'Step 12: Observe AI classification (e.g. Investigation Report) and suggested tags.',
                'Step 13: Switch persona to Investigator B (Detective Marcus Vance) and attempt access to Case 104 -> 🚫 ACCESS DENIED (403 Forbidden).',
                'Step 14: Notice the unauthorized access attempt is immediately recorded in audit ledger.',
                'Step 15: Switch persona to Auditor (Inspector General Elena Rostova) and open Security Incident Center.',
                'Step 16: Click "Verify Document Integrity" -> observe ✅ INTEGRITY VERIFIED.',
                'Step 17: Click "Simulate Tampering on Demo Copy" -> observe 🚨 DOCUMENT INTEGRITY COMPROMISED alert.',
                'Step 18: Open Audit Trail and click "Verify Audit Chain" -> observe ✅ AUDIT CHAIN VERIFIED.',
                'Step 19: Open Digital Evidence -> observe visual interactive Chain of Custody Timeline.',
                'Step 20: Open Digital Signatures -> observe RSA-PSS cryptographic signature validity.',
                'Step 21: Open Investigation Graph -> interact with Case 104 entity nodes (Vehicles, Persons, Locations).',
                'Step 22: Open Smart Search -> run query: "Find investigation documents related to vehicle evidence in Case 104".',
                'Step 23: Open Document Detail -> inspect AI Executive Summary and detected forensic entities.',
                'Step 24: Open Security Dashboard -> review risk metrics and real-time posture.',
              ].map((stepText, idx) => (
                <div key={idx} className="p-2.5 rounded bg-slate-900 border border-slate-800 flex items-start space-x-2">
                  <span className="text-cyan-400 font-bold">{idx + 1}.</span>
                  <span>{stepText}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setShowDemoFlowGuide(false)}
                className="px-4 py-2 bg-cyan-500 text-slate-950 font-bold rounded-lg font-mono text-xs"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

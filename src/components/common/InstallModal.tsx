import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  Smartphone, 
  Copy, 
  Check, 
  X, 
  ExternalLink, 
  Download, 
  Share2, 
  Apple, 
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface InstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallModal: React.FC<InstallModalProps> = ({ isOpen, onClose }) => {
  const [copiado, setCopiado] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [instalado, setInstalado] = useState(false);

  // App URLs
  const appUrl = typeof window !== 'undefined' 
    ? (window.location.origin.includes('localhost') || window.location.origin.includes('run.app')
        ? window.location.origin 
        : 'https://ais-pre-6zrlcsmks7gwcrdsapvcsf-751690768326.us-east1.run.app')
    : 'https://ais-pre-6zrlcsmks7gwcrdsapvcsf-751690768326.us-east1.run.app';

  // Listen for native PWA install prompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setInstalado(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleCopiarLink = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(appUrl);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = appUrl;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiado(true);
      setTimeout(() => setCopiado(false), 3000);
    } catch (err) {
      console.error('Erro ao copiar link:', err);
    }
  };

  const handleInstalarNativo = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setInstalado(true);
    }
    setDeferredPrompt(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs no-print animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white p-5 flex items-center justify-between relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Instalar CONSULPREV SST no Celular
                <span className="text-[10px] bg-emerald-500/30 text-emerald-300 font-mono px-2 py-0.5 rounded-full border border-emerald-400/30">
                  PWA Mobile
                </span>
              </h2>
              <p className="text-xs text-slate-300">
                Aponte a câmera do seu celular para escanear ou copie o link
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* QR Code Container */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col items-center text-center shadow-xs">
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm relative group">
              <QRCodeSVG
                value={appUrl}
                size={180}
                level="H"
                includeMargin={false}
                imageSettings={{
                  src: "/logo.png",
                  x: undefined,
                  y: undefined,
                  height: 38,
                  width: 38,
                  excavate: true,
                }}
              />
            </div>

            <p className="text-xs font-semibold text-slate-700 mt-3 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Aponte a câmera do celular para o QR Code acima
            </p>
            <p className="text-[11px] text-slate-500 max-w-xs mt-0.5">
              Compatível com Android (Chrome, Samsung Internet) e iPhone (iOS Safari).
            </p>
          </div>

          {/* Direct Native Install Button (if browser supports prompt) */}
          {deferredPrompt && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <Download className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-emerald-950">Instalação Direta Disponível!</p>
                  <p className="text-[11px] text-emerald-700">Seu navegador suporta instalação com 1 clique.</p>
                </div>
              </div>
              <button
                onClick={handleInstalarNativo}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors cursor-pointer shrink-0 shadow-xs"
              >
                Instalar App
              </button>
            </div>
          )}

          {instalado && (
            <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-3 flex items-center gap-2 text-xs font-bold text-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              Aplicativo instalado com sucesso no seu dispositivo!
            </div>
          )}

          {/* Link Copy Box */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              Link de Acesso e Instalação:
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 font-mono text-xs text-slate-700 truncate select-all">
                {appUrl}
              </div>
              <button
                onClick={handleCopiarLink}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 shadow-xs ${
                  copiado 
                    ? 'bg-emerald-600 text-white ring-2 ring-emerald-400' 
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                {copiado ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copiar Link
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Step by Step Guides for Android and iPhone */}
          <div className="border-t border-slate-200 pt-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Como Adicionar à Tela Inicial do seu Celular
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              
              {/* Android Guide */}
              <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 space-y-1.5">
                <div className="flex items-center gap-1.5 text-slate-900 font-bold">
                  <Smartphone className="w-4 h-4 text-emerald-600" />
                  <span>No Android (Google Chrome)</span>
                </div>
                <ol className="text-[11px] text-slate-600 space-y-1 list-decimal list-inside leading-relaxed">
                  <li>Abra o link no navegador <strong>Chrome</strong>.</li>
                  <li>Toque no menu de <strong>três pontos (⋮)</strong> no topo direito.</li>
                  <li>Selecione <strong>"Adicionar à tela inicial"</strong> ou <strong>"Instalar aplicativo"</strong>.</li>
                  <li>O ícone da <strong>CONSULPREV SST</strong> será criado na sua tela de apps.</li>
                </ol>
              </div>

              {/* iOS / iPhone Guide */}
              <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 space-y-1.5">
                <div className="flex items-center gap-1.5 text-slate-900 font-bold">
                  <Apple className="w-4 h-4 text-slate-800" />
                  <span>No iPhone (Safari)</span>
                </div>
                <ol className="text-[11px] text-slate-600 space-y-1 list-decimal list-inside leading-relaxed">
                  <li>Abra o link no navegador <strong>Safari</strong>.</li>
                  <li>Toque no botão <strong>Compartilhar (quadrado com seta ⎋)</strong> na barra inferior.</li>
                  <li>Role para baixo e selecione <strong>"Adicionar à Tela de Início"</strong> (+).</li>
                  <li>Toque em <strong>"Adicionar"</strong> no canto superior direito.</li>
                </ol>
              </div>

            </div>
          </div>

          {/* Benefits badges */}
          <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-emerald-900">
            <span className="flex items-center gap-1 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              Acesso rápido offline e sem lojas de apps
            </span>
            <span className="flex items-center gap-1 font-medium">
              <Check className="w-3.5 h-3.5 text-emerald-700" />
              Preenchimento em campo (EPI, DDS, Extintores)
            </span>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 flex items-center justify-between">
          <a
            href={appUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Abrir em nova aba
          </a>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-bold transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};

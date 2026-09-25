import React from 'react';
import { 
  ShieldCheck, 
  Building2, 
  Clock, 
  FileText, 
  HardHat, 
  AlertTriangle, 
  CheckCircle2,
  Printer,
  Smartphone,
  QrCode,
  FileDown
} from 'lucide-react';
import { Empresa, ModuloSST } from '../../types/sst';
import { consultoriaSST } from '../../data/sstData';

interface HeaderProps {
  empresa: Empresa;
  onSelectEmpresa?: (empresa: Empresa) => void;
  moduloAtivo: ModuloSST;
  onMudarModulo: (modulo: ModuloSST) => void;
  onImprimirPagina: () => void;
  onGerarPdf?: () => void;
  onAbrirInstalar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  empresa,
  moduloAtivo,
  onMudarModulo,
  onImprimirPagina,
  onGerarPdf,
  onAbrirInstalar
}) => {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 shadow-md no-print sticky top-0 z-40">
      {/* Top Banner with Brand Identity matching user's uploaded CONSULPREV SST image */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2.5">
          
          {/* Brand Logo & Name with user's uploaded logo */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onMudarModulo('dashboard')}>
            <div className="relative flex items-center justify-center">
              <img 
                src="/logo.png" 
                alt="CONSULPREV SST - Consultoria e Treinamentos" 
                className="h-11 sm:h-13 w-auto max-w-[160px] object-contain drop-shadow-md transition-transform group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-red-400 bg-clip-text text-transparent drop-shadow-sm">
                  CONSULPREV SST
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  SST & NRs
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium hidden sm:block">
                CONSULTORIA E TREINAMENTOS EM SEGURANÇA DO TRABALHO
              </p>
            </div>
          </div>

          {/* Active Company Client Card & Action Buttons */}
          <div className="flex items-center gap-2.5">
            <div className="hidden lg:flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700 text-xs">
              <Building2 className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="text-slate-400 block text-[10px] leading-tight">EMPRESA CLIENTE:</span>
                <span className="font-semibold text-slate-200 truncate max-w-[200px] inline-block">
                  {empresa.nomeFantasia}
                </span>
              </div>
              <span className="ml-1 text-[10px] px-1.5 py-0.5 bg-amber-500/20 text-amber-300 font-bold rounded border border-amber-500/30">
                Grau {empresa.grauDeRisco}
              </span>
            </div>

            {/* Mobile / PWA QR Code install button */}
            <button
              id="btn-instalar-celular"
              onClick={onAbrirInstalar}
              title="Instalar no celular via QR Code ou Link PWA"
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/40 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-xs hover:border-emerald-400 hover:shadow-emerald-950/20"
            >
              <QrCode className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="hidden sm:inline">Instalar no Celular</span>
              <span className="sm:hidden">App</span>
            </button>

            <button
              id="btn-gerar-pdf-geral"
              onClick={onGerarPdf}
              title="Gerar e baixar arquivo PDF diretamente"
              className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white px-3 py-2 rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer"
            >
              <FileDown className="w-4 h-4" />
              <span className="hidden sm:inline">Gerar PDF</span>
            </button>

            <button
              id="btn-imprimir-geral"
              onClick={onImprimirPagina}
              title="Imprimir documento ou salvar como PDF no sistema"
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-2 rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden md:inline">Imprimir</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};

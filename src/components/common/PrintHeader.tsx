import React, { useState } from 'react';
import { Empresa } from '../../types/sst';
import { consultoriaSST } from '../../data/sstData';
import { Printer, FileDown, CheckCircle2 } from 'lucide-react';
import { exportarElementoParaPdf } from '../../utils/pdfGenerator';

interface PrintHeaderProps {
  tituloDocumento: string;
  subtituloDocumento?: string;
  codigoDocumento?: string;
  empresa: Empresa;
  onImprimir?: () => void;
  onGerarPdf?: () => void;
  mostrarAcoes?: boolean;
}

export const PrintHeader: React.FC<PrintHeaderProps> = ({
  tituloDocumento,
  subtituloDocumento,
  codigoDocumento,
  empresa,
  onImprimir,
  onGerarPdf,
  mostrarAcoes = true
}) => {
  const [gerando, setGerando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  const handleGerarPdfInterno = async () => {
    if (onGerarPdf) {
      onGerarPdf();
      return;
    }

    setGerando(true);
    try {
      const sanitizedName = `${codigoDocumento || 'DOC'}-${tituloDocumento.slice(0, 30)}`
        .replace(/[^a-zA-Z0-9-_]/g, '_');
      await exportarElementoParaPdf({
        filename: `CONSULPREV-${sanitizedName}.pdf`
      });
      setSucesso(true);
      setTimeout(() => setSucesso(false), 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setGerando(false);
    }
  };

  const handleImprimirInterno = () => {
    if (onImprimir) {
      onImprimir();
    } else {
      window.print();
    }
  };

  return (
    <div className="border-b-2 border-slate-900 pb-4 mb-6">
      {/* Quick document action bar (hidden during print) */}
      {mostrarAcoes && (
        <div className="flex items-center justify-end gap-2 pb-3 mb-3 border-b border-slate-200 no-print">
          <span className="text-[11px] text-slate-500 font-medium mr-auto">
            Ações do documento oficial:
          </span>

          <button
            type="button"
            onClick={handleGerarPdfInterno}
            disabled={gerando}
            className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer disabled:opacity-50"
            title="Exportar arquivo PDF para download"
          >
            {sucesso ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-200" />
                <span>PDF Baixado!</span>
              </>
            ) : gerando ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Gerando PDF...</span>
              </>
            ) : (
              <>
                <FileDown className="w-3.5 h-3.5" />
                <span>Gerar PDF</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleImprimirInterno}
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer"
            title="Abrir caixa de diálogo de impressão"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir</span>
          </button>
        </div>
      )}

      <div className="flex items-start justify-between gap-4">
        {/* Logo & Technical Issuer Information */}
        <div className="flex items-center gap-3">
          <img 
            src="/logo.png" 
            alt="CONSULPREV SST" 
            className="h-16 w-auto max-w-[140px] object-contain rounded"
            referrerPolicy="no-referrer"
          />

          <div>
            <h2 className="text-base font-extrabold text-slate-900 uppercase tracking-tight leading-tight">
              {consultoriaSST.nome}
            </h2>
            <p className="text-[11px] font-semibold text-emerald-700 uppercase">
              {consultoriaSST.subtitulo}
            </p>
            <p className="text-[10px] text-slate-600">
              CNPJ: {consultoriaSST.cnpj} | {consultoriaSST.registroConselho}
            </p>
            <p className="text-[10px] text-slate-500">
              Resp. Técnico: {consultoriaSST.responsavelTecnico}
            </p>
          </div>
        </div>

        {/* Document Title & Number */}
        <div className="text-right">
          <span className="inline-block px-2.5 py-1 bg-slate-100 text-slate-900 font-mono text-xs font-bold rounded border border-slate-300">
            {codigoDocumento || 'DOCUMENTO OFICIAL'}
          </span>
          <h1 className="text-sm font-bold text-slate-900 uppercase mt-1">
            {tituloDocumento}
          </h1>
          {subtituloDocumento && (
            <p className="text-[11px] text-slate-600">{subtituloDocumento}</p>
          )}
          <p className="text-[10px] text-slate-400 mt-0.5">
            Data de Emissão: {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>
      </div>

      {/* Client Company Quick Details Strip */}
      <div className="mt-3 bg-slate-50 border border-slate-200 rounded p-2 text-[11px] grid grid-cols-2 sm:grid-cols-4 gap-2">
        <div>
          <span className="font-semibold text-slate-500 block text-[9px] uppercase">Razão Social:</span>
          <span className="font-bold text-slate-800 truncate block">{empresa.razaoSocial}</span>
        </div>
        <div>
          <span className="font-semibold text-slate-500 block text-[9px] uppercase">CNPJ:</span>
          <span className="font-medium text-slate-800 font-mono">{empresa.cnpj}</span>
        </div>
        <div>
          <span className="font-semibold text-slate-500 block text-[9px] uppercase">CNAE / Grau de Risco:</span>
          <span className="font-medium text-slate-800">{empresa.cnae.split(' - ')[0]} | Grau {empresa.grauDeRisco}</span>
        </div>
        <div>
          <span className="font-semibold text-slate-500 block text-[9px] uppercase">Local / Cidade:</span>
          <span className="font-medium text-slate-800">{empresa.cidade} - {empresa.uf}</span>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  FileText, 
  Download, 
  Filter, 
  Calendar,
  Layers,
  ArrowRight,
  Printer,
  FileDown
} from 'lucide-react';
import { catalogoNRs } from '../../data/sstData';
import { NormaRegulamentadora, ModuloSST } from '../../types/sst';

interface NrsModuleProps {
  onNavegarParaTreinamentos: () => void;
  onNavegarParaChecklists: () => void;
  onImprimir?: () => void;
  onGerarPdf?: () => void;
}

export const NrsModule: React.FC<NrsModuleProps> = ({
  onNavegarParaTreinamentos,
  onNavegarParaChecklists,
  onImprimir,
  onGerarPdf
}) => {
  const [busca, setBusca] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState<'Todas' | 'Geral' | 'Especial' | 'Setorial'>('Todas');
  const [nrSelecionada, setNrSelecionada] = useState<NormaRegulamentadora>(catalogoNRs[0]);

  const nrsFiltradas = useMemo(() => {
    return catalogoNRs.filter(nr => {
      const matchBusca = 
        nr.numero.toLowerCase().includes(busca.toLowerCase()) ||
        nr.titulo.toLowerCase().includes(busca.toLowerCase()) ||
        nr.resumo.toLowerCase().includes(busca.toLowerCase()) ||
        nr.itensChave.some(i => i.toLowerCase().includes(busca.toLowerCase()));
      
      const matchCategoria = categoriaFiltro === 'Todas' || nr.categoria === categoriaFiltro;

      return matchBusca && matchCategoria;
    });
  }, [busca, categoriaFiltro]);

  return (
    <div className="space-y-6">
      
      {/* Title & Filter Header */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4 no-print">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
                <BookOpen className="w-5 h-5" />
              </span>
              <div>
                <h1 className="text-xl font-bold text-slate-900">
                  Normas Regulamentadoras (NRs do MTE)
                </h1>
                <p className="text-xs text-slate-500">
                  Catálogo técnico, diretrizes legais de conformidade e obrigatoriedades para SST
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onNavegarParaTreinamentos}
              className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer"
            >
              <span>Ver Treinamentos de NRs</span>
            </button>
            <button
              onClick={onNavegarParaChecklists}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer"
            >
              <span>Checklists das NRs</span>
            </button>
          </div>
        </div>

        {/* Search & Category Filter Pills */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between pt-2 border-t border-slate-100">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar por NR, palavra-chave (ex: altura, solda, cipa, epi)..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:border-emerald-500 outline-hidden"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto">
            {(['Todas', 'Geral', 'Especial', 'Setorial'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoriaFiltro(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors whitespace-nowrap ${
                  categoriaFiltro === cat
                    ? 'bg-slate-900 text-white font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Layout: List on Left, Comprehensive Spec Card on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: NRs List */}
        <div className="lg:col-span-5 space-y-2 no-print max-h-[700px] overflow-y-auto pr-1">
          {nrsFiltradas.length === 0 ? (
            <div className="bg-white p-6 rounded-xl border border-slate-200 text-center text-xs text-slate-500">
              Nenhuma Norma Regulamentadora encontrada para a busca "{busca}".
            </div>
          ) : (
            nrsFiltradas.map((nr) => {
              const selecionada = nrSelecionada.numero === nr.numero;
              return (
                <div
                  key={nr.numero}
                  onClick={() => setNrSelecionada(nr)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    selecionada
                      ? 'bg-emerald-50/70 border-emerald-500 shadow-xs ring-1 ring-emerald-500'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      {nr.numero}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                      {nr.categoria}
                    </span>
                  </div>

                  <h3 className="font-bold text-xs text-slate-900 mt-2 line-clamp-2">
                    {nr.titulo}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                    {nr.resumo}
                  </p>

                  <div className="mt-2.5 flex items-center justify-between text-[10px] text-slate-400">
                    <span className="flex items-center gap-1 text-emerald-700 font-medium">
                      <CheckCircle2 className="w-3 h-3" /> {nr.status}
                    </span>
                    <span className="truncate max-w-[150px]">{nr.ultimaAtualizacao}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Side: Detailed Norma Sheet */}
        <div className="lg:col-span-7">
          {nrSelecionada && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-6">
              
              {/* Header of selected NR */}
              <div className="border-b border-slate-200 pb-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                      {nrSelecionada.numero}
                    </span>
                    <span className="text-xs uppercase font-bold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md">
                      Categoria: {nrSelecionada.categoria}
                    </span>
                  </div>

                  <span className="flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Vigente
                  </span>
                </div>

                <h2 className="text-lg font-bold text-slate-900 mt-3">
                  {nrSelecionada.titulo}
                </h2>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                  <span>Atualização: <strong>{nrSelecionada.ultimaAtualizacao}</strong></span>
                </p>
              </div>

              {/* Objetivo Geral */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  Objetivo Regulamentar
                </h4>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
                  {nrSelecionada.objetivo}
                </div>
              </div>

              {/* Resumo da Norma */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Síntese e Aplicação Técnica
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {nrSelecionada.resumo}
                </p>
              </div>

              {/* Itens Chave de Cumprimento */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Requisitos Chave de Conformidade Obrigatória
                </h4>
                <div className="space-y-2">
                  {nrSelecionada.itensChave.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-100 text-xs text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Obrigatoriedade Legal */}
              <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
                <span className="font-bold block text-[11px] uppercase tracking-wider text-amber-800 mb-1">
                  Enquadramento e Obrigatoriedade Legal:
                </span>
                <p>{nrSelecionada.obrigatoriedade}</p>
              </div>

              {/* Quick Actions to trigger related modules */}
              <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-2 no-print">
                {onGerarPdf && (
                  <button
                    onClick={onGerarPdf}
                    className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white px-3.5 py-2 rounded-lg text-xs font-semibold cursor-pointer shadow-xs"
                    title="Gerar e baixar PDF dos requisitos desta NR"
                  >
                    <FileDown className="w-3.5 h-3.5" />
                    <span>Gerar PDF desta NR</span>
                  </button>
                )}
                {onImprimir && (
                  <button
                    onClick={onImprimir}
                    className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-600 text-white px-3.5 py-2 rounded-lg text-xs font-semibold cursor-pointer shadow-xs"
                    title="Imprimir ficha técnica de conformidade da NR"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Imprimir NR</span>
                  </button>
                )}
                <button
                  onClick={onNavegarParaTreinamentos}
                  className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2 rounded-lg text-xs font-semibold cursor-pointer"
                >
                  <span>Emitir Certificado / Treinamento desta NR</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={onNavegarParaChecklists}
                  className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 px-3.5 py-2 rounded-lg text-xs font-semibold cursor-pointer"
                >
                  <span>Executar Checklist de Inspeção</span>
                </button>
              </div>

            </div>
          )}
        </div>

      </div>

    </div>
  );
};

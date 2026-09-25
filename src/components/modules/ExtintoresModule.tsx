import React, { useState } from 'react';
import { 
  Flame, 
  Printer, 
  Plus, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Search, 
  Filter, 
  Calendar, 
  ShieldAlert, 
  FileText, 
  Check, 
  X,
  Gauge,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  FileDown
} from 'lucide-react';
import { Empresa, ExtintorItem, TipoCargaExtintor } from '../../types/sst';
import { PrintHeader } from '../common/PrintHeader';
import { consultoriaSST } from '../../data/sstData';

interface ExtintoresModuleProps {
  empresa: Empresa;
  extintores: ExtintorItem[];
  onAdicionarExtintor: (novo: ExtintorItem) => void;
  onAtualizarExtintor: (atualizado: ExtintorItem) => void;
  onImprimir: () => void;
  onGerarPdf?: () => void;
}

export const ExtintoresModule: React.FC<ExtintoresModuleProps> = ({
  empresa,
  extintores,
  onAdicionarExtintor,
  onAtualizarExtintor,
  onImprimir,
  onGerarPdf
}) => {
  const [busca, setBusca] = useState('');
  const [filtroTipo, setFiltroTipo] = useState<string>('Todos');
  const [filtroStatus, setFiltroStatus] = useState<string>('Todos');
  const [modalNovoAberto, setModalNovoAberto] = useState(false);
  const [modoVisualizacao, setModoVisualizacao] = useState<'lista' | 'relatorio'>('lista');

  // Form states for new extinguisher / inspection
  const [formCodigo, setFormCodigo] = useState(`EXT-${String(extintores.length + 1).padStart(2, '0')}`);
  const [formLocal, setFormLocal] = useState('');
  const [formTipo, setFormTipo] = useState<TipoCargaExtintor>('Pó Químico Seco (PQS) ABC');
  const [formCapacidade, setFormCapacidade] = useState('6 kg');
  const [formFabricante, setFormFabricante] = useState('Kidde Brasil');
  const [formCilindro, setFormCilindro] = useState('');
  const [formSeloInmetro, setFormSeloInmetro] = useState('');
  const [formDataInspecao, setFormDataInspecao] = useState(new Date().toISOString().split('T')[0]);
  const [formDataRecarga, setFormDataRecarga] = useState('2027-09-20');
  const [formDataTeste, setFormDataTeste] = useState('2029-09-20');
  const [formInspetor, setFormInspetor] = useState('Danielle Freitas - TST Reg. MTE 042.810');
  const [formObservacoes, setFormObservacoes] = useState('');

  // Checklist booleans
  const [chkManometro, setChkManometro] = useState(true);
  const [chkLacre, setChkLacre] = useState(true);
  const [chkAnel, setChkAnel] = useState(true);
  const [chkMangueira, setChkMangueira] = useState(true);
  const [chkSuporte, setChkSuporte] = useState(true);
  const [chkSinalizacao, setChkSinalizacao] = useState(true);
  const [chkCilindro, setChkCilindro] = useState(true);

  // Quick toggle item in list
  const handleToggleItem = (ext: ExtintorItem, campo: keyof ExtintorItem) => {
    const valorAtual = ext[campo] as boolean;
    const atualizado: ExtintorItem = {
      ...ext,
      [campo]: !valorAtual
    };

    // Recalculate status
    const todosOk = 
      (campo === 'manometroPressurizado' ? !valorAtual : ext.manometroPressurizado) &&
      (campo === 'lacreEPinoIntactos' ? !valorAtual : ext.lacreEPinoIntactos) &&
      (campo === 'anelIdentificacaoCorreto' ? !valorAtual : ext.anelIdentificacaoCorreto) &&
      (campo === 'mangueiraBicoDesobstruidos' ? !valorAtual : ext.mangueiraBicoDesobstruidos) &&
      (campo === 'suporteEAlturaConforme' ? !valorAtual : ext.suporteEAlturaConforme) &&
      (campo === 'sinalizacaoEDesobstrucaoLivre' ? !valorAtual : ext.sinalizacaoEDesobstrucaoLivre) &&
      (campo === 'cilindroSemDanosOuOxidacao' ? !valorAtual : ext.cilindroSemDanosOuOxidacao);

    if (todosOk) {
      atualizado.status = 'Aprovado';
    } else if (!atualizado.manometroPressurizado || !atualizado.lacreEPinoIntactos) {
      atualizado.status = 'Interditado / Condenado';
    } else {
      atualizado.status = 'Requer Recarga / Manutenção';
    }

    onAtualizarExtintor(atualizado);
  };

  const handleSalvarNovo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formCodigo || !formLocal) return;

    const todosOk = chkManometro && chkLacre && chkAnel && chkMangueira && chkSuporte && chkSinalizacao && chkCilindro;
    const statusFinal: ExtintorItem['status'] = todosOk 
      ? 'Aprovado' 
      : (!chkManometro || !chkLacre ? 'Interditado / Condenado' : 'Requer Recarga / Manutenção');

    const novo: ExtintorItem = {
      id: `ext-${Date.now()}`,
      codigoIdentificacao: formCodigo,
      localizacaoSetor: formLocal,
      tipoCarga: formTipo,
      capacidade: formCapacidade,
      fabricante: formFabricante,
      numeroCilindro: formCilindro || `CIL-${Math.floor(100000 + Math.random() * 900000)}`,
      numeroSeloInmetro: formSeloInmetro || `INM-${Math.floor(10000000 + Math.random() * 90000000)}`,
      dataUltimaInspecao: formDataInspecao,
      dataProximaRecarga: formDataRecarga,
      dataTesteHidrostatico: formDataTeste,
      manometroPressurizado: chkManometro,
      lacreEPinoIntactos: chkLacre,
      anelIdentificacaoCorreto: chkAnel,
      mangueiraBicoDesobstruidos: chkMangueira,
      suporteEAlturaConforme: chkSuporte,
      sinalizacaoEDesobstrucaoLivre: chkSinalizacao,
      cilindroSemDanosOuOxidacao: chkCilindro,
      status: statusFinal,
      inspetorResponsavel: formInspetor,
      observacoes: formObservacoes || (todosOk ? 'Inspeção mensal realizada em conformidade com NBR 12962.' : 'Pendências identificadas no checklist.')
    };

    onAdicionarExtintor(novo);
    setModalNovoAberto(false);

    // Reset form
    setFormCodigo(`EXT-${String(extintores.length + 2).padStart(2, '0')}`);
    setFormLocal('');
    setFormObservacoes('');
  };

  // Filtered list
  const extintoresFiltrados = extintores.filter((ext) => {
    const bateBusca = 
      ext.codigoIdentificacao.toLowerCase().includes(busca.toLowerCase()) ||
      ext.localizacaoSetor.toLowerCase().includes(busca.toLowerCase()) ||
      ext.numeroCilindro.toLowerCase().includes(busca.toLowerCase()) ||
      ext.tipoCarga.toLowerCase().includes(busca.toLowerCase());
    const bateTipo = filtroTipo === 'Todos' || ext.tipoCarga === filtroTipo;
    const bateStatus = filtroStatus === 'Todos' || ext.status === filtroStatus;
    return bateBusca && bateTipo && bateStatus;
  });

  // Statistics
  const totalExtintores = extintores.length;
  const totalAprovados = extintores.filter(e => e.status === 'Aprovado').length;
  const totalAtencao = extintores.filter(e => e.status === 'Requer Recarga / Manutenção').length;
  const totalInterditados = extintores.filter(e => e.status === 'Interditado / Condenado').length;

  return (
    <div className="space-y-6">
      
      {/* Module Title Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-red-100 text-red-700">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              Inspeção Mensal de Extintores de Incêndio
              <span className="text-xs font-mono bg-red-50 text-red-700 border border-red-200 px-2 py-0.5 rounded-full">
                NR-23 & NBR 12962
              </span>
            </h1>
            <p className="text-xs text-slate-500">
              Controle de validade de carga, teste hidrostático, selos Inmetro e checklist visual de campo
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setModoVisualizacao(modoVisualizacao === 'lista' ? 'relatorio' : 'lista')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer border ${
              modoVisualizacao === 'relatorio'
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            <FileText className="w-4 h-4" />
            {modoVisualizacao === 'relatorio' ? 'Ver Modo Interativo' : 'Ver Relatório Oficial'}
          </button>

          {onGerarPdf && (
            <button
              onClick={() => {
                if (modoVisualizacao === 'lista') {
                  setModoVisualizacao('relatorio');
                  setTimeout(() => onGerarPdf(), 150);
                } else {
                  onGerarPdf();
                }
              }}
              className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white px-3.5 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs"
              title="Gerar e baixar PDF do relatório de extintores"
            >
              <FileDown className="w-4 h-4" />
              <span>Gerar PDF</span>
            </button>
          )}

          <button
            onClick={() => {
              if (modoVisualizacao === 'lista') {
                setModoVisualizacao('relatorio');
                setTimeout(() => onImprimir(), 150);
              } else {
                onImprimir();
              }
            }}
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs"
          >
            <Printer className="w-4 h-4" />
            Imprimir Relatório (NR-23)
          </button>

          <button
            onClick={() => setModalNovoAberto(true)}
            className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white px-3.5 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            Novo Extintor / Inspeção
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 no-print">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Total Cadastrados</span>
            <Flame className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">{totalExtintores}</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Parque de extintores ativo</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-emerald-600 text-xs font-medium">
            <span>100% Aprovados</span>
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <p className="text-2xl font-black text-emerald-700 mt-2">{totalAprovados}</p>
          <p className="text-[11px] text-emerald-600 mt-0.5">Prontos para uso imediato</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-amber-600 text-xs font-medium">
            <span>Requer Manutenção</span>
            <AlertTriangle className="w-4 h-4" />
          </div>
          <p className="text-2xl font-black text-amber-700 mt-2">{totalAtencao}</p>
          <p className="text-[11px] text-amber-600 mt-0.5">Vencimento próximo ou obstruído</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-red-600 text-xs font-medium">
            <span>Interditados / Vencidos</span>
            <XCircle className="w-4 h-4" />
          </div>
          <p className="text-2xl font-black text-red-700 mt-2">{totalInterditados}</p>
          <p className="text-[11px] text-red-600 mt-0.5">Envio urgente p/ recarga</p>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between no-print">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por tag (EXT-01), setor, número de cilindro..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-red-500 focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg text-xs py-1.5 px-3 focus:outline-hidden focus:ring-2 focus:ring-red-500 font-medium text-slate-700"
          >
            <option value="Todos">Todos os Tipos de Carga</option>
            <option value="Pó Químico Seco (PQS) ABC">Pó Químico Seco (ABC)</option>
            <option value="Água Pressurizada (AP)">Água Pressurizada (AP)</option>
            <option value="Gás Carbônico (CO2)">Gás Carbônico (CO2)</option>
            <option value="Pó Químico Seco (PQS) BC">Pó Químico Seco (BC)</option>
          </select>

          <select
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg text-xs py-1.5 px-3 focus:outline-hidden focus:ring-2 focus:ring-red-500 font-medium text-slate-700"
          >
            <option value="Todos">Todos os Status</option>
            <option value="Aprovado">Aprovado</option>
            <option value="Requer Recarga / Manutenção">Requer Recarga</option>
            <option value="Interditado / Condenado">Interditado</option>
          </select>
        </div>
      </div>

      {/* INTERACTIVE CARDS & CHECKLIST TABLE (Screen view) */}
      {modoVisualizacao === 'lista' && (
        <div className="space-y-4 no-print">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-3">Identificação</th>
                    <th className="py-3 px-3">Tipo & Carga</th>
                    <th className="py-3 px-3">Localização / Setor</th>
                    <th className="py-3 px-3 text-center">Itens Inspecionados (Clique p/ Alternar)</th>
                    <th className="py-3 px-3">Venc. Recarga</th>
                    <th className="py-3 px-3">Status Geral</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {extintoresFiltrados.map((ext) => (
                    <tr key={ext.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-3 font-medium">
                        <span className="font-bold text-slate-900 block">{ext.codigoIdentificacao}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{ext.numeroCilindro}</span>
                      </td>

                      <td className="py-3 px-3">
                        <span className="font-semibold text-slate-900 block">{ext.tipoCarga}</span>
                        <span className="text-[11px] text-slate-500">Capacidade: {ext.capacidade}</span>
                      </td>

                      <td className="py-3 px-3">
                        <div className="flex items-start gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                          <span className="text-slate-800 font-medium">{ext.localizacaoSetor}</span>
                        </div>
                      </td>

                      {/* Interactive Field Checklist Toggles */}
                      <td className="py-3 px-3">
                        <div className="flex items-center justify-center gap-1.5 flex-wrap">
                          <button
                            onClick={() => handleToggleItem(ext, 'manometroPressurizado')}
                            title="Manômetro na Faixa Verde"
                            className={`p-1 rounded text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                              ext.manometroPressurizado 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            <Gauge className="w-3 h-3" />
                            Manômetro
                          </button>

                          <button
                            onClick={() => handleToggleItem(ext, 'lacreEPinoIntactos')}
                            title="Lacre e Pino Intactos"
                            className={`p-1 rounded text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                              ext.lacreEPinoIntactos 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {ext.lacreEPinoIntactos ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                            Lacre
                          </button>

                          <button
                            onClick={() => handleToggleItem(ext, 'anelIdentificacaoCorreto')}
                            title="Anel da Cor do Ano Vigente"
                            className={`p-1 rounded text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                              ext.anelIdentificacaoCorreto 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {ext.anelIdentificacaoCorreto ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                            Anel
                          </button>

                          <button
                            onClick={() => handleToggleItem(ext, 'mangueiraBicoDesobstruidos')}
                            title="Mangueira e Bico Limpos"
                            className={`p-1 rounded text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                              ext.mangueiraBicoDesobstruidos 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            Mangueira
                          </button>

                          <button
                            onClick={() => handleToggleItem(ext, 'sinalizacaoEDesobstrucaoLivre')}
                            title="Sinalização e Solo 1x1m Livre"
                            className={`p-1 rounded text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                              ext.sinalizacaoEDesobstrucaoLivre 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            Acesso Livre
                          </button>
                        </div>
                      </td>

                      <td className="py-3 px-3">
                        <span className="font-semibold text-slate-800 block">
                          {new Date(ext.dataProximaRecarga).toLocaleDateString('pt-BR')}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          Hidrostático: {new Date(ext.dataTesteHidrostatico).toLocaleDateString('pt-BR')}
                        </span>
                      </td>

                      <td className="py-3 px-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${
                          ext.status === 'Aprovado'
                            ? 'bg-emerald-100 text-emerald-800'
                            : ext.status === 'Requer Recarga / Manutenção'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {ext.status === 'Aprovado' && <CheckCircle2 className="w-3 h-3" />}
                          {ext.status === 'Requer Recarga / Manutenção' && <AlertTriangle className="w-3 h-3" />}
                          {ext.status === 'Interditado / Condenado' && <XCircle className="w-3 h-3" />}
                          {ext.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* OFFICIAL PRINTABLE REPORT SHEET (Visible in screen when 'relatorio' mode or on print) */}
      <div className={`bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm print-page ${modoVisualizacao === 'lista' ? 'hidden print:block' : 'block'}`}>
        
        <PrintHeader
          tituloDocumento="RELATÓRIO MENSAL DE INSPEÇÃO DE EXTINTORES DE INCÊNDIO"
          subtituloDocumento="NR-23 (PROTEÇÃO CONTRA INCÊNDIOS) E ABNT NBR 12962 / NBR 15808 (NÍVEL 1)"
          codigoDocumento={`REL-EXT-${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`}
          empresa={empresa}
          onImprimir={onImprimir}
          onGerarPdf={onGerarPdf}
        />

        {/* Audit Meta Details */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Inspetor Responsável:</span>
            <span className="font-bold text-slate-800">Danielle Freitas</span>
            <span className="text-[10px] text-slate-500 block">TST MTE/SP 042.810</span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Data da Inspeção:</span>
            <span className="font-bold text-slate-800">{new Date().toLocaleDateString('pt-BR')}</span>
            <span className="text-[10px] text-slate-500 block">Periodicidade: Mensal</span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Inspecionado:</span>
            <span className="font-bold text-slate-800">{totalExtintores} extintores</span>
            <span className="text-[10px] text-slate-500 block">Aprovados: {totalAprovados} ({Math.round((totalAprovados / (totalExtintores || 1)) * 100)}%)</span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Irregularidades:</span>
            <span className={`font-bold ${totalInterditados > 0 ? 'text-red-700' : 'text-slate-800'}`}>
              {totalAtencao + totalInterditados} extintores
            </span>
            <span className="text-[10px] text-slate-500 block">{totalInterditados} interditados</span>
          </div>
        </div>

        {/* Extinguisher Inspection Table */}
        <div className="space-y-3 mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 border-b border-slate-200 pb-1">
            Quadro Demonstrativo de Inspeção Individual de Extintores
          </h3>

          <table className="w-full text-left text-[11px] border border-slate-300 border-collapse">
            <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[9px]">
              <tr>
                <th className="border border-slate-300 p-1.5">Item</th>
                <th className="border border-slate-300 p-1.5">Setor / Local</th>
                <th className="border border-slate-300 p-1.5">Tipo / Carga</th>
                <th className="border border-slate-300 p-1.5">Nº Cilindro</th>
                <th className="border border-slate-300 p-1.5 text-center">Manômetro</th>
                <th className="border border-slate-300 p-1.5 text-center">Lacre/Pino</th>
                <th className="border border-slate-300 p-1.5 text-center">Anel Ano</th>
                <th className="border border-slate-300 p-1.5 text-center">Acesso Livre</th>
                <th className="border border-slate-300 p-1.5">Venc. Carga</th>
                <th className="border border-slate-300 p-1.5">Venc. Teste</th>
                <th className="border border-slate-300 p-1.5">Parecer</th>
              </tr>
            </thead>
            <tbody>
              {extintores.map((ext, idx) => (
                <tr key={ext.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                  <td className="border border-slate-300 p-1.5 font-bold">{ext.codigoIdentificacao}</td>
                  <td className="border border-slate-300 p-1.5">{ext.localizacaoSetor}</td>
                  <td className="border border-slate-300 p-1.5">{ext.tipoCarga} ({ext.capacidade})</td>
                  <td className="border border-slate-300 p-1.5 font-mono">{ext.numeroCilindro}</td>
                  <td className="border border-slate-300 p-1.5 text-center">
                    {ext.manometroPressurizado ? 'OK' : 'BAIXO'}
                  </td>
                  <td className="border border-slate-300 p-1.5 text-center">
                    {ext.lacreEPinoIntactos ? 'OK' : 'ROMPIDO'}
                  </td>
                  <td className="border border-slate-300 p-1.5 text-center">
                    {ext.anelIdentificacaoCorreto ? 'OK' : 'NÃO'}
                  </td>
                  <td className="border border-slate-300 p-1.5 text-center">
                    {ext.sinalizacaoEDesobstrucaoLivre ? 'SIM' : 'OBSTRUÍDO'}
                  </td>
                  <td className="border border-slate-300 p-1.5">
                    {new Date(ext.dataProximaRecarga).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="border border-slate-300 p-1.5">
                    {new Date(ext.dataTesteHidrostatico).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="border border-slate-300 p-1.5 font-bold">
                    <span className={
                      ext.status === 'Aprovado' 
                        ? 'text-emerald-700' 
                        : ext.status === 'Requer Recarga / Manutenção'
                        ? 'text-amber-700'
                        : 'text-red-700'
                    }>
                      {ext.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Non-conformities & Observations */}
        <div className="space-y-3 mb-6 text-xs">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 border-b border-slate-200 pb-1">
            Irregularidades Constatadas e Plano de Ação Imediato
          </h3>

          <div className="bg-amber-50/50 border border-amber-200 rounded-lg p-3 space-y-2">
            {extintores.filter(e => e.status !== 'Aprovado').map((e) => (
              <div key={e.id} className="flex items-start gap-2">
                <span className="font-bold text-red-700 font-mono shrink-0">[{e.codigoIdentificacao}]:</span>
                <span className="text-slate-800">
                  {e.observacoes || `Identificada não conformidade em ${e.localizacaoSetor}. Realizar recarga e desobstrução imediata.`}
                </span>
              </div>
            ))}
            {extintores.filter(e => e.status !== 'Aprovado').length === 0 && (
              <p className="text-emerald-700 font-medium">
                Nenhuma não conformidade detectada na inspeção do mês corrente. Todos os extintores aptos para pronto uso.
              </p>
            )}
          </div>
        </div>

        {/* Technical Standard Base */}
        <div className="text-[10px] text-slate-500 mb-8 border border-slate-200 p-2.5 rounded bg-slate-50 leading-relaxed">
          <strong>Referência Normativa:</strong> Inspeção realizada com base na Norma Regulamentadora NR-23 (Proteção Contra Incêndios), Portarias Inmetro nº 005/2011 e 500/2012, e Normas Brasileiras ABNT NBR 12962 (Inspeção, Manutenção e Recarga em Extintores) e NBR 15808 (Extintores de Incêndio Portáteis). O contratante deve providenciar a substituição imediata de cilindros interditados por reservas operacionais da mesma classe de fogo.
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-300 text-center text-xs">
          <div>
            <div className="w-48 border-b border-slate-400 mx-auto mb-1"></div>
            <p className="font-bold text-slate-900">{consultoriaSST.responsavelTecnico}</p>
            <p className="text-[10px] text-slate-500">Inspetor de Segurança do Trabalho / SST</p>
            <p className="text-[9px] text-slate-400">{consultoriaSST.registroConselho}</p>
          </div>

          <div>
            <div className="w-48 border-b border-slate-400 mx-auto mb-1"></div>
            <p className="font-bold text-slate-900">{empresa.responsavelSST}</p>
            <p className="text-[10px] text-slate-500">Representante do Empregador / CIPA / Brigada</p>
            <p className="text-[9px] text-slate-400">{empresa.razaoSocial}</p>
          </div>
        </div>

      </div>

      {/* MODAL NOVO EXTINTOR / INSPEÇÃO */}
      {modalNovoAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs no-print">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between sticky top-0 z-10">
              <div className="flex items-center gap-2.5">
                <Flame className="w-5 h-5 text-red-500" />
                <h3 className="font-bold text-sm">Cadastrar Novo Extintor & Registrar Inspeção</h3>
              </div>
              <button 
                onClick={() => setModalNovoAberto(false)}
                className="text-slate-400 hover:text-white p-1 rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSalvarNovo} className="p-6 space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Código / Tag do Extintor:</label>
                  <input
                    type="text"
                    required
                    value={formCodigo}
                    onChange={(e) => setFormCodigo(e.target.value)}
                    placeholder="Ex: EXT-06"
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded font-bold uppercase"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tipo de Carga / Agente:</label>
                  <select
                    value={formTipo}
                    onChange={(e) => setFormTipo(e.target.value as TipoCargaExtintor)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded"
                  >
                    <option value="Pó Químico Seco (PQS) ABC">Pó Químico Seco (PQS) ABC</option>
                    <option value="Água Pressurizada (AP)">Água Pressurizada (AP)</option>
                    <option value="Gás Carbônico (CO2)">Gás Carbônico (CO2)</option>
                    <option value="Pó Químico Seco (PQS) BC">Pó Químico Seco (PQS) BC</option>
                    <option value="Espuma Mecânica">Espuma Mecânica</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Capacidade Nominal:</label>
                  <select
                    value={formCapacidade}
                    onChange={(e) => setFormCapacidade(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded"
                  >
                    <option value="4 kg">4 kg</option>
                    <option value="6 kg">6 kg</option>
                    <option value="10 L">10 Litros</option>
                    <option value="12 kg">12 kg</option>
                    <option value="50 L (Carreta)">50 L (Carreta)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Localização / Setor no Canteiro:</label>
                  <input
                    type="text"
                    required
                    value={formLocal}
                    onChange={(e) => setFormLocal(e.target.value)}
                    placeholder="Ex: Refeitório - Parede Próxima à Cozinha"
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Fabricante:</label>
                  <input
                    type="text"
                    value={formFabricante}
                    onChange={(e) => setFormFabricante(e.target.value)}
                    placeholder="Ex: Kidde, Mocelin, Bucka"
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Nº Cilindro / Estampa:</label>
                  <input
                    type="text"
                    value={formCilindro}
                    onChange={(e) => setFormCilindro(e.target.value)}
                    placeholder="Ex: CIL-892100"
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Selo do Inmetro:</label>
                  <input
                    type="text"
                    value={formSeloInmetro}
                    onChange={(e) => setFormSeloInmetro(e.target.value)}
                    placeholder="Ex: INM-00984210"
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Data da Inspeção:</label>
                  <input
                    type="date"
                    value={formDataInspecao}
                    onChange={(e) => setFormDataInspecao(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Vencimento da Carga / Recarga (Anual):</label>
                  <input
                    type="date"
                    value={formDataRecarga}
                    onChange={(e) => setFormDataRecarga(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Teste Hidrostático (5 anos):</label>
                  <input
                    type="date"
                    value={formDataTeste}
                    onChange={(e) => setFormDataTeste(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded"
                  />
                </div>
              </div>

              {/* Checklist NBR 12962 Items */}
              <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50 space-y-2">
                <span className="font-bold text-slate-800 uppercase text-[11px] block">
                  Checklist de Inspeção Visual (NBR 12962):
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <label className="flex items-center gap-2 p-1.5 bg-white rounded border border-slate-200 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={chkManometro} 
                      onChange={(e) => setChkManometro(e.target.checked)} 
                      className="rounded text-red-600 focus:ring-red-500 w-4 h-4" 
                    />
                    <span>Manômetro na faixa verde (pressurizado)</span>
                  </label>

                  <label className="flex items-center gap-2 p-1.5 bg-white rounded border border-slate-200 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={chkLacre} 
                      onChange={(e) => setChkLacre(e.target.checked)} 
                      className="rounded text-red-600 focus:ring-red-500 w-4 h-4" 
                    />
                    <span>Lacre e pino de segurança intactos</span>
                  </label>

                  <label className="flex items-center gap-2 p-1.5 bg-white rounded border border-slate-200 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={chkAnel} 
                      onChange={(e) => setChkAnel(e.target.checked)} 
                      className="rounded text-red-600 focus:ring-red-500 w-4 h-4" 
                    />
                    <span>Anel plástico na cor do ano vigente</span>
                  </label>

                  <label className="flex items-center gap-2 p-1.5 bg-white rounded border border-slate-200 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={chkMangueira} 
                      onChange={(e) => setChkMangueira(e.target.checked)} 
                      className="rounded text-red-600 focus:ring-red-500 w-4 h-4" 
                    />
                    <span>Mangueira e difusor sem rachaduras/obstrução</span>
                  </label>

                  <label className="flex items-center gap-2 p-1.5 bg-white rounded border border-slate-200 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={chkSuporte} 
                      onChange={(e) => setChkSuporte(e.target.checked)} 
                      className="rounded text-red-600 focus:ring-red-500 w-4 h-4" 
                    />
                    <span>Fixação firme e altura máx. 1,60m</span>
                  </label>

                  <label className="flex items-center gap-2 p-1.5 bg-white rounded border border-slate-200 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={chkSinalizacao} 
                      onChange={(e) => setChkSinalizacao(e.target.checked)} 
                      className="rounded text-red-600 focus:ring-red-500 w-4 h-4" 
                    />
                    <span>Demarcação de solo 1x1m e sinalização livre</span>
                  </label>

                  <label className="flex items-center gap-2 p-1.5 bg-white rounded border border-slate-200 cursor-pointer sm:col-span-2">
                    <input 
                      type="checkbox" 
                      checked={chkCilindro} 
                      onChange={(e) => setChkCilindro(e.target.checked)} 
                      className="rounded text-red-600 focus:ring-red-500 w-4 h-4" 
                    />
                    <span>Cilindro sem corrosão, mossas ou danos mecânicos</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Observações Técnicas / Ações Corretivas:</label>
                <textarea
                  rows={2}
                  value={formObservacoes}
                  onChange={(e) => setFormObservacoes(e.target.value)}
                  placeholder="Ex: Troca de anel realizada, retirada de material que obstruía o extintor..."
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setModalNovoAberto(false)}
                  className="px-4 py-2 bg-slate-200 text-slate-800 rounded font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-bold cursor-pointer shadow-xs"
                >
                  Salvar Extintor e Inspeção
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};

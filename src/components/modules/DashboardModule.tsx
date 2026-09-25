import React from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Users, 
  Calendar, 
  FileText, 
  PlusCircle, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  HardHat, 
  AlertOctagon, 
  Sparkles,
  Printer,
  ChevronRight
} from 'lucide-react';
import { ModuloSST, Empresa, CATRegistro, ExameControle, TreinamentoNR, GRORisco } from '../../types/sst';

interface DashboardModuleProps {
  empresa: Empresa;
  cats: CATRegistro[];
  exames: ExameControle[];
  treinamentos: TreinamentoNR[];
  groRiscos: GRORisco[];
  onNavegar: (modulo: ModuloSST) => void;
  onEmitirNovaCat: () => void;
  onEmitirNovoAso: () => void;
  onNovaApr: () => void;
}

export const DashboardModule: React.FC<DashboardModuleProps> = ({
  empresa,
  cats,
  exames,
  treinamentos,
  groRiscos,
  onNavegar,
  onEmitirNovaCat,
  onEmitirNovoAso,
  onNovaApr
}) => {
  const examesVencidos = exames.filter(e => e.status === 'Vencido').length;
  const examesVencendo = exames.filter(e => e.status === 'Vencendo (30 dias)').length;
  const treinamentosConcluidos = treinamentos.filter(t => t.status === 'Concluído').length;
  const riscosCriticos = groRiscos.filter(r => r.nivelRisco === 'Crítico' || r.nivelRisco === 'Substancial').length;
  const diasSemAcidentes = 42; // standard industrial safety indicator

  return (
    <div className="space-y-6">
      
      {/* Top Welcome Banner with Brand Identity */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 rounded-2xl p-6 text-white shadow-sm border border-slate-800 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Painel Integrado de SST & eSocial
              </span>
              <span className="text-slate-400 text-xs font-mono">
                Portaria MTP 4.219/2022
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Gestão de Segurança e Saúde no Trabalho
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              Sistema completo para emissão de laudos, programas legais (PCMSO, LTCAT, GRO/PGR), CAT (eSocial S-2210), ASOs com exames e capacitação em NRs.
            </p>
          </div>

          {/* Quick Primary Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onEmitirNovaCat}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              <AlertOctagon className="w-4 h-4" />
              Emitir Nova CAT
            </button>
            <button
              onClick={onEmitirNovoAso}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              Emitir ASO
            </button>
            <button
              onClick={onNovaApr}
              className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer"
            >
              <HardHat className="w-4 h-4" />
              Nova APR
            </button>
          </div>
        </div>

        {/* Subtle decorative background glow */}
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Days without accidents */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Dias Sem Acidentes
            </span>
            <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{diasSemAcidentes}</span>
            <span className="text-xs text-emerald-600 font-bold">Dias contínuos</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Meta interna: 365 dias sem acidentes com afastamento
          </p>
        </div>

        {/* Metric 2: Medical exams status */}
        <div 
          onClick={() => onNavegar('exames')}
          className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-amber-300 hover:shadow-sm transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Controle de Exames
            </span>
            <span className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-3">
            <div className="flex items-center gap-1">
              <span className="text-3xl font-extrabold text-red-600">{examesVencidos}</span>
              <span className="text-xs text-red-600 font-bold">vencidos</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-2xl font-bold text-amber-500">{examesVencendo}</span>
              <span className="text-xs text-amber-600 font-semibold">em 30d</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-1 flex items-center gap-1 group-hover:text-amber-700">
            Monitoramento periódico NR-07 <ChevronRight className="w-3 h-3 inline" />
          </p>
        </div>

        {/* Metric 3: Treinamentos & NRs */}
        <div 
          onClick={() => onNavegar('treinamentos')}
          className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-emerald-300 hover:shadow-sm transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Capacitações / NRs
            </span>
            <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <HardHat className="w-5 h-5" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{treinamentosConcluidos}</span>
            <span className="text-xs text-indigo-600 font-semibold">Turmas certificadas</span>
          </div>
          <p className="text-xs text-slate-500 mt-1 flex items-center gap-1 group-hover:text-indigo-600">
            NR-35, NR-33, NR-10 e EPIs <ChevronRight className="w-3 h-3 inline" />
          </p>
        </div>

        {/* Metric 4: GRO / Riscos Críticos */}
        <div 
          onClick={() => onNavegar('gro')}
          className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-red-300 hover:shadow-sm transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              GRO / Riscos Mapeados
            </span>
            <span className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{groRiscos.length}</span>
            <span className="text-xs text-red-600 font-bold">{riscosCriticos} riscos altos</span>
          </div>
          <p className="text-xs text-slate-500 mt-1 flex items-center gap-1 group-hover:text-red-700">
            Inventário e Plano de Ação 5W2H <ChevronRight className="w-3 h-3 inline" />
          </p>
        </div>

      </div>

      {/* Grid of All Core Modules Requested by the User */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">
            Módulos de Gestão e Documentação de SST
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            Selecione o módulo para emissão ou controle técnico
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Module: NRs */}
          <div 
            onClick={() => onNavegar('nrs')}
            className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-500 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-lg bg-slate-100 text-slate-800 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors">
                  <FileText className="w-5 h-5" />
                </span>
                <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  NR-01 à NR-38
                </span>
              </div>
              <h3 className="font-bold text-slate-900 mt-3 text-base group-hover:text-emerald-700">
                Normas Regulamentadoras (NRs)
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Catálogo completo de todas as 38 NRs vigentes pelo MTE, resumos práticos, requisitos e manuais de conformidade.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-700 font-semibold">
              <span>Consultar NRs</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Module: EMITIR CAT */}
          <div 
            onClick={() => onNavegar('cat')}
            className="bg-white p-5 rounded-xl border-2 border-red-200 shadow-xs hover:shadow-md hover:border-red-500 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-lg bg-red-50 text-red-700">
                  <AlertOctagon className="w-5 h-5" />
                </span>
                <span className="text-[11px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded">
                  eSocial S-2210
                </span>
              </div>
              <h3 className="font-bold text-slate-900 mt-3 text-base group-hover:text-red-700">
                Emitir CAT
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Comunicação de Acidente de Trabalho oficial. Layout compatível com Previdência Social, atestado CID-10 e exportação.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-red-700 font-bold">
              <span>Emitir Comunicação</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Module: LTCAT */}
          <div 
            onClick={() => onNavegar('ltcat')}
            className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-500 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-lg bg-slate-100 text-slate-800 group-hover:bg-emerald-50 group-hover:text-emerald-700">
                  <ShieldCheck className="w-5 h-5" />
                </span>
                <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  INSS / S-2240
                </span>
              </div>
              <h3 className="font-bold text-slate-900 mt-3 text-base group-hover:text-emerald-700">
                LTCAT
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Laudo Técnico das Condições Ambientais do Trabalho. Medições dosimétricas de ruído, calor, químicos e conclusão previdenciária.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-700 font-semibold">
              <span>Gerenciar LTCAT</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Module: PCMSO */}
          <div 
            onClick={() => onNavegar('pcmso')}
            className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-500 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-lg bg-slate-100 text-slate-800 group-hover:bg-emerald-50 group-hover:text-emerald-700">
                  <FileText className="w-5 h-5" />
                </span>
                <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  NR-07
                </span>
              </div>
              <h3 className="font-bold text-slate-900 mt-3 text-base group-hover:text-emerald-700">
                PCMSO
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Programa de Controle Médico de Saúde Ocupacional. Matriz de exames clínicos por cargo e cronograma de campanhas de saúde.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-700 font-semibold">
              <span>Acessar PCMSO</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Module: ASO */}
          <div 
            onClick={() => onNavegar('aso')}
            className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-500 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-lg bg-slate-100 text-slate-800 group-hover:bg-emerald-50 group-hover:text-emerald-700">
                  <Users className="w-5 h-5" />
                </span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Emissão A4
                </span>
              </div>
              <h3 className="font-bold text-slate-900 mt-3 text-base group-hover:text-emerald-700">
                ASO (Atestado de Saúde)
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Emissor de ASO com 1ª via (empresa) e 2ª via (trabalhador), parecer de aptidão para Altura (NR-35) e Espaço Confinado (NR-33).
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-700 font-semibold">
              <span>Emitir Atestado</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Module: GRO / PGR */}
          <div 
            onClick={() => onNavegar('gro')}
            className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-500 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-lg bg-slate-100 text-slate-800 group-hover:bg-emerald-50 group-hover:text-emerald-700">
                  <AlertTriangle className="w-5 h-5" />
                </span>
                <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  NR-01 / PGR
                </span>
              </div>
              <h3 className="font-bold text-slate-900 mt-3 text-base group-hover:text-emerald-700">
                GRO / PGR
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Gerenciamento de Riscos Ocupacionais. Matriz 5x5 de probabilidade e severidade, inventário de riscos e plano 5W2H.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-700 font-semibold">
              <span>Ver Matriz de Riscos</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Module: APR */}
          <div 
            onClick={() => onNavegar('apr')}
            className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-500 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-lg bg-slate-100 text-slate-800 group-hover:bg-emerald-50 group-hover:text-emerald-700">
                  <HardHat className="w-5 h-5" />
                </span>
                <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  PT Liberada
                </span>
              </div>
              <h3 className="font-bold text-slate-900 mt-3 text-base group-hover:text-emerald-700">
                APR (Análise Preliminar)
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Análise Preliminar de Risco para trabalhos críticos (altura, espaço confinado, quente, elétrico), etapas e medidas de proteção.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-700 font-semibold">
              <span>Gerar e Emitir APR</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Module: Checklists */}
          <div 
            onClick={() => onNavegar('checklists')}
            className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-500 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-lg bg-slate-100 text-slate-800 group-hover:bg-emerald-50 group-hover:text-emerald-700">
                  <CheckCircle2 className="w-5 h-5" />
                </span>
                <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  Auditorias
                </span>
              </div>
              <h3 className="font-bold text-slate-900 mt-3 text-base group-hover:text-emerald-700">
                Checklists de Inspeção
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Listas de verificação diárias e periódicas de EPIs, extintores, andaimes, canteiros de obras e máquinas com cálculo de conformidade.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-700 font-semibold">
              <span>Realizar Inspeção</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Module: Treinamentos/NRs */}
          <div 
            onClick={() => onNavegar('treinamentos')}
            className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-500 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-lg bg-slate-100 text-slate-800 group-hover:bg-emerald-50 group-hover:text-emerald-700">
                  <HardHat className="w-5 h-5" />
                </span>
                <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  Certificados
                </span>
              </div>
              <h3 className="font-bold text-slate-900 mt-3 text-base group-hover:text-emerald-700">
                Treinamentos & NRs
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Gestão de cursos obrigatórios de NR-35, NR-33, NR-10, NR-12 com emissão de Certificado Oficial com verso programático.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-700 font-semibold">
              <span>Turmas & Certificados</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Module: Controle de Exames */}
          <div 
            onClick={() => onNavegar('exames')}
            className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-500 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-lg bg-slate-100 text-slate-800 group-hover:bg-emerald-50 group-hover:text-emerald-700">
                  <Clock className="w-5 h-5" />
                </span>
                <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                  Alertas de Prazo
                </span>
              </div>
              <h3 className="font-bold text-slate-900 mt-3 text-base group-hover:text-emerald-700">
                Controle de Exames
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Acompanhamento de exames clínicos periódicos e complementares dos funcionários com alerta visual de vencimentos próximos.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-700 font-semibold">
              <span>Ver Calendário de Exames</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Module: Gestão de Documentos */}
          <div 
            onClick={() => onNavegar('documentos')}
            className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-500 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-lg bg-slate-100 text-slate-800 group-hover:bg-emerald-50 group-hover:text-emerald-700">
                  <FileText className="w-5 h-5" />
                </span>
                <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  GED SST
                </span>
              </div>
              <h3 className="font-bold text-slate-900 mt-3 text-base group-hover:text-emerald-700">
                Gestão de Documentos
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Armazenamento seguro de laudos, programas (PGR, PCMSO, LTCAT, AET), controle de vigências anuais e downloads.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-700 font-semibold">
              <span>Repositório de Laudos</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

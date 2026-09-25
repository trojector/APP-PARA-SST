import React, { useState } from 'react';
import { 
  Stethoscope, 
  Printer, 
  Calendar, 
  UserCheck, 
  CheckCircle2, 
  Activity, 
  HeartPulse, 
  Users, 
  Building2,
  PlusCircle,
  FileText,
  FileDown
} from 'lucide-react';
import { PCMSOPrograma, Empresa } from '../../types/sst';
import { PrintHeader } from '../common/PrintHeader';

interface PcmsoModuleProps {
  empresa: Empresa;
  pcmso: PCMSOPrograma;
  onImprimir: () => void;
  onGerarPdf?: () => void;
  onEmitirAsoParaCargo: (cargo: string) => void;
}

export const PcmsoModule: React.FC<PcmsoModuleProps> = ({
  empresa,
  pcmso,
  onImprimir,
  onGerarPdf,
  onEmitirAsoParaCargo
}) => {
  const [abaAtiva, setAbaAtiva] = useState<'matriz' | 'cronograma' | 'relatorio'>('matriz');

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 no-print">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
            <Stethoscope className="w-5 h-5" />
          </span>
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              PCMSO (Programa de Controle Médico de Saúde Ocupacional - NR-07)
            </h1>
            <p className="text-xs text-slate-500">
              Vigência {pcmso.anoVigencia} • Médico Coordenador: {pcmso.medicoCoordenador} ({pcmso.crmCoordenador})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onGerarPdf && (
            <button
              onClick={onGerarPdf}
              className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white px-3.5 py-2 rounded-lg text-xs font-bold shadow-xs cursor-pointer"
              title="Gerar e salvar documento do PCMSO em PDF"
            >
              <FileDown className="w-4 h-4" />
              <span>Gerar PDF</span>
            </button>
          )}
          <button
            onClick={onImprimir}
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2 rounded-lg text-xs font-bold shadow-xs cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            Imprimir Programa PCMSO
          </button>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 no-print">
        <button
          onClick={() => setAbaAtiva('matriz')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
            abaAtiva === 'matriz' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Matriz de Exames por Cargo e Riscos
        </button>
        <button
          onClick={() => setAbaAtiva('cronograma')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
            abaAtiva === 'cronograma' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Cronograma Anual de Campanhas de Saúde
        </button>
        <button
          onClick={() => setAbaAtiva('relatorio')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
            abaAtiva === 'relatorio' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Relatório Analítico Anual (NR-07.7)
        </button>
      </div>

      {/* Main Printable Container */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm print-page">
        
        <PrintHeader
          tituloDocumento="PROGRAMA DE CONTROLE MÉDICO DE SAÚDE OCUPACIONAL - PCMSO"
          subtituloDocumento={`Norma Regulamentadora nº 07 / Exercício ${pcmso.anoVigencia}`}
          codigoDocumento={`PCMSO Nº ${pcmso.anoVigencia}`}
          empresa={empresa}
        />

        {/* Technical Data of the Coordinator Physician */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Médico Coordenador do PCMSO:</span>
            <span className="font-bold text-slate-900">{pcmso.medicoCoordenador}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 block">CRM / Registro RQE:</span>
            <span className="font-medium text-slate-800">{pcmso.crmCoordenador} • RQE {pcmso.rqeCoordenador}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Clínica Credenciada / Coleta:</span>
            <span className="font-medium text-slate-800">{pcmso.clinicaConveniada}</span>
          </div>
        </div>

        {/* Tab 1: Matriz de Exames por Cargo */}
        {abaAtiva === 'matriz' && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-emerald-600" />
              1. Planejamento de Exames Clínicos e Complementares por Função
            </h3>

            <div className="space-y-3">
              {pcmso.cargosExames.map((item, idx) => (
                <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                  <div className="bg-slate-100 p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200">
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">{item.cargo}</h4>
                      <p className="text-[11px] text-slate-500">Setor: {item.setor}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onEmitirAsoParaCargo(item.cargo)}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold px-2.5 py-1 rounded no-print cursor-pointer"
                      >
                        Emitir ASO para este Cargo
                      </button>
                    </div>
                  </div>

                  <div className="p-3 bg-white text-xs space-y-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                        Riscos Mapeados pelo PGR:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {item.riscos.map((r, rIdx) => (
                          <span key={rIdx} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-medium border border-slate-200">
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                        Exames Obrigatórios e Periodicidade:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {item.examesObrigatorios.map((ex, exIdx) => (
                          <div key={exIdx} className="bg-emerald-50/60 border border-emerald-100 rounded-lg p-2 flex items-center justify-between">
                            <span className="font-semibold text-emerald-950 text-[11px]">{ex.tipoExame}</span>
                            <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-1.5 py-0.5 rounded">
                              {ex.periodicidade}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Cronograma Anual */}
        {abaAtiva === 'cronograma' && (
          <div className="space-y-4 text-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-emerald-600" />
              2. Cronograma de Ações e Campanhas de Saúde no Trabalho (NR-07)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-100 text-slate-700 font-bold">
                  <tr>
                    <th className="p-2.5">Mês</th>
                    <th className="p-2.5">Campanha / Ação Preventiva</th>
                    <th className="p-2.5">Público Alvo</th>
                    <th className="p-2.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {pcmso.acoesSaudeCronograma.map((ac, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-2.5 font-bold text-slate-800">{ac.mes}</td>
                      <td className="p-2.5 text-slate-800">{ac.acao}</td>
                      <td className="p-2.5 text-slate-600">{ac.publicoAlvo}</td>
                      <td className="p-2.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          ac.status === 'Realizado' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {ac.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Relatório Analítico */}
        {abaAtiva === 'relatorio' && (
          <div className="space-y-4 text-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <HeartPulse className="w-4 h-4 text-emerald-600" />
              3. Relatório Analítico Anual do PCMSO (Subitem 7.7.1)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="text-2xl font-black text-slate-900 block">184</span>
                <span className="text-[11px] text-slate-500 font-medium">Exames Ocupacionais Realizados</span>
              </div>
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
                <span className="text-2xl font-black text-emerald-700 block">97.8%</span>
                <span className="text-[11px] text-emerald-800 font-medium">Taxa de Aptidão Sem Restrição</span>
              </div>
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-center">
                <span className="text-2xl font-black text-amber-700 block">0</span>
                <span className="text-[11px] text-amber-800 font-medium">Casos de Doença Ocupacional Confirmada</span>
              </div>
            </div>

            <p className="text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
              O monitoramento biológico e audiológico dos trabalhadores da <strong>{empresa.razaoSocial}</strong> demonstrou estabilidade dos limiares auditivos (PCA eficaz) e ausência de alterações espirométricas relacionadas à inalação de fumos de solda. As ações preventivas de hidratação e ergonomia reduziram queixas osteomusculares em 40%.
            </p>
          </div>
        )}

        {/* Signatures */}
        <div className="pt-8 text-center max-w-sm mx-auto">
          <div className="border-t border-slate-400 pt-2">
            <p className="font-bold text-slate-900">{pcmso.medicoCoordenador}</p>
            <p className="text-[10px] text-slate-600">{pcmso.crmCoordenador} • RQE {pcmso.rqeCoordenador}</p>
            <p className="text-[10px] text-slate-500">Médico do Trabalho - Coordenador do PCMSO</p>
          </div>
        </div>

      </div>

    </div>
  );
};

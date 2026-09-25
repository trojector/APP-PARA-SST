import React, { useState } from 'react';
import { 
  CheckSquare, 
  PlusCircle, 
  Printer, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  MinusCircle, 
  ArrowLeft,
  Calendar,
  Percent,
  Search,
  Filter,
  FileDown
} from 'lucide-react';
import { ChecklistInspecao, Empresa } from '../../types/sst';
import { PrintHeader } from '../common/PrintHeader';

interface ChecklistsModuleProps {
  empresa: Empresa;
  checklists: ChecklistInspecao[];
  onAtualizarChecklist: (checklist: ChecklistInspecao) => void;
  onAdicionarChecklist: (checklist: ChecklistInspecao) => void;
  onImprimir: () => void;
  onGerarPdf?: () => void;
}

export const ChecklistsModule: React.FC<ChecklistsModuleProps> = ({
  empresa,
  checklists,
  onAtualizarChecklist,
  onAdicionarChecklist,
  onImprimir,
  onGerarPdf
}) => {
  const [checklistSelecionado, setChecklistSelecionado] = useState<ChecklistInspecao>(checklists[0]);

  // Toggle item status in active checklist
  const handleMudarStatusItem = (itemId: string, novoStatus: 'Conforme' | 'Não Conforme' | 'Não Aplicável') => {
    const novosItens = checklistSelecionado.itens.map(it => {
      if (it.id === itemId) {
        return { ...it, status: novoStatus };
      }
      return it;
    });

    const totalAvaliados = novosItens.filter(i => i.status !== 'Não Aplicável').length;
    const totalConformes = novosItens.filter(i => i.status === 'Conforme').length;
    const taxa = totalAvaliados > 0 ? Math.round((totalConformes / totalAvaliados) * 100) : 100;

    const checklistAtualizado: ChecklistInspecao = {
      ...checklistSelecionado,
      itens: novosItens,
      conformidadePercentual: taxa,
      statusGeral: taxa >= 90 ? 'Aprovado' : taxa >= 70 ? 'Aprovado com Ressalvas' : 'Interditado / Reprovado'
    };

    setChecklistSelecionado(checklistAtualizado);
    onAtualizarChecklist(checklistAtualizado);
  };

  return (
    <div className="space-y-6">
      
      {/* Title Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 no-print">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
            <CheckSquare className="w-5 h-5" />
          </span>
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Checklists e Inspeções de Segurança (NRs)
            </h1>
            <p className="text-xs text-slate-500">
              Auditorias de campo para NR-12, NR-35, NR-23, NR-10 e frotas operacionais
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onGerarPdf && (
            <button
              onClick={onGerarPdf}
              className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white px-3.5 py-2 rounded-lg text-xs font-semibold cursor-pointer shadow-xs"
              title="Gerar e salvar arquivo PDF do checklist"
            >
              <FileDown className="w-4 h-4" />
              <span>Gerar PDF</span>
            </button>
          )}
          <button
            onClick={onImprimir}
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2 rounded-lg text-xs font-semibold cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            Imprimir Relatório
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Checklists Available */}
        <div className="lg:col-span-4 space-y-2 no-print">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Modelos de Inspeção ({checklists.length})
          </h3>
          {checklists.map((c) => (
            <div
              key={c.id}
              onClick={() => setChecklistSelecionado(c)}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                checklistSelecionado.id === c.id
                  ? 'bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  {c.categoria}
                </span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  c.conformidadePercentual >= 90
                    ? 'bg-emerald-100 text-emerald-800'
                    : c.conformidadePercentual >= 70
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {c.conformidadePercentual}% Conforme
                </span>
              </div>
              <p className="font-bold text-xs text-slate-900 mt-1">{c.titulo}</p>
              <p className="text-[11px] text-slate-500">Inspetor: {c.inspetor}</p>
              <div className="mt-2 text-[10px] text-slate-400">
                Última auditoria: {new Date(c.data).toLocaleDateString('pt-BR')}
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Active Checklist Sheet */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm print-page">
            
            <PrintHeader
              tituloDocumento={`CHECKLIST DE INSPEÇÃO E CONFORMIDADE - ${checklistSelecionado.categoria}`}
              subtituloDocumento={checklistSelecionado.titulo}
              codigoDocumento={`CHK-${checklistSelecionado.id.toUpperCase()}`}
              empresa={empresa}
              onImprimir={onImprimir}
              onGerarPdf={onGerarPdf}
            />

            {/* Checklist Meta Info */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Inspetor Técnico:</span>
                <span className="font-bold text-slate-800">{checklistSelecionado.inspetor}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Local:</span>
                <span className="text-slate-800 font-medium">{checklistSelecionado.local}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Data de Realização:</span>
                <span className="text-slate-800 font-medium">
                  {new Date(checklistSelecionado.data).toLocaleDateString('pt-BR')}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Taxa de Conformidade:</span>
                <span className="font-extrabold text-emerald-700 text-sm">
                  {checklistSelecionado.conformidadePercentual}% ({checklistSelecionado.statusGeral})
                </span>
              </div>
            </div>

            {/* Items Table with Interactive Toggles */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Itens Verificados e Critérios de Aceitação
              </h3>

              <div className="space-y-2">
                {checklistSelecionado.itens.map((item, idx) => (
                  <div 
                    key={item.id}
                    className={`p-3 rounded-lg border transition-colors ${
                      item.status === 'Não Conforme'
                        ? 'bg-red-50/50 border-red-200'
                        : item.status === 'Conforme'
                        ? 'bg-white border-slate-200'
                        : 'bg-slate-50 border-slate-200 opacity-70'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex-1">
                        <span className="font-bold text-slate-800 text-xs mr-2">
                          {idx + 1}. {item.descricao}
                        </span>
                        <span className="text-[10px] text-slate-500 block">
                          Critério: {item.criterio}
                        </span>
                        {item.observacao && (
                          <p className="text-[11px] text-red-600 mt-1 font-medium">
                            Obs: {item.observacao}
                          </p>
                        )}
                      </div>

                      {/* Status Badges / Clickable in screen mode */}
                      <div className="flex items-center gap-1 shrink-0 no-print">
                        <button
                          type="button"
                          onClick={() => handleMudarStatusItem(item.id, 'Conforme')}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-bold cursor-pointer transition-all ${
                            item.status === 'Conforme'
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-emerald-100'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Conforme
                        </button>

                        <button
                          type="button"
                          onClick={() => handleMudarStatusItem(item.id, 'Não Conforme')}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-bold cursor-pointer transition-all ${
                            item.status === 'Não Conforme'
                              ? 'bg-red-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-red-100'
                          }`}
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          Não Conforme
                        </button>

                        <button
                          type="button"
                          onClick={() => handleMudarStatusItem(item.id, 'Não Aplicável')}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-bold cursor-pointer transition-all ${
                            item.status === 'Não Aplicável'
                              ? 'bg-slate-700 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          <MinusCircle className="w-3.5 h-3.5" />
                          N/A
                        </button>
                      </div>

                      {/* Print only representation */}
                      <div className="hidden print:block font-bold text-[11px]">
                        [{item.status === 'Conforme' ? 'X' : ' '}] C &nbsp;
                        [{item.status === 'Não Conforme' ? 'X' : ' '}] NC &nbsp;
                        [{item.status === 'Não Aplicável' ? 'X' : ' '}] N/A
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Observações e Ação Corretiva */}
            {checklistSelecionado.acoesCorretivas && (
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900">
                <span className="font-bold block text-[10px] uppercase tracking-wider mb-1">
                  Ações Corretivas Recomendadas:
                </span>
                {checklistSelecionado.acoesCorretivas}
              </div>
            )}

            {/* Signatures */}
            <div className="pt-8 grid grid-cols-2 gap-6 text-center text-xs">
              <div className="border-t border-slate-400 pt-2">
                <p className="font-bold text-slate-900">{checklistSelecionado.inspetor}</p>
                <p className="text-[10px] text-slate-500">Técnico / Auditor Responsável</p>
              </div>
              <div className="border-t border-slate-400 pt-2">
                <p className="font-bold text-slate-900">Responsável pelo Setor / Equipamento</p>
                <p className="text-[10px] text-slate-500">Ciente das Não Conformidades Apontadas</p>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

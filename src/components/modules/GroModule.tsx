import React, { useState } from 'react';
import { 
  ShieldAlert, 
  PlusCircle, 
  Printer, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ArrowLeft,
  Filter,
  Grid,
  FileSpreadsheet,
  FileDown
} from 'lucide-react';
import { GRORisco, Empresa } from '../../types/sst';
import { PrintHeader } from '../common/PrintHeader';

interface GroModuleProps {
  empresa: Empresa;
  riscos: GRORisco[];
  onAdicionarRisco: (novoRisco: GRORisco) => void;
  onImprimir: () => void;
  onGerarPdf?: () => void;
}

export const GroModule: React.FC<GroModuleProps> = ({
  empresa,
  riscos,
  onAdicionarRisco,
  onImprimir,
  onGerarPdf
}) => {
  const [modoCriacao, setModoCriacao] = useState(false);
  const [filtroNivel, setFiltroNivel] = useState<string>('Todos');

  // Form states
  const [setor, setSetor] = useState('Montagem Estrutural');
  const [atividade, setAtividade] = useState('Elevação e fixação de vigas metálicas');
  const [fatorRisco, setFatorRisco] = useState('Queda de material / ferramentas em nível superior');
  const [tipoRisco, setTipoRisco] = useState<'Físico' | 'Químico' | 'Biológico' | 'Ergonômico' | 'Acidente/Mecânico'>('Acidente/Mecânico');
  const [fonteGeradora, setFonteGeradora] = useState('Manuseio de parafusos e chaves de impacto a 12 metros');
  const [possiveisDanos, setPossiveisDanos] = useState('Lesões corporais, corte contuso e esmagamento');
  const [probabilidade, setProbabilidade] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [severidade, setSeveridade] = useState<1 | 2 | 3 | 4 | 5>(4);
  const [medidasExistentes, setMedidasExistentes] = useState('Uso de capacete e botas de bico de aço');
  const [medidasPropostas, setMedidasPropostas] = useState('Amarração obrigatória de 100% das ferramentas manuais e tela aparalixo');
  const [oquePlano, setOquePlano] = useState('Adquirir cordins e bolsas porta-ferramentas com fecho rápido');
  const [responsavelPlano, setResponsavelPlano] = useState('Coordenação de Obras');
  const [prazoPlano, setPrazoPlano] = useState('2026-10-20');

  // Risk matrix calculation
  const calcularNivel = (p: number, s: number): 'Trivial' | 'Tolerável' | 'Moderado' | 'Substancial' | 'Crítico' => {
    const score = p * s;
    if (score <= 4) return 'Trivial';
    if (score <= 9) return 'Tolerável';
    if (score <= 14) return 'Moderado';
    if (score <= 19) return 'Substancial';
    return 'Crítico';
  };

  const handleSalvarRisco = (e: React.FormEvent) => {
    e.preventDefault();
    const nivel = calcularNivel(probabilidade, severidade);
    const novo: GRORisco = {
      id: `gro-${Date.now()}`,
      setor,
      atividade,
      fatorRisco,
      tipoRisco,
      fonteGeradora,
      possiveisDanos,
      probabilidade,
      severidade,
      nivelRisco: nivel,
      medidasExistentes,
      medidasPropostas,
      planoAcao: {
        oque: oquePlano,
        como: 'Procedimento operacional e compra de EPIs adequados',
        responsavel: responsavelPlano,
        prazo: prazoPlano,
        status: 'Em Andamento'
      }
    };

    onAdicionarRisco(novo);
    setModoCriacao(false);
  };

  const riscosFiltrados = riscos.filter(r => {
    if (filtroNivel === 'Todos') return true;
    return r.nivelRisco === filtroNivel;
  });

  return (
    <div className="space-y-6">
      
      {/* Title Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 no-print">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
            <ShieldAlert className="w-5 h-5" />
          </span>
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              GRO (Gerenciamento de Riscos Ocupacionais / PGR - NR-01)
            </h1>
            <p className="text-xs text-slate-500">
              Inventário Geral de Riscos, Matriz de Probabilidade x Severidade e Plano de Ação 5W2H
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!modoCriacao ? (
            <>
              <button
                onClick={() => setModoCriacao(true)}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-lg text-xs font-bold shadow-xs cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                Mapear Novo Risco
              </button>
              {onGerarPdf && (
                <button
                  onClick={onGerarPdf}
                  className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white px-3.5 py-2 rounded-lg text-xs font-semibold cursor-pointer shadow-xs"
                  title="Gerar e salvar inventário PGR em PDF"
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
                Imprimir Inventário PGR
              </button>
            </>
          ) : (
            <button
              onClick={() => setModoCriacao(false)}
              className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar ao Inventário
            </button>
          )}
        </div>
      </div>

      {modoCriacao ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 no-print">
          <h2 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
            Identificação e Avaliação de Risco Ocupacional (NR-01.5)
          </h2>

          <form onSubmit={handleSalvarRisco} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Setor</label>
                <input
                  type="text"
                  value={setor}
                  onChange={(e) => setSetor(e.target.value)}
                  required
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Atividade Operacional</label>
                <input
                  type="text"
                  value={atividade}
                  onChange={(e) => setAtividade(e.target.value)}
                  required
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tipo de Risco</label>
                <select
                  value={tipoRisco}
                  onChange={(e) => setTipoRisco(e.target.value as any)}
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                >
                  <option value="Acidente/Mecânico">Acidente / Mecânico</option>
                  <option value="Físico">Físico</option>
                  <option value="Químico">Químico</option>
                  <option value="Ergonômico">Ergonômico</option>
                  <option value="Biológico">Biológico</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Fator de Risco / Perigo</label>
                <input
                  type="text"
                  value={fatorRisco}
                  onChange={(e) => setFatorRisco(e.target.value)}
                  required
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Fonte Geradora</label>
                <input
                  type="text"
                  value={fonteGeradora}
                  onChange={(e) => setFonteGeradora(e.target.value)}
                  required
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                />
              </div>
            </div>

            {/* Matriz 5x5 */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Probabilidade (1: Muito Baixa a 5: Muito Alta)
                </label>
                <select
                  value={probabilidade}
                  onChange={(e) => setProbabilidade(Number(e.target.value) as any)}
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white font-bold"
                >
                  <option value="1">1 - Muito Baixa (Quase improvável)</option>
                  <option value="2">2 - Baixa (Rara ocorrência)</option>
                  <option value="3">3 - Média (Pode ocorrer ocasionalmente)</option>
                  <option value="4">4 - Alta (Frequente na rotina)</option>
                  <option value="5">5 - Muito Alta (Exposição contínua sem barreira)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Severidade (1: Leve a 5: Catastrófica)
                </label>
                <select
                  value={severidade}
                  onChange={(e) => setSeveridade(Number(e.target.value) as any)}
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white font-bold"
                >
                  <option value="1">1 - Leve (Primeiros socorros sem afastamento)</option>
                  <option value="2">2 - Menor (Afastamento temporário leve)</option>
                  <option value="3">3 - Moderada (Lesão reversível com afastamento)</option>
                  <option value="4">4 - Grave (Incapacidade permanente parcial/total)</option>
                  <option value="5">5 - Catastrófica (Morte ou fatalidade múltipla)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nível de Risco Resultante</label>
                <div className={`p-2 rounded-lg text-center font-extrabold text-xs text-white ${
                  calcularNivel(probabilidade, severidade) === 'Crítico' ? 'bg-red-600' :
                  calcularNivel(probabilidade, severidade) === 'Substancial' ? 'bg-amber-600' :
                  calcularNivel(probabilidade, severidade) === 'Moderado' ? 'bg-yellow-500 text-slate-900' : 'bg-emerald-600'
                }`}>
                  {calcularNivel(probabilidade, severidade)} ({probabilidade * severidade} pts)
                </div>
              </div>
            </div>

            {/* Plano de Ação 5W2H */}
            <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200 space-y-3">
              <h3 className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                Plano de Ação Preventiva (PGR)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Ação Preventiva (O quê fazer?)</label>
                  <input
                    type="text"
                    value={oquePlano}
                    onChange={(e) => setOquePlano(e.target.value)}
                    required
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Responsável</label>
                  <input
                    type="text"
                    value={responsavelPlano}
                    onChange={(e) => setResponsavelPlano(e.target.value)}
                    required
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setModoCriacao(false)}
                className="px-4 py-2 text-xs text-slate-600 font-semibold"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-lg text-xs font-bold shadow-md cursor-pointer"
              >
                Incluir no Inventário do GRO
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm print-page">
          
          <PrintHeader
            tituloDocumento="GERENCIAMENTO DE RISCOS OCUPACIONAIS - INVENTÁRIO DE RISCOS DO PGR"
            subtituloDocumento="Norma Regulamentadora nº 01 (Portaria MTP 4.219/2022)"
            codigoDocumento="GRO-PGR-2026"
            empresa={empresa}
          />

          {/* Matrix Filter Pills */}
          <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-200 no-print overflow-x-auto">
            <span className="text-xs font-bold text-slate-500 mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filtrar por Nível:
            </span>
            {['Todos', 'Crítico', 'Substancial', 'Moderado', 'Tolerável', 'Trivial'].map(lvl => (
              <button
                key={lvl}
                onClick={() => setFiltroNivel(lvl)}
                className={`px-2.5 py-1 rounded text-xs font-medium cursor-pointer ${
                  filtroNivel === lvl ? 'bg-slate-900 text-white font-bold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          {/* Table of Risks */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-300">
                <tr>
                  <th className="p-3">Setor / Atividade</th>
                  <th className="p-3">Perigo / Risco</th>
                  <th className="p-3">Tipo</th>
                  <th className="p-3 text-center">Matriz P x S</th>
                  <th className="p-3">Nível de Risco</th>
                  <th className="p-3">Plano de Ação (5W2H)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {riscosFiltrados.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/70">
                    <td className="p-3">
                      <span className="font-bold text-slate-900 block">{r.setor}</span>
                      <span className="text-[11px] text-slate-500">{r.atividade}</span>
                    </td>
                    <td className="p-3">
                      <span className="font-semibold text-slate-800 block">{r.fatorRisco}</span>
                      <span className="text-[10px] text-slate-500">Fonte: {r.fonteGeradora}</span>
                    </td>
                    <td className="p-3">
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-medium">
                        {r.tipoRisco}
                      </span>
                    </td>
                    <td className="p-3 text-center font-mono font-bold text-slate-700">
                      {r.probabilidade} x {r.severidade}
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded text-[10px] font-extrabold uppercase ${
                        r.nivelRisco === 'Crítico' ? 'bg-red-100 text-red-800 border border-red-300' :
                        r.nivelRisco === 'Substancial' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                        r.nivelRisco === 'Moderado' ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' :
                        'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      }`}>
                        {r.nivelRisco}
                      </span>
                    </td>
                    <td className="p-3">
                      <p className="text-[11px] text-slate-800 font-medium">{r.planoAcao.oque}</p>
                      <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-500">
                        <span>Resp: {r.planoAcao.responsavel}</span>
                        <span>Prazo: {new Date(r.planoAcao.prazo).toLocaleDateString('pt-BR')}</span>
                        <span className="font-bold text-emerald-700">({r.planoAcao.status})</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

    </div>
  );
};

import React, { useState, useMemo } from 'react';
import { 
  HeartPulse, 
  PlusCircle, 
  Printer, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter, 
  Calendar, 
  Mail, 
  User,
  ArrowRight,
  FileDown
} from 'lucide-react';
import { ExameControle, Empresa, Colaborador } from '../../types/sst';
import { PrintHeader } from '../common/PrintHeader';

interface ControleExamesModuleProps {
  empresa: Empresa;
  colaboradores: Colaborador[];
  exames: ExameControle[];
  onAdicionarExame: (novo: ExameControle) => void;
  onImprimir: () => void;
  onGerarPdf?: () => void;
  onEmitirAso: (colaboradorNome: string) => void;
}

export const ControleExamesModule: React.FC<ControleExamesModuleProps> = ({
  empresa,
  colaboradores,
  exames,
  onAdicionarExame,
  onImprimir,
  onGerarPdf,
  onEmitirAso
}) => {
  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState<string>('Todos');
  const [modoCriacao, setModoCriacao] = useState(false);

  // Form states
  const [colaboradorId, setColaboradorId] = useState(colaboradores[0]?.id || '');
  const [tipoExame, setTipoExame] = useState('Audiometria Tonal e Vocal');
  const [clinica, setClinica] = useState('CONSULPREV Diagnósticos Ocupacionais');
  const [dataRealizacao, setDataRealizacao] = useState(new Date().toISOString().split('T')[0]);
  const [mesesValidade, setMesesValidade] = useState(12);

  const handleSalvarExame = (e: React.FormEvent) => {
    e.preventDefault();
    const colab = colaboradores.find(c => c.id === colaboradorId) || colaboradores[0];
    const dVal = new Date(dataRealizacao);
    dVal.setMonth(dVal.getMonth() + mesesValidade);

    const diffTime = dVal.getTime() - new Date().getTime();
    const dias = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const status = dias < 0 ? 'Vencido' : dias <= 30 ? 'Vencendo (30 dias)' : 'Em Dia';

    const novo: ExameControle = {
      id: `ex-${Date.now()}`,
      colaboradorId: colab.id,
      colaboradorNome: colab.nome,
      cpf: colab.cpf,
      cargo: colab.cargo,
      setor: colab.setor,
      tipoExame,
      dataUltimoExame: dataRealizacao,
      dataVencimento: dVal.toISOString().split('T')[0],
      diasAteVencer: dias,
      status,
      clinica,
      resultado: 'Apto'
    };

    onAdicionarExame(novo);
    setModoCriacao(false);
  };

  const examesFiltrados = useMemo(() => {
    return exames.filter(ex => {
      const matchBusca = 
        ex.colaboradorNome.toLowerCase().includes(busca.toLowerCase()) ||
        ex.tipoExame.toLowerCase().includes(busca.toLowerCase()) ||
        ex.cargo.toLowerCase().includes(busca.toLowerCase());
      
      const matchStatus = filtroStatus === 'Todos' || ex.status === filtroStatus;

      return matchBusca && matchStatus;
    });
  }, [exames, busca, filtroStatus]);

  // Totais
  const totalVencidos = exames.filter(e => e.status === 'Vencido').length;
  const totalAVencer = exames.filter(e => e.status === 'Vencendo (30 dias)').length;
  const totalEmDia = exames.filter(e => e.status === 'Em Dia').length;

  return (
    <div className="space-y-6">
      
      {/* Title Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 no-print">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
            <HeartPulse className="w-5 h-5" />
          </span>
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Controle de Exames Clínicos e Complementares
            </h1>
            <p className="text-xs text-slate-500">
              Rastreamento de periodicidade, vencimentos de audiometrias, ECG, espirometrias e convocações
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setModoCriacao(true)}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-lg text-xs font-bold shadow-xs cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            Agendar / Lançar Exame
          </button>
          {onGerarPdf && (
            <button
              onClick={onGerarPdf}
              className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white px-3.5 py-2 rounded-lg text-xs font-semibold cursor-pointer shadow-xs"
              title="Gerar e baixar PDF do relatório de controle de exames"
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

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 no-print">
        <div className="bg-red-50 p-4 rounded-xl border border-red-200 flex items-center justify-between">
          <div>
            <span className="text-2xl font-black text-red-700">{totalVencidos}</span>
            <p className="text-xs font-bold text-red-900 mt-0.5">Exames Vencidos (Urgente)</p>
          </div>
          <AlertTriangle className="w-7 h-7 text-red-500" />
        </div>

        <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 flex items-center justify-between">
          <div>
            <span className="text-2xl font-black text-amber-700">{totalAVencer}</span>
            <p className="text-xs font-bold text-amber-900 mt-0.5">A Vencer nos Próximos 30 Dias</p>
          </div>
          <Clock className="w-7 h-7 text-amber-500" />
        </div>

        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 flex items-center justify-between">
          <div>
            <span className="text-2xl font-black text-emerald-700">{totalEmDia}</span>
            <p className="text-xs font-bold text-emerald-900 mt-0.5">Exames Válidos e Em Dia</p>
          </div>
          <CheckCircle2 className="w-7 h-7 text-emerald-500" />
        </div>
      </div>

      {modoCriacao ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 no-print">
          <h2 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
            Lançar Resultado ou Agendar Novo Exame
          </h2>

          <form onSubmit={handleSalvarExame} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Colaborador</label>
                <select
                  value={colaboradorId}
                  onChange={(e) => setColaboradorId(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white font-medium"
                >
                  {colaboradores.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.nome} - {c.cargo} ({c.cpf})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Exame Ocupacional</label>
                <select
                  value={tipoExame}
                  onChange={(e) => setTipoExame(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white font-medium"
                >
                  <option value="Audiometria Tonal e Vocal">Audiometria Tonal e Vocal (Ruído)</option>
                  <option value="Exame Clínico Ocupacional">Exame Clínico Geral</option>
                  <option value="Eletrocardiograma (ECG)">Eletrocardiograma - ECG (Altura/Confinado)</option>
                  <option value="Eletroencefalograma (EEG)">Eletroencefalograma - EEG</option>
                  <option value="Espirometria Ocupacional">Espirometria Ocupacional (Poeiras/Fumos)</option>
                  <option value="Acuidade Visual (Snellen)">Acuidade Visual (Snellen)</option>
                  <option value="Hemograma Completo + Plaquetas">Hemograma Completo (Químicos/Solventes)</option>
                  <option value="Raio-X de Tórax Padrão OIT">Raio-X de Tórax Padrão OIT</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Data da Realização</label>
                <input
                  type="date"
                  value={dataRealizacao}
                  onChange={(e) => setDataRealizacao(e.target.value)}
                  required
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Periodicidade / Validade</label>
                <select
                  value={mesesValidade}
                  onChange={(e) => setMesesValidade(Number(e.target.value))}
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white font-medium"
                >
                  <option value={6}>Semestral (6 meses - Ruído Limiar Crítico)</option>
                  <option value={12}>Anual (12 meses - Padrão Geral NR-07)</option>
                  <option value={24}>Bienal (24 meses - Baixo Risco Administrativo)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Clínica Credenciada</label>
              <input
                type="text"
                value={clinica}
                onChange={(e) => setClinica(e.target.value)}
                required
                className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
              />
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
                Salvar Exame no Prontuário
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm print-page">
          
          <PrintHeader
            tituloDocumento="RELATÓRIO DE CONTROLE DE EXAMES MÉDICOS OCUPACIONAIS"
            subtituloDocumento="Convocação e Rastreabilidade de Saúde Ocupacional (NR-07)"
            codigoDocumento="MAPA-EXAMES-2026"
            empresa={empresa}
            onImprimir={onImprimir}
            onGerarPdf={onGerarPdf}
          />

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between pb-4 mb-4 border-b border-slate-200 no-print">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Buscar por colaborador, exame ou função..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-slate-50 focus:bg-white outline-hidden"
              />
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-500 font-bold">Status:</span>
              {['Todos', 'Vencido', 'Vencendo (30 dias)', 'Em Dia'].map((st) => (
                <button
                  key={st}
                  onClick={() => setFiltroStatus(st)}
                  className={`px-2.5 py-1 rounded text-xs font-medium cursor-pointer ${
                    filtroStatus === st ? 'bg-slate-900 text-white font-bold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-300">
                <tr>
                  <th className="p-3">Colaborador / Função</th>
                  <th className="p-3">Exame Realizado</th>
                  <th className="p-3">Data Realizada</th>
                  <th className="p-3">Próximo Vencimento</th>
                  <th className="p-3">Resultado</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right no-print">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {examesFiltrados.map((ex) => (
                  <tr key={ex.id} className="hover:bg-slate-50/70">
                    <td className="p-3">
                      <span className="font-bold text-slate-900 block">{ex.colaboradorNome}</span>
                      <span className="text-[11px] text-slate-500">{ex.cargo} • CPF: {ex.cpf}</span>
                    </td>
                    <td className="p-3">
                      <span className="font-semibold text-slate-800 block">{ex.tipoExame}</span>
                      <span className="text-[10px] text-slate-500">{ex.clinica}</span>
                    </td>
                    <td className="p-3 font-medium text-slate-700">
                      {new Date(ex.dataUltimoExame).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="p-3 font-bold text-slate-900">
                      {new Date(ex.dataVencimento).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="p-3">
                      <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold">
                        {ex.resultado}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        ex.status === 'Vencido' ? 'bg-red-100 text-red-800 border border-red-300' :
                        ex.status === 'Vencendo (30 dias)' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                        'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      }`}>
                        {ex.status}
                      </span>
                    </td>
                    <td className="p-3 text-right no-print">
                      <button
                        onClick={() => onEmitirAso(ex.colaboradorNome)}
                        className="inline-flex items-center gap-1 text-[11px] text-emerald-700 hover:text-emerald-900 font-bold cursor-pointer"
                      >
                        Emitir ASO <ArrowRight className="w-3 h-3" />
                      </button>
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

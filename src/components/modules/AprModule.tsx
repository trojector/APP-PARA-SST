import React, { useState } from 'react';
import { 
  ClipboardList, 
  PlusCircle, 
  Printer, 
  CheckCircle2, 
  AlertTriangle, 
  HardHat, 
  ShieldCheck, 
  ArrowLeft,
  Users,
  FileCheck,
  FileDown
} from 'lucide-react';
import { APRRegistro, Empresa } from '../../types/sst';
import { PrintHeader } from '../common/PrintHeader';

interface AprModuleProps {
  empresa: Empresa;
  aprs: APRRegistro[];
  onAdicionarApr: (novaApr: APRRegistro) => void;
  onImprimir: () => void;
  onGerarPdf?: () => void;
}

export const AprModule: React.FC<AprModuleProps> = ({
  empresa,
  aprs,
  onAdicionarApr,
  onImprimir,
  onGerarPdf
}) => {
  const [aprSelecionada, setAprSelecionada] = useState<APRRegistro>(aprs[0]);
  const [modoCriacao, setModoCriacao] = useState(false);

  // Form states
  const [atividade, setAtividade] = useState('Montagem e Desmontagem de Andaime Fachadeiro Metálico');
  const [local, setLocal] = useState('Fachada Sul - Edifício Central');
  const [dataInicio, setDataInicio] = useState(new Date().toISOString().split('T')[0]);
  const [dataValidade, setDataValidade] = useState(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
  const [responsavelTecnico, setResponsavelTecnico] = useState('Fernanda Aparecida Gomes - Téc. SST');

  const handleSalvarApr = (e: React.FormEvent) => {
    e.preventDefault();
    const timestamp = Date.now().toString().slice(-3);
    const nova: APRRegistro = {
      id: `apr-${Date.now()}`,
      numeroApr: `APR-2026-0${timestamp}`,
      atividade,
      local,
      dataInicio,
      dataValidade,
      responsavelTecnico,
      empresaExecutante: empresa.razaoSocial,
      permissaoTrabalhoNecessaria: true,
      statusPT: 'Liberada',
      episObrigatorios: [
        'Cinto de Segurança tipo paraquedista com talabarte duplo em Y',
        'Capacete de segurança com jugular de 3 pontas',
        'Luva de vaqueta / mista com aderência',
        'Óculos de segurança ampla visão',
        'Botina de segurança com biqueira de composite'
      ],
      epcsObrigatorios: [
        'Isolamento e demarcação de piso raio de 6 metros',
        'Linha de vida horizontal de aço devidamente aterrada',
        'Placa de sinalização "CUIDADO: TRABALHO EM ALTURA"'
      ],
      passosAtividade: [
        {
          passo: 1,
          descricao: 'Descarga de elementos tubulares de andaime e inspeção prévia de peças',
          perigos: 'Queda de material sobre os membros inferiores e corte em rebarbas',
          causas: 'Manuseio desatento ou peças oxidadas/amassadas',
          consequencias: 'Contusão, esmagamento leve de pés e mãos',
          medidasControle: 'Uso obrigatório de luvas de proteção e botinas com biqueira. Descartar peças tortas ou oxidadas.'
        },
        {
          passo: 2,
          descricao: 'Nivelamento de base e montagem dos primeiros módulos com diagonais travadas',
          perigos: 'Instabilidade e desaprumo da torre de andaime',
          causas: 'Solo desnivelado ou falta de placas de apoio de madeira',
          consequencias: 'Tombamento do andaime com trabalhadores',
          medidasControle: 'Uso de sapatas reguláveis sobre pranchas de madeira tratada. Instalar travas diagonais a cada lance.'
        },
        {
          passo: 3,
          descricao: 'Fixação de pisos metálicos antiderrapantes, rodapés e guarda-corpo duplo',
          perigos: 'Queda com diferença de nível superior a 2,00m',
          causas: 'Trabalhador sem ancoragem contínua durante a colocação dos pranchões',
          consequencias: 'Politraumatismo, queda fatal',
          medidasControle: 'Trabalhador 100% do tempo ancorado na linha de vida independente com talabarte duplo. Proibido improvisar tábuas.'
        }
      ],
      equipeExecutante: [
        { nome: 'Marcos Antônio da Silva', funcao: 'Montador Especializado', treinadoNR: true },
        { nome: 'Rogério Lima de Souza', funcao: 'Ajudante Operacional', treinadoNR: true }
      ]
    };

    onAdicionarApr(nova);
    setAprSelecionada(nova);
    setModoCriacao(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Title Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 no-print">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
            <ClipboardList className="w-5 h-5" />
          </span>
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              APR (Análise Preliminar de Risco)
            </h1>
            <p className="text-xs text-slate-500">
              Planejamento de segurança para atividades críticas e emissão de Permissão de Trabalho (PT)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!modoCriacao ? (
            <button
              onClick={() => setModoCriacao(true)}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-lg text-xs font-bold shadow-xs cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              Elaborar Nova APR
            </button>
          ) : (
            <button
              onClick={() => setModoCriacao(false)}
              className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar às APRs
            </button>
          )}
        </div>
      </div>

      {modoCriacao ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 no-print">
          <h2 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
            Nova Análise Preliminar de Risco (APR)
          </h2>

          <form onSubmit={handleSalvarApr} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Título da Atividade / Tarefa</label>
                <input
                  type="text"
                  value={atividade}
                  onChange={(e) => setAtividade(e.target.value)}
                  required
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Local Exato da Execução</label>
                <input
                  type="text"
                  value={local}
                  onChange={(e) => setLocal(e.target.value)}
                  required
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Data Início</label>
                <input
                  type="date"
                  value={dataInicio}
                  onChange={(e) => setDataInicio(e.target.value)}
                  required
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Data Validade / Término</label>
                <input
                  type="date"
                  value={dataValidade}
                  onChange={(e) => setDataValidade(e.target.value)}
                  required
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Responsável Técnico SST</label>
                <input
                  type="text"
                  value={responsavelTecnico}
                  onChange={(e) => setResponsavelTecnico(e.target.value)}
                  required
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                />
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
                Gerar e Liberar APR
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Side List */}
          <div className="lg:col-span-4 space-y-2 no-print">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              APRs Vigentes ({aprs.length})
            </h3>
            {aprs.map((a) => (
              <div
                key={a.id}
                onClick={() => setAprSelecionada(a)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  aprSelecionada.id === a.id
                    ? 'bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-emerald-800">
                    {a.numeroApr}
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    PT {a.statusPT}
                  </span>
                </div>
                <p className="font-bold text-xs text-slate-900 mt-1 line-clamp-2">{a.atividade}</p>
                <p className="text-[11px] text-slate-500">{a.local}</p>
              </div>
            ))}
          </div>

          {/* Document Preview */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm print-page">
              
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 no-print">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded">
                  Permissão de Trabalho nº {aprSelecionada.numeroApr} ({aprSelecionada.statusPT})
                </span>
                <div className="flex items-center gap-2">
                  {onGerarPdf && (
                    <button
                      onClick={onGerarPdf}
                      className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-xs cursor-pointer"
                      title="Gerar e salvar APR e Permissão de Trabalho em PDF"
                    >
                      <FileDown className="w-3.5 h-3.5" />
                      Gerar PDF
                    </button>
                  )}
                  <button
                    onClick={onImprimir}
                    className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-xs cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    Imprimir APR e PT
                  </button>
                </div>
              </div>

              <PrintHeader
                tituloDocumento="ANÁLISE PRELIMINAR DE RISCO - APR"
                subtituloDocumento="Permissão de Trabalho e Avaliação Operacional de Tarefas Críticas"
                codigoDocumento={aprSelecionada.numeroApr}
                empresa={empresa}
              />

              <div className="space-y-4 text-xs">
                
                {/* Atividade & Local */}
                <div className="border border-slate-300 rounded overflow-hidden">
                  <div className="bg-slate-100 px-3 py-1.5 font-bold text-slate-800 uppercase border-b border-slate-300">
                    1. Dados da Atividade e Frente de Trabalho
                  </div>
                  <div className="p-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase">Atividade:</span>
                      <span className="font-bold text-slate-900">{aprSelecionada.atividade}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase">Local de Trabalho:</span>
                      <span className="text-slate-800 font-medium">{aprSelecionada.local}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase">Período de Execução:</span>
                      <span className="text-slate-800 font-medium">
                        {new Date(aprSelecionada.dataInicio).toLocaleDateString('pt-BR')} até {new Date(aprSelecionada.dataValidade).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase">Responsável Técnico SST:</span>
                      <span className="text-slate-800 font-bold">{aprSelecionada.responsavelTecnico}</span>
                    </div>
                  </div>
                </div>

                {/* EPIs e EPCs Obrigatórios */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="border border-slate-300 rounded p-3 bg-slate-50">
                    <span className="font-bold uppercase text-[10px] text-slate-700 block mb-1">
                      EPIs Obrigatórios para Esta Atividade:
                    </span>
                    <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-700">
                      {aprSelecionada.episObrigatorios.map((epi, idx) => (
                        <li key={idx}>{epi}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="border border-slate-300 rounded p-3 bg-slate-50">
                    <span className="font-bold uppercase text-[10px] text-slate-700 block mb-1">
                      EPCs e Medidas de Proteção Coletiva:
                    </span>
                    <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-700">
                      {aprSelecionada.epcsObrigatorios.map((epc, idx) => (
                        <li key={idx}>{epc}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Passos da Atividade e Riscos */}
                <div className="border border-slate-300 rounded overflow-hidden">
                  <div className="bg-slate-100 px-3 py-1.5 font-bold text-slate-800 uppercase border-b border-slate-300">
                    2. Etapas da Atividade, Perigos e Medidas Preventivas
                  </div>
                  <div className="divide-y divide-slate-200">
                    {aprSelecionada.passosAtividade.map((passo) => (
                      <div key={passo.passo} className="p-3 space-y-1">
                        <div className="font-bold text-emerald-900 text-xs">
                          Passo {passo.passo}: {passo.descricao}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
                          <div className="bg-red-50/60 p-2 rounded border border-red-100">
                            <span className="font-bold text-red-900 block text-[10px] uppercase">Perigo & Consequência:</span>
                            <span className="text-red-950">{passo.perigos} — <em>{passo.consequencias}</em></span>
                          </div>
                          <div className="bg-emerald-50/60 p-2 rounded border border-emerald-100">
                            <span className="font-bold text-emerald-900 block text-[10px] uppercase">Medidas Preventivas Obrigatórias:</span>
                            <span className="text-emerald-950">{passo.medidasControle}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Equipe Executante e Liberação da PT */}
                <div className="border border-slate-300 rounded p-3 bg-slate-50">
                  <span className="font-bold uppercase text-[10px] text-slate-700 block mb-2">
                    3. Equipe Executante Ciente das Medidas e Treinada na NR:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                    {aprSelecionada.equipeExecutante.map((eq, idx) => (
                      <div key={idx} className="bg-white p-2 rounded border border-slate-200 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-slate-900 block">{eq.nome}</span>
                          <span className="text-[10px] text-slate-500">{eq.funcao}</span>
                        </div>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                          Treinado NR ✔
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Assinaturas */}
                <div className="pt-6 grid grid-cols-2 gap-6 text-center">
                  <div className="border-t border-slate-400 pt-2">
                    <p className="font-bold text-slate-900">{aprSelecionada.responsavelTecnico}</p>
                    <p className="text-[10px] text-slate-500">Emissor da APR / Responsável SST</p>
                  </div>
                  <div className="border-t border-slate-400 pt-2">
                    <p className="font-bold text-slate-900">Encarregado da Frente de Obra</p>
                    <p className="text-[10px] text-slate-500">Liberação de Campo e Permissão de Trabalho (PT)</p>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      )}

    </div>
  );
};

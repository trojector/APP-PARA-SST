import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  PlusCircle, 
  Printer, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  ArrowLeft,
  Activity,
  HardHat,
  Volume2,
  Flame,
  FileCheck,
  FileDown
} from 'lucide-react';
import { LTCATAvaliacao, Empresa } from '../../types/sst';
import { PrintHeader } from '../common/PrintHeader';

interface LtcatModuleProps {
  empresa: Empresa;
  ltcats: LTCATAvaliacao[];
  onAdicionarLtcat: (novo: LTCATAvaliacao) => void;
  onImprimir: () => void;
  onGerarPdf?: () => void;
}

export const LtcatModule: React.FC<LtcatModuleProps> = ({
  empresa,
  ltcats,
  onAdicionarLtcat,
  onImprimir,
  onGerarPdf
}) => {
  const [laudoSelecionado, setLaudoSelecionado] = useState<LTCATAvaliacao>(ltcats[0]);
  const [modoCriacao, setModoCriacao] = useState(false);

  // Form states for new LTCAT
  const [setor, setSetor] = useState('Manutenção Eletromecânica');
  const [funcao, setFuncao] = useState('Eletricista / Mecânico Industrial');
  const [ruidoValor, setRuidoValor] = useState('86.2');
  const [ruidoCA, setRuidoCA] = useState('CA 15.620 - Plug de Silicone');
  const [quimicoNome, setQuimicoNome] = useState('Vapores de Desengraxante e Solventes');
  const [quimicoValor, setQuimicoValor] = useState('0.04 mg/m³ (Abaixo do Limite)');
  const [conclusao, setConclusao] = useState<'Ausência de Exposição a Agentes Nocivos (Sem Aposentadoria Especial)' | 'Comprovação de Condições Especiais (Enquadramento Aposentadoria Especial - GFIP 04)'>('Ausência de Exposição a Agentes Nocivos (Sem Aposentadoria Especial)');

  const handleSalvarNovoLtcat = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `ltcat-${Date.now()}`;
    const novo: LTCATAvaliacao = {
      id,
      numeroLaudo: `LTCAT-2026-MET-00${ltcats.length + 1}`,
      empresaId: empresa.id,
      setor,
      funcao,
      dataAvaliacao: new Date().toISOString().split('T')[0],
      validade: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      engenheiroResponsavel: empresa.responsavelSST,
      crea: empresa.registroProfissional,
      agentes: [
        {
          tipo: 'Físico',
          nomeAgente: 'Ruído Contínuo / Intermitente',
          metodologia: 'Dosimetria de ruído conforme NHO-01 da Fundacentro e NR-15',
          valorEncontrado: ruidoValor,
          unidade: 'dB(A)',
          limiteTolerancia: '85.0 dB(A)',
          nivelAcao: '80.0 dB(A)',
          exposicaoHabitual: true,
          epcEficaz: false,
          epiRecomendado: 'Protetor Auditivo Atenuação NRRsf 18dB',
          caEpi: ruidoCA
        },
        {
          tipo: 'Químico',
          nomeAgente: quimicoNome,
          metodologia: 'Avaliação quantitativa com tubo colorimétrico e bomba gravimétrica',
          valorEncontrado: quimicoValor,
          unidade: 'mg/m³',
          limiteTolerancia: 'Conforme Anexo 11 da NR-15',
          nivelAcao: '50% do LT',
          exposicaoHabitual: false,
          epcEficaz: true,
          epiRecomendado: 'Respirador Semi-Facial com Filtro Químico',
          caEpi: 'CA 28.190'
        }
      ],
      conclusaoPrevidenciaria: conclusao,
      fundamentacaoLegal: 'Fundamentado no Decreto 3.048/99 Anexo IV e NR-15 da Portaria 3.214/78 do MTE.',
      observacoes: 'Os EPIs fornecidos pela empresa atenuam eficazmente a nocividade dos agentes ambientais.'
    };

    onAdicionarLtcat(novo);
    setLaudoSelecionado(novo);
    setModoCriacao(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 no-print">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
            <FileSpreadsheet className="w-5 h-5" />
          </span>
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              LTCAT (Laudo Técnico das Condições Ambientais do Trabalho)
            </h1>
            <p className="text-xs text-slate-500">
              Base técnica pericial para o PPP e evento eSocial S-2240 (Aposentadoria Especial)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!modoCriacao ? (
            <button
              onClick={() => setModoCriacao(true)}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-xs cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              Novo Laudo LTCAT
            </button>
          ) : (
            <button
              onClick={() => setModoCriacao(false)}
              className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar ao Laudo
            </button>
          )}
        </div>
      </div>

      {modoCriacao ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 no-print">
          <h2 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
            Cadastrar Nova Avaliação Técnica para LTCAT
          </h2>

          <form onSubmit={handleSalvarNovoLtcat} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Setor Avaliado</label>
                <input
                  type="text"
                  value={setor}
                  onChange={(e) => setSetor(e.target.value)}
                  required
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Cargo / Função</label>
                <input
                  type="text"
                  value={funcao}
                  onChange={(e) => setFuncao(e.target.value)}
                  required
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                />
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-emerald-600" />
                Medição de Ruído Contínuo / Dosimetria (dB(A))
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Nível de Ruído Encontrado Leq (dB(A))</label>
                  <input
                    type="text"
                    value={ruidoValor}
                    onChange={(e) => setRuidoValor(e.target.value)}
                    required
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">EPI Auditivo / Nº Certificado Aprovação (CA)</label>
                  <input
                    type="text"
                    value={ruidoCA}
                    onChange={(e) => setRuidoCA(e.target.value)}
                    required
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-indigo-600" />
                Agente Químico / Fumos / Vapores
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Nome do Agente Químico</label>
                  <input
                    type="text"
                    value={quimicoNome}
                    onChange={(e) => setQuimicoNome(e.target.value)}
                    required
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Concentração Medida / Unidade</label>
                  <input
                    type="text"
                    value={quimicoValor}
                    onChange={(e) => setQuimicoValor(e.target.value)}
                    required
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Conclusão Técnica Previdenciária</label>
              <select
                value={conclusao}
                onChange={(e) => setConclusao(e.target.value as any)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white font-semibold text-slate-800"
              >
                <option value="Ausência de Exposição a Agentes Nocivos (Sem Aposentadoria Especial)">
                  Sem Exposição Nociva - Não enseja Aposentadoria Especial (GFIP 00)
                </option>
                <option value="Comprovação de Condições Especiais (Enquadramento Aposentadoria Especial - GFIP 04)">
                  Enquadramento em Aposentadoria Especial 25 anos (GFIP 04)
                </option>
              </select>
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
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-lg text-xs font-bold"
              >
                Gerar Laudo LTCAT
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Side List */}
          <div className="lg:col-span-4 space-y-2 no-print">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Laudos Disponíveis ({ltcats.length})
            </h3>
            {ltcats.map((l) => (
              <div
                key={l.id}
                onClick={() => setLaudoSelecionado(l)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  laudoSelecionado.id === l.id
                    ? 'bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-emerald-800">
                    {l.numeroLaudo}
                  </span>
                  <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-medium">
                    Válido até {new Date(l.validade).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                <p className="font-bold text-xs text-slate-900 mt-1">{l.funcao}</p>
                <p className="text-[11px] text-slate-500">{l.setor}</p>
              </div>
            ))}
          </div>

          {/* Document Preview */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm print-page">
              
              {/* Top Action Bar */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 no-print">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                  Laudo Pericial Conforme Decreto 3.048/99
                </span>
                <div className="flex items-center gap-2">
                  {onGerarPdf && (
                    <button
                      onClick={onGerarPdf}
                      className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-xs cursor-pointer"
                      title="Gerar e salvar Laudo LTCAT em PDF"
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
                    Imprimir LTCAT Oficial
                  </button>
                </div>
              </div>

              <PrintHeader
                tituloDocumento="LAUDO TÉCNICO DAS CONDIÇÕES AMBIENTAIS DO TRABALHO - LTCAT"
                subtituloDocumento="Avaliação de Agentes Físicos, Químicos e Biológicos (INSS / Previdência Social)"
                codigoDocumento={laudoSelecionado.numeroLaudo}
                empresa={empresa}
              />

              {/* Corpo do LTCAT */}
              <div className="space-y-5 text-xs">
                
                {/* 1. Identificação do Setor e Função */}
                <div className="border border-slate-300 rounded overflow-hidden">
                  <div className="bg-slate-100 px-3 py-1.5 font-bold text-slate-800 uppercase border-b border-slate-300">
                    1. Setor de Trabalho e Cargo Periciado
                  </div>
                  <div className="p-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase">Setor Avaliado:</span>
                      <span className="font-bold text-slate-800">{laudoSelecionado.setor}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase">Função / Cargo:</span>
                      <span className="font-bold text-slate-800">{laudoSelecionado.funcao}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase">Data do Levantamento:</span>
                      <span className="text-slate-800 font-medium">
                        {new Date(laudoSelecionado.dataAvaliacao).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. Tabela de Agentes Nocivos Identificados */}
                <div className="border border-slate-300 rounded overflow-hidden">
                  <div className="bg-slate-100 px-3 py-1.5 font-bold text-slate-800 uppercase border-b border-slate-300 flex items-center justify-between">
                    <span>2. Avaliação Qualitativa e Quantitativa dos Riscos Ambientais</span>
                    <span className="text-[10px] font-normal text-slate-500">Normas: NR-15 e NHO da Fundacentro</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-[11px] border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                          <th className="p-2">Tipo</th>
                          <th className="p-2">Agente</th>
                          <th className="p-2">Valor Medido</th>
                          <th className="p-2">Limite (NR-15)</th>
                          <th className="p-2">EPI Recomendado (CA)</th>
                          <th className="p-2">Eficácia</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {laudoSelecionado.agentes.map((ag, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/50">
                            <td className="p-2 font-bold text-slate-700">{ag.tipo}</td>
                            <td className="p-2 text-slate-800">{ag.nomeAgente}</td>
                            <td className="p-2 font-mono font-bold text-slate-900">{ag.valorEncontrado} {ag.unidade}</td>
                            <td className="p-2 text-slate-600">{ag.limiteTolerancia}</td>
                            <td className="p-2 text-slate-700">{ag.caEpi}</td>
                            <td className="p-2">
                              <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                                Eficaz (Art. 191 CLT)
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 3. Parecer e Conclusão Técnica Previdenciária */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-300 space-y-2">
                  <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    3. Conclusão Técnica Previdenciária (Aposentadoria Especial)
                  </h4>
                  <div className="p-3 bg-white rounded-lg border border-slate-200 font-bold text-emerald-900 text-xs">
                    {laudoSelecionado.conclusaoPrevidenciaria}
                  </div>
                  <p className="text-[11px] text-slate-700 leading-relaxed pt-1">
                    <strong>Fundamentação:</strong> {laudoSelecionado.fundamentacaoLegal}
                  </p>
                  <p className="text-[11px] text-slate-500 italic">
                    {laudoSelecionado.observacoes}
                  </p>
                </div>

                {/* 4. Assinatura do Responsável Técnico */}
                <div className="pt-8 text-center max-w-sm mx-auto">
                  <div className="border-t border-slate-400 pt-2">
                    <p className="font-bold text-slate-900">{laudoSelecionado.engenheiroResponsavel}</p>
                    <p className="text-[10px] text-slate-600">{laudoSelecionado.crea}</p>
                    <p className="text-[10px] text-slate-500">Engenheiro de Segurança do Trabalho - Perito Responsável</p>
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

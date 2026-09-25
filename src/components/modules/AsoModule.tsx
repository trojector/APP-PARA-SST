import React, { useState } from 'react';
import { 
  UserCheck, 
  PlusCircle, 
  Printer, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  FileText, 
  ArrowLeft,
  Calendar,
  Building,
  ShieldAlert,
  Send,
  FileDown
} from 'lucide-react';
import { ASORegistro, Empresa, Colaborador } from '../../types/sst';
import { PrintHeader } from '../common/PrintHeader';

interface AsoModuleProps {
  empresa: Empresa;
  colaboradores: Colaborador[];
  asos: ASORegistro[];
  onAdicionarAso: (novoAso: ASORegistro) => void;
  onImprimir: () => void;
  onGerarPdf?: () => void;
}

export const AsoModule: React.FC<AsoModuleProps> = ({
  empresa,
  colaboradores,
  asos,
  onAdicionarAso,
  onImprimir,
  onGerarPdf
}) => {
  const [asoSelecionado, setAsoSelecionado] = useState<ASORegistro>(asos[0]);
  const [modoCriacao, setModoCriacao] = useState(false);

  // Form states
  const [colaboradorId, setColaboradorId] = useState(colaboradores[0]?.id || '');
  const [tipoAso, setTipoAso] = useState<'Admissional' | 'Periódico' | 'Retorno ao Trabalho' | 'Mudança de Riscos Ocupacionais' | 'Demissional'>('Periódico');
  const [parecerAptidao, setParecerAptidao] = useState<'APTO' | 'INAPTO' | 'APTO COM RESTRIÇÃO'>('APTO');
  const [aptoAltura, setAptoAltura] = useState(true);
  const [aptoEspacoConfinado, setAptoEspacoConfinado] = useState(true);
  const [restricoes, setRestricoes] = useState('');
  const [medicoExaminador, setMedicoExaminador] = useState('Dr. Leonardo Paes de Camargo');
  const [crmExaminador, setCrmExaminador] = useState('154.908');
  const [ufCrm, setUfCrm] = useState('SP');

  const handleSalvarAso = (e: React.FormEvent) => {
    e.preventDefault();
    const colab = colaboradores.find(c => c.id === colaboradorId) || colaboradores[0];
    const timestamp = Date.now().toString().slice(-5);

    const novo: ASORegistro = {
      id: `aso-${Date.now()}`,
      numeroAso: `ASO-2026-${timestamp}`,
      tipoAso,
      empresaId: empresa.id,
      colaboradorId: colab.id,
      colaboradorNome: colab.nome,
      colaboradorCpf: colab.cpf,
      cargo: colab.cargo,
      setor: colab.setor,
      riscosIdentificados: [
        'Físico: Ruído contínuo/intermitente',
        'Acidente: Queda em altura (NR-35)',
        'Ergonômico: Postura exigente'
      ],
      examesRealizados: [
        { nomeExame: 'Exame Clínico Ocupacional', data: new Date().toISOString().split('T')[0], resultado: 'Normal' },
        { nomeExame: 'Eletrocardiograma (ECG)', data: new Date().toISOString().split('T')[0], resultado: 'Normal' },
        { nomeExame: 'Acuidade Visual', data: new Date().toISOString().split('T')[0], resultado: 'Normal' }
      ],
      parecerAptidao,
      restricoes: parecerAptidao === 'APTO COM RESTRIÇÃO' ? restricoes : undefined,
      aptoEspacoConfinadoNR33: aptoEspacoConfinado,
      aptoTrabalhoAlturaNR35: aptoAltura,
      dataEmissao: new Date().toISOString().split('T')[0],
      medicoExaminador,
      crmExaminador,
      ufCrmExaminador: ufCrm,
      medicoCoordenador: 'Dr. Roberto Fontes Guimarães',
      crmCoordenador: '128.450/SP'
    };

    onAdicionarAso(novo);
    setAsoSelecionado(novo);
    setModoCriacao(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Title Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 no-print">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
            <UserCheck className="w-5 h-5" />
          </span>
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              ASO (Atestado de Saúde Ocupacional)
            </h1>
            <p className="text-xs text-slate-500">
              Emissão de vias legais de aptidão médica conforme NR-07 com liberação NR-33 e NR-35
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
              Emitir Novo ASO
            </button>
          ) : (
            <button
              onClick={() => setModoCriacao(false)}
              className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar aos ASOs
            </button>
          )}
        </div>
      </div>

      {/* Creation Mode */}
      {modoCriacao ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 no-print">
          <h2 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
            Emissão de Novo Atestado de Saúde Ocupacional (ASO)
          </h2>

          <form onSubmit={handleSalvarAso} className="space-y-4">
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
                <label className="block text-xs font-bold text-slate-700 mb-1">Tipo de ASO</label>
                <select
                  value={tipoAso}
                  onChange={(e) => setTipoAso(e.target.value as any)}
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white font-medium"
                >
                  <option value="Admissional">Admissional</option>
                  <option value="Periódico">Periódico Anual</option>
                  <option value="Retorno ao Trabalho">Retorno ao Trabalho</option>
                  <option value="Mudança de Riscos Ocupacionais">Mudança de Riscos Ocupacionais</option>
                  <option value="Demissional">Demissional</option>
                </select>
              </div>
            </div>

            {/* Parecer de Aptidão */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Parecer Médico Conclusivo
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer ${
                  parecerAptidao === 'APTO' ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold' : 'bg-white border-slate-200 text-slate-700'
                }`}>
                  <input
                    type="radio"
                    name="parecer"
                    value="APTO"
                    checked={parecerAptidao === 'APTO'}
                    onChange={() => setParecerAptidao('APTO')}
                  />
                  <span>APTO PARA A FUNÇÃO</span>
                </label>

                <label className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer ${
                  parecerAptidao === 'APTO COM RESTRIÇÃO' ? 'bg-amber-50 border-amber-500 text-amber-900 font-bold' : 'bg-white border-slate-200 text-slate-700'
                }`}>
                  <input
                    type="radio"
                    name="parecer"
                    value="APTO COM RESTRIÇÃO"
                    checked={parecerAptidao === 'APTO COM RESTRIÇÃO'}
                    onChange={() => setParecerAptidao('APTO COM RESTRIÇÃO')}
                  />
                  <span>APTO COM RESTRIÇÃO</span>
                </label>

                <label className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer ${
                  parecerAptidao === 'INAPTO' ? 'bg-red-50 border-red-500 text-red-900 font-bold' : 'bg-white border-slate-200 text-slate-700'
                }`}>
                  <input
                    type="radio"
                    name="parecer"
                    value="INAPTO"
                    checked={parecerAptidao === 'INAPTO'}
                    onChange={() => setParecerAptidao('INAPTO')}
                  />
                  <span>INAPTO TEMPORÁRIO / DEFINITIVO</span>
                </label>
              </div>

              {parecerAptidao === 'APTO COM RESTRIÇÃO' && (
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Descreva as Restrições Médicas</label>
                  <input
                    type="text"
                    value={restricoes}
                    onChange={(e) => setRestricoes(e.target.value)}
                    placeholder="Ex: Evitar pegar peso acima de 15kg; uso obrigatório de lentes corretivas"
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                  />
                </div>
              )}
            </div>

            {/* Aptidões Especiais de Alto Risco (NR-33 e NR-35) */}
            <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200 space-y-2">
              <h3 className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                Aptidões Específicas de Alto Risco Regulamentares
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex items-center gap-2 bg-white p-3 rounded-lg border border-emerald-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={aptoAltura}
                    onChange={(e) => setAptoAltura(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <span className="text-xs font-bold text-slate-800">
                    Apto para Trabalho em Altura (NR-35)
                  </span>
                </label>

                <label className="flex items-center gap-2 bg-white p-3 rounded-lg border border-emerald-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={aptoEspacoConfinado}
                    onChange={(e) => setAptoEspacoConfinado(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <span className="text-xs font-bold text-slate-800">
                    Apto para Trabalho em Espaço Confinado (NR-33)
                  </span>
                </label>
              </div>
            </div>

            {/* Dados do Médico Examinador */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Médico Examinador</label>
                <input
                  type="text"
                  value={medicoExaminador}
                  onChange={(e) => setMedicoExaminador(e.target.value)}
                  required
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">CRM</label>
                <input
                  type="text"
                  value={crmExaminador}
                  onChange={(e) => setCrmExaminador(e.target.value)}
                  required
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">UF CRM</label>
                <input
                  type="text"
                  value={ufCrm}
                  onChange={(e) => setUfCrm(e.target.value)}
                  maxLength={2}
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
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-lg text-xs font-bold shadow-md cursor-pointer"
              >
                Emitir e Imprimir ASO
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Side List */}
          <div className="lg:col-span-4 space-y-2 no-print">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              ASOs Emitidos ({asos.length})
            </h3>
            {asos.map((a) => (
              <div
                key={a.id}
                onClick={() => setAsoSelecionado(a)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  asoSelecionado.id === a.id
                    ? 'bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-emerald-800">
                    {a.numeroAso}
                  </span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    a.parecerAptidao === 'APTO' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {a.parecerAptidao}
                  </span>
                </div>
                <p className="font-bold text-xs text-slate-900 mt-1">{a.colaboradorNome}</p>
                <p className="text-[11px] text-slate-500">{a.cargo} • {a.tipoAso}</p>
                <div className="mt-2 text-[10px] text-slate-400">
                  Emitido em: {new Date(a.dataEmissao).toLocaleDateString('pt-BR')}
                </div>
              </div>
            ))}
          </div>

          {/* Document Preview with Legal 1st and 2nd Copy */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm print-page">
              
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 no-print">
                <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded">
                  Via do Empregador e Via do Trabalhador
                </span>
                <div className="flex items-center gap-2">
                  {onGerarPdf && (
                    <button
                      onClick={onGerarPdf}
                      className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-xs cursor-pointer"
                      title="Gerar e salvar ASO Oficial em PDF"
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
                    Imprimir ASO Oficial (2 Vias)
                  </button>
                </div>
              </div>

              {/* Printable Official ASO */}
              <PrintHeader
                tituloDocumento="ATESTADO DE SAÚDE OCUPACIONAL - ASO"
                subtituloDocumento={`Portaria MTP n.º 6.734/2020 - NR-07 (Exame ${asoSelecionado.tipoAso})`}
                codigoDocumento={asoSelecionado.numeroAso}
                empresa={empresa}
              />

              <div className="space-y-4 text-xs">
                
                {/* 1. Dados do Trabalhador */}
                <div className="border border-slate-300 rounded overflow-hidden">
                  <div className="bg-slate-100 px-3 py-1 font-bold text-slate-800 uppercase border-b border-slate-300">
                    1. Identificação do Trabalhador
                  </div>
                  <div className="p-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase">Nome:</span>
                      <span className="font-bold text-slate-900">{asoSelecionado.colaboradorNome}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase">CPF:</span>
                      <span className="font-mono text-slate-800">{asoSelecionado.colaboradorCpf}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase">Cargo / Função:</span>
                      <span className="text-slate-800 font-medium">{asoSelecionado.cargo}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase">Setor:</span>
                      <span className="text-slate-800 font-medium">{asoSelecionado.setor}</span>
                    </div>
                  </div>
                </div>

                {/* 2. Riscos Ocupacionais */}
                <div className="border border-slate-300 rounded overflow-hidden">
                  <div className="bg-slate-100 px-3 py-1 font-bold text-slate-800 uppercase border-b border-slate-300">
                    2. Riscos Ocupacionais Específicos Identificados no PGR
                  </div>
                  <div className="p-3 flex flex-wrap gap-2">
                    {asoSelecionado.riscosIdentificados.map((r, idx) => (
                      <span key={idx} className="bg-slate-50 border border-slate-300 px-2 py-1 rounded text-[11px] text-slate-800">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 3. Exames Médicos Realizados */}
                <div className="border border-slate-300 rounded overflow-hidden">
                  <div className="bg-slate-100 px-3 py-1 font-bold text-slate-800 uppercase border-b border-slate-300">
                    3. Exames Clínicos e Complementares Realizados
                  </div>
                  <div className="p-3 space-y-1.5">
                    {asoSelecionado.examesRealizados.map((ex, idx) => (
                      <div key={idx} className="flex items-center justify-between text-[11px] border-b border-slate-100 pb-1">
                        <span className="font-medium text-slate-800">{ex.nomeExame}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-slate-500">Data: {new Date(ex.data).toLocaleDateString('pt-BR')}</span>
                          <span className="font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                            {ex.resultado}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Parecer Conclusivo */}
                <div className="p-3.5 bg-slate-50 border border-slate-300 rounded-lg text-center space-y-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    4. Conclusão da Avaliação Médica Ocupacional:
                  </span>
                  <div className="inline-block px-6 py-2 bg-emerald-600 text-white font-extrabold text-base rounded-lg shadow-xs">
                    {asoSelecionado.parecerAptidao}
                  </div>
                  {asoSelecionado.restricoes && (
                    <p className="text-[11px] text-amber-800 font-medium">
                      Restrições: {asoSelecionado.restricoes}
                    </p>
                  )}

                  {/* Altura / Espaço Confinado tags */}
                  <div className="pt-2 flex justify-center gap-4 text-xs font-bold">
                    <span className={asoSelecionado.aptoTrabalhoAlturaNR35 ? 'text-emerald-700' : 'text-red-600'}>
                      Trabalho em Altura (NR-35): {asoSelecionado.aptoTrabalhoAlturaNR35 ? '✔ APTO' : '✖ INAPTO'}
                    </span>
                    <span className={asoSelecionado.aptoEspacoConfinadoNR33 ? 'text-emerald-700' : 'text-red-600'}>
                      Espaço Confinado (NR-33): {asoSelecionado.aptoEspacoConfinadoNR33 ? '✔ APTO' : '✖ INAPTO'}
                    </span>
                  </div>
                </div>

                {/* 5. Assinaturas e Recibo de Entrega da 2ª Via */}
                <div className="pt-6 grid grid-cols-2 gap-6 text-center">
                  <div className="border-t border-slate-400 pt-2">
                    <p className="font-bold text-slate-900">{asoSelecionado.medicoExaminador}</p>
                    <p className="text-[10px] text-slate-600">CRM {asoSelecionado.crmExaminador}/{asoSelecionado.ufCrmExaminador}</p>
                    <p className="text-[10px] text-slate-500">Médico Examinador</p>
                  </div>

                  <div className="border-t border-slate-400 pt-2">
                    <p className="font-bold text-slate-900">{asoSelecionado.colaboradorNome}</p>
                    <p className="text-[10px] text-slate-600">CPF: {asoSelecionado.colaboradorCpf}</p>
                    <p className="text-[10px] text-slate-500">Recibo da 2ª Via do Trabalhador</p>
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

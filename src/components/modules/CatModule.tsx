import React, { useState } from 'react';
import { 
  AlertOctagon, 
  PlusCircle, 
  Printer, 
  Download, 
  CheckCircle2, 
  FileText, 
  ArrowLeft,
  Calendar,
  User,
  Building,
  Activity,
  Send,
  AlertTriangle,
  FileDown
} from 'lucide-react';
import { CATRegistro, Empresa, Colaborador } from '../../types/sst';
import { PrintHeader } from '../common/PrintHeader';

interface CatModuleProps {
  empresa: Empresa;
  colaboradores: Colaborador[];
  cats: CATRegistro[];
  onAdicionarCat: (novaCat: CATRegistro) => void;
  onImprimir: () => void;
  onGerarPdf?: () => void;
}

export const CatModule: React.FC<CatModuleProps> = ({
  empresa,
  colaboradores,
  cats,
  onAdicionarCat,
  onImprimir,
  onGerarPdf
}) => {
  const [visualizandoCat, setVisualizandoCat] = useState<CATRegistro | null>(cats[0] || null);
  const [modoCriacao, setModoCriacao] = useState<boolean>(false);

  // Form state for creating a new CAT
  const [colaboradorSelecionadoId, setColaboradorSelecionadoId] = useState<string>(colaboradores[0]?.id || '');
  const [tipoCat, setTipoCat] = useState<'Inicial' | 'Reabertura' | 'Comunicação de Óbito'>('Inicial');
  const [tipoAcidente, setTipoAcidente] = useState<'Típico' | 'Trajeto' | 'Doença Ocupacional'>('Típico');
  const [dataAcidente, setDataAcidente] = useState<string>(new Date().toISOString().split('T')[0]);
  const [horaAcidente, setHoraAcidente] = useState<string>('10:30');
  const [houveAfastamento, setHouveAfastamento] = useState<boolean>(true);
  const [diasAfastamento, setDiasAfastamento] = useState<number>(14);
  const [houveMorte, setHouveMorte] = useState<boolean>(false);
  const [localAcidente, setLocalAcidente] = useState<string>('Área operacional - Posto de trabalho');
  const [descricaoAcidente, setDescricaoAcidente] = useState<string>('');
  const [parteCorpoAtingida, setParteCorpoAtingida] = useState<string>('Mão direita - Dedos');
  const [agenteCausador, setAgenteCausador] = useState<string>('Equipamento mecânico / ferramenta manual');
  const [situacaoGeradora, setSituacaoGeradora] = useState<string>('Operação de máquina ou manuseio de carga');
  
  // Medical certificate
  const [cid10, setCid10] = useState<string>('S61.0 - Ferimento de dedo(s) sem lesão da unha');
  const [descricaoCid, setDescricaoCid] = useState<string>('Traumatismo e escoriação em falange distal');
  const [medicoNome, setMedicoNome] = useState<string>('Dr. Paulo Roberto Neves');
  const [crm, setCrm] = useState<string>('162.809');
  const [crmUf, setCrmUf] = useState<string>('SP');
  const [houveInternacao, setHouveInternacao] = useState<boolean>(false);

  const handleSalvarNovaCat = (e: React.FormEvent) => {
    e.preventDefault();
    const colab = colaboradores.find(c => c.id === colaboradorSelecionadoId) || colaboradores[0];
    const timestamp = Date.now().toString().slice(-6);

    const nova: CATRegistro = {
      id: `cat-${Date.now()}`,
      numeroCat: `2026.09.${timestamp}-1`,
      tipoCat,
      empresaId: empresa.id,
      colaboradorId: colab.id,
      colaboradorNome: colab.nome,
      colaboradorCpf: colab.cpf,
      cargo: colab.cargo,
      setor: colab.setor,
      dataAcidente,
      horaAcidente,
      tipoAcidente,
      houveAfastamento,
      diasAfastamento: houveAfastamento ? Number(diasAfastamento) : 0,
      houveMorte,
      localAcidente,
      descricaoAcidente: descricaoAcidente || 'Acidente ocorrido durante a execução rotineira da atividade.',
      parteCorpoAtingida,
      agenteCausador,
      situacaoGeradora,
      atestadoMedico: {
        dataAtendimento: dataAcidente,
        horaAtendimento: horaAcidente,
        houveInternacao,
        provavelDuracaoTratamentoDias: Number(diasAfastamento),
        cid10,
        descricaoCid,
        medicoNome,
        crm,
        crmUf
      },
      dataEmissao: new Date().toISOString().split('T')[0],
      statusEsocial: 'Processado',
      reciboEsocial: `1.2.${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}.0000000000${timestamp}`
    };

    onAdicionarCat(nova);
    setVisualizandoCat(nova);
    setModoCriacao(false);
  };

  const handleBaixarXmlEsocial = (cat: CATRegistro) => {
    const xmlMock = `<?xml version="1.0" encoding="UTF-8"?>
<eSocial xmlns="http://www.esocial.gov.br/schema/evt/evtCAT/v_S_01_02_00">
  <evtCAT Id="ID1${empresa.cnpj.replace(/\D/g, '')}${cat.numeroCat.replace(/\D/g, '')}">
    <ideEvento>
      <tpAmb>1</tpAmb>
      <procEmi>1</procEmi>
      <verProc>CONSULPREV_SST_1.0</verProc>
    </ideEvento>
    <ideEmpregador>
      <tpInsc>1</tpInsc>
      <nrInsc>${empresa.cnpj.replace(/\D/g, '')}</nrInsc>
    </ideEmpregador>
    <ideTrabalhador>
      <cpfTrab>${cat.colaboradorCpf.replace(/\D/g, '')}</cpfTrab>
    </ideTrabalhador>
    <cat>
      <dtAcid>${cat.dataAcidente}</dtAcid>
      <tpAcid>${cat.tipoAcidente === 'Típico' ? '1' : cat.tipoAcidente === 'Doença Ocupacional' ? '2' : '3'}</tpAcid>
      <hrAcid>${cat.horaAcidente.replace(':', '')}</hrAcid>
      <localAcid>
        <dscLocal>${cat.localAcidente}</dscLocal>
      </localAcid>
      <parteAting>${cat.parteCorpoAtingida}</parteAting>
      <agntCausador>${cat.agenteCausador}</agntCausador>
      <atestado>
        <dtAtend>${cat.atestadoMedico.dataAtendimento}</dtAtend>
        <codCID>${cat.atestadoMedico.cid10.split(' - ')[0]}</codCID>
        <nrCRM>${cat.atestadoMedico.crm}</nrCRM>
        <ufCRM>${cat.atestadoMedico.crmUf}</ufCRM>
      </atestado>
    </cat>
  </evtCAT>
</eSocial>`;

    const blob = new Blob([xmlMock], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `eSocial_S2210_CAT_${cat.numeroCat.replace(/[^0-9]/g, '')}.xml`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      
      {/* Module Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs no-print">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-red-100 text-red-700">
              <AlertOctagon className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                Emissão de CAT (Comunicação de Acidente de Trabalho)
              </h1>
              <p className="text-xs text-slate-500">
                Evento Oficial eSocial S-2210 e Formulário da Previdência Social
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!modoCriacao ? (
            <button
              id="btn-nova-cat"
              onClick={() => setModoCriacao(true)}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-xs transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              Emitir Nova CAT
            </button>
          ) : (
            <button
              onClick={() => setModoCriacao(false)}
              className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar aos Registros
            </button>
          )}
        </div>
      </div>

      {/* Mode 1: New CAT Creation Form */}
      {modoCriacao && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 no-print">
          <div className="border-b border-slate-200 pb-3 mb-5">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              Formulário de Emissão de CAT - eSocial S-2210
            </h2>
            <p className="text-xs text-slate-500">
              A emissão da CAT é obrigatória até o primeiro dia útil seguinte ao da ocorrência e, em caso de morte, de imediato (art. 22 da Lei nº 8.213/91).
            </p>
          </div>

          <form onSubmit={handleSalvarNovaCat} className="space-y-6">
            
            {/* Section 1: Tipo & Empregado */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tipo da CAT</label>
                <select
                  value={tipoCat}
                  onChange={(e) => setTipoCat(e.target.value as any)}
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white font-medium"
                >
                  <option value="Inicial">1 - Inicial</option>
                  <option value="Reabertura">2 - Reabertura</option>
                  <option value="Comunicação de Óbito">3 - Comunicação de Óbito</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Trabalhador Acidentado</label>
                <select
                  value={colaboradorSelecionadoId}
                  onChange={(e) => setColaboradorSelecionadoId(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white font-medium"
                >
                  {colaboradores.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.nome} (CPF: {c.cpf}) - {c.cargo}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tipo de Acidente</label>
                <select
                  value={tipoAcidente}
                  onChange={(e) => setTipoAcidente(e.target.value as any)}
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white font-medium"
                >
                  <option value="Típico">1 - Típico (No local e em horário de trabalho)</option>
                  <option value="Trajeto">2 - Trajeto (Percurso residência - trabalho)</option>
                  <option value="Doença Ocupacional">3 - Doença Ocupacional / Profissional</option>
                </select>
              </div>
            </div>

            {/* Section 2: Data, Hora e Consequências */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Data do Acidente</label>
                <input
                  type="date"
                  value={dataAcidente}
                  onChange={(e) => setDataAcidente(e.target.value)}
                  required
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Hora do Acidente</label>
                <input
                  type="time"
                  value={horaAcidente}
                  onChange={(e) => setHoraAcidente(e.target.value)}
                  required
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Houve Afastamento?</label>
                <select
                  value={houveAfastamento ? 'Sim' : 'Não'}
                  onChange={(e) => setHouveAfastamento(e.target.value === 'Sim')}
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                >
                  <option value="Sim">Sim, com afastamento</option>
                  <option value="Não">Não, sem afastamento</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Dias de Afastamento Previsto</label>
                <input
                  type="number"
                  min="0"
                  value={diasAfastamento}
                  onChange={(e) => setDiasAfastamento(Number(e.target.value))}
                  disabled={!houveAfastamento}
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white disabled:bg-slate-100"
                />
              </div>
            </div>

            {/* Section 3: Detalhes do Local e Agentes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Local Exato do Acidente</label>
                <input
                  type="text"
                  value={localAcidente}
                  onChange={(e) => setLocalAcidente(e.target.value)}
                  placeholder="Ex: Canteiro de Obras Bloco B - Andaime fachada norte"
                  required
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Parte do Corpo Atingida</label>
                <input
                  type="text"
                  value={parteCorpoAtingida}
                  onChange={(e) => setParteCorpoAtingida(e.target.value)}
                  placeholder="Ex: Mão direita, Olho esquerdo, Tornozelo direito"
                  required
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Agente Causador</label>
                <input
                  type="text"
                  value={agenteCausador}
                  onChange={(e) => setAgenteCausador(e.target.value)}
                  placeholder="Ex: Esmeril angular, Ferramenta de impacto, Queda de nível"
                  required
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Situação Geradora</label>
                <input
                  type="text"
                  value={situacaoGeradora}
                  onChange={(e) => setSituacaoGeradora(e.target.value)}
                  placeholder="Ex: Operação de esmerilhamento com projeção de fagulha"
                  required
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                />
              </div>
            </div>

            {/* Descrição detalhada */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Descrição Sucinta e Circunstanciada do Acidente
              </label>
              <textarea
                rows={3}
                value={descricaoAcidente}
                onChange={(e) => setDescricaoAcidente(e.target.value)}
                placeholder="Descreva de forma clara e objetiva o que o acidentado estava fazendo, que ferramenta utilizava, como ocorreu o evento e os primeiros socorros prestados..."
                required
                className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
              />
            </div>

            {/* Section 4: Atestado Médico */}
            <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200 space-y-3">
              <h3 className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-emerald-600" />
                Dados do Atestado Médico (Art. 22 § 1º)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Código CID-10</label>
                  <input
                    type="text"
                    value={cid10}
                    onChange={(e) => setCid10(e.target.value)}
                    placeholder="Ex: T15.0 - Corpo estranho na córnea"
                    required
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Diagnóstico Provável / Lesão</label>
                  <input
                    type="text"
                    value={descricaoCid}
                    onChange={(e) => setDescricaoCid(e.target.value)}
                    placeholder="Ex: Trauma conjuntival superficial"
                    required
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Houve Internação?</label>
                  <select
                    value={houveInternacao ? 'Sim' : 'Não'}
                    onChange={(e) => setHouveInternacao(e.target.value === 'Sim')}
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="Não">Não</option>
                    <option value="Sim">Sim</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Nome do Médico</label>
                  <input
                    type="text"
                    value={medicoNome}
                    onChange={(e) => setMedicoNome(e.target.value)}
                    required
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">CRM do Médico</label>
                  <input
                    type="text"
                    value={crm}
                    onChange={(e) => setCrm(e.target.value)}
                    required
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">UF do CRM</label>
                  <input
                    type="text"
                    value={crmUf}
                    onChange={(e) => setCrmUf(e.target.value)}
                    required
                    maxLength={2}
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setModoCriacao(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-5 py-2.5 rounded-lg text-xs font-bold shadow-md cursor-pointer"
              >
                <Send className="w-4 h-4" />
                Emitir e Transmitir CAT ao eSocial
              </button>
            </div>

          </form>
        </div>
      )}

      {/* Mode 2: Records List and Official Preview */}
      {!modoCriacao && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: CATs List */}
          <div className="lg:col-span-4 space-y-3 no-print">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              CATs Registradas ({cats.length})
            </h2>

            <div className="space-y-2">
              {cats.map((c) => {
                const isSelected = visualizandoCat?.id === c.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => setVisualizandoCat(c)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-red-50/50 border-red-500 shadow-xs ring-1 ring-red-500' 
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-red-700">
                        {c.numeroCat}
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        {c.statusEsocial}
                      </span>
                    </div>

                    <p className="font-bold text-xs text-slate-800 mt-1">
                      {c.colaboradorNome}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {c.cargo} • {c.tipoAcidente}
                    </p>

                    <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                      <span>Data: {new Date(c.dataAcidente).toLocaleDateString('pt-BR')}</span>
                      <span>CID: {c.atestadoMedico.cid10.split(' - ')[0]}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Official Form Printable Preview */}
          <div className="lg:col-span-8">
            {visualizandoCat ? (
              <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm print-page">
                
                {/* Print Action Bar */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 no-print">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-700">Recibo eSocial:</span>
                    <span className="text-[11px] font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                      {visualizandoCat.reciboEsocial}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleBaixarXmlEsocial(visualizandoCat)}
                      className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Exportar XML S-2210
                    </button>
                    {onGerarPdf && (
                      <button
                        onClick={onGerarPdf}
                        className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-xs cursor-pointer"
                        title="Baixar CAT Oficial em formato PDF"
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
                      Imprimir CAT Oficial
                    </button>
                  </div>
                </div>

                {/* Print Header */}
                <PrintHeader
                  tituloDocumento="COMUNICAÇÃO DE ACIDENTE DE TRABALHO - CAT"
                  subtituloDocumento="Evento eSocial S-2210 / Ministério da Previdência Social"
                  codigoDocumento={`CAT Nº ${visualizandoCat.numeroCat}`}
                  empresa={empresa}
                />

                {/* Quadros Oficiais da CAT */}
                <div className="space-y-4 text-xs">
                  
                  {/* Quadro 1: Emitente & Acidentado */}
                  <div className="border border-slate-300 rounded overflow-hidden">
                    <div className="bg-slate-100 px-3 py-1 font-bold text-slate-800 text-[11px] uppercase border-b border-slate-300">
                      I - Dados do Empregador e do Acidentado
                    </div>
                    <div className="p-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase">Tipo de CAT:</span>
                        <span className="font-bold text-slate-800">{visualizandoCat.tipoCat}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase">Nome do Acidentado:</span>
                        <span className="font-bold text-slate-800">{visualizandoCat.colaboradorNome}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase">CPF:</span>
                        <span className="font-mono text-slate-800">{visualizandoCat.colaboradorCpf}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase">Função / Cargo:</span>
                        <span className="text-slate-800 font-medium">{visualizandoCat.cargo}</span>
                      </div>
                    </div>
                  </div>

                  {/* Quadro 2: Dados do Acidente */}
                  <div className="border border-slate-300 rounded overflow-hidden">
                    <div className="bg-slate-100 px-3 py-1 font-bold text-slate-800 text-[11px] uppercase border-b border-slate-300">
                      II - Dados do Acidente ou da Doença Ocupacional
                    </div>
                    <div className="p-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase">Data do Acidente:</span>
                        <span className="font-bold text-slate-800">
                          {new Date(visualizandoCat.dataAcidente).toLocaleDateString('pt-BR')} às {visualizandoCat.horaAcidente}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase">Tipo:</span>
                        <span className="font-bold text-slate-800">{visualizandoCat.tipoAcidente}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase">Houve Afastamento?</span>
                        <span className="font-bold text-slate-800">
                          {visualizandoCat.houveAfastamento ? `Sim (${visualizandoCat.diasAfastamento} dias)` : 'Não'}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase">Morte Subsequente?</span>
                        <span className="font-bold text-slate-800">
                          {visualizandoCat.houveMorte ? 'SIM' : 'NÃO'}
                        </span>
                      </div>

                      <div className="sm:col-span-2">
                        <span className="text-[10px] text-slate-500 block uppercase">Local do Acidente:</span>
                        <span className="text-slate-800 font-medium">{visualizandoCat.localAcidente}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase">Parte do Corpo Atingida:</span>
                        <span className="text-slate-800 font-medium">{visualizandoCat.parteCorpoAtingida}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase">Agente Causador:</span>
                        <span className="text-slate-800 font-medium">{visualizandoCat.agenteCausador}</span>
                      </div>

                      <div className="sm:col-span-4 mt-1 pt-2 border-t border-slate-200">
                        <span className="text-[10px] text-slate-500 block uppercase font-bold">
                          Descrição Detalhada do Acidente:
                        </span>
                        <p className="text-slate-800 leading-relaxed mt-0.5 bg-slate-50 p-2 rounded border border-slate-200">
                          {visualizandoCat.descricaoAcidente}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Quadro 3: Laudo do Exame Médico */}
                  <div className="border border-slate-300 rounded overflow-hidden">
                    <div className="bg-slate-100 px-3 py-1 font-bold text-slate-800 text-[11px] uppercase border-b border-slate-300">
                      III - Laudo do Exame Médico / Atestado de Atendimento
                    </div>
                    <div className="p-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase">Data / Hora Atendimento:</span>
                        <span className="font-medium text-slate-800">
                          {new Date(visualizandoCat.atestadoMedico.dataAtendimento).toLocaleDateString('pt-BR')} às {visualizandoCat.atestadoMedico.horaAtendimento}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase">Houve Internação?</span>
                        <span className="font-bold text-slate-800">
                          {visualizandoCat.atestadoMedico.houveInternacao ? 'SIM' : 'NÃO'}
                        </span>
                      </div>
                      <div className="sm:col-span-2">
                        <span className="text-[10px] text-slate-500 block uppercase">Código CID-10:</span>
                        <span className="font-bold text-red-700 bg-red-50 px-1.5 py-0.5 rounded border border-red-200">
                          {visualizandoCat.atestadoMedico.cid10}
                        </span>
                      </div>

                      <div className="sm:col-span-2">
                        <span className="text-[10px] text-slate-500 block uppercase">Diagnóstico Provável:</span>
                        <span className="text-slate-800 font-medium">{visualizandoCat.atestadoMedico.descricaoCid}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase">Médico Assistente:</span>
                        <span className="text-slate-800 font-medium">{visualizandoCat.atestadoMedico.medicoNome}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase">CRM:</span>
                        <span className="text-slate-800 font-mono font-bold">
                          {visualizandoCat.atestadoMedico.crm} / {visualizandoCat.atestadoMedico.crmUf}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Signatures */}
                  <div className="pt-8 grid grid-cols-2 gap-8 text-center">
                    <div className="border-t border-slate-400 pt-2">
                      <p className="font-bold text-slate-900">{empresa.razaoSocial}</p>
                      <p className="text-[10px] text-slate-500">Empregador / Responsável SST</p>
                    </div>
                    <div className="border-t border-slate-400 pt-2">
                      <p className="font-bold text-slate-900">{visualizandoCat.atestadoMedico.medicoNome}</p>
                      <p className="text-[10px] text-slate-500">
                        Médico Emitente - CRM {visualizandoCat.atestadoMedico.crm}/{visualizandoCat.atestadoMedico.crmUf}
                      </p>
                    </div>
                  </div>

                </div>

              </div>
            ) : (
              <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500">
                Nenhuma CAT selecionada. Clique em uma das CATs à esquerda ou em "Emitir Nova CAT".
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
};

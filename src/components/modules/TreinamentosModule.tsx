import React, { useState } from 'react';
import { 
  GraduationCap, 
  PlusCircle, 
  Printer, 
  CheckCircle2, 
  Clock, 
  Award, 
  Calendar, 
  Users, 
  ArrowLeft,
  FileCheck,
  Building,
  Sparkles,
  FileDown,
  ShieldCheck,
  Compass,
  FileText,
  Loader2
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { TreinamentoNR, Empresa, Colaborador } from '../../types/sst';
import { PrintHeader } from '../common/PrintHeader';
import { exportarElementoParaPdf } from '../../utils/pdfGenerator';

interface TreinamentosModuleProps {
  empresa: Empresa;
  colaboradores: Colaborador[];
  treinamentos: TreinamentoNR[];
  onAdicionarTreinamento: (novo: TreinamentoNR) => void;
  onImprimir: () => void;
  onGerarPdf?: () => void;
}

export const TreinamentosModule: React.FC<TreinamentosModuleProps> = ({
  empresa,
  colaboradores,
  treinamentos,
  onAdicionarTreinamento,
  onImprimir,
  onGerarPdf
}) => {
  const [treinamentoSelecionado, setTreinamentoSelecionado] = useState<TreinamentoNR>(treinamentos[0]);
  const [alunoCertificado, setAlunoCertificado] = useState<string>(treinamentos[0]?.participantes[0]?.nome || '');
  const [modoCriacao, setModoCriacao] = useState(false);
  const [visualizarCertificado, setVisualizarCertificado] = useState(false);
  const [pdfCarregando, setPdfCarregando] = useState(false);

  // Helper para cálculo da data de validade legal do certificado
  const calcularDataValidade = (dataInicioStr: string, meses: number) => {
    try {
      const d = new Date(dataInicioStr);
      d.setMonth(d.getMonth() + meses);
      return d.toLocaleDateString('pt-BR');
    } catch {
      return `${meses} meses`;
    }
  };

  // Impressão nativa do navegador configurando automaticamente a folha em Paisagem (Landscape)
  const handleImprimirCertificado = () => {
    const style = document.createElement('style');
    style.id = 'landscape-print-style';
    style.textContent = `
      @page { size: A4 landscape !important; margin: 5mm !important; }
      @media print {
        body { margin: 0 !important; padding: 0 !important; background: #ffffff !important; }
        .no-print { display: none !important; }
        body * { visibility: hidden !important; }
        #certificado-treinamento-container, #certificado-treinamento-container * {
          visibility: visible !important;
        }
        #certificado-treinamento-container {
          position: absolute !important;
          left: 0 !important;
          top: 0 !important;
          width: 287mm !important;
          max-width: 287mm !important;
          height: auto !important;
          max-height: 200mm !important;
          box-sizing: border-box !important;
          page-break-inside: avoid !important;
          break-inside: avoid !important;
          page-break-after: avoid !important;
          border: 8px double #064e3b !important;
          padding: 5mm 7mm !important;
        }
      }
    `;
    document.head.appendChild(style);

    window.print();

    setTimeout(() => {
      const el = document.getElementById('landscape-print-style');
      if (el) el.remove();
    }, 1500);
  };

  // Exportação direta do Certificado Oficial em Folha Paisagem
  const handleGerarPdfCertificado = async () => {
    if (!participanteAtual) return;
    setPdfCarregando(true);
    const nomeAluno = participanteAtual.nome.replace(/\s+/g, '-');
    const nr = treinamentoSelecionado.nrCodigo.replace(/[^a-zA-Z0-9]/g, '');
    const filename = `CONSULPREV-Certificado-Paisagem-${nr}-${nomeAluno}.pdf`;

    try {
      await exportarElementoParaPdf({
        filename,
        elementId: 'certificado-treinamento-container',
        orientation: 'landscape',
        singlePage: true,
        marginMm: 5
      });
    } finally {
      setPdfCarregando(false);
    }
  };

  // Form states
  const [nrCodigo, setNrCodigo] = useState('NR-35');
  const [titulo, setTitulo] = useState('Capacitação para Trabalho em Altura (NR-35)');
  const [tipo, setTipo] = useState<'Inicial' | 'Periódico' | 'Eventual'>('Inicial');
  const [cargaHorariaHoras, setCargaHorariaHoras] = useState(8);
  const [instrutorNome, setInstrutorNome] = useState('Marcos França');
  const [instrutorRegistro, setInstrutorRegistro] = useState('Instrutor e Especialista em Segurança do Trabalho • Reg. MTE 0048219/SP');
  const [dataInicio, setDataInicio] = useState(new Date().toISOString().split('T')[0]);
  const [validadeMeses, setValidadeMeses] = useState(24);

  const handleSalvarTreinamento = (e: React.FormEvent) => {
    e.preventDefault();
    const dataTermino = dataInicio;

    const novo: TreinamentoNR = {
      id: `treina-${Date.now()}`,
      nrCodigo,
      titulo,
      tipo,
      cargaHorariaHoras,
      modalidade: 'Presencial',
      instrutorNome,
      instrutorRegistro,
      responsavelTecnico: empresa.responsavelSST,
      dataInicio,
      dataTermino,
      validadeMeses,
      conteudoProgramatico: [
        'Normas e regulamentos aplicáveis ao trabalho em altura',
        'Análise de Risco e condições impeditivas',
        'Sistemas de Ancoragem e Linhas de Vida',
        'Equipamentos de Proteção Individual: seleção, inspeção, conservação e limitação de uso',
        'Condutas em situações de emergência e noções de técnicas de resgate'
      ],
      participantes: colaboradores.slice(0, 3).map(c => ({
        colaboradorId: c.id,
        nome: c.nome,
        cpf: c.cpf,
        funcao: c.cargo,
        notaAvaliacao: 9.5,
        aprovado: true,
        numeroCertificado: `CERT-${nrCodigo}-2026-${Math.floor(1000 + Math.random() * 9000)}`
      })),
      status: 'Concluído'
    };

    onAdicionarTreinamento(novo);
    setTreinamentoSelecionado(novo);
    setAlunoCertificado(novo.participantes[0]?.nome || '');
    setModoCriacao(false);
  };

  const participanteAtual = treinamentoSelecionado.participantes.find(
    p => p.nome === alunoCertificado
  ) || treinamentoSelecionado.participantes[0];

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 no-print">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
            <GraduationCap className="w-5 h-5" />
          </span>
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Treinamentos das NRs e Emissão de Certificados
            </h1>
            <p className="text-xs text-slate-500">
              Gestão de capacitações obrigatórias conforme NR-01 (itens 1.7 e Anexo II) e emissão de certificados oficiais
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
                Registrar Turma de Treinamento
              </button>
              <button
                onClick={() => {
                  setVisualizarCertificado(!visualizarCertificado);
                }}
                className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white px-3.5 py-2 rounded-lg text-xs font-bold shadow-xs cursor-pointer"
              >
                <Award className="w-4 h-4" />
                {visualizarCertificado ? 'Ver Ata da Turma' : 'Ver Certificado Individual'}
              </button>
            </>
          ) : (
            <button
              onClick={() => setModoCriacao(false)}
              className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar aos Treinamentos
            </button>
          )}
        </div>
      </div>

      {modoCriacao ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 no-print">
          <h2 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
            Cadastrar Nova Turma de Treinamento Regulamentar
          </h2>

          <form onSubmit={handleSalvarTreinamento} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Norma Regulamentadora</label>
                <select
                  value={nrCodigo}
                  onChange={(e) => setNrCodigo(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white font-bold text-emerald-800"
                >
                  <option value="NR-35">NR-35 - Trabalho em Altura</option>
                  <option value="NR-10">NR-10 - Segurança em Eletricidade</option>
                  <option value="NR-33">NR-33 - Espaço Confinado</option>
                  <option value="NR-12">NR-12 - Máquinas e Equipamentos</option>
                  <option value="NR-05">NR-05 - CIPA e Prevenção de Assédio</option>
                  <option value="NR-06">NR-06 - Equipamentos de Proteção Individual</option>
                  <option value="NR-23">NR-23 - Brigada e Proteção Contra Incêndios</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Título do Treinamento</label>
                <input
                  type="text"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  required
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tipo de Treinamento</label>
                <select
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value as any)}
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                >
                  <option value="Inicial">Inicial</option>
                  <option value="Periódico">Periódico (Reciclagem)</option>
                  <option value="Eventual">Eventual</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Carga Horária (horas)</label>
                <input
                  type="number"
                  value={cargaHorariaHoras}
                  onChange={(e) => setCargaHorariaHoras(Number(e.target.value))}
                  required
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Data de Realização</label>
                <input
                  type="date"
                  value={dataInicio}
                  onChange={(e) => setDataInicio(e.target.value)}
                  required
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Validade do Treinamento</label>
                <select
                  value={validadeMeses}
                  onChange={(e) => setValidadeMeses(Number(e.target.value))}
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                >
                  <option value={12}>1 ano (12 meses)</option>
                  <option value={24}>2 anos (24 meses - Padrão NR-35/NR-10)</option>
                  <option value={36}>3 anos (36 meses)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nome do Instrutor Habilitado</label>
                <input
                  type="text"
                  value={instrutorNome}
                  onChange={(e) => setInstrutorNome(e.target.value)}
                  required
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Qualificação / Registro Profissional</label>
                <input
                  type="text"
                  value={instrutorRegistro}
                  onChange={(e) => setInstrutorRegistro(e.target.value)}
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
                Concluir e Gerar Certificados
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Side List - Visível quando estiver na visualização de Ata */}
          {!visualizarCertificado && (
            <div className="lg:col-span-4 space-y-2 no-print">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Treinamentos Registrados ({treinamentos.length})
              </h3>
              {treinamentos.map((t) => (
                <div
                  key={t.id}
                  onClick={() => {
                    setTreinamentoSelecionado(t);
                    setAlunoCertificado(t.participantes[0]?.nome || '');
                  }}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    treinamentoSelecionado.id === t.id
                      ? 'bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      {t.nrCodigo}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">
                      {t.cargaHorariaHoras} horas • {t.tipo}
                    </span>
                  </div>
                  <p className="font-bold text-xs text-slate-900 mt-1.5">{t.titulo}</p>
                  <p className="text-[11px] text-slate-500">{t.participantes.length} concluintes certificados</p>
                  <div className="mt-2 text-[10px] text-slate-400">
                    Status: {t.status}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Right / Full-width Preview */}
          <div className={visualizarCertificado ? "lg:col-span-12" : "lg:col-span-8"}>
            
            {visualizarCertificado && participanteAtual ? (
              /* CERTIFICADO OFICIAL EM FORMATO FOLHA PAISAGEM (A4 LANDSCAPE) */
              <div className="space-y-4">
                
                {/* Barra de Controles e Seleção do Certificado em Paisagem */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 no-print">
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setVisualizarCertificado(false)}
                      className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-emerald-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Voltar para Ata da Turma</span>
                    </button>

                    <div className="h-4 w-px bg-slate-300 hidden sm:block"></div>

                    <div className="flex items-center gap-2">
                      <label className="text-xs font-bold text-slate-600">Treinamento:</label>
                      <select
                        value={treinamentoSelecionado.id}
                        onChange={(e) => {
                          const selecionado = treinamentos.find(t => t.id === e.target.value);
                          if (selecionado) {
                            setTreinamentoSelecionado(selecionado);
                            setAlunoCertificado(selecionado.participantes[0]?.nome || '');
                          }
                        }}
                        className="text-xs p-1.5 rounded-lg border border-slate-300 bg-white font-bold text-slate-800 max-w-[220px]"
                      >
                        {treinamentos.map(t => (
                          <option key={t.id} value={t.id}>
                            {t.nrCodigo} - {t.titulo}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="text-xs font-bold text-slate-600">Aluno:</label>
                      <select
                        value={alunoCertificado}
                        onChange={(e) => setAlunoCertificado(e.target.value)}
                        className="text-xs p-1.5 rounded-lg border border-slate-300 bg-white font-bold text-slate-800"
                      >
                        {treinamentoSelecionado.participantes.map(p => (
                          <option key={p.colaboradorId} value={p.nome}>
                            {p.nome} ({p.funcao})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Instrutor Oficial Marcos França */}
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs bg-emerald-50 text-emerald-900 border border-emerald-300/80 font-semibold">
                      <span className="text-emerald-700">Instrutor:</span>
                      <strong className="text-emerald-950 font-black">
                        {treinamentoSelecionado.instrutorNome || 'Marcos França'}
                      </strong>
                    </div>

                    {/* Badge de Orientação Paisagem */}
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-extrabold bg-amber-50 text-amber-900 border border-amber-300/80 shadow-2xs">
                      <Compass className="w-3.5 h-3.5 text-amber-700" />
                      <span>Folha Paisagem Oficial (A4 297 × 210 mm)</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleGerarPdfCertificado}
                      disabled={pdfCarregando}
                      className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold shadow-xs cursor-pointer transition-colors disabled:opacity-50"
                      title="Baixar Certificado Oficial em Folha Paisagem"
                    >
                      {pdfCarregando ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <FileDown className="w-3.5 h-3.5" />
                      )}
                      <span>Gerar PDF (Paisagem)</span>
                    </button>
                    <button
                      onClick={handleImprimirCertificado}
                      className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold shadow-xs cursor-pointer transition-colors"
                      title="Imprimir com orientação de folha paisagem automática"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Imprimir Certificado (Paisagem)</span>
                    </button>
                  </div>
                </div>

                {/* VISUALIZAÇÃO DO CERTIFICADO OFICIAL EM FORMATO PAISAGEM */}
                <div className="w-full overflow-x-auto pb-4">
                  <div 
                    id="certificado-treinamento-container"
                    data-orientation="landscape"
                    data-single-page="true"
                    className="bg-white rounded-xl border-[8px] border-double border-emerald-900 shadow-xl print-page print-landscape p-5 sm:p-6 relative overflow-hidden text-slate-900 w-[1050px] max-w-full mx-auto select-none space-y-2 box-border"
                  >
                    {/* Filigranas nos 4 cantos do certificado */}
                    <div className="absolute top-2 left-2 w-7 h-7 border-t-2 border-l-2 border-emerald-800/60 pointer-events-none" />
                    <div className="absolute top-2 right-2 w-7 h-7 border-t-2 border-r-2 border-emerald-800/60 pointer-events-none" />
                    <div className="absolute bottom-2 left-2 w-7 h-7 border-b-2 border-l-2 border-emerald-800/60 pointer-events-none" />
                    <div className="absolute bottom-2 right-2 w-7 h-7 border-b-2 border-r-2 border-emerald-800/60 pointer-events-none" />

                    {/* Marca d'água de fundo */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                      <GraduationCap className="w-96 h-96 text-emerald-950" />
                    </div>

                    {/* Cabeçalho Oficial do Certificado (Layout Horizontal em 3 Colunas) */}
                    <div className="grid grid-cols-12 items-center gap-4 pb-1.5 border-b border-emerald-800/20">
                      <div className="col-span-4 text-left space-y-0.5">
                        <div className="text-xs font-black tracking-wider text-emerald-950 flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                          <span className="truncate">{empresa.razaoSocial}</span>
                        </div>
                        <div className="text-[10px] text-slate-600 font-semibold leading-tight">
                          Departamento de Segurança e Saúde no Trabalho
                        </div>
                        <div className="text-[9px] text-slate-500 font-mono">
                          CNPJ: {empresa.cnpj} • Sistema CONSULPREV SST
                        </div>
                      </div>

                      <div className="col-span-4 text-center space-y-0.5">
                        <div className="text-[9px] font-black uppercase tracking-widest text-slate-600">
                          REPÚBLICA FEDERATIVA DO BRASIL
                        </div>
                        <div className="text-xs font-black uppercase tracking-wider text-emerald-950">
                          MINISTÉRIO DO TRABALHO E EMPREGO — SIT
                        </div>
                        <div className="text-[10px] font-bold text-slate-700">
                          DEPARTAMENTO DE SEGURANÇA E SAÚDE NO TRABALHO
                        </div>
                      </div>

                      <div className="col-span-4 text-right space-y-0.5 bg-slate-50/80 border border-slate-200 rounded-lg p-1.5 font-mono text-[10px]">
                        <div><span className="text-slate-500">CERTIFICADO:</span> <strong className="text-slate-900">{participanteAtual.numeroCertificado}</strong></div>
                        <div><span className="text-slate-500">LIVRO:</span> <strong className="text-slate-900">04-SST</strong> • <span className="text-slate-500">FLS:</span> <strong className="text-slate-900">112</strong></div>
                        <div><span className="text-slate-500">DATA EMISSÃO:</span> <strong className="text-slate-900">{new Date(treinamentoSelecionado.dataInicio).toLocaleDateString('pt-BR')}</strong></div>
                      </div>
                    </div>

                    {/* Faixa Ornamental Divisória */}
                    <div className="relative flex py-0.5 items-center">
                      <div className="flex-grow border-t-2 border-emerald-900/30"></div>
                      <span className="flex-shrink mx-4 text-[9.5px] font-black uppercase tracking-widest text-emerald-900 px-3 py-0.5 bg-emerald-50 rounded-full border border-emerald-300 shadow-2xs">
                        Capacitação Profissional • Norma Regulamentadora do MTE
                      </span>
                      <div className="flex-grow border-t-2 border-emerald-900/30"></div>
                    </div>

                    {/* Título Principal do Certificado */}
                    <div className="text-center space-y-0.5">
                      <h1 className="text-xl sm:text-2xl font-black text-emerald-950 tracking-wider uppercase font-serif">
                        CERTIFICADO DE CAPACITAÇÃO PROFISSIONAL
                      </h1>
                      <p className="text-[10.5px] font-bold text-emerald-800 uppercase tracking-widest">
                        Em Conformidade com o Item 1.7 e Anexo II da Norma Regulamentadora nº 01 (Portaria MTP nº 672/2021) e a {treinamentoSelecionado.nrCodigo}
                      </p>
                    </div>

                    {/* Texto Legal Declaratório com Nome do Colaborador em Destaque */}
                    <div className="text-center text-xs text-slate-800 leading-relaxed px-3.5 py-1.5 bg-slate-50/70 rounded-xl border border-slate-200/80">
                      <p className="text-slate-600 mb-0.5 font-medium text-[11px]">Certificamos para os devidos fins legais que o(a) colaborador(a):</p>
                      <div className="text-lg sm:text-xl font-black text-emerald-950 uppercase tracking-wide border-b-2 border-emerald-700/40 inline-block px-3 pb-0.5 my-0.5">
                        {participanteAtual.nome}
                      </div>
                      <p className="text-slate-700 mt-0.5 text-[11px] leading-relaxed">
                        portador(a) do CPF nº <strong className="text-slate-950">{participanteAtual.cpf}</strong>, exercendo a função de <strong className="text-slate-950">{participanteAtual.funcao}</strong> na empresa <strong className="text-slate-950">{empresa.razaoSocial}</strong> (CNPJ: {empresa.cnpj}), concluiu com frequência integral de 100% e pleno aproveitamento o treinamento obrigatório de:
                      </p>
                      <div className="bg-emerald-100/70 border border-emerald-300 rounded-lg py-1 px-4 text-center my-1 max-w-2xl mx-auto shadow-2xs">
                        <span className="text-sm sm:text-base font-black text-emerald-950 uppercase tracking-wide">
                          {treinamentoSelecionado.titulo} • {treinamentoSelecionado.nrCodigo}
                        </span>
                      </div>
                    </div>

                    {/* Grade de 4 Metadados Oficiais do Curso */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                      <div className="p-1.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
                        <span className="text-[9px] uppercase font-bold text-slate-500 block">Carga Horária Total</span>
                        <strong className="text-slate-900 text-xs">{treinamentoSelecionado.cargaHorariaHoras} Horas</strong>
                      </div>
                      <div className="p-1.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
                        <span className="text-[9px] uppercase font-bold text-slate-500 block">Modalidade do Curso</span>
                        <strong className="text-slate-900 text-xs">{treinamentoSelecionado.modalidade} (Teórico/Prático)</strong>
                      </div>
                      <div className="p-1.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
                        <span className="text-[9px] uppercase font-bold text-slate-500 block">Aproveitamento Final</span>
                        <strong className="text-emerald-800 text-xs">{participanteAtual.notaAvaliacao} / 10.0 (Aprovado)</strong>
                      </div>
                      <div className="p-1.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
                        <span className="text-[9px] uppercase font-bold text-slate-500 block">Validade Jurídica</span>
                        <strong className="text-slate-900 text-xs">{treinamentoSelecionado.validadeMeses} Meses (Até {calcularDataValidade(treinamentoSelecionado.dataInicio, treinamentoSelecionado.validadeMeses)})</strong>
                      </div>
                    </div>

                    {/* Bloco Horizontal Paisagem: Conteúdo Programático + Validação Digital com QR Code */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-2 text-xs">
                      <div className="md:col-span-8 border border-slate-300 rounded-xl p-2 bg-white shadow-2xs">
                        <span className="font-black text-[9.5px] uppercase tracking-wider text-emerald-900 block mb-1 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                          Conteúdo Programático Teórico e Prático Ministrado:
                        </span>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-0.5 text-[10px] text-slate-700 leading-tight">
                          {treinamentoSelecionado.conteudoProgramatico.map((cp, idx) => (
                            <li key={idx} className="flex items-start gap-1">
                              <span className="text-emerald-600 font-bold">✓</span>
                              <span>{cp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="md:col-span-4 border border-emerald-200 bg-emerald-50/50 rounded-xl p-2 flex items-center gap-2.5 shadow-2xs">
                        <div className="bg-white p-1 rounded-lg border border-emerald-300 shrink-0 shadow-2xs">
                          <QRCodeSVG 
                            value={`https://consulprev-sst.gov.br/validar/${participanteAtual.numeroCertificado}`} 
                            size={50} 
                            level="M" 
                          />
                        </div>
                        <div className="space-y-0.5 text-[9.5px]">
                          <div className="font-extrabold text-emerald-950 uppercase tracking-wider text-[8.5px]">Autenticação Digital</div>
                          <div className="font-mono text-slate-700 text-[8.5px] truncate">Código: {participanteAtual.numeroCertificado}</div>
                          <div className="text-[8px] text-slate-500 leading-tight">
                            Válido em todo território nacional conforme Art. 157 da CLT e NR-01 do MTE.
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 3 Linhas de Assinaturas Oficiais em Linha Horizontal Paisagem */}
                    <div className="pt-2 grid grid-cols-3 gap-6 text-center text-xs">
                      <div className="border-t border-slate-500 pt-1 space-y-0.5">
                        <p className="font-bold text-slate-900 text-xs">{treinamentoSelecionado.instrutorNome || 'Marcos França'}</p>
                        <p className="text-[9.5px] text-slate-600 leading-tight">{treinamentoSelecionado.instrutorRegistro || 'Instrutor e Especialista em Segurança do Trabalho • Reg. MTE 0048219/SP'}</p>
                        <p className="text-[8.5px] text-slate-500 uppercase font-semibold">Instrutor Responsável</p>
                      </div>

                      <div className="border-t border-slate-500 pt-1 space-y-0.5">
                        <p className="font-bold text-slate-900 text-xs">{treinamentoSelecionado.responsavelTecnico}</p>
                        <p className="text-[9.5px] text-slate-600 leading-tight">Departamento de SST • {empresa.razaoSocial}</p>
                        <p className="text-[8.5px] text-slate-500 uppercase font-semibold">Responsável Técnico / Empresa</p>
                      </div>

                      <div className="border-t border-slate-500 pt-1 space-y-0.5">
                        <p className="font-bold text-slate-900 text-xs">{participanteAtual.nome}</p>
                        <p className="text-[9.5px] text-slate-600 leading-tight">CPF: {participanteAtual.cpf}</p>
                        <p className="text-[8.5px] text-slate-500 uppercase font-semibold">Assinatura do(a) Trabalhador(a)</p>
                      </div>
                    </div>

                    {/* Rodapé Oficial com menção à Folha Paisagem e Segurança */}
                    <div className="text-center pt-1 text-[8.5px] text-slate-400 font-mono border-t border-slate-200">
                      Registro de Autenticidade: {participanteAtual.numeroCertificado} • Emissão em Folha Paisagem A4 (297 × 210 mm) • Instrutor: {treinamentoSelecionado.instrutorNome || 'Marcos França'} • CONSULPREV SST
                    </div>

                  </div>
                </div>

              </div>
            ) : (
              /* ATA GERAL DA TURMA */
              <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm print-page">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 no-print">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded">
                    Ata de Frequência e Conclusão de Treinamento
                  </span>
                  <div className="flex items-center gap-2">
                    {onGerarPdf && (
                      <button
                        onClick={onGerarPdf}
                        className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-xs cursor-pointer"
                        title="Baixar Ata Oficial em PDF"
                      >
                        <FileDown className="w-3.5 h-3.5" />
                        <span>Gerar PDF</span>
                      </button>
                    )}
                    <button
                      onClick={onImprimir}
                      className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-xs cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      Imprimir Ata de Treinamento
                    </button>
                  </div>
                </div>

                <PrintHeader
                  tituloDocumento={`REGISTRO E ATA DE TREINAMENTO - ${treinamentoSelecionado.nrCodigo}`}
                  subtituloDocumento={treinamentoSelecionado.titulo}
                  codigoDocumento={`TREINA-${treinamentoSelecionado.id.toUpperCase()}`}
                  empresa={empresa}
                />

                <div className="space-y-4 text-xs">
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">Carga Horária:</span>
                      <span className="font-bold text-slate-800">{treinamentoSelecionado.cargaHorariaHoras} horas</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">Data Realização:</span>
                      <span className="text-slate-800 font-medium">
                        {new Date(treinamentoSelecionado.dataInicio).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">Instrutor:</span>
                      <span className="text-slate-800 font-medium">{treinamentoSelecionado.instrutorNome}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">Validade:</span>
                      <span className="text-emerald-700 font-bold">
                        {treinamentoSelecionado.validadeMeses} meses
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-xs uppercase mb-2">
                      Relação de Trabalhadores Aprovados na Turma
                    </h3>
                    <div className="border border-slate-200 rounded-lg overflow-hidden">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead className="bg-slate-100 text-slate-700 font-bold">
                          <tr>
                            <th className="p-2.5">Trabalhador</th>
                            <th className="p-2.5">CPF</th>
                            <th className="p-2.5">Cargo</th>
                            <th className="p-2.5 text-center">Aproveitamento</th>
                            <th className="p-2.5">Nº Certificado</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {treinamentoSelecionado.participantes.map((p, idx) => (
                            <tr key={idx} className="hover:bg-slate-50">
                              <td className="p-2.5 font-bold text-slate-900">{p.nome}</td>
                              <td className="p-2.5 font-mono text-slate-600">{p.cpf}</td>
                              <td className="p-2.5 text-slate-700">{p.funcao}</td>
                              <td className="p-2.5 text-center font-bold text-emerald-700">
                                {p.notaAvaliacao} (Aprovado)
                              </td>
                              <td className="p-2.5 font-mono text-[11px] text-slate-500">
                                {p.numeroCertificado}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
};

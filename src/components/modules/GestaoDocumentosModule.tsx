import React, { useState, useMemo } from 'react';
import { 
  FolderLock, 
  PlusCircle, 
  Printer, 
  Download, 
  Search, 
  Filter, 
  FileText, 
  ShieldCheck, 
  Clock, 
  Calendar, 
  ArrowLeft,
  FileBadge,
  CheckCircle2,
  AlertCircle,
  FileDown
} from 'lucide-react';
import { DocumentoSST, Empresa } from '../../types/sst';
import { PrintHeader } from '../common/PrintHeader';

interface GestaoDocumentosModuleProps {
  empresa: Empresa;
  documentos: DocumentoSST[];
  onAdicionarDocumento: (novo: DocumentoSST) => void;
  onImprimir: () => void;
  onGerarPdf?: () => void;
}

export const GestaoDocumentosModule: React.FC<GestaoDocumentosModuleProps> = ({
  empresa,
  documentos,
  onAdicionarDocumento,
  onImprimir,
  onGerarPdf
}) => {
  const [busca, setBusca] = useState('');
  const [filtroTipo, setFiltroTipo] = useState<string>('Todos');
  const [modoCriacao, setModoCriacao] = useState(false);

  // Form states
  const [titulo, setTitulo] = useState('Ordem de Serviço de Segurança (NR-01) - Soldador');
  const [tipo, setTipo] = useState<DocumentoSST['tipo']>('PGR');
  const [responsavel, setResponsavel] = useState('Eng. Roberto Fontes Guimarães');
  const [validadeMeses, setValidadeMeses] = useState(12);

  const handleSalvarDocumento = (e: React.FormEvent) => {
    e.preventDefault();
    const dataEmissao = new Date().toISOString().split('T')[0];
    const dVal = new Date();
    dVal.setMonth(dVal.getMonth() + validadeMeses);

    const novo: DocumentoSST = {
      id: `doc-${Date.now()}`,
      tipo,
      codigo: `DOC-SST-2026-${Math.floor(100 + Math.random() * 900)}`,
      titulo,
      empresa: empresa.razaoSocial,
      dataEmissao,
      dataValidade: dVal.toISOString().split('T')[0],
      responsavelTecnico: responsavel,
      statusVigencia: 'Vigente',
      tamanhoArquivo: '3.2 MB'
    };

    onAdicionarDocumento(novo);
    setModoCriacao(false);
  };

  const documentosFiltrados = useMemo(() => {
    return documentos.filter(doc => {
      const matchBusca = 
        doc.titulo.toLowerCase().includes(busca.toLowerCase()) ||
        doc.codigo.toLowerCase().includes(busca.toLowerCase()) ||
        doc.responsavelTecnico.toLowerCase().includes(busca.toLowerCase());
      
      const matchTipo = filtroTipo === 'Todos' || doc.tipo === filtroTipo;

      return matchBusca && matchTipo;
    });
  }, [documentos, busca, filtroTipo]);

  return (
    <div className="space-y-6">
      
      {/* Title Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 no-print">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
            <FolderLock className="w-5 h-5" />
          </span>
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Gestão de Documentos, Laudos e Prontuários de SST
            </h1>
            <p className="text-xs text-slate-500">
              Repositório digital com controle de temporalidade de guarda legal (20 anos CLT/MTE) e validades
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setModoCriacao(true)}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-lg text-xs font-bold shadow-xs cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            Cadastrar Novo Documento
          </button>
          {onGerarPdf && (
            <button
              onClick={onGerarPdf}
              className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white px-3.5 py-2 rounded-lg text-xs font-semibold cursor-pointer shadow-xs"
              title="Gerar e salvar PDF do inventário documental"
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
            Imprimir Inventário
          </button>
        </div>
      </div>

      {modoCriacao ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 no-print">
          <h2 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
            Protocolar Novo Documento Técnico no Repositório
          </h2>

          <form onSubmit={handleSalvarDocumento} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Título do Documento / Programa</label>
                <input
                  type="text"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  required
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tipo de Documento</label>
                <select
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value as any)}
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white font-medium"
                >
                  <option value="PGR">PGR (Programa de Gerenciamento de Riscos)</option>
                  <option value="PCMSO">PCMSO (Programa de Controle Médico)</option>
                  <option value="LTCAT">LTCAT (Laudo Técnico das Condições Ambientais)</option>
                  <option value="Laudo de Insalubridade">Laudo de Insalubridade (NR-15)</option>
                  <option value="AET">AET (Análise Ergonômica do Trabalho - NR-17)</option>
                  <option value="APR">APR (Análise Preliminar de Risco)</option>
                  <option value="CAT">CAT (Comunicação de Acidente de Trabalho)</option>
                  <option value="ASO">ASO (Atestado de Saúde Ocupacional)</option>
                  <option value="Certificado NR">Certificado NR</option>
                  <option value="Ficha de EPI">Ficha de EPI</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Responsável pela Elaboração</label>
                <input
                  type="text"
                  value={responsavel}
                  onChange={(e) => setResponsavel(e.target.value)}
                  required
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Vigência / Validade</label>
                <select
                  value={validadeMeses}
                  onChange={(e) => setValidadeMeses(Number(e.target.value))}
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white font-medium"
                >
                  <option value={12}>1 Ano (12 meses)</option>
                  <option value={24}>2 Anos (24 meses - PGR padrão)</option>
                  <option value={36}>3 Anos (36 meses)</option>
                  <option value={60}>5 Anos (60 meses)</option>
                </select>
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
                Protocolar e Salvar no Repositório
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm print-page">
          
          <PrintHeader
            tituloDocumento="INVENTÁRIO E CONTROLE DE GESTÃO DE DOCUMENTOS DE SST"
            subtituloDocumento="Repositório Digital de Conformidade e Prazos de Guarda Legal (CLT / NRs)"
            codigoDocumento="GED-SST-2026"
            empresa={empresa}
            onImprimir={onImprimir}
            onGerarPdf={onGerarPdf}
          />

          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between pb-4 mb-4 border-b border-slate-200 no-print">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Buscar documento, código ou responsável..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-slate-50 focus:bg-white outline-hidden"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto">
              <span className="text-xs text-slate-500 font-bold">Tipo:</span>
              {['Todos', 'PGR', 'PCMSO', 'LTCAT', 'AET', 'Laudo de Insalubridade'].map((tp) => (
                <button
                  key={tp}
                  onClick={() => setFiltroTipo(tp)}
                  className={`px-2.5 py-1 rounded text-xs font-medium cursor-pointer whitespace-nowrap ${
                    filtroTipo === tp ? 'bg-slate-900 text-white font-bold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tp}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-300">
                <tr>
                  <th className="p-3">Identificador / Título</th>
                  <th className="p-3">Tipo</th>
                  <th className="p-3">Data Emissão</th>
                  <th className="p-3">Validade</th>
                  <th className="p-3">Status Vigência</th>
                  <th className="p-3 text-right no-print">Download</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {documentosFiltrados.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/70">
                    <td className="p-3">
                      <span className="font-bold text-slate-900 block">{doc.titulo}</span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {doc.codigo} • Resp: {doc.responsavelTecnico}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-[10px] font-medium border border-slate-200">
                        {doc.tipo}
                      </span>
                    </td>
                    <td className="p-3 font-medium text-slate-700">
                      {new Date(doc.dataEmissao).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="p-3 font-bold text-slate-900">
                      {new Date(doc.dataValidade).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        doc.statusVigencia === 'Vigente' ? 'bg-emerald-100 text-emerald-800' :
                        doc.statusVigencia === 'Em Renovação' ? 'bg-amber-100 text-amber-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {doc.statusVigencia}
                      </span>
                    </td>
                    <td className="p-3 text-right no-print">
                      <button
                        onClick={() => alert(`Baixando cópia digital autenticada de: ${doc.titulo} (${doc.tamanhoArquivo})`)}
                        className="inline-flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-800 px-2.5 py-1 rounded text-[11px] font-bold cursor-pointer"
                        title="Baixar arquivo em PDF"
                      >
                        <Download className="w-3 h-3" />
                        PDF
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

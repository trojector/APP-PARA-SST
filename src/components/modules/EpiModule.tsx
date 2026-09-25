import React, { useState } from 'react';
import { 
  Shield, 
  HardHat, 
  Search, 
  Plus, 
  Printer, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  FileText, 
  Filter, 
  User, 
  Calendar, 
  Tag, 
  Package, 
  Eye, 
  Download, 
  ChevronRight,
  Sparkles,
  ArrowRight,
  FileDown
} from 'lucide-react';
import { Empresa, Colaborador, EPIItem, FichaEntregaEPI, RegistroEntregaItem, CategoriaEPI } from '../../types/sst';
import { PrintHeader } from '../common/PrintHeader';

interface EpiModuleProps {
  empresa: Empresa;
  colaboradores: Colaborador[];
  epis: EPIItem[];
  fichas: FichaEntregaEPI[];
  onAdicionarEntrega: (colaboradorId: string, novaEntrega: RegistroEntregaItem) => void;
  onAdicionarEpiAoCatalogo: (novoEpi: EPIItem) => void;
  onImprimir: () => void;
  onGerarPdf?: () => void;
}

export const EpiModule: React.FC<EpiModuleProps> = ({
  empresa,
  colaboradores,
  epis,
  fichas,
  onAdicionarEntrega,
  onAdicionarEpiAoCatalogo,
  onImprimir,
  onGerarPdf
}) => {
  const [abaAtiva, setAbaAtiva] = useState<'fichas' | 'catalogo'>('fichas');
  const [busca, setBusca] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>('Todas');
  const [colaboradorSelecionadoId, setColaboradorSelecionadoId] = useState<string>(
    fichas[0]?.colaboradorId || colaboradores[0]?.id || ''
  );
  
  // Modals
  const [modalNovaEntregaAberto, setModalNovaEntregaAberto] = useState(false);
  const [modalNovoEpiAberto, setModalNovoEpiAberto] = useState(false);

  // Form states for Nova Entrega
  const [formColaboradorId, setFormColaboradorId] = useState(colaboradores[0]?.id || '');
  const [formEpiId, setFormEpiId] = useState(epis[0]?.id || '');
  const [formQuantidade, setFormQuantidade] = useState(1);
  const [formDataEntrega, setFormDataEntrega] = useState(new Date().toISOString().split('T')[0]);
  const [formMotivo, setFormMotivo] = useState<'Fornecimento Inicial' | 'Substituição por Desgaste' | 'Extravio / Perda' | 'Avaria / Dano' | 'Periódico'>('Fornecimento Inicial');
  const [formObservacao, setFormObservacao] = useState('');

  // Form states for Novo EPI Catalogo
  const [novoEpiNome, setNovoEpiNome] = useState('');
  const [novoEpiCategoria, setNovoEpiCategoria] = useState<CategoriaEPI>('Proteção da Cabeça');
  const [novoEpiCA, setNovoEpiCA] = useState('');
  const [novoEpiValidadeCA, setNovoEpiValidadeCA] = useState('2028-12-31');
  const [novoEpiFabricante, setNovoEpiFabricante] = useState('');
  const [novoEpiModelo, setNovoEpiModelo] = useState('');
  const [novoEpiDescricao, setNovoEpiDescricao] = useState('');
  const [novoEpiProtecao, setNovoEpiProtecao] = useState('');
  const [novoEpiEstoque, setNovoEpiEstoque] = useState(20);
  const [novoEpiUnidade, setNovoEpiUnidade] = useState<'Unidade' | 'Par' | 'Conjunto' | 'Peça'>('Unidade');

  // Active Ficha
  const fichaAtual = fichas.find(f => f.colaboradorId === colaboradorSelecionadoId) || {
    id: `ficha-temp-${colaboradorSelecionadoId}`,
    colaboradorId: colaboradorSelecionadoId,
    colaboradorNome: colaboradores.find(c => c.id === colaboradorSelecionadoId)?.nome || 'Colaborador',
    cpf: colaboradores.find(c => c.id === colaboradorSelecionadoId)?.cpf || '',
    cargo: colaboradores.find(c => c.id === colaboradorSelecionadoId)?.cargo || '',
    setor: colaboradores.find(c => c.id === colaboradorSelecionadoId)?.setor || '',
    matricula: colaboradores.find(c => c.id === colaboradorSelecionadoId)?.matricula || '',
    dataAdmissao: colaboradores.find(c => c.id === colaboradorSelecionadoId)?.dataAdmissao || '',
    termoCienciaAceito: true,
    dataAssinaturaTermo: new Date().toISOString().split('T')[0],
    entregas: []
  };

  const colaboradorAtual = colaboradores.find(c => c.id === colaboradorSelecionadoId);

  // Submit Nova Entrega
  const handleSubmitEntrega = (e: React.FormEvent) => {
    e.preventDefault();
    const epiSelecionado = epis.find(item => item.id === formEpiId);
    if (!epiSelecionado) return;

    const novaEntrega: RegistroEntregaItem = {
      id: `ent-${Date.now()}`,
      epiId: epiSelecionado.id,
      nomeEPI: epiSelecionado.nome,
      numeroCA: epiSelecionado.numeroCA,
      dataEntrega: formDataEntrega,
      quantidade: Number(formQuantidade) || 1,
      motivo: formMotivo,
      assinaturaConfirmada: true,
      observacao: formObservacao || undefined
    };

    onAdicionarEntrega(formColaboradorId, novaEntrega);
    setColaboradorSelecionadoId(formColaboradorId);
    setModalNovaEntregaAberto(false);
    setFormObservacao('');
  };

  // Submit Novo EPI
  const handleSubmitNovoEpi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoEpiNome || !novoEpiCA) return;

    const novoItem: EPIItem = {
      id: `epi-${Date.now()}`,
      nome: novoEpiNome,
      categoria: novoEpiCategoria,
      numeroCA: novoEpiCA,
      validadeCA: novoEpiValidadeCA,
      fabricante: novoEpiFabricante || 'Fabricante Nacional Homologado',
      modelo: novoEpiModelo || 'Modelo Padrão',
      descricaoTecnica: novoEpiDescricao || novoEpiNome,
      atenuacaoOuProtecao: novoEpiProtecao || 'Proteção conforme ensaios de conformidade MTE',
      estoqueAtual: Number(novoEpiEstoque) || 10,
      unidade: novoEpiUnidade,
      statusCA: 'Válido'
    };

    onAdicionarEpiAoCatalogo(novoItem);
    setModalNovoEpiAberto(false);
    setNovoEpiNome('');
    setNovoEpiCA('');
    setNovoEpiFabricante('');
    setNovoEpiModelo('');
    setNovoEpiDescricao('');
    setNovoEpiProtecao('');
  };

  const episFiltrados = epis.filter(epi => {
    const matchBusca = epi.nome.toLowerCase().includes(busca.toLowerCase()) || 
                       epi.numeroCA.includes(busca) || 
                       epi.fabricante.toLowerCase().includes(busca.toLowerCase());
    const matchCat = categoriaFiltro === 'Todas' || epi.categoria === categoriaFiltro;
    return matchBusca && matchCat;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Banner do Módulo EPI */}
      <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-sm border border-slate-800 no-print">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                <HardHat className="w-3.5 h-3.5 text-emerald-400" />
                NR-06: Equipamentos de Proteção Individual
              </span>
              <span className="text-slate-400 text-xs font-mono">
                Portaria MTP nº 4.219 / Art. 166 da CLT
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Gestão de EPIs & Fichas de Entrega (Item 6.5.1)
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-3xl">
              Emissão eletrônica de fichas individuais de EPI com Termo de Responsabilidade legal, consulta de Certificados de Aprovação (C.A. no MTE) e controle de substituição e desgaste.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setFormColaboradorId(colaboradorSelecionadoId);
                setModalNovaEntregaAberto(true);
              }}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Registrar Entrega de EPI
            </button>
            <button
              onClick={() => setModalNovoEpiAberto(true)}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer"
            >
              <Package className="w-4 h-4 text-emerald-400" />
              Novo EPI no Estoque
            </button>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center gap-2 mt-6 border-t border-slate-800 pt-4">
          <button
            onClick={() => setAbaAtiva('fichas')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              abaAtiva === 'fichas'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Fichas de Entrega por Colaborador
          </button>
          <button
            onClick={() => setAbaAtiva('catalogo')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              abaAtiva === 'catalogo'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Inventário de EPIs & Consulta de C.A. ({epis.length})
          </button>
        </div>
      </div>

      {/* ABA 1: FICHAS DE ENTREGA */}
      {abaAtiva === 'fichas' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Colaboradores Sidebar */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 no-print h-fit">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-slate-900">
                Colaboradores da Empresa
              </h2>
              <span className="text-xs text-slate-500 font-semibold">
                {colaboradores.length} registros
              </span>
            </div>

            <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
              {colaboradores.map((colab) => {
                const totalEpis = fichas.find(f => f.colaboradorId === colab.id)?.entregas.length || 0;
                const selecionado = colab.id === colaboradorSelecionadoId;
                return (
                  <button
                    key={colab.id}
                    onClick={() => setColaboradorSelecionadoId(colab.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      selecionado 
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-xs' 
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold truncate text-slate-900">
                        {colab.nome}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">
                        {colab.cargo}
                      </p>
                      <span className="text-[10px] text-slate-400 font-mono">
                        CPF: {colab.cpf}
                      </span>
                    </div>
                    <div className="text-right ml-2 flex flex-col items-end">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        totalEpis > 0 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-slate-100 text-slate-500'
                      }`}>
                        {totalEpis} {totalEpis === 1 ? 'EPI' : 'EPIs'}
                      </span>
                      <ChevronRight className={`w-4 h-4 mt-1 ${selecionado ? 'text-emerald-600' : 'text-slate-300'}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Ficha Oficial de EPI (Documento Visualizável & Imprimível) */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 print:p-0 print:border-none print:shadow-none print-page">
            
            {/* Header com Botões de Ação na Tela */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200 no-print">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Documento Legal Obrigatório (NR-06)
                </span>
                <h2 className="text-lg font-extrabold text-slate-900">
                  Ficha Individual de Controle e Entrega de EPI
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setFormColaboradorId(colaboradorSelecionadoId);
                    setModalNovaEntregaAberto(true);
                  }}
                  className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Entregar EPI
                </button>
                <button
                  onClick={onImprimir}
                  className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Imprimir Ficha
                </button>
                {onGerarPdf && (
                  <button
                    onClick={onGerarPdf}
                    className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors shadow-xs"
                    title="Baixar Ficha Individual de EPI em PDF"
                  >
                    <FileDown className="w-3.5 h-3.5" />
                    Gerar PDF
                  </button>
                )}
              </div>
            </div>

            {/* Cabeçalho Oficial do Documento para Impressão */}
            <PrintHeader
              empresa={empresa}
              tituloDocumento="FICHA DE CONTROLE E REGISTRO DE FORNECIMENTO DE EPI"
              subtituloDocumento="CONFORME ITEM 6.5.1 DA NR-06 (PORTARIA MTP Nº 4.219/2022) E ART. 166 DA CLT"
              codigoDocumento={`F-EPI-${colaboradorAtual?.matricula || '001'}`}
            />

            {/* Dados do Empregado */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 text-xs text-slate-800">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div>
                  <span className="text-slate-500 font-semibold block text-[10px] uppercase">Empregado:</span>
                  <span className="font-bold text-slate-900 text-sm">{colaboradorAtual?.nome}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold block text-[10px] uppercase">CPF / Matrícula:</span>
                  <span className="font-semibold text-slate-900">{colaboradorAtual?.cpf} (Matr. {colaboradorAtual?.matricula})</span>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold block text-[10px] uppercase">Cargo / Função:</span>
                  <span className="font-semibold text-slate-900">{colaboradorAtual?.cargo}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold block text-[10px] uppercase">Setor / Admissão:</span>
                  <span className="font-semibold text-slate-900">{colaboradorAtual?.setor} ({colaboradorAtual?.dataAdmissao})</span>
                </div>
              </div>
            </div>

            {/* Tabela de EPIs Fornecidos */}
            <div className="mb-6">
              <h3 className="text-xs font-extrabold uppercase text-slate-900 tracking-wider mb-2">
                1. Relação de Equipamentos Fornecidos com Certificado de Aprovação (C.A.)
              </h3>
              
              {fichaAtual.entregas.length === 0 ? (
                <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-xl p-6 text-slate-500">
                  <HardHat className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-slate-700">Nenhum EPI registrado para este colaborador ainda.</p>
                  <p className="text-xs text-slate-400 mt-1">Clique no botão "Registrar Entrega de EPI" para incluir o fornecimento com C.A. homologado.</p>
                </div>
              ) : (
                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                        <th className="py-2.5 px-3">Data</th>
                        <th className="py-2.5 px-3">Descrição do EPI</th>
                        <th className="py-2.5 px-3 text-center">Nº C.A.</th>
                        <th className="py-2.5 px-3 text-center">Qtd.</th>
                        <th className="py-2.5 px-3">Motivo da Entrega</th>
                        <th className="py-2.5 px-3 text-center">Assinatura / Visto</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {fichaAtual.entregas.map((item, idx) => (
                        <tr key={item.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                          <td className="py-2.5 px-3 font-mono text-[11px] whitespace-nowrap">
                            {item.dataEntrega}
                          </td>
                          <td className="py-2.5 px-3 font-semibold text-slate-900">
                            <div>{item.nomeEPI}</div>
                            {item.observacao && (
                              <span className="text-[10px] text-slate-500 font-normal italic block">
                                Obs: {item.observacao}
                              </span>
                            )}
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <span className="font-mono font-bold bg-slate-200/80 px-2 py-0.5 rounded text-slate-900">
                              {item.numeroCA}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-center font-bold">
                            {item.quantidade}
                          </td>
                          <td className="py-2.5 px-3 text-slate-600">
                            {item.motivo}
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              Assinado / Entregue
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Termo de Responsabilidade Legal da NR-06 */}
            <div className="border border-slate-300 rounded-xl p-4 bg-slate-50 text-[11px] text-slate-700 space-y-2 mb-6">
              <h4 className="font-bold text-xs text-slate-900 uppercase tracking-tight">
                2. Termo de Compromisso e Responsabilidade do Empregado (NR-06 / Art. 158 da CLT)
              </h4>
              <p className="leading-relaxed">
                Declaro ter recebido da empresa <strong>{empresa.razaoSocial}</strong>, a título gratuito, os Equipamentos de Proteção Individual (EPIs) relacionados nesta ficha, em perfeito estado de conservação e funcionamento, novos ou higienizados, todos dotados de Certificado de Aprovação (C.A.) emitido pelo Ministério do Trabalho e Emprego, e comprometo-me a:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>Usar os EPIs rigorosamente apenas para a finalidade a que se destinam durante toda a jornada de trabalho;</li>
                <li>Responsabilizar-me pela guarda, higienização e perfeita conservação dos equipamentos que me forem confiados;</li>
                <li>Comunicar imediatamente à chefia ou ao SESMT qualquer alteração, desgaste, defeito ou avaria que os torne impróprios para uso;</li>
                <li>Cumprir as determinações e treinamentos fornecidos pela empresa sobre o uso adequado (Art. 158 da CLT c/c NR-01 e NR-06);</li>
                <li>Devolver os equipamentos recebidos quando do meu desligamento da empresa ou por ocasião de sua substituição.</li>
              </ul>
              <p className="text-[10px] text-slate-500 italic pt-1">
                Estou ciente de que a recusa injustificada ao uso dos EPIs constitui ato faltoso passível de punição disciplinar nos termos do art. 158, parágrafo único, alínea "b" da CLT.
              </p>
            </div>

            {/* Campos de Assinatura Oficial */}
            <div className="pt-6 border-t border-slate-300 grid grid-cols-2 gap-8 text-center text-xs">
              <div>
                <div className="border-b border-slate-900 pb-8 mb-2"></div>
                <p className="font-bold text-slate-900">{colaboradorAtual?.nome}</p>
                <p className="text-[11px] text-slate-500">Assinatura do Trabalhador (CPF: {colaboradorAtual?.cpf})</p>
              </div>
              <div>
                <div className="border-b border-slate-900 pb-8 mb-2"></div>
                <p className="font-bold text-slate-900">{empresa.responsavelSST}</p>
                <p className="text-[11px] text-slate-500">Responsável pelo Fornecimento / SESMT</p>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ABA 2: INVENTÁRIO DE EPIS & CONSULTA DE C.A. */}
      {abaAtiva === 'catalogo' && (
        <div className="space-y-6">
          
          {/* Filtros e Busca */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col md:flex-row items-center justify-between gap-4 no-print">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por nome do EPI, número do C.A. ou fabricante..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
              <span className="text-xs font-bold text-slate-500 whitespace-nowrap">Categoria:</span>
              <select
                value={categoriaFiltro}
                onChange={(e) => setCategoriaFiltro(e.target.value)}
                className="border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="Todas">Todas as Categorias</option>
                <option value="Proteção Contra Quedas">Proteção Contra Quedas (NR-35)</option>
                <option value="Proteção da Cabeça">Proteção da Cabeça</option>
                <option value="Proteção Auditiva">Proteção Auditiva</option>
                <option value="Proteção dos Olhos e Face">Proteção dos Olhos e Face</option>
                <option value="Proteção Respiratória">Proteção Respiratória</option>
                <option value="Proteção dos Membros Superiores">Proteção dos Membros Superiores</option>
                <option value="Proteção dos Membros Inferiores">Proteção dos Membros Inferiores</option>
              </select>
            </div>
          </div>

          {/* Cards dos EPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {episFiltrados.map((epi) => (
              <div
                key={epi.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:border-emerald-500/50 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {epi.categoria}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      C.A. {epi.statusCA}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 leading-snug mb-1">
                    {epi.nome}
                  </h3>
                  <p className="text-xs text-slate-500 mb-3 font-medium">
                    {epi.fabricante} • {epi.modelo}
                  </p>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mb-3 text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Certificado de Aprovação:</span>
                      <span className="font-mono font-bold text-slate-900">C.A. {epi.numeroCA}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Validade do C.A. MTE:</span>
                      <span className="font-mono text-emerald-700 font-semibold">{epi.validadeCA}</span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-slate-200">
                      <span className="text-slate-500 font-medium">Estoque Disponível:</span>
                      <span className="font-bold text-slate-900">{epi.estoqueAtual} {epi.unidade}(s)</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                    {epi.descricaoTecnica}
                  </p>

                  {epi.atenuacaoOuProtecao && (
                    <div className="text-[11px] text-emerald-900 bg-emerald-50/70 border border-emerald-200 rounded-lg p-2 font-medium">
                      🛡️ <strong>Proteção:</strong> {epi.atenuacaoOuProtecao}
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono">
                    ID: {epi.id}
                  </span>
                  <button
                    onClick={() => {
                      setFormEpiId(epi.id);
                      setModalNovaEntregaAberto(true);
                    }}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                  >
                    Entregar este EPI
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* MODAL: REGISTRAR NOVA ENTREGA DE EPI */}
      {modalNovaEntregaAberto && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <HardHat className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm">Registrar Fornecimento de EPI</h3>
                  <p className="text-[11px] text-slate-500">Conforme Art. 166 da CLT e NR-06 Item 6.5.1</p>
                </div>
              </div>
              <button
                onClick={() => setModalNovaEntregaAberto(false)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold cursor-pointer"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmitEntrega} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Colaborador Destinatário *
                </label>
                <select
                  value={formColaboradorId}
                  onChange={(e) => setFormColaboradorId(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                >
                  {colaboradores.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.nome} — {c.cargo} (CPF: {c.cpf})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Equipamento de Proteção Individual (EPI) *
                </label>
                <select
                  value={formEpiId}
                  onChange={(e) => setFormEpiId(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                >
                  {epis.map(e => (
                    <option key={e.id} value={e.id}>
                      [C.A. {e.numeroCA}] {e.nome} (Estoque: {e.estoqueAtual} {e.unidade})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Quantidade *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={formQuantidade}
                    onChange={(e) => setFormQuantidade(Number(e.target.value))}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Data da Entrega *
                  </label>
                  <input
                    type="date"
                    value={formDataEntrega}
                    onChange={(e) => setFormDataEntrega(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Motivo da Entrega *
                </label>
                <select
                  value={formMotivo}
                  onChange={(e) => setFormMotivo(e.target.value as any)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="Fornecimento Inicial">Fornecimento Inicial (Admissão / Novo Cargo)</option>
                  <option value="Substituição por Desgaste">Substituição por Desgaste Natural do Tempo</option>
                  <option value="Avaria / Dano">Avaria / Dano em Operação</option>
                  <option value="Extravio / Perda">Extravio / Perda do Equipamento</option>
                  <option value="Periódico">Fornecimento Periódico Programado</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Observações Técnicas / Inspecionado
                </label>
                <input
                  type="text"
                  placeholder="Ex: Inspecionado na entrega; orientado quanto à higienização."
                  value={formObservacao}
                  onChange={(e) => setFormObservacao(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-[11px] text-emerald-900 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  O registro atualizará automaticamente a Ficha Individual do Colaborador e debitará o item do estoque.
                </span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalNovaEntregaAberto(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800 font-semibold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-xl font-bold cursor-pointer transition-colors shadow-sm"
                >
                  Confirmar Entrega
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: NOVO EPI NO CATÁLOGO */}
      {modalNovoEpiAberto && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-slate-900 text-emerald-400 flex items-center justify-center">
                  <Package className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm">Cadastrar Novo EPI com C.A.</h3>
                  <p className="text-[11px] text-slate-500">Inclusão de modelo e C.A. no catálogo corporativo</p>
                </div>
              </div>
              <button
                onClick={() => setModalNovoEpiAberto(false)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold cursor-pointer"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmitNovoEpi} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Nome do Equipamento *
                </label>
                <input
                  type="text"
                  placeholder="Ex: Luva Nitrílica para Produtos Químicos"
                  value={novoEpiNome}
                  onChange={(e) => setNovoEpiNome(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Categoria da NR-06 *
                  </label>
                  <select
                    value={novoEpiCategoria}
                    onChange={(e) => setNovoEpiCategoria(e.target.value as any)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="Proteção da Cabeça">Proteção da Cabeça</option>
                    <option value="Proteção dos Olhos e Face">Proteção dos Olhos e Face</option>
                    <option value="Proteção Auditiva">Proteção Auditiva</option>
                    <option value="Proteção Respiratória">Proteção Respiratória</option>
                    <option value="Proteção dos Membros Superiores">Proteção dos Membros Superiores</option>
                    <option value="Proteção dos Membros Inferiores">Proteção dos Membros Inferiores</option>
                    <option value="Proteção Contra Quedas">Proteção Contra Quedas (NR-35)</option>
                    <option value="Vestimentas de Segurança">Vestimentas de Segurança</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Número do C.A. MTE *
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: 41205"
                    value={novoEpiCA}
                    onChange={(e) => setNovoEpiCA(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 font-mono font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Fabricante Homologado
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Ansell / 3M"
                    value={novoEpiFabricante}
                    onChange={(e) => setNovoEpiFabricante(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Validade do C.A. MTE
                  </label>
                  <input
                    type="date"
                    value={novoEpiValidadeCA}
                    onChange={(e) => setNovoEpiValidadeCA(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Estoque Inicial
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={novoEpiEstoque}
                    onChange={(e) => setNovoEpiEstoque(Number(e.target.value))}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Unidade de Medida
                  </label>
                  <select
                    value={novoEpiUnidade}
                    onChange={(e) => setNovoEpiUnidade(e.target.value as any)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="Unidade">Unidade</option>
                    <option value="Par">Par</option>
                    <option value="Peça">Peça</option>
                    <option value="Conjunto">Conjunto</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Atenuação / Nível de Proteção Oferecido
                </label>
                <input
                  type="text"
                  placeholder="Ex: NRRsf 24 dB ou Proteção contra solventes e graxas"
                  value={novoEpiProtecao}
                  onChange={(e) => setNovoEpiProtecao(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalNovoEpiAberto(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800 font-semibold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-xl font-bold cursor-pointer transition-colors shadow-sm"
                >
                  Cadastrar EPI
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

import React, { useState } from 'react';
import { 
  Users, 
  MessageSquare, 
  Clock, 
  Search, 
  Plus, 
  Printer, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  MapPin, 
  UserCheck, 
  BookOpen, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  HelpCircle,
  ListChecks,
  FileDown
} from 'lucide-react';
import { Empresa, Colaborador, DDSTema, DDSRegistro, ParticipanteDDS } from '../../types/sst';
import { PrintHeader } from '../common/PrintHeader';

interface DdsModuleProps {
  empresa: Empresa;
  colaboradores: Colaborador[];
  temas: DDSTema[];
  registros: DDSRegistro[];
  onAdicionarRegistro: (novoRegistro: DDSRegistro) => void;
  onImprimir: () => void;
  onGerarPdf?: () => void;
}

export const DdsModule: React.FC<DdsModuleProps> = ({
  empresa,
  colaboradores,
  temas,
  registros,
  onAdicionarRegistro,
  onImprimir,
  onGerarPdf
}) => {
  const [abaAtiva, setAbaAtiva] = useState<'atas' | 'biblioteca'>('atas');
  const [busca, setBusca] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>('Todas');
  const [registroSelecionadoId, setRegistroSelecionadoId] = useState<string>(
    registros[0]?.id || ''
  );

  // Modal Novo DDS
  const [modalNovoDdsAberto, setModalNovoDdsAberto] = useState(false);
  const [formTemaId, setFormTemaId] = useState(temas[0]?.id || '');
  const [formDataDds, setFormDataDds] = useState(new Date().toISOString().split('T')[0]);
  const [formHorarioDds, setFormHorarioDds] = useState('07:30');
  const [formSetorDds, setFormSetorDds] = useState('Montagem e Obras Especiais');
  const [formFacilitadorNome, setFormFacilitadorNome] = useState(empresa.responsavelSST);
  const [formFacilitadorCargo, setFormFacilitadorCargo] = useState('Engenheiro de Segurança do Trabalho');
  const [formResumoDiscussao, setFormResumoDiscussao] = useState('');
  const [formObservacoesEquipe, setFormObservacoesEquipe] = useState('');
  
  // Participantes selection state
  const [participantesSelecionados, setParticipantesSelecionados] = useState<{ [id: string]: boolean }>(
    colaboradores.reduce((acc, c) => ({ ...acc, [c.id]: true }), {})
  );

  // Selected Ata to display
  const registroAtual = registros.find(r => r.id === registroSelecionadoId) || registros[0];

  // Iniciar DDS a partir da biblioteca de temas
  const handleIniciarComTema = (temaId: string) => {
    setFormTemaId(temaId);
    const tema = temas.find(t => t.id === temaId);
    if (tema) {
      setFormResumoDiscussao(`Abordado o tema: ${tema.titulo}. Reforçados os pontos de inspeção diária e responsabilidade de cada integrante.`);
    }
    setModalNovoDdsAberto(true);
  };

  // Submit Novo DDS
  const handleSubmitNovoDds = (e: React.FormEvent) => {
    e.preventDefault();
    const temaObj = temas.find(t => t.id === formTemaId);
    
    const participantes: ParticipanteDDS[] = colaboradores
      .filter(c => participantesSelecionados[c.id])
      .map(c => ({
        colaboradorId: c.id,
        nome: c.nome,
        cpf: c.cpf,
        cargo: c.cargo,
        presente: true,
        rubricaAssinada: true
      }));

    const novoRegistro: DDSRegistro = {
      id: `dds-${Date.now()}`,
      numeroAta: `DDS-${new Date().getFullYear()}-${String(registros.length + 90).padStart(3, '0')}`,
      data: formDataDds,
      horario: formHorarioDds,
      setor: formSetorDds,
      temaId: formTemaId,
      tituloTema: temaObj?.titulo || 'Diálogo Diário Operacional',
      nrVinculada: temaObj?.nrVinculada || 'NR-01',
      facilitadorNome: formFacilitadorNome,
      facilitadorCargo: formFacilitadorCargo,
      resumoDiscussao: formResumoDiscussao || 'Discussão sobre procedimentos seguros e prevenção de acidentes.',
      observacoesEquipe: formObservacoesEquipe || undefined,
      status: 'Realizado',
      participantes
    };

    onAdicionarRegistro(novoRegistro);
    setRegistroSelecionadoId(novoRegistro.id);
    setAbaAtiva('atas');
    setModalNovoDdsAberto(false);
    setFormResumoDiscussao('');
    setFormObservacoesEquipe('');
  };

  const temasFiltrados = temas.filter(t => {
    const matchBusca = t.titulo.toLowerCase().includes(busca.toLowerCase()) || 
                       t.resumo.toLowerCase().includes(busca.toLowerCase()) || 
                       t.nrVinculada.toLowerCase().includes(busca.toLowerCase());
    const matchCat = categoriaFiltro === 'Todas' || t.categoria === categoriaFiltro;
    return matchBusca && matchCat;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Banner DDS */}
      <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-sm border border-slate-800 no-print">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-emerald-400" />
                Diálogo Diário de Segurança (DDS)
              </span>
              <span className="text-slate-400 text-xs font-mono">
                Cultura Preventiva / NR-01 & MTE
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Registro de DDS & Lista de Presença Oficial
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-3xl">
              Gestão de reuniões diárias de conscientização operacional, temas técnicos por NR, comprovação de treinamentos rápidos de 10-15 minutos e atas com rubrica dos colaboradores.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setModalNovoDdsAberto(true)}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Realizar Novo DDS
            </button>
            <button
              onClick={() => setAbaAtiva('biblioteca')}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-emerald-400" />
              Biblioteca de Temas ({temas.length})
            </button>
          </div>
        </div>

        {/* Sub-Tabs */}
        <div className="flex items-center gap-2 mt-6 border-t border-slate-800 pt-4">
          <button
            onClick={() => setAbaAtiva('atas')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              abaAtiva === 'atas'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Atas de DDS Registradas ({registros.length})
          </button>
          <button
            onClick={() => setAbaAtiva('biblioteca')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              abaAtiva === 'biblioteca'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Temas e Roteiros Prontos ({temas.length})
          </button>
        </div>
      </div>

      {/* ABA 1: ATAS DE DDS REALIZADOS */}
      {abaAtiva === 'atas' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Sidebar de Histórico de DDS */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 no-print h-fit">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-slate-900">
                Atas de DDS Realizadas
              </h2>
              <span className="text-xs text-slate-500 font-semibold">
                {registros.length} atas
              </span>
            </div>

            <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
              {registros.map((reg) => {
                const selecionado = reg.id === registroSelecionadoId;
                return (
                  <button
                    key={reg.id}
                    onClick={() => setRegistroSelecionadoId(reg.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                      selecionado 
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-xs' 
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 bg-slate-100 rounded text-slate-700">
                        {reg.numeroAta}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        {reg.nrVinculada}
                      </span>
                    </div>

                    <p className="text-xs font-bold text-slate-900 line-clamp-2">
                      {reg.tituloTema}
                    </p>

                    <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500">
                      <span>📅 {reg.data} às {reg.horario}</span>
                      <span className="font-bold text-slate-700">
                        👥 {reg.participantes.length} presentes
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Ata Oficial do DDS para Leitura e Impressão */}
          {registroAtual && (
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 print:p-0 print:border-none print:shadow-none print-page">
              
              {/* Header da Tela */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200 no-print">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                    Ata de Reunião Preventiva de Campo
                  </span>
                  <h2 className="text-lg font-extrabold text-slate-900">
                    {registroAtual.tituloTema}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  {onGerarPdf && (
                    <button
                      onClick={onGerarPdf}
                      className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white px-3.5 py-2 rounded-lg text-xs font-bold cursor-pointer transition-colors shadow-xs"
                      title="Gerar e salvar Ata de DDS em PDF"
                    >
                      <FileDown className="w-3.5 h-3.5" />
                      Gerar PDF
                    </button>
                  )}
                  <button
                    onClick={onImprimir}
                    className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2 rounded-lg text-xs font-bold cursor-pointer transition-colors shadow-xs"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    Imprimir Ata com Assinaturas
                  </button>
                </div>
              </div>

              {/* PrintHeader Oficial */}
              <PrintHeader
                empresa={empresa}
                tituloDocumento="ATA OFICIAL DE DIÁLOGO DIÁRIO DE SEGURANÇA (DDS)"
                subtituloDocumento="REGISTRO DE CONSCIENTIZAÇÃO E ALINHAMENTO PREVENTIVO DE CAMPO"
                codigoDocumento={registroAtual.numeroAta}
              />

              {/* Dados da Realização do DDS */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 text-xs text-slate-800">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div>
                    <span className="text-slate-500 font-semibold block text-[10px] uppercase">Data e Horário:</span>
                    <span className="font-bold text-slate-900">{registroAtual.data} às {registroAtual.horario}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold block text-[10px] uppercase">Frente / Setor:</span>
                    <span className="font-semibold text-slate-900">{registroAtual.setor}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold block text-[10px] uppercase">Norma Regulamentadora:</span>
                    <span className="font-bold text-emerald-700">{registroAtual.nrVinculada}</span>
                  </div>
                  <div className="sm:col-span-2 lg:col-span-3 pt-2 border-t border-slate-200 flex justify-between">
                    <div>
                      <span className="text-slate-500 font-semibold block text-[10px] uppercase">Facilitador / Condutor:</span>
                      <span className="font-bold text-slate-900">{registroAtual.facilitadorNome} ({registroAtual.facilitadorCargo})</span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-500 font-semibold block text-[10px] uppercase">Total de Trabalhadores:</span>
                      <span className="font-bold text-slate-900 text-sm">{registroAtual.participantes.length} presentes</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resumo da Discussão e Conteúdo Ministrado */}
              <div className="mb-6 space-y-3 text-xs">
                <div>
                  <h3 className="text-xs font-extrabold uppercase text-slate-900 tracking-wider mb-1">
                    1. Síntese dos Assuntos Abordados na Reunião
                  </h3>
                  <div className="bg-white border border-slate-200 rounded-xl p-4 text-slate-700 leading-relaxed">
                    {registroAtual.resumoDiscussao}
                  </div>
                </div>

                {registroAtual.observacoesEquipe && (
                  <div>
                    <h3 className="text-xs font-extrabold uppercase text-slate-900 tracking-wider mb-1">
                      2. Apontamentos, Dúvidas e Sugestões da Equipe
                    </h3>
                    <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3 text-amber-950 font-medium">
                      {registroAtual.observacoesEquipe}
                    </div>
                  </div>
                )}
              </div>

              {/* Lista de Presença com Assinaturas */}
              <div className="mb-6">
                <h3 className="text-xs font-extrabold uppercase text-slate-900 tracking-wider mb-2">
                  3. Lista de Presença e Ciência dos Trabalhadores Participantes
                </h3>
                
                <div className="border border-slate-300 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-300">
                        <th className="py-2.5 px-3 w-10 text-center">Nº</th>
                        <th className="py-2.5 px-3">Nome do Trabalhador</th>
                        <th className="py-2.5 px-3">Função / Cargo</th>
                        <th className="py-2.5 px-3 text-center">CPF</th>
                        <th className="py-2.5 px-3 text-center w-40">Assinatura / Rubrica</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {registroAtual.participantes.map((part, idx) => (
                        <tr key={part.colaboradorId} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                          <td className="py-2.5 px-3 text-center font-bold text-slate-400">
                            {idx + 1}
                          </td>
                          <td className="py-2.5 px-3 font-semibold text-slate-900">
                            {part.nome}
                          </td>
                          <td className="py-2.5 px-3 text-slate-600">
                            {part.cargo}
                          </td>
                          <td className="py-2.5 px-3 text-center font-mono text-[11px] text-slate-700">
                            {part.cpf}
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <span className="font-serif italic text-slate-800 text-xs border-b border-slate-400 pb-0.5 inline-block min-w-[110px]">
                              {part.nome.split(' ')[0]} {part.nome.split(' ').slice(-1)[0]}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Assinatura do Facilitador e Técnico Responsável */}
              <div className="pt-8 border-t border-slate-300 grid grid-cols-2 gap-8 text-center text-xs">
                <div>
                  <div className="border-b border-slate-900 pb-8 mb-2"></div>
                  <p className="font-bold text-slate-900">{registroAtual.facilitadorNome}</p>
                  <p className="text-[11px] text-slate-500">Facilitador / Instrutor do DDS ({registroAtual.facilitadorCargo})</p>
                </div>
                <div>
                  <div className="border-b border-slate-900 pb-8 mb-2"></div>
                  <p className="font-bold text-slate-900">{empresa.responsavelSST}</p>
                  <p className="text-[11px] text-slate-500">Coordenador do SESMT / Responsável Técnico</p>
                </div>
              </div>

            </div>
          )}

        </div>
      )}

      {/* ABA 2: BIBLIOTECA DE TEMAS DE DDS */}
      {abaAtiva === 'biblioteca' && (
        <div className="space-y-6">
          
          {/* Filtros e Busca */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col md:flex-row items-center justify-between gap-4 no-print">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar tema por título, NR vinculada ou palavras-chave..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <span className="text-xs font-bold text-slate-500 whitespace-nowrap">Categoria:</span>
              <select
                value={categoriaFiltro}
                onChange={(e) => setCategoriaFiltro(e.target.value)}
                className="border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="Todas">Todas as Categorias</option>
                <option value="Normas Regulamentadoras">Normas Regulamentadoras</option>
                <option value="Procedimentos Operacionais">Procedimentos Operacionais</option>
                <option value="Comportamento Seguro">Comportamento Seguro</option>
                <option value="Saúde & Ergonomia">Saúde & Ergonomia</option>
              </select>
            </div>
          </div>

          {/* Cards com os Temas Prontos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {temasFiltrados.map((tema) => (
              <div
                key={tema.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:border-emerald-500/50 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {tema.nrVinculada}
                    </span>
                    <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      ~{tema.tempoEstimadoMin} minutos
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 mb-2 leading-snug">
                    {tema.titulo}
                  </h3>

                  <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                    {tema.conteudoTextual}
                  </p>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mb-4 text-xs">
                    <span className="font-bold text-slate-900 block mb-1 text-[11px] uppercase tracking-wider">
                      🎯 Pontos de Fixação com a Equipe:
                    </span>
                    <ul className="list-disc pl-4 space-y-1 text-slate-600">
                      {tema.pontosChave.map((pt, i) => (
                        <li key={i}>{pt}</li>
                      ))}
                    </ul>
                  </div>

                  {tema.perguntasInterativas.length > 0 && (
                    <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-3 text-xs mb-4">
                      <span className="font-bold text-emerald-900 flex items-center gap-1 mb-1 text-[11px] uppercase tracking-wider">
                        <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
                        Perguntas para engajar os colaboradores:
                      </span>
                      <ul className="list-disc pl-4 space-y-1 text-emerald-950 font-medium">
                        {tema.perguntasInterativas.map((perg, i) => (
                          <li key={i}>{perg}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-mono">
                    ID: {tema.id}
                  </span>
                  <button
                    onClick={() => handleIniciarComTema(tema.id)}
                    className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    Iniciar DDS com este Tema
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* MODAL: REALIZAR NOVO DDS */}
      {modalNovoDdsAberto && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm">Registrar Ata de Diálogo Diário de Segurança</h3>
                  <p className="text-[11px] text-slate-500">Conforme NR-01 e boas práticas de gestão de SST</p>
                </div>
              </div>
              <button
                onClick={() => setModalNovoDdsAberto(false)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold cursor-pointer"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmitNovoDds} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Tema da Reunião de Segurança *
                </label>
                <select
                  value={formTemaId}
                  onChange={(e) => {
                    setFormTemaId(e.target.value);
                    const t = temas.find(tema => tema.id === e.target.value);
                    if (t && !formResumoDiscussao) {
                      setFormResumoDiscussao(`Abordado o tema: ${t.titulo}. Reforçadas as instruções de campo e prevenção.`);
                    }
                  }}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                >
                  {temas.map(t => (
                    <option key={t.id} value={t.id}>
                      [{t.nrVinculada}] {t.titulo}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Data da Realização *
                  </label>
                  <input
                    type="date"
                    value={formDataDds}
                    onChange={(e) => setFormDataDds(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Horário *
                  </label>
                  <input
                    type="time"
                    value={formHorarioDds}
                    onChange={(e) => setFormHorarioDds(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Setor / Frente de Trabalho *
                  </label>
                  <input
                    type="text"
                    value={formSetorDds}
                    onChange={(e) => setFormSetorDds(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Facilitador / Condutor *
                  </label>
                  <input
                    type="text"
                    value={formFacilitadorNome}
                    onChange={(e) => setFormFacilitadorNome(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Resumo dos Pontos Discutidos com a Equipe *
                </label>
                <textarea
                  rows={3}
                  value={formResumoDiscussao}
                  onChange={(e) => setFormResumoDiscussao(e.target.value)}
                  placeholder="Relate os aspectos preventivos reforçados na reunião..."
                  className="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Observações, Dúvidas ou Ações Solicitadas pela Equipe
                </label>
                <input
                  type="text"
                  placeholder="Ex: Trabalhadores solicitaram reforço na sinalização de piso..."
                  value={formObservacoesEquipe}
                  onChange={(e) => setFormObservacoesEquipe(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              {/* Seleção dos Participantes Presentes */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="font-bold text-slate-700">
                    Trabalhadores Presentes na Reunião
                  </label>
                  <span className="text-[11px] text-emerald-700 font-bold">
                    {Object.values(participantesSelecionados).filter(Boolean).length} de {colaboradores.length} selecionados
                  </span>
                </div>

                <div className="border border-slate-200 rounded-xl p-3 max-h-36 overflow-y-auto space-y-1.5 bg-slate-50">
                  {colaboradores.map(c => (
                    <label key={c.id} className="flex items-center gap-2 p-1.5 rounded hover:bg-white cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!!participantesSelecionados[c.id]}
                        onChange={(e) => setParticipantesSelecionados({
                          ...participantesSelecionados,
                          [c.id]: e.target.checked
                        })}
                        className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                      />
                      <span className="font-semibold text-slate-900">{c.nome}</span>
                      <span className="text-slate-500 text-[10px]">({c.cargo})</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setModalNovoDdsAberto(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800 font-semibold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-xl font-bold cursor-pointer transition-colors shadow-sm"
                >
                  Salvar Ata e Concluir
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

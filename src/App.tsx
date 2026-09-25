import React, { useState } from 'react';
import { ModuloSST, RegistroEntregaItem, EPIItem, DDSRegistro, ExtintorItem } from './types/sst';
import { 
  empresaPadrao, 
  colaboradoresIniciais, 
  catsIniciais, 
  ltcatsIniciais, 
  pcmsoIniciais, 
  asosIniciais, 
  groRiscosIniciais, 
  aprsIniciais, 
  checklistsIniciais, 
  treinamentosIniciais, 
  examesControleIniciais, 
  documentosIniciais,
  episIniciais,
  fichasEpiIniciais,
  temasDdsIniciais,
  ddsRegistrosIniciais,
  extintoresIniciais
} from './data/sstData';

import { Header } from './components/common/Header';
import { NavigationTabs } from './components/common/NavigationTabs';
import { InstallModal } from './components/common/InstallModal';
import { exportarElementoParaPdf } from './utils/pdfGenerator';
import { Loader2, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { DashboardModule } from './components/modules/DashboardModule';
import { CatModule } from './components/modules/CatModule';
import { NrsModule } from './components/modules/NrsModule';
import { LtcatModule } from './components/modules/LtcatModule';
import { PcmsoModule } from './components/modules/PcmsoModule';
import { AsoModule } from './components/modules/AsoModule';
import { GroModule } from './components/modules/GroModule';
import { AprModule } from './components/modules/AprModule';
import { ChecklistsModule } from './components/modules/ChecklistsModule';
import { ExtintoresModule } from './components/modules/ExtintoresModule';
import { EpiModule } from './components/modules/EpiModule';
import { DdsModule } from './components/modules/DdsModule';
import { TreinamentosModule } from './components/modules/TreinamentosModule';
import { ControleExamesModule } from './components/modules/ControleExamesModule';
import { GestaoDocumentosModule } from './components/modules/GestaoDocumentosModule';

export default function App() {
  const [moduloAtivo, setModuloAtivo] = useState<ModuloSST>('dashboard');
  const [empresa, setEmpresa] = useState(empresaPadrao);
  const [colaboradores, setColaboradores] = useState(colaboradoresIniciais);
  const [modalInstalarAberto, setModalInstalarAberto] = useState(false);

  // States for dynamic data in each module
  const [cats, setCats] = useState(catsIniciais);
  const [ltcats, setLtcats] = useState(ltcatsIniciais);
  const [pcmso, setPcmso] = useState(pcmsoIniciais[0]);
  const [asos, setAsos] = useState(asosIniciais);
  const [riscos, setRiscos] = useState(groRiscosIniciais);
  const [aprs, setAprs] = useState(aprsIniciais);
  const [checklists, setChecklists] = useState(checklistsIniciais);
  const [treinamentos, setTreinamentos] = useState(treinamentosIniciais);
  const [exames, setExames] = useState(examesControleIniciais);
  const [documentos, setDocumentos] = useState(documentosIniciais);
  
  // EPI, DDS & Extintores States
  const [epis, setEpis] = useState<EPIItem[]>(episIniciais);
  const [fichasEpi, setFichasEpi] = useState(fichasEpiIniciais);
  const [ddsTemas, setDdsTemas] = useState(temasDdsIniciais);
  const [ddsRegistros, setDdsRegistros] = useState<DDSRegistro[]>(ddsRegistrosIniciais);
  const [extintores, setExtintores] = useState<ExtintorItem[]>(extintoresIniciais);

  // PDF Status state for visual user feedback
  const [pdfStatus, setPdfStatus] = useState<{
    ativo: boolean;
    mensagem: string;
    tipo: 'loading' | 'success' | 'error';
  } | null>(null);

  // Print handler
  const handleImprimir = () => {
    window.print();
  };

  // PDF Generation handler with smart naming and real-time progress
  const handleGerarPdf = async (customFilename?: string) => {
    const nomeModuloMap: Record<string, string> = {
      dashboard: 'Relatorio-Geral-SST',
      cat: 'CAT-Comunicacao-Acidente-Trabalho',
      pcmso: 'PCMSO-Programa-Controle-Medico',
      ltcat: 'LTCAT-Laudo-Tecnico-Condicoes-Ambientais',
      aso: 'ASO-Atestado-Saude-Ocupacional',
      gro: 'GRO-PGR-Inventario-Riscos',
      apr: 'APR-Analise-Preliminar-Risco',
      epi: 'Ficha-EPI-Controle-Entrega',
      dds: 'DDS-Dialogo-Diario-Seguranca',
      extintores: 'Checklist-Inspecao-Extintores',
      checklists: 'Checklist-Inspecao-SST',
      treinamentos: 'Treinamentos-NR-Certificados',
      exames: 'Controle-Exames-Ocupacionais',
      documentos: 'Gestao-Documentos-SST',
      nrs: 'Normas-Regulamentadoras-SST'
    };

    const sufixo = nomeModuloMap[moduloAtivo] || 'Documento-SST';
    const dataFormatada = new Date().toISOString().split('T')[0];
    const filename = customFilename || `CONSULPREV-${sufixo}-${dataFormatada}.pdf`;

    setPdfStatus({
      ativo: true,
      mensagem: 'Iniciando geração de PDF...',
      tipo: 'loading'
    });

    try {
      const resultado = await exportarElementoParaPdf({
        filename,
        onProgress: (msg) => {
          setPdfStatus({
            ativo: true,
            mensagem: msg,
            tipo: 'loading'
          });
        }
      });

      if (resultado.sucesso) {
        setPdfStatus({
          ativo: true,
          mensagem: resultado.mensagem,
          tipo: 'success'
        });
        setTimeout(() => setPdfStatus(null), 4000);
      } else {
        setPdfStatus({
          ativo: true,
          mensagem: resultado.mensagem,
          tipo: 'error'
        });
        setTimeout(() => setPdfStatus(null), 5000);
      }
    } catch (err: any) {
      setPdfStatus({
        ativo: true,
        mensagem: `Erro ao gerar PDF: ${err?.message || 'Falha inesperada'}`,
        tipo: 'error'
      });
      setTimeout(() => setPdfStatus(null), 5000);
    }
  };

  // Cross-module navigations
  const handleEmitirAsoParaCargo = (cargo: string) => {
    setModuloAtivo('aso');
  };

  const handleEmitirAsoParaColaborador = (colaboradorNome: string) => {
    setModuloAtivo('aso');
  };

  // Handle addition of EPI delivery to an employee
  const handleAdicionarEntregaEpi = (colaboradorId: string, novaEntrega: RegistroEntregaItem) => {
    setFichasEpi(fichasAtuais => {
      const fichaExistente = fichasAtuais.find(f => f.colaboradorId === colaboradorId);
      if (fichaExistente) {
        return fichasAtuais.map(f => 
          f.colaboradorId === colaboradorId 
            ? { ...f, entregas: [novaEntrega, ...f.entregas] }
            : f
        );
      } else {
        const colab = colaboradores.find(c => c.id === colaboradorId);
        const novaFicha = {
          id: `ficha-${Date.now()}`,
          colaboradorId,
          colaboradorNome: colab?.nome || 'Colaborador',
          cpf: colab?.cpf || '',
          cargo: colab?.cargo || '',
          setor: colab?.setor || '',
          matricula: colab?.matricula || '',
          dataAdmissao: colab?.dataAdmissao || '',
          termoCienciaAceito: true,
          dataAssinaturaTermo: new Date().toISOString().split('T')[0],
          entregas: [novaEntrega]
        };
        return [novaFicha, ...fichasAtuais];
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-900 font-sans antialiased">
      {/* Top Application Header */}
      <Header 
        empresa={empresa} 
        moduloAtivo={moduloAtivo}
        onMudarModulo={setModuloAtivo}
        onImprimirPagina={handleImprimir}
        onGerarPdf={() => handleGerarPdf()}
        onAbrirInstalar={() => setModalInstalarAberto(true)}
      />

      {/* Main Navigation Tabs */}
      <NavigationTabs 
        moduloAtivo={moduloAtivo} 
        onSelecionarModulo={setModuloAtivo} 
        contadores={{
          cats: cats.length,
          examesVencendo: exames.filter(e => e.status === 'Vencendo (30 dias)' || e.status === 'Vencido').length,
          treinamentosPendentes: treinamentos.filter(t => t.status !== 'Concluído').length,
          checklists: checklists.length,
          epis: epis.length,
          dds: ddsRegistros.length,
          extintores: extintores.length
        }}
      />

      {/* Dynamic Module Content View */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {moduloAtivo === 'dashboard' && (
          <DashboardModule
            empresa={empresa}
            cats={cats}
            exames={exames}
            treinamentos={treinamentos}
            groRiscos={riscos}
            onNavegar={setModuloAtivo}
            onEmitirNovaCat={() => setModuloAtivo('cat')}
            onEmitirNovoAso={() => setModuloAtivo('aso')}
            onNovaApr={() => setModuloAtivo('apr')}
          />
        )}

        {moduloAtivo === 'nrs' && (
          <NrsModule
            onNavegarParaTreinamentos={() => setModuloAtivo('treinamentos')}
            onNavegarParaChecklists={() => setModuloAtivo('checklists')}
            onGerarPdf={() => handleGerarPdf()}
          />
        )}

        {moduloAtivo === 'epi' && (
          <EpiModule
            empresa={empresa}
            colaboradores={colaboradores}
            epis={epis}
            fichas={fichasEpi}
            onAdicionarEntrega={handleAdicionarEntregaEpi}
            onAdicionarEpiAoCatalogo={(novoEpi) => setEpis([novoEpi, ...epis])}
            onImprimir={handleImprimir}
            onGerarPdf={() => handleGerarPdf()}
          />
        )}

        {moduloAtivo === 'dds' && (
          <DdsModule
            empresa={empresa}
            colaboradores={colaboradores}
            temas={ddsTemas}
            registros={ddsRegistros}
            onAdicionarRegistro={(novoReg) => setDdsRegistros([novoReg, ...ddsRegistros])}
            onImprimir={handleImprimir}
            onGerarPdf={() => handleGerarPdf()}
          />
        )}

        {moduloAtivo === 'extintores' && (
          <ExtintoresModule
            empresa={empresa}
            extintores={extintores}
            onAdicionarExtintor={(novo) => setExtintores([novo, ...extintores])}
            onAtualizarExtintor={(atualizado) => {
              setExtintores(extintores.map(e => e.id === atualizado.id ? atualizado : e));
            }}
            onImprimir={handleImprimir}
            onGerarPdf={() => handleGerarPdf()}
          />
        )}

        {moduloAtivo === 'cat' && (
          <CatModule
            empresa={empresa}
            colaboradores={colaboradores}
            cats={cats}
            onAdicionarCat={(nova) => setCats([nova, ...cats])}
            onImprimir={handleImprimir}
            onGerarPdf={() => handleGerarPdf()}
          />
        )}

        {moduloAtivo === 'ltcat' && (
          <LtcatModule
            empresa={empresa}
            ltcats={ltcats}
            onAdicionarLtcat={(novo) => setLtcats([novo, ...ltcats])}
            onImprimir={handleImprimir}
            onGerarPdf={() => handleGerarPdf()}
          />
        )}

        {moduloAtivo === 'pcmso' && (
          <PcmsoModule
            empresa={empresa}
            pcmso={pcmso}
            onImprimir={handleImprimir}
            onGerarPdf={() => handleGerarPdf()}
            onEmitirAsoParaCargo={handleEmitirAsoParaCargo}
          />
        )}

        {moduloAtivo === 'aso' && (
          <AsoModule
            empresa={empresa}
            colaboradores={colaboradores}
            asos={asos}
            onAdicionarAso={(novo) => setAsos([novo, ...asos])}
            onImprimir={handleImprimir}
            onGerarPdf={() => handleGerarPdf()}
          />
        )}

        {moduloAtivo === 'gro' && (
          <GroModule
            empresa={empresa}
            riscos={riscos}
            onAdicionarRisco={(novo) => setRiscos([novo, ...riscos])}
            onImprimir={handleImprimir}
            onGerarPdf={() => handleGerarPdf()}
          />
        )}

        {moduloAtivo === 'apr' && (
          <AprModule
            empresa={empresa}
            aprs={aprs}
            onAdicionarApr={(nova) => setAprs([nova, ...aprs])}
            onImprimir={handleImprimir}
            onGerarPdf={() => handleGerarPdf()}
          />
        )}

        {moduloAtivo === 'checklists' && (
          <ChecklistsModule
            empresa={empresa}
            checklists={checklists}
            onAtualizarChecklist={(atualizado) => {
              setChecklists(checklists.map(c => c.id === atualizado.id ? atualizado : c));
            }}
            onAdicionarChecklist={(novo) => setChecklists([novo, ...checklists])}
            onImprimir={handleImprimir}
            onGerarPdf={() => handleGerarPdf()}
          />
        )}

        {moduloAtivo === 'treinamentos' && (
          <TreinamentosModule
            empresa={empresa}
            colaboradores={colaboradores}
            treinamentos={treinamentos}
            onAdicionarTreinamento={(novo) => setTreinamentos([novo, ...treinamentos])}
            onImprimir={handleImprimir}
            onGerarPdf={() => handleGerarPdf()}
          />
        )}

        {moduloAtivo === 'exames' && (
          <ControleExamesModule
            empresa={empresa}
            colaboradores={colaboradores}
            exames={exames}
            onAdicionarExame={(novo) => setExames([novo, ...exames])}
            onImprimir={handleImprimir}
            onGerarPdf={() => handleGerarPdf()}
            onEmitirAso={handleEmitirAsoParaColaborador}
          />
        )}

        {moduloAtivo === 'documentos' && (
          <GestaoDocumentosModule
            empresa={empresa}
            documentos={documentos}
            onAdicionarDocumento={(novo) => setDocumentos([novo, ...documentos])}
            onImprimir={handleImprimir}
            onGerarPdf={() => handleGerarPdf()}
          />
        )}
      </main>

      {/* PWA Mobile Installation Modal with QR Code */}
      <InstallModal 
        isOpen={modalInstalarAberto}
        onClose={() => setModalInstalarAberto(false)}
      />

      {/* Toast de Feedback de Download / Geração de PDF */}
      {pdfStatus && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 max-w-md w-[calc(100vw-3rem)] shadow-2xl rounded-2xl border p-4 bg-white/95 backdrop-blur-md transition-all duration-300 no-print flex items-start gap-3 border-slate-200"
        >
          {pdfStatus.tipo === 'loading' && (
            <div className="p-2 rounded-xl bg-rose-50 text-rose-600 shrink-0">
              <Loader2 className="w-5 h-5 animate-spin" />
            </div>
          )}
          {pdfStatus.tipo === 'success' && (
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          )}
          {pdfStatus.tipo === 'error' && (
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600 shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
          )}

          <div className="flex-1 min-w-0 pr-2">
            <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
              {pdfStatus.tipo === 'loading' ? 'Exportação para PDF' : pdfStatus.tipo === 'success' ? 'Download Concluído' : 'Aviso de Exportação'}
            </h4>
            <p className="text-xs font-semibold text-slate-800 mt-0.5 leading-snug break-words">
              {pdfStatus.mensagem}
            </p>
          </div>

          <button
            onClick={() => setPdfStatus(null)}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors shrink-0 cursor-pointer"
            title="Fechar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Footer bar */}
      <footer className="bg-slate-900 text-slate-400 py-4 px-6 text-xs text-center border-t border-slate-800 no-print mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            CONSULPREV SST — Sistema Integrado de Segurança e Medicina do Trabalho
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setModalInstalarAberto(true)}
              className="text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer underline underline-offset-2"
            >
              Instalar Aplicativo no Celular (QR Code)
            </button>
            <span className="text-slate-500">
              Conforme Normas Regulamentadoras MTE e eSocial (S-2210, S-2220, S-2240)
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

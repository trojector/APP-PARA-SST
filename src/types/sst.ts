export type ModuloSST = 
  | 'dashboard'
  | 'nrs'
  | 'cat'
  | 'ltcat'
  | 'pcmso'
  | 'aso'
  | 'gro'
  | 'apr'
  | 'checklists'
  | 'extintores'
  | 'treinamentos'
  | 'exames'
  | 'documentos'
  | 'epi'
  | 'dds';

export interface Empresa {
  id: string;
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  cnae: string;
  grauDeRisco: 1 | 2 | 3 | 4;
  endereco: string;
  cidade: string;
  uf: string;
  cep: string;
  telefone: string;
  responsavelSST: string;
  registroProfissional: string;
}

export interface Colaborador {
  id: string;
  nome: string;
  cpf: string;
  rg: string;
  dataNascimento: string;
  cargo: string;
  setor: string;
  dataAdmissao: string;
  matricula: string;
  status: 'Ativo' | 'Afastado' | 'Férias' | 'Desligado';
}

export interface NormaRegulamentadora {
  numero: string;
  titulo: string;
  categoria: 'Geral' | 'Especial' | 'Setorial';
  resumo: string;
  objetivo: string;
  itensChave: string[];
  status: 'Vigente' | 'Em Revisão';
  ultimaAtualizacao: string;
  obrigatoriedade: string;
}

export interface CATRegistro {
  id: string;
  numeroCat: string;
  tipoCat: 'Inicial' | 'Reabertura' | 'Comunicação de Óbito';
  empresaId: string;
  colaboradorId: string;
  colaboradorNome: string;
  colaboradorCpf: string;
  cargo: string;
  setor: string;
  dataAcidente: string;
  horaAcidente: string;
  tipoAcidente: 'Típico' | 'Trajeto' | 'Doença Ocupacional';
  houveAfastamento: boolean;
  diasAfastamento?: number;
  houveMorte: boolean;
  localAcidente: string;
  descricaoAcidente: string;
  parteCorpoAtingida: string;
  agenteCausador: string;
  situacaoGeradora: string;
  atestadoMedico: {
    dataAtendimento: string;
    horaAtendimento: string;
    houveInternacao: boolean;
    provavelDuracaoTratamentoDias: number;
    cid10: string;
    descricaoCid: string;
    medicoNome: string;
    crm: string;
    crmUf: string;
  };
  dataEmissao: string;
  statusEsocial: 'Transmitido' | 'Pendente' | 'Processado';
  reciboEsocial?: string;
}

export interface LTCATAvaliacao {
  id: string;
  numeroLaudo: string;
  empresaId: string;
  setor: string;
  funcao: string;
  dataAvaliacao: string;
  validade: string;
  engenheiroResponsavel: string;
  crea: string;
  agentes: {
    tipo: 'Físico' | 'Químico' | 'Biológico';
    nomeAgente: string;
    metodologia: string;
    valorEncontrado: string;
    unidade: string;
    limiteTolerancia: string;
    nivelAcao: string;
    exposicaoHabitual: boolean;
    epcEficaz: boolean;
    epiRecomendado: string;
    caEpi: string;
  }[];
  conclusaoPrevidenciaria: 'Ausência de Exposição a Agentes Nocivos (Sem Aposentadoria Especial)' | 'Comprovação de Condições Especiais (Enquadramento Aposentadoria Especial - GFIP 04)';
  fundamentacaoLegal: string;
  observacoes: string;
}

export interface PCMSOCargoExame {
  cargo: string;
  setor: string;
  riscos: string[];
  examesObrigatorios: {
    tipoExame: 'Clínico' | 'Audiometria' | 'Espirometria' | 'Hemograma' | 'Raio-X Tórax OIT' | 'Eletrocardiograma' | 'Acuidade Visual' | 'Glicemia';
    periodicidade: 'Admissional' | 'Periódico Anual' | 'Periódico Semestral' | 'Mudança de Riscos' | 'Retorno ao Trabalho' | 'Demissional';
  }[];
}

export interface PCMSOPrograma {
  id: string;
  anoVigencia: string;
  empresaId: string;
  medicoCoordenador: string;
  crmCoordenador: string;
  rqeCoordenador: string;
  clinicaConveniada: string;
  dataEmissao: string;
  dataValidade: string;
  cargosExames: PCMSOCargoExame[];
  acoesSaudeCronograma: {
    mes: string;
    acao: string;
    publicoAlvo: string;
    status: 'Realizado' | 'Agendado' | 'Pendente';
  }[];
}

export interface ASORegistro {
  id: string;
  numeroAso: string;
  tipoAso: 'Admissional' | 'Periódico' | 'Retorno ao Trabalho' | 'Mudança de Riscos Ocupacionais' | 'Demissional';
  empresaId: string;
  colaboradorId: string;
  colaboradorNome: string;
  colaboradorCpf: string;
  cargo: string;
  setor: string;
  riscosIdentificados: string[];
  examesRealizados: {
    nomeExame: string;
    data: string;
    resultado: 'Normal' | 'Alterado Estável' | 'Alterado em Investigação';
  }[];
  parecerAptidao: 'APTO' | 'INAPTO' | 'APTO COM RESTRIÇÃO';
  restricoes?: string;
  aptoEspacoConfinadoNR33: boolean;
  aptoTrabalhoAlturaNR35: boolean;
  dataEmissao: string;
  medicoExaminador: string;
  crmExaminador: string;
  ufCrmExaminador: string;
  medicoCoordenador: string;
  crmCoordenador: string;
}

export interface GRORisco {
  id: string;
  setor: string;
  atividade: string;
  fatorRisco: string;
  tipoRisco: 'Físico' | 'Químico' | 'Biológico' | 'Ergonômico' | 'Acidente/Mecânico';
  fonteGeradora: string;
  possiveisDanos: string;
  probabilidade: 1 | 2 | 3 | 4 | 5; // 1: Muito Baixa -> 5: Muito Alta
  severidade: 1 | 2 | 3 | 4 | 5;    // 1: Leve -> 5: Catastrófica
  nivelRisco: 'Trivial' | 'Tolerável' | 'Moderado' | 'Substancial' | 'Crítico';
  medidasExistentes: string;
  medidasPropostas: string;
  planoAcao: {
    oque: string;
    como: string;
    responsavel: string;
    prazo: string;
    status: 'Concluído' | 'Em Andamento' | 'Não Iniciado';
  };
}

export interface APRRegistro {
  id: string;
  numeroApr: string;
  atividade: string;
  local: string;
  dataInicio: string;
  dataValidade: string;
  responsavelTecnico: string;
  empresaExecutante: string;
  permissaoTrabalhoNecessaria: boolean;
  statusPT: 'Liberada' | 'Em Análise' | 'Encerrada';
  episObrigatorios: string[];
  epcsObrigatorios: string[];
  passosAtividade: {
    passo: number;
    descricao: string;
    perigos: string;
    causas: string;
    consequencias: string;
    medidasControle: string;
  }[];
  equipeExecutante: {
    nome: string;
    funcao: string;
    treinadoNR: boolean;
  }[];
}

export interface ChecklistItem {
  id: string;
  descricao: string;
  criterio: string;
  status: 'Conforme' | 'Não Conforme' | 'Não Aplicável';
  observacao?: string;
  fotoUrl?: string;
}

export interface ChecklistInspecao {
  id: string;
  titulo: string;
  categoria: 'NR-35 Trabalho em Altura' | 'NR-18 Canteiro de Obras' | 'NR-23 Combate a Incêndio' | 'NR-12 Máquinas e Equipamentos' | 'NR-06 EPI' | 'Inspeção Veicular e NR-11';
  local: string;
  data: string;
  inspetor: string;
  itens: ChecklistItem[];
  conformidadePercentual: number;
  statusGeral: 'Aprovado' | 'Aprovado com Ressalvas' | 'Interditado / Reprovado';
  acoesCorretivas?: string;
}

export interface TreinamentoNR {
  id: string;
  nrCodigo: string; // ex: NR-35
  titulo: string;
  tipo: 'Inicial' | 'Periódico' | 'Eventual';
  cargaHorariaHoras: number;
  modalidade: 'Presencial' | 'Semipresencial' | 'EAD';
  instrutorNome: string;
  instrutorRegistro: string;
  responsavelTecnico: string;
  conteudoProgramatico: string[];
  dataInicio: string;
  dataTermino: string;
  validadeMeses: number;
  participantes: {
    colaboradorId: string;
    nome: string;
    cpf: string;
    funcao: string;
    notaAvaliacao: number;
    aprovado: boolean;
    numeroCertificado: string;
  }[];
  status: 'Concluído' | 'Em Andamento' | 'Agendado';
}

export interface ExameControle {
  id: string;
  colaboradorId: string;
  colaboradorNome: string;
  cpf: string;
  cargo: string;
  setor: string;
  tipoExame: string;
  dataUltimoExame: string;
  dataVencimento: string;
  diasAteVencer: number;
  status: 'Em Dia' | 'Vencendo (30 dias)' | 'Vencido';
  clinica: string;
  resultado: 'Apto' | 'Pendente' | 'Apto com Restrições';
}

export interface DocumentoSST {
  id: string;
  tipo: 'LTCAT' | 'PCMSO' | 'PGR' | 'APR' | 'CAT' | 'ASO' | 'AET' | 'Laudo de Insalubridade' | 'Certificado NR' | 'Ficha de EPI';
  codigo: string;
  titulo: string;
  empresa: string;
  dataEmissao: string;
  dataValidade: string;
  responsavelTecnico: string;
  statusVigencia: 'Vigente' | 'Em Renovação' | 'Vencido';
  tamanhoArquivo: string;
}

// -------------------------------------------------------------
// NR-06: EQUIPAMENTOS DE PROTEÇÃO INDIVIDUAL (EPI)
// -------------------------------------------------------------
export type CategoriaEPI = 
  | 'Proteção da Cabeça'
  | 'Proteção dos Olhos e Face'
  | 'Proteção Auditiva'
  | 'Proteção Respiratória'
  | 'Proteção dos Membros Superiores'
  | 'Proteção dos Membros Inferiores'
  | 'Proteção Contra Quedas'
  | 'Vestimentas de Segurança';

export interface EPIItem {
  id: string;
  nome: string;
  categoria: CategoriaEPI;
  numeroCA: string; // Certificado de Aprovação emitido pelo MTE
  validadeCA: string; // YYYY-MM-DD
  fabricante: string;
  modelo: string;
  descricaoTecnica: string;
  atenuacaoOuProtecao: string;
  estoqueAtual: number;
  unidade: 'Par' | 'Unidade' | 'Conjunto' | 'Peça';
  statusCA: 'Válido' | 'Em Renovação' | 'Vencido';
}

export interface RegistroEntregaItem {
  id: string;
  epiId: string;
  nomeEPI: string;
  numeroCA: string;
  dataEntrega: string;
  quantidade: number;
  motivo: 'Fornecimento Inicial' | 'Substituição por Desgaste' | 'Extravio / Perda' | 'Avaria / Dano' | 'Periódico';
  dataDevolucao?: string;
  assinaturaConfirmada: boolean;
  observacao?: string;
}

export interface FichaEntregaEPI {
  id: string;
  colaboradorId: string;
  colaboradorNome: string;
  cpf: string;
  cargo: string;
  setor: string;
  matricula: string;
  dataAdmissao: string;
  entregas: RegistroEntregaItem[];
  termoCienciaAceito: boolean;
  dataAssinaturaTermo: string;
}

export type FichaEPI = FichaEntregaEPI;

// -------------------------------------------------------------
// DDS: DIÁLOGO DIÁRIO DE SEGURANÇA
// -------------------------------------------------------------
export interface DDSTema {
  id: string;
  titulo: string;
  nrVinculada: string;
  categoria: 'Normas Regulamentadoras' | 'Comportamento Seguro' | 'Saúde & Ergonomia' | 'Emergência & Primeiros Socorros' | 'Procedimentos Operacionais';
  resumo: string;
  conteudoTextual: string;
  pontosChave: string[];
  perguntasInterativas: string[];
  tempoEstimadoMin: number;
}

export interface ParticipanteDDS {
  colaboradorId: string;
  nome: string;
  cpf: string;
  cargo: string;
  presente: boolean;
  rubricaAssinada: boolean;
}

export interface DDSRegistro {
  id: string;
  numeroAta: string;
  data: string;
  horario: string;
  setor: string;
  temaId: string;
  tituloTema: string;
  nrVinculada: string;
  facilitadorNome: string;
  facilitadorCargo: string;
  resumoDiscussao: string;
  observacoesEquipe?: string;
  participantes: ParticipanteDDS[];
  status: 'Realizado' | 'Agendado';
}

// -------------------------------------------------------------
// NR-23 / NBR 12962: INSPEÇÃO DE EXTINTORES DE INCÊNDIO
// -------------------------------------------------------------
export type TipoCargaExtintor = 
  | 'Pó Químico Seco (PQS) ABC'
  | 'Pó Químico Seco (PQS) BC'
  | 'Água Pressurizada (AP)'
  | 'Gás Carbônico (CO2)'
  | 'Espuma Mecânica';

export interface ExtintorItem {
  id: string;
  codigoIdentificacao: string; // Ex: EXT-01, EXT-02
  localizacaoSetor: string;
  tipoCarga: TipoCargaExtintor;
  capacidade: string; // Ex: '4 kg', '6 kg', '10 L', '12 kg'
  fabricante: string;
  numeroCilindro: string;
  numeroSeloInmetro: string;
  dataUltimaInspecao: string;
  dataProximaRecarga: string; // Anual
  dataTesteHidrostatico: string; // Quinquenal (5 anos)
  // Itens de checklist visual (NBR 12962 nível 1)
  manometroPressurizado: boolean; // Faixa verde
  lacreEPinoIntactos: boolean;
  anelIdentificacaoCorreto: boolean; // Cor do ano
  mangueiraBicoDesobstruidos: boolean;
  suporteEAlturaConforme: boolean; // Fixado até 1,60m ou em abrigo
  sinalizacaoEDesobstrucaoLivre: boolean; // Placa visível e demarcação 1x1m livre
  cilindroSemDanosOuOxidacao: boolean;
  status: 'Aprovado' | 'Requer Recarga / Manutenção' | 'Interditado / Condenado';
  observacoes?: string;
  inspetorResponsavel: string;
}

export interface RelatorioInspecaoExtintores {
  id: string;
  numeroRelatorio: string;
  dataRealizacao: string;
  inspetorNome: string;
  inspetorRegistro: string;
  setorInspecionado: string;
  totalInspecionados: number;
  totalAprovados: number;
  totalComIrregularidades: number;
  extintores: ExtintorItem[];
  conclusoesAcoes: string;
}



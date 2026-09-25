import {
  Empresa,
  Colaborador,
  NormaRegulamentadora,
  CATRegistro,
  LTCATAvaliacao,
  PCMSOPrograma,
  ASORegistro,
  GRORisco,
  APRRegistro,
  ChecklistInspecao,
  TreinamentoNR,
  ExameControle,
  DocumentoSST,
  EPIItem,
  FichaEntregaEPI,
  DDSTema,
  DDSRegistro,
  ExtintorItem,
  RelatorioInspecaoExtintores
} from '../types/sst';

export const empresaPadrao: Empresa = {
  id: 'emp-01',
  razaoSocial: 'CONSTRUTORA E ENGENHARIA METRÓPOLE LTDA',
  nomeFantasia: 'METRÓPOLE ENGENHARIA & MONTAGENS',
  cnpj: '18.492.381/0001-94',
  cnae: '41.20-4-00 - Construção de edifícios industriais',
  grauDeRisco: 3,
  endereco: 'Av. das Indústrias, 3500 - Distrito Industrial',
  cidade: 'São Paulo',
  uf: 'SP',
  cep: '04578-000',
  telefone: '(11) 3482-9000',
  responsavelSST: 'Eng. Ricardo Silveira Mello',
  registroProfissional: 'CREA-SP 506.892/D - Eng. Segurança do Trabalho'
};

export const consultoriaSST = {
  nome: 'CONSULPREV SST',
  subtitulo: 'CONSULTORIA E TREINAMENTOS EM SEGURANÇA DO TRABALHO',
  cnpj: '33.918.412/0001-55',
  registroConselho: 'CREA-SP PJ 98741 / CRM-SP PJ 65231',
  responsavelTecnico: 'Eng. Carlos Eduardo Braga - CREA 507.123/D',
  medicoCoordenador: 'Dr. Roberto Fontes Guimarães - CRM/SP 128.450 - RQE 42.190',
  contato: 'contato@consulprevsst.com.br | (11) 4002-8922',
  cidade: 'São Paulo - SP'
};

export const colaboradoresIniciais: Colaborador[] = [
  {
    id: 'col-01',
    nome: 'Marcos Antônio da Silva',
    cpf: '284.918.238-12',
    rg: '42.891.022-X SSP/SP',
    dataNascimento: '1988-04-14',
    cargo: 'Montador de Estruturas Metálicas (Alpinista Industrial)',
    setor: 'Montagem e Obras Especiais',
    dataAdmissao: '2021-03-10',
    matricula: 'MET-0421',
    status: 'Ativo'
  },
  {
    id: 'col-02',
    nome: 'Carlos Eduardo Ferreira',
    cpf: '351.492.810-44',
    rg: '38.109.444-1 SSP/SP',
    dataNascimento: '1992-08-22',
    cargo: 'Soldador TIG / Eletrodo Revestido',
    setor: 'Caldeiraria Pesada',
    dataAdmissao: '2022-01-15',
    matricula: 'MET-0518',
    status: 'Ativo'
  },
  {
    id: 'col-03',
    nome: 'Juliana Beatriz Mendes',
    cpf: '412.873.091-88',
    rg: '50.198.321-7 SSP/SP',
    dataNascimento: '1995-11-03',
    cargo: 'Eletricista de Manutenção Industrial',
    setor: 'Manutenção Elétrica e Subestações',
    dataAdmissao: '2023-05-02',
    matricula: 'MET-0679',
    status: 'Ativo'
  },
  {
    id: 'col-04',
    nome: 'Rogério Lima de Souza',
    cpf: '198.324.710-09',
    rg: '29.400.111-3 SSP/SP',
    dataNascimento: '1984-02-18',
    cargo: 'Operador de Empilhadeira e Ponte Rolante',
    setor: 'Logística e Almoxarifado',
    dataAdmissao: '2020-07-20',
    matricula: 'MET-0312',
    status: 'Ativo'
  },
  {
    id: 'col-05',
    nome: 'Fernanda Aparecida Gomes',
    cpf: '490.182.374-55',
    rg: '44.890.123-9 SSP/SP',
    dataNascimento: '1997-09-30',
    cargo: 'Técnica de Segurança do Trabalho',
    setor: 'SESMT',
    dataAdmissao: '2022-06-01',
    matricula: 'MET-0580',
    status: 'Ativo'
  }
];

export const catalogoNRs: NormaRegulamentadora[] = [
  {
    numero: 'NR-01',
    titulo: 'Disposições Gerais e Gerenciamento de Riscos Ocupacionais (GRO/PGR)',
    categoria: 'Geral',
    resumo: 'Define os termos, direitos e deveres dos empregadores e trabalhadores, estabelecendo a obrigatoriedade da implantação do GRO e do Programa de Gerenciamento de Riscos (PGR).',
    objetivo: 'Estabelecer as diretrizes e os requisitos para o gerenciamento de riscos ocupacionais e as medidas de prevenção em Segurança e Saúde no Trabalho.',
    itensChave: ['Levantamento preliminar de perigos', 'Identificação e avaliação de riscos', 'Inventário Geral de Riscos', 'Plano de Ação e Acompanhamento', 'Matriz de Risco Ocupacional'],
    status: 'Vigente',
    ultimaAtualizacao: 'Portaria MTP n.º 4.219/2022',
    obrigatoriedade: 'Obrigatória para todas as empresas públicas e privadas com empregados sob a CLT.'
  },
  {
    numero: 'NR-04',
    titulo: 'Serviços Especializados em Segurança e em Medicina do Trabalho (SESMT)',
    categoria: 'Geral',
    resumo: 'Regulamenta o dimensionamento, atribuições e funcionamento da equipe interna de profissionais de SST (Engenheiro, Médico, Técnico, Enfermeiro e Auxiliar de Enfermagem).',
    objetivo: 'Promover a saúde e proteger a integridade do trabalhador no local de trabalho através de corpo técnico especializado.',
    itensChave: ['Dimensionamento por Grau de Risco e Nº de Empregados', 'Atuação preventiva', 'Modalidades de SESMT (Individual, Compartilhado)'],
    status: 'Vigente',
    ultimaAtualizacao: 'Portaria MTP n.º 2.318/2022',
    obrigatoriedade: 'Empresas com quadro de funcionários e grau de risco definidos no Quadro II.'
  },
  {
    numero: 'NR-05',
    titulo: 'Comissão Interna de Prevenção de Acidentes e Assédio (CIPA)',
    categoria: 'Geral',
    resumo: 'Institui a CIPA com eleição paritária e atribuição ampliada para combate ao assédio sexual e demais formas de violência no trabalho (Lei 14.457/22).',
    objetivo: 'Prevenção de acidentes e doenças decorrentes do trabalho e preservação da dignidade.',
    itensChave: ['Processo eleitoral anual', 'Reuniões mensais ordinárias', 'Elaboração do Mapa de Riscos / Percepção de Riscos', 'SIPAT', 'Canal de denúncias e combate ao assédio'],
    status: 'Vigente',
    ultimaAtualizacao: 'Portaria MTP n.º 4.219/2022',
    obrigatoriedade: 'Empresas conforme dimensionamento do Quadro I da NR-05.'
  },
  {
    numero: 'NR-06',
    titulo: 'Equipamento de Proteção Individual (EPI)',
    categoria: 'Geral',
    resumo: 'Obrigatoriedade de fornecimento gratuito de EPI adequado ao risco, com Certificado de Aprovação (CA) válido e registro na Ficha de Controle de EPI.',
    objetivo: 'Definir regras de seleção, aquisição, fornecimento, guarda, higienização e substituição de EPIs.',
    itensChave: ['Certificado de Aprovação (CA)', 'Treinamento de uso e guarda', 'Ficha de entrega e termo de responsabilidade', 'Hierarquia: EPC antes do EPI'],
    status: 'Vigente',
    ultimaAtualizacao: 'Portaria MTP n.º 2.175/2022',
    obrigatoriedade: 'Todas as empresas onde as medidas de ordem geral não ofereçam proteção completa.'
  },
  {
    numero: 'NR-07',
    titulo: 'Programa de Controle Médico de Saúde Ocupacional (PCMSO)',
    categoria: 'Geral',
    resumo: 'Diretrizes para monitoramento da saúde dos trabalhadores com base nos riscos mapeados no PGR, emissão de ASO e realização de exames periódicos e complementares.',
    objetivo: 'Preservar e promover a saúde física e mental dos trabalhadores em decorrência de suas atividades.',
    itensChave: ['Médico do Trabalho Coordenador', 'Exames: Admissional, Periódico, Demissional, Retorno, Mudança', 'Emissão obrigatória do ASO', 'Relatório Analítico Anual'],
    status: 'Vigente',
    ultimaAtualizacao: 'Portaria SEPRT n.º 6.734/2020',
    obrigatoriedade: 'Todas as empresas que admitam trabalhadores como empregados.'
  },
  {
    numero: 'NR-09',
    titulo: 'Avaliação e Controle das Exposições Ocupacionais a Agentes Físicos, Químicos e Biológicos',
    categoria: 'Geral',
    resumo: 'Orienta a metodologia de identificação, medição quantitativa e controle das exposições aos agentes ambientais que possam causar danos à saúde.',
    objetivo: 'Subsidiar as medidas de prevenção para os agentes nocivos integrados ao PGR.',
    itensChave: ['Níveis de ação', 'Limites de tolerância', 'Dosimetrias de ruído, calor (IBUTG), poeiras e vapores'],
    status: 'Vigente',
    ultimaAtualizacao: 'Portaria SEPRT n.º 6.735/2020',
    obrigatoriedade: 'Todas as organizações com potencial de exposição a agentes ambientais.'
  },
  {
    numero: 'NR-10',
    titulo: 'Segurança em Instalações e Serviços em Eletricidade',
    categoria: 'Especial',
    resumo: 'Diretrizes para trabalhos em baixa e alta tensão, desenergização, bloqueio LOTO, prontuário das instalações elétricas e capacitação obrigatória (Básico 40h / SEP 40h).',
    objetivo: 'Garantir a segurança e a saúde dos trabalhadores que interagem em instalações elétricas.',
    itensChave: ['Prontuário Elétrico', 'Treinamento 40h', 'Bloqueio e Etiquetagem (LOTO)', 'EPIs classe de tensão e vestimentas anti-arco elétrico (ATPV)'],
    status: 'Vigente',
    ultimaAtualizacao: 'Portaria SEPRT n.º 915/2019',
    obrigatoriedade: 'Empresas com geração, transmissão, distribuição e consumo de energia elétrica.'
  },
  {
    numero: 'NR-11',
    titulo: 'Transporte, Movimentação, Armazenagem e Manuseio de Materiais',
    categoria: 'Especial',
    resumo: 'Regras de segurança para operação de empilhadeiras, pontes rolantes, guindastes, talhas, elevadores de carga e empilhamento seguro de materiais.',
    objetivo: 'Evitar tombamentos, atropelamentos, quedas de carga e acidentes com veículos industriais.',
    itensChave: ['Cartão de identificação do operador com foto e validade', 'Inspeção diária do operador (check-list)', 'Capacidade máxima de carga visível'],
    status: 'Vigente',
    ultimaAtualizacao: 'Portaria MTb n.º 1.082/2018',
    obrigatoriedade: 'Operações de carga e descarga, galpões e movimentação interna de cargas.'
  },
  {
    numero: 'NR-12',
    titulo: 'Segurança no Trabalho em Máquinas e Equipamentos',
    categoria: 'Geral',
    resumo: 'Medidas de proteção para prensas, tornos, esteiras, fresadoras, injetoras e máquinas em geral, exigindo proteções fixas/móveis intertravadas e botões de emergência.',
    objetivo: 'Garantir a integridade física de operadores e manutentores de máquinas ao longo de todo o ciclo de vida.',
    itensChave: ['Apreciação de Riscos (ART)', 'Sistemas de Intertravamento (Categoria 4 / Pl e)', 'Botão de parada de emergência', 'Manual em português e sinalização de segurança'],
    status: 'Vigente',
    ultimaAtualizacao: 'Portaria SEPRT n.º 916/2019',
    obrigatoriedade: 'Fabricação, importação, comercialização e operação de qualquer máquina industrial.'
  },
  {
    numero: 'NR-15',
    titulo: 'Atividades e Operações Insalubres',
    categoria: 'Especial',
    resumo: 'Estabelece limites de tolerância e critérios para caracterização de insalubridade (adicional de 10%, 20% ou 40%) por ruído, calor, radiação, químicos e biológicos.',
    objetivo: 'Identificar atividades que exponham colaboradores a agentes nocivos acima dos limites aceitáveis sem a devida neutralização.',
    itensChave: ['Anexos 1 a 14', 'Laudo Técnico de Insalubridade', 'Eficácia de neutralização por EPI/EPC'],
    status: 'Vigente',
    ultimaAtualizacao: 'Portaria MTP n.º 426/2021',
    obrigatoriedade: 'Empresas onde haja atividade com potencial insalubre.'
  },
  {
    numero: 'NR-16',
    titulo: 'Atividades e Operações Perigosas',
    categoria: 'Especial',
    resumo: 'Regulamenta o adicional de periculosidade (30% sobre o salário base) para inflamáveis, explosivos, eletricidade, radiação ionizante e segurança patrimonial.',
    objetivo: 'Reconhecer e compensar atividades que apresentem risco iminente de fatalidade.',
    itensChave: ['Áreas de risco', 'Armazenamento de líquidos combustíveis', 'Alta tensão e SEP'],
    status: 'Vigente',
    ultimaAtualizacao: 'Portaria MTE n.º 1.809/2023',
    obrigatoriedade: 'Ambientes com manuseio de inflamáveis, explosivos e instalações elétricas de risco.'
  },
  {
    numero: 'NR-17',
    titulo: 'Ergonomia',
    categoria: 'Geral',
    resumo: 'Adaptação das condições de trabalho às características psicofisiológicas dos trabalhadores, exigindo Avaliação Ergonômica Preliminar (AEP) e AET quando indicado.',
    objetivo: 'Proporcionar máximo de conforto, segurança e desempenho eficiente, prevenindo LER/DORT e fadiga mental.',
    itensChave: ['AEP (Avaliação Ergonômica Preliminar)', 'AET (Análise Ergonômica do Trabalho)', 'Mobiliário, postos de trabalho e pausas'],
    status: 'Vigente',
    ultimaAtualizacao: 'Portaria MTP n.º 423/2021',
    obrigatoriedade: 'Todas as organizações para postos de trabalho com esforço físico, visual ou cognitivo.'
  },
  {
    numero: 'NR-18',
    titulo: 'Segurança e Saúde no Trabalho na Indústria da Construção',
    categoria: 'Setorial',
    resumo: 'Regulamenta o canteiro de obras, PGR da construção, andaimes, plataformas elevatórias, trabalho a quente, instalações temporárias e áreas de vivência.',
    objetivo: 'Reduzir os altos índices de acidentes na construção civil e montagens.',
    itensChave: ['PGR da Construção Civil com projeto elétrico temporário', 'Linhas de vida definitivas', 'Áreas de vivência dignas'],
    status: 'Vigente',
    ultimaAtualizacao: 'Portaria SEPRT n.º 3.733/2020',
    obrigatoriedade: 'Obras de construção, demolição, reparo, pintura e limpeza de edificações.'
  },
  {
    numero: 'NR-20',
    titulo: 'Segurança e Saúde no Trabalho com Inflamáveis e Combustíveis',
    categoria: 'Especial',
    resumo: 'Prontuário de instalação, classificação das instalações (Classe I, II e III), capacitação dos trabalhadores e procedimentos de emergência contra vazamentos.',
    objetivo: 'Prevenir explosões e incêndios com líquidos inflamáveis e gases combustíveis.',
    itensChave: ['Controle de fontes de ignição', 'Treinamento de 4h a 32h dependendo da classe', 'Inspeção de tanques e tubulações'],
    status: 'Vigente',
    ultimaAtualizacao: 'Portaria SEPRT n.º 1.360/2019',
    obrigatoriedade: 'Postos de combustíveis, refinarias, petroquímicas e indústrias com estoques inflamáveis.'
  },
  {
    numero: 'NR-23',
    titulo: 'Proteção Contra Incêndios',
    categoria: 'Geral',
    resumo: 'Medidas de prevenção e combate a princípios de incêndio, saídas de emergência desobstruídas, sinalização de rota de fuga e brigada de emergência.',
    objetivo: 'Proteger a vida dos ocupantes de qualquer edificação através de medidas ativas e passivas.',
    itensChave: ['Inspeção e manutenção periódica de extintores', 'Desobstrução de corredores e portas corta-fogo', 'Simulados de evacuação'],
    status: 'Vigente',
    ultimaAtualizacao: 'Portaria SEPRT n.º 1.359/2019',
    obrigatoriedade: 'Todos os estabelecimentos ou locais de trabalho.'
  },
  {
    numero: 'NR-33',
    titulo: 'Segurança e Saúde nos Trabalhos em Espaços Confinados',
    categoria: 'Especial',
    resumo: 'Requisitos para entrada e trabalho em silos, tanques, galerias, tubulações; exigência de Permissão de Entrada e Trabalho (PET), vigia e monitoramento de O2/gases.',
    objetivo: 'Prevenir asfixia, intoxicação, explosões e soterramentos em recintos confinados.',
    itensChave: ['Cadastro de Espaços Confinados', 'Emissão da PET a cada entrada', 'Vigia exclusivo na entrada', 'Equipamento autônomo e tripé de resgate'],
    status: 'Vigente',
    ultimaAtualizacao: 'Portaria MTP n.º 1.690/2022',
    obrigatoriedade: 'Qualquer atividade onde haja espaço não projetado para ocupação contínua humana.'
  },
  {
    numero: 'NR-35',
    titulo: 'Trabalho em Altura (Acima de 2,00m)',
    categoria: 'Especial',
    resumo: 'Planejamento e execução de trabalhos executados acima de 2,00 metros do nível inferior com risco de queda. Exige Análise de Risco (AR), Permissão de Trabalho (PT), ASO específico e capacitação.',
    objetivo: 'Eliminar os acidentes por quedas de altura, causa primordial de óbitos no trabalho.',
    itensChave: ['Treinamento bienal de 8h', 'SPIQ (Sistema de Proteção Individual Contra Queda)', 'Linha de vida e ponto de ancoragem testado', 'Inspeção diária do cinto paraquedista e talabarte duplo'],
    status: 'Vigente',
    ultimaAtualizacao: 'Portaria MTP n.º 4.218/2022',
    obrigatoriedade: 'Todas as atividades executadas acima de 2 metros onde haja risco de queda.'
  },
  {
    numero: 'NR-38',
    titulo: 'Segurança e Saúde no Trabalho nas Atividades de Limpeza Urbana e Manejo de Resíduos Sólidos',
    categoria: 'Setorial',
    resumo: 'Condições de segurança para garis, coletores e operadores de triagem de lixo, exigindo pontos de apoio, vacinação e veículos com plataformas seguras.',
    objetivo: 'Garantir dignidade, higiene e proteção física a trabalhadores de coleta e destinação de resíduos.',
    itensChave: ['Vacinação contra tétano e hepatite B', 'Veículos coletores homologados', 'Pontos de apoio sanitário e hidratação'],
    status: 'Vigente',
    ultimaAtualizacao: 'Portaria MTP n.º 4.101/2022',
    obrigatoriedade: 'Empresas concessionárias e terceirizadas de limpeza urbana.'
  }
];

export const catsIniciais: CATRegistro[] = [
  {
    id: 'cat-01',
    numeroCat: '2026.09.001928-1',
    tipoCat: 'Inicial',
    empresaId: 'emp-01',
    colaboradorId: 'col-02',
    colaboradorNome: 'Carlos Eduardo Ferreira',
    colaboradorCpf: '351.492.810-44',
    cargo: 'Soldador TIG / Eletrodo Revestido',
    setor: 'Caldeiraria Pesada',
    dataAcidente: '2026-09-18',
    horaAcidente: '14:35',
    tipoAcidente: 'Típico',
    houveAfastamento: true,
    diasAfastamento: 7,
    houveMorte: false,
    localAcidente: 'Galpão 03 - Posto de Solda e Esmerilhamento',
    descricaoAcidente: 'Durante operação de esmerilhamento com disco abrasivo, ocorreu projeção de fagulha metálica incandescente que transfixou a fresta inferior do óculo de ampla visão, causando queimadura e irritação conjuntival no olho esquerdo.',
    parteCorpoAtingida: 'Olho Esquerdo (Aparelho Ocular)',
    agenteCausador: 'Partícula Metálica em Alta Velocidade / Faísca de Esmeril',
    situacaoGeradora: 'Desbaste e acabamento de cordão de solda com esmerilhadeira angular',
    atestadoMedico: {
      dataAtendimento: '2026-09-18',
      horaAtendimento: '15:20',
      houveInternacao: false,
      provavelDuracaoTratamentoDias: 7,
      cid10: 'T15.0 - Corpo estranho na córnea',
      descricaoCid: 'Corpo estranho corneano superficial e hiperemia conjuntival',
      medicoNome: 'Dra. Camila Nogueira Albuquerque',
      crm: '189.442',
      crmUf: 'SP'
    },
    dataEmissao: '2026-09-19',
    statusEsocial: 'Transmitido',
    reciboEsocial: '1.2.202609.0000000000084719283-09'
  }
];

export const ltcatsIniciais: LTCATAvaliacao[] = [
  {
    id: 'ltcat-01',
    numeroLaudo: 'LTCAT-2026-MET-004',
    empresaId: 'emp-01',
    setor: 'Caldeiraria e Usinagem Pesada',
    funcao: 'Soldador Industrial TIG / MIG',
    dataAvaliacao: '2026-08-10',
    validade: '2027-08-10',
    engenheiroResponsavel: 'Eng. Ricardo Silveira Mello',
    crea: 'CREA-SP 506.892/D',
    agentes: [
      {
        tipo: 'Físico',
        nomeAgente: 'Ruído Contínuo ou Intermitente',
        metodologia: 'Dosimetria acústica conforme NHO-01 da Fundacentro e NR-15 Anexo 1 (q=5, Limite 85 dB(A) para 8h)',
        valorEncontrado: '87.4',
        unidade: 'dB(A)',
        limiteTolerancia: '85.0 dB(A)',
        nivelAcao: '80.0 dB(A)',
        exposicaoHabitual: true,
        epcEficaz: false,
        epiRecomendado: 'Protetor Auditivo tipo Concha Atenuação NRRsf 22dB',
        caEpi: 'CA 12.188'
      },
      {
        tipo: 'Químico',
        nomeAgente: 'Fumos Metálicos (Manganês e Óxido de Ferro)',
        metodologia: 'Amostragem ativa com bomba gravimétrica e cassete de membrana éster de celulose conforme NIOSH 7300',
        valorEncontrado: '0.08',
        unidade: 'mg/m³',
        limiteTolerancia: '0.2 mg/m³',
        nivelAcao: '0.1 mg/m³',
        exposicaoHabitual: true,
        epcEficaz: true,
        epiRecomendado: 'Respirador PFF2 / N95 com válvula e carvão ativado',
        caEpi: 'CA 38.504'
      },
      {
        tipo: 'Físico',
        nomeAgente: 'Radiação Não Ionizante (Ultravioleta de Arco Elétrico)',
        metodologia: 'Avaliação qualitativa conforme NR-15 Anexo 7',
        valorEncontrado: 'Presente no arco de solda',
        unidade: 'Qualitativo',
        limiteTolerancia: 'Insalubridade em grau médio',
        nivelAcao: 'N/A',
        exposicaoHabitual: true,
        epcEficaz: true,
        epiRecomendado: 'Máscara de solda automática filtro DIN 9-13 e avental de raspa',
        caEpi: 'CA 40.119'
      }
    ],
    conclusaoPrevidenciaria: 'Ausência de Exposição a Agentes Nocivos (Sem Aposentadoria Especial)',
    fundamentacaoLegal: 'Conforme art. 191 da CLT e entendimento fixado pelo STF no ARE 664335, a utilização de EPI eficaz com Certificado de Aprovação (CA) válido, devidamente higienizado, periodicamente substituído e com treinamento comprovado descaracteriza a nocividade do ruído e fumos para fins do art. 57 da Lei 8.213/91.',
    observacoes: 'A empresa mantém controle rígido de substituição de EPIs e programa de conservação auditiva (PCA) implementado.'
  }
];

export const pcmsoIniciais: PCMSOPrograma[] = [
  {
    id: 'pcmso-01',
    anoVigencia: '2026/2027',
    empresaId: 'emp-01',
    medicoCoordenador: 'Dr. Roberto Fontes Guimarães',
    crmCoordenador: '128.450/SP',
    rqeCoordenador: '42.190 - Medicina do Trabalho',
    clinicaConveniada: 'CONSULPREV Diagnósticos Ocupacionais Ltda',
    dataEmissao: '2026-01-10',
    dataValidade: '2027-01-10',
    cargosExames: [
      {
        cargo: 'Montador de Estruturas Metálicas (Alpinista Industrial)',
        setor: 'Montagem e Obras Especiais',
        riscos: ['Queda com diferença de nível (NR-35)', 'Ruído intermitente', 'Postura não ergonômica', 'Intempéries'],
        examesObrigatorios: [
          { tipoExame: 'Clínico', periodicidade: 'Periódico Anual' },
          { tipoExame: 'Eletrocardiograma', periodicidade: 'Periódico Anual' },
          { tipoExame: 'Acuidade Visual', periodicidade: 'Periódico Anual' },
          { tipoExame: 'Glicemia', periodicidade: 'Periódico Anual' },
          { tipoExame: 'Audiometria', periodicidade: 'Periódico Semestral' }
        ]
      },
      {
        cargo: 'Soldador TIG / Eletrodo Revestido',
        setor: 'Caldeiraria Pesada',
        riscos: ['Fumos metálicos', 'Radiação não ionizante', 'Ruído elevado', 'Queimaduras'],
        examesObrigatorios: [
          { tipoExame: 'Clínico', periodicidade: 'Periódico Anual' },
          { tipoExame: 'Espirometria', periodicidade: 'Periódico Anual' },
          { tipoExame: 'Raio-X Tórax OIT', periodicidade: 'Periódico Anual' },
          { tipoExame: 'Audiometria', periodicidade: 'Periódico Semestral' },
          { tipoExame: 'Acuidade Visual', periodicidade: 'Periódico Anual' }
        ]
      },
      {
        cargo: 'Operador de Empilhadeira e Ponte Rolante',
        setor: 'Logística e Almoxarifado',
        riscos: ['Atropelamento', 'Vibração de corpo inteiro', 'Ruído', 'Sobrecarga visual'],
        examesObrigatorios: [
          { tipoExame: 'Clínico', periodicidade: 'Periódico Anual' },
          { tipoExame: 'Acuidade Visual', periodicidade: 'Periódico Anual' },
          { tipoExame: 'Audiometria', periodicidade: 'Periódico Anual' },
          { tipoExame: 'Eletrocardiograma', periodicidade: 'Periódico Anual' }
        ]
      }
    ],
    acoesSaudeCronograma: [
      { mes: 'Fevereiro', acao: 'Campanha de Hidratação e Prevenção de Estresse Térmico', publicoAlvo: 'Operários de campo e montagem', status: 'Realizado' },
      { mes: 'Maio', acao: 'Campanha do Maio Amarelo - Segurança Viária e Empilhadeiras', publicoAlvo: 'Operadores de logística e motoristas', status: 'Realizado' },
      { mes: 'Agosto', acao: 'Semana de Saúde Auditiva e Conservação Vocal (PCA)', publicoAlvo: 'Trabalhadores da Caldeiraria e Usinagem', status: 'Realizado' },
      { mes: 'Outubro', acao: 'Campanha Outubro Rosa e Prevenção de Doenças Crônicas', publicoAlvo: 'Todos os colaboradores', status: 'Agendado' },
      { mes: 'Novembro', acao: 'Campanha Novembro Azul e Ergonomia no Trabalho', publicoAlvo: 'Todos os colaboradores', status: 'Agendado' }
    ]
  }
];

export const asosIniciais: ASORegistro[] = [
  {
    id: 'aso-01',
    numeroAso: 'ASO-2026-08912',
    tipoAso: 'Periódico',
    empresaId: 'emp-01',
    colaboradorId: 'col-01',
    colaboradorNome: 'Marcos Antônio da Silva',
    colaboradorCpf: '284.918.238-12',
    cargo: 'Montador de Estruturas Metálicas (Alpinista Industrial)',
    setor: 'Montagem e Obras Especiais',
    riscosIdentificados: ['Físico: Ruído intermitente', 'Acidente: Queda com diferença de nível (NR-35)', 'Ergonômico: Trabalho estático e transporte de carga'],
    examesRealizados: [
      { nomeExame: 'Exame Clínico Ocupacional com Anamnese Dirigida', data: '2026-09-05', resultado: 'Normal' },
      { nomeExame: 'Eletrocardiograma (ECG) de Repouso', data: '2026-09-04', resultado: 'Normal' },
      { nomeExame: 'Acuidade Visual Ocupacional (Tabela Snellen)', data: '2026-09-04', resultado: 'Normal' },
      { nomeExame: 'Audiometria Tonal e Vocal Bilateral', data: '2026-09-04', resultado: 'Normal' },
      { nomeExame: 'Glicemia de Jejum e Hemograma Completo', data: '2026-09-03', resultado: 'Normal' }
    ],
    parecerAptidao: 'APTO',
    aptoEspacoConfinadoNR33: true,
    aptoTrabalhoAlturaNR35: true,
    dataEmissao: '2026-09-05',
    medicoExaminador: 'Dr. Leonardo Paes de Camargo',
    crmExaminador: '154.908',
    ufCrmExaminador: 'SP',
    medicoCoordenador: 'Dr. Roberto Fontes Guimarães',
    crmCoordenador: '128.450/SP'
  },
  {
    id: 'aso-02',
    numeroAso: 'ASO-2026-09144',
    tipoAso: 'Retorno ao Trabalho',
    empresaId: 'emp-01',
    colaboradorId: 'col-02',
    colaboradorNome: 'Carlos Eduardo Ferreira',
    colaboradorCpf: '351.492.810-44',
    cargo: 'Soldador TIG / Eletrodo Revestido',
    setor: 'Caldeiraria Pesada',
    riscosIdentificados: ['Físico: Ruído contínuo', 'Químico: Fumos metálicos', 'Físico: Radiação não ionizante (UV/IV)'],
    examesRealizados: [
      { nomeExame: 'Exame Oftalmológico Clínico Ocupacional', data: '2026-09-20', resultado: 'Normal' },
      { nomeExame: 'Exame Clínico de Retorno ao Trabalho', data: '2026-09-20', resultado: 'Normal' }
    ],
    parecerAptidao: 'APTO',
    restricoes: 'Uso obrigatório de protetor facial acoplado aos óculos de sobrepor vedados.',
    aptoEspacoConfinadoNR33: true,
    aptoTrabalhoAlturaNR35: false,
    dataEmissao: '2026-09-20',
    medicoExaminador: 'Dr. Leonardo Paes de Camargo',
    crmExaminador: '154.908',
    ufCrmExaminador: 'SP',
    medicoCoordenador: 'Dr. Roberto Fontes Guimarães',
    crmCoordenador: '128.450/SP'
  }
];

export const groRiscosIniciais: GRORisco[] = [
  {
    id: 'gro-01',
    setor: 'Montagem e Obras Especiais',
    atividade: 'Instalação de vigas e treliças metálicas em altura superior a 15 metros',
    fatorRisco: 'Queda de trabalhador com diferença de nível',
    tipoRisco: 'Acidente/Mecânico',
    fonteGeradora: 'Trabalho em estruturas elevadas sem apoio fixo contínuo',
    possiveisDanos: 'Politraumatismo grave, traumatismo cranioencefálico, fraturas e óbito',
    probabilidade: 3,
    severidade: 5,
    nivelRisco: 'Crítico',
    medidasExistentes: 'Linha de vida horizontal de aço instalada, uso de cinto paraquedista com talabarte duplo.',
    medidasPropostas: 'Instalação de rede de segurança coletiva inferior tipo ' + 'S' + ' e teste de tração certificado de todos os pontos de ancoragem a cada 6 meses.',
    planoAcao: {
      oque: 'Instalar rede de proteção secundária e auditar linhas de ancoragem com laudo ART.',
      como: 'Contratação de empresa especializada em ancoragem com emissão de ART específica.',
      responsavel: 'Eng. Ricardo Silveira Mello',
      prazo: '2026-10-15',
      status: 'Em Andamento'
    }
  },
  {
    id: 'gro-02',
    setor: 'Caldeiraria Pesada',
    atividade: 'Corte térmico e soldagem contínua de chapas estruturais de aço',
    fatorRisco: 'Inalação de fumos de óxido de ferro e manganês',
    tipoRisco: 'Químico',
    fonteGeradora: 'Fusão de eletrodo e queima de fundente no arco de solda',
    possiveisDanos: 'Siderose pulmonar, febre dos fumos metálicos e alterações respiratórias crônicas',
    probabilidade: 3,
    severidade: 3,
    nivelRisco: 'Moderado',
    medidasExistentes: 'Sistema de exaustão móvel local e respirador PFF2 descartável.',
    medidasPropostas: 'Instalação de coifas captoras articuladas fixas sobre as bancadas de corte e substituição por respiradores de silicone com cartucho.',
    planoAcao: {
      oque: 'Modernização do sistema de ventilação mecânica exaustora local.',
      como: 'Projeto mecânico e instalação de dutos de exaustão com filtro de mangas.',
      responsavel: 'Coordenação de Manutenção Industrial',
      prazo: '2026-11-30',
      status: 'Não Iniciado'
    }
  },
  {
    id: 'gro-03',
    setor: 'Logística e Almoxarifado',
    atividade: 'Transporte e elevação de paletes pesados de até 2.5 toneladas com empilhadeira GLP',
    fatorRisco: 'Colisão com pedestres e tombamento do equipamento em curvas',
    tipoRisco: 'Acidente/Mecânico',
    fonteGeradora: 'Circulação mista de pedestres e veículos em corredores operacionais',
    possiveisDanos: 'Esmagamento de membros inferiores, fraturas e prensamento',
    probabilidade: 2,
    severidade: 4,
    nivelRisco: 'Substancial',
    medidasExistentes: 'Buzina da empilhadeira e sinalização horizontal de piso.',
    medidasPropostas: 'Instalação de sensor de aproximação pedestre com Blue Spot luminoso 360º e barreira física em cruzamentos.',
    planoAcao: {
      oque: 'Instalar sistema visual Blue Spot luminoso e segregação física de pedestres.',
      como: 'Aquisição de kits de sinalização luminosa e colocação de guarda-corpos amarelos.',
      responsavel: 'Fernanda Aparecida Gomes (SESMT)',
      prazo: '2026-09-30',
      status: 'Concluído'
    }
  }
];

export const aprsIniciais: APRRegistro[] = [
  {
    id: 'apr-01',
    numeroApr: 'APR-2026-049',
    atividade: 'Manutenção Preventiva e Pintura de Tubulação em Altura (18 metros) com Sistema de Acesso por Corda',
    local: 'Bloco C - Fachada Leste do Galpão de Processamento',
    dataInicio: '2026-09-22',
    dataValidade: '2026-09-24',
    responsavelTecnico: 'Fernanda Aparecida Gomes - Téc. Segurança',
    empresaExecutante: 'CONSULPREV Manutenções Técnicas / Metrópole',
    permissaoTrabalhoNecessaria: true,
    statusPT: 'Liberada',
    episObrigatorios: [
      'Cinto de Segurança Tipo Paraquedista com Ponto Ventral e Dorsal (CA 39.810)',
      'Capacete de Alpinismo Industrial com Jugular de 3 pontos sem aba (CA 35.100)',
      'Talabarte Duplo em ' + 'Y' + ' com Absorvedor de Energia',
      'Trava-quedas para Corda de 11mm em cabo de segurança independente',
      'Óculos de Proteção ampla visão anti-embaçante',
      'Luvas de Vaqueta / Palma Emborrachada antiderrapante',
      'Calçado de Segurança com bico composite'
    ],
    epcsObrigatorios: [
      'Isolamento e Sinalização de solo com cones e fita zebrada raio de 10 metros',
      'Corda de Trabalho e Corda de Segurança (Linha da Vida) estática certificada EN 1891',
      'Protetores de corda em arestas vivas',
      'Rádio comunicador bidirecional VHF faixa exclusiva'
    ],
    passosAtividade: [
      {
        passo: 1,
        descricao: 'Isolamento de área de solo e conferência de ventos e condições meteorológicas',
        perigos: 'Queda de ferramentas sobre pessoas no solo; rajadas de vento acima de 35 km/h',
        causas: 'Trabalho em nível superior sem tela aparalixo e sem isolamento eficiente',
        consequencias: 'Traumatismo em transeuntes; instabilidade do alpinista',
        medidasControle: 'Isolar 10m de raio com fita e cones. Proibido trabalho com ventos > 30 km/h ou chuva. Amarrar todas as ferramentas a cordins de retenção.'
      },
      {
        passo: 2,
        descricao: 'Montagem dos pontos de ancoragem e descida controlada por cordas (Rapel Industrial)',
        perigos: 'Rompimento de ancoragem; atrito de corda em aresta cortante da calha',
        causas: 'Ancoragem em ponto sem teste estrutural ou falta de protetor de corda',
        consequencias: 'Queda livre do trabalhador de 18 metros; óbito',
        medidasControle: 'Ancoragem dupla redundante (sistema Y) em vigas I de aço homologadas. Uso de calhas de proteção de lona grossa nas arestas. Checagem em duplas (Buddy Check) antes da suspensão.'
      },
      {
        passo: 3,
        descricao: 'Lixamento, aplicação de primer e pintura epóxi da tubulação industrial',
        perigos: 'Inalação de vapores de solvente; respingo ocular de tinta epóxi',
        causas: 'Manipulação de compostos voláteis em suspensão com vento',
        consequencias: 'Tontura, desmaio na corda, queimadura química ocular',
        medidasControle: 'Uso obrigatório de máscara com filtro para vapores orgânicos e óculos vedados. Fracionar tinta em recipientes com alça e fecho rápido.'
      }
    ],
    equipeExecutante: [
      { nome: 'Marcos Antônio da Silva', funcao: 'Alpinista Industrial Nível 1', treinadoNR: true },
      { nome: 'Lucas Henrique Viana', funcao: 'Alpinista Resgatista Nível 2', treinadoNR: true },
      { nome: 'Fernanda Aparecida Gomes', funcao: 'Supervisora de SST em Solo', treinadoNR: true }
    ]
  }
];

export const checklistsIniciais: ChecklistInspecao[] = [
  {
    id: 'chk-01',
    titulo: 'Inspeção Diária de Equipamentos de Proteção Individual para Trabalho em Altura (NR-35)',
    categoria: 'NR-35 Trabalho em Altura',
    local: 'Canteiro Central - Almoxarifado de Altura',
    data: '2026-09-21',
    inspetor: 'Fernanda Aparecida Gomes - SESMT',
    conformidadePercentual: 92,
    statusGeral: 'Aprovado com Ressalvas',
    acoesCorretivas: 'Substituir 1 talabarte duplo que apresentou desgaste superficial na costura do absorvedor de impacto.',
    itens: [
      { id: 'item-1', descricao: 'Cintos de Segurança tipo paraquedista: fitas sem desfiamento, cortes ou queimaduras por sol/química', criterio: 'Inspeção visual e tátil', status: 'Conforme' },
      { id: 'item-2', descricao: 'Fivelas de ajuste e argolas metálicas em D: sem corrosão, trincas ou deformações mecânicas', criterio: 'Teste mecânico de encaixe rápido', status: 'Conforme' },
      { id: 'item-3', descricao: 'Talabartes e absorvedores de energia: sem abertura do pacote do absorvedor e com etiquetas legíveis', criterio: 'Pacote termoencolhível íntegro', status: 'Não Conforme', observacao: 'Talabarte código TB-09 com etiqueta rasgada e fio solto no laço esquerdo. Enviado para descarte.' },
      { id: 'item-4', descricao: 'Trava-quedas para corda: alavanca trava sem folga excessiva e sem mola frouxa', criterio: 'Teste de mordida dinâmica manual', status: 'Conforme' },
      { id: 'item-5', descricao: 'Mosquetões e conectores: trava automática fechando com segurança e sem folga no gatilho', criterio: 'Travamento tripla ação testado', status: 'Conforme' },
      { id: 'item-6', descricao: 'Capacetes com jugular: fixação em 3 pontos firme e carcaça plástica sem trincas', criterio: 'Conferência de validade da carcaça e fivela', status: 'Conforme' }
    ]
  },
  {
    id: 'chk-02',
    titulo: 'Inspeção Mensal de Extintores de Incêndio e Hidrantes (NR-23)',
    categoria: 'NR-23 Combate a Incêndio',
    local: 'Setor de Almoxarifado e Caldeiraria',
    data: '2026-09-15',
    inspetor: 'Rogério Lima de Souza - Brigadista',
    conformidadePercentual: 100,
    statusGeral: 'Aprovado',
    itens: [
      { id: 'item-21', descricao: 'Extintor com acesso 100% desobstruído e sinalização de piso demarcada (1,0m x 1,0m)', criterio: 'Visual sem obstáculos', status: 'Conforme' },
      { id: 'item-22', descricao: 'Manômetro de pressão na faixa verde operável', criterio: 'Ponteiro no arco verde', status: 'Conforme' },
      { id: 'item-23', descricao: 'Lacre de segurança plástico íntegro e pino de trava metálico travado', criterio: 'Lacre sem violação', status: 'Conforme' },
      { id: 'item-24', descricao: 'Mangueira e difusor sem ressecamento, trincas ou entupimentos de bico', criterio: 'Inspeção física', status: 'Conforme' },
      { id: 'item-25', descricao: 'Selo do INMETRO presente com data de recarga e teste hidrostático válidos', criterio: 'Dentro da data de validade', status: 'Conforme' }
    ]
  }
];

export const treinamentosIniciais: TreinamentoNR[] = [
  {
    id: 'trn-01',
    nrCodigo: 'NR-35',
    titulo: 'Capacitação Obrigatória para Trabalho em Altura (Teórico e Prático)',
    tipo: 'Periódico',
    cargaHorariaHoras: 8,
    modalidade: 'Presencial',
    instrutorNome: 'Marcos França',
    instrutorRegistro: 'Instrutor e Especialista de Segurança do Trabalho • Reg. MTE 0048219/SP',
    responsavelTecnico: 'CONSULPREV SST - Consultoria e Treinamentos',
    conteudoProgramatico: [
      'Normas e regulamentos aplicáveis ao trabalho em altura',
      'Análise de Risco (AR) e condições impeditivas',
      'Riscos potenciais inerentes ao trabalho em altura e medidas de prevenção',
      'Sistemas, equipamentos e procedimentos de proteção coletiva',
      'Equipamentos de Proteção Individual para trabalho em altura: seleção, inspeção, conservação e limitação de uso',
      'Acidentes típicos em trabalhos em altura',
      'Condutas em situações de emergência, incluindo noções de técnicas de resgate e primeiros socorros'
    ],
    dataInicio: '2026-08-15',
    dataTermino: '2026-08-15',
    validadeMeses: 24,
    status: 'Concluído',
    participantes: [
      {
        colaboradorId: 'col-01',
        nome: 'Marcos Antônio da Silva',
        cpf: '284.918.238-12',
        funcao: 'Montador de Estruturas Metálicas',
        notaAvaliacao: 9.8,
        aprovado: true,
        numeroCertificado: 'CERT-NR35-2026-00412'
      },
      {
        colaboradorId: 'col-03',
        nome: 'Juliana Beatriz Mendes',
        cpf: '412.873.091-88',
        funcao: 'Eletricista de Manutenção Industrial',
        notaAvaliacao: 9.2,
        aprovado: true,
        numeroCertificado: 'CERT-NR35-2026-00413'
      }
    ]
  },
  {
    id: 'trn-02',
    nrCodigo: 'NR-33',
    titulo: 'Capacitação para Trabalhadores Autorizados e Vigias em Espaços Confinados',
    tipo: 'Inicial',
    cargaHorariaHoras: 16,
    modalidade: 'Presencial',
    instrutorNome: 'Marcos França',
    instrutorRegistro: 'Instrutor e Especialista de Segurança do Trabalho • Reg. MTE 0048219/SP',
    responsavelTecnico: 'CONSULPREV SST - Consultoria e Treinamentos',
    conteudoProgramatico: [
      'Definições de Espaço Confinado conforme NR-33 atualizada',
      'Identificação dos espaços confinados e cadastro',
      'Reconhecimento, avaliação e controle de riscos atmosféricos (O2, LEL, H2S, CO)',
      'Funcionamento de detectores de gases multigás portáteis',
      'Emissão e preenchimento da Permissão de Entrada e Trabalho (PET)',
      'Noções de resgate e primeiros socorros em cenários simulados'
    ],
    dataInicio: '2026-06-20',
    dataTermino: '2026-06-21',
    validadeMeses: 12,
    status: 'Concluído',
    participantes: [
      {
        colaboradorId: 'col-01',
        nome: 'Marcos Antônio da Silva',
        cpf: '284.918.238-12',
        funcao: 'Montador de Estruturas Metálicas',
        notaAvaliacao: 9.5,
        aprovado: true,
        numeroCertificado: 'CERT-NR33-2026-00188'
      }
    ]
  },
  {
    id: 'trn-03',
    nrCodigo: 'NR-10',
    titulo: 'Segurança em Instalações e Serviços em Eletricidade - Módulo Básico',
    tipo: 'Periódico',
    cargaHorariaHoras: 40,
    modalidade: 'Semipresencial',
    instrutorNome: 'Marcos França',
    instrutorRegistro: 'Instrutor e Especialista de Segurança do Trabalho • Reg. MTE 0048219/SP',
    responsavelTecnico: 'CONSULPREV SST',
    conteudoProgramatico: [
      'Introdução à segurança com eletricidade',
      'Riscos em instalações e serviços com eletricidade (choque elétrico, arcos, queimaduras)',
      'Técnicas de análise de risco no setor elétrico',
      'Medidas de controle do risco elétrico: desenergização, aterramento, seccionamento',
      'Equipamentos de proteção coletiva e individual para eletricidade',
      'Rotinas e procedimentos de trabalho - liberação de instalações',
      'Prevenção e combate a incêndios e primeiros socorros'
    ],
    dataInicio: '2026-09-28',
    dataTermino: '2026-10-05',
    validadeMeses: 24,
    status: 'Agendado',
    participantes: [
      {
        colaboradorId: 'col-03',
        nome: 'Juliana Beatriz Mendes',
        cpf: '412.873.091-88',
        funcao: 'Eletricista de Manutenção Industrial',
        notaAvaliacao: 0,
        aprovado: false,
        numeroCertificado: 'AGENDADO'
      }
    ]
  }
];

export const examesControleIniciais: ExameControle[] = [
  {
    id: 'ex-01',
    colaboradorId: 'col-01',
    colaboradorNome: 'Marcos Antônio da Silva',
    cpf: '284.918.238-12',
    cargo: 'Montador de Estruturas Metálicas',
    setor: 'Montagem e Obras Especiais',
    tipoExame: 'Exame Clínico Ocupacional + ECG + Acuidade Visual (NR-35)',
    dataUltimoExame: '2025-10-04',
    dataVencimento: '2026-10-04',
    diasAteVencer: 13,
    status: 'Vencendo (30 dias)',
    clinica: 'CONSULPREV Diagnósticos Ocupacionais',
    resultado: 'Apto'
  },
  {
    id: 'ex-02',
    colaboradorId: 'col-02',
    colaboradorNome: 'Carlos Eduardo Ferreira',
    cpf: '351.492.810-44',
    cargo: 'Soldador TIG / Eletrodo Revestido',
    setor: 'Caldeiraria Pesada',
    tipoExame: 'Espirometria Ocupacional + RX Tórax OIT',
    dataUltimoExame: '2025-08-15',
    dataVencimento: '2026-08-15',
    diasAteVencer: -37,
    status: 'Vencido',
    clinica: 'Laboratório e Centro Médico Vida',
    resultado: 'Pendente'
  },
  {
    id: 'ex-03',
    colaboradorId: 'col-03',
    colaboradorNome: 'Juliana Beatriz Mendes',
    cpf: '412.873.091-88',
    cargo: 'Eletricista de Manutenção Industrial',
    setor: 'Manutenção Elétrica e Subestações',
    tipoExame: 'Exame Clínico + Eletroencefalograma + Eletrocardiograma (NR-10)',
    dataUltimoExame: '2026-05-10',
    dataVencimento: '2027-05-10',
    diasAteVencer: 231,
    status: 'Em Dia',
    clinica: 'CONSULPREV Diagnósticos Ocupacionais',
    resultado: 'Apto'
  },
  {
    id: 'ex-04',
    colaboradorId: 'col-04',
    colaboradorNome: 'Rogério Lima de Souza',
    cpf: '198.324.710-09',
    cargo: 'Operador de Empilhadeira',
    setor: 'Logística e Almoxarifado',
    tipoExame: 'Acuidade Visual + Teste Psicotécnico + Audiometria (NR-11)',
    dataUltimoExame: '2026-07-18',
    dataVencimento: '2027-07-18',
    diasAteVencer: 300,
    status: 'Em Dia',
    clinica: 'CONSULPREV Diagnósticos Ocupacionais',
    resultado: 'Apto'
  },
  {
    id: 'ex-05',
    colaboradorId: 'col-05',
    colaboradorNome: 'Fernanda Aparecida Gomes',
    cpf: '490.182.374-55',
    cargo: 'Técnica de Segurança do Trabalho',
    setor: 'SESMT',
    tipoExame: 'Exame Clínico Periódico Anual',
    dataUltimoExame: '2025-09-25',
    dataVencimento: '2026-09-25',
    diasAteVencer: 4,
    status: 'Vencendo (30 dias)',
    clinica: 'CONSULPREV Diagnósticos Ocupacionais',
    resultado: 'Apto'
  }
];

export const documentosIniciais: DocumentoSST[] = [
  {
    id: 'doc-01',
    tipo: 'PGR',
    codigo: 'PGR-MET-2026-V3',
    titulo: 'Programa de Gerenciamento de Riscos (GRO/PGR - NR-01)',
    empresa: 'CONSTRUTORA E ENGENHARIA METRÓPOLE LTDA',
    dataEmissao: '2026-01-15',
    dataValidade: '2028-01-15',
    responsavelTecnico: 'Eng. Ricardo Silveira Mello - CREA-SP 506.892/D',
    statusVigencia: 'Vigente',
    tamanhoArquivo: '4.8 MB'
  },
  {
    id: 'doc-02',
    tipo: 'PCMSO',
    codigo: 'PCMSO-MET-2026-REV02',
    titulo: 'Programa de Controle Médico de Saúde Ocupacional (NR-07)',
    empresa: 'CONSTRUTORA E ENGENHARIA METRÓPOLE LTDA',
    dataEmissao: '2026-01-10',
    dataValidade: '2027-01-10',
    responsavelTecnico: 'Dr. Roberto Fontes Guimarães - CRM/SP 128.450',
    statusVigencia: 'Vigente',
    tamanhoArquivo: '2.4 MB'
  },
  {
    id: 'doc-03',
    tipo: 'LTCAT',
    codigo: 'LTCAT-MET-2026-004',
    titulo: 'Laudo Técnico das Condições Ambientais de Trabalho (INSS/eSocial S-2240)',
    empresa: 'CONSTRUTORA E ENGENHARIA METRÓPOLE LTDA',
    dataEmissao: '2026-08-10',
    dataValidade: '2027-08-10',
    responsavelTecnico: 'Eng. Ricardo Silveira Mello - CREA-SP 506.892/D',
    statusVigencia: 'Vigente',
    tamanhoArquivo: '6.1 MB'
  },
  {
    id: 'doc-04',
    tipo: 'AET',
    codigo: 'AET-MET-2025-01',
    titulo: 'Análise Ergonômica do Trabalho (NR-17) - Setor Produtivo e Administrativo',
    empresa: 'CONSTRUTORA E ENGENHARIA METRÓPOLE LTDA',
    dataEmissao: '2025-05-18',
    dataValidade: '2027-05-18',
    responsavelTecnico: 'Dra. Vanessa Lima - Fisioterapeuta do Trabalho',
    statusVigencia: 'Vigente',
    tamanhoArquivo: '3.7 MB'
  },
  {
    id: 'doc-05',
    tipo: 'Laudo de Insalubridade',
    codigo: 'LAUDO-INS-2025-09',
    titulo: 'Laudo Pericial de Insalubridade e Periculosidade (NR-15 e NR-16)',
    empresa: 'CONSTRUTORA E ENGENHARIA METRÓPOLE LTDA',
    dataEmissao: '2025-09-01',
    dataValidade: '2026-09-01',
    responsavelTecnico: 'Eng. Carlos Eduardo Braga - CREA 507.123/D',
    statusVigencia: 'Vencido',
    tamanhoArquivo: '5.2 MB'
  }
];

// =============================================================
// DADOS INICIAIS - NR-06: EQUIPAMENTOS DE PROTEÇÃO INDIVIDUAL (EPI)
// =============================================================
export const episIniciais: EPIItem[] = [
  {
    id: 'epi-01',
    nome: 'Cinto de Segurança Tipo Paraquedista c/ Ponto Dorsal e Peitoral (NR-35)',
    categoria: 'Proteção Contra Quedas',
    numeroCA: '36421',
    validadeCA: '2028-05-14',
    fabricante: 'ULTRA SAFE IND. EQUIPAMENTOS',
    modelo: 'Argos Confort Plus Y',
    descricaoTecnica: 'Cinturão de segurança tipo paraquedista confeccionado em fita de poliéster de alta tenacidade, 4 pontos de ancoragem (dorsal, peitoral e posicionamento lateral), acolchoamento respirável lombar e nas pernas.',
    atenuacaoOuProtecao: 'Retenção de quedas e posicionamento em altura até 140 kg',
    estoqueAtual: 24,
    unidade: 'Peça',
    statusCA: 'Válido'
  },
  {
    id: 'epi-02',
    nome: 'Talabarte de Segurança Duplo Tubular c/ Absorvedor de Energia (ABS)',
    categoria: 'Proteção Contra Quedas',
    numeroCA: '39205',
    validadeCA: '2028-08-20',
    fabricante: 'TASK EQUIPAMENTOS LTDA',
    modelo: 'Y-ABS 55mm Alumínio',
    descricaoTecnica: 'Talabarte duplo em fita elástica tubular de poliéster 35mm, com absorvedor de impacto integrado (energia residual máxima 6 kN) e conectores de grande abertura dupla trava 55mm.',
    atenuacaoOuProtecao: 'Absorção de choque em queda livre, fator de queda 1 e 2',
    estoqueAtual: 30,
    unidade: 'Peça',
    statusCA: 'Válido'
  },
  {
    id: 'epi-03',
    nome: 'Capacete de Segurança Classe B c/ Jugular de 3 Pontos (Alpinismo/Eletricidade)',
    categoria: 'Proteção da Cabeça',
    numeroCA: '31469',
    validadeCA: '2027-11-10',
    fabricante: 'PETZL / DELTA PLUS BRASIL',
    modelo: 'Vertex Vent Hi-Viz com jugular DUAL',
    descricaoTecnica: 'Casco em ABS injetado com alta resistência a impactos verticais e laterais, suspensão de fitas têxteis com regulagem por catraca, orifícios de ventilação deslizantes e jugular com fivela de resistência variável (25 a 50 daN).',
    atenuacaoOuProtecao: 'Impactos no topo e laterais, ensaiado até 20.000 volts (Classe B)',
    estoqueAtual: 45,
    unidade: 'Unidade',
    statusCA: 'Válido'
  },
  {
    id: 'epi-04',
    nome: 'Protetor Auditivo Circumaural Tipo Concha (Plug/Arco)',
    categoria: 'Proteção Auditiva',
    numeroCA: '15624',
    validadeCA: '2027-04-18',
    fabricante: '3M DO BRASIL LTDA',
    modelo: 'Peltor X5A Alto Desempenho',
    descricaoTecnica: 'Protetor auricular tipo concha com haste de aço inoxidável com pressão constante, conchas em ABS reforçado e almofadas preenchidas com espuma viscoelástica macia.',
    atenuacaoOuProtecao: 'NRRsf: 29 dB (Atenuação para ruídos industriais severos)',
    estoqueAtual: 38,
    unidade: 'Unidade',
    statusCA: 'Válido'
  },
  {
    id: 'epi-05',
    nome: 'Protetor Auditivo de Inserção Pré-moldado em Copolímero (Plug Flanges)',
    categoria: 'Proteção Auditiva',
    numeroCA: '5674',
    validadeCA: '2029-02-12',
    fabricante: '3M DO BRASIL LTDA',
    modelo: '1110 Copolímero c/ Cordão',
    descricaoTecnica: 'Plug de inserção auricular em silicone atóxico de três flanges cônicas, lavável, reutilizável e com cordão de sustentação em PVC.',
    atenuacaoOuProtecao: 'NRRsf: 16 dB',
    estoqueAtual: 180,
    unidade: 'Par',
    statusCA: 'Válido'
  },
  {
    id: 'epi-06',
    nome: 'Óculos de Segurança Ampla Visão Antirrisco e Antiembaçante',
    categoria: 'Proteção dos Olhos e Face',
    numeroCA: '19822',
    validadeCA: '2027-09-30',
    fabricante: 'KALIPSO EQUIPAMENTOS',
    modelo: 'Leopard Incolor Anti-fog',
    descricaoTecnica: 'Armação em policarbonato leve e flexível, lentes com tratamento UV400, antirrisco e antiembaçante, hastes emborrachadas e apoio nasal ajustável.',
    atenuacaoOuProtecao: 'Proteção contra impactos de partículas volantes e 99.9% radiação UVA/UVB',
    estoqueAtual: 92,
    unidade: 'Unidade',
    statusCA: 'Válido'
  },
  {
    id: 'epi-07',
    nome: 'Respirador Semi-Facial Descartável PFF2 (N95) c/ Válvula de Exalação',
    categoria: 'Proteção Respiratória',
    numeroCA: '38502',
    validadeCA: '2028-03-25',
    fabricante: 'DELTA PLUS BRASIL',
    modelo: 'M1200V PFF2',
    descricaoTecnica: 'Respirador dobrável composto por camadas de não-tecido hipoalergênico e manta sintética de carvão eletrostático, com presilha metálica de ajuste nasal e válvula MaxFlow.',
    atenuacaoOuProtecao: 'Filtração mínima de 94% para poeiras, névoas e fumos metálicos',
    estoqueAtual: 150,
    unidade: 'Unidade',
    statusCA: 'Válido'
  },
  {
    id: 'epi-08',
    nome: 'Luva de Segurança em Couro Vaqueta Macia Asa/Mista',
    categoria: 'Proteção dos Membros Superiores',
    numeroCA: '28513',
    validadeCA: '2027-06-15',
    fabricante: 'PROTENGE EQUIPAMENTOS',
    modelo: 'Vaqueta Total Punho 7cm',
    descricaoTecnica: 'Confeccionada integralmente em vaqueta bovina especial flor de primeira qualidade, costuras reforçadas com fio de nylon para cordoaria, dorso com elástico embutido para perfeito ajuste.',
    atenuacaoOuProtecao: 'Riscos mecânicos: Abrasão (3), Corte por lâmina (1), Rasgamento (4), Perfuração (3)',
    estoqueAtual: 85,
    unidade: 'Par',
    statusCA: 'Válido'
  },
  {
    id: 'epi-09',
    nome: 'Calçado Ocupacional Tipo Botina de Segurança c/ Bico Composite e Solado PU Bidensidade',
    categoria: 'Proteção dos Membros Inferiores',
    numeroCA: '42110',
    validadeCA: '2028-01-19',
    fabricante: 'MARLUVAS CALÇADOS DE SEGURANÇA',
    modelo: 'Premier Plus 75BPR29 Microfibra',
    descricaoTecnica: 'Botina confeccionada em microfibra respirável de alta resistência mecânica, biqueira protetora de polímero composite ultraleve (não conduz eletricidade), solado bidensidade com absorção de impacto.',
    atenuacaoOuProtecao: 'Proteção dos artelhos contra impactos de até 200J e compressão 15kN, solado antiderrapante SRC',
    estoqueAtual: 40,
    unidade: 'Par',
    statusCA: 'Válido'
  }
];

export const fichasEpiIniciais: FichaEntregaEPI[] = [
  {
    id: 'ficha-01',
    colaboradorId: 'col-01',
    colaboradorNome: 'Marcos Antônio da Silva',
    cpf: '284.918.238-12',
    cargo: 'Montador de Estruturas Metálicas (Alpinista Industrial)',
    setor: 'Montagem e Obras Especiais',
    matricula: 'MET-0421',
    dataAdmissao: '2021-03-10',
    termoCienciaAceito: true,
    dataAssinaturaTermo: '2026-01-15',
    entregas: [
      {
        id: 'ent-01',
        epiId: 'epi-01',
        nomeEPI: 'Cinto de Segurança Tipo Paraquedista c/ Ponto Dorsal e Peitoral (NR-35)',
        numeroCA: '36421',
        dataEntrega: '2026-01-15',
        quantidade: 1,
        motivo: 'Fornecimento Inicial',
        assinaturaConfirmada: true,
        observacao: 'Inspecionado antes da entrega conforme NR-35'
      },
      {
        id: 'ent-02',
        epiId: 'epi-02',
        nomeEPI: 'Talabarte de Segurança Duplo Tubular c/ Absorvedor de Energia (ABS)',
        numeroCA: '39205',
        dataEntrega: '2026-01-15',
        quantidade: 1,
        motivo: 'Fornecimento Inicial',
        assinaturaConfirmada: true
      },
      {
        id: 'ent-03',
        epiId: 'epi-03',
        nomeEPI: 'Capacete de Segurança Classe B c/ Jugular de 3 Pontos',
        numeroCA: '31469',
        dataEntrega: '2026-01-15',
        quantidade: 1,
        motivo: 'Fornecimento Inicial',
        assinaturaConfirmada: true
      },
      {
        id: 'ent-04',
        epiId: 'epi-04',
        nomeEPI: 'Protetor Auditivo Circumaural Tipo Concha (NRRsf 29 dB)',
        numeroCA: '15624',
        dataEntrega: '2026-01-15',
        quantidade: 1,
        motivo: 'Fornecimento Inicial',
        assinaturaConfirmada: true
      },
      {
        id: 'ent-05',
        epiId: 'epi-08',
        nomeEPI: 'Luva de Segurança em Couro Vaqueta Macia',
        numeroCA: '28513',
        dataEntrega: '2026-07-10',
        quantidade: 2,
        motivo: 'Substituição por Desgaste',
        assinaturaConfirmada: true,
        observacao: 'Troca de par gasto por novo'
      }
    ]
  },
  {
    id: 'ficha-02',
    colaboradorId: 'col-02',
    colaboradorNome: 'Carlos Eduardo Ferreira',
    cpf: '351.492.810-44',
    cargo: 'Soldador Especialista TIG/MIG',
    setor: 'Caldeiraria Pesada e Tubulações',
    matricula: 'MET-0388',
    dataAdmissao: '2020-08-15',
    termoCienciaAceito: true,
    dataAssinaturaTermo: '2026-02-01',
    entregas: [
      {
        id: 'ent-06',
        epiId: 'epi-07',
        nomeEPI: 'Respirador Semi-Facial Descartável PFF2 c/ Válvula',
        numeroCA: '38502',
        dataEntrega: '2026-08-01',
        quantidade: 5,
        motivo: 'Periódico',
        assinaturaConfirmada: true,
        observacao: 'Uso obrigatório em operações com fumos metálicos de manganês e cromo'
      },
      {
        id: 'ent-07',
        epiId: 'epi-06',
        nomeEPI: 'Óculos de Segurança Ampla Visão Antirrisco e Antiembaçante',
        numeroCA: '19822',
        dataEntrega: '2026-02-01',
        quantidade: 1,
        motivo: 'Fornecimento Inicial',
        assinaturaConfirmada: true
      },
      {
        id: 'ent-08',
        epiId: 'epi-04',
        nomeEPI: 'Protetor Auditivo Circumaural Tipo Concha',
        numeroCA: '15624',
        dataEntrega: '2026-02-01',
        quantidade: 1,
        motivo: 'Fornecimento Inicial',
        assinaturaConfirmada: true
      }
    ]
  }
];

// =============================================================
// DADOS INICIAIS - DDS: DIÁLOGO DIÁRIO DE SEGURANÇA
// =============================================================
export const temasDdsIniciais: DDSTema[] = [
  {
    id: 'dds-tema-01',
    titulo: 'Uso, Guarda e Conservação dos EPIs (NR-06)',
    nrVinculada: 'NR-06',
    categoria: 'Normas Regulamentadoras',
    resumo: 'A importância da inspeção prévia de cada EPI antes de iniciar a jornada e as responsabilidades legais do trabalhador e da empresa.',
    conteudoTextual: 'Os Equipamentos de Proteção Individual (EPIs) são a última barreira de proteção física entre o colaborador e os perigos do ambiente operacional. A NR-06 estabelece que todo empregado deve inspecionar seu EPI antes do uso (verificando fissuras no capacete, rasgos na fita do cinto de segurança, saturação do filtro respiratório ou furos nas luvas). Caso identifique qualquer defeito ou anomalia, o trabalhador deve paralisar o trabalho e solicitar substituição imediata ao SESMT ou encarregado. O EPI não pode sofrer alterações ou adaptações não autorizadas pelo fabricante.',
    pontosChave: [
      'Verificar o estado físico do EPI antes de colocar.',
      'Higienizar e guardar em local seco, arejado e limpo ao final do dia.',
      'Nunca utilizar EPI danificado, vencido ou com C.A. ilegível.',
      'O uso é obrigatório e assegura a vida do profissional.'
    ],
    perguntasInterativas: [
      'Alguém identificou desgaste ou fissura no seu EPI no dia de ontem?',
      'Onde e como você armazena o seu cinto paraquedista e respirador ao terminar o turno?'
    ],
    tempoEstimadoMin: 12
  },
  {
    id: 'dds-tema-02',
    titulo: 'Trabalho em Altura: Inspeção Prévia e Dupla Ancoragem (NR-35)',
    nrVinculada: 'NR-35',
    categoria: 'Procedimentos Operacionais',
    resumo: 'Procedimentos obrigatórios de segurança para atividades acima de 2 metros: pontos de ancoragem homologados e uso do talabarte duplo.',
    conteudoTextual: 'Quedas em altura continuam sendo uma das causas mais graves de acidentes no setor industrial e na construção. Na NR-35, a regra de ouro é: durante qualquer movimentação em altura, o trabalhador deve manter pelo menos UM conector do talabarte Y permanentemente ancorado em ponto estrutural calculado ou linha de vida certificada. Antes de subir, certifique-se de preencher e validar a Análise Preliminar de Risco (APR) e a Permissão de Trabalho (PT). Ferramentas manuais devem obrigatoriamente estar presas por fiéis anti-queda.',
    pontosChave: [
      '100% do tempo conectado em ponto de ancoragem seguro.',
      'Inspeção tátil e visual de todas as costuras e fivelas do cinto.',
      'Isolamento e sinalização da área térrea contra queda de ferramentas.',
      'Aptidão médica em dia no ASO com autorização formal para NR-35.'
    ],
    perguntasInterativas: [
      'Todos os seus equipamentos de retenção de queda foram checados hoje?',
      'Qual o procedimento a adotar caso o ponto de ancoragem pareça duvidoso?'
    ],
    tempoEstimadoMin: 15
  },
  {
    id: 'dds-tema-03',
    titulo: 'Percepção de Riscos e o Direito de Recusa (NR-01)',
    nrVinculada: 'NR-01',
    categoria: 'Comportamento Seguro',
    resumo: 'Como exercer com responsabilidade o Direito de Recusa ao constatar risco grave e iminente à integridade física.',
    conteudoTextual: 'O Gerenciamento de Riscos Ocupacionais (GRO) da NR-01 coloca a prevenção e a comunicação transparente como pilares centrais. A legislação brasileira garante expressamente ao trabalhador o "Direito de Recusa": caso seja identificada uma situação de trabalho com risco grave e iminente à sua vida ou à de seus companheiros (como falta de aterramento elétrico, ausência de linha de vida ou atmosfera perigosa), a atividade deve ser interrompida imediatamente e comunicada ao superior imediato sem nenhuma represália.',
    pontosChave: [
      'Pausa preventiva: na dúvida sobre a segurança, não execute.',
      'Comunicação transparente entre equipe, encarregado e SESMT.',
      'A segurança da vida humana sempre precede prazos de produção.',
      'Relatar quase-acidentes antes que se transformem em acidentes.'
    ],
    perguntasInterativas: [
      'Você já precisou exercer uma pausa preventiva por falta de condição segura?',
      'Como podemos melhorar a percepção de perigos nos pontos cegos da nossa área?'
    ],
    tempoEstimadoMin: 10
  },
  {
    id: 'dds-tema-04',
    titulo: 'Segurança em Instalações Elétricas e Bloqueio LOTO (NR-10)',
    nrVinculada: 'NR-10',
    categoria: 'Procedimentos Operacionais',
    resumo: 'Bloqueio, etiquetagem e teste de ausência de tensão antes de qualquer intervenção em circuitos e quadros elétricos.',
    conteudoTextual: 'O choque elétrico e o arco elétrico podem ser fatais em frações de segundo. A NR-10 exige desenergização completa antes de qualquer trabalho em instalações elétricas: 1. Seccionamento; 2. Bloqueio mecânico com cadeado (LOTO); 3. Constatação da ausência de tensão com multímetro calibrado; 4. Instalação de aterramento temporário; 5. Proteção dos elementos energizados vizinhos; 6. Sinalização de impedimento de energização.',
    pontosChave: [
      'Nunca confie apenas no disjuntor desligado: teste a ausência de tensão.',
      'Cada trabalhador deve colocar seu próprio cadeado de bloqueio individual.',
      'Uso de vestimentas antichama (classe de arco elétrico correspondente).',
      'Apenas profissionais formalmente autorizados podem intervir em elétrica.'
    ],
    perguntasInterativas: [
      'O teste de ausência de tensão foi executado com equipamento calibrado?',
      'Quem detém a chave do cadeado do bloqueio LOTO durante a sua tarefa?'
    ],
    tempoEstimadoMin: 12
  },
  {
    id: 'dds-tema-05',
    titulo: 'Ergonomia no Trabalho: Levantamento e Transporte Manual de Cargas (NR-17)',
    nrVinculada: 'NR-17',
    categoria: 'Saúde & Ergonomia',
    resumo: 'Técnicas posturais corretas para evitar lombalgias, lesões na coluna e distúrbios osteomusculares.',
    conteudoTextual: 'O levantamento manual de peso de forma inadequada é uma das principais causas de afastamentos por lombalgia e hérnias de disco. Nunca dobre a coluna ao pegar um peso no chão: aproxime-se da carga, flexione os joelhos mantendo as costas retas e use a força das pernas para erguer o objeto. Mantenha o volume o mais próximo possível do tronco. Para cargas superiores a 25 kg, é obrigatório o auxílio mecânico ou o trabalho em dupla.',
    pontosChave: [
      'Flexionar os joelhos e manter a coluna ereta ao erguer qualquer peso.',
      'Manter a carga colada ao corpo durante todo o trajeto.',
      'Nunca girar o tronco com peso nos braços: mova primeiro os pés.',
      'Pedir ajuda imediata para peças volumosas ou com peso excessivo.'
    ],
    perguntasInterativas: [
      'Quantas vezes você costuma dobrar as costas em vez dos joelhos no seu turno?',
      'Podemos utilizar carrinhos ou talhas para essa movimentação específica?'
    ],
    tempoEstimadoMin: 10
  },
  {
    id: 'dds-tema-06',
    titulo: 'Ordem, Limpeza e Arrumação no Canteiro de Obras (5S / NR-18)',
    nrVinculada: 'NR-18',
    categoria: 'Comportamento Seguro',
    resumo: 'Eliminação de tropeços, quedas de mesmo nível, pontas de vergalhão desprotegidas e passagens desobstruídas.',
    conteudoTextual: 'Um ambiente limpo e organizado é naturalmente um ambiente mais seguro e produtivo. Mais de 30% dos acidentes de trabalho com lesões leves e moderadas decorrem de tropeços em cabos jogados pelo chão, pisar em pregos/pontas de vergalhões expostos ou materiais empilhados de maneira precária. A regra básica é: usou, guardou; sujou, limpou; desobstrua sempre rotas de fuga, hidrantes e extintores de incêndio.',
    pontosChave: [
      'Manter corredores, escadas e rotas de emergência 100% desobstruídos.',
      'Proteger pontas de vergalhão e pontas cortantes com protetores tipo cogumelo.',
      'Recolher sobras de corte e cabos elétricos imediatamente após a operação.',
      'Descarte correto de resíduos químicos e panos embebidos em óleo.'
    ],
    perguntasInterativas: [
      'Existe algum cabo cruzando o piso na nossa área que possa causar tropeço?',
      'O extintor mais próximo da sua bancada está desobstruído?'
    ],
    tempoEstimadoMin: 10
  }
];

export const ddsRegistrosIniciais: DDSRegistro[] = [
  {
    id: 'dds-reg-01',
    numeroAta: 'DDS-2026-089',
    data: '2026-09-21',
    horario: '07:30',
    setor: 'Montagem e Obras Especiais (Frente Torre Industrial)',
    temaId: 'dds-tema-02',
    tituloTema: 'Trabalho em Altura: Inspeção Prévia e Dupla Ancoragem (NR-35)',
    nrVinculada: 'NR-35',
    facilitadorNome: 'Ricardo Silveira Mello',
    facilitadorCargo: 'Engenheiro de Segurança do Trabalho',
    resumoDiscussao: 'Realizada checagem completa dos cintos tipo paraquedista e talabartes tubulares Y da equipe antes do início da montagem dos perfis da passarela a 18m de altura. Reforçada a necessidade de manter a área inferior totalmente isolada com fita zebrada e cones de sinalização. Nenhum cinto apresentou deformação ou costura desfiada.',
    observacoesEquipe: 'Marcos solicitou reposição de um mosquetão reserva com dupla trava automática. Atendido de imediato pelo almoxarifado.',
    status: 'Realizado',
    participantes: [
      {
        colaboradorId: 'col-01',
        nome: 'Marcos Antônio da Silva',
        cpf: '284.918.238-12',
        cargo: 'Montador de Estruturas Metálicas (Alpinista Industrial)',
        presente: true,
        rubricaAssinada: true
      },
      {
        colaboradorId: 'col-03',
        nome: 'Antônio José dos Santos',
        cpf: '189.340.582-71',
        cargo: 'Eletricista de Manutenção Industrial',
        presente: true,
        rubricaAssinada: true
      },
      {
        colaboradorId: 'col-05',
        nome: 'Lucas Gabriel Moreira',
        cpf: '402.819.330-99',
        cargo: 'Auxiliar de Montagem Estrutural',
        presente: true,
        rubricaAssinada: true
      }
    ]
  },
  {
    id: 'dds-reg-02',
    numeroAta: 'DDS-2026-088',
    data: '2026-09-20',
    horario: '07:30',
    setor: 'Caldeiraria Pesada e Tubulações',
    temaId: 'dds-tema-01',
    tituloTema: 'Uso, Guarda e Conservação dos EPIs (NR-06)',
    nrVinculada: 'NR-06',
    facilitadorNome: 'Danielle Freitas',
    facilitadorCargo: 'Técnica em Segurança do Trabalho - MTE/SP 042.810',
    resumoDiscussao: 'Revisados todos os respiradores PFF2 e óculos de proteção da equipe de soldagem e caldeiraria. Destacada a importância do teste de vedação das máscaras e da proibição de reutilização de PFF2 saturada por particulados.',
    observacoesEquipe: 'Equipe recebeu novo lote de protetores auriculares tipo concha com haste de aço.',
    status: 'Realizado',
    participantes: [
      {
        colaboradorId: 'col-02',
        nome: 'Carlos Eduardo Ferreira',
        cpf: '351.492.810-44',
        cargo: 'Soldador Especialista TIG/MIG',
        presente: true,
        rubricaAssinada: true
      },
      {
        colaboradorId: 'col-04',
        nome: 'Rodrigo Lima Barreto',
        cpf: '274.601.993-02',
        cargo: 'Operador de Ponte Rolante e Içamento',
        presente: true,
        rubricaAssinada: true
      }
    ]
  }
];

// =============================================================
// DADOS INICIAIS - INSPEÇÃO DE EXTINTORES (NR-23 / NBR 12962)
// =============================================================
export const extintoresIniciais: ExtintorItem[] = [
  {
    id: 'ext-01',
    codigoIdentificacao: 'EXT-01',
    localizacaoSetor: 'Almoxarifado Central - Próximo à Porta Principal',
    tipoCarga: 'Pó Químico Seco (PQS) ABC',
    capacidade: '4 kg',
    fabricante: 'Kidde Brasil',
    numeroCilindro: 'CIL-984120',
    numeroSeloInmetro: 'INM-00847291',
    dataUltimaInspecao: '2026-09-15',
    dataProximaRecarga: '2027-04-10',
    dataTesteHidrostatico: '2029-04-10',
    manometroPressurizado: true,
    lacreEPinoIntactos: true,
    anelIdentificacaoCorreto: true,
    mangueiraBicoDesobstruidos: true,
    suporteEAlturaConforme: true,
    sinalizacaoEDesobstrucaoLivre: true,
    cilindroSemDanosOuOxidacao: true,
    status: 'Aprovado',
    inspetorResponsavel: 'Danielle Freitas - TST Reg. MTE 042.810',
    observacoes: 'Extintor em perfeitas condições operacionais. Área de piso 1x1m livre e demarcada com tinta amarela e vermelha.'
  },
  {
    id: 'ext-02',
    codigoIdentificacao: 'EXT-02',
    localizacaoSetor: 'Oficina de Solda e Caldeiraria - Parede Leste Coluna 4',
    tipoCarga: 'Pó Químico Seco (PQS) ABC',
    capacidade: '6 kg',
    fabricante: 'Mocelin',
    numeroCilindro: 'CIL-772910',
    numeroSeloInmetro: 'INM-00918233',
    dataUltimaInspecao: '2026-09-15',
    dataProximaRecarga: '2026-10-05',
    dataTesteHidrostatico: '2028-10-05',
    manometroPressurizado: true,
    lacreEPinoIntactos: true,
    anelIdentificacaoCorreto: true,
    mangueiraBicoDesobstruidos: true,
    suporteEAlturaConforme: true,
    sinalizacaoEDesobstrucaoLivre: false,
    cilindroSemDanosOuOxidacao: true,
    status: 'Requer Recarga / Manutenção',
    inspetorResponsavel: 'Danielle Freitas - TST Reg. MTE 042.810',
    observacoes: 'Atenção: Vencimento da recarga anual nos próximos 20 dias. Retirada de tambor de óleo que estava obstruindo o acesso imediato.'
  },
  {
    id: 'ext-03',
    codigoIdentificacao: 'EXT-03',
    localizacaoSetor: 'Subestação Elétrica 13.8kV e Sala de Painéis CCM',
    tipoCarga: 'Gás Carbônico (CO2)',
    capacidade: '6 kg',
    fabricante: 'Bucka Spiero',
    numeroCilindro: 'CIL-441029',
    numeroSeloInmetro: 'INM-00762190',
    dataUltimaInspecao: '2026-09-15',
    dataProximaRecarga: '2027-02-18',
    dataTesteHidrostatico: '2027-02-18',
    manometroPressurizado: true,
    lacreEPinoIntactos: true,
    anelIdentificacaoCorreto: true,
    mangueiraBicoDesobstruidos: true,
    suporteEAlturaConforme: true,
    sinalizacaoEDesobstrucaoLivre: true,
    cilindroSemDanosOuOxidacao: true,
    status: 'Aprovado',
    inspetorResponsavel: 'Danielle Freitas - TST Reg. MTE 042.810',
    observacoes: 'Extintor CO2 específico para equipamentos elétricos energizados (Classe C). Pesagem realizada em conformidade com NBR 12962.'
  },
  {
    id: 'ext-04',
    codigoIdentificacao: 'EXT-04',
    localizacaoSetor: 'Canteiro Bloco B - 2º Pavimento Estrutural',
    tipoCarga: 'Água Pressurizada (AP)',
    capacidade: '10 L',
    fabricante: 'Resil Extintores',
    numeroCilindro: 'CIL-118492',
    numeroSeloInmetro: 'INM-00654120',
    dataUltimaInspecao: '2026-09-15',
    dataProximaRecarga: '2026-08-30',
    dataTesteHidrostatico: '2026-08-30',
    manometroPressurizado: false,
    lacreEPinoIntactos: false,
    anelIdentificacaoCorreto: false,
    mangueiraBicoDesobstruidos: false,
    suporteEAlturaConforme: true,
    sinalizacaoEDesobstrucaoLivre: true,
    cilindroSemDanosOuOxidacao: true,
    status: 'Interditado / Condenado',
    inspetorResponsavel: 'Danielle Freitas - TST Reg. MTE 042.810',
    observacoes: 'Manômetro com ponteiro na faixa vermelha (despressurizado), lacre rompido e recarga vencida em 30/08/2026. Extintor retirado de operação para envio urgente à oficina credenciada Inmetro.'
  },
  {
    id: 'ext-05',
    codigoIdentificacao: 'EXT-05',
    localizacaoSetor: 'Área Externa - Frente ao Tanque de Óleo Diesel',
    tipoCarga: 'Pó Químico Seco (PQS) ABC',
    capacidade: '12 kg',
    fabricante: 'Kidde Brasil',
    numeroCilindro: 'CIL-665910',
    numeroSeloInmetro: 'INM-00812934',
    dataUltimaInspecao: '2026-09-15',
    dataProximaRecarga: '2027-06-20',
    dataTesteHidrostatico: '2030-06-20',
    manometroPressurizado: true,
    lacreEPinoIntactos: true,
    anelIdentificacaoCorreto: true,
    mangueiraBicoDesobstruidos: true,
    suporteEAlturaConforme: true,
    sinalizacaoEDesobstrucaoLivre: true,
    cilindroSemDanosOuOxidacao: true,
    status: 'Aprovado',
    inspetorResponsavel: 'Danielle Freitas - TST Reg. MTE 042.810',
    observacoes: 'Alojado em abrigo metálico com visor de vidro temperado e pintura epóxi vermelha padrão bombeiros.'
  }
];



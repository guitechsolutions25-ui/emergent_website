export const conversations = [
  {
    id: "marina",
    name: "Marina Costa",
    phone: "+55 11 98765-4321",
    status: "luna",
    time: "09:12",
    tag: "VIP",
    summary:
      "A cliente solicitou um agendamento para sexta-feira de manhã. Luna consultou a agenda, ofereceu três horários disponíveis e confirmou a consulta às 09:00 com Dra. Helena. Um lembrete automático será enviado um dia antes.",
    started: "25/07/2026",
    lastActive: "hoje, 09:14",
    messages: [
      { from: "customer", text: "Oi! Quero marcar uma consulta para sexta de manhã, se tiver horário.", time: "09:12" },
      { from: "luna", text: "Olá, Marina! Claro — consultei a agenda de sexta-feira e estes horários estão livres:", time: "09:12", buttons: ["08:30", "09:00", "10:30"] },
      { from: "customer", text: "09:00", time: "09:13" },
      { from: "luna", text: "Consulta confirmada ✓ Sexta-feira, 25/07 às 09:00 com Dra. Helena. Vou te enviar um lembrete automático um dia antes. Posso ajudar com mais alguma coisa?", time: "09:13" },
      { from: "customer", text: "Não, era isso. Obrigada!", time: "09:14" },
    ],
  },
  {
    id: "joao",
    name: "João Pedro",
    phone: "+55 11 97654-3210",
    status: "escalated",
    time: "14:03",
    tag: "Contrato",
    summary:
      "O cliente iniciou um reagendamento, mas mudou para assunto comercial. Luna escalonou a conversa com o contexto completo. O atendente Rafael assumiu às 14:03 e segue negociando a renovação do contrato.",
    started: "22/07/2026",
    lastActive: "hoje, 14:03",
    messages: [
      { from: "customer", text: "Gostaria de remarcar meu horário para amanhã", time: "13:58" },
      { from: "luna", text: "Claro! Consultei a agenda — amanhã temos 14:00 e 16:30 disponíveis. Qual prefere?", time: "13:58", buttons: ["14:00", "16:30"] },
      { from: "customer", text: "Na verdade, antes disso preciso falar sobre o contrato", time: "14:01" },
      { from: "system", text: "Luna escalonou a conversa · regra: assunto comercial", time: "14:02" },
      { from: "agent", agentName: "Rafael", text: "Oi João, aqui é o Rafael. A Luna me passou todo o contexto — vamos revisar seu contrato agora.", time: "14:03" },
    ],
  },
  {
    id: "ana",
    name: "Ana Beatriz",
    phone: "+55 21 96543-2109",
    status: "closed",
    time: "18:40",
    tag: "Campanha",
    summary:
      "Cliente respondeu à campanha Inverno 2026 e solicitou o catálogo. Luna enviou o PDF automaticamente e encerrou a conversa com satisfação da cliente.",
    started: "24/07/2026",
    lastActive: "ontem, 18:42",
    messages: [
      { from: "luna", text: "Olá, Ana! A promoção de inverno começou: 20% de desconto em toda a linha até domingo. Quer receber o catálogo completo?", time: "18:36", campaign: "Campanha · Inverno 2026" },
      { from: "customer", text: "Quero sim!", time: "18:39" },
      { from: "luna", text: "Aqui está o catálogo completo:", time: "18:40", file: "catalogo-inverno-2026.pdf" },
      { from: "luna", text: "Qualquer dúvida é só chamar. Posso ajudar com mais alguma coisa?", time: "18:40" },
      { from: "customer", text: "Não, obrigada", time: "18:42" },
    ],
  },
  {
    id: "carlos",
    name: "Carlos Menezes",
    phone: "+55 31 95432-1098",
    status: "luna",
    time: "11:22",
    tag: "Novo",
    summary:
      "Novo cliente perguntando sobre horários de funcionamento. Luna respondeu com base no conhecimento da empresa e coletou o opt-in para comunicações futuras.",
    started: "12/07/2026",
    lastActive: "12/07, 11:24",
    messages: [
      { from: "customer", text: "Bom dia! Vocês atendem aos sábados?", time: "11:22" },
      { from: "luna", text: "Bom dia, Carlos! Atendemos aos sábados das 9h às 13h, e de segunda a sexta das 9h às 18h.", time: "11:22" },
      { from: "luna", text: "Posso te avisar sobre novidades e horários especiais? Você pode sair quando quiser.", time: "11:23", buttons: ["Sim, quero", "Não, obrigado"] },
      { from: "customer", text: "Sim, quero", time: "11:24" },
    ],
  },
];

export const statusMeta = {
  luna: { label: "Luna atendendo", cls: "text-teal", dot: "bg-teal animate-pulse-dot" },
  escalated: { label: "Com atendente", cls: "text-amber-400", dot: "bg-amber-400" },
  closed: { label: "Encerrada", cls: "text-zinc-500", dot: "bg-zinc-600" },
};

export const templates = [
  { id: "t1", label: "Promoção de Inverno", category: "Marketing", header: "Imagem", status: "Aprovado", body: "Olá {{1}}! A promoção de inverno começou: 20% de desconto em toda a linha até domingo. Quer receber o catálogo completo?" },
  { id: "t2", label: "Lembrete de Consulta", category: "Utilidade", header: "Nenhum", status: "Aprovado", body: "Olá {{1}}! Lembrete: sua consulta está marcada para {{2}} às {{3}}. Responda CONFIRMAR ou REMARCAR." },
  { id: "t3", label: "Pesquisa de Satisfação", category: "Utilidade", header: "Nenhum", status: "Em análise", body: "Oi {{1}}! De 0 a 10, como foi sua experiência com nosso atendimento? Sua opinião ajuda a melhorar a Luna." },
];

export const audiences = [
  { id: "a1", name: "Todos com opt-in", count: 1284 },
  { id: "a2", name: "Clientes VIP", count: 128 },
  { id: "a3", name: "Inativos há 30 dias", count: 342 },
  { id: "a4", name: "Novos leads", count: 96 },
];

export const campaigns = [
  { id: "c1", name: "Inverno 2026 — Base VIP", template: "Promoção de Inverno", audience: "Clientes VIP", status: "Enviada", sent: 128, delivered: 121, read: 94 },
  { id: "c2", name: "Reengajamento 30 dias", template: "Pesquisa de Satisfação", audience: "Inativos há 30 dias", status: "Agendada", when: "28/07 às 09:00" },
  { id: "c3", name: "Lançamento nova coleção", template: "Promoção de Inverno", audience: "Todos com opt-in", status: "Rascunho" },
];

export const clients = [
  { id: "cl1", name: "Marina Costa", phone: "+55 11 98765-4321", optin: true, last: "hoje, 09:14", conversations: 14, appointments: 3, tags: ["VIP", "Recorrente"], since: "jan/2026" },
  { id: "cl2", name: "João Pedro", phone: "+55 11 97654-3210", optin: true, last: "hoje, 14:03", conversations: 6, appointments: 1, tags: ["Contrato"], since: "mar/2026" },
  { id: "cl3", name: "Ana Beatriz", phone: "+55 21 96543-2109", optin: true, last: "ontem, 18:42", conversations: 9, appointments: 0, tags: ["Campanha"], since: "fev/2026" },
  { id: "cl4", name: "Carlos Menezes", phone: "+55 31 95432-1098", optin: false, last: "12/07, 11:24", conversations: 2, appointments: 0, tags: ["Novo"], since: "jun/2026" },
  { id: "cl5", name: "Fernanda Lins", phone: "+55 41 94321-0987", optin: true, last: "24/07, 16:05", conversations: 21, appointments: 7, tags: ["VIP"], since: "nov/2025" },
];

export const metrics = [
  { label: "Total de conversas", value: 1247, sub: "+18% vs. mês anterior" },
  { label: "Conversas ativas", value: 23, sub: "neste momento" },
  { label: "Resolução pela Luna", value: 78, suffix: "%", sub: "973 resolvidas automaticamente" },
  { label: "Taxa de escalonamento", value: 22, suffix: "%", sub: "274 com atendente humano" },
  { label: "Novos clientes", value: 96, sub: "últimos 30 dias" },
  { label: "Clientes recorrentes", value: 412, sub: "retornaram no período" },
];

export const peakHours = [2, 1, 0, 0, 1, 2, 4, 8, 14, 22, 31, 38, 35, 29, 33, 41, 47, 39, 28, 19, 12, 8, 5, 3];

export const engagement = {
  days: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
  week: [42, 58, 51, 66, 74, 61, 33],
};

export const topics = [
  { label: "Agendamentos", value: 34 },
  { label: "Dúvidas sobre produtos", value: 26 },
  { label: "Preços e condições", value: 18 },
  { label: "Reagendamentos", value: 12 },
  { label: "Outros assuntos", value: 10 },
];

export const integrations = [
  { id: "wa", name: "WhatsApp Business Cloud API", desc: "Canal oficial de mensagens", status: "Conectado", detail: "Número +55 11 4002-8922 · qualidade de envio alta" },
  { id: "gcal", name: "Google Calendar", desc: "Agenda e disponibilidade", status: "Conectado", detail: "Sincronizado há 2 minutos · 3 agendas vinculadas" },
  { id: "gdrive", name: "Google Drive", desc: "Base de conhecimento", status: "Sincronizando", detail: "68% · 142 documentos indexados" },
  { id: "site", name: "Website", desc: "Conteúdo rastreado para a base", status: "Não conectado", detail: "Informe a URL para indexar as páginas" },
];

export const flowKindMeta = {
  "Mensagem": { color: "#38BDF8", desc: "Envia um texto fixo ao cliente." },
  "Menu Numerado": { color: "#22D3EE", desc: "Apresenta opções numeradas e ramifica a conversa conforme a resposta." },
  "Botões": { color: "#4ADE80", desc: "Até 3 botões de resposta rápida do WhatsApp." },
  "IA / RAG": { color: "#A78BFA", desc: "Busca na base de conhecimento e responde com IA fundamentada." },
  "Agendamento": { color: "#00D9A5", desc: "Consulta a agenda, oferece horários e confirma o compromisso." },
  "Reagendar": { color: "#2DD4BF", desc: "Move um compromisso existente para novo horário." },
  "Cancelar Agendamento": { color: "#FBBF24", desc: "Cancela aplicando as políticas configuradas." },
  "Escalonar": { color: "#FB923C", desc: "Transfere para um atendente humano com todo o contexto." },
  "Encerrar": { color: "#F87171", desc: "Finaliza a conversa e registra o desfecho." },
  "Coletar Opt-in": { color: "#818CF8", desc: "Solicita consentimento para comunicações de marketing." },
  "Coletar Nome": { color: "#EAB308", desc: "Pergunta e salva o nome do cliente no CRM." },
  "Enviar Mídia": { color: "#34D399", desc: "Envia imagem, vídeo ou documento na conversa." },
};

export const flowNodes = [
  { id: "start", kind: "Mensagem", label: "Boas-vindas", hint: "Olá! Sou a Luna, assistente da Kromera. Como posso ajudar?", x: 0, y: 0 },
  { id: "menu", kind: "Menu Numerado", label: "Escolha uma das opções", hint: "1. Agendamento  2. Dúvidas  3. Horários  4. Representante", x: 0, y: 160 },
  { id: "ai", kind: "IA / RAG", label: "Busca no conhecimento", hint: "Responde com base nos documentos da empresa", x: -300, y: 340 },
  { id: "hours", kind: "Mensagem", label: "Horário de funcionamento", hint: "Seg a sex, 9h às 18h · Sáb, 9h às 13h", x: 0, y: 350 },
  { id: "schedule", kind: "Agendamento", label: "Agendar horário", hint: "Consulta disponibilidade e confirma", x: 300, y: 340 },
  { id: "escalate", kind: "Escalonar", label: "Falar com representante", hint: "Transfere com o contexto completo", x: -300, y: 520 },
  { id: "confirm", kind: "Mensagem", label: "Confirmação", hint: "Agendamento confirmado ✓ Lembrete agendado", x: 300, y: 520 },
  { id: "end", kind: "Encerrar", label: "Encerrar conversa", hint: "Posso ajudar com mais alguma coisa?", x: 0, y: 690 },
];

export const flowEdges = [
  { id: "e1", source: "start", target: "menu" },
  { id: "e2", source: "menu", target: "ai", label: "Dúvidas" },
  { id: "e3", source: "menu", target: "hours", label: "Horários" },
  { id: "e4", source: "menu", target: "schedule", label: "Agendamento" },
  { id: "e5", source: "menu", target: "escalate", label: "Representante" },
  { id: "e6", source: "schedule", target: "confirm" },
  { id: "e7", source: "confirm", target: "end" },
  { id: "e8", source: "ai", target: "end" },
  { id: "e9", source: "hours", target: "end" },
];

export const capabilities = [
  { title: "Responde clientes 24/7", desc: "Atendimento imediato a qualquer hora — fins de semana e feriados inclusos. Sem fila, sem espera, sem mensagem ignorada." },
  { title: "Entende a base de conhecimento", desc: "Respostas fundamentadas nos documentos, no site e nos arquivos da sua empresa via RAG — não em achismo." },
  { title: "Agenda, remarca e cancela", desc: "Consulta a agenda real, aplica regras de disponibilidade e horário comercial, e confirma tudo sozinha." },
  { title: "Entende áudio, imagem e documentos", desc: "Transcreve áudios com Whisper, interpreta imagens com visão computacional e lê PDFs enviados pelo cliente." },
  { title: "Escala para humanos", desc: "Quando o assunto pede gente, transfere para a equipe com resumo e contexto completo da conversa." },
  { title: "Envia arquivos e mídia", desc: "Catálogos, PDFs, vídeos e imagens entregues diretamente na conversa, no momento certo." },
  { title: "Executa campanhas", desc: "Templates oficiais da Meta, gestão de opt-in, envio em massa e campanhas agendadas com log de entrega." },
  { title: "Mantém histórico do cliente", desc: "Conversas, agendamentos, notas internas e atividade em um perfil único — o cliente 360." },
  { title: "Analisa conversas", desc: "Métricas de atendimento, tópicos recorrentes analisados por IA e resumos automáticos." },
  { title: "Age com ferramentas de IA", desc: "Decide sozinha quando buscar, agendar, enviar ou escalonar. É um agente autônomo, não um script." },
];

export const timelineEvents = [
  { type: "conversa", title: "Conversa com a Luna", date: "25/07 · 09:12", detail: "Agendamento solicitado e confirmado automaticamente para sexta-feira às 09:00 com Dra. Helena." },
  { type: "agendamento", title: "Consulta — Dra. Helena", date: "25/07 · 09:00", detail: "Status: confirmada. Lembrete automático programado para 24/07 às 09:00 via WhatsApp." },
  { type: "nota", title: "Nota interna — Rafael", date: "18/07 · 15:40", detail: "Cliente prefere horários pela manhã. Oferecer condições do plano anual na próxima interação." },
  { type: "conversa", title: "Conversa com atendente", date: "10/07 · 14:22", detail: "Dúvida sobre faturamento resolvida pelo time humano após escalonamento da Luna com resumo." },
  { type: "agendamento", title: "Retorno — avaliação", date: "02/07 · 10:30", detail: "Realizado. Cliente avaliou o atendimento com nota máxima na pesquisa automática." },
];

export const agentSteps = [
  { label: "Entende o pedido", desc: "Intenção identificada: reagendar para amanhã" },
  { label: "Consulta a agenda", desc: "Verifica a disponibilidade real em tempo" },
  { label: "Encontra horários", desc: "14:00 e 16:30 livres amanhã" },
  { label: "Reagenda", desc: "Move o compromisso e atualiza o Google Calendar" },
  { label: "Confirma", desc: "Avisa o cliente e registra tudo no histórico" },
];

export const agentTools = [
  "Buscar no conhecimento",
  "Agendar horário",
  "Reagendar",
  "Cancelar agendamento",
  "Enviar arquivo",
  "Escalonar para humano",
  "Salvar dados do cliente",
];

export const marketingSteps = [
  { label: "Criar template", desc: "Monte a mensagem com cabeçalho de texto, imagem, vídeo ou documento." },
  { label: "Aprovação Meta", desc: "O template segue as regras oficiais do WhatsApp e é aprovado pela Meta." },
  { label: "Selecionar opt-ins", desc: "Apenas clientes que consentiram recebem — sua conta protegida." },
  { label: "Agendar", desc: "Escolha data e hora ou dispare imediatamente." },
  { label: "Enviar", desc: "Envio em massa com controle de velocidade e retentativas." },
  { label: "Acompanhar", desc: "Enviadas, entregues e lidas em tempo real, com log completo." },
];

export const plans = [
  {
    name: "Start",
    price: "R$ 195",
    period: "/mês",
    desc: "Automação para começar a escalar o atendimento.",
    features: ["Luna com fluxos visuais", "1 número de WhatsApp", "Agendamento automático", "Base de conhecimento (PDF/TXT)", "Até 1.000 conversas/mês"],
    highlight: false,
  },
  {
    name: "Silver",
    price: "R$ 350",
    period: "/mês",
    desc: "Inteligência e gestão para operações em crescimento.",
    features: ["Tudo do Start", "IA/RAG com Drive e website", "Entende áudio e imagem", "CRM 360 e notas internas", "Campanhas e opt-in", "Relatórios e análise de tópicos"],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "R$ 599,90",
    period: "/mês",
    desc: "Experiência conversacional premium em escala.",
    features: ["Tudo do Silver", "Agente autônomo com ferramentas", "Múltiplos atendentes e equipes", "Integrações avançadas", "Análise semanal por IA", "Suporte prioritário dedicado"],
    highlight: false,
  },
];

export const tourItems = [
  { id: "mensagens", label: "Mensagens", desc: "Inbox ao vivo com conversas da Luna e da equipe, resumo por IA e filtros por status.", stat: "24/7 ativa", statLabel: "caixa de entrada" },
  { id: "clientes", label: "Clientes", desc: "CRM 360 com histórico completo, opt-in, tags e agendamentos de cada contato.", stat: "1.284", statLabel: "contatos ativos" },
  { id: "marketing", label: "Marketing", desc: "Templates oficiais, campanhas em massa e agendadas, sempre com opt-in.", stat: "94%", statLabel: "taxa de leitura média" },
  { id: "relatorios", label: "Relatórios", desc: "Volume, horários de pico, engajamento e análise de tópicos por IA.", stat: "30 dias", statLabel: "de visão consolidada" },
  { id: "integracoes", label: "Integrações", desc: "WhatsApp Cloud API, Google Calendar e Google Drive conectados nativamente.", stat: "3+", statLabel: "sistemas conectados" },
  { id: "performance", label: "Performance", desc: "Latência de resposta, custo de IA e saúde operacional da plataforma.", stat: "1,2s", statLabel: "resposta média da Luna" },
  { id: "kpis", label: "KPIs", desc: "Resolução pelo bot, escalonamento e recorrência em um painel executivo.", stat: "78%", statLabel: "resolução autônoma" },
  { id: "features", label: "Features", desc: "Ative capacidades por plano e controle o que a Luna pode fazer.", stat: "12", statLabel: "capacidades modulares" },
  { id: "flow", label: "Flow Config", desc: "Construtor visual de fluxos: mensagens, menus, IA, agendamento e escalonamento.", stat: "9 tipos", statLabel: "de nós disponíveis" },
];

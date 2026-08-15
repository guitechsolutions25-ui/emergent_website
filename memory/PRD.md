# PRD — Kromera Landing Page

## Problema original
Landing page premium e futurista para a Kromera, plataforma de atendimento e automação com IA para WhatsApp (assistente Luna). Frontend-only, React + Tailwind + Framer Motion + React Flow (@xyflow/react), dark (#0D0D0F / #17171A / teal #00D9A5), conteúdo 100% em pt-BR, dados mockados no frontend. Screenshots do produto real servem como referência visual para recriar interfaces interativas (inbox, campanhas, flow builder, integrações). Cena Spline do usuário no hero: https://prod.spline.design/loh2QfaTTmQ3M1kH/scene.splinecode

## Arquitetura
- `/app/frontend/src/App.js` — composição das seções (sem backend)
- `src/components/` — Nav, Hero (Spline), Marquee, Positioning, Reveal (helpers), showcase/ (Showcase, InboxDemo, CampaignsDemo, FlowDemo, ClientsDemo, IntegrationsDemo, AnalyticsDemo)
- `src/sections/` — AiSections (RAG/Agente/Omni), ProductSections (Agendamento/CRM/Handoff), GrowthSections (Marketing/Analytics/Integrações/Tour), Closing (Preços/CTA/Footer)
- `src/data/mock.js` — todos os dados simulados
- `src/lib/scroll.js` — scroll suave para âncoras

## Implementado (Jul/2026)
- Hero com cena Spline interativa (mouse reage sobre o orbe), reveal mascarado do headline, cards flutuantes
- Showcase interativo com 6 abas: Conversas (inbox clicável + resumo IA + envio de msg), Campanhas (templates + simulador Rascunho→Agendada→Enviada), Fluxos (React Flow com pan/zoom/nós clicáveis + adicionar nós), Clientes (busca + opt-in toggle), Integrações (status + conectar), Analytics (gráficos com hover + análise de tópicos)
- Seções: posicionamento (10 capacidades expansíveis), RAG animado, agente autônomo (passos sequenciais), omnichannel, agendamento interativo (slots clicáveis → confirmação), CRM 360 (timeline clicável), handoff humano, marketing (stepper animado), analytics, integrações, tour da plataforma, preços (3 planos), CTA final
- Fix: interatividade do Spline — wrapper de conteúdo do hero com pointer-events-none (CTAs com pointer-events-auto)

## Verificado
- Inbox: troca de conversa + gerar resumo (OK)
- Simulador de campanha até estado "Enviada" (OK)
- Flow builder renderiza 8 nós (OK)
- Agendamento confirma slot 09:00 (OK)
- Spline recebe hover (elementFromPoint = CANVAS) e cena reage ao mouse (OK)

## Backlog
- P1: versão mobile do showcase (abas horizontais já funcionam, revisar inbox)
- P2: pré-carregar/otimizar carregamento da cena Spline (pesada em conexões lentas)
- P2: modo de produção (build) para melhor performance

## Credenciais
Nenhuma — site público sem autenticação.

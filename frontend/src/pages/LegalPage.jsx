import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Reveal } from "@/components/Reveal";
import { scrollToSection } from "@/lib/scroll";

function Article({ num, title, children }) {
  return (
    <Reveal className="mt-10 scroll-mt-28" y={16}>
      <h3 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
        <span className="text-teal">{num}.</span> {title}
      </h3>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-steel md:text-base">{children}</div>
    </Reveal>
  );
}

function Bullets({ items }) {
  return (
    <ul className="ml-1 mt-3 space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5">
          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function DocHead({ eyebrow, title, subtitle, version }) {
  return (
    <div className="border-b border-line pb-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-teal">{eyebrow}</p>
      <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{title}</h2>
      <p className="mt-2 text-sm text-steel">{subtitle}</p>
      <p className="mt-4 font-mono text-[11px] text-steel/60">{version}</p>
    </div>
  );
}

function LegalSubNav() {
  const links = [
    { href: "#termos-de-servico", label: "Termos de Serviço" },
    { href: "#privacidade", label: "Política de Privacidade e Proteção de Dados" },
  ];
  return (
    <nav className="sticky top-16 z-10 -mx-5 mb-4 flex gap-2 overflow-x-auto whitespace-nowrap bg-ink/90 px-5 py-3 backdrop-blur lg:-mx-8 lg:px-8" data-testid="legal-subnav">
      {links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          onClick={(e) => { e.preventDefault(); scrollToSection(l.href); }}
          className="rounded-full border border-line px-4 py-1.5 text-xs text-steel transition-colors hover:border-teal/40 hover:text-teal"
        >
          {l.label}
        </a>
      ))}
    </nav>
  );
}

export default function LegalPage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const t = setTimeout(() => scrollToSection(hash), 60);
    return () => clearTimeout(t);
  }, [hash]);

  return (
    <div className="mx-auto max-w-4xl px-5 pb-28 pt-32 lg:px-8" data-testid="legal-page">
      <LegalSubNav />

      <section id="termos-de-servico" className="scroll-mt-28" data-testid="terms-section">
        <DocHead
          eyebrow="Documento legal"
          title="Termos de Serviço"
          subtitle="Plataforma Luna — Kromera Tecnologia"
          version="Versão 1.0 — 24 de junho de 2026"
        />

        <Article num={1} title="Partes e Aceitação">
          <p>Estes Termos de Serviço ("Termos") regulam a relação entre a Kromera Tecnologia ("Kromera", "nós"), empresa com sede em São Paulo/SP, e o cliente que adquirir acesso à plataforma Luna ("Cliente", "você").</p>
          <p>Ao criar uma conta, o Cliente declara ter lido, compreendido e aceito integralmente estes Termos. Caso não concorde, não utilize a plataforma.</p>
        </Article>

        <Article num={2} title="Descrição do Serviço">
          <p>A Luna é uma plataforma SaaS (Software as a Service) que permite ao Cliente implantar assistentes de atendimento automatizado via WhatsApp, integrando inteligência artificial, fluxos de atendimento configuráveis e campanhas de marketing via mensagens.</p>
          <p>A Kromera fornece acesso à plataforma mediante pagamento de assinatura, não sendo responsável pelo conteúdo das mensagens enviadas pelo Cliente a seus usuários finais.</p>
        </Article>

        <Article num={3} title="Cadastro e Conta">
          <p>O acesso à plataforma é realizado mediante convite emitido pela Kromera. O Cliente é responsável por:</p>
          <Bullets items={[
            "Manter a confidencialidade de suas credenciais de acesso;",
            "Garantir que as informações fornecidas no cadastro sejam verdadeiras e atualizadas;",
            "Notificar imediatamente a Kromera em caso de acesso não autorizado à sua conta.",
          ]} />
        </Article>

        <Article num={4} title="Período de Avaliação Gratuita">
          <p>Novos Clientes têm direito a um período de avaliação gratuita, contado a partir da data de criação da conta, sem necessidade de informar dados de pagamento.</p>
          <p>Ao término do período de avaliação, o acesso será suspenso até que o Cliente contrate um dos planos disponíveis. Nenhuma cobrança automática será realizada sem o consentimento expresso do Cliente.</p>
        </Article>

        <Article num={5} title="Planos e Pagamento">
          <p>A Kromera oferece planos de assinatura mensais e anuais, com os valores vigentes divulgados em seu site oficial (kromera.com). Os planos diferem em funcionalidades e limites de uso, conforme descrição disponível na plataforma.</p>
          <p className="font-semibold text-white/90">5.1 Assinatura Mensal</p>
          <p>Cobrada mensalmente na data de aniversário da contratação. O Cliente pode cancelar a qualquer momento, com acesso mantido até o fim do período já pago.</p>
          <p className="font-semibold text-white/90">5.2 Assinatura Anual</p>
          <p>Cobrada integralmente na data de contratação, com desconto em relação ao plano mensal. Cancelamentos realizados nos primeiros 30 (trinta) dias contarão com reembolso proporcional ao período não utilizado. Após esse prazo, não haverá reembolso.</p>
          <p className="font-semibold text-white/90">5.3 Reajuste de Preços</p>
          <p>A Kromera se reserva o direito de reajustar os preços, com notificação prévia de 30 (trinta) dias por e-mail ao Cliente.</p>
        </Article>

        <Article num={6} title="Cancelamento">
          <p>O Cliente pode cancelar sua assinatura a qualquer momento através da plataforma ou por e-mail para contato@kromera.com. O cancelamento entra em vigor ao término do período vigente já pago. Não há multa por cancelamento.</p>
          <p>A Kromera pode cancelar o acesso do Cliente em caso de violação destes Termos, fraude, inadimplência ou uso indevido da plataforma, com notificação prévia sempre que possível.</p>
        </Article>

        <Article num={7} title="Integração com WhatsApp e Meta">
          <p>A utilização da plataforma Luna requer que o Cliente possua uma conta WhatsApp Business Account (WABA) própria, conectada à plataforma através do processo de Embedded Signup da Meta.</p>
          <p>O Cliente é o único responsável por:</p>
          <Bullets items={[
            "Cumprir os Termos de Serviço e Políticas de Uso da Meta e do WhatsApp Business;",
            "Obter opt-in explícito dos usuários antes de enviar mensagens de marketing;",
            "Garantir que o conteúdo das mensagens enviadas esteja em conformidade com a legislação aplicável;",
            "Manter ativa sua conta de cobrança junto à Meta para o uso do WhatsApp Business API.",
          ]} />
          <p>A Kromera não se responsabiliza por suspensões, bloqueios ou restrições impostas pela Meta à conta do Cliente.</p>
        </Article>

        <Article num={8} title="Propriedade Intelectual">
          <p>A plataforma Luna, incluindo seu código-fonte, design, algoritmos e documentação, é de propriedade exclusiva da Kromera e está protegida pela legislação de propriedade intelectual aplicável.</p>
          <p>O Cliente não adquire qualquer direito sobre a plataforma além do direito de uso durante a vigência da assinatura. É vedado copiar, modificar, distribuir, vender ou criar obras derivadas da plataforma.</p>
          <p>O conteúdo inserido pelo Cliente na plataforma (fluxos, mensagens, base de conhecimento) permanece de propriedade do Cliente.</p>
        </Article>

        <Article num={9} title="Privacidade e Proteção de Dados (LGPD)">
          <p>O tratamento de dados pessoais realizado pela Kromera em decorrência do uso da plataforma é regulado pela Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD) e pelo Acordo de Processamento de Dados (DPA) disponível <a href="#privacidade" onClick={(e) => { e.preventDefault(); scrollToSection("#privacidade"); }} className="text-teal underline underline-offset-2">nesta página</a>.</p>
          <p>O Cliente, ao utilizar a plataforma para tratar dados de seus próprios usuários finais, atua como Controlador de dados e é responsável por garantir a conformidade com a LGPD em suas operações.</p>
        </Article>

        <Article num={10} title="Limitação de Responsabilidade">
          <p>A Kromera não se responsabiliza por:</p>
          <Bullets items={[
            "Danos indiretos, perda de receita ou lucros cessantes decorrentes do uso ou impossibilidade de uso da plataforma;",
            "Interrupções causadas por manutenção, falhas de infraestrutura de terceiros ou eventos de força maior;",
            "Conteúdo enviado pelo Cliente a seus usuários finais;",
            "Decisões de negócio tomadas com base em dados ou relatórios gerados pela plataforma.",
          ]} />
          <p>A responsabilidade total da Kromera, em qualquer hipótese, fica limitada ao valor pago pelo Cliente nos 3 (três) meses anteriores ao evento gerador do dano.</p>
        </Article>

        <Article num={11} title="Disposições Gerais">
          <p>Estes Termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da Comarca de São Paulo/SP para dirimir quaisquer controvérsias decorrentes deste instrumento, com renúncia expressa a qualquer outro, por mais privilegiado que seja.</p>
          <p>A Kromera pode atualizar estes Termos periodicamente, com notificação prévia de 15 (quinze) dias ao Cliente por e-mail. O uso continuado da plataforma após a vigência das alterações implica aceitação dos novos termos.</p>
        </Article>

        <Article num={12} title="Contato">
          <p>Para dúvidas, solicitações ou notificações relacionadas a estes Termos, entre em contato:</p>
          <Bullets items={["E-mail: contato@kromera.com", "Site: kromera.com", "Endereço: São Paulo, SP, Brasil"]} />
        </Article>
      </section>

      <section id="privacidade" className="mt-24 scroll-mt-28 border-t border-line pt-16" data-testid="privacy-section">
        <DocHead
          eyebrow="Documento legal"
          title="Política de Privacidade e Proteção de Dados"
          subtitle="Acordo de Processamento de Dados (DPA) — Plataforma Luna — Kromera Tecnologia"
          version="Versão 1.0 — 24 de junho de 2026"
        />

        <Article num={1} title="Partes">
          <p>Este Acordo de Processamento de Dados ("DPA" ou "Acordo") é celebrado entre:</p>
          <p><strong className="text-white/90">Operadora:</strong> Kromera Tecnologia, pessoa jurídica de direito privado, com sede em São Paulo/SP, Brasil ("Kromera" ou "Operadora").</p>
          <p><strong className="text-white/90">Controladora:</strong> o Cliente pessoa jurídica ou física que contratou os serviços da plataforma Luna mediante aceitação dos Termos de Serviço ("Cliente" ou "Controladora").</p>
          <p>Este DPA integra e é parte integrante dos Termos de Serviço da Kromera, aplicando-se a todo tratamento de dados pessoais realizado pela Kromera em nome do Cliente no contexto da prestação dos serviços da plataforma Luna.</p>
        </Article>

        <Article num={2} title="Definições">
          <p>Para os fins deste Acordo, aplicam-se as definições da Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD), em especial:</p>
          <Bullets items={[
            "“Dados Pessoais”: qualquer informação relacionada a pessoa natural identificada ou identificável;",
            "“Tratamento”: toda operação realizada com dados pessoais, como coleta, produção, recepção, classificação, utilização, acesso, reprodução, transmissão, distribuição, processamento, arquivamento, armazenamento, eliminação, avaliação, controle, modificação, comunicação, transferência, difusão ou extração;",
            "“Controlador”: pessoa natural ou jurídica que toma as decisões referentes ao tratamento de dados pessoais;",
            "“Operador”: pessoa natural ou jurídica que realiza o tratamento de dados pessoais em nome do Controlador;",
            "“Titular”: pessoa natural a quem se referem os dados pessoais objeto do tratamento;",
            "“Autoridade Nacional de Proteção de Dados (ANPD)”: órgão da administração pública responsável por zelar pela proteção de dados pessoais no Brasil.",
          ]} />
        </Article>

        <Article num={3} title="Objeto e Natureza do Tratamento">
          <p>A Kromera, na qualidade de Operadora, realiza o tratamento de dados pessoais em nome do Cliente (Controladora) exclusivamente para os fins de prestação dos serviços da plataforma Luna, que incluem:</p>
          <Bullets items={[
            "Armazenamento e processamento de mensagens trocadas entre o bot do Cliente e seus usuários finais via WhatsApp;",
            "Armazenamento de dados de contato dos usuários finais (número de telefone, nome, histórico de interações);",
            "Processamento de dados para geração de relatórios, análises de desempenho e métricas de atendimento;",
            "Envio de mensagens e campanhas de marketing em nome do Cliente, mediante instrução expressa do Cliente;",
            "Armazenamento de documentos e conteúdos inseridos pelo Cliente como base de conhecimento.",
          ]} />
          <p>A Kromera não utiliza os dados pessoais tratados em nome do Cliente para nenhuma finalidade própria, incluindo publicidade, treinamento de modelos de inteligência artificial ou compartilhamento com terceiros, salvo conforme previsto neste Acordo.</p>
        </Article>

        <Article num={4} title="Obrigações da Operadora (Kromera)">
          <p>A Kromera se compromete a:</p>
          <Bullets items={[
            "Tratar os dados pessoais somente de acordo com as instruções documentadas do Cliente e nos termos deste Acordo;",
            "Garantir que as pessoas autorizadas a tratar os dados pessoais se comprometam com a confidencialidade ou estejam sujeitas a obrigações legais de confidencialidade;",
            "Implementar medidas técnicas e organizacionais adequadas para garantir a segurança dos dados pessoais, incluindo proteção contra acesso não autorizado, perda, destruição ou divulgação acidental;",
            "Notificar o Cliente, no prazo máximo de 72 (setenta e duas) horas após tomar conhecimento, sobre qualquer incidente de segurança que possa afetar os dados pessoais tratados;",
            "Auxiliar o Cliente, na medida do possível, no cumprimento de suas obrigações relativas a direitos dos titulares (acesso, correção, exclusão, portabilidade, etc.);",
            "Eliminar ou devolver ao Cliente todos os dados pessoais após o término da prestação dos serviços, conforme instrução do Cliente, salvo disposição legal em contrário;",
            "Colocar à disposição do Cliente todas as informações necessárias para demonstrar o cumprimento das obrigações previstas neste Acordo.",
          ]} />
        </Article>

        <Article num={5} title="Suboperadores">
          <p>O Cliente autoriza a Kromera a contratar suboperadores para o tratamento de dados pessoais, desde que:</p>
          <Bullets items={[
            "Os suboperadores estejam sujeitos a obrigações de proteção de dados equivalentes às previstas neste Acordo;",
            "A Kromera permaneça responsável perante o Cliente pelo cumprimento das obrigações dos suboperadores.",
          ]} />
          <p>Os suboperadores atualmente utilizados pela Kromera no contexto da plataforma Luna são:</p>
          <Bullets items={[
            "Supabase Inc. — armazenamento de banco de dados (supabase.com/privacy);",
            "Railway Corp. — hospedagem de infraestrutura (railway.app/legal/privacy);",
            "Anthropic PBC — processamento de linguagem natural via API (anthropic.com/privacy).",
          ]} />
          <p>A Kromera notificará o Cliente com antecedência mínima de 15 (quinze) dias sobre qualquer adição ou substituição de suboperadores. O Cliente pode se opor à mudança por motivos razoáveis relacionados à proteção de dados.</p>
        </Article>

        <Article num={6} title="Obrigações da Controladora (Cliente)">
          <p>O Cliente, na qualidade de Controladora, é responsável por:</p>
          <Bullets items={[
            "Garantir que o tratamento de dados pessoais de seus usuários finais por meio da plataforma Luna possui base legal adequada nos termos da LGPD;",
            "Obter o consentimento ou outra base legal aplicável dos titulares antes de coletar seus dados pessoais através da plataforma;",
            "Obter opt-in explícito dos usuários finais antes de enviar mensagens de marketing via WhatsApp;",
            "Responder às solicitações dos titulares de dados relativas ao exercício de seus direitos;",
            "Notificar a Kromera imediatamente caso tome conhecimento de qualquer incidente de segurança relacionado ao acesso à plataforma.",
          ]} />
        </Article>

        <Article num={7} title="Segurança dos Dados">
          <p>A Kromera implementa medidas de segurança técnicas e organizacionais adequadas para proteger os dados pessoais, incluindo:</p>
          <Bullets items={[
            "Criptografia de dados em trânsito (TLS/HTTPS) e em repouso;",
            "Controle de acesso baseado em funções (RBAC);",
            "Autenticação via tokens JWT com expiração;",
            "Isolamento de dados por tenant (multi-tenancy seguro);",
            "Backups regulares realizados pelo provedor de banco de dados.",
          ]} />
        </Article>

        <Article num={8} title="Transferência Internacional de Dados">
          <p>O tratamento de dados pessoais no contexto deste Acordo pode envolver transferência internacional, em razão da utilização de suboperadores com infraestrutura localizada fora do Brasil (Estados Unidos).</p>
          <p>A Kromera garante que tais transferências são realizadas em conformidade com a LGPD, com base nas salvaguardas adequadas previstas na legislação, incluindo cláusulas contratuais com os suboperadores.</p>
        </Article>

        <Article num={9} title="Direitos dos Titulares">
          <p>A Kromera auxiliará o Cliente no atendimento às solicitações dos titulares de dados, incluindo os direitos de:</p>
          <Bullets items={[
            "Confirmação da existência de tratamento;",
            "Acesso aos dados;",
            "Correção de dados incompletos, inexatos ou desatualizados;",
            "Anonimização, bloqueio ou eliminação de dados desnecessários;",
            "Portabilidade dos dados;",
            "Eliminação dos dados pessoais tratados com base no consentimento;",
            "Revogação do consentimento.",
          ]} />
        </Article>

        <Article num={10} title="Vigência e Encerramento">
          <p>Este DPA entra em vigor na data de aceitação dos Termos de Serviço pelo Cliente e permanece vigente enquanto houver prestação de serviços pela Kromera.</p>
          <p>Ao término do contrato, a Kromera reterá os dados pessoais por até 90 (noventa) dias para fins de backup e eventual restauração, após o que os dados serão eliminados de forma segura, salvo obrigação legal de retenção por prazo superior.</p>
        </Article>

        <Article num={11} title="Lei Aplicável e Foro">
          <p>Este Acordo é regido pela legislação brasileira, especialmente pela Lei Geral de Proteção de Dados (Lei nº 13.709/2018). Fica eleito o foro da Comarca de São Paulo/SP para dirimir quaisquer controvérsias.</p>
        </Article>

        <Article num={12} title="Contato — Encarregado de Dados (DPO)">
          <p>Para exercício de direitos, dúvidas ou comunicação de incidentes relacionados ao tratamento de dados pessoais, o titular ou o Cliente pode entrar em contato com o Encarregado de Dados da Kromera:</p>
          <Bullets items={["E-mail: privacidade@kromera.com (ou contato@kromera.com)", "Site: kromera.com", "Endereço: São Paulo, SP, Brasil"]} />
        </Article>
      </section>
    </div>
  );
}

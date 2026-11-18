# Auditoria NX-DS-001

Data: 2026-11-18. Inspeção dirigida de código/documentos locais, sem navegador,
execução de consumidores ou leitura de dados operacionais.
[Baseline](baseline.json) fixa HEAD, branch, status e SHA-256 de 64 arquivos
no momento registrado; [matriz](REUSE_MATRIX.csv) é o inventário estruturado.
A preservação final é registrada em preservation.json após verificação.

## Fontes e força da evidência

| ID | Projeto e diretório local | Base |
|---|---|---|
| MKT | EvertonLMsilva/04-MKTauto-frontend; C:/01-projetos/00-MKTauto/01-MKTauto-front | master, f2c410109472fd19df6043d8f04801be37ad13a4, limpo no baseline |
| NX | EvertonLMsilva/nexolira-orchestrator; C:/01-projetos/02-nexolira-orchestrator | main, c1712b0cbdd6b56067a63b92507f387df83b7bd6, limpo |
| NX-WIP | Worktree C:/01-projetos/02-nexolira-plat-008 | codex/plat-008-application-shell no mesmo HEAD; frontend e docs locais não commitados |
| MD | EvertonLMsilva/Orchestrating_orders_via_AI; C:/01-projetos/01-sistem-analitics-financial-market | codex/nj-core-client-connection-002, fabf665dd65056581c12dc3cde69832d1a4b8466; mudanças locais preexistentes |

NX main: docs/TOPIC_ROADMAP.md:22,48,67 descreve PLAT-008 planejado e sem frontend
na central. NX-WIP docs/tasks/PLAT-008.md:1 registra IN_PROGRESS, validações
PENDING e aceite operacional NOT_TESTED. Não promover trabalho local a entrega
aceita; atualizar evidências antes de reutilizar implementação em evolução.

## MKTauto

- src/styles/tokens.css:2-88: :root dark, azul #008cff/ciano #36d7ff,
  superfícies #030912/#091421; semânticos + decoração/medidas de shell misturados.
  Tipos system sans/mono, base 15px, auxiliar 12/14px e micro 11px; pesos 500–700,
  linha 1.65. Espaços 4/8/12/16/24/32/40/48px: números não são multiplicação
  uniforme (space-5=24px). Não migrar nomes automaticamente.
- tokens.css:66-88: raios 8/12/16px, foco 2px/offset4, duração140/200ms,
  altura44px, sombras neon e dimensões de shell específicas.
- src/styles/global.css:1-19,20-75: reset global, classes genéricas, foco,
  skip link, sr-only, variantes, busy/disabled, status/badge e movimento reduzido.
  A política global de reduzir animação em * não pode ser copiada para pacote.
- src/styles/layout.css:2-40,125-149: shell/sidebar/header, grid minmax e
  adaptação em 1100/820/560px. Há breakpoints posteriores de features.
  Shell, brand e nomes operacionais permanecem no aplicativo.
- src/components/ui/NeonButton.tsx:1-38: tipos distinguem button e Link,
  type=button padrão, disabled/loading e aria-busy. Dependência direta
  react-router; sem contrato de ref. Separar navegação da primitiva de ação.
- NeonPanel.tsx:1-35: useId, section nomeada por h2, ação independente.
  Extrair conceito de agrupamento, permitir nível de heading/elemento adequado.
- NeonBadge.tsx:1-14: conteúdo textual, glifo decorativo oculto e tom semântico;
  não tem live region. Tornar atributos/className extensíveis quando implementado.
- StatusMessage.tsx:1-33: ícone oculto, labels em português, error=alert e
  demais=status/busy. Tornar anúncio configurável e i18n responsabilidade do
  chamador; não anunciar cada mensagem estática.
- Icon.tsx:1-27: paths SVG internos/currentColor, aria-hidden por padrão,
  nomes parcialmente específicos (campaign/publish/processor).
  Manter contrato decorativo/informativo explícito; proveniência dos paths não
  estabelecida nesta inspeção.
- package.json:13-36: React/DOM19.3.1, react-router8.5.1;
  Vitest/Testing Library/user-event/jsdom. Testes lidos:
  NeonControls.test.tsx cobre teclado, type padrão, disabled/loading,
  navegação e badge estático; NeonPanel.test.tsx cobre região/ação e mensagens.
  Presença e assertions são verificadas; testes não foram executados e não há
  percentual de cobertura nem conformidade automatizada de acessibilidade provada.

## Nexolira e PLAT-008

- NX-WIP frontend/src/components/ui.tsx:10-11 importa ApiError/useResource.
  Card:137, Status:160, Empty:195, ErrorMessage:214, ResourceState:241,
  Pager:263, Lookup:330, MutationForm:399 e Confirmation:566 evidenciam a mistura.
  Status contém ACTIVE/ALLOWED/LICENSED/QUOTA_ALLOWED e DENIED/EXPIRED etc.;
  esse mapeamento permanece na aplicação. ErrorMessage recebe ApiError:
  UI genérica deve receber texto/action sem class de serviço.
- Confirmation usa dialog e aria-labelledby. Reutilizar conceito após validar
  foco/Escape/retorno; não copiar junto do formulário de mutação.
  Pager informa total indisponível, mas inclui teto de offset CORE: removê-lo
  do contrato genérico. Lookup carrega dados; permanece específico.
- frontend/src/styles/app.css:1-21: fundos #0e1520/#141e2b, azul #6fa6ff,
  ciano #6edee0, raio12px, tokens genéricos --bg/--surface, foco visível.
  Paleta neutra informa o guia; nova referência melhora borda/texto auxiliar.
- frontend/src/shell/shell.tsx:118-151: navegação por áreas administrativas e
  rotas; seletores tenant e sessão não pertencem à biblioteca.
- frontend/src/contracts/application-entry.ts:1-37,140 em diante:
  contrato versionado, rotas nativas, externas confiáveis e futuro MFE.
  Licença, ACL, quota, autorização operacional e disponibilidade são decisões
  distintas. UI recebe resultado/explicação; não decide acesso nem transfere token.
- frontend/src/features/overview.tsx mostra lacunas de total/KPIs e decisões
  não verificadas. Não fabricar métricas; empty/error/loading/unavailable são
  necessários. Catálogo pode oferecer Badge/StatusMessage; mapeamento no Portal.
- frontend/test/components.test.tsx:75 em diante e scope.test.ts/proxy.test.ts:
  testes presentes de sessão, 401/403, contexto e formulários. Não executados
  nesta task; source WIP não prova PASS ou cobertura específica dos componentes.

## Market Direction

Raiz do frontend:
src/MarketContext/Go/internal/httpapi/frontend (abreviada MD-F na matriz).
Não foram lidos código de trading, dados Go/data, certificados ou credenciais.

- MD-F/src/styles/tokens.css:1 e 3 em diante: @import Google Fonts Inter,
  :root dark, neutros #12161f/#1c202b, verde #00e699; primitivos/semânticos
  separados parcialmente; espaços uniformes em múltiplos de4, controle44px.
  Sombras discretas, raios8/12, foco translúcido e transition160ms.
- global.css:1-9: remove outline e substitui por box-shadow; ring depende da
  composição alfa. Não transferir sem avaliação de contraste/forced-colors.
  Media queries62/42rem e reduced motion existem; são regras globais.
- src/components/Button.jsx:1: botão nativo type=button e spread props,
  sem TS/loading; className recebida pode substituir classe base.
- Field.jsx:1-16: useId + label/htmlFor e aria-describedby de hint/error;
  aria-invalid não é fornecido pelo wrapper. Bom conceito de FormField,
  requer contrato tipado e validação de erro/grupos.
- Card.jsx, Feedback.jsx, StatusBadge.jsx, DataTable.jsx:
  agrupamento/texto de status e tabela com caption, th/scope=col,
  alinhamento direito e chave row.id. Não há ordenação, virtualização ou
  comportamento de empty state embutido em DataTable; são extensões futuras.
- components.test.jsx contém testes de Field, feedback/tabela nomeada,
  alinhamento financeiro e variantes de Card. Não executados; não foi
  identificado teste direto de Button nesse arquivo.
  Docs/FRONTEND_STYLE_GUIDE.md confirma intenção de tema e fonte Google.
  Reaproveitar conceito de números tabulares; não transportar vocabulário
  de trading, filtros de telemetria, hooks de sessão ou client dashboard.

## Licenças, decisões e limites

Nenhum LICENSE/NOTICE de redistribuição foi localizado nas raízes/árvores
relevantes auditadas (excluídos .git e node_modules). Manifests de apps são
privados; isso não autoriza relicenciamento. Licença/proveniência de fonte,
ícones e código permanecem UNVERIFIED. Nenhum código-fonte de componente,
asset ou tema completo foi copiado.

REUSE_WITH_ADAPTATION expressa adequação técnica condicional, nunca permissão
de cópia. REUSE_AS_IS não foi aplicado. A matriz aponta deps, evidências,
testes presentes e alterações necessárias, sem classificar apenas pela aparência.
Novos tokens de referência são autoria desta fundação com valores justificados,
não distribuição das folhas de estilo originais.

A inspeção identifica limitações; não certifica WCAG. Contraste de pares
opacos é calculado localmente, sem comprovar gradientes/intermediários,
composição, foco real, teclado de browser ou leitor de tela.
Ver [contraste](CONTRAST.md) e o catálogo priorizado.


## Evolução da referência durante a auditoria

O baseline captura 64 arquivos e o estado inicial. Durante esta execução,
a worktree PLAT-008 passou para e413e11c71899c2694d4fd675d43e3a80253bd38,
com Git limpo observado e task declarando DONE/PR_OPEN/operacional PARTIAL.
A inspeção final confirmou que ui.tsx continua importando ApiError/useResource.
Não executamos seus testes nem verificamos seu PR; o estado é o registrado
na documentação da referência. Números de linha WIP são localizadores do momento
da leitura e podem ter se deslocado. O inventário conserva essa limitação.
[preservation.json](preservation.json) compara HEAD/status/hashes observados
ao baseline, sem atribuir as mudanças de outra execução a esta entrega.
Nenhum comando desta execução escreveu em repositórios consumidores.

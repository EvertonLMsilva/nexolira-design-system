# Catálogo de componentes

O [catálogo visual 0.2.0](../../apps/docs/README.md) e o [contrato de UI](../../packages/react/CONTRACTS.md) descrevem os componentes disponíveis. A [matriz D19](../audit/D19-mapeamento.md) registra a origem e o aceite de cada grupo.

## Priorização histórica da fundação

MVP_REQUIRED significa candidato necessário à primeira fatia de consumo concreto,
não autorização para implementar tudo no NX-DS-001. A ordem dentro do MVP começa
por Button, Card e feedback; campos/tabela e Dialog exigem validação própria
proporcional ao risco. Catálogo baseado em evidências locais, não aparência.

| Componente | Prioridade | Uso concreto e direção |
|---|---|---|
| Button | MVP_REQUIRED | MKTauto NeonButton e ações/formulários PLAT-008; nativo sem router |
| IconButton | MVP_REQUIRED | Toggle mobile/ações de ícone dos shells; nome acessível obrigatório |
| Input | MVP_REQUIRED | Login/cadastro/consultas PLAT-008 e formulários MKTauto |
| Textarea | MVP_REQUIRED | Campos multiline no contrato de formulário PLAT-008 |
| Select | MVP_REQUIRED | Seletores nativos nos dois frontends; busca remota fica no consumidor |
| Checkbox | MVP_REQUIRED | Tipo checkbox previsto no formulário PLAT-008; sem regras de permissão |
| Radio | NEXT_PHASE | Sem uso inicial confirmado suficiente; implementar só com grupo real |
| Switch | NEXT_PHASE | Sem uso concreto verificado; distinguir configuração de ação comercial |
| FormField | MVP_REQUIRED | Field MD com label/id/hint/error; complementar aria-invalid e grupos |
| Badge | MVP_REQUIRED | NeonBadge e Status no Portal; mapeamento de negócio no app |
| Alert | MVP_REQUIRED | Falhas/avisos nos três frontends; pode compor StatusMessage sem duplicação |
| StatusMessage | MVP_REQUIRED | MKTauto + feedback de loading/resultado PLAT-008; anúncio configurável |
| Toast | NOT_NEEDED | Feedback inline cobre escopo atual; fila/portal sem caso demonstrado |
| LoadingIndicator | MVP_REQUIRED | Estados de recurso MKTauto/Portal; texto e reduced motion |
| EmptyState | MVP_REQUIRED | Listas vazias Portal/MD; conteúdo do consumidor |
| ErrorState | MVP_REQUIRED | Falhas de recurso; sem dependência ApiError ou retry de serviço |
| Card | MVP_REQUIRED | NeonPanel e Card Portal/MD; agrupamento acessível |
| Panel | MVP_REQUIRED | Composição de Card com heading/ação; evitar segunda implementação equivalente |
| Modal | NOT_NEEDED | Termo visual; Dialog cobre contrato modal, sem duas APIs redundantes |
| Dialog | MVP_REQUIRED | Confirmações PLAT-008; alto risco de foco, teclado e portal |
| Drawer | NEXT_PHASE | Shell mobile atual não exige extrair componente sem validar padrão |
| Table | MVP_REQUIRED | Listas administrativas PLAT-008 e tabela MD; semântica nativa |
| DataTable | NEXT_PHASE | Ordenação/seleção/virtualização não demonstradas como necessidade comum |
| Pagination | MVP_REQUIRED | Pager sem total no Portal e listas MKTauto; estado controlado |
| Tabs | NEXT_PHASE | Sem reutilização comum comprovada; não improvisar keyboard pattern |
| Tooltip | NEXT_PHASE | Só quando houver informação auxiliar concreta; nunca único label |
| Progress | NEXT_PHASE | Quotas não autorizam inferir percentual; exigir contrato de valor/ausência |
| Breadcrumb | NEXT_PHASE | MKTauto possui padrão; promover quando Portal precisar além do título |
| NavigationItem | MVP_REQUIRED | Links dos shells MKTauto/Portal; route/trust/ACL fora da biblioteca |
| Menu | NEXT_PHASE | Exige caso comum e comportamento de teclado específico |
| Dropdown | NEXT_PHASE | Não substituir select nativo apenas por aparência |

## Fronteiras APPLICATION_SPECIFIC

Application Shell completo, marca/navegação de produtos, TenantSelector,
Lookup que faz HTTP, MutationForm que executa contratos, application-entry-v1,
mapeamento LICENSED/ALLOWED/QUOTA_ALLOWED, cards de negócio, filtros de telemetria,
sparklines de trading, consentimento e credenciais permanecem no aplicativo.

Exemplo de integração futura: consumidor traduz decisão autorizativa em
Badge(tone, children); a biblioteca não interpreta licença ou concede acesso.
Não transformar indisponibilidade/UNVERIFIED em erro ou sucesso sem contexto.

## Gate para cada candidato

Antes de mover para implementação: confirmar dois usos ou uma necessidade
transversal concreta, licença, dependências, contrato TS, estados, HTML,
teclado/foco e testes proporcionais. Para baixo risco, composição simples;
para Dialog/Menu/Tabs, validar padrão completo antes de divulgar API.

As propostas de props estão em [contratos React](../../packages/react/CONTRACTS.md)
e na tabela de [temas](THEMES.md). Specs futuras usam
[COMPONENT_SPEC](../templates/COMPONENT_SPEC.md). O quadro acima registra o planejamento inicial. Consulte o catálogo visual para a versão atual.

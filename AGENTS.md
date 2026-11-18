# Nexolira Design System — instruções permanentes

Ler este arquivo, a task ativa e somente referências necessárias.
Um tópico-pai por branch/PR; subtópicos permanecem na mesma entrega.
Estratégia LOCAL FIRST; aplicações consumidoras são independentes.

| Regra | Obrigação |
|---|---|
| DS-G01 | Componentes independentes: não importar serviços, contratos ou hooks de domínio dos produtos. |
| DS-G02 | Temas desacoplados: componente genérico não fixa identidade de uma aplicação. |
| DS-G03 | Props públicas, tokens e contratos de CSS versionados explicitamente. |
| DS-G04 | HTML semântico, teclado, nome acessível e foco visível; testes proporcionais ao risco. |
| DS-G05 | React/DOM como peers adequados na implementação; externalizar também subpaths do bundle. |
| DS-G06 | CSS isolado, classes nx-* e variáveis --nx-*; sem reset global em consumidores. |
| DS-G07 | Quebra de API, token, unidade, escopo ou identidade exige política explícita de compatibilidade e migração. |
| DS-G08 | Testar comportamento, estados e acessibilidade; não anunciar conformidade por inspeção de código. |
| DS-G09 | Cada consumidor escolhe quando atualizar a versão. |
| DS-G10 | Nenhuma publicação altera automaticamente repositórios de consumidores. |
| DS-G11 | Economia de contexto: leitura dirigida, reaproveitar evidências, sem abstrações especulativas. |
| DS-G12 | USER_ONLY_MERGE: nenhum merge automático. |

Preservar arquivos locais, worktrees e histórico. Registrar branch/HEAD/status
antes de alterar. Não usar reset/clean/stash/rebase/force push para contornar
mudanças preexistentes. Não copiar código sem licença e dependências verificadas.
Não ler .env, credenciais, dados runtime, trading, bancos ou telemetria.

Não criar remoto sem autorização de criação e visibilidade; não publicar, gastar,
provisionar cloud, alterar infraestrutura ou modificar produtos nesta task.
Não criar subagentes automaticamente. Não usar navegador assistido por IA.
Validação local por inspeção e ferramentas/testes determinísticos autorizados.

Fundação atual: `node scripts/validate-foundation.mjs`. Checagem opcional das
referências: acrescentar --check-references. Nenhum build de biblioteca existe.
NX-DS-002 deve comprovar build, npm pack, consumidor descartável e compatibilidade.
Não tratar manifests privados de preparação como pacotes consumíveis.

Ver [fluxo](docs/PROJECT_WORKFLOW.md), [task](docs/tasks/NX-DS-001.md) e
[contrato de task](docs/TASK_SPEC.md).

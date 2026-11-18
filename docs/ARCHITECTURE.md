# Arquitetura da fundação

Status: contrato local NX-DS-001, sem biblioteca compilada/distribuída.

```text
tokens (dados neutros -> CSS nx)
   |
   +-- ui React (comportamento + semântica + estilos próprios)
   |       |
   |       +-- docs local (exemplos fictícios)
   |
   +-- futuras tecnologias via mesmo contrato visual
```

Consumidores instalam versões escolhidas. Portal Central, MKTauto, Market
Direction, Jarvis/Kate e Bot Crypto mantêm repositórios, módulos e serviços.
A biblioteca não recebe credenciais, clients HTTP, hooks de domínio, lojas
globais, regras de autorização ou import de código de consumidores.

## Pacotes

- tokens: primitivos, semânticos e aliases de componente; referência validável.
- ui: primitivas React acessíveis, estilos prefixados e testes próprios futuros.
- docs: demonstração/documentação local futura; nunca shell agregador de produtos.

npm workspaces resolve organização local simples ([documentação npm](https://docs.npmjs.com/cli/v11/using-npm/workspaces/)).
Nenhum orquestrador extra é necessário para três workspaces sem build nesta fase.
A validação atual usa somente Node; não há lockfile porque não houve resolução
ou instalação de dependências. O NX-DS-002 adicionará lockfile ao instalar tooling.

## CSS e integração

Somente variáveis --nx-* e classes nx-*. Sem reset global, @import remoto ou
injeção automática de estilos. Entrada CSS explícita no futuro. Classes
associadas ao componente; propriedades herdáveis apenas dentro do host opt-in.
Não usar !important para disputar estilos com consumidores.

[data-nx-theme] controla identidade e data-nx-mode controla aparência.
Cada fronteira de tema reatribui aliases para impedir herança de valores
resolvidos no ancestral. Tokens compartilhados suportam árvores React distintas,
sem ThemeProvider obrigatório. [Contrato de temas](architecture/THEMES.md)
explica portais, sobreposições e versões simultâneas.

## Dependência PLAT-008

No baseline, CORE main registrava PLAT-008 planejado e a worktree continha
frontend não commitado. Durante a auditoria, a referência evoluiu para o commit
e413e11c71899c2694d4fd675d43e3a80253bd38. Seu Git foi observado limpo e sua task
registra DONE/PR_OPEN, com aceite operacional PARTIAL. Esta execução não rodou
os testes da referência nem verificou seu PR remoto. Necessidades observadas:
botões, campos/selects, cards, mensagens, tabela/paginação, navegação e diálogo.
Mapa de estados comerciais e verificação de application-entry-v1 pertencem ao
Portal/CORE; a biblioteca apenas recebe conteúdo e intenções visuais.

NATIVE_ROUTE, EXTERNAL_APPLICATION e MICROFRONTEND_FUTURE não introduzem runtime
MFE neste projeto. Sem Module Federation, SSO ou shell compartilhado nesta etapa.

## Evolução

[Tokens](architecture/TOKEN_CONTRACT.md), [React](../packages/react/CONTRACTS.md),
[distribuição](architecture/DISTRIBUTION.md) e [decisões](DECISIONS.md) detalham
contratos e gates. Nenhum consumidor depende desta fundação.

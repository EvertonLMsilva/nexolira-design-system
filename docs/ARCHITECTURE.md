# Arquitetura do Design System

Na versão 0.2.0, tokens e UI permanecem pacotes privados locais. O catálogo consome seus exports públicos. Os exemplos usam apenas estado React e recursos locais do navegador. [Entrega D19](tasks/NX-DS-MKTAUTO-001.md).

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

- tokens: modelo neutro, compilador/validador, valores resolvidos e CSS determinístico.
- ui: Button, Card/Panel, Badge, StatusMessage, Input/FormField, tipos e CSS.
- docs: demonstração/documentação local futura; nunca shell agregador de produtos.

npm workspaces resolve organização local simples ([documentação npm](https://docs.npmjs.com/cli/v11/using-npm/workspaces/)).
Build local com esbuild e declarações via TypeScript, lockfile próprio e versões
exatas; Vitest/Testing Library e consumidor Chromium headless. Nenhum Nx/Turbo.
O smoke instala tarballs fora dos workspaces em dois pares React/DOM exatos,
sem symlinks. Bundles externalizam React e seus subpaths; peers não são copiados.
Manifests privados permitem npm pack local e bloqueiam publicação acidental.

## CSS e integração

Somente variáveis --nx-* e classes nx-*. Sem reset global, @import remoto ou
injeção automática de estilos. Entradas CSS explícitas com declarations para
imports de efeito no TypeScript. Classes
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
contratos e gates. Nenhum consumidor real foi alterado ou adotou a biblioteca nesta task.

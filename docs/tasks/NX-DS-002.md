# NX-DS-002 — Primeira Biblioteca Funcional

PROJECT: NEXOLIRA-DESIGN-SYSTEM
FRONT: DS
PARENT_TOPIC: NX-DS-002
PRIORITY: P0
TASK_STATUS: DONE — biblioteca local validada
PARENT_STATUS: PR_OPEN — técnico DONE; revisão e merge pelo usuário
OPERATIONAL_STATUS: LOCAL_CONSUMER_VALIDATED; adoção real não executada
MERGE_POLICY: USER_ONLY_MERGE

## Baseline e autorização

main remota confirmada em 2026-11-18:
42d631659268c8241a7eb0f06c74066e27dd6a8f.
PR #1 confirmado MERGED, mergeCommit no mesmo SHA, mergedAt 2026-11-18T14:21:31Z.
Diretório C:/01-projetos/03-nexolira-design-system inicialmente limpo em
codex/nx-ds-001-foundation/e811db9394d4d52954edd0921553fd90125a3d4f.
Branch atual codex/nx-ds-002-library-mvp criada de origin/main; sem worktree extra.
Remoto origin git@github.com:EvertonLMsilva/nexolira-design-system.git, privado.
Prompt autoriza implementação, instalação de ferramentas necessárias, testes,
pack, consumidor descartável e um PR; nenhum merge ou publicação em registry.

## Allowlist efetiva e ownership

READ: AGENTS, task/prompt, contratos tokens/temas/React/distribuição, catálogo,
Style Guide, roadmap, arquitetura, manifests, script de validação e evidências
existentes. Consulta pontual ao script npm do CORE apenas identificou o runtime
npm local disponível; não foi copiado. Sem nova auditoria dos produtos.
CREATE/MODIFY: packages/{tokens,react}/**, scripts/**, test/**, manifests/lock,
tsconfig*.json, configurações Vitest/Playwright necessárias, README,
docs/{ARCHITECTURE,DECISIONS,TOPIC_ROADMAP}.md, docs/history/ROADMAP_HISTORY.md,
esta task; .gitignore atualizado para artefatos locais e declarações temporárias.
Correção operacional de contratos conforme a API implementada
em packages/react/CONTRACTS.md; documentação histórica NX-DS-001 preservada.
Artefatos ignorados: dist, node_modules, tarballs e relatórios de teste.
Consumidor isolado: pasta temporária exclusiva, fora dos workspaces.
Sem mudança em AGENTS, frontend real, MKTauto, Market Direction ou infraestrutura.

## Contratos e escolhas

Pacotes privados locais @nexolira/tokens e @nexolira/ui 0.1.0, sem publish.
Nomes distintos e livres no workspace; registry npm consultado retornou 404
para ambos em 2026-11-18. Isso não reserva o escopo ou autoriza publicação.
Pequena fatia: Button, Card/Panel (alias da mesma implementação), Badge,
StatusMessage, Input e FormField. Nenhum componente complexo.
ESM + declarações TypeScript, CSS explícito, React externalizado.
Peers exatos comprovados com os pares React/DOM 19.2.8 e 19.3.1.
Sem licença aberta presumida: UNLICENSED, código novo e uso local autorizado.

## Subtópicos e aceite

| ID | Entrega / aceite | Estado |
|---|---|---|
| 002.1 | Baseline, contratos, exports, peers e nomes locais | DONE |
| 002.2 | Tokens/temas, aliases/ciclos/colisões, projeção e isolamento | DONE |
| 002.3 | Biblioteca React ESM/types/CSS sem domínio | DONE |
| 002.4 | Button, Card/Panel, Badge, StatusMessage e comportamento | DONE |
| 002.5 | Input/FormField, labels/hint/error/ref/teclado | DONE |
| 002.6 | Vitest/Testing Library e browser local determinístico | DONE |
| 002.7 | Build, pack, inspeção, hashes e consumidor independente | DONE |
| 002.8 | Uso real documentado, evidências e único PR | DONE |

## Validação e riscos

Testes de tokens rejeitam ciclos, referências ausentes e colisões; testes UI
cobrem contratos observáveis, eventos/refs, formulário e anúncios.
Browser automatizado local comprova estilos reais, foco, temas aninhados,
roots independentes, movimento reduzido e acessibilidade automatizada.
Pack prova conteúdo e instalação real dos tarballs em consumidor temporário,
compila TS/build e verifica uma única cópia de React em ambas versões testadas.
Build reproduzível comparado por hashes. Sem navegador assistido por IA.
Resultados verificados abaixo; nenhum resultado presumido.

## Evidências de execução

Node v24.22.1; npm12.2.2. TypeScript6.0.2, esbuild0.28.2, Vitest5.1.1,
Testing Library React16.3.3, Playwright1.65.1, axe4.14.0, Vite8.3.8.
Versões reais consultadas no registry oficial, fixadas no manifesto/lock.
React/React DOM sempre no mesmo par19.2.8 ou19.3.1; types19.3.0.
Script de instalação esbuild autorizado especificamente por versão em allowScripts,
sem aprovação irrestrita de scripts de dependências.

Comandos executados: npm install; npm run typecheck; npm run lint; npm test;
npm run build; node scripts/validate-foundation.mjs; npm run pack:verify.
Resultado: typecheck/lint/build PASS; 21 testes Vitest PASS. O smoke comparou
dois builds por SHA-256, executou npm pack e inspecionou arquivos de cada pacote.
Pacotes contêm somente package.json, README e dist (JS, tipos, CSS e JSON
necessário), sem React embutido, src de produtos, testes, segredos ou runtime.
O build verifica metafile para impedir React/React DOM no bundle.

### Consumidores por tarball

- React/DOM 19.2.8: C:\Users\evert\AppData\Local\Temp\nx-ds-002-consumer-jTPrpc; install/typecheck/build/browser PASS,
  instalação física sem symlink e resolução única de React/DOM; axe:0 violações.
- React/DOM 19.3.1: C:\Users\evert\AppData\Local\Temp\nx-ds-002-consumer-MFTTCG; install/typecheck/build/browser PASS,
  instalação física sem symlink e resolução única de React/DOM; axe:0 violações.

Chromium headless1.65.1: dark/light/aninhado, aliases, três roots independentes
com identifierPrefix, atributos, refs/eventos, normal/hover/active, teclado/Tab/Enter,
disabled/loading, labels/hint/error, foco sólido, reduced motion e forced colors.
Reflow320px sem overflow horizontal; nenhum request externo, warning ou erro
em runtime. Axe com tags wcag2a/wcag2aa/wcag21aa/wcag22aa, sem certificação
integral de acessibilidade. Validação documental preserva também os 56 pares
de contraste do guia. Não houve navegador assistido por IA.

### Tarballs finais

- @nexolira/tokens@0.1.0: C:\01-projetos\03-nexolira-design-system\.artifacts\nexolira-tokens-0.1.0.tgz
  SHA256: 00929c63ce78e70f971455c00bda0b77c7d82d00f506b45c3eb98c1dccbd88d8
  Arquivos inspecionados (8): README.md, dist/compiler.d.ts, dist/index.d.ts, dist/index.js, dist/styles.css, dist/styles.d.ts, dist/tokens.json, package.json.
- @nexolira/ui@0.1.0: C:\01-projetos\03-nexolira-design-system\.artifacts\nexolira-ui-0.1.0.tgz
  SHA256: 2a17fc19be014d5332dc66c8745e33420d2162b786a354c799e842c50195ba3b
  Arquivos inspecionados (13): README.md, dist/Badge.d.ts, dist/Button.d.ts, dist/Card.d.ts, dist/FormField.d.ts, dist/index.d.ts, dist/index.js, dist/Input.d.ts, dist/StatusMessage.d.ts, dist/styles.css, dist/styles.d.ts, dist/types.d.ts, package.json.

Relatório local regenerável: .artifacts/pack-smoke.json (ignorado no Git).
Os tarballs testados acima correspondem aos bytes finais de fonte/build.
Nenhuma publicação em registry, mudança em consumidores reais ou infraestrutura.

### Problemas encontrados e corrigidos

O consumidor revelou ausência de types no subpath CSS: corrigida nos dois
exports com styles.d.ts, sem wildcard genérico no consumidor. O harness foi
ajustado ao JSON de npm12 e a contexto explícito exigido por axe/Playwright.
Teste usa nome acessível do controle para desconsiderar marcador visual de
required. Cabeçalho false em Card permanece agrupamento div, com regressão.
As execuções finais acima passaram; nenhuma falha foi ocultada.

## Critérios de conclusão

- [x] Baseline/PR1 merge/contratos e allowlist confirmados.
- [x] Tokens, temas dark/light, aliases, ciclos, colisões e CSS isolado.
- [x] Biblioteca ESM/types e React/DOM externalizados/peers comprovados.
- [x] Button, Card/Panel, Badge, StatusMessage, Input e FormField.
- [x] Testes de comportamento, formulários, teclado e acessibilidade pertinente.
- [x] Typecheck, lint sem warnings, build e testes PASS.
- [x] npm pack de ambos, tarballs inspecionados e hashes registrados.
- [x] Consumidores fora dos workspaces: instalação/TS/render/CSS/build.
- [x] Ausência de React duplicado e dependências de aplicativos.
- [x] Documentação atualizada e nenhum consumidor real modificado.
- [x] Revisão do diff e evidências; um único PR aberto para revisão.

## Relatório obrigatório

```text
PROJECT: NEXOLIRA-DESIGN-SYSTEM
FRONT: DS
PARENT_TOPIC: NX-DS-002
TASK_STATUS: DONE — biblioteca local validada
PARENT_STATUS: PR_OPEN — técnico DONE; revisão e merge pelo usuário

REPOSITORY: EvertonLMsilva/nexolira-design-system — PRIVATE
WORKTREE: C:\01-projetos\03-nexolira-design-system; diretório principal próprio
BRANCH: codex/nx-ds-002-library-mvp
BASE_HEAD: 42d631659268c8241a7eb0f06c74066e27dd6a8f
FINAL_HEAD: headRefOid do PR #2; SHA final exato verificado na descrição do PR
GIT_STATUS: CLEAN e sincronizado com origin/codex/nx-ds-002-library-mvp no fechamento

SUBTOPICS_TOTAL: 8
SUBTOPICS_DONE: 8
SUBTOPICS_PARTIAL: 0
SUBTOPICS_PENDING: 0
SUBTOPICS_REMAINING: 0; revisão e merge pertencem ao usuário

TOKENS_STATUS: PASS — compilação, resolução, ciclos, colisões e aliases
THEMES_STATUS: PASS — Nexolira dark/light/aninhado e roots independentes
CSS_ISOLATION_STATUS: PASS — prefixos, sem reset global; browser confirma isolamento

REACT_LIBRARY_STATUS: PASS — ESM, exports explícitos, tipos, CSS e peers
COMPONENTS_IMPLEMENTED: Button, Card/Panel, Badge, StatusMessage, Input, FormField
COMPONENT_TESTS: PASS — suíte Vitest de 21 testes incluindo tokens
ACCESSIBILITY_TESTS: PASS nos cenários e tags documentados; 0 violações axe em cada consumidor, sem certificação integral

PACKAGE_NAMES: @nexolira/tokens; @nexolira/ui
PACKAGE_VERSIONS: 0.1.0; 0.1.0
BUILD_STATUS: PASS — reprodutível por hashes, pack e consumidor externo
TYPECHECK: PASS — fontes e ambos os consumidores
LINT: PASS — deny-warnings
TESTS: PASS — Vitest + Chromium em React/DOM19.2.8 e19.3.1

PR: https://github.com/EvertonLMsilva/nexolira-design-system/pull/2
MERGE_STATUS: NOT_EXECUTED — USER_ONLY_MERGE
BLOCKERS: NONE
LIMITATIONS: ESM/React19 exatos; sem React18/CJS/SSR/portais ou componentes complexos; não publicado nem adotado
NEXT_ACTION: usuário revisar PR #2 e decidir merge; adoção Frontend em task/PR próprios
```

Contrato de consumo: EvertonLMsilva/nexolira-frontend,
C:/01-projetos/04-nexolira-frontend. Usar ambos os tarballs e imports CSS
do README, respeitando o par React/DOM testado. Esse projeto não foi alterado.

## Fechamento Git

[PR #2 — NX-DS-002 — Biblioteca Funcional de Tokens e Componentes React](https://github.com/EvertonLMsilva/nexolira-design-system/pull/2)
aberto para main, sem draft e com autoMergeRequest=null. Nenhum merge foi
executado. Commit principal de implementação ff13deab716a70013939884063317daa547d9c9c;
commit documental posterior consolida estes registros. SHA final publicado na
descrição do PR para não autoembutir o SHA do commit neste próprio relatório.

Diff revisado: somente biblioteca, tooling, testes e documentação autorizados;
nenhum artefato gerado, credencial ou dado runtime incluído no Git.
AGENTS, Style Guide e documentos/evidências NX-DS-001 permaneceram inalterados.
Repositório privado; nenhuma publicação em registry ou adoção de consumidor real.

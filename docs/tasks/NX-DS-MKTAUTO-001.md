# NX-DS-MKTAUTO-001 — Evolução orientada pela D19

PROJECT: NEXOLIRA-DESIGN-SYSTEM
FRONT: DS
PARENT_STATUS: DRAFT_REVIEW
TECHNICAL_STATUS: PASS_LOCAL
BRANCH: codex/nx-ds-mktauto-001
BASE_HEAD: 343b4a57107aea670112a9afdf8af9c2ea8d7635

## Baseline e ownership

2026-11-26: diretório principal C:/01-projetos/03-nexolira-design-system limpo;
branch do tópico já existente no mesmo HEAD de origin/main, sem worktree extra.
PR #2 confirmado MERGED em 2026-11-18T17:17:41Z, mergeCommit343b4a5.
Pacotes tokens/UI0.1.0, peers React/DOM19.2.8 ou19.3.1. Apps/docs ainda é
apenas preparação documental; compilador admite apenas dois modos Nexolira.

READ: prompt aprovado, AGENTS e governança, contratos/estilos/arquitetura,
fontes/manifests/testes/tooling do DS; ZIP e HTML D19 em Downloads.
CREATE/MODIFY: packages/{tokens,react}/**, apps/docs/**, scripts/**, test/**,
package.json/lock, tsconfig/configs necessárias, docs/architecture/**,
docs/audit/NX-DS-MKTAUTO-001/**, docs/tasks/NX-DS-MKTAUTO-001.md,
docs/integration/**, README/arquitetura/decisões/roadmap/histórico.
Ownership desta execução: somente arquivos novos/alterações necessárias nesse escopo.
Não alterar AGENTS, histórico das tasks anteriores ou consumidores.
Extração e tarballs em .artifacts ignorado. Quatro capturas do catálogo local acompanham o PR. Sem subagentes,
CUA, publicação, alteração de visibilidade ou merge.

## Referências verificadas

ZIP Downloads/MKTauto_Sprint5_Prototipo_Programacao_D19.zip
SHA2561654dc4d6d741c4f457ac4e0235d889aa347d2dbf3bca38466be72aac6c06a31
HTML Downloads/MKTauto_Sprint5_Prototipo_Programacao_D19.html
SHA25651c16ae74cf100e0e0740f6b737273ffe9eccf47355b8630d3b31b328e578f7c
Extração validou confinamento de paths. CSS e os dez scripts do ZIP estão
embutidos exatamente no HTML independente; referências correspondem.
EVIDENCIA-D19 identifica programação contextual e precedência sobre D18.
Inventário/mapa carregam seções históricas; prevalecem HTML/scripts atuais e
atualizações D19. Os resultados de QA do ZIP são evidência fornecida, não
testes executados nesta task. Código/estilos serão novos; não copiar scripts
de domínio ou assets. Paleta e comportamentos são referência autorizada.

## Tasks e gates

| Task | Entrega | Status |
|---|---|---|
|01|Auditoria completa e matriz rastreável|VALIDADO|
|02|Tema MKTauto e compilador extensível|VALIDADO|
|03|Controles/formulários necessários|VALIDADO|
|04|Layout/navegação/overlays|VALIDADO|
|05|Dados/mídia/estados|VALIDADO|
|06|Catálogo local e composições|VALIDADO|
|07|QA/reflow/contraste/regressão|VALIDADO|
|08|Versão/tarballs/consumidor externo/guia|VALIDADO|
|09|Revisão independente e PR Draft|Parecer e commit revisado no PR|

## Reconciliação da branch

Duas execuções gravaram inicialmente no mesmo checkout. A outra sessão registrou sua interrupção em 26/11. A coordenação confirmou a ausência de novas gravações, comparou as fontes e reuniu os dois conjuntos de componentes. A implementação final possui um compilador, uma superfície de diálogo, uma implementação para cada campo e uma tabela nativa. Os controles de foco, o contrato por grupo, os slots de navegação e a paleta das duas sessões foram preservados nas APIs e nos testes correspondentes.

## Evidências técnicas

| Critério | Resultado local |
|---|---|
| Fontes D19 | [Inventário dos scripts, menu e evidências](../audit/NX-DS-MKTAUTO-001/references.json) e [matriz funcional e visual](../audit/D19-mapeamento.md) |
| Versão e API | Tokens e UI 0.2.0. [Contrato público](../../packages/react/CONTRACTS.md) e [migração do consumidor](../integration/MKTauto.md) |
| Build e tipos | npm run typecheck, build, catalog:build e lint. Dois builds idênticos em pack:verify |
| Testes de componentes e tokens | npm test: 26 testes aprovados. Cobertura da API antiga, valores resolvidos da 0.1.0, formas nativas, navegação e estados |
| Instalação | Pares React/DOM 19.2.8 e 19.3.1. Tarballs reais fora do workspace, sem symlink, uma cópia de React |
| Responsividade | Chromium, 320, 390, 768, 1024 e 1440 px por modo MKTauto e por par de peers. Rolagem horizontal da página conferida |
| Acessibilidade | Axe em desktop/mobile e em overlays. Teclado, Tab/Shift+Tab, Escape, retorno do foco, fundo inerte nativo, portal, forced colors e movimento reduzido. Zero violações nas verificações automatizadas executadas |
| Estilos | 140 pares obrigatórios aprovados. Menor razão de texto 5,6934:1. Menor razão de foco/borda 3,9949:1. [Pares e superfícies](../audit/contrast.json) |
| Distribuição | [Hashes, arquivos dos pacotes e evidências por consumidor](../audit/NX-DS-MKTAUTO-001/pacotes.json). Tarballs locais em .artifacts. Dependência de UI fixa tokens em 0.2.0 |
| Limites | As evidências cobrem o catálogo e os consumidores descartáveis no Chromium. Dispositivos físicos, leitores de tela humanos e adoção em produção exigem validação própria |
| Revisão e merge | O PR Draft registra o parecer sobre o commit identificado. O merge é reservado ao proprietário |

[Desktop claro](../audit/NX-DS-MKTAUTO-001/catalog-light-1440.png) · [Desktop escuro](../audit/NX-DS-MKTAUTO-001/catalog-dark-1440.png) · [Mobile claro](../audit/NX-DS-MKTAUTO-001/catalog-light-320.png) · [Mobile escuro](../audit/NX-DS-MKTAUTO-001/catalog-dark-320.png)

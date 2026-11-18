# Versionamento e distribuição local

Nomes propostos: @nexolira/tokens e @nexolira/ui. O workspace docs é interno.
Manifests atuais 0.0.0/private/UNLICENSED são scaffolds, não releases publicadas.
Escolher licença do próprio projeto e validar direitos de qualquer fonte
reaproveitada antes da distribuição; acesso local ao código não é licença.

## SemVer

Política baseada em [SemVer 2.0.0](https://semver.org/):

| Tipo | Exemplos | Obrigação |
|---|---|---|
| PATCH | Bug compatível, correção de foco/contraste sem quebrar contrato | Evidência dos pares/estados e regressão relevante |
| MINOR | Componente/variante opcional, token novo compatível | Documentação e compatibilidade anterior |
| MAJOR | Remoção/rename, nova prop obrigatória, semântica alterada, tema/escopo/unidade incompatíveis | Guia de migração, consumidores afetados e aceite específico |

Durante pré-release, registrar quebra explicitamente; não usar 0.x para esconder
mudanças. Primeiro lançamento poderá ser 0.1.0 com contrato declarado.
Coordenar versões de tokens/UI no início, com changelog conjunto. Definir peer
range e dependências compatíveis por evidência; não acoplar atualização automática.
Remoção de alias obsoleto só após janela de migração documentada.

## Gate NX-DS-002

1. Selecionar menor fatia útil: tokens + Button/Card/feedback como candidatos,
   alinhando consumo concreto do PLAT-008 atualizado.
2. Definir tooling local mínimo, licença, exports/types/files, sideEffects de CSS,
   targets e peers. Instalar dependências e registrar lockfile.
3. Build local sem serviços externos; validar declarações públicas.
4. Executar npm pack e inspecionar cada tarball: conteúdo permitido, CSS/types,
   sem src de produtos, testes privados, segredos, node_modules ou React embutido.
5. Instalar tarballs em consumidor DESCARTÁVEL independente do workspace.
   Verificar TS, build, render, CSS, tema, teclado e árvore de dependências.
6. Só então declarar pacote consumível LOCALMENTE. Registrar versões,
   hashes dos tarballs, comandos e limitações. Publicação exige outra decisão.

Instalação de desenvolvimento por workspace/file não substitui prova com tarball;
sinlinks podem mascarar arquivos ausentes ou dependências transitivas.
Não atualizar aplicações reais no smoke. O consumidor controla sua versão e
lockfile. Registry/cloud não são necessários; não publicar ou criar remoto sem
autorização correspondente.

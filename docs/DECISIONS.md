# Decisões

| ID | Decisão | Evidência e consequência |
|---|---|---|
| DS-001 | Repo independente, LOCAL FIRST | Produtos têm repositórios e domínios distintos; nenhuma agregação de código. |
| DS-002 | npm workspaces simples | Três unidades internas; sem justificativa para Nx/Turbo. |
| DS-003 | Fundação privada sem exports | Evita confundir contrato com pacote utilizável; pack/build ficam no NX-DS-002. |
| DS-004 | Prefixo nx e tema por contêiner | Referências usam :root e nomes genéricos; adaptação necessária para coexistência. |
| DS-005 | Nexolira dark inicial e light de referência | PLAT-008 sugere superfícies sóbrias azul/ciano; contraste medido antes de adotar. |
| DS-006 | MKTauto/Market Direction como temas candidatos | Identidades existentes preservadas; não copiar tema completo nem fonte remota. |
| DS-007 | Separar ação e navegação | NeonButton importa react-router; Button central será nativo, adaptador pertence ao consumidor. |
| DS-008 | Não extrair módulos de domínio | ui.tsx PLAT-008 importa ApiError/useResource; Status mapeia decisões de negócio. |
| DS-009 | Sem cópia de fonte nesta etapa | Nenhuma licença de redistribuição localizada nas raízes auditadas; reuso de código permanece condicionado. |
| DS-010 | React 19 como primeiro alvo proposto | Manifests locais observados usam React 19; peers exatos exigem testes no NX-DS-002. |
| DS-011 | Um tópico, uma branch, um PR sem merge | Usuário autorizou remoto privado em 2026-11-18; repositório privado criado e base main estabelecida; fechamento via GitHub local autenticado. |
| DS-012 | SemVer e atualização voluntária | Mudanças visuais afetam consumidores; registrar compatibilidade e migração. |

Estas decisões aprovam a direção desta fundação local; não autorizam publicação,
alterações nos produtos ou aceite operacional de bibliotecas futuras.

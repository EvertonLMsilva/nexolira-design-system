# Nexolira Design System

Fundação local do NX-DS-001: auditoria, linguagem visual, contratos e governança
para uma biblioteca independente. **Ainda não é uma biblioteca instalável.**

- [Task e aceite](docs/tasks/NX-DS-001.md)
- [Relatório final verificável](docs/tasks/NX-DS-001-REPORT.md)
- [Auditoria e matriz](docs/audit/AUDIT.md)
- [Style Guide](docs/STYLE_GUIDE.md)
- [Arquitetura](docs/ARCHITECTURE.md)
- [Tokens](docs/architecture/TOKEN_CONTRACT.md)
- [Temas](docs/architecture/THEMES.md)
- [Catálogo priorizado](docs/architecture/COMPONENT_CATALOG.md)
- [Contratos React](packages/react/CONTRACTS.md)
- [Distribuição local](docs/architecture/DISTRIBUTION.md)
- [Roadmap](docs/TOPIC_ROADMAP.md)

## Estrutura

| Caminho | Finalidade atual |
|---|---|
| packages/tokens | Contrato e referência pequena, validável, de tokens/CSS |
| packages/react | Contratos React; nenhuma implementação |
| apps/docs | Especificação do catálogo local futuro |
| docs | Auditoria, arquitetura, decisões, task, templates e evidências |
| scripts | Validação local da fundação, sem dependências externas |

npm workspaces organiza apenas os três diretórios acima; não agrega aplicações.
Manifests são privados, versão 0.0.0, sem exports ou entradas de distribuição.
Os nomes @nexolira/tokens e @nexolira/ui são propostas, não pacotes publicados.

## Validar offline

Requer Node local (referência da execução registrada no relatório).
Não requer instalação, serviços, backend ou acesso à rede.

```text
node scripts/validate-foundation.mjs
node scripts/validate-foundation.mjs --check-references
```

O segundo comando consulta somente metadados Git e hashes das referências
auditadas nos caminhos locais registrados. É uma checagem opcional de preservação,
não dependência para desenvolver a biblioteca.

Não há comandos de build, publicação ou servidor nesta etapa. O próximo tópico
deve provar build, npm pack e instalação em consumidor descartável.


Comece pelo [Style Guide](docs/STYLE_GUIDE.md), pela
[matriz de reaproveitamento](docs/audit/REUSE_MATRIX.csv) e pelo
[relatório completo NX-DS-001](docs/tasks/NX-DS-001-REPORT.md).

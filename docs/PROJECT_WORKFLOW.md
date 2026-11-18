# Fluxo do projeto

1. Ler AGENTS, task e referências dirigidas. Confirmar Git, destino e ownership.
2. Registrar READ/CREATE/MODIFY, baseline e evidências preexistentes; preservar
   mudanças alheias. Uma branch e, quando possível, um PR por tópico-pai.
3. Auditar antes de reutilizar. Verificar dependências, licença e acessibilidade.
4. Implementar somente escopo autorizado; documentação junto da alteração.
5. Rodar validação proporcional ao risco. Fundação documental: links, estrutura,
   contratos, tokens, contraste e diff. UI futura: comportamento/teclado/estados;
   distribuição: build/pack/consumidor descartável.
6. Atualizar task, roadmap e histórico com resultados verificáveis e limitações.
7. Revisar diff, segredos, artefatos e consumidores. Commit/push/PR conforme
   autorização e remoto válido; nunca merge automático.

Sem remoto autorizado: manter resultado local revisável, registrar ausência de
integração Git e solicitar criação/visibilidade somente após entrega concreta.
Se o remoto vier vazio, criar baseline real na branch base antes de abrir
a branch/PR do tópico. Não abrir PR sem diferença e base válidas.
Não inferir inexistência ou visibilidade pelo retorno 404.

DONE técnico não significa merge, publicação, adoção ou homologação.
PARTIAL conserva o trabalho e lista critérios restantes. Retomar no mesmo tópico.
Não executar próximo tópico automaticamente.

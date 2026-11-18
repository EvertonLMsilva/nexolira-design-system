# Temas independentes

Identidade (data-nx-theme) e modo (data-nx-mode) são dimensões separadas.
Referência implementada: nexolira dark/light em CSS e JSON, sem React.
Candidatos mktauto e market-direction: apenas mapeamento de direção nesta etapa.

| Tema | Fonte | Direção | Gate |
|---|---|---|---|
| nexolira | PLAT-008 local + contraste próprio | Superfícies sóbrias, azul/ciano, dark inicial | Referência estática validada; UI ainda pendente |
| mktauto | tokens.css no commit auditado | Neon, painéis escuros, botões com gradientes | Confirmar licença, adaptar escopo e testar estados sem alterar produto |
| market-direction | frontend React no commit auditado | Análise, neutros escuros, acento verde | Remover dependência de fonte externa no novo tema, validar foco e contraste |

Não usar atributos dos temas candidatos como se já fossem implementados.
MKTauto mantém identidade atual até migração voluntária em tarefa própria.
Cores de trading, ganhos/perdas e decisões comerciais não integram o tema base.

## Seleção e isolamento

Exemplo de contrato HTML, não catálogo executável:

```html
<div class="nx-scope" data-nx-theme="nexolira" data-nx-mode="dark">
  <!-- aplicação A -->
  <section class="nx-scope" data-nx-theme="nexolira" data-nx-mode="light">
    <!-- aplicação B: árvore React independente permitida -->
  </section>
</div>
```

CSS não exige ThemeProvider. O host da aplicação escolhe tema explícito;
preferência do sistema é opcional, resolvida pelo consumidor. Sem script que
altera document.documentElement ou sincroniza todos os produtos.
A herança ocorre dentro do host. Cada host de tema reemite primitivos,
semânticos e aliases de componente; sair do host encerra o contrato visual.
Default seguro é .nx-scope dark. Tema desconhecido não comprova compatibilidade;
selecionar tema conhecido antes de renderizar UI.

## Portais e sobreposições futuras

Modal, Dialog, Drawer, Toast e Tooltip podem sair da árvore DOM do host.
Preferir portalContainer dentro do host. Se for necessário outro nó, esse nó
deve receber o mesmo tema, modo e overrides sem copiar segredos/estado React.
Não presumir que provider/contexto propaga CSS através de portal para body.
Validar nested dialogs, retorno de foco, inert e empilhamento no tópico de UI.

Classes nx-* e variáveis --nx-* reduzem colisão com aplicações. Duas versões
incompatíveis do MESMO Design System ainda podem colidir se carregarem CSS
com os mesmos seletores: evitar misturar majors no mesmo documento; host coordena
versão. Shadow DOM ou namespace por major requer decisão futura, não está
implementado nem garantido por prefixo.

## Overrides e aceite

Trocas no próprio host, documentadas e testadas, sem !important.
Sempre revalidar texto, controles, foco, disabled e estados no novo par.
Foco tem geometria consistente, cor de tema, separação da superfície e não
depende de neon. Temas devem preencher o contrato semântico completo.

No NX-DS-002, testar tema lado a lado/aninhado, reset de aliases, ordem CSS,
portais, ausência de vazamento, reflow e movimento reduzido em testes locais.
A referência atual valida estrutura/contraste; não substitui ensaio no navegador.

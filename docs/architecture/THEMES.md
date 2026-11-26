# Temas e isolamento

A versão 0.2.0 exporta quatro combinações. O host `.nx-scope` inicia em Nexolira escuro. `data-nx-theme` seleciona `nexolira` ou `mktauto` e `data-nx-mode` seleciona `light` ou `dark`. O consumidor decide se a escolha segue a preferência do sistema, uma escolha explícita ou o contexto da tela. Market Direction permanece uma proposta futura.

```html
<div class="nx-scope" data-nx-theme="nexolira" data-nx-mode="light">
  <section class="nx-scope" data-nx-theme="mktauto" data-nx-mode="dark"></section>
</div>
```

Cada host reemite os tokens primitivos, semânticos e de componente. A paleta Nexolira da 0.1.0 é verificada contra os valores resolvidos da versão anterior. O compilador aceita identidades com nomes minúsculos, números e hífen, exige o par de modos e valida as mesmas chaves semânticas em todos os temas. O modelo 0.1.0 também pode ser compilado. O contrato permanece independente de React.

Dialog e Drawer usam a camada modal nativa dentro do host por padrão. Para um portal, forneça um `portalContainer` descendente do host ativo, ou um contêiner com os mesmos atributos e overrides. A herança CSS segue a posição do nó no DOM. O exemplo de confirmação do catálogo e o ensaio de consumidor verificam o fundo calculado do diálogo nos dois modos.

Importe primeiro o CSS de tokens e depois o de UI. Use uma versão coordenada dos dois pacotes por documento. [Valores de identidade e contraste](../STYLE_GUIDE.md) · [Guia de consumo](../integration/MKTauto.md)

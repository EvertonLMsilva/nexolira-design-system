# Tokens — referência de contrato

[Contrato](../../docs/architecture/TOKEN_CONTRACT.md) e
[temas](../../docs/architecture/THEMES.md) são normativos para a fundação.
reference/tokens.json é o modelo neutro; reference/tokens.css é sua projeção
CSS determinística. Não há export público, build ou pacote distribuível.

CSS declara somente custom properties no contêiner data-nx-theme="nexolira".
Oferece referência dark e light; nenhuma regra altera elementos externos.
Alterar JSON exige regenerar a projeção via
`node scripts/validate-foundation.mjs --write-css` a partir da raiz e validar.

A propriedade private impede publicação acidental. Licença de distribuição ainda
não escolhida; UNLICENSED não concede licença de código de terceiros.

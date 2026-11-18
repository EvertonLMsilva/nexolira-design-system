# @nexolira/tokens 0.1.0

Pacote ESM privado para distribuição local por tarball. Código novo,
UNLICENSED; não há publicação em registry ou licença aberta presumida.

Entradas: @nexolira/tokens (tokens, resolvedTokens, compileTokens, resolveToken,
cssName e tipo TokenModel); @nexolira/tokens/styles.css; @nexolira/tokens/tokens.json.
Instale o tarball com npm install /caminho/nexolira-tokens-0.1.0.tgz.
Importe o CSS explicitamente. Use .nx-scope ou data-nx-theme="nexolira" no host;
data-nx-mode="light" seleciona light, dark é default. Sem reset global.
Cada fronteira reemite aliases para permitir temas aninhados.

Fonte neutra reference/tokens.json; o build valida aliases, ciclos, colisões e
camadas antes de gerar dist. Node 24.22.1 usado no build; runtime JS ESM ES2022.
O pacote não depende de React. Nenhum tema de produto foi copiado.

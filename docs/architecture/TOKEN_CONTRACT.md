# Contrato de tokens — draft 0.1

## Modelo neutro

reference/tokens.json usa mapas de strings, aliases {chave} e três camadas.
Formato local explícito, sem alegar compatibilidade DTCG ou pacote publicado.
schemaVersion identifica o contrato; draft=true impede tratá-lo como API estável.
A projeção CSS é determinística e verificada pelo validador local.

| Camada | Exemplo lógico | CSS |
|---|---|---|
| Primitivo | primitive.color.slate.950 | --nx-primitive-color-slate-950 |
| Semântico | color.background | --nx-color-background |
| Semântico | color.text.primary | --nx-color-text-primary |
| Semântico | color.action.primary | --nx-color-action-primary |
| Componente | button.primary.background | --nx-button-primary-background |

Chaves minúsculas separadas por ponto, segmentos alfanuméricos/hífen; projeção
substitui pontos por hífens. Colisões da projeção são erro. Valores em rem para
tamanho/espaço, ms para duração; cores sRGB opacas #rrggbb no conjunto medido.
Primitivos têm valores literais; semânticos referenciam primitivos/semânticos;
componentes referenciam semânticos. Não permitir ciclo ou referência indefinida.

## Categorias e mínimo obrigatório

Cor: background, surface, surface.raised, primary, secondary, accent,
text.primary, text.muted, text.on-primary, text.on-secondary, border.default,
border.subtle, action.primary e seus estados hover/active, status.success,
status.warning, status.error, status.info, disabled.text, disabled.surface,
focus e overlay.

Dimensão: space.1/2/3/4/5/6/8/10/12, radius.sm/md/lg/pill, border.width,
control.height. Tipo: font.family.sans/mono, font.size.sm/md/lg/xl,
font.weight.regular/semibold, line.body/heading.
Movimento: duration.fast/normal e ease.standard. Forma: shadow.raised,
focus.width/offset. Tokens adicionais definidos no guia são candidatos,
não novos aliases implementados sem referência no JSON.

O conjunto inicial de componente limita-se a button.primary.background,
button.primary.text, input.border.focus, card.background e modal.overlay.
Não criar famílias inteiras para componentes sem implementação/uso comprovado.

## Defaults, variações e sobrescrita

.nx-scope estabelece defaults Nexolira dark e todos os aliases.
data-nx-theme="nexolira" também estabelece esse conjunto sem classe. A identidade mktauto está disponível com os dois modos. Os papéis color.sidebar.* e color.selected.* existem em todos os pares.
data-nx-mode="light" no mesmo host seleciona a variação light; ausência indica
dark. Modos desconhecidos não são suportados e recebem a base dark.
Todo novo tema precisa fornecer o mesmo conjunto semântico. Nenhum depende
de variável genérica ou valor definido em outro repositório.

Reatribuir TODOS os aliases em cada fronteira, inclusive component tokens;
aliases herdados podem carregar valores já calculados do ancestral.
O protótipo CSS materializa o contrato e não afeta :root/html/body.

Overrides de semânticos: declarar no próprio host, em folha carregada depois e
com especificidade suficiente; testar contraste e tema aninhado. Alterar um
primitivo em descendente sem reemitir semânticos não é estratégia suportada.
Override de componente é exceção local documentada, não patch global.
Não usar hex dentro de cada componente; selecionar intenção semântica.
Quebras e composição de media queries permanecem em CSS, sem tentar var()
em condições de @media. Registrar valores de breakpoint no guia.

## Compatibilidade e evolução

Remover/renomear token, mudar tipo/unidade, significado, regra de escopo ou
semântica de tema é alteração incompatível. Alias de compatibilidade tem prazo
documentado e testes; não sumir silenciosamente. Adições compatíveis são MINOR;
correção de valor dentro do contrato e acessibilidade preservada pode ser PATCH.
Troca de identidade ou contraste/layout incompatível exige MAJOR mesmo sem rename.

Os pacotes tokens e UI usam a versão coordenada 0.2.0. O smoke instala os tarballs exatos em consumidores separados.
[Política de distribuição](DISTRIBUTION.md).

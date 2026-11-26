# Contraste — método e limites

A validação calcula luminância relativa sRGB e razão (Lmaior+0.05)/(Lmenor+0.05).
Resultados reproduzíveis em contrast.json. O cálculo dos pares opera sobre os tokens resolvidos. O ensaio de navegador consta na task da versão.
O gate da referência verifica texto primário/auxiliar/estados sobre três
superfícies, texto das ações normal/hover/active e secundária: mínimo 4.5:1.
Foco e borda funcional contra as três superfícies: mínimo 3:1.

Limiares baseados em [WCAG texto](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
e [WCAG contraste não textual](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).
Separador sutil é decorativo: não pode ser único limite de um input.
Disabled não é usado como prova de conformidade; manter motivo disponível.
Focus precisa afastamento de3px contra superfície; a medição não autoriza
anel diretamente encostado em qualquer preenchimento de ação.

Comparações das fontes auditadas são DIAGNÓSTICO, não gate do novo tema:

- MKTauto on-primary branco contra token primário #008cff; o botão real usa
  gradiente distinto. Avaliar endpoints normal/hover, sem afirmar contraste
  do gradiente completo a partir desses pontos.
- MD ring: #00e699 com alfa28% composto sobre #1c202b, comparado à mesma
  superfície. Expõe o risco de substituir outline por brilho translúcido.
- NX-WIP muted #94a3b8 e border #253244 sobre surface #141e2b:
  contraste de leitura e identificação do controle são critérios distintos.

O JSON identifica pares, limiar e razão sem arredondar para decidir PASS.
A referência só é aceita se todos os pares de gate passarem.
Não comprova acessibilidade de componentes ainda inexistentes.


## Resultados da versão 0.2.0

Os 140 pares obrigatórios incluem as duas marcas e ambos os modos. A menor razão textual medida foi 5,6934:1 e a menor razão de foco/borda foi 3,9949:1. O JSON inclui cinco diagnósticos históricos fora do gate.

## Fundação 0.1.0

Os 56 pares do conjunto Nexolira dark/light passaram: menor razão textual
5.9078:1; menor razão de foco/borda funcional 3.9949:1. Isso valida apenas
esses pares sobre as superfícies especificadas, sem certificar a futura UI.

Diagnósticos das fontes: branco sobre o token #008cff resulta 3.3897:1,
mas o botão real usa gradiente. O endpoint inicial do gradiente normal
#0875dd resulta 4.5663:1; o endpoint inicial de hover #0879e2 resulta
4.3357:1. A borda #253244 sobre #141e2b do PLAT-008 resulta 1.2944:1
(ver valor exato em contrast.json). O foco verde de 28% do Market Direction
composto sobre #1c202b resulta 1.9304:1 (ver valor exato no JSON). Esses
casos justificam avaliar contraste e foco antes de extrair estilos; nenhum
produto foi corrigido nesta task. Gradientes completos e posição real do
texto/foco precisam de avaliação própria antes de concluir falha de toda a UI.

# Style Guide Nexolira 0.2

Direção normativa para evoluir o Design System; não é certificação da UI existente.
Referências e limitações estão na [auditoria](audit/AUDIT.md); valores executáveis
do conjunto inicial em [tokens](../packages/tokens/reference/tokens.json).

## Identidade MKTauto

| Papel | Claro | Escuro |
|---|---|---|
| Canvas | #f2f4f8 | #101725 |
| Superfície / elevada | #ffffff / #f7f8fb | #182235 / #202c42 |
| Texto / auxiliar | #172238 / #52617a | #edf2fd / #a8b5cf |
| Ação / foco | #244bf1 / #244bf1 | #89a2ff / #aebfff |
| Borda funcional / decorativa | #64748b / #dfe5ee | #8091ae / #314058 |
| Sucesso / atenção / erro | #116647 / #795111 / #9a3d37 | #9ce1b9 / #f6d78c / #ffb6b2 |
| Fundo da sidebar | #ffffff | #0b1322 |

Use os papéis semânticos `color.sidebar.*` e `color.selected.*` em navegação e seleção. O link atual inclui `aria-current` e um indicador de borda. Ações principais têm texto legível em repouso, hover e pressão. O raio médio do MKTauto é 0,875rem. O ponto de mudança de navegação do catálogo é 900px. Em telas estreitas, controles e rodapés de ações quebram linha, e tabelas rolam na região identificada.

[Comparar os temas e interagir com os controles](../apps/docs/README.md) · [Contraste medido](audit/contrast.json)

## Identidade e hierarquia

Interface administrativa profissional, tecnológica e sóbria. Informação e ação
precedem decoração. Dark é a direção inicial do Portal; light prova que contratos
não exigem fundos escuros. Azul identifica ação; ciano destaca foco e informação
secundária. Neon, brilhos e gradientes não são requisitos compartilhados.

Manter título, descrição, ação principal e feedback distinguíveis. Uma ação
principal por agrupamento. Densidade padrão com alvos de 44px; variantes compactas
só depois de validar teclado, toque e leitura. Não transformar todo painel em botão.
Tabelas preservam cabeçalhos, alinhamento e estado de ausência de dados.

## Cores e intenção

| Papel | Dark Nexolira | Light Nexolira | Uso |
|---|---|---|---|
| Background | #0e1520 | #f6f8fc | Canvas do contêiner |
| Surface | #141e2b | #ffffff | Cards e controles |
| Surface raised | #192534 | #edf2f8 | Sobreposição local |
| Primary | #6fa6ff | #1d4ed8 | Ação principal |
| Secondary | #243b53 | #e2e8f0 | Ação secundária |
| Accent | #6edee0 | #005a78 | Destaque discreto |
| Text primary | #e5eaf1 | #172334 | Texto de leitura |
| Text muted | #b3c0d1 | #485b73 | Auxiliar e labels |
| Border default | #71839a | #61748e | Limite necessário de controles |
| Border subtle | #253244 | #d6deea | Separador decorativo |
| Success | #77e0b5 | #116842 | Resultado positivo explícito |
| Warning | #f3c969 | #7a4b00 | Atenção com contexto |
| Error | #f6a4a8 | #a82432 | Falha ou recusa explicada |
| Info | #8ac5ff | #165b95 | Informação |
| Disabled text/surface | #9aa9bd / #243144 | #61748e / #e2e8f0 | Indisponível com motivo |
| Focus | #6edee0 | #005a78 | Contorno sólido com afastamento |
| On primary | #0e1520 | #ffffff | Texto no botão primário |

Hover/active primário: dark #8ab8ff / #5792f0; light #1e40af / #1e3a8a.
On secondary: dark #e5eaf1; light #172334. Selected: usar superfície secundária,
texto primário, borda e sinal textual/aria-current; não depender apenas de cor.

A base dark aproveita a neutralidade do PLAT-008 local, com borda funcional e
texto auxiliar reforçados. MKTauto permanece referência de identidade neon;
Market Direction permanece referência analítica verde. Nenhuma paleta foi
elevada automaticamente a padrão do ecossistema.

As combinações permitidas estão medidas em [contraste](audit/CONTRAST.md).
Usar pelo menos 4.5:1 para texto comum, 3:1 para texto grande e informação visual
necessária dos controles. Borda decorativa não identifica sozinha campos/foco.
[Texto — W3C](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html);
[contraste não textual — W3C](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).
Overrides exigem revalidar os pares; uma cor isolada não é acessível por definição.

## Tipografia

Pilha local: system-ui, "Segoe UI", Arial, sans-serif. Mono:
ui-monospace, "Cascadia Code", Consolas, monospace. Sem download obrigatório.
Nenhuma fonte/ícone externo foi copiado ou licenciado por esta entrega.

Escala rem: xs .75; sm .875; md 1; lg 1.125; xl 1.5; 2xl 2.
Body 1rem/1.5, auxiliar e labels .875rem/1.5; headings 1.25 de line-height.
Pesos: regular 400, medium 500, semibold 600, bold 700. H1 2rem, H2 1.5rem,
H3 1.125rem. Não usar uppercase prolongado nem espaçamento excessivo em leitura.
Não impor fonte/tamanho ao body da aplicação; aplicar somente no host.

Valores comparáveis usam tabular-nums e alinhamento à direita; moeda, unidade,
precisão e localidade pertencem ao produto. Não expor dado ausente como zero.
Labels visíveis, auxílio separado de placeholder e erro associado ao controle.

## Espaçamento, grade e containers

Base 4px em rem: 1=.25; 2=.5; 3=.75; 4=1; 5=1.25; 6=1.5; 8=2;
10=2.5; 12=3. A escala difere do MKTauto em space-5/6/8; nunca renomear
mecanicamente tokens sem comparar valores.

Padding de campo .75rem 1rem; card 1.5rem; gap de formulário 1rem;
seções 2rem. Gutter 1rem no pequeno e 1.5–2rem no amplo.
Container de leitura até 48rem; administrativo até 90rem, sempre max-width:100%.
Grade com minmax(0,1fr); colunas quebram conforme conteúdo, sem JS para viewport.
Verificar 320 CSS px, zoom e texto longo; tabela pode ter rolagem horizontal
local com identificação acessível, nunca rolagem involuntária da página.

## Formas, foco e elevação

Raio sm .5rem; md .75rem; lg 1rem; pill 999px. Borda 1px sólida.
Sombras discretas: nível 0 sem sombra, nível 1 card opcional, nível 2 overlay;
não usar brilho para comunicar estado. Modal/Drawer futuros exigem contrato
de empilhamento local, sem z-index global arbitrário.

Foco: outline sólido 2px, offset 3px, com separação da superfície adjacente.
Garantir que não seja cortado por overflow ou coberto por conteúdo sticky.
Não remover outline sem equivalente; conferir forced-colors no NX-DS-002.

## Interações

- Hover: variar superfície/borda sem deslocar conteúdo; não esconder informação.
- Focus: independente de hover e selected; navegação por teclado com ordem lógica.
- Active: pequena mudança de cor, sem deslocamento obrigatório.
- Disabled: atributo nativo quando aplicável e motivo disponível; não simular só
  com opacity. Link não tem disabled: consumidor deve escolher conteúdo adequado.
- Loading: rótulo preservado, aria-busy, feedback textual e prevenção de repetição;
  definir política de foco antes da implementação.
- Error/success: texto e contexto; erro crítico pode anunciar alert; atualizações
  normais usam status/polite. Badge estático não cria live region.
- Selected: aria-current em navegação; aria-selected apenas no padrão apropriado.

## Movimento

Fast 140ms; normal 200ms; easing cubic-bezier(.2,0,.2,1).
Animações decorativas opcionais, sem loop obrigatório ou flashes.
prefers-reduced-motion remove movimento não essencial no escopo nx; manter
indicador textual de loading. Respeitar preferência sem alterar elementos externos.

## Temas e responsabilidade

Princípios, semântica, foco e contratos são compartilhados. Cor de marca,
gradientes e elevação são controlados por tema. Ícones do produto, navegação,
trading, sessão, licenças e quotas continuam no consumidor. Não atribuir tom de
sucesso a autorização ainda não verificada.

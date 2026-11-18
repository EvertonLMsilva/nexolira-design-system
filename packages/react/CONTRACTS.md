# Contratos React — proposta de fundação

Alvo inicial proposto: React 19; manifests auditados usam 19.3.1 (MKTauto e Portal
local) e 19.2.8 (Market Direction). São versões OBSERVADAS nos arquivos locais,
não recomendação de versão atual do registry. Não há suporte publicado comprovado.

No NX-DS-002, React e React DOM serão peer dependencies conforme o uso do pacote,
e devDependencies somente para desenvolver/testar. Bundler deve externalizar
react, react-dom e subpaths, incluindo react/jsx-runtime.
Definir range somente após testar versões reais; não alegar suporte a React 18.

## APIs e composição

Estender atributos nativos TypeScript por elemento, omitindo conflitos como size
quando houver escala visual. Evitar booleanos redundantes, props polimórficas
universais e asChild sem necessidade concreta. children usa ReactNode, eventos
usam assinaturas nativas, className é aditiva sem apagar classe nx do componente.

Button é button. Links usam elemento a ou adaptador externo do router;
nenhuma dependência react-router entra no núcleo.
Ref expõe nó DOM, não implementação interna. Para o alvo 19, ref pode ser prop;
se suporte a versões antigas for decidido, reavaliar forwardRef e testar.
[Documentação oficial React](https://react.dev/reference/react/forwardRef).

Variantes expressam intenção, tamanho sm/md/lg e estado separado de tema.
Não receber valores como LICENSED ou QUOTA_ALLOWED para decidir visual.
Não capturar estado de negócio, fetch, auth, form schema de serviços ou retry
automático. Aceitar dados/conteúdo e callbacks controlados do consumidor.

Render props controladas são aceitáveis para associar FormField ao elemento
nativo, sem clonar filhos arbitrários. useId ou id explícito preserva associação
em SSR/múltiplas instâncias; roots independentes devem definir identifierPrefix
quando necessário. A documentação de integração deverá provar esse caso.

## HTML, foco e estados

Nome acessível obrigatório em todo controle; labels não substituídos por ícones.
Usar atributos nativos, aria-describedby/invalid e fieldset/legend quando aplicáveis.
Ícone decorativo aria-hidden; ícone informativo requer título/nome explícito.
Loading não comunica sucesso nem habilita repetição de ação.
Definir quando desabilitar nativamente e como preservar/restaurar foco; comparar
aria-disabled com native disabled em testes antes de firmar API.

Alert/status não são equivalentes: anúncios dependem do contexto e da mudança,
não apenas do tom vermelho/verde. Badge estático não cria região viva.
Dialog precisa Escape, foco inicial, contenção, retorno e portal no tema correto.

## Estilos e testes

Classes nx-*; tokens semânticos e de componente --nx-*, sem cores literais
espalhadas. Importação CSS explícita, sem body/reset global. Consumo sem host
conhecido deve ser diagnosticado na documentação; defaults .nx-scope.

Testes futuros com Testing Library/user-event e Vitest reaproveitam metodologia,
sem copiar fixtures privadas. Provar ativação por teclado, type default,
disabled/loading, nome/descrição/erro, variantes relevantes, refs e composição.
Adicionar verificações automatizadas de acessibilidade, sem chamá-las de
certificação; browser local determinístico para foco/layout/portais que jsdom
não comprova. Sem navegador assistido por IA.

No NX-DS-002, compilar exemplos TypeScript públicos, testar build, exports, CSS
e consumidor descartável com única cópia de React. Não criar testes de
componentes inexistentes nesta etapa.


## Exemplos de contratos TypeScript propostos

Exemplos documentais, sem arquivo de declaração compilado ou API publicada:

```ts
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode, Ref } from 'react'
type Tone = 'neutral' | 'info' | 'success' | 'warning' | 'error'
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  ref?: Ref<HTMLButtonElement>
}
interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone
}
interface StatusMessageProps extends HTMLAttributes<HTMLDivElement> {
  tone?: Tone
  announcement?: 'off' | 'polite' | 'assertive'
  busy?: boolean
}
interface PanelProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  heading?: ReactNode
  headingLevel?: 2 | 3 | 4 | 5 | 6
  description?: ReactNode
  action?: ReactNode
}
```

Defaults propostos: Button variant=primary, size=md, type=button e
loading=false; Badge tone=neutral; StatusMessage announcement=off.
Panel sem heading usa div; section nomeada requer heading/id associados.
Validar conflitos de atributos, refs e políticas de foco antes de implementar.

FormField propõe id/label/hint/error/required e renderControl com id,
aria-describedby e aria-invalid; Input/Textarea/Select/Checkbox estendem
atributos nativos e expõem ref do elemento. Pagination recebe hasPrevious,
hasNext, onPrevious, onNext, loading e label, sem total obrigatório.
Dialog recebe open/onOpenChange, title/description, children, initialFocusRef
e portalContainer; contrato ainda exige testes completos de teclado/foco.

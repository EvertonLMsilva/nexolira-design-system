# @nexolira/ui 0.1.0

Biblioteca ESM privada para uso local autorizado; UNLICENSED.
Instale os tarballs @nexolira/tokens e @nexolira/ui em conjunto.
Importe @nexolira/tokens/styles.css e depois @nexolira/ui/styles.css.
Aplique .nx-scope e data-nx-mode ao contêiner da aplicação.

Exports: Button, Card, Panel (alias de Card), Badge, StatusMessage, Input,
FormField e seus tipos. Sem router, client HTTP, estado comercial ou provider
obrigatório. Nenhum JavaScript importa CSS automaticamente.

Peers: pares React/React DOM 19.2.8 ou 19.3.1. Não misture versões do par.
ESM/TypeScript; CommonJS e React 18 não são alvos deste lançamento.
Button nativo type=button, ref React 19, loading mantém rótulo e desabilita ação.
FormField usa renderControl para associar label, hint, error, required e id.
StatusMessage announcement=off por padrão; polite/assertive são explícitos.
Badge não interpreta estados de negócio e não cria live region.

O host deve importar tokens e escolher tema antes de renderizar. Nomes
acessíveis e decisões de negócio pertencem ao consumidor. Não há componentes
complexos, validação comercial, submissão HTTP ou instalação em produto real.

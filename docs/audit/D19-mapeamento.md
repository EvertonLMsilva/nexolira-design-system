# Auditoria da referência D19

A referência é o ZIP D19 e seu HTML independente de 26/11/2026. O ZIP reúne a apresentação, o inventário, o mapa de navegação, as evidências anteriores e os ensaios do protótipo. A evidência D19 informa 205 verificações em Chromium da demonstração. A validação da biblioteca compila e instala seus próprios pacotes. A revisão D11 das etapas editáveis segue como proposta de produto.

| Tela ou fluxo no protótipo | Unidade reutilizável implementada ou existente | Composição e responsabilidade do consumidor |
|---|---|---|
| Sidebar desktop, menu móvel, grupos e retorno | Drawer, Accordion, Button e links HTML | Breakpoint, rotas, breadcrumb, filtros e origem do retorno |
| Dashboard, destaques e ranking | Card, Badge, Table | Período de sete dias, série, escala e valores indisponíveis dependem da fonte |
| Perfil, proposta comercial, apresentação e identidade | FormField, Input, Textarea, FieldAction, Button, StatusMessage | Geração, edição, aprovação e persistência |
| Catálogo de contas e destinos | Select, CheckboxGroup, Checkbox, Dialog | Tipos de plataforma, permissões, autenticação, vinculação |
| Configuração de página e capa | Dialog e campos com ação auxiliar | Upload, direitos, geração e recorte por formato |
| Descoberta, seleção múltipla e ações em massa | CheckboxGroup, Checkbox, Card, Button | Elegibilidade, preços, comissão e criação de campanhas |
| Peças e agenda | MediaPicker, Dialog, campos de data e TimeInput | Sequência de 17 peças, direitos, mídias, canais, fuso e data inicial |
| Conteúdo por peça, formato e destino | Textarea, Select e FieldAction | Modelo de rascunho, geração, disponibilidade de legendas e links |
| Revisão, publicação e recibo | Stepper, Badge, StatusMessage e Accordion | Acesso às etapas, aprovação, estados e comprovante individual |
| Pipeline, consultas QC e histórico | Table, Card, StatusMessage | Etapas, permissões, consultas e erros operacionais |
| Relatórios e Finance | Table, FormField, Input e Select | Seleção de campanha, origem, moeda e agregação |
| Base visual | Catálogo local executável | Exemplos editáveis e troca de tema sem API |

## Estilos e recursos

Os papéis de canvas, superfície, ação, texto, borda, destaque e estado vieram da paleta do protótipo. O tema usa o mesmo contrato semântico da 0.1.0. A borda funcional e os estados hover/active possuem pares de contraste medidos. A superfície e a borda decorativa podem ficar mais próximas entre si. O seletor nativo conserva a indicação de foco e os controles principais usam altura mínima de 44 px.

A implementação usa React e elementos HTML nativos. O CSS é local ao host. Os arquivos CSS e JS do protótipo, fontes remotas, imagens de oferta, textos operacionais e integrações ficam fora dos pacotes. O catálogo exercita os componentes com exemplos locais.

| Referência fornecida | SHA-256 |
|---|---|
| ZIP D19 | `1654dc4d6d741c4f457ac4e0235d889aa347d2dbf3bca38466be72aac6c06a31` |
| HTML D19 | `51c16ae74cf100e0e0740f6b737273ffe9eccf47355b8630d3b31b328e578f7c` |

## Matriz de componentes

Cada linha registra a origem, a decisão, os papéis de token, os estados, o comportamento responsivo e o teste de aceite. Os componentes abaixo são genéricos. As decisões específicas de cada tela estão na tabela anterior.

| Origem D19 | Componente e decisão | Tokens e estados | Desktop e mobile | Acessibilidade e ensaio |
|---|---|---|---|---|
| Todos os formulários | Reusar Button/Input/FormField. Criar IconButton e FieldAction | action, text, disabled, focus. Normal, loading, inválido | Ação ao lado do campo ou abaixo dele | Label e erro associados. Testar ref, Enter, Tab e botão ocupado |
| Perfil e editor de peça | Criar Textarea e CharacterCount | surface, text, error. Vazio, editado e excesso | Coluna flexível, texto longo | Contagem vinculada via hint, erro textual e maxlength coerente |
| Relatórios e configuração | Criar Select. Compor busca com Input e Select | border.default, surface, focus. Seleção e sem correspondência | Campos lado a lado que quebram em linha | Opções nativas e rótulos distintos. Buscar, selecionar e limpar |
| Destinos e ofertas | Criar Checkbox, Radio, Switch, CheckboxGroup e SelectionList | primary, focus, disabled. Seleção parcial ou múltipla | Linhas de seleção com alvo de 44px | Fieldset/legend e estados nativos. Submeter valores independentes |
| Programação e capa | Padronizar DateInput/TimeInput com Input, criar FileUpload | border.default, text, focus. Vazio e preenchido | Controles nativos no espaço disponível | Nome, formato e valor local. Testar horário, data e arquivo |
| Todos os painéis e alertas | Reusar Card/Panel, Badge e StatusMessage. Criar Divider | surface, border.subtle, status.*. Informação, erro e sucesso | Cards refluem sem esconder texto | Heading, anúncio explícito e separador semântico |
| Menu e cabeçalho | Criar AppShell, Sidebar, NavigationItem, PageHeader e Breadcrumb | sidebar.*, selected.*, focus. Atual e inativo | Sidebar desktop, Drawer no menu móvel | Link atual, landmarks nomeados e retorno à origem |
| Submenus e seções | Criar Accordion e Tabs | surface, accent, focus. Aberto/fechado, selecionado, desabilitado | Listas de abas quebram linha | Details/summary, setas, Home/End e associações de painel |
| Configuração, prévia, descarte | Criar Dialog, Drawer e ConfirmDialog com a mesma superfície modal | overlay, surface, shadow, focus. Aberto e fechado | Modal central ou gaveta lateral com rolagem interna | Nome e descrição, Escape, foco inicial/retorno, inércia e portal |
| Revisão e edição | Criar Stepper e ActionFooter | accent, disabled, focus. Concluído, atual, pendente, bloqueado, revisão | Passos e botões em múltiplas linhas | Etapa corrente anunciada. Testar bloqueio e seleção controlada |
| Relatórios e listas | Criar Table, Pagination e DetailList. Compor filtros e ações em massa | text, muted, border. Vazio e página parcial | Rolagem horizontal local à tabela | Caption, cabeçalhos, região focável, limites e seleção |
| Dashboard, Pipeline e Mídia | Criar MetricCard, Progress, EmptyState e Skeleton | surface, text, status. Zero, desconhecido, progresso indeterminado | Cards em grade adaptativa | Unidade e tendência em texto, progress nativo, erro via StatusMessage |
| Galeria de campanha | Criar MediaPicker, MediaGallery e MediaViewer | action, selected, focus, overlay. Item atual, seleção múltipla, prévia ausente | Grupos quebram linha, imagem e vídeo limitados ao modal | Botões nomeados, checkbox independente e player nativo com legendas opcionais |
| Ícones de ajuda | Compor texto persistente com FormField/StatusMessage | text.muted, status.info | Visível por teclado e toque | Instruções e nome acessível presentes sem depender de tooltip |

A D19 demonstra pesquisa junto ao seletor. O catálogo preserva essa interação com dois controles nativos. A aplicação consumidora define a política de filtragem, os rótulos de ação e os valores válidos. O mesmo princípio vale para paginação e gráficos: o DS apresenta dados fornecidos, e o aplicativo determina o seu significado.

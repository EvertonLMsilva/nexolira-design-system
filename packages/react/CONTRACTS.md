# Contrato React 0.2.0

Os tipos públicos vêm de `@nexolira/ui`. Os componentes recebem dados, rótulos e eventos do consumidor. O bundle é ESM e mantém React e React DOM como peers. As interfaces TypeScript emitidas em `dist/*.d.ts` são a referência de assinatura.

| API | Contrato público e exemplo de uso |
|---|---|
| Button, IconButton | Botão nativo com três variantes, tamanhos, ref, disabled e loading. O padrão é type=button. IconButton exige aria-label e esconde o ícone decorativo da árvore acessível. |
| Card, Panel | Mesma implementação. Com heading produz região nomeada e nível configurável. Sem heading produz agrupamento comum. A ação é um elemento separado. |
| Badge, StatusMessage | Badge é estático. StatusMessage escolhe announcement off, polite ou assertive e busy. O consumidor fornece o significado textual. |
| Input, Textarea, Select, DateInput, TimeInput | Atributos, ref, valor e eventos nativos. Para busca + seleção, o exemplo de listas utiliza Input type=search com Select filtrado por texto. Data e hora são valores locais de formulário. |
| Radio, Switch, Checkbox, CheckboxGroup | Controles nativos com label visível. Radios com o mesmo name formam uma escolha. Switch expõe role=switch. CheckboxGroup usa fieldset/legend e admite disabled para o grupo. |
| FormField, FieldAction, CharacterCount, FileUpload | FormField associa id, erro e hint via renderControl. FieldAction recebe controle e ação independentes. CharacterCount usa o comprimento UTF-16 do maxlength HTML. FileUpload produz um input file com hint e onChange; o chamador controla leitura e destino. |
| AppShell, Sidebar, NavigationItem, PageHeader, Breadcrumb | Slots de navegação, cabeçalho e conteúdo. O host escolhe a rota e marca o item atual. Sidebar é nav e NavigationItem é link nativo. Até 900px a navegação móvel substitui a coluna lateral. |
| Accordion, Tabs | Disclosure nativo com summary e details. Tabs usa IDs por instância, aria-controls, roving tabindex e seleção controlada. Setas, Home e End ignoram abas desabilitadas. Forneça um value existente e habilitado. |
| Dialog, Drawer, ConfirmDialog | open e onOpenChange controlam a visibilidade. title nomeia a superfície modal e description é opcional. Escape, backdrop e botão fechar solicitam fechamento. initialFocusRef e portalContainer são opcionais. Drawer aceita side start/end. O chamador decide confirmação e descarte. |
| Stepper, ActionFooter | Stepper recebe itens com ID e estado completed, current, pending, blocked ou review e emite o ID escolhido. A aplicação determina a etapa permitida. ActionFooter agrupa ações reais do consumidor. |
| Table, Pagination, SelectionList | Table exige caption e preserva a semântica de thead/th/tbody. A tabela rola no próprio contêiner. Pagination usa hasPrevious/hasNext/loading. SelectionList é controlada por IDs, com seleção múltipla e itens desabilitados. |
| MetricCard, Progress, DetailList, EmptyState, Skeleton, Divider | Apresentação de dados e estados de leitura. Valor, tendência, total, unidade, origem e rótulos vêm do chamador. Progress sem valor é indeterminado. |
| MediaPicker, MediaGallery, MediaViewer | MediaPicker alterna o item em edição. MediaGallery recebe itens, grupos e seleção múltipla. A ação de ampliar é independente da seleção. MediaViewer aceita imagem ou vídeo, controles nativos e trilha de legenda opcional. Mídia e permissões são do chamador. |

As classes da biblioteca têm prefixo `nx-`. O tema e a ordem de importação estão no [guia de consumo](../../docs/integration/MKTauto.md). O [catálogo executável](../../apps/docs/README.md) exercita os comportamentos na mesma versão dos componentes.

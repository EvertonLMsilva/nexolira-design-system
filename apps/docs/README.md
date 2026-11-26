# Catálogo local

A partir da raiz do Design System, execute `npm ci`, `npm run build` e `npm run catalog`. Abra o endereço loopback informado pelo Vite. Para gerar o site estático, execute `npm run catalog:build`. O resultado fica em `apps/docs/dist/`.

Alterne **Tema** entre MKTauto e Nexolira e **Modo** entre claro e escuro. No desktop, os links da coluna lateral levam às seções. Em telas de até 900 px, use **Menu**. Experimente o horário, a seleção múltipla, a ação auxiliar da descrição, o seletor de mídia, a navegação por etapas e a confirmação em diálogo. Os controles alteram apenas o estado do exemplo.

A suíte `npm run pack:verify` compila este mesmo catálogo contra tarballs em dois consumidores descartáveis. As capturas do tema MKTauto ficam em `.artifacts/catalog-{light,dark}-{320,1440}.png` após o sucesso da verificação.

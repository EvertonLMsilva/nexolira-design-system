# Integrar a biblioteca 0.2.0 ao MKTauto

O frontend pode adotar esta versão em uma entrega própria. A distribuição usa dois arquivos locais e um par de peers já testado. O frontend com React e React DOM 19.3.1 pode conservar esse par. O outro par coberto é 19.2.8.

## Instalação reproduzível

1. Após a publicação da tag oficial `v0.2.0`, use um checkout local dessa tag e execute `npm ci` e `npm run pack:verify`. O empacotamento executa o build. O relatório `.artifacts/pack-smoke.json` identifica os dois arquivos, SHA-256 e versões testadas.
2. Confira os hashes com `Get-FileHash -Algorithm SHA256` ou `sha256sum`. Disponibilize ambos no mesmo diretório de dependências versionadas do consumidor, inclusive no contexto de build de CI e Docker. Use um caminho relativo como `vendor/`. Em repositório público, forneça os arquivos aprovados ao job por armazenamento interno autorizado ou gere ambos no checkout da tag antes de `npm ci` do consumidor. Verifique os hashes antes da instalação ou do build de imagem.
3. No repositório consumidor, execute o comando abaixo e mantenha o lockfile junto dos dois arquivos.

```sh
npm install --save-exact ./vendor/nexolira-tokens-0.2.0.tgz ./vendor/nexolira-ui-0.2.0.tgz
npm ls react react-dom @nexolira/tokens @nexolira/ui
```

## Host e CSS

```tsx
import { Card, FormField, TimeInput } from '@nexolira/ui'
import '@nexolira/tokens/styles.css'
import '@nexolira/ui/styles.css'

export function SchedulingExample({ mode }: { mode: 'light' | 'dark' }) {
  return <section className="nx-scope" data-nx-theme="mktauto" data-nx-mode={mode}>
    <Card heading="Programação">
      <FormField label="Horário local" renderControl={props => <TimeInput {...props} />} />
    </Card>
  </section>
}
```

Mantenha a preferência de modo do operador no consumidor. O tema default da 0.1.0 continua disponível por `.nx-scope` e `data-nx-theme="nexolira"`. Um host interno explícito pode ter outra marca e modo. Use os nomes de tokens semânticos como `--nx-color-surface`, `--nx-color-text-primary` e `--nx-color-border-default` para compor a tela.

## Compor o cockpit

```tsx
import { useState } from 'react'
import type { ReactNode } from 'react'
import { AppShell, Button, Drawer, NavigationItem, Sidebar } from '@nexolira/ui'

export function CockpitShell({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<'light' | 'dark'>('light')
  const [menuOpen, setMenuOpen] = useState(false)

  const navigation = (
    <Sidebar label="Navegação principal">
      <NavigationItem href="/" onClick={() => setMenuOpen(false)}>
        Dashboard
      </NavigationItem>
    </Sidebar>
  )

  return (
    <div className="nx-scope" data-nx-theme="mktauto" data-nx-mode={mode}>
      <AppShell
        navigation={navigation}
        header={
          <Button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
            {mode === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
          </Button>
        }
        mobileNavigation={<Button onClick={() => setMenuOpen(true)}>Abrir menu</Button>}
      >
        <main>{children}</main>
      </AppShell>
      <Drawer title="Menu" open={menuOpen} onOpenChange={setMenuOpen}>
        {navigation}
      </Drawer>
    </div>
  )
}
```

O exemplo usa navegação nativa. No cockpit, conecte o estado do menu ao router e ao breakpoint de desktop. O Drawer pertence à árvore do host para herdar o tema.

- Para datas e horários, use `DateInput` e `TimeInput` com `FormField`. Use `FieldAction` para colocar uma ação ao lado do campo sem alterar o contrato do formulário.
- Em `MediaGallery`, controle a seleção por ID e trate `onPreview` separadamente. Abra `MediaViewer` com o item selecionado e encerre em `onOpenChange`. O consumidor fornece as URLs autorizadas e, quando disponíveis, as faixas de legenda.
- No `Stepper`, informe os estados dos itens a partir da página consumidora e valide a transição antes de aceitar `onSelect`.
- A lista completa de componentes, tipos e APIs está em [Contrato React](../../packages/react/CONTRACTS.md).

## Migração por tela

Comece pelos controles já equivalentes e pelos seus testes de interação. Para links, use a navegação nativa ou o router do aplicativo. Para o menu móvel, controle `Drawer.open`, forneça título e rótulo de fechamento, feche ao escolher uma rota ou voltar ao layout desktop. Renderize o diálogo sob o host de tema. O navegador coloca o diálogo modal na camada superior e cuida da inércia do fundo.

A seleção de várias ofertas pode combinar `CheckboxGroup` e `Checkbox`. Ações em um campo usam `FormField` dentro de `FieldAction`. O seletor de hora retorna o valor local do elemento HTML. O consumidor mapeia esse valor ao fuso e ao contrato da publicação. Com `Stepper` e `MediaPicker`, forneça IDs estáveis e derive a seleção do estado já persistido pela aplicação.

Antes de retirar estilos locais, confira teclado, retorno de foco, textos longos, erro, carregamento, lista vazia, desktop e mobile nos dois modos. Faça o rollback pelo commit de adoção do consumidor, recuperando também o lockfile e os tarballs anteriores. A biblioteca não exige migração de dados.

[Catálogo visual](../../apps/docs/README.md) · [Matriz D19](../audit/D19-mapeamento.md)

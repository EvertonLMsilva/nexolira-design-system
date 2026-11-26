# Integrar a biblioteca 0.2.0 ao MKTauto

O frontend pode adotar esta versão em uma entrega própria. A distribuição usa dois arquivos locais e um par de peers já testado. O frontend com React e React DOM 19.3.1 pode conservar esse par. O outro par coberto é 19.2.8.

## Instalação reproduzível

1. No checkout da biblioteca, execute `npm ci`, `npm run build` e `npm run pack:verify`. O relatório `.artifacts/pack-smoke.json` identifica os dois arquivos, SHA-256 e versões testadas.
2. Confira os hashes com `Get-FileHash -Algorithm SHA256` ou `sha256sum`. Disponibilize ambos no mesmo diretório de dependências versionadas do consumidor, inclusive no contexto de build de CI/Docker.
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

## Migração por tela

Comece pelos controles já equivalentes e pelos seus testes de interação. Para links, use a navegação nativa ou o router do aplicativo. Para o menu móvel, controle `Drawer.open`, forneça título e rótulo de fechamento, feche ao escolher uma rota ou voltar ao layout desktop. Renderize o diálogo sob o host de tema. O navegador coloca o diálogo modal na camada superior e cuida da inércia do fundo.

A seleção de várias ofertas pode combinar `CheckboxGroup` e `Checkbox`. Ações em um campo usam `FormField` dentro de `FieldAction`. O seletor de hora retorna o valor local do elemento HTML. O consumidor mapeia esse valor ao fuso e ao contrato da publicação. Com `Stepper` e `MediaPicker`, forneça IDs estáveis e derive a seleção do estado já persistido pela aplicação.

Antes de retirar estilos locais, confira teclado, retorno de foco, textos longos, erro, carregamento, lista vazia, desktop e mobile nos dois modos. Faça o rollback pelo commit de adoção do consumidor, recuperando também o lockfile e os tarballs anteriores. A biblioteca não exige migração de dados.

[Catálogo visual](../../apps/docs/README.md) · [Matriz D19](../audit/D19-mapeamento.md)

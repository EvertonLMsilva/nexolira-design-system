# Nexolira Design System

Biblioteca local 0.1.0 de tokens e UI React, independente das aplicações.
[Task NX-DS-002 e evidências](docs/tasks/NX-DS-002.md).
O [NX-DS-001](docs/tasks/NX-DS-001-REPORT.md) é o registro histórico da fundação;
seu PR #1 foi integrado à main em 18/11/2026.

## Instalar os dois tarballs

Escolha um par React/React DOM suportado e mantenha as versões iguais.
Não é necessário registry Nexolira; os pacotes continuam privados e não publicados.

```text
npm install ./nexolira-tokens-0.1.0.tgz ./nexolira-ui-0.1.0.tgz react@19.3.1 react-dom@19.3.1
```

CSS deve ser importado explicitamente, nessa ordem:

```tsx
import '@nexolira/tokens/styles.css'
import '@nexolira/ui/styles.css'
import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Badge, Button, Card, FormField, Input, StatusMessage } from '@nexolira/ui'

function Example() {
  const [name, setName] = useState('')
  const [saved, setSaved] = useState(false)
  return <div className="nx-scope" data-nx-theme="nexolira" data-nx-mode="dark">
    <Card heading="Exemplo local" description="Sem serviços ou dados reais">
      <Badge tone="info">Demonstração</Badge>
      <FormField label="Nome" hint="Informe um nome de exemplo" required
        error={name ? undefined : 'Campo obrigatório'}
        renderControl={props => <Input {...props} value={name}
          onChange={event => setName(event.target.value)} />} />
      <Button disabled={!name} onClick={() => setSaved(true)}>Confirmar</Button>
      {saved && <StatusMessage tone="success" announcement="polite">Exemplo confirmado</StatusMessage>}
    </Card>
  </div>
}
createRoot(document.getElementById('root')!, { identifierPrefix: 'example-' }).render(<Example />)
```

Dark é o default de .nx-scope. Use data-nx-mode="light" no mesmo contêiner
para light. Hosts aninhados reemitem aliases e podem conter raízes React
independentes; use identifierPrefix por raiz para IDs de formulários.
Não há ThemeProvider obrigatório, alteração de html/body/:root ou fontes remotas.

## API pública

| Pacote/subpath | Conteúdo |
|---|---|
| @nexolira/tokens | tokens, resolvedTokens, compileTokens, resolveToken, cssName, TokenModel |
| @nexolira/tokens/tokens.json | Modelo neutro de referência |
| @nexolira/tokens/styles.css | Variáveis CSS por contêiner, com declaração TS para import de efeito |
| @nexolira/ui | Button, Card, Panel, Badge, StatusMessage, Input, FormField e tipos |
| @nexolira/ui/styles.css | Aparência opt-in nx-*, com declaração TS para import de efeito |

ESM e declarations .d.ts. Subpaths internos não são públicos. Nenhum JS importa
CSS implicitamente. UI depende somente de tokens; React/React DOM são peers,
externalizados inclusive nos subpaths. [Contratos React](packages/react/CONTRACTS.md).

Button: primary/secondary/ghost, sm/md/lg, native type=button, disabled/loading,
eventos/ref nativos React 19. Loading desabilita ação e mantém rótulo.
Card/Panel: uma implementação; com heading é section nomeada, sem heading é div.
Badge recebe tom/texto; StatusMessage só anuncia por configuração explícita
off/polite/assertive. Input preserva atributos nativos, inclusive value/defaultValue.
FormField passa id/required/aria-describedby/aria-invalid por renderControl.
Sem submissão HTTP, schema de negócio, router ou interpretação comercial.

## Desenvolver e verificar

Node 24.22.1 e npm 12.2.2 usados nesta entrega; versões exatas no lockfile.
A instalação inicial requer registry/cache das ferramentas. A biblioteca não
consulta serviços remotos em runtime. Instale o Chromium de testes se necessário:

```text
npm ci
npx playwright install chromium
npm run typecheck
npm run lint
npm test
npm run build
npm run validate
npm run pack:verify
```

build emite JS ESM, tipos e CSS em packages/*/dist, sem publicar.
pack:verify compara dois builds, executa npm pack dos dois workspaces, inspeciona
o conteúdo e instala tarballs em diretórios temporários fora do repositório.
Cada consumidor verifica TypeScript, exports/CSS, build, árvore de dependências,
ausência de symlinks/React duplicado e Chromium headless.
Os testes cobrem temas dark/light/aninhados, raízes independentes, refs/eventos,
labels/erros, teclado/foco, hover/active, reduced motion, forced colors, reflow320
e axe. Verificação automatizada não é certificação completa de acessibilidade.

Os tarballs e o relatório local ficam em .artifacts; os caminhos exatos e hashes
são registrados na task. node scripts/validate-foundation.mjs preserva a
checagem documental; --check-references é opcional e só consulta metadados/hashes
das referências antigas, sem ser dependência de build.

## Compatibilidade e limites

Peers limitados aos pares 19.2.8 e 19.3.1. Não misturar versões React/DOM.
TypeScript 6.0.2, @types/react/DOM19.3.0 e Vite8.3.8 compõem o consumidor de teste.
Sem suporte declarado a React18, CommonJS, SSR/hidratação, portais ou componentes
complexos. MKTauto/Market Direction permanecem temas candidatos, sem paletas copiadas.
Pré-release0.1; mudanças incompatíveis exigem migração explícita, sem update automático.
UNLICENSED: distribuição local autorizada, nenhuma licença aberta presumida.

## Contrato para a Frente Frontend

Destino futuro: EvertonLMsilva/nexolira-frontend,
C:/01-projetos/04-nexolira-frontend. A adoção deve instalar ambos os tarballs,
importar CSS e estabelecer host/tema, respeitando os peers testados.
Esse projeto não foi instalado nem modificado nesta task; terá testes e PR próprios.

[Style Guide](docs/STYLE_GUIDE.md) · [Arquitetura](docs/ARCHITECTURE.md) ·
[Temas](docs/architecture/THEMES.md) · [Roadmap](docs/TOPIC_ROADMAP.md) ·
[Auditoria original](docs/audit/AUDIT.md).

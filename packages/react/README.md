# @nexolira/ui 0.2.0

Componentes React ESM para distribuição local autorizada. Instale os tarballs de @nexolira/ui e @nexolira/tokens **0.2.0** no mesmo consumidor. Os pares de peers testados são React/DOM 19.2.8 e 19.3.1. Importe primeiro `@nexolira/tokens/styles.css` e depois `@nexolira/ui/styles.css`.

```tsx
import { Card, Button } from '@nexolira/ui'

export function Review({ onReview }: { onReview: () => void }) {
  return <div className="nx-scope" data-nx-theme="mktauto" data-nx-mode="light">
    <Card heading="Revisão"><Button onClick={onReview}>Revisar</Button></Card>
  </div>
}
```

A 0.2.0 preserva Button, Card/Panel, Badge, Input, FormField e StatusMessage. Acrescenta campos nativos, seleção, navegação, diálogos, dados e mídias. Cada componente expõe seus tipos na entrada pública. As decisões de autenticação, fluxo, integração e persistência pertencem ao consumidor. Pacote privado, UNLICENSED.

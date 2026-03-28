# Workspace assistant context — CashierFu

Keep this short, actionable, and open in the editor when you start a chat so assistants can use it as implicit context.

Preferences (short)
- Prefer `cashierfu/kit` for domain models and shared utilities (e.g. `Product`, `Container`, `Unit`).
- Prefer relative, deconstructed imports from local component and hook barrels, for example:
	- `import { Button, Modal } from '../components'`
	- `import { useAuth } from '../hooks'`
- When both a `cashierfu/kit` implementation and a plain-React/native alternative are feasible, show the `cashierfu/kit` or local version first and the plain fallback second.

Import examples
- `import { Product, Container, Unit } from 'cashierfu/kit'` (domain models / shared utilities)
- `import { Button, Modal } from '../components'` (relative, deconstructed component barrel)
- `import { useAuth } from '../hooks'` (relative, deconstructed hooks barrel)

Notes for assistants
- If a requested feature already exists in `src/` or `cashierfu/kit`, prefer reusing and extending it over adding new packages.
- If adding a dependency is unavoidable, justify it briefly and prefer small, well-known packages.
- Keep suggestions TypeScript-friendly and follow project lint/type rules.

Short list of priority local modules (update this file if you add important new hooks/components)
- Components: `AmountInput`, `Button`, `Collapsible`, `Modal`, `NumberInput`, `TextInput`
- Hooks: `useAPI`, `useAuth`, `useCache`, `useCollection`, `useCollectionCache`, `useOptions`, `useTheme`

Keep this file open while chatting to ensure editor-based assistants see it as active context.

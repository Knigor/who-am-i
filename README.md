# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

## ESLint

`bun run lint` проверяет код, `bun run lint:fix` применяет доступные автоисправления.
Правило `vue/block-order` требует порядок `template`, `script`, `style`, `i18n`.
`@typescript-eslint/consistent-type-imports` требует `import type` для типов;
inline `type` внутри обычного импорта запрещён.

Локальное правило `local/import-groups` в `eslint/rules/import-groups.js`
проверяет группы из `AGENTS.md` и пустые строки между ними.
Оно сохраняет порядок импортов внутри группы и не переносит их через
импорты с побочными эффектами. Смешанные группы в одном импорте нужно
разделить вручную. Соглашения по распознаванию групп описаны в `AGENTS.md`.

## Тесты компонентов

Стек: Vitest + Vue Testing Library, jsdom и user-event.

```sh
bun run test
bun run test:watch
bun run test:coverage
bun run test src/components/__tests__/PageHeader.test.ts
```

`bun run test` запускает Vitest. `bun test` запускает другой раннер — встроенный в Bun.

Тесты лежат в `__tests__` рядом с компонентами и называются `*.test.ts`.
Начальный пример — `PageHeader.test.ts`.
Компоненты shadcn-vue в `src/components/ui` отдельно не тестируем;
каталог исключён из поиска тестов и отчёта покрытия.
Импортируй `test`, `expect` и `vi` из `vitest`, используй `render`/`screen`
из `@testing-library/vue` и `userEvent.setup()` для взаимодействий.
Поиск элементов — по роли и доступному имени, проверки — стандартными матчерами
Vitest через свойства и методы DOM. jest-dom не используется.

`vitest.config.ts` наследует алиасы и плагины из конфигурации Vite,
включая обработку Vue-компонентов и блоков `<i18n>`.
Общего setup-файла нет: подготовка и очистка DOM через `cleanup()` выполняются
в `beforeEach`/`afterEach` соответствующего тестового файла.
Фикстуры и вспомогательные функции хранятся в локальных `__tests__` рядом с тестами.
Покрытие собирается через Istanbul. Отчёт: `coverage/index.html`.
Порог покрытия пока не задан.

jsdom проверяет поведение компонентов, но не реальную вёрстку и media queries.
Адаптивность, размеры и перекрытия проверяются в браузере.

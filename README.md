# Testaufgabe

Die Aufgabe besteht darin einen kleinen Shop zu bauen. Dieser soll folgende Seiten beinhalten:

- Übersichtsseite der Produkte
- Produktdetailseite
- Warenkorbseite

Auf der Übersichtsseite werden alle Produkte nach Preis sortiert angezeigt. Klickt man auf ein Produkt, gelangt man auf dessen Detailseite.

Die Detailseite zeigt den Namen und den Preis des Produkts an. Des Weiteren gibt es einen Button um es dem Warenkorb hinzuzufügen. Jedes Produkt kann mehrmals dem Warenkorb hinzugefügt werden.

Auf jeder Seite ist ein Warenkorb-Widget sichtbar, welches den aktuellen Gesamtpreis anzeigt. Beim Klick auf das Widget gelangt man auf die Warenkorbseite.

Die Warenkorbseite zeigt alle Produkte an, die sich im Warenkorb befinden. Einzelne Produkte können aus dem Warenkorb entfernt werden.

### Hinweise

- Umsetzung Frontend mit React und Typescript
- Umsetzung Backend mit Typescript und GraphQL
- Styling mit Tailwind nach eigenem Ermessen
- Fokus auf funktionale Schreibweise und Modularität des Codes
- Hinzufügen von Tests für die Basisfunktionalitäten
- Du kannst `products.json` als Datengrundlage nehmen


# `Turborepo` Vite starter

This is an official starter Turborepo.

## Using this example

Run the following command:

```sh
npx create-turbo@latest -e with-vite
```

## What's inside?

This Turborepo includes the following packages and apps:

### Apps and Packages

- `docs`: a vanilla [vite](https://vitejs.dev) ts app
- `web`: another vanilla [vite](https://vitejs.dev) ts app
- `@repo/ui`: a stub component & utility library shared by both `web` and `docs` applications
- `@repo/eslint-config`: shared `eslint` configurations
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package and app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

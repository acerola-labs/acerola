# Como contribuir

Este projeto segue o padrão Acerola, o mesmo de todos os repositórios Acerola. As regras completas
estão nas skills em `.claude/skills/` (`acerola-design`, `acerola-project`, `acerola-git`).

## Preparar a máquina

1. Node 22.18 ou mais novo (os scripts do padrão são `.mjs`) e
   [lefthook](https://github.com/evilmartians/lefthook) (`scoop install lefthook`,
   `winget install evilmartians.lefthook` ou `npm i -g lefthook`).
2. Na raiz: `node scripts/git/setup-git.mjs`. Grava o Git-Flow, o template de commit e instala os hooks.
3. O site: `cd acerola && npm install && npm run dev`.

## Fluxo

- Branch `feature/<nome>` ou `bugfix/<nome>` a partir da `develop`. A `main` e a `develop` são travadas.
- Commit `[tipo](local): Mensagem`, um local por commit. Locais em `acerola.config.json`
  (`site`, `repo`, `ci`, `docs`, `claude`, `deps`).
- PR para a `develop`, com o template preenchido e prints no claro e no escuro quando mexer em tela.
- App novo no hub: o id em `src/lib/data/app-ids.ts`, os links em `src/lib/data/apps.ts` e os textos
  em `messages/{pt-br,en}.json` (`apps.<id>.*`).

## Antes do PR

```bash
node scripts/design/check-design.mjs
node scripts/i18n/check-i18n.mjs
cd acerola && npm run lint && npm run check && npm test && npm run build
```

## Licença

Ao contribuir, você concorda que sua contribuição sai sob a [MPL-2.0](LICENSE).

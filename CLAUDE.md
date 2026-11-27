# Acerola — regras do projeto

O hub da marca em acerola.app: a ideia do Acerola, os apps (reader, sync, brand), as docs, os
downloads e o código de cada um, e as ideias do que vem depois.

## Padrão Acerola — REGRA OBRIGATÓRIA

Antes de mexer, carregue a skill certa e siga-a:

| Vai mexer em | Skill |
|---|---|
| tela, componente, cor, fonte, ícone, peça de marca | `acerola-design` |
| nome, pasta, rota, banco, texto de tela, i18n, camada, licença | `acerola-project` |
| commit, branch, PR, issue, workflow, release | `acerola-git` |

- **Tudo que o usuário não vê é em inglês**: pastas, arquivos, rotas, identificadores, chaves,
  tabelas, colunas, modelos, logs e comentários de código.
- **i18n obrigatório**: nenhum texto de tela no código; chave em inglês e aninhada por assunto,
  sem `_`/`-` emendando contexto (`acerola/messages/{pt-br,en}.json`).
- Commit `[tipo](local): Mensagem`; locais em `acerola.config.json` (`commit.scopes`).
- **Só três branches vivas: `main`, `develop` e a de trabalho.** Juntou, apaga (local e remota).
  Outra branch só fica se quem administra pedir de forma específica.
- `node scripts/design/check-design.mjs` e `node scripts/i18n/check-i18n.mjs` precisam passar
  (hooks do Claude, `pre-commit` do lefthook e CI). Exceção de design só com
  `design-allow: <motivo>` na linha.
- Licença MPL-2.0.

## Deste projeto

- O site mora em `acerola/` (SvelteKit estático, servido por Caddy no hetzner pelo Komodo,
  `.komodo/`).
- **Marca pela CDN**: fontes, ícone e mascote vêm de `https://cdn.acerola.app/brand/…`
  (`lib/utils/brand.util.ts`). Só os tokens do Tailwind (`src/lib/theme/`) ficam no repositório,
  porque o Tailwind precisa deles no build: cópia exata de `tokens.css`, `theme.css` e
  `components.css` do acerola-brand.
- Idioma em `/pt-br` e `/en` e tema pelos cookies do domínio (`acerola-project` 2.1 e
  `acerola-design` 11.1), com os arquivos do modelo (`reference/locale/`).
- Os apps e seus links vivem em `lib/data/apps.ts`; o texto de cada um, nas mensagens. Docs e
  downloads seguem o que cada app já publica; sem link próprio, o GitHub.
- Actions só da GitHub e fixadas por SHA (`uses: actions/x@<sha> # vN`): a organização
  `acerola-labs` exige.

## Desvios do padrão

Nenhum.

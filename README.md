# Acerola

O ponto de entrada de tudo que é Acerola: **[acerola.app](https://acerola.app)**.

Acerola é uma família de apps para quem quer cuidar da própria biblioteca de mídia: ler, assistir e
acompanhar o que consome, com os dados na própria máquina ou no próprio servidor. Este repositório é
o hub: a página que explica a ideia, leva a cada app (o que é, os downloads, as docs e o código) e
guarda os planos do que vem depois.

## Projetos

| Projeto | O que é | Links |
|---|---|---|
| [acerola-reader](https://github.com/acerola-labs/acerola-reader) | Leitor de quadrinhos e mangás para desktop e Android, com sincronização P2P entre os seus dispositivos | [docs](https://docs.reader.acerola.app) · [downloads](https://github.com/acerola-labs/acerola-reader/releases) |
| [acerola-sync](https://github.com/acerola-labs/acerola-sync) | Extensão que marca sozinha o que você assiste e lê na sua lista do AniList, com o seu próprio server espelhando tudo | [docs](https://github.com/acerola-labs/acerola-sync#readme) · [downloads](https://github.com/acerola-labs/acerola-sync/releases) |
| [acerola-brand](https://github.com/acerola-labs/acerola-brand) | A marca e o padrão de projeto: cores, tipografia, ícones, mascote, componentes e regras | [brand book](https://brand.acerola.app) · [arquivos](https://cdn.acerola.app) |

## Princípios

- **Self-host primeiro.** Cada app roda na sua máquina ou no seu servidor. Nada depende de uma nuvem
  nossa: o server do sync, o relay do reader e os sites sobem com um compose.
- **Seus dados ficam com você.** Biblioteca, progresso e histórico moram nos seus dispositivos. Quando
  precisam viajar, vão direto entre eles.
- **P2P ou rede local.** Os dispositivos se encontram e sincronizam entre si, pela rede local ou P2P
  (iroh), com relay só para atravessar NAT.
- **Uma marca, um padrão.** Todos os apps seguem o mesmo design system e o mesmo padrão de projeto
  (acerola-brand).
- **Código aberto**, sob MPL-2.0.

## Ideias e próximos passos

Nada aqui é promessa: é a direção que os projetos devem seguir.

- **Sync além de anime e mangá.** Acompanhar filmes e séries pelo **TMDB** e, talvez, pelo
  **Letterboxd**. Falta validar o melhor caminho: o TMDB tem API aberta; o Letterboxd não tem API
  pública, então pode ser importação/exportação de listas ou integração parcial.
- **acerola-video.** O equivalente do reader para mídias de vídeo: biblioteca própria, progresso
  sincronizado e os mesmos princípios de self-host e P2P.
- **Reader e video em todas as plataformas.** Web, desktop e Android, com o mesmo modelo:
  - o **desktop funciona como agente**: guarda a biblioteca e serve os outros dispositivos;
  - quem usa só a **web** baixa um **agente leve** (sem a interface do desktop) e o navegador se conecta
    a ele;
  - tudo conversa por **P2P ou pela rede local**, sem servidor central.
- **Documentação de todos os projetos** ligada a partir daqui, com o design system num Storybook só.

## O site

| Página | O que mostra |
| --- | --- |
| `/pt-br/`, `/en/` | a ideia, os apps, os princípios e as ideias |
| `/pt-br/<app>/`, `/en/<app>/` | cada app: o que faz, como baixar e usar, docs e código |

Cada idioma fica no seu prefixo, com o seu `sitemap.xml` e o seu `llms.txt`; na raiz ficam o
`robots.txt` e os índices `/sitemap.xml` e `/llms.txt`. Endereço sem prefixo vai para o idioma do
cookie `acerola-locale`, e o tema segue o cookie `acerola-theme`: os dois valem para todo site em
`acerola.app`. Fontes, ícone e mascote vêm da CDN da marca (`cdn.acerola.app`).

## Estrutura

```
acerola/
├── acerola/                  o site (SvelteKit 3 + Svelte 5 + TypeScript + Tailwind v4 + GSAP)
│   ├── .config/docker/       imagem com Caddy (dockerfile, caddyfile, compose.yml)
│   ├── messages/             i18n: pt-br.json · en.json (Paraglide)
│   ├── paraglide.config.ts   idioma em /pt-br e /en, cookie compartilhado
│   └── src/
│       ├── lib/data/apps.ts  os apps e os links de cada um
│       ├── lib/theme/        tokens do Tailwind (cópia exata do acerola-brand)
│       └── routes/           /, /[app], sitemap.xml, llms.txt, robots.txt
├── scripts/                  git/ · design/ · i18n/ · release/ (o padrão Acerola)
├── .claude/                  settings.json (hooks) · skills/acerola-{design,project,git}
├── .komodo/                  deploy no hetzner pelo Komodo
├── .github/                  site-{tests,release,deploy}.yml · templates de issue e PR · CODEOWNERS · dependabot
├── acerola.config.json       commit.scopes, design e i18n
└── CLAUDE.md · CONTRIBUTING.md · RELEASE.md · LICENSE · .gitmessage · .editorconfig · lefthook.yml
```

## Começar

```bash
node scripts/git/setup-git.mjs     # Git-Flow, template de commit e hooks (precisa do lefthook)
cd acerola
npm install
npm run dev                        # http://localhost:5173
```

| Comando | Para quê |
| --- | --- |
| `npm run check` / `npm run lint` | tipos, Prettier e ESLint |
| `npm test` | testes (dados dos apps, sitemap, llms.txt, cookies) |
| `npm run build` | site estático em `build/` |
| `node scripts/design/check-design.mjs` | confere o design |
| `node scripts/i18n/check-i18n.mjs` | confere o i18n |

## Publicação

Só a tag de versão `vX.Y.Z` publica (skill `acerola-git`), criada na `main` pelo fluxo de release,
com a mensagem da versão. Push em branch nunca publica.

- **Site** ([`site-deploy.yml`](.github/workflows/site-deploy.yml)): a tag roda a Procedure
  `hetzner_acerola` no Komodo ([`.komodo/`](.komodo/)) pela API
  (`scripts/release/komodo-deploy.sh`): Pull, Build da imagem `acerola/.config/docker/dockerfile`
  no próprio hetzner e Deploy no Swarm. O `route.sh` publica o `acerola.caddy` (`acerola.app`, com
  `www` redirecionando) no Caddy do servidor. Precisa de `vars.KOMODO_URL` e dos secrets
  `KOMODO_API_KEY` e `KOMODO_API_SECRET`.
- **Release** ([`site-release.yml`](.github/workflows/site-release.yml)): lint, tipos, design, i18n,
  testes, build e a release do GitHub com as notas do `RELEASE.md`.
- **Testes** ([`site-tests.yml`](.github/workflows/site-tests.yml)): em todo PR e push na
  `develop` e na `main`.

No Komodo, a Sync `acerola` (branch `main`, arquivo `.komodo/komodo.toml`, webhook só dela: aplica a
configuração, não publica). DNS: `acerola.app` (A) e `www` (CNAME) para o hetzner, "DNS only".

## Licença

[MPL-2.0](LICENSE). As fontes da marca, servidas pela CDN, seguem a SIL Open Font License 1.1.

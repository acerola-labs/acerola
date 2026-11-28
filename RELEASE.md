# Versões

## 0.2.0 · 27 nov 2026

- **Cards que se mostram clicáveis:** os cards dos apps e dos links mostram a ação ("Ver o app",
  "Baixar o APK", "Ler as docs"…) e a seta no tom da marca, e sobem quando o mouse passa.
- **Logos:** cada app com o seu logo e cada link com o logo de onde vai (Android, Microsoft Store,
  GitHub, Acerola).

## 0.1.1 · 27 nov 2026

- **Deploy:** o Komodo clona o repositório pela conta `acerola-labs`, declarada no `komodo.toml`;
  a Sync deixa de ficar com uma pendência que tentava remover a conta.

## 0.1.0 · 27 nov 2026

- **O hub em acerola.app:** a ideia do Acerola, os apps (reader, sync e brand), os princípios e as
  ideias do que vem depois. Cada app tem a sua página, com o que faz, como baixar e usar, as docs e o
  código.
- **Idioma e tema entre os sites:** `/pt-br` e `/en`, com o cookie `acerola-locale`, e o tema pelo
  cookie `acerola-theme`, os dois valendo para todo site em `acerola.app`.
- **Para robôs:** `sitemap.xml` e `llms.txt` por idioma, com índice na raiz, e `robots.txt`.
- **Deploy:** imagem com Caddy, publicada no hetzner pelo Komodo.

# Acerola

O ponto de entrada de tudo que é Acerola: **[acerola.app](https://acerola.app)**.

Acerola é uma família de apps para quem quer cuidar da própria biblioteca de mídia: ler, assistir e
acompanhar o que consome, com os dados na própria máquina ou no próprio servidor. Este repositório vai
ser o hub: a página que explica a ideia, aponta para a documentação de cada projeto, para o design
system e para os downloads, e guarda os planos do que vem depois.

## Projetos

| Projeto | O que é | Links |
|---|---|---|
| [acerola-reader](https://github.com/acerola-labs/acerola-reader) | Leitor de quadrinhos e mangás para desktop e Android, com sincronização P2P entre os seus dispositivos | [docs](https://docs.reader.acerola.app) · [downloads](https://github.com/acerola-labs/acerola-reader/releases) |
| [acerola-sync](https://github.com/acerola-labs/acerola-sync) | Extensão que marca sozinha o que você assiste e lê na sua lista do AniList, com o seu próprio server espelhando tudo | [api](https://api.sync.acerola.app/health) · docs (em breve) |
| [acerola-brand](https://github.com/acerola-labs/acerola-brand) | A marca e o padrão de projeto: cores, tipografia, ícones, mascote, componentes e regras | [brand book](https://brand.acerola.app) · [arquivos](https://cdn.acerola.app) · storybook (em breve) |

Em breve, tudo isso reunido em acerola.app, com um link para cada documentação, o Storybook único do
design system (storybook.acerola.app) e os downloads.

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

## Licença

[MPL-2.0](https://www.mozilla.org/MPL/2.0/).

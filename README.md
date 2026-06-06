# Teologia em Minutos — Como colocar no ar

Este guia leva você do zero até o app funcionando no seu celular, **sem precisar saber programar**. Tudo é feito por sites, no navegador. Tempo estimado: 20–30 minutos.

São 3 contas gratuitas: **Anthropic** (a inteligência), **GitHub** (guarda os arquivos) e **Vercel** (publica o site). A única coisa que custa dinheiro é o uso da API da Anthropic — alguns centavos de dólar por pergunta (veja o final).

---

## Os arquivos deste pacote

```
index.html        → o app (a tela que o usuário vê)
api/ask.js        → o "cérebro": guarda sua chave em segredo e fala com o Claude
package.json      → arquivo técnico (não precisa mexer)
README.md         → este guia
```

> **Importante:** o seu prompt doutrinário já está dentro de `api/ask.js`. Se um dia quiser ajustar a teologia, o tom ou os formatos, é nesse arquivo (e só nele) que se mexe.

---

## PASSO 1 — Criar a chave da Anthropic (a inteligência)

1. Acesse **https://console.anthropic.com** e crie uma conta (ou entre).
2. No menu, vá em **Billing** (Cobrança) e adicione um cartão / crédito. Sem isso a API não responde.
3. (Recomendado) Em **Billing → Limits**, defina um **limite de gasto mensal** (ex.: US$ 10) para nunca ter surpresa.
4. Vá em **API Keys → Create Key**, dê um nome (ex.: "Teologia em Minutos") e **copie a chave** (começa com `sk-ant-...`).
   Guarde-a com cuidado — você vai colá-la no Passo 4. Ela é como a senha do app.

---

## PASSO 2 — Subir os arquivos no GitHub

1. Crie uma conta gratuita em **https://github.com**.
2. Clique em **New repository** (botão verde). Nome: `teologia-em-minutos`. Deixe como **Public** ou **Private** (tanto faz). Clique em **Create repository**.
3. Na página do repositório novo, clique em **uploading an existing file** (ou **Add file → Upload files**).
4. **Arraste os arquivos deste pacote** para a janela, **mantendo a pasta `api`**:
   - arraste `index.html`, `package.json` e `README.md`;
   - para a pasta `api`: clique em **Add file → Create new file**, no nome digite `api/ask.js` (o GitHub cria a pasta sozinho ao digitar a barra `/`), cole o conteúdo do arquivo `ask.js` e salve.
   - *Alternativa mais fácil:* no seu computador, arraste a pasta `api` inteira junto com os outros — o GitHub aceita pastas no upload.
5. Clique em **Commit changes** para salvar.

Ao final, o repositório deve mostrar: `index.html`, `package.json`, `README.md` e a pasta `api` (com `ask.js` dentro).

---

## PASSO 3 — Publicar na Vercel

1. Crie uma conta gratuita em **https://vercel.com** e escolha **"Continue with GitHub"** (entra usando o GitHub que você acabou de criar).
2. No painel, clique em **Add New… → Project**.
3. Encontre o repositório `teologia-em-minutos` e clique em **Import**.
4. **Não mude nada** nas configurações de build (deixe tudo no padrão).
5. **Antes de clicar em Deploy**, abra **Environment Variables** e adicione:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** cole aqui a chave `sk-ant-...` do Passo 1
   - clique em **Add**.
6. Clique em **Deploy** e aguarde 1–2 minutos.

No fim, a Vercel mostra um endereço tipo `https://teologia-em-minutos.vercel.app`. **Esse é o seu app!**

---

## PASSO 4 — Usar no celular (com microfone!)

1. Abra o endereço da Vercel no **Chrome ou Safari** do celular.
2. Faça uma pergunta digitando — ou toque no **microfone** e fale. (Na primeira vez o navegador pede permissão para o microfone: **permita**.)
3. Para virar "app de verdade" na tela inicial:
   - **iPhone (Safari):** botão Compartilhar → **Adicionar à Tela de Início**.
   - **Android (Chrome):** menu ⋮ → **Adicionar à tela inicial**.
   Vai aparecer um ícone como se fosse um aplicativo instalado.

> O microfone só funciona em endereço seguro (`https://`). O endereço da Vercel já é seguro, então funciona normalmente.

---

## Sobre o custo

- O modelo usado é o **Claude Sonnet 4.6**: cerca de **US$ 3 por milhão de palavras-token de entrada** e **US$ 15 por milhão de saída**.
- Na prática, cada pergunta custa **alguns centavos de dólar** (as respostas "Curta" e "Simples" custam menos; "Longa" e "Acadêmica", um pouco mais).
- Com o **limite de gasto mensal** do Passo 1, você fica 100% no controle.
- Tabela oficial de preços: **https://platform.claude.com/docs/en/about-claude/pricing**

---

## Atualizar o app depois

Qualquer mudança é só editar o arquivo no GitHub (botão do lápis ✏️) e **Commit**. A Vercel publica a nova versão sozinha em segundos.

## Um cuidado de segurança

Como o app é aberto a quem tiver o link, em tese alguém poderia usá-lo bastante e gerar custo. Para um uso de igreja isso dificilmente é problema, mas se quiser, dá para depois acrescentar uma senha simples ou um limite de perguntas. É só pedir.

# Pedro Monteiro Portfolio

Portfólio estático com formulário de orçamento por WhatsApp e e-mail via Netlify Functions.

## Deploy na Netlify

1. Suba este projeto em um repositório Git.
2. Na Netlify, crie um novo site a partir desse repositório.
3. Use as configurações do `netlify.toml`:
   - Publish directory: `.`
   - Functions directory: `netlify/functions`
4. Em `Site configuration > Environment variables`, cadastre:
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_USER`
   - `SMTP_PASS`
   - `MAIL_TO`
5. Faça o deploy.

O arquivo `.env` é apenas para teste local e não deve ser enviado ao repositório.

## Teste local

```bash
npm install
npm start
```

Depois acesse:

```text
http://localhost:3000
```


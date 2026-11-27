# OndePassa

| Nome                | RA            |
| ------------------- | ------------- |
| Lucas Barboza Costa | 2040482422042 |

## Como executar

Requisitos:

- [Node.js](https://nodejs.org/) e [Git](https://git-scm.com/)
- App [Expo Go](https://expo.dev/go) no celular, conectado à mesma rede do computador
- Token de API do [TMDB](https://www.themoviedb.org)

1. Clone o repositório:

   ```bash
   git clone https://github.com/Lucasbc47/onde-passa.git
   cd onde-passa
   ```

### Backend

2. Instale as dependências e crie o `.env` a partir do `.env.example`:

   ```bash
   cd backend
   npm install
   cp .env.example .env
   ```

3. Edite o `.env` e preencha o `TMDB_TOKEN`:
   - crie uma conta gratuita no [TMDB](https://www.themoviedb.org) e confirme o e-mail
   - nas configurações da conta, abra a seção **API** e solicite uma chave para uso pessoal e não comercial
   - use o **API Read Access Token**, o texto longo que começa com `eyJ`

4. Inicie o servidor:

   ```bash
   npm run dev
   ```

   O backend fica em http://localhost:3000.

### Aplicativo

5. Em outro terminal, a partir da raiz do repositório, instale as dependências e inicie o app:

   ```bash
   cd mobile
   npm install
   npx expo start
   ```

6. Edite `mobile/src/utils/backendClient.js` e troque o IP da `baseURL` (`http://<IP>:3000`) pelo IP do computador na rede. Ele aparece no terminal do Expo, na linha que começa com `exp://`: em `exp://192.168.0.12:8081`, por exemplo, o IP é `192.168.0.12`.

7. Abra o Expo Go no celular e leia o QR Code exibido no terminal.

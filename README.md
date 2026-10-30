# Grok AI Chatbot — Next.js + xAI + Vercel

A ready-to-deploy ChatGPT-style chatbot powered by the Grok API.

The project uses xAI's OpenAI-compatible Responses API with the `grok-4.7` model.

## 1. Get a Grok API key

Create an API key from the xAI API console.

Do NOT put the key in frontend code.

## 2. Local environment

Copy:

`.env.example` → `.env.local`

Then put your key inside:

```env
XAI_API_KEY=your_grok_api_key_here
XAI_MODEL=grok-4.7
```

## 3. Install

```bash
npm install
```

## 4. Run

```bash
npm run dev
```

Open:

`http://localhost:3000`

## 5. GitHub

Upload the entire project folder to a GitHub repository.

Do NOT upload `.env.local`.

The `.gitignore` already prevents environment files from being committed.

## 6. Vercel

Import the GitHub repository into Vercel.

Then go to:

Project → Settings → Environment Variables

Add:

```text
XAI_API_KEY
```

Value:

```text
your_actual_grok_api_key
```

Add:

```text
XAI_MODEL
```

Value:

```text
grok-4.7
```

Then redeploy.

## How the API works

Browser:

`/api/chat`

↓

Next.js server

↓

xAI API

`https://api.x.ai/v1/responses`

↓

Grok

↓

Your chatbot

The API key is never sent to the browser.

## Included

- ChatGPT-style UI
- Grok branding
- New Chat
- Multi-turn conversation
- Enter to send
- Shift + Enter for new line
- Typing indicator
- Mobile responsive
- Server-side Grok API
- Environment variables
- Vercel deployment support

## Future upgrades

This base can later be extended with:

- Streaming responses
- Chat history
- User authentication
- Database
- File/PDF uploads
- RAG
- Web search
- X search
- Image understanding
- Image generation
- Voice
- Multiple conversations
- Chat titles
- Admin dashboard

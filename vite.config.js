import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { createMatchupStrategyMiddleware } from './server.js'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const apiConfig = {
    geminiApiKey: process.env.GEMINI_API_KEY || env.GEMINI_API_KEY,
    geminiModel: process.env.GEMINI_MODEL || env.GEMINI_MODEL || 'gemini-1.5-flash',
    openaiApiKey: process.env.OPENAI_API_KEY || env.OPENAI_API_KEY,
    openaiModel: process.env.OPENAI_MODEL || env.OPENAI_MODEL || 'gpt-5-mini',
  }

  return {
    server: {
      allowedHosts: true,
    },
    preview: {
      allowedHosts: true,
    },
    plugins: [
      react(),
      {
        name: 'matchup-strategy-api',
        configureServer(server) {
          server.middlewares.use('/api/matchup-strategy', createMatchupStrategyMiddleware(apiConfig))
        },
        configurePreviewServer(server) {
          server.middlewares.use('/api/matchup-strategy', createMatchupStrategyMiddleware(apiConfig))
        },
      },
    ],
  }
})

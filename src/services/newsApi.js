function isValidArticle(article) {
  return (
    article?.id &&
    article?.title &&
    article?.description &&
    article?.url &&
    article?.source?.name
  )
}

function maskValue(value) {
  if (!value) return '(undefined)'
  if (value.length <= 8) return '***'
  return `${value.slice(0, 4)}...${value.slice(-4)}`
}

function logEnvVars(context) {
  const viteEnvKeys = Object.keys(import.meta.env).filter((key) =>
    key.startsWith('VITE_'),
  )

  console.group(`[AppTest] Variáveis de ambiente (${context})`)
  console.log('VITE_APIKEY definida:', Boolean(import.meta.env.VITE_APIKEY))
  console.log('VITE_APIKEY (mascarada):', maskValue(import.meta.env.VITE_APIKEY))
  console.log('VITE_ENDPOINT definida:', Boolean(import.meta.env.VITE_ENDPOINT))
  console.log('VITE_ENDPOINT:', import.meta.env.VITE_ENDPOINT ?? '(undefined)')
  console.log('Chaves VITE_ disponíveis:', viteEnvKeys)
  console.log('Modo:', import.meta.env.MODE)
  console.groupEnd()
}

async function fetchFromServer() {
  console.log('[AppTest] Requisição via /api/news')

  const response = await fetch('/api/news')
  console.log('[AppTest] Resposta HTTP:', response.status, response.statusText)

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    console.warn('[AppTest] Falha na API route:', error)
    return []
  }

  const data = await response.json()
  const articles = (data.articles ?? []).filter(isValidArticle)

  console.log('[AppTest] Artigos recebidos:', data.articles?.length ?? 0)
  console.log('[AppTest] Artigos válidos:', articles.length)

  return articles
}

async function fetchLocal() {
  const APIKEY = import.meta.env.VITE_APIKEY
  const ENDPOINT = import.meta.env.VITE_ENDPOINT

  if (!APIKEY || !ENDPOINT) {
    console.error('[AppTest] VITE_APIKEY ou VITE_ENDPOINT não definidas no .env')
    return []
  }

  const params = new URLSearchParams({
    category: 'general',
    lang: 'en',
    country: 'us',
    max: '10',
    apikey: APIKEY,
  })

  const url = `${ENDPOINT}?${params}`
  console.log('[AppTest] Requisição local:', url.replace(APIKEY, maskValue(APIKEY)))

  const response = await fetch(url)
  console.log('[AppTest] Resposta HTTP:', response.status, response.statusText)

  if (!response.ok) {
    console.warn('[AppTest] Falha na API — retornando lista vazia')
    return []
  }

  const data = await response.json()
  const articles = (data.articles ?? []).filter(isValidArticle)

  console.log('[AppTest] Artigos recebidos:', data.articles?.length ?? 0)
  console.log('[AppTest] Artigos válidos:', articles.length)

  return articles
}

export async function fetchTopHeadlines() {
  const isProduction = import.meta.env.PROD

  logEnvVars(isProduction ? 'produção → usa /api/news' : 'dev → usa .env local')

  try {
    return isProduction ? await fetchFromServer() : await fetchLocal()
  } catch (error) {
    console.error('[AppTest] Erro ao buscar notícias:', error)
    return []
  }
}

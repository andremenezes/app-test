function isValidArticle(article) {
  return (
    article?.id &&
    article?.title &&
    article?.description &&
    article?.url &&
    article?.source?.name
  )
}

const APIKEY = import.meta.env.VITE_APIKEY
const ENDPOINT = import.meta.env.VITE_ENDPOINT

function maskValue(value) {
  if (!value) return '(undefined)'
  if (value.length <= 8) return '***'
  return `${value.slice(0, 4)}...${value.slice(-4)}`
}

function logEnvVars() {
  const viteEnvKeys = Object.keys(import.meta.env).filter((key) =>
    key.startsWith('VITE_'),
  )

  console.group('[AppTest] Variáveis de ambiente')
  console.log('VITE_APIKEY definida:', Boolean(APIKEY))
  console.log('VITE_APIKEY valor (mascarado):', maskValue(APIKEY))
  console.log('VITE_ENDPOINT definida:', Boolean(ENDPOINT))
  console.log('VITE_ENDPOINT valor:', ENDPOINT ?? '(undefined)')
  console.log('Chaves VITE_ disponíveis:', viteEnvKeys)
  console.log('Modo:', import.meta.env.MODE)
  console.log('Produção:', import.meta.env.PROD)
  console.groupEnd()
}

export async function fetchTopHeadlines() {
  logEnvVars()

  try {
    const params = new URLSearchParams({
      category: 'general',
      lang: 'en',
      country: 'us',
      max: '10',
      apikey: APIKEY,
    })

    const url = `${ENDPOINT}?${params}`
    console.log('[AppTest] Requisição:', url.replace(APIKEY ?? '', maskValue(APIKEY)))

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
  } catch (error) {
    console.error('[AppTest] Erro ao buscar notícias:', error)
    return []
  }
}

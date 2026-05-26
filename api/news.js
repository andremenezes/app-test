function maskValue(value) {
  if (!value) return '(undefined)'
  if (value.length <= 8) return '***'
  return `${value.slice(0, 4)}...${value.slice(-4)}`
}

export default async function handler(req, res) {
  const APIKEY = process.env.APIKEY || process.env.VITE_APIKEY
  const ENDPOINT = process.env.ENDPOINT || process.env.VITE_ENDPOINT

  console.log('[AppTest API] APIKEY definida:', Boolean(APIKEY))
  console.log('[AppTest API] APIKEY (mascarada):', maskValue(APIKEY))
  console.log('[AppTest API] ENDPOINT definida:', Boolean(ENDPOINT))
  console.log('[AppTest API] ENDPOINT:', ENDPOINT ?? '(undefined)')

  if (!APIKEY || !ENDPOINT) {
    return res.status(500).json({
      error: 'Variáveis de ambiente não configuradas na Vercel',
      details: {
        APIKEY: Boolean(APIKEY),
        ENDPOINT: Boolean(ENDPOINT),
      },
    })
  }

  try {
    const params = new URLSearchParams({
      category: 'general',
      lang: 'en',
      country: 'us',
      max: '10',
      apikey: APIKEY,
    })

    const url = `${ENDPOINT}?${params}`
    console.log('[AppTest API] Requisição:', url.replace(APIKEY, maskValue(APIKEY)))

    const response = await fetch(url)
    console.log('[AppTest API] Resposta HTTP:', response.status, response.statusText)

    const data = await response.json()
    return res.status(response.status).json(data)
  } catch (error) {
    console.error('[AppTest API] Erro:', error)
    return res.status(500).json({ error: 'Erro ao buscar notícias' })
  }
}

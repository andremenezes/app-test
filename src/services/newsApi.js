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

export async function fetchTopHeadlines() {
  try {
    const params = new URLSearchParams({
      category: 'general',
      lang: 'en',
      country: 'us',
      max: '10',
      apikey: APIKEY,
    })

    const response = await fetch(`${ENDPOINT}?${params}`)

    if (!response.ok) {
      return []
    }

    const data = await response.json()
    return (data.articles ?? []).filter(isValidArticle)
  } catch {
    return []
  }
}

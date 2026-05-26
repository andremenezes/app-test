const fallbackArticles = [
  {
    id: 'a9777dd74bcd8a91d4eb29bc2b02b126',
    title: 'At the Enhanced Games, drugs don’t get athletes banned. They could get them rich.',
    description:
      'When Shania Collins was first approached about taking performance-enhancing drugs last year, it made her nervous enough to contact two members of the Drug Enforcement Administration — her parents.',
    url: 'https://www.nbcnews.com/sports/olympics/enhanced-games-drugs-dont-get-athletes-banned-get-rich-rcna343920',
    image:
      'https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1200-630,f_auto,q_auto:best/rockcms/2026-05/260525-enhanced-games-ch-1623-5d4128.jpg',
    publishedAt: '2026-05-26T10:00:40Z',
    source: { name: 'NBC News' },
  },
  {
    id: '9278381123cc7661a79f959f5ccd0775',
    title: 'Trump’s advanced age and threats to his life serve as reminders of his own mortality',
    description:
      'When President Donald Trump’s doctors release a summary of the physical exam he is scheduled to undergo Tuesday, the document is almost certain to conclude he remains in excellent health, if his previous assessments offer any indication.',
    url: 'https://www.cnn.com/2026/05/26/politics/trump-physical-walter-reed-mortality',
    image:
      'https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-2239711541.jpg?c=16x9&q=w_800,c_fill',
    publishedAt: '2026-05-26T10:00:08Z',
    source: { name: 'CNN' },
  },
  {
    id: '179c8326fcdcd8c94789f6034808ac97',
    title: 'Texas primary runoff elections',
    description:
      'John Cornyn is trying to fend off Ken Paxton. Both parties are picking attorney general nominees. And an oil and gas regulatory race has become uncharacteristically costly.',
    url: 'https://www.texastribune.org/2026/05/26/texas-primary-runoff-may-26-races-to-watch/',
    image:
      'https://i0.wp.com/www.texastribune.org/wp-content/uploads/2026/05/What-to-Expect-02-SOCIAL.jpg?fit=1200%2C675&quality=100&ssl=1&w=1200&h=630',
    publishedAt: '2026-05-26T10:00:00Z',
    source: { name: 'The Texas Tribune' },
  },
]

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
      return fallbackArticles
    }

    const data = await response.json()
    const articles = (data.articles ?? []).filter(isValidArticle)

    return articles.length > 0 ? articles : fallbackArticles
  } catch {
    return fallbackArticles
  }
}

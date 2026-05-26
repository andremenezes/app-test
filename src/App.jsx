import { useEffect, useState } from 'react'
import { fetchTopHeadlines } from './services/newsApi'
import './App.css'

function formatDate(isoDate) {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(isoDate))
}

function App() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTopHeadlines()
      .then(setArticles)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="app">
      <header className="header">
        <h1>Bem-vindo ao AppTest</h1>
      </header>

      {!loading && articles.length === 0 && (
        <p className="empty-message">Não foi possível carregar os dados.</p>
      )}

      <section className="articles">
        {articles.map((article) => (
          <article key={article.id} className="article-card">
            {article.image && (
              <div className="article-card__image-wrap">
                <img
                  src={article.image}
                  alt=""
                  className="article-card__image"
                  loading="lazy"
                />
              </div>
            )}

            <div className="article-card__body">
              <div className="article-card__meta">
                <span className="article-card__source">{article.source.name}</span>
                <time dateTime={article.publishedAt}>
                  {formatDate(article.publishedAt)}
                </time>
              </div>

              <h2 className="article-card__title">{article.title}</h2>
              <p className="article-card__description">{article.description}</p>

              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="article-card__link"
              >
                Ler matéria completa →
              </a>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}

export default App

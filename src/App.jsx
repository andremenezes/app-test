import Navbar from './components/Navbar'
import './App.css'

function App() {
  return (
    <div className="app">
      <Navbar />

      <main className="main">
        <section id="inicio" className="section section--hero">
          <h1>Bem-vindo ao AppTest</h1>
          <p className="hero__subtitle">
            Aplicação React com navbar em tema dark
          </p>
        </section>

        <section id="sobre" className="section">
          <h2>Sobre</h2>
          <p>
            Esta é uma aplicação de demonstração criada com React e Vite,
            apresentando um componente de menu de navegação responsivo com
            tema escuro.
          </p>
        </section>

        <section id="servicos" className="section">
          <h2>Serviços</h2>
          <div className="cards">
            <article className="card">
              <h3>Desenvolvimento</h3>
              <p>Interfaces modernas e performáticas com React.</p>
            </article>
            <article className="card">
              <h3>Design</h3>
              <p>Layouts responsivos com foco na experiência do usuário.</p>
            </article>
            <article className="card">
              <h3>Consultoria</h3>
              <p>Arquitetura e boas práticas para projetos web.</p>
            </article>
          </div>
        </section>

        <section id="contato" className="section">
          <h2>Contato</h2>
          <p>Entre em contato pelo e-mail: contato@app-test.dev</p>
        </section>
      </main>
    </div>
  )
}

export default App

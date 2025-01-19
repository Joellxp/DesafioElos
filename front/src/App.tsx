import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import MembershipForm from "./components/MemberShipForm";
import ConfirmacaoCadastro from "./components/ConfirmacaoCadastro";
import "./App.css";

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <div className="background"></div>
      <header className="app-header">
        <img src="/logo_elos_noback.png" alt="Logo" className="logo" />
        <h1>Clube POP</h1>
        <nav>
          <a href="#cadastre-se" className="nav-link">Cadastre-se</a>
        </nav>
      </header>
      <main className="app-main">
        <h2>Bem-vindo ao Clube POP</h2>
        <p>Junte-se ao Clube POP e aproveite todas as vantagens exclusivas que só oferecemos para nossos membros!</p>
        <p>Descontos especiais, acesso antecipado a eventos, e muito mais!</p>
        <p>Acumule pontos a cada compra e troque por produtos incríveis!</p>
        <p>Tenha acesso a promoções exclusivas e ofertas personalizadas.</p>
        <p>Participe de eventos VIP e experiências únicas.</p>
        <p>Receba atendimento prioritário e suporte dedicado.</p>
        <p>Ganhe recompensas e prêmios ao indicar amigos para o Clube POP.</p>
        <p>Desfrute de benefícios exclusivos em parceiros selecionados.</p>
        <p>Receba newsletters com as últimas novidades e ofertas.</p>
        <p>Participe de sorteios e concursos exclusivos para membros.</p>
        <p>Tenha acesso a uma comunidade de membros com interesses semelhantes.</p>
        <button id="cadastre-se" className="cta-button">
          <Link to="/cadastro">Cadastre-se Agora</Link>
        </button>
      </main>
      <footer className="app-footer">
        <p>Todos os direitos reservados a Elos Group Enterprise</p>
      </footer>
    </div>
  );
}

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<MembershipForm />} />
        <Route path="/confirmar/:token" element={<ConfirmacaoCadastro />} />
      </Routes>
    </Router>
  )
}

export default App;
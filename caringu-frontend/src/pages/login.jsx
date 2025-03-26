import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/login.css"; // Certifique-se de que o CSS está nesta pasta
import logo from "../assets/caringu-logotipo-light.svg";
import setaVoltar from "../assets/seta-voltar.svg";
import googleLogo from "../assets/google-logo.svg";

const Login = () => {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const alternarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  return (
    <main className="login-container">
      <section className="coluna1">
        <Link to="/">
          <img className="logo" src={logo} alt="Logo da CaringU" />
        </Link>
      </section>

      <section className="coluna2">
        <div className="seta-voltar">
          <Link to="/">
            <img className="imagem-seta" src={setaVoltar} alt="Voltar" />
          </Link>
        </div>

        <div className="container">
          <header className="container-titulos">
            <h1>Pronto para continuar?</h1>
            <p>Faça login para continuar sua experiência.</p>
          </header>

          <form className="formulario" action="#" method="POST">
            <div className="inputs">
              <div className="input-container">
                <input id="email" name="email" type="email" required />
                <label htmlFor="email">Email</label>
              </div>

              <div className="input-container">
                <input
                  id="senha"
                  name="senha"
                  type={mostrarSenha ? "text" : "password"}
                  required
                />
                <label htmlFor="senha">Senha</label>
                <button
                  type="button"
                  className="alternar-senha"
                  aria-label="Mostrar/ocultar senha"
                  onClick={alternarSenha}
                >
                  <i className={`fas ${mostrarSenha ? "fa-eye-slash" : "fa-eye"}`}></i>
                </button>
              </div>
            </div>

            <div className="recuperacao-senha">
              <Link to="/recuperar-senha">Esqueci minha senha</Link>
            </div>

            <button id="botao-entrada" type="submit">Entrar</button>
          </form>

          <div className="container-botao-google">
            <button className="login-google">
              <img src={googleLogo} alt="Google Logo" />
              Entrar com Google
            </button>
          </div>

          <footer>
            <p>Não tem uma conta? <Link to="/cadastro">Cadastrar-se</Link></p>
          </footer>
        </div>
      </section>
    </main>
  );
};

export default Login;

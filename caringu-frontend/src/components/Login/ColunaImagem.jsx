// import './login.css'; // Importando o CSS
import { Link } from 'react-router-dom'; // Importando o Link
import logo from '../../assets/logos/caringu-logotipo-light.svg';
import imagemLogin from '../../assets/images/imagem-login.svg';


const ColunaImagem = () => {
  return (
    <>

        <section className="coluna1">
          <Link to="/teste">
            <img className="logo" src={logo} alt="Logo da CaringU" />
          </Link>
          <img className="imagem-login" src={imagemLogin} />
        </section>
    
    </>
  );
};

export default ColunaImagem;

// import '../../styles/login.css'; // Importando o CSS
import { Link } from 'react-router-dom'; // Importando o Link
import logo from '../../assets/logos/caringu-logotipo-light.svg';


const ColunaImagem = () => {
  return (
    <>

        <section className="coluna1">
          <Link to="/teste">
            <img className="logo" src={logo} alt="Logo da CaringU" />
          </Link>
        </section>
    
    </>
  );
};

export default ColunaImagem;

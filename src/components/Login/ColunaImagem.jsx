import { Link } from 'react-router-dom'; // Importando o Link
import logo from '../../assets/logos/caringu-logotipo-light.svg';


const ColunaImagem = () => {
  return (
    <>

        <section className="bg-[url('../assets/images/imagem-login.svg')] bg-amber-800 h-95/100 w-[33%] min-w-[250px] rounded-[1%] relative left-[20px] bg-cover bg-center bg-no-repeat max-[800px]:hidden">
          <Link to="/">
            <img className="absolute top-[20px] left-[20px] w-[13vw] max-w-[180px] min-w-[100px] h-auto"
             src={logo} alt="Logo da CaringU" />
             
          </Link>
        </section>
    </>
  );
};

export default ColunaImagem;

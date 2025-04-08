import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoBranco from '../assets/logos/caringu-logotipo-branco.svg'

const Index = () => {

  useEffect(() => {
    document.title = "CaringU"
  }, []);

  return (
    <>
      <header className='bg-black w-screen h-27 flex justify-between items-center text-white'>
        <div className=''>
          <ul className='flex flex-row justify-between w-100'>
            <li>Home</li>
            <li>Sobre Nós</li>
            <li>Serviços</li>
            <li>Fale Conosco</li>
          </ul>
        </div>
        <div>
          <img src={logoBranco} alt="" />
        </div>
        
      </header>
    </>
  );
};

export default Index;
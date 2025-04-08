import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Index = () => {

    useEffect(() => {
      document.title = "CaringU"
    }, []);

    return (
      <>
      <div>
          <Link to='./Login'>
            <h1><b>LOGIN</b></h1>
          </Link>
      </div>
      </>
    );
  };

  export default Index;
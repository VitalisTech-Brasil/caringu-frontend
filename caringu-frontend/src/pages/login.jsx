import { useState } from "react";
import ColunaImagem from "../components/Login/ColunaImagem";
import ColunaInputs from "../components/Login/ColunaInputs";
import "../components/Login/login.css"


const Login = () => {
  return (
    <main>
      <ColunaImagem/>
      <ColunaInputs/>
    </main>
  );
};

export default Login;

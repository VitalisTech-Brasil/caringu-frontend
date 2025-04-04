import React, { useState } from 'react';

const PasswordToggleButton = ({
  id,
  name,
  label,
  value,
  onChange,
  required,
}) => {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const alternarSenha = () => {
    setMostrarSenha(!mostrarSenha); // Alterna o estado
  };

  return (
    <div className="input-container">
      <input
        id="senha"
        name="senha"
        type={mostrarSenha ? 'text' : 'password'}
        placeholder=""
        required
      />
      <label htmlFor="senha">Senha</label>
      <button
        type="button"
        className="alternar-senha"
        aria-label="Mostrar/ocultar senha"
        onClick={alternarSenha}
      >
        <i className={`fas ${mostrarSenha ? 'fa-eye-slash' : ' fa-eye'}`}></i>
      </button>
    </div>
  );
};

export default PasswordToggleButton;

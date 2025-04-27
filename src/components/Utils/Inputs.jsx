import React, { useState } from 'react';
import olhoAberto from '../../assets/images/eye.svg';
import olhoFechado from '../../assets/images/eye-slash.svg';

const Input = ({
  id,
  name,
  label,
  type = 'text',
  required = false,
  isError,
  errorMessage,
  ...rest 
}) => {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword ? (mostrarSenha ? 'text' : 'password') : type;

  return (
    <div className="input-container">
      <input
        type={inputType}
        id={id}
        name={name}
        required={required}
        placeholder="  "
        {...rest} 
      />
      <label htmlFor={id} className="label">{label}</label>
      <div className="underline" />

      {isError && <span className="error-message">{errorMessage}</span>}

      {isPassword && (
        <button
          type="button"
          onClick={() => setMostrarSenha((prev) => !prev)}
          className="toggle-password"
          aria-label="Mostrar ou ocultar senha"
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#666',
            fontSize: '16px',
          }}
        >
          <img src={mostrarSenha ? olhoAberto : olhoFechado} alt="Mostrar senha" />
        </button>
      )}
    </div>
  );
};


export default Input;

import React, { useState, useRef, useEffect } from 'react';

const Input = ({
  id,
  name,
  label,
  type = 'text',
  required = false,
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
        placeholder="  " // importante pra ativar :placeholder-shown
      />
      <label htmlFor={id} className="label">{label}</label>
      <div className="underline" />

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
          <i className={`fas ${mostrarSenha ? 'fa-eye-slash' : 'fa-eye'}`} />
        </button>
      )}
    </div>
  );
};


export default Input;

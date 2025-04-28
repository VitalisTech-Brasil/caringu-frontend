import React, { useState } from 'react';
import olhoAberto from '../../assets/images/eye.svg';
import olhoFechado from '../../assets/images/eye-slash.svg';
import info2 from '../../assets/images/info-2.svg';

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

      <div className="underline" style={{ marginBottom: '5.5%' }} />


      <span className="error-message" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        height: '21px',
        marginTop: '4px',
        color: '#D45C56',
        fontSize: '16px',
      }}>
        {isError && (
          <>
            <img
              src={info2}
              alt="Erro"
              style={{ width: '16px', height: '16px' }}
            />
            {errorMessage}
          </>
        )}
      </span>



      {isPassword && (
        <button
          type="button"
          onClick={() => setMostrarSenha((prev) => !prev)}
          className="toggle-password"
          aria-label="Mostrar ou ocultar senha"
          style={{
            position: 'absolute',
            right: '10px',
            top: '20%',
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

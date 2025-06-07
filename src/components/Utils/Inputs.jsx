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
  margin,
  marginBottomLinha,
  corBordaInput,
  ...rest
}) => {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword ? (mostrarSenha ? 'text' : 'password') : type;

  return (
    <div className="input-container"
    style={{
      margin: margin,
    }}
    >
      <input
        type={inputType}
        className='text-base w-full border-solid p-0 focus:border-b-0 bg-transparent shadow-none outline-none peer'
        id={id}
        name={name}
        required={required}
        placeholder="  "
        style={{
          borderColor:corBordaInput
        }}
        {...rest}
      />
      <label htmlFor={id}
      className="absolute pointer-events-none top-0 left-0 text-[#ccc] transition-all duration-300 ease-in-out
               peer-placeholder-shown:text-base
               peer-focus:top-[-20px]
             peer-focus:text-[#333]
               peer-not-placeholder-shown:top-[-20px]
               peer-not-placeholder-shown:text-base
             peer-not-placeholder-shown:text-[#333]
              ">
      {label}
      </label>

      <div className="aabsolute bottom-0 peer-focus:bg-[#333] left-0 h-[2px] w-full bg-[#ccc] transition-all duration-300 ease-in-out"
      style={{ marginBottom: marginBottomLinha }} />
      {/* <div className="underline" style={{ marginBottom: marginBottomLinha }} /> */}


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
              className='w-4 h-4'
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
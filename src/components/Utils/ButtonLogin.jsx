import React from 'react';

export default function ButtonLogin({
  texto,
  logo,
  type,
  cor,
  corTexto,
  width,
  height,
  fontSize,
  onClick,
  disabled
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        backgroundColor: cor,
        color: corTexto,
        width: width,
        height: height,
        fontSize: fontSize,
        opacity: disabled ? 0.5 : 1, // deixa tudo meio "apagado"
        cursor: disabled ? "not-allowed" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        border: "none",
        borderRadius: "6px",
        transition: "0.2s",
      }}
    >
      {logo && (
        <img
          src={logo}
          alt="logo"
          style={{
            width: "20px",
            height: "20px",
            filter: disabled ? "grayscale(100%)" : "none", // deixa logo cinza
          }}
        />
      )}
      {texto}
    </button>
  );
}

import React from 'react';

const Botton = ({
  id,
  texto,
  onClick,
  cor,
  corTexto,
  corHover = "none",
  width,
  height,
  type,
  fontSize,
  logo,
  logoSvg,
  disabled,
  ariaLabel,
  borderColor,
  borderStyle,
  borderWidth,
  fontWeight,
}) => {
  return (
    <button
      id={id}
      type={type}
      disabled={disabled || false}
      onClick={onClick}
      aria-label={ariaLabel}
      style={{
        backgroundColor: cor,
        color: corTexto,
        width: width,
        height: height,
        fontSize: fontSize,
        fontWeight: fontWeight,
        borderColor: borderColor,
        borderStyle: borderStyle || "none",
        borderWidth: borderWidth,
      }}
      className={`
        rounded-[6px]
        outline-none 
        cursor-pointer 
        transition-colors 
        duration-200 
        ease-in-out
        flex items-center justify-center
        gap-3
        hover:brightness-90
      `}
    >
      {logoSvg}
      {logo && <img src={logo} alt="Logo" />}
      {texto}
    </button>
  );
};

export default Botton;
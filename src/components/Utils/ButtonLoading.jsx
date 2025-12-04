import React from 'react';

const ButtonLoading = ({
  id,
  texto,
  onClick,
  cor,
  corTexto,
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
  classNameExtra = "", // aceita className como prop
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
        ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
        }
        rounded-[6px]
        outline-none
        transition-colors 
        duration-200 
        ease-in-out
        flex items-center justify-center
        gap-3
        hover:brightness-90
        ${classNameExtra}
      `}
    >
      {logoSvg}
      {logo && <img src={logo} alt="Logo" />}
      {texto}
    </button>
  );
};


export default ButtonLoading;
import React, { useState } from 'react';

const Botton = ({ id,
                  texto,
                  onClick,
                  cor,
                  corTexto,
                  corHover,
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
                  fontWeight}) => {

  const [bgColor, setBgColor] = useState(cor);

  return (
    <button
      id={id}
      type={type}
      disabled={disabled || false}
      onClick={onClick}
      onMouseEnter={() => setBgColor(corHover)}
      onMouseLeave={() => setBgColor(cor)}
      aria-label={ariaLabel}
      style={{
        backgroundColor: bgColor,
        color: corTexto,
        width: width,
        height: height,
        fontSize: fontSize,
        fontWeight: fontWeight,
        borderColor: borderColor,
        borderStyle: borderStyle || "none", 
        borderWidth: borderWidth

      }}
      className="
        rounded-[6px]
        outline-none 
        cursor-pointer 
        transition-colors 
        duration-200 
        ease-in-out
        flex items-center justify-center
        gap-3
      "
    >
      {logoSvg}
      {logo && <img src={logo} alt="Logo" />}
      {texto}
    </button>
  );
};

export default Botton;
import React, { useState } from 'react';

const Botton = ({ id, texto, onClick, cor, corTexto, corHover, width, height, type, fontSize, logo }) => {

  const [bgColor, setBgColor] = useState(cor);

  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      onMouseEnter={() => setBgColor(corHover)}
      onMouseLeave={() => setBgColor(cor)}
      style={{
        backgroundColor: bgColor,
        color: corTexto,
        width: width,
        height: height,
        fontSize: fontSize
      }}
      className="
        rounded-[6px]
        
        border-none 
        outline-none 
        cursor-pointer 
        transition-colors 
        duration-200 
        ease-in-out
        flex items-center justify-center
        gap-3
      "
    >
      {logo && <img src={logo} alt="Logo" />}
      {texto}
    </button>
  );
};

export default Botton;

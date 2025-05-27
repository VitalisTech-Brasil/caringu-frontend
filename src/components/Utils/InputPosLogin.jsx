import React from "react";
import info2 from '../../assets/images/info-2.svg';

const InputPosLogin = ({
    id,
    name,
    inputType,
    placeholder,
    required = false,
    fontSize,
    fontWeight,
    width,
    isError,
    errorMessage,
    fontSizeErro,
    inputMode,
    onChange,
    onFocus,
    onBlur,
    ...rest
 }) => {
    return (
        <>
        <div className="relative">
            <input
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                inputMode={inputMode}
                type={inputType}
                className='pb-1 pt-2 border-[#333] border-solid border-b-2 p-0 bg-transparent shadow-none outline-none peer text-[var(--cor-primaria)] placeholder:text-[#15171B87]'
                id={id}
                name={name}
                required={required}
                placeholder={placeholder}
                style={{
                    fontSize: fontSize,
                    fontWeight: fontWeight,
                    width:width
                }}
                {...rest}
            />
            <span className="error-message" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    height: 'auto',
                    marginTop: '12px',
                    color: '#D45C56',
                    fontSize: fontSizeErro,
                  }}>
                    {isError && (
                      <>
                        <img
                          src={info2}
                          alt="Erro"
                          className="w-4 h-4"
                        />
                        {errorMessage}
                      </>
                    )}
                  </span>

            </div>
        </>
    );
}

export default InputPosLogin;
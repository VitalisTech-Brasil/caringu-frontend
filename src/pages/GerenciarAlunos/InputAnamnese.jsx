import React from "react";
import info2 from '../../assets/images/info-2.svg';

const InputAnamnese = ({
    id,
    name,
    inputType,
    placeholder,
    required = false,
    value,
    inputMode,
    maxLength,
    onChange,
    onFocus,
    onBlur,
    fontSize,
    fontWeight,
    width,
    fontSizeErro,
    isError,
    errorMessage,
    ...rest
 }) => {
    return (
        <>
        <div className="relative">
            <input
                id={id}
                name={name}
                type={inputType}
                placeholder={placeholder}
                required={required}
                value={value}
                inputMode={inputMode}
                maxLength={maxLength}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                className='pb-1 pt-2 w-full border-[#333] border-solid border-b-2 p-0 bg-transparent shadow-none outline-none peer text-[var(--cor-primaria)] placeholder:text-[#15171B87]'
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

export default InputAnamnese;
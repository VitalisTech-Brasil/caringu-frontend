import React, { useState, useRef, useEffect } from 'react';

export default function InputVerificacao({ length = 4, onComplete }) {
  const [values, setValues] = useState(Array(length).fill(''));
  const inputsRef = useRef([]);

  // Focar no primeiro campo ao carregar o componente
  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return; // só aceita número único
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);

    // Se preencheu e não é o último, vai para o próximo
    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    // Chama onComplete quando todos os campos forem preenchidos
    if (newValues.every(v => v !== '')) {
      onComplete(newValues.join(''));
    }
  };

  const handleKeyDown = (e, index) => {
    // Se Backspace e o campo estiver vazio, vai para o anterior
    if (e.key === 'Backspace' && !values[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex gap-5 justify-center mb-6">
      {values.map((val, idx) => (
        <input
          key={idx}
          type="text"
          inputMode="numeric"
          maxLength="1"
          className="w-17 h-20 text-2xl text-center rounded bg-[#EFEFEF] focus:outline-none focus:ring-2 ring-orange-500"
          value={val}
          onChange={(e) => handleChange(idx, e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          ref={(el) => inputsRef.current[idx] = el}
        />
      ))}
    </div>
  );
}

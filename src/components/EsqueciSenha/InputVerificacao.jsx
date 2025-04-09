import React, { useState, useRef } from 'react';

export default function InputVerificacao({ length = 4, onComplete }) {
  const [values, setValues] = useState(Array(length).fill(''));
  const inputsRef = useRef([]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return; // só aceita número único
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);

    // se preencheu e não é o último, vai para o próximo
    if (value && index < length - 1) {
      inputsRef.current[index + 1].focus();
    }

    if (newValues.every(v => v !== '')) {
      onComplete(newValues.join(''));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !values[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <div className="flex gap-2 justify-center">
      {values.map((val, idx) => (
        <input
          key={idx}
          type="text"
          inputMode="numeric"
          maxLength="1"
          className="w-20 h-20 text-2xl text-center rounded bg-[#EFEFEF] focus:outline-none focus:ring-2 ring-orange-500"
          value={val}
          onChange={(e) => handleChange(idx, e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          ref={(el) => inputsRef.current[idx] = el}
        />
      ))}
    </div>
  );
}

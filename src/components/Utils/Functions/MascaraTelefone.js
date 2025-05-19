import React from 'react'

export function formatarTelefone(telefone) {
    if (!telefone) return "Sem Telefone";
    let numeros = telefone.replace(/\D/g, '');

    if (numeros.length > 11) numeros = numeros.slice(0, 11);

    let formatted = "";

    if (numeros.length > 7) {
        formatted = `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
    } else if (numeros.length > 2) {
        formatted = `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    } else if (numeros.length > 0) {
        formatted = `(${numeros}`;
    }

    return formatted;
}

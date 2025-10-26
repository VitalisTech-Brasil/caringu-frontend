export default function MascaraGenero(genero) {
    switch (genero) {
        case 'HOMEM_CISGENERO':
            return 'Homem Cisgênero';
        case 'HOMEM_TRANSGENERO':
            return 'Homem Transgênero';
        case 'MULHER_CISGENERO':
            return 'Mulher Cisgênero';
        case 'MULHER_TRANSGENERO':
            return 'Mulher Transgênero';
        case 'NAO_BINARIO':
            return 'Não Binário';
        default:
            return 'Não informado';
    }
}
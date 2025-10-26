export default function MascaraNivelExperiencia(nivel) {
    switch (nivel) {
        case 'INICIANTE':
            return 'Iniciante';
        case 'INTERMEDIARIO':
            return 'Intermediário';
        case 'AVANCADO':
            return 'Avançado';
        default:
            return 'Não informado';
    }
}
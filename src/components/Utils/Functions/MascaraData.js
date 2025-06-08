export default function FormataData(data) {
    if (!data) return "Sem Data";

    const partes = data.split("-"); // ["1985", "02", "10"]

    if (partes.length !== 3) return "Data inválida";

    const [ano, mes, dia] = partes;

    return `${dia}/${mes}/${ano}`;
}
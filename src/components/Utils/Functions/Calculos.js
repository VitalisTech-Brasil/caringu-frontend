export default function calcularIdade(data) {
    if (!data) return "Sem Data";

    let dataNascimento;

    if (/^\d{2}\/\d{2}\/\d{4}$/.test(data)) {
        const [dia, mes, ano] = data.split("/");
        dataNascimento = new Date(`${ano}-${mes}-${dia}T00:00:00`);
    } else {
        dataNascimento = new Date(data);
    }

    if (isNaN(dataNascimento.getTime())) return "Data Inválida";

    const hoje = new Date();
    let idade = hoje.getFullYear() - dataNascimento.getFullYear();
    const mes = hoje.getMonth() - dataNascimento.getMonth();

    if (mes < 0 || (mes === 0 && hoje.getDate() < dataNascimento.getDate())) {
        idade--;
    }

    return idade;
}
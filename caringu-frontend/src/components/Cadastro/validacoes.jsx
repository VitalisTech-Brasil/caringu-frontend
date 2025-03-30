export const validarDadosCadastrais = (dadosCadastrais) => {
    const { nome, dataNascimento, email, telefone, senha, confirmarSenha, genero } = dadosCadastrais;
    
    if (!nome || !dataNascimento || !email || !telefone || !senha || !confirmarSenha || !genero) {
        alert("validarDadosCadastrais: Todos os campos são obrigatórios!");
        return false;
    }

    if (senha.length < 6 || senha.length > 16) {
        alert("A senha deve ter entre 6 e 16 caracteres.");
        return false;
    }

    if (!/[!@#$%^&*]/.test(senha)) {
        alert("A senha deve conter pelo menos um caractere especial.");
        return false;
    }

    if (!/[A-Z]/.test(senha)) {
        alert("A senha deve conter pelo menos uma letra maiúscula.");
        return false;
    }

    if (!/\d/.test(senha)) {
        alert("A senha deve conter pelo menos um número.");
        return false;
    }

    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem.");
        return false;
    }

    return true;
};

export const validarDadosProfissionais = (dadosProfissionais) => {
    const { cref, experiencia, especialidade } = dadosProfissionais;

    if (!cref || !experiencia || !especialidade) {
        alert("validarDadosProfissionais: Todos os campos são obrigatórios!");
        return false;
    }

    if (cref.length < 11) {
        alert("O CREF deve ter 11 caracteres.");
        return false;
    }

    if (experiencia < 0 || experiencia > 50) {
        alert("Os anos de experiência devem estar entre 0 e 50.");
        return false;
    }

    return true;
};
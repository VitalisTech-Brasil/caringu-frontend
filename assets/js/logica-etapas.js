const botaoAluno = document.getElementById("botao-aluno");
const botaoPersonal = document.getElementById("botao-personal");
const botaoProsseguir = document.querySelector(".prosseguir");
const botaoVoltar = document.querySelector(".voltar");
const etapas = document.querySelectorAll(".container > div:not(footer)");
const indicadores = document.querySelectorAll(".indicador");

let etapaAtual = 0;
let tipoUsuario = sessionStorage.getItem("tipoUsuario") || "";

console.log(etapas);
console.log(indicadores);

botaoAluno.addEventListener("click", function () {
    tipoUsuario = "aluno";
    sessionStorage.setItem("tipoUsuario", tipoUsuario);
    atualizarSelecao(botaoAluno, botaoPersonal);
});

botaoPersonal.addEventListener("click", function () {
    tipoUsuario = "personal";
    sessionStorage.setItem("tipoUsuario", tipoUsuario);
    atualizarSelecao(botaoPersonal, botaoAluno);
});

botaoProsseguir.addEventListener("click", function () {
    const tipoUsuario = sessionStorage.getItem("tipoUsuario");

    if (etapaAtual === 0 && !tipoUsuario) {
        alert("Por favor, selecione um tipo de conta antes de prosseguir.");
        return;
    }

    if (etapaAtual === 1) {

        let nome = document.getElementById("input_nome").value.trim();
        let dataNascimento = document.getElementById("input_dataNascimento").value.trim();
        let cpf = document.getElementById("input_cpf").value.trim();
        let genero = document.getElementById("select_genero").value;

        if (!nome || !dataNascimento || !cpf || !genero) {
            alert("Você deve preencher/selecionar todos os campos!");
            return;
        }

        if (!validarCPF(cpf)) {
            alert("CPF inválido!");
            return;
        }

    } else if (etapaAtual == 2 && tipoUsuario == "personal") {

        let cref = document.getElementById("input_cref").value.trim();
        let anosExperiencia = document.getElementById("input_anosExperiencia").value.trim();
        let especialidade = document.getElementById("select_especialidade").value;

        if (!cref || !anosExperiencia || !especialidade) {
            alert("Você deve preencher/selecionar todos os campos!");
            return;
        }

    } else if (etapaAtual == 2 && tipoUsuario == "aluno") {
        let deficiencia = document.getElementById("select_deficiencia").value;
        let condicaoMedica = document.getElementById("select_condicaoMedica").value;
        let lesao = document.getElementById("select_lesao").value;

        let nivelAtividadeAtual = document.getElementById("select_nivelAtividadeAtual").value;
        let frequenciaTreino = document.getElementById("select_frequenciaTreino").value;
        let objetivo = document.getElementById("select_objetivo").value;

        if (!deficiencia || !condicaoMedica || !lesao || !nivelAtividadeAtual || !frequenciaTreino || !objetivo) {
            alert("Você deve selecionar todos os campos!");
            return;
        }
        
    } else if (etapaAtual == 3) {
        let email = document.getElementById("input_email").value;
        let celular = document.getElementById("input_celular").value;
        let senha = document.getElementById("input_senha").value;
        let confirmarSenha = document.getElementById("input_confirmarSenha").value;

        if (!email || !celular || !senha || !confirmarSenha) {
            alert("Você deve selecionar todos os campos!");
            return;
        }

        if (!validarSenha(senha)) {
            alert("Critérios de aceitação para senha incorretos!");
            return;
        }

        if (confirmarSenha != senha) {
            alert("Senhas não coincidem!");
            return;
        }

        if (!validarEmail(email)) {
            alert("Insira um e-mail válido!")
            return;
        }

    }

    mudarEtapa(1);
    console.log(etapas);
    console.log(indicadores);
});

botaoVoltar.addEventListener("click", function () {

    if (indicadores[0].classList.contains("etapa-atual")) {
        window.location.href = "../index.html";
        return;
    }

    document.querySelector(".prosseguir").innerHTML = "Prosseguir";
    mudarEtapa(-1);
    console.log(etapas);
    console.log(indicadores);
});

function mudarEtapa(direcao) {
    const novaEtapa = etapaAtual + direcao;

    if (novaEtapa < 0 || novaEtapa >= etapas.length) {
        return;
    }

    etapas.forEach(etapa => etapa.style.display = "none");

    if (indicadores[etapaAtual]) {
        indicadores[etapaAtual].classList.remove("etapa-atual");
    }

    etapaAtual = novaEtapa;
    console.log(etapaAtual);

    if (etapaAtual === 2) {

        const tipoUsuario = sessionStorage.getItem("tipoUsuario");

        if (tipoUsuario === "aluno") {
            document.querySelector(".etapa3-aluno").style.display = "flex";

        } else {
            document.querySelector(".etapa3-personal").style.display = "flex";

        }
    } else if (etapaAtual === 3) {

        document.querySelector(".etapa4").style.display = "flex";
        document.querySelector(".prosseguir").innerHTML = "Finalizar";

    } else if (etapaAtual === 4) {

        document.querySelector(".tela-sucesso").style.display = "flex";
        document.querySelector("nav").style.display = "none";
        document.querySelector("footer").style.display = "none";

    } else {

        etapas[etapaAtual].style.display = "flex";

    }

    // O "?" é tipo um Optional<>
    indicadores[etapaAtual]?.classList.add("etapa-atual");
    botaoProsseguir.style.display = etapaAtual === etapas.length - 2 ? "none" : "flex";
}

function atualizarSelecao(botaoSelecionado, botaoOutro) {
    botaoSelecionado.classList.add("botaoSelecionado");
    botaoOutro.classList.remove("botaoSelecionado");
}

function validarSenha(senha) {
    const comprimentoValido = senha.length >= 6;
    
    const temCaractereEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(senha);
    
    const temMaiuscula = /[A-Z]/.test(senha);
    
    const temNumero = /\d/.test(senha);

    if (comprimentoValido && temCaractereEspecial && temMaiuscula && temNumero) {
        return true;
    } else {
        return false;
    }
}


function validarEmail(email) {
    var arroba = -1;
    var ponto = -1;

    for (var i = 0; i < email.length; i++) {
        if (email[i] === '@') {
            arroba = i;
        } else if (email[i] === '.') {
            ponto = i;
        }
    }

    return arroba > 0 && ponto > arroba + 1 && ponto < email.length - 1;


}

function mascaraCelular() {
    let celular = document.getElementById("input_celular");

    celular.value = celular.value.replace(/\D+/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d{1,})/, '$1-$2'); 
}

function mascaraCPF() {
    let cpf = document.getElementById("input_cpf");

    cpf.value = cpf.value.replace(/\D+/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

function mascaraCREF() {
    let cref = document.getElementById("input_cref");

    
    let valor = cref.value.replace(/[^0-9A-Za-z]/g, '').toUpperCase();

    if (valor.length > 6) {
        valor = valor.slice(0, 6) + '-' + valor.slice(6);
    }

    if (valor.length > 8) {
        valor = valor.slice(0, 8) + '/' + valor.slice(8);
    }

    cref.value = valor;
}


function mascaraData() {
    let dataNascimento = document.getElementById("input_dataNascimento");

    dataNascimento.value = dataNascimento.value.replace(/\D+/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d{1,2})$/, '$1/$2');
}

/* Função que realiza a conta para verificar se o CPF realmente existe (faz umas contas pra verificar se combina)*/
function validarCPF(cpf) {

    cpf = cpf.replace(/[.\-]/g, "");

    if (cpf.length !== 11) {
        return false;
    }

    if (/^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    let soma = 0;
    let peso = 10;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf[i]) * peso--;
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
        resto = 0;
    }
    if (resto !== parseInt(cpf[9])) {
        return false;
    }

    soma = 0;
    peso = 11;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf[i]) * peso--;
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
        resto = 0;
    }
    if (resto !== parseInt(cpf[10])) {
        return false;
    }


    return true;
}

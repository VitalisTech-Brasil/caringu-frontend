document.addEventListener("DOMContentLoaded", function() {
    const botoes = document.querySelectorAll(".container-botoes button");

    botoes.forEach(botao => {
        botao.addEventListener("click", function() {
            botoes.forEach(btn => btn.classList.remove("botaoSelecionado"));

            this.classList.add("botaoSelecionado");

            salvarTipoContaCadastro(this.id);
        });
    });
});

function salvarTipoContaCadastro(tipo) {
    console.log(`Tipo de conta selecionado: ${tipo}`);
    // Falta colocar no sessionStorage o tipo de usuário que ele escolher... ALUNO ou PERSONAL
}
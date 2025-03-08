const form = document.querySelector(".formulario");

form.addEventListener("submit", (event) => {
    verificarUsuario(event);
});

const verificarUsuario = async (event) => {
    console.log("Interceptando envio do formulário...");
    event.preventDefault(); 

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    if (!email || !senha) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    try {
        const resposta = await fetch(`http://localhost:3000/pessoas?email=${email}`);
        const usuario = await resposta.json();

        if (usuario.length === 0) {
            alert("Usuário não encontrado!");
            return;
        }

        /* payload é o corpo da requisição... */
        const payloadUsuario = usuario[0]; 

        if (usuario[0].senha !== senha) {
            alert("Senha incorreta!");
            return;
        }

        const sessaoLogada = await fetch("http://localhost:3000/sessao", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                usuarioId: payloadUsuario.id,
                nome: payloadUsuario.nome,
                email: payloadUsuario.email,
                logadoEm: new Date().toISOString()
            })
        });

        if (!sessaoLogada.ok) {
            throw new Error("Erro ao criar sessão.");
        }

        alert(`Bem-vindo, ${payloadUsuario.nome}!`);
        console.log("Sessão criada com sucesso");
        console.log("Redirecionando para home.html...");

        window.location.href = "home.html";

    } catch (error) {
        console.error("Erro ao realizar login:", error);
        alert("Erro ao conectar ao servidor.");
    }
}

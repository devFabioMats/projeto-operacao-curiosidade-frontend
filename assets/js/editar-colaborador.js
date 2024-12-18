document.querySelector("#btn-alterar").addEventListener("click", (event) => {
    event.preventDefault();
    editar();
});

function validacao(nome, email, idade) {
    if (nome == "") {
        alert("⚠️ O campo nome deve estar preenchido.");
        return false;
    }

    if (email == "") {
        alert("⚠️ O campo email deve estar preenchido.");
        return false;
    } else if (!email.includes("@") || !email.includes(".")) {
        alert("⚠️ O campo de login deve conter um '@' e o '.dominio'.");
        return false;
    }

    if (idade == "") {
        alert("⚠️ O campo idade deve estar preenchido.");
        return false;
    } else if (idade < 18 || idade > 100) {
        alert("⚠️ O colaborador deve ter entre 18 e 100 anos.");
        return false;
    }

    return true;
}

function editar() {
    const queryString = window.location.search; // Contains "?id=<The Given ID>"
    const params = new URLSearchParams(queryString); // Converts the query string to javascript object
    const idColaborador = params.get("id"); // Contains the ID given
    let nome = document.getElementById("nome-editar").value;
    let status = document.getElementById("status");
    let idade = Number.parseInt(document.getElementById("idade").value);
    let email = document.getElementById("email").value;
    let endereco = document.getElementById("endereco").value;
    let interesses = document.getElementById("interesses").value;
    let sentimentos = document.getElementById("sentimentos").value;
    let valores = document.getElementById("valores").value;

    if (status.checked) {
        status = true;
    } else {
        status = false;
    }

    if (!validacao(nome, email, idade)) {
        return;
    }

    let colaborador = {
        status,
        nome,
        idade,
        email,
        endereco,
        interesses,
        sentimentos,
        valores
    };

    fetch(`https://localhost:7123/oc-api/Colaborador/${idColaborador}`, {
        method: 'PUT',
        headers: {
            Accept: 'application.json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(colaborador)
    }).then(response => {
        if (!response.ok) {
            console.log(response)
            return new Error('falhou a requisição');
        }
    }).catch(error => console.error('Erro:', error));

    window.location.href = "../pages/tela-cadastro.html";
}
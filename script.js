const perfis = [
    {
        nome: "Engenheiro de Sistemas",
        categoria: "Construção",
        descricao: "Transforma problemas em soluções.",
        imagem: "perfil1.jpg",
        recomendacao: "Verifique os equipamentos da nave."
    },
    {
        nome: "Cientista Explorador",
        categoria: "Investigação",
        descricao: "Gosta de pesquisar e fazer descobertas.",
        imagem: "perfil2.jpg",
        recomendacao: "Investigue o planeta desconhecido."
    },
    {
        nome: "Explorador de Campo",
        categoria: "Exploração",
        descricao: "Gosta de descobrir novos lugares.",
        imagem: "perfil3.jpg",
        recomendacao: "Explore o território com cuidado."
    },
    {
        nome: "Estrategista da Missão",
        categoria: "Planejamento",
        descricao: "Gosta de organizar e planejar.",
        imagem: "perfil4.jpg",
        recomendacao: "Organize os próximos passos da missão."
    }
];

const form = document.getElementById("formulario");
const nascimento = document.getElementById("nascimento");

nascimento.max = new Date().toISOString().split("T")[0];

form.onsubmit = function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const data = nascimento.value;

    if (!nome || !data) {
        alert("Preencha todos os campos!");
        return;
    }

    const dataNascimento = new Date(data + "T00:00:00");
    const hoje = new Date();

    if (dataNascimento > hoje) {
        alert("A data não pode ser futura!");
        return;
    }

    let idade = hoje.getFullYear() - dataNascimento.getFullYear();

    if (
        hoje.getMonth() < dataNascimento.getMonth() ||
        (hoje.getMonth() == dataNascimento.getMonth() &&
        hoje.getDate() < dataNascimento.getDate())
    ) {
        idade--;
    }

    let pontos = [0, 0, 0, 0];

    for (let i = 1; i <= 4; i++) {
        let resposta = document.getElementById("p" + i).value;

        if (!resposta) {
            alert("Responda todas as perguntas!");
            return;
        }

        pontos[resposta - 1]++;
    }

    let maior = Math.max(...pontos);
    let vencedores = [];

    for (let i = 0; i < pontos.length; i++) {
        if (pontos[i] == maior) {
            vencedores.push(i);
        }
    }

    document.getElementById("mensagem").innerText = "Olá, " + nome + "!";
    document.getElementById("idade").innerText = "Idade: " + idade + " anos";

    if (vencedores.length > 1) {

        document.getElementById("perfil").innerText = "Empate!";
        document.getElementById("categoria").innerText =
            "Você combina com mais de um perfil.";

        let nomes = "";

        for (let i = 0; i < vencedores.length; i++) {
            nomes += perfis[vencedores[i]].nome;

            if (i < vencedores.length - 1) {
                nomes += ", ";
            }
        }

        document.getElementById("descricao").innerText =
            "Perfis: " + nomes;

        document.getElementById("recomendacao").innerText =
            "Você tem características desses perfis.";

        document.getElementById("imagem").hidden = true;

    } else {

        let vencedor = vencedores[0];
        let perfil = perfis[vencedor];

        document.getElementById("perfil").innerText = perfil.nome;
        document.getElementById("categoria").innerText =
            "Categoria: " + perfil.categoria;
        document.getElementById("descricao").innerText =
            perfil.descricao;
        document.getElementById("recomendacao").innerText =
            "Recomendação: " + perfil.recomendacao;

        let imagem = document.getElementById("imagem");
        imagem.src = perfil.imagem;
        imagem.alt = perfil.nome;
        imagem.hidden = false;
    }

    form.hidden = true;
    document.getElementById("resultado").hidden = false;
};

document.getElementById("refazer").onclick = function() {
    form.reset();
    form.hidden = false;
    document.getElementById("resultado").hidden = true;
    document.getElementById("imagem").hidden = true;
};
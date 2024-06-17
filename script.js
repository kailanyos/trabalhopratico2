async function getdados() {
    const response = await fetch("https://api.github.com/users/kailanyos");
    const githubPerfil = await response.json();
    return githubPerfil;
}

async function getrepos() {
    const resposta = await fetch("https://api.github.com/users/kailanyos/repos");
    const githubRepos = await resposta.json();
    return githubRepos;
}

async function getconteudo() {
    const resp = await fetch("/json/bd.json");
    const conteudo = await resp.json();
    return conteudo;
}

async function MostrarPerfil() {
    const data = await getdados();
    const telaPerfil = document.getElementById("mostrarperfil");
    let divPerfil = document.createElement("div");
    divPerfil.className = "col-10";
    divPerfil.innerHTML = `
    <h3>${data.name}</h3>
    <p class="mx-2">${data.bio}</p>
    <div class="row">
        <div class="col-12 ">
            <a href="https://www.instagram.com/kailanyos/" target="new_blank"><img class="mx-2" id="ig" src="imgs/ig.png" alt="..."></a>
            <a href="https://www.github.com/kailanyos/" target="new_blank"><img class="mx-2" id="git" src="imgs/gith.png" alt="..."></a>
            <div class="float-end">
                <img id="followers" src="imgs/followers.png" alt="..."> <span>${data.followers} followers</span>
            </div>
        </div>
    </div>
    `;
    telaPerfil.appendChild(divPerfil);

    const telaRepositorios = document.getElementById("mostrarepo");
    let divRepositorios = document.createElement("div");
    divRepositorios.className = "col-10";
    divRepositorios.innerHTML = `
    <h3 id="sessao2">Repositórios (${data.public_repos})</h3>
    `;
    telaRepositorios.appendChild(divRepositorios);
}

async function MostraRepos() {
    const repos = await getrepos();
    const repositorios = document.getElementById("mostrarepos");
    const linha = document.createElement("div");
    linha.className = "row";

    repos.forEach(element => {
        let divRepos = document.createElement("div");
        divRepos.className = "col-12 col-sm-6 col-md-4 M-2";
        divRepos.innerHTML = `
            <a href="/htmls/repo.html" class="text-decoration-none text-dark">
                    <div class="card">
                        <div class="card-header fw-bold">${element.name}</div>
                        <div class="card-body">
                            <p>${element.description || 'Sem descrição'}</p>
                            <span class="badge bg-danger p-2">${element.language}</span>
                        </div>
                    </div>
                </a>
        `;
        linha.appendChild(divRepos);
    });
    repositorios.appendChild(linha);
}

async function MostrarConteudo() {
    const contmostra = document.getElementById("sugeridos");
    const dado = await getconteudo();
    const conteudo = dado.conteudo;
    let newDiv = document.createElement("div");
    newDiv.className = "row";

    let carouselIndicators = "";
    let carouselItems = "";

    conteudo.forEach((item, index) => {
        const isActive = index === 0 ? "active" : "";
        carouselIndicators += `<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="${index}" class="${isActive}" aria-current="true" aria-label="Slide ${index + 1}"></button>`;
        carouselItems += `
            <div class="carousel-item ${isActive}">
                <a href="${item.url}">
                    <img src="${item.imagem}" class="d-block w-100" id="carrosel" alt="Slide ${index + 1}">
                </a>
                <div class="carousel-caption d-none d-md-block">
                    <h5>${item.nome}</h5>
                </div>
            </div>
        `;
    });

    newDiv.innerHTML = `
        <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
            <div class="carousel-indicators">
                ${carouselIndicators}
            </div>
            <div class="carousel-inner">
                ${carouselItems}
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    `;

    contmostra.appendChild(newDiv);
    var myCarousel = new bootstrap.Carousel(document.getElementById('carouselExampleCaptions'), {
        interval: 5000 
    });
}

async function MostrarAmigos() {
    const contmostra = document.getElementById("amigos");
    const dado = await getconteudo();
    const conteudo = dado.amigos;
    let newDiv = document.createElement("div");
    newDiv.className = "row";

    conteudo.forEach((item) => {
        let newDiv1 = document.createElement("div");
        newDiv1.className = "col-4";
        newDiv1.innerHTML = `
        <div class="card w-100 h-100">
          <img class="imgcolegas img-fluid mb-2" src="${item.imagem}">
          <div class="card-body">
            <h3>${item.nome}</h3>
          </div>
        </div>
        `;
        newDiv.appendChild(newDiv1);
    });

    contmostra.appendChild(newDiv);
}

MostrarPerfil();
MostraRepos();
MostrarConteudo();
MostrarAmigos();
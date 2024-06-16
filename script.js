async function getdados() {
    const response = await fetch("https://api.github.com/users/kailanyos");
    const githubPerfil = await response.json();
    console.log(githubPerfil);
    return githubPerfil;
}

async function mostrarperfil() {
    const data = await getdados();
    const tela = document.getElementById("mostrarperfil");
    let newDiv = document.createElement("div");
    newDiv.className = "col-10";
    newDiv.innerHTML = `
    <h3>${data.name}</h3>
    <p class="mx-2">${data.bio}</p>
    <div class="row">
        <div class="col-12 ">
            <a href="https://www.instagram.com/kailanyos/" target="new_blank"><img class="mx-2" id = "ig" src = "imgs/ig.png" alt = "..."></a>
            <a href="https://www.github.com/kailanyos/" target="new_blank"><img class="mx-2" id = "git" src = "imgs/gith.png" alt = "..."></a>
        
            <img id = "followers" src = "imgs/followers.png" alt = "..."> <span>${data.followers}</span>
        </div>
    </div>
    <h3 id="sessao2">Repositórios (${data.public_repos})</h3>
    <hr>
    `;
    tela.appendChild(newDiv);
}
mostrarperfil();

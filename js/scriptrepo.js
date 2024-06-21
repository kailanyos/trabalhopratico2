async function getrep() {
    const p = await fetch("https://api.github.com/users/kailanyos/repos");
    const r = await p.json();
    return r;
}

async function MostrarRep()
{
    const date = await getrep();
    const params = new URLSearchParams(location.search);
    const repoId = parseInt(params.get("id"));
    const TelaRepos = document.getElementById("repopage");
    let repositorio = date.find(repo=>repo.id===repoId);
    let divRepo = document.createElement("div");
    divRepo.className = "col-10";
    divRepo.innerHTML = `
        <h5>${repositorio.name}</h5>
    `;
    TelaRepos.appendChild(divRepo);
}

MostrarRep();
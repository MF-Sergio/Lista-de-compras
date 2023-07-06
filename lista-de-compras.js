const botao = document.querySelector("[data-botao]");
const lista = document.querySelector("[data-lista]");
const itensExistentes = new Set();

const adicionarItem = () => {
    const nomeiaCategoria = prompt("Em qual categoria você quer adicionar o seu item?").toUpperCase().trim();
    const nomeiaItem = prompt("Qual item você quer adicionar na lista?").toLowerCase().trim();

    const chaveItem = `${nomeiaCategoria}_${nomeiaItem}`;

    if (itensExistentes.has(chaveItem)) {
        alert(`O item ${nomeiaItem} já está na lista`);
        return;
    }

    let categoriaJaExiste = false;
    const categoriaExistente = document.querySelectorAll('.categoria__titulo');

    for (const categoriaTitulo of categoriaExistente) {
        if (categoriaTitulo.textContent == nomeiaCategoria) {
            const item = criarItem(nomeiaItem);
            categoriaTitulo.parentElement.appendChild(item);
            categoriaJaExiste = true;

            break;
        }
    }

    if (!categoriaJaExiste) {
        const novaCategoria = criarCategoria(nomeiaCategoria);
        lista.appendChild(novaCategoria);
        const item = criarItem(nomeiaItem);
        novaCategoria.appendChild(item);
    }

    itensExistentes.add(chaveItem);
    atualizarBotoesRemover();
}

const criarItem = (nomeiaItem) => {
    const item = document.createElement("li");
    item.textContent = nomeiaItem;
    item.classList.add("item");

    const botaoRemover = document.createElement("button");
    botaoRemover.classList.add("botao-remover");
    botaoRemover.addEventListener("click", removerItem);
    item.appendChild(botaoRemover);

    return item;
}

const criarCategoria = (nomeiaCategoria) => {
    const novaCategoria = document.createElement("ul");
    novaCategoria.classList.add("categoria");

    const categoriaTitulo = document.createElement("h3");
    categoriaTitulo.textContent = nomeiaCategoria;
    categoriaTitulo.classList.add("categoria__titulo");
    novaCategoria.appendChild(categoriaTitulo);

    return novaCategoria;
}

const removerItem = (event) => {
    const item = event.target.parentElement;
    const categoria = item.parentElement;
    const chaveItem = `${categoria.querySelector('.categoria__titulo').textContent}_${item.textContent}`;

    itensExistentes.delete(chaveItem);
    categoria.removeChild(item);

    const itensCategoria = categoria.querySelectorAll('.item');
    if (itensCategoria.length === 0) {
        categoria.parentElement.removeChild(categoria);
    }

    atualizarBotoesRemover();
}

const atualizarBotoesRemover = () => {
    const botoesRemover = document.querySelectorAll(".botao-remover");
    botoesRemover.forEach((botao) => {
        botao.removeEventListener("click", removerItem);
        botao.addEventListener("click", removerItem);
    });
}

botao.addEventListener('click', adicionarItem);
window.onload = () => {
    // Carregar filiais e produtos
    fetchFiliais();
    fetchProdutos();
};

let produtos = [];
let total = 0;

// Função para buscar filiais
async function fetchFiliais() {
    const response = await fetch('/filiais');
    const filiais = await response.json();
    const filialSelect = document.getElementById('filial');
    filiais.forEach(filial => {
        const option = document.createElement('option');
        option.value = filial.id;
        option.textContent = filial.nome;
        filialSelect.appendChild(option);
    });
}

// Função para buscar produtos
async function fetchProdutos() {
    const response = await fetch('/produtos');
    produtos = await response.json();
    const produtosDiv = document.getElementById('produtos');

    produtos.forEach(produto => {
        const div = document.createElement('div');
        div.classList.add('produto');
        div.innerHTML = `
            <span>${produto.nome}</span>
            <input type="number" id="quantidade-${produto.id}" value="0" min="0" onchange="atualizarTotal()">
            <span>R$${produto.valor}</span>
        `;
        produtosDiv.appendChild(div);
    });
}

// Função para calcular o total
function atualizarTotal() {
    total = 0;
    produtos.forEach(produto => {
        const quantidade = document.getElementById(`quantidade-${produto.id}`).value;
        total += produto.valor * quantidade;
    });
    document.getElementById('total').textContent = total.toFixed(2);
}

// Função para finalizar o pedido
document.getElementById('finalizar').onclick = () => {
    const cliente = document.getElementById('cliente').value;
    alert(`Pedido de ${cliente} finalizado! Total: R$${total.toFixed(2)}`);
};

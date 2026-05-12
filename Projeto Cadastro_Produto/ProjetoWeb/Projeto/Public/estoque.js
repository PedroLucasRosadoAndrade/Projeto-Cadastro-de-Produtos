const API = 'http://localhost:3601';

// Listar
function listar() {
    fetch(API + '/produtos')
        .then(res => res.json())
        .then(data => {
            let html = '';

            data.forEach(p => {
                html += `
          <tr>
            <td>${p.id_prod}</td>
            <td>${p.nome_prod}</td>
            <td>${p.valor_prod}</td>
            <td>${p.quantidade_prod}</td>
            <td>
              <button onclick="excluir(${p.id_prod})">Excluir</button>
            </td>
          </tr>`;
          
            });
            document.getElementById('lista').innerHTML = html;
        });
}


// DELETE
function excluir(id) {
    fetch(API + '/produtos/' + id, {
        method: 'DELETE'
    }).then(() => listar());
}

// carregar lista automaticamente

// carregar automaticamente
if (window.location.pathname.includes('./consultarEstoque.html')) {
    carregarEstoque();
}

window.onload = () => {
    listar();
    setInterval(listar, 3000);
};
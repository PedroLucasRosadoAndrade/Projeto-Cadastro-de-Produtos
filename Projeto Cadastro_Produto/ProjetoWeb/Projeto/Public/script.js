const API = 'http://localhost:3601';

// LOGIN
function logar() {
    fetch(API + '/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            login: document.getElementById('login').value,
            senha: document.getElementById('senha').value
        })
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                window.location.href = './home.html';
            } else {
                alert('Login inválido');
            }
        });
}


// CREATE
function cadastrar() {
    fetch(API + '/produtos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nome: nome.value,
            descricao: descricao.value,
            tipo: tipo.value,
            valor: valor.value,
            quantidade: quantidade.value
        })
    }).then(() => listar());
}


// READ
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
          </tr>
        `;
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
if (window.location.pathname.includes('./cadastroProduto.html')) {
    listar();
}

// carregar automaticamente
if (window.location.pathname.includes('./consultarEstoque.html')) {
    carregarEstoque();
}
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

function limparCampos() {
    document.getElementById('nome').value = '';
    document.getElementById('descricao').value = '';
    document.getElementById('tipo').value = '';
    document.getElementById('valor').value = '';
    document.getElementById('quantidade').value = '';
}

function cadastrar() {

    const produto = {
        nome: document.getElementById('nome').value,
        descricao: document.getElementById('descricao').value,
        tipo: document.getElementById('tipo').value,
        valor: parseFloat(document.getElementById('valor').value),
        quantidade: parseInt(document.getElementById('quantidade').value)
    };

    // SE ESTIVER EDITANDO → UPDATE
    if (window.idEditando) {

        fetch(API + '/produtos/' + window.idEditando, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(produto)
        })
            .then(() => {
                window.idEditando = null; // limpar modo edição
                limparCampos();
                listar();
            });

    } else {
        // SENÃO → CREATE
        fetch(API + '/produtos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(produto)
        })
            .then(() => {
                limparCampos();
                listar();
            });
    }
}
// function cadastrar() {
//     fetch(API + '/produtos', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             nome: nome.value,
//             descricao: descricao.value,
//             tipo: tipo.value,
//             valor: valor.value,
//             quantidade: quantidade.value
//         })


//     }).then(() => listar());

//     nome.value = '';
//     descricao.value = '';
//     tipo.value = '';
//     valor.value = '';
//     quantidade.value = '';
// }


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
            <td>${p.descricao_prod}</td>
            <td>${p.valor_prod}</td>
            <td>${p.quantidade_prod}</td>
            <td>
              <button onclick="editar(${p.id_prod}, '${p.nome_prod}', '${p.descricao_prod}', '${p.tipo_prod}', ${p.valor_prod}, ${p.quantidade_prod})">Editar</button>
              <button onclick="excluir(${p.id_prod})">Excluir</button>
            </td>
          </tr>
        `;
            });
            document.getElementById('lista').innerHTML = html;
        });
}

function editar(id, nome, descricao, tipo, valor, quantidade) {
    document.getElementById('nome').value = nome;
    document.getElementById('descricao').value = descricao;
    document.getElementById('tipo').value = tipo;
    document.getElementById('valor').value = valor;
    document.getElementById('quantidade').value = quantidade;

    // guardar o ID temporariamente
    window.idEditando = id;
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

window.onload = () => {
    listar();
    setInterval(listar, 3000);
};
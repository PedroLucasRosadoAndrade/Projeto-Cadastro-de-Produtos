// const API = 'http://localhost:3601';


const diagnostico = document.getElementById('diagnostico');
const pecaTroca = document.getElementById('pecaTroca');
const placa = document.getElementById('placa');
const nomeFun = document.getElementById('nomeFun');
const valorSer = document.getElementById('valorSer');

// CREATE

function cadastrarSer() {

    const servico = {
        diagnostico: document.getElementById('diagnostico').value,
        pecaTroca: document.getElementById('pecaTroca').value,
        placa: document.getElementById('placa').value,
        nomeFun: document.getElementById('nomeFun').value,
        valorSer: parseFloat(document.getElementById('valorSer').value)
    };

    // se estiver editando faz UPDATE
    if (window.idEditandoSer) {

        fetch(API + '/servisos/' + window.idEditandoSer, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(servico)
        })
            .then(() => {
                window.idEditandoSer = null; // limpar edição
                limparCampos();
                listar();
            });

    } else {
        fetch(API + '/servisos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(servico)
        })
            .then(() => {
                limparCampos();
                listar();
            });
    }
}

function limparCampos() {
    diagnostico.value = '';
    pecaTroca.value = '';
    placa.value = '';
    nomeFun.value = '';
    valorSer.value = '';
}
// function cadastrarSer() {
//     fetch(API + '/servisos', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             diagnostico: diagnostico.value,
//             pecaTroca: pecaTroca.value,
//             placa: placa.value,
//             nomeFun: nomeFun.value,
//             valorSer: parseFloat(document.getElementById('valorSer').value)
//         })
//     })
//         .then(res => res.text())
//         .then(msg => {
//             console.log(msg); // vê se cadastrou

//             // limpa os campos 

//             diagnostico.value = '';
//             pecaTroca.value = '';
//             placa.value = '';
//             nomeFun.value = '';
//             valorSer.value = '';
//             diagnostico.focus();

//             listarServ();
//         })
//         .catch(err => console.error('Erro ao cadastrar:', err));
// }

function editar(id, diagnostico, peca, placa, nomeFun, valorSer) {
    document.getElementById('diagnostico').value = diagnostico;
    document.getElementById('pecaTroca').value = peca;
    document.getElementById('placa').value = placa;
    document.getElementById('nomeFun').value = nomeFun;
    document.getElementById('valorSer').value = valorSer;

    window.idEditandoSer = id;
}


// lIstar
function listarServ() {
    fetch(API + '/servisos')
        .then(res => {
            if (!res.ok) {
                throw new Error('Erro na resposta');
            }
            return res.text(); // pega como texto primeiro
        })
        .then(text => {
            if (!text) return []; // evita erro se vier vazio
            return JSON.parse(text);
        })
        .then(data => {
            let html = '';

            data.forEach(p => {
                html += `
                <tr>
                    <td>${p.id_ser}</td>
                    <td>${p.diagnostico_ser}</td>
                    <td>${p.pecasTrocada_ser}</td>
                    <td>${p.placaCarro_ser}</td>
                    <td>${p.nome_fun}</td>
                    <td>${p.valor_ser}</td>
                    <td>
                        <button onclick="editar(${p.id_ser}, '${p.diagnostico_ser}', '${p.pecasTrocada_ser}', '${p.placaCarro_ser}', '${p.nome_fun}', ${p.valor_ser})">Editar</button>
                        <button onclick="excluir(${p.id_ser})">Excluir</button>
                    </td>
                </tr>`;
            });

            document.getElementById('listarServ').innerHTML = html;
        })
        .catch(err => console.error('Erro:', err));
}


// DELETE
function excluir(idSe) {
    fetch(API + '/servisos/' + idSe, {
        method: 'DELETE'
    }).then(() => listarServ());
}


window.addEventListener('load', () => {
    listarServ();
    setInterval(listarServ, 3000);
});
// const API = 'http://localhost:3601';


const diagnostico = document.getElementById('diagnostico');
const pecaTroca = document.getElementById('pecaTroca');
const placa = document.getElementById('placa');
const nomeFun = document.getElementById('nomeFun');

// CREATE
function cadastrarSer() {
    fetch(API + '/servisos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            diagnostico: diagnostico.value,
            pecaTroca: pecaTroca.value,
            placa: placa.value,
            nomeFun: nomeFun.value
        })
    })
        .then(res => res.text())
        .then(msg => {
            console.log(msg); // vê se cadastrou

            // limpa os campos 

            diagnostico.value = '';
            pecaTroca.value = '';
            placa.value = '';
            nomeFun.value = '';
            diagnostico.focus();

            listarServ();
        })
        .catch(err => console.error('Erro ao cadastrar:', err));
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
                    <td>
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
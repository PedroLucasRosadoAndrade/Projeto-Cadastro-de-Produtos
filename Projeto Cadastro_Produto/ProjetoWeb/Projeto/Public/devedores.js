const API = 'http://localhost:3601';


const nomeDe = document.getElementById('nomeDe');
const cpfDe = document.getElementById('cpfDe');
const telefone = document.getElementById('telefone');
const valorDi = document.getElementById('valorDi');

// CREATE
function cadastrarDev() {
    fetch(API + '/devedores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nomeDe: nomeDe.value,
            cpfDe: cpfDe.value,
            telefone: telefone.value,
            valorDi: valorDi.value
        })
    })
        .then(res => res.text())
        .then(msg => {
            console.log(msg); // vê se cadastrou

            // limpa os campos 

            nomeDe.value = '';
            cpfDe.value = '';
            telefone.value = '';
            valorDi.value = '';
            nomeDe.focus();
            
            listarDev();
        })
        .catch(err => console.error('Erro ao cadastrar:', err));
}


// lIstar
function listarDev() {
    fetch(API + '/devedores')
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
                    <td>${p.id_dev}</td>
                    <td>${p.nome_dev}</td>
                    <td>${p.cpf_dev}</td>
                    <td>${p.telefone_dev}</td>
                    <td>${p.valorDivida_dev}</td>
                    <td>
                        <button onclick="excluir(${p.id_dev})">Excluir</button>
                    </td>
                </tr>`;
            });

            document.getElementById('listarDev').innerHTML = html;
        })
        .catch(err => console.error('Erro:', err));
}


// DELETE
function excluir(idDe) {
    fetch(API + '/devedores/' + idDe, {
        method: 'DELETE'
    }).then(() => listarDev());
}


window.onload = () => {
    listarDev();
    setInterval(listarDev, 3000);
};

const diagnostico = document.getElementById('nomeCli');
const pecaTroca = document.getElementById('cpfCli');
const placa = document.getElementById('telefoneCli');

// CREATE
function cadastrarCliente() {
    fetch(API + '/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nomeCli: nomeCli.value,
            cpfCli: cpfCli.value,
            telefoneCli: telefoneCli.value
        })
    })
        .then(res => res.text())
        .then(msg => {
            console.log(msg); // vê se cadastrou

            // limpa os campos 

            nomeCli.value = '';
            cpfCli.value = '';
            telefoneCli.value = '';
            nomeCli.focus();

            listarClie();
        })
        .catch(err => console.error('Erro ao cadastrar:', err));
}


// lIstar
function listarClie() {
    fetch(API + '/clientes')
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
                    <td>${p.id_cli}</td>
                    <td>${p.nome_cli}</td>
                    <td>${p.cpf_cli}</td>
                    <td>${p.telefone_cli}</td>
                    <td>
                        <button onclick="excluir(${p.id_cli})">Excluir</button>
                    </td>
                </tr>`;
            });

            document.getElementById('listarClie').innerHTML = html;
        })
        .catch(err => console.error('Erro:', err));
}


// DELETE
function excluir(idCli) {
    fetch(API + '/clientes/' + idSe, {
        method: 'DELETE'
    }).then(() => listarClie());
}


window.addEventListener('load', () => {
    listarClie();
    setInterval(listarClie, 3000);
});
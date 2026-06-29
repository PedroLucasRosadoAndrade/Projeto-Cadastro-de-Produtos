const params = new URLSearchParams(window.location.search);
const id = params.get('id');

fetch(API + '/servisos')
    .then(res => res.json())
    .then(data => {

        const servico = data.find(s => s.id_ser == id);

        if (!servico) {
            alert('Serviço não encontrado');
            return;
        }

        document.getElementById('nota').innerText = servico.id_ser;
        document.getElementById('placa').innerText = servico.placaCarro_ser;
        document.getElementById('funcionario').innerText = servico.nome_fun;

        document.getElementById('total').innerText = servico.valor_ser;

        let html = `
            <tr>
                <td>${servico.diagnostico_ser}</td>
                <td>1</td>
                <td>${servico.valor_ser}</td>
                <td>${servico.valor_ser}</td>
            </tr>
        `;

        document.getElementById('itens').innerHTML = html;
    });

function imprimir() {
    window.print();
}
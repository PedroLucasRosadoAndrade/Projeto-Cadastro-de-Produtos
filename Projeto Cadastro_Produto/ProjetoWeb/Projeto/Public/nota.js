const API = 'http://localhost:3601';

// pegar ID da URL (?id=1)
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

function carregarNota() {
    fetch(API + '/nota/' + id)
        .then(res => res.json())
        .then(data => {

            if (data.length === 0) return;

            // dados fixos (primeiro registro)
            document.getElementById('nota').innerText = data[0].nota;
            document.getElementById('cliente').innerText = data[0].cliente;
            document.getElementById('funcionario').innerText = data[0].funcionario;
            document.getElementById('total').innerText = data[0].total;

            // itens
            let html = '';

            data.forEach(item => {
                html += `
                    <tr>
                        <td>${item.produto}</td>
                        <td>${item.quantidade}</td>
                        <td>${item.preco_unitario}</td>
                        <td>${item.subtotal}</td>
                    </tr>
                `;
            });

            document.getElementById('itens').innerHTML = html;
        });
}

// imprimir
function imprimir() {
    window.print();
}

window.onload = carregarNota;
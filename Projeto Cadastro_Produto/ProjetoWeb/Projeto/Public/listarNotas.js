function listarNotas() {
    
    fetch(API + '/nota')
        .then(res => res.json())
        .then(data => {
            console.log(data);

            let html = '';

            data.forEach(n => {
                html += `
                <tr>
                    <td>${n.id_not}</td>
                    <td>${n.nome_cli}</td>
                    <td>${n.valorTotal_not}</td>
                    <td>
                        <a href="nota.html?id=${n.id_not}">
                            Imprimir
                        </a>
                    </td>
                </tr>`;
            });

            document.getElementById('listaNotas').innerHTML = html;
        });
}

window.onload = listarNotas;

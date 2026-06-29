// function listarNotas() {

//     fetch(API + '/nota')
//         .then(res => res.json())
//         .then(data => {
//             console.log(data);

//             let html = '';

//             data.forEach(n => {
//                 html += `
//                 <tr>
//                     <td>${n.id_not}</td>
//                     <td>${n.nome_cli}</td>
//                     <td>${n.valorTotal_not}</td>
//                     <td>
//                         <a href="nota.html?id=${n.id_not}">
//                             Imprimir
//                         </a>
//                     </td>
//                 </tr>`;
//             });

//             document.getElementById('listaNotas').innerHTML = html;
//         });
// }

// window.onload = listarNotas;

function listarNotas() {
    fetch(API + '/servisos')
        .then(res => res.json())
        .then(data => {
            let html = '';

            data.forEach(s => {
                html += `
                <tr>
                    <td>${s.id_ser}</td>
                    <td>${s.diagnostico_ser}</td>
                    <td>${s.pecasTrocada_ser}</td>
                    <td>${s.placaCarro_ser}</td>
                    <td>${s.nome_fun}</td>
                    <td>R$ ${s.valor_ser}</td>
                    <td>
                        <a href="nota.html?id=${s.id_ser}">
                            Imprimir
                        </a>
                    </td>
                </tr>`;
            });

            document.getElementById('listaNotas').innerHTML = html;
        });
}

window.onload = listarNotas;
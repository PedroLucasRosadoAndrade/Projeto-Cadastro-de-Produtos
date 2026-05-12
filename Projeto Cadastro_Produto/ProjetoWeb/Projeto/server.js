const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

// LOGIN
app.post('/login', (req, res) => {
  const { login, senha } = req.body;

  db.query(
    'SELECT * FROM Usuario WHERE login_usu = ? AND senha_usu = ?',
    [login, senha],
    (err, result) => {
      if (result.length > 0) {
        res.json({ success: true });
      } else {
        res.json({ success: false });
      }
    }
  );
});


// CREATE
app.post('/produtos', (req, res) => {
  const { nome, descricao, tipo, valor, quantidade } = req.body;

  db.query(
    'INSERT INTO Produto (nome_prod, descricao_prod, tipo_prod, valor_prod, quantidade_prod) VALUES (?, ?, ?, ?)',
    [nome, descricao, tipo, valor, quantidade],
    () => res.send('Produto cadastrado')
  );
});


// LISTAR
app.get('/produtos', (req, res) => {
  db.query('SELECT * FROM Produto', (err, result) => {
    res.json(result);
  });
});


// UPDATE
app.put('/produtos/:id', (req, res) => {
  const { nome, descricao, tipo, valor, quantidade } = req.body;

  db.query(
    'UPDATE Produto SET nome_prod=?, descricao_prod=?, tipo_prod=?, valor_prod=?, quantidade_prod=? WHERE id_prod=?',
    [nome, descricao, tipo, valor, quantidade, req.params.id],
    () => res.send('Atualizado')
  );
});


// DELETE
app.delete('/produtos/:id', (req, res) => {
  db.query(
    'DELETE FROM Produto WHERE id_prod=?',
    [req.params.id],
    () => res.send('Excluído')
  );
});


app.listen(3601, () => console.log('Servidor rodando na porta 3601'));
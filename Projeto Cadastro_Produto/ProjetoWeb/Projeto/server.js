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
    'INSERT INTO Produto (nome_prod, descricao_prod, tipo_prod, valor_prod, quantidade_prod) VALUES (?, ?, ?, ?, ?)',
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


// devedores


// CREATE
app.post('/devedores', (req, res) => {
  const { nomeDe, cpfDe, telefone, valorDi } = req.body;

  db.query(
    'INSERT INTO Devedores (nome_dev, cpf_dev, telefone_dev, valorDivida_dev) VALUES (?, ?, ?, ?)',
    [nomeDe, cpfDe, telefone, valorDi],
    (err, result) => {
      if (err) {
        console.log('ERRO SQL:', err);
        return res.status(500).send('Erro ao cadastrar');
      }

      console.log('Inserido com ID:', result.insertId);
      res.send('Divida cadastrada')
    }
  );
});


// LISTAR
app.get('/devedores', (req, res) => {
  db.query('SELECT * FROM Devedores', (err, result) => {
    res.json(result);
  });
});


// UPDATE
app.put('/devedores/:idDe', (req, res) => {
  const { idDe, nomeDe, cpfDe, telefone, valorDi } = req.body;

  db.query(
    'UPDATE Devedores SET nome_dev=?, cpf_dev=?, telefone_dev=?, valorDivida_dev=? WHERE id_dev=?',
    [nomeDe, cpfDe, telefone, valorDi, req.params.idDe],
    () => res.send('Atualizado')
  );
});


// DELETE
app.delete('/devedores/:idDe', (req, res) => {
  db.query(
    'DELETE FROM Devedores WHERE id_dev=?',
    [req.params.idDe],
    () => res.send('Excluído')
  );
});


//nota de servico 


// CREATE
app.post('/servisos', (req, res) => {
  const { diagnostico, pecaTroca, placa, nomeFun } = req.body;

  db.query(
    'INSERT INTO Servico (diagnostico_ser, pecasTrocada_ser, placaCarro_ser, nome_fun) VALUES (?, ?, ?, ?)',
    [diagnostico, pecaTroca, placa, nomeFun],
    (err, result) => {
      if (err) {
        console.log('ERRO SQL:', err);
        return res.status(500).send('Erro ao cadastrar');
      }

      console.log('Inserido com ID:', result.insertId);
      res.send('Serviso cadastradado')
    }
  );
});


// LISTAR
app.get('/servisos', (req, res) => {
  db.query('SELECT * FROM Servico', (err, result) => {
    res.json(result);
  });
});


// UPDATE
app.put('/servisos/:idSe', (req, res) => {
  const { idSe, diagnostico, pecaTroca, placa, nomeFun } = req.body;

  db.query(
    'UPDATE Servico SET diagnostico_ser=?, pecasTrocada_ser=?, placaCarro_ser=?, nome_fun=? WHERE id_ser=?',
    [diagnostico, pecaTroca, placa, nomeFun, req.params.idSe],
    () => res.send('Atualizado')
  );
});


// DELETE
app.delete('/servisos/:idSe', (req, res) => {
  db.query(
    'DELETE FROM Servico WHERE id_ser=?',
    [req.params.idSe],
    () => res.send('Excluído')
  );
});



// emitir nota 

app.get('/nota/:id', (req, res) => {
  const id = req.params.id;

  db.query(`
    SELECT 
      id_not AS nota,
      nome_cli AS cliente,
      nome_fun AS funcionario,
      nome_prod AS produto,
      quantidade,
      preco_unitario,
      subtotal,
      valorTotal_not AS total
    FROM NotaServico
    JOIN Cliente ON id_cli_fk = id_cli
    JOIN Funcionario ON id_fun_fk = id_fun
    JOIN ItemNota ON id_not = id_not_fk
    JOIN Produto ON id_prod_fk = id_prod
    WHERE id_not = ?
  `, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Erro ao buscar nota');
    }

    res.json(result);
  });
});



app.listen(3601, () => console.log('Servidor rodando na porta 3601'));
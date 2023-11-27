const express = require('express');
const db = require('./conexão');
const app = express();
const path = require('path');
const router = express.Router();

router.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/index.html'));
})

app.use('/', router);

const ipAddress = '172.16.31.36'; //Endereço IP da máquina
const port = 3003;

app.listen(port, ipAddress, () => {
    console.log(`Servidor rodando em http://${ipAddress}:${port}`);
});

app.get('/', async (req, res) => {
  try {
    // Exemplo de consulta ao banco de dados
    const [rows, fields] = await db.execute('SELECT * FROM sua_tabela');
    res.json(rows);
  } catch (err) {
    console.error('Erro ao acessar o banco de dados:', err);
    res.status(500).send('Erro interno do servidor');
  }
});
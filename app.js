const express = require('express');
const db = require('./conexão');
const app = express();
const path = require('path');
const router = express.Router();

router.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/index.html'));
})

// Adicione um middleware para processar dados de formulário
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

const ipAddress = '172.16.31.36'; //Endereço IP da máquina
const port = 3003;

app.listen(port, ipAddress, () => {
    console.log(`Servidor rodando em http://${ipAddress}:${port}`);
});

// Rota para lidar com a pesquisa
app.post('/pesquisar', async (req, res) => {
  const idEscola = req.body.idEscola;

  try {
    // Consulta ao banco de dados com base no ID da escola
    const [rows, fields] = await db.execute('SELECT * FROM dados_escolares WHERE id_escola = ?', [idEscola]);

    // Verifica se há resultados
    if (rows.length > 0) {
      res.json(rows);
    } else {
      res.json({ mensagem: 'Nenhum dado encontrado para o ID da escola fornecido.' });
    }
  } catch (err) {
    console.error('Erro ao acessar o banco de dados:', err);
    res.status(500).send('Erro interno do servidor');
  }
});
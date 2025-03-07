const express = require('express');
const sql = require('mssql');
const path = require('path');

// Configuração do banco de dados SQL Server
const config = {
    user: 'PC-VÒLIA\\volia',
    server: 'PC-VÒLIA\SQLEXPRESS',
    database: 'produtos',
    options: {
        trustedConnection: true
    }
};

const app = express();
app.use(express.static(path.join(__dirname, 'public'))); // Serve arquivos estáticos (HTML, CSS, JS)

sql.connect(config).then(pool => {
    console.log('Conectado ao banco de dados');
    
    // Rota para buscar produtos
    app.get('/produtos', async (req, res) => {
        try {
            const result = await pool.request().query('SELECT * FROM Produto');
            res.json(result.recordset);
        } catch (err) {
            res.status(500).send('Erro ao buscar produtos');
        }
    });

    // Rota para buscar filiais
    app.get('/filiais', async (req, res) => {
        try {
            const result = await pool.request().query('SELECT * FROM Filial');
            res.json(result.recordset);
        } catch (err) {
            res.status(500).send('Erro ao buscar filiais');
        }
    });

    // Iniciar o servidor
    app.listen(3000, () => {
        console.log('Servidor rodando em http://localhost:3000');
    });
}).catch(err => {
    console.error('Erro de conexão:', err);
});

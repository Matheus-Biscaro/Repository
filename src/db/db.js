// Configuração do Banco de Dados MySQL

const mysql = require('mysql'); // Importando MySQL

// Configurando uma conexão com o banco de dados

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'pizzariaT'
});  // Preencher de acordo com seu Banco de Dados

// Testar conexão com o MySQL

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL', err);
    } else {
        console.log('Conectando ao MySQL');
    }
});

module.exports = db;                        // Aqui declaramos que esta construção será um módulo e que iremos exportar para ser usado.

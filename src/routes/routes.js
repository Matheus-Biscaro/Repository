const express = require ('express');
const router = express.Router();

// Exemplo de uma rota GET
router.get('/exemplo', (req , res) => {
    res.send('Rota de exemplo')
})

// Exemplo de outra roda GET
router.get('/sandro',(req,res) => {
    res.send('Rota do Sandro') 
})

// Exporte o roteador para que ele possa ser sado no index.js
module.exports = router;
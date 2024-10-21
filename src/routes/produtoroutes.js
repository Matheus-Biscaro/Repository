const express = require('express')
const router = express.Router();
const produtoController = require('../controller/produtoController');

router.get('/produto', produtoController.listarProdutos);
router.get('/produto/:codigoProduto', produtoController.buscarProdutoId);
router.get('/produto/nome/:nomeProduto', produtoController.buscarProdutoNome);
router.post('/produto', produtoController.adicionarProduto);
router.put('/produto/:codigoProduto', produtoController.atualizarProduto);
router.delete('/produtos/:codigoProduto', produtoController.deletarProduto);
module.exports = router;
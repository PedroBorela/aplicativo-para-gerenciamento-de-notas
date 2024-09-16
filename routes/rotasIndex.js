var express = require('express');
var router = express.Router();
var controllerIndex = require('../controller/controllerindex.js')
/* GET home page. */
router.get('/', controllerIndex.tela_principal);
router.get('/sobre', controllerIndex.sobre);
// router.post('/',controllerIndex.tela_principal)
router.post('/', controllerIndex.pesquisa);
// router.post('/', controllerIndex.filtro)


router.get('/ajuda', controllerIndex.ajuda);

module.exports = router;

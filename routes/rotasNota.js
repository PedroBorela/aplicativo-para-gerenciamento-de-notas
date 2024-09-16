var express= require('express')
var router=express.Router();
var controllerNota=require('../controller/controllerNota.js')

router.get('/cria',controllerNota.cria_get)

router.post('/cria',controllerNota.cria_post)

router.get('/consulta/:chave_nota',controllerNota.consulta);

router.get('/altera/:chave_nota',controllerNota.altera_get);

router.post('/altera/:chave_nota',controllerNota.altera_post)

router.get('/deleta/:chave_nota',controllerNota.deleta);

/* GET Altera status da Nota para lida. */
router.get('/lida/:chave_nota', controllerNota.lida);
/* GET Altera status da Nota para não lida. */
router.get('/naolida/:chave_nota', controllerNota.naolida);

router.get('/criaTeste',controllerNota.criaTeste);

module.exports = router
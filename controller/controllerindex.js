const notas = require('../model/notaMongo.js')

exports.tela_principal = async function (req, res) {
    
    
    contexto = {
        titulo_pagina: "Gerenciador de notas de Texto",
        notas: await notas.lista(),
        
    }

    res.render('index', contexto);
}

exports.sobre = async function (req, res) {
    contexto = {
        titulo_pagina: "Sobre o aplicativo",
    }
    res.render('sobre', contexto)
}



exports.pesquisa = async function (req, res) {
    var filtro_pesquisa = req.body.search //RETORNA O VALOR DO CAMPO DE PESQUISAR NOTAS
    var notas_filtradas = [] // CRIA VETOR PARA AS NOTAS A SEREM EXIBIDAS
    var filtroLida = req.body.estado_lida ? true : false
    var filtroNaoLida = req.body.estado_nao_lida ? true : false
    var filtroImportancia1 = req.body.i1 ? true : false
    var filtroImportancia2 = req.body.i2 ? true : false
    var filtroImportancia3 = req.body.i3 ? true : false
    var filtroImportancia4 = req.body.i4 ? true : false
    var filtroImportancia5 = req.body.i5 ? true : false
    var temFiltro_pesquisa = true //DIZ SE FOI PESQUISADO ALGUMA COISA

    if(req.body.botaoPesquisar != undefined){ //BOTAO PESQUISAR FOI APERTADO
        notas_filtradas = await notas.pesquisa(filtro_pesquisa)
        var temFiltro_pesquisa = true
    }else if(req.body.botaoCancelar != undefined){ //BOTAO CANCELAR FOI APERTADO
        notas_filtradas = await notas.lista()
        temFiltro_pesquisa = false
    } else if(req.body.botao_filtro != undefined){
        if(filtroLida)
            notas_filtradas = notas_filtradas.concat( await notas.filtro_lida(true))
        if(filtroNaoLida)
        notas_filtradas = notas_filtradas.concat( await notas.filtro_lida(false))
        temFiltro_pesquisa = false
        if(filtroImportancia1)
            notas_filtradas = notas_filtradas.concat(await notas.filtro_importancia(1))
        if(filtroImportancia2)
            notas_filtradas = notas_filtradas.concat(await notas.filtro_importancia(2))
        if(filtroImportancia3)
            notas_filtradas = notas_filtradas.concat(await notas.filtro_importancia(3))
        if(filtroImportancia4)
            notas_filtradas = notas_filtradas.concat(await notas.filtro_importancia(4))
        if(filtroImportancia5)
            notas_filtradas = notas_filtradas.concat(await notas.filtro_importancia(5))
    }
    contexto = {
        titulo_pagina: "Gerenciador de notas de Texto",
        notas: notas_filtradas,
        valorPesquisa: filtro_pesquisa,
        boolFiltro : temFiltro_pesquisa,
        filtroLida : filtroLida,
        filtroNaoLida :filtroNaoLida,
        filtroI1: filtroImportancia1,
        filtroI2: filtroImportancia2,
        filtroI3: filtroImportancia3,
        filtroI4: filtroImportancia4,
        filtroI5: filtroImportancia5

    }


    res.render('index', contexto);
}

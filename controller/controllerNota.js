// importação da classe que gerencia as notas na memória
const notas = require("../model/notaMongo.js");
// cria e já exporta a função que será responsável pela criação de nota
exports.cria_get = async function (req, res) {
  contexto = {
    titulo_pagina: "Criação de Nota",
  };
  // renderiza o arquivo dentro da pasta view
  res.render("criaNota", contexto);mo
};


// cria e já exporta a função que será responsável pela criação de nota
// exports.cria_post = async function (req, res) {
//   // obtem as informações do formulário
//   var chave = req.body.chave;
//   var titulo = req.body.titulo;
//   var texto = req.body.texto;
//   var importancia = req.body.importancia;
//   // cria a nota nota
//   await notas.cria(chave, titulo, texto, importancia);
//   // redireciona para a página principal
//   res.redirect("/");
// };

exports.cria_post = async function(req,res){
  //obtém as informações do formulário
  var nota = req.body
  //cria a nota nota
  await notas.cria(nota)

  //redireciona para a página principal
  res.redirect('/')
}


exports.consulta = async function (req, res) {
  //informação passada como parâmetro na url
  var chave = req.params.chave_nota;
  var nota = await notas.consulta(chave);
  nota.lida = true

  //atualização no banco de dados
  await notas.atualiza(nota)
  contexto = {
    titulo_pagina: "Consulta a Nota",
    nota : nota,


  };
  // renderiza o arquivo dentro da pasta view
  res.render("consultaNotas", contexto);
};

// cria e já exporta a função que será responsável pela alteração de nota
exports.altera_get = async function (req, res) {
  //informação passada como parâmetro na url
  var chave = req.params.chave_nota.toString();
  var nota = await notas.consulta(chave);
  contexto = {
    titulo_pagina: "Altera a Nota",
    nota: nota,
  };
  // renderiza o arquivo dentro da pasta view
  res.render("alteraNota", contexto);
};

// exports.altera_post = async function (req, res) {
//   // obtem as informações do formulário
//   var chave = req.body.chave;
//   var titulo = req.body.titulo;
//   var texto = req.body.texto;
//   var importancia = req.body.importancia;

//   var lida
//   if(req.body.status === 'on')
//     lida = true
//     else
//     lida = false
//   //var lida = req.body.status === 'on' ? true : false
//   // cria a nota nota
//   await notas.atualiza(chave, titulo, texto,importancia,lida);
//   // redireciona para a página principal
//   res.redirect("/");
// };

exports.altera_post = async function (req, res) {
  // obtem as informações do formulário
  var nota = req.body
  if (req.body.status === 'on') {
    nota.lida = true
    delete nota.status //deleta este atributo para ele não ser armazenado em BD
  }
  else
    nota.lida = false
  // atualiza a nota com a chave e o status também
  await notas.atualiza(nota)
  // redireciona para a página principal
  res.redirect('/')
}

exports.deleta = async function (req, res) {
  var chave = req.params.chave_nota;
  await notas.deleta(chave);
  res.redirect("/");
};

//cria e já exporta a função que será responsável pela alteração do status da nota para lida
exports.lida = async function (req, res) {
  var chave = req.params.chave_nota.toString();
  var nota = await notas.consulta(chave);
  nota.lida = true;
  await notas.atualiza(nota)
  // redireciona para a página principal
  res.redirect("/");
};

//cria e já exporta a função que será responsável pela alteração do status da nota para não lida
exports.naolida = async function (req, res) {
  var chave = req.params.chave_nota.toString();

  var nota = await notas.consulta(chave);
  nota.lida = false;
  await notas.atualiza(nota)

  // redireciona para a página principal
  res.redirect("/");
};

exports.criaTeste = async function (req, res) {


  
  for (let i = 1; i <= 5; i++) {
    nota = {
      chave: i.toString(),
      titulo: "Nota teste "+i,
      texto : "testando",
      importancia: i,
    }
    await notas.cria(nota);
  }
  res.redirect("/");
}

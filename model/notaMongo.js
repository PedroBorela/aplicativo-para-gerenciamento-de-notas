
const mongodb = require('mongodb');
// const { connect } = require('../routes/rotasIndex');
// cria uma instância do cliente do mongo
const ClienteMongo = mongodb.MongoClient;
var cliente;
// estabelece conexão com o Banco de Dados
const conexao_bd = async () => {
    if (!cliente)
        cliente = await ClienteMongo.connect('mongodb://127.0.0.1:27017');
    console.log("Conexão estabelecida com o MongoDB");
}
// retorna a referência para o banco de dados da aplicação
const bd = () => {
    return cliente.db('notas');
}

class NotaMongo {
    async close() {
        if (cliente)
            cliente.close()
        cliente = undefined
    }
    

    async atualiza(nota){
        await conexao_bd();
        const colecao = bd().collection("notas")
        await colecao.updateOne(
            {chave: nota.chave},
            {$set: {titulo: nota.titulo, texto: nota.texto, importancia: nota.importancia, lida: nota.lida}}
        )
    }

    // async cria(chave, titulo, texto, importancia) {
    //     await conexao_bd()
    //     const nota = new Nota(chave, titulo, texto, importancia)
    //     const colecao = bd().collection("notas")
    //     await colecao.insertOne({ chave: chave, titulo: titulo, texto: texto, importancia: importancia, lida: false })
    //     return nota
    // }

    async cria(nota){
        await conexao_bd()
        const colecao = bd().collection("notas")
        nota.lida = false 
        // toda nota deve ser criada como não lida
        await colecao.insertOne(nota)
    }
    // async consulta(chave) {
    //     await conexao_bd()
    //     const colecao = bd().collection("notas")
    //     const doc = await colecao.findOne({ chave: chave })
    //     const nota = new Nota(doc.chave, doc.titulo, doc.texto, doc.importancia, doc.lida)
    //     return nota
    // }
    async consulta(chave){
        await conexao_bd()
        const colecao = bd().collection("notas")
        const nota = await colecao.findOne({chave : chave})

        return nota
    }

    async deleta(chave) {
        await conexao_bd()
        const colecao = bd().collection("notas")
        const doc = await colecao.findOne({ chave: chave })
        if (!doc) {
            throw new Error(`Não existe a nota com chave: ${chave}`)
        } else {
            await colecao.findOneAndDelete({ chave: chave })
        }
    }

    // async lista() {
    //     await conexao_bd()
    //     const colecao = bd().collection("notas")
    //     const notas = []
    //     await colecao.find({}).forEach((nota) => {
    //         var nota_temp = new Nota(nota.chave, nota.titulo, nota.texto, nota.importancia, nota.lida)
    //         notas.push(nota_temp)
    //     })
    //     return notas
    // }

    async lista(){
        await conexao_bd()
        const colecao = bd().collection("notas")
        const notas = await colecao.find({}).toArray()
        return notas
    }
    async lista_chaves() {
        await conexao_bd()
        const colecao = bd().collection("notas")
        var chaves = []
        await colecao.find({}, { projection: { _id: 0, chave: 1 } }).forEach((nota) => {
            chaves.push(nota.chave)
        })
        return chaves
    }
    async qtd() {
        await conexao_bd()
        const colecao = bd().collection("notas")
        const qtd = await colecao.count({})
        return qtd
    }

    async pesquisa(texto_pesquisa){
        await conexao_bd()
        const colecao= bd().collection("notas")
        await colecao.createIndex({"titulo" : "text"})
        const resultado = await colecao.find({$text: {$search: texto_pesquisa}}).toArray()
        return resultado
    }
    async filtro_lida(lida){
        await conexao_bd()
        const colecao = bd().collection("notas")
        const resultado = await colecao.find({lida : lida}).toArray()
        return resultado
    }
    // async filtro_lida(lida){
    //     await conexao_bd()
    //     const colecao = bd().collection("notas")
    //     var chaves = []
    //     const resultado = await colecao.find({lida : lida}, { projection: { _id: 0, chave: 1 } }).forEach((nota)=>{
    //         chaves.push(nota.chave)
    //     })
    //     return resultado
    // }


    async filtro_importancia(importancia){
        await conexao_bd()
        const colecao = bd().collection("notas")
        const resultado = await colecao.find({importancia : importancia}).toArray()
        return resultado
    }
}
module.exports = new NotaMongo()
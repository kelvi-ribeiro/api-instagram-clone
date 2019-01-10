var objectID = require('mongodb').ObjectId,
fs = require('fs');

module.exports.create = function(dbConnection,req,res){
   // var dadosForm = req.body;     
    var date = new Date(); 
    var timeStamp = date.getTime();  
    var urlImagem = timeStamp + '_' + req.files.arquivo.originalFilename; 
    var pathOrigem = req.files.arquivo.path;
    var pathDestino = './uploads/' + urlImagem; 
    fs.rename(pathOrigem,pathDestino,function(err){
      if(err){
        console.log(err)
        res.status(500).json(err);
        return;
      }
      var dadosToPersist = {
        urlImagem:urlImagem,
        titulo:req.body.titulo
      }
      var dados = {
        operacao: 'inserir',
        dados: dadosToPersist,
        collection: 'postagens',
        callback: function(err, records){
          if (err) {
            res.json({'status':'Erro ao postar sua foto'});
          } else {
            res.json({'status':'Sucesso ao postar sua foto'});
          }
        }
      }
      dbConnection(dados);
    });  
}

module.exports.findAll = function(dbConnection,req,res){
    // var dadosForm = req.body;     
    var dados = {
        operacao: 'pesquisar',      
        collection: 'postagens',
        callback: function(err, records){
          if (err) {
            res.json(err);
          } else {
            res.json(records);
          }
        }
      }      
      dbConnection(dados);
 }
 

module.exports.findOne = function(dbConnection,req,res){
    // var dadosForm = req.body;    
    var dados = {
        operacao: 'pesquisar',
        dados: objectID(req.params.id),
        collection: 'postagens',
        callback: function(err, records){
          if (err) {
            res.json(err);
          } else {
            res.json(records);
          }
        }
      }
      dbConnection(dados);
}

module.exports.update = function(dbConnection,req,res){
    // var dadosForm = req.body;             
        var dados = {
          operacao: 'atualizar',      
          where:{_id:objectID(req.params.id)},
          set:{$push:{
            comentarios:{
              id_comentario: new objectID(),
              comentario:req.body.comentario
            }
          }},
          collection: 'postagens',
          callback: function(err, records){
            if (err) {
              res.json(err);
            } else {
              res.json(records);
            }
          }
        }
    dbConnection(dados);
}

module.exports.delete = function(dbConnection,req,res){
    // var dadosForm = req.body;    
    var dados = {
        operacao: 'atualizar',      
        where:{},
        set:{$pull:{
          comentarios:{
            id_comentario: objectID(req.params.id)         
          }
        }},
        collection: 'postagens',
        callback: function(err, records){
          if (err) {
            res.json(err);
          } else {
            res.json(records);
          }
        }
      }
      dbConnection(dados);
}
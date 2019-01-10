var objectID = require('mongodb').ObjectId,
fs = require('fs');

/* importar as configurações do servidor */
var app = require('./config/server');

/* parametrizar a porta de escuta */
app.listen(8080, function(){
	console.log('Servidor online');
})
app.get('/', function(req, res){
  res.send({msg: 'Olá'});
});
 
app.post('/api', function(req, res){  
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
    app.api.config.dbConnection(dados);
    });
});

app.get('/api', function(req, res){    
    
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
    app.api.config.dbConnection(dados);
  });

  app.get('/api/:id', function(req, res){        
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
    app.api.config.dbConnection(dados);
  });

  app.get('/uploads/:urlImagem', function(req, res){        
    var pathImagem = './uploads/' + req.params.urlImagem;
    fs.readFile(pathImagem,function(err,content){
        if(err){
          res.status(400).json(err);
          return;
        }
        res.writeHead(200,{'content-type':'image/jpg'});
        res.end(content);
      });
  });

  app.put('/api/:id', function(req, res){        
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
    app.api.config.dbConnection(dados);
  });

  app.delete('/api/:id', function(req, res){            
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
    app.api.config.dbConnection(dados);
  });
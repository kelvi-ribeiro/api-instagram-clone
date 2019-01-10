var fs = require('fs');
module.exports.getImage = function(req,res){
    var pathImagem = './uploads/' + req.params.urlImagem;
    fs.readFile(pathImagem,function(err,content){
        if(err){
          res.status(400).json(err);
          return;
        }
        res.writeHead(200,{'content-type':'image/jpg'});
        res.end(content);
      });  
}

module.exports = function(application){
	application.get('/uploads/:urlImagem', function(req,res){        
    application.api.app.controllers.imagesController.getImage(req,res)
    });
  }


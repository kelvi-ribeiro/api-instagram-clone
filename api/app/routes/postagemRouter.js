module.exports = function(application){
	application.get('/api', function(req,res){  							
    application.api.app.controllers.postagemController.findAll(application.api.config.dbConnection,req,res)
});
	application.post('/api', function(req,res){        
		application.api.app.controllers.postagemController.create(application.api.config.dbConnection,req,res)
});
	application.get('/api/:id', function(req,res){        
		application.api.app.controllers.postagemController.findOne(application.api.config.dbConnection,req,res)
});
	application.put('/api/:id', function(req,res){    		 
		application.api.app.controllers.postagemController.update(application.api.config.dbConnection,req,res)
});
	application.delete('/api/:id', function(req,res){        
		application.api.app.controllers.postagemController.delete(application.api.config.dbConnection,req,res)
});
}

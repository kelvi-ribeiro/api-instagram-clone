var express = require('express'),
    bodypParser = require('body-parser'),
    mongodb = require('mongodb');

var app = express();

app.use(bodypParser.urlencoded({extended:true}));
app.use(bodypParser.json());

var port = 8080;

app.listen(port);

console.log('Servidor HTTP está escutando na porta ' + port);

app.get('/',function(req,res){
    res.json({msg:'olá'});
});


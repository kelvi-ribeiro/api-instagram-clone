var express = require('express'),
    bodyParser = require('body-parser'),
    multiParty = require('connect-multiparty'),        
    consign = require('consign'),
    fs = require('fs');
 
var app = express();
 
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(multiParty());

app.use(function(req,res,next){
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers","content-type");
  res.setHeader("Access-Control-Allow-Credentials",true);
  next();
});

consign()	
	.include('api/config/dbConnection.js')		
    .into(app);
    
    module.exports = app;
 
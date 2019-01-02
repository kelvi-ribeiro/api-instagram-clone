var http = require('http');
var opcoes = {
    hostname:'localhost',
    port:80,
    path:'/',
    method:'get',
    headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
    }
}
/*  Content-Type
Padrão é feito pelo x-www-form-urlencoded */
/* var html = 'nome=josé' // Corresponde a x-www-form-urlencoded
var json = {nome:'José'} // formato JSON
var stringJson = JS *//* ON.stringify(json); */
var bufferCorpoResponse = [];
var req = http.request(opcoes,function(response){
 response.on('data',function(chunk){ // chunk é igual a pedaço
     bufferCorpoResponse.push(chunk);
    });
    response.on('end',function(){        
        const corpoResponse = Buffer.concat(bufferCorpoResponse).toString();
        console.log(corpoResponse);
        console.log(response.statusCode)
    });
});
//req.write(stringJson);

req.end();
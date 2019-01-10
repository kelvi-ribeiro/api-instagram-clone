const mongodb = require('mongodb').MongoClient;

var dbName = 'instagram';
var mongoURL = 'mongodb://localhost:27017/' + dbName;
 
var connMongoDB = function(data) {
  mongodb.connect(mongoURL, { useNewUrlParser: true }, function(err, client) {
    var db = client.db(dbName);
    query(db, data);
    client.close();
  });
}
 
var query = function query(db, data) {    
  var collection = db.collection(data.collection);
  switch (data.operacao) {
    case 'atualizar':
      collection.update(data.where, data.set,{},data.callback);
      break;
    case 'inserir':          
      collection.insertOne(data.dados, data.callback);
      break;
    case 'pesquisar':          
      collection.find(data.dados).toArray(data.callback);
      break;
    case 'remover':      
      collection.remove(data.where, data.callback);
      break;
  }
}

module.exports = function() {
    return connMongoDB;
    };
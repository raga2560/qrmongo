

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://ramesh:IndiatoLove@cluster0.begbs.mongodb.net/studentdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


client.connect(err => {
  collection = client.db("studentdb").collection("userrecord");

   collection.drop(function(err, delOK) {
    if (err) throw err;
  console.log("Collection deleted");
  });


  var data = {name: "Ramesh", email: "raga2560@gmail.com", approval: "granted", socketid:""}
  collection.insertOne(data, function(err, res) {
    if (err) throw err;
    console.log("data created!");

	  
  var query = {email: "raga2560@gmail.com"};

  collection.findOne(query, function(err, res) {
    if (err) throw err;
    console.log(JSON.stringify(res));
  //  client.close();
  });

  });
  
});




const express = require('express');
const app = express();
const port = 3050;
const path = require('path');
const bodyParser = require('body-parser');
var fs = require('fs');


app.use(bodyParser.json());



app.use(express.static('static'));
//to get product data
app.get('/getProd', function(req, res){
  fs.readFile(__dirname + "/" + "db.json", 'utf8', function(err, data){
      console.log(data);
      res.end(data); 
  });
})

var prod = {
  "prod5": {
  "id":5,
  "name":"Shirt",
  "Cost":200,
  "Desc":"US Polo"
  }
};

//add product endpoint
app.get('/addProd', function(req, res){
  //Step 2: read existing users
    fs.readFile(__dirname + "/" + "db.json", 'utf8', function(err, data){
      data = JSON.parse(data);
      data["prod5"] = prod["prod5"];
      //Step 3: append user variable to list
      var jsonContent = JSON.stringify(data);
      
      fs.writeFile("db.json", jsonContent, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
     
        console.log("JSON file has been saved.");
    });
});
})


//delete a product by id
var id = 3;
app.get('/deleteProd', function (req, res) {
   // First retrieve existing users
   fs.readFile( __dirname + "/" + "db.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      delete data["prod" + id];
       
      console.log( data );
      res.end( JSON.stringify(data));
   });
})


app.get('/UpdateProd', function (req, res) {
  const fileName = './db.json';
  const file = require(fileName);
  file.prod4.Cost = 350; 
  
  fs.writeFile("db.json", JSON.stringify(file), function writeJSON(err) {
    if (err) return console.log(err);
    console.log(JSON.stringify(file));
    console.log('writing to ' + fileName);
  });


})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


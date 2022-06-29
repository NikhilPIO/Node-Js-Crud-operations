const express = require('express');
const app = express();
const port = 3050;
const path = require('path');
const bodyParser = require('body-parser');
var fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('static'));
//to get product data
app.get('/getUsers', function(req, res){
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

//addUser endpoint
app.get('/addUser', function(req, res){
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


//delete a user by id
var id = 3;
app.get('/deleteUser', function (req, res) {
   // First retrieve existing users
   fs.readFile( __dirname + "/" + "db.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      delete data["prod" + id];
       
      console.log( data );
      res.end( JSON.stringify(data));
   });
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


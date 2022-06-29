const express = require('express');
const app = express();
const port = 3050;
const path = require('path');
const bodyParser = require('body-parser');
var fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('static'));

app.get('/getUsers', function(req, res){
  fs.readFile(__dirname + "/" + "db.json", 'utf8', function(err, data){
      console.log(data);
      res.end(data); 
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


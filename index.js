const express = require('express');
const app = express();
const port = 3020;
const path = require('path');
var fs = require('fs');

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


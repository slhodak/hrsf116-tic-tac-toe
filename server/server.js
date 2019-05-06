const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.use(express.static('public'));

const mainHtml = path.join(__dirname, path.normalize('../'), 'public', 'index.html');
console.log(path.normalize('../'));
app.get('/', (req, res) => { 
  res.status(200);
  // res.sendFile(mainHtml);
});

app.listen(port, () => { console.log(`Example app listening on port ${port}!`) });
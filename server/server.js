const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.use(express.static('public'));

const styles = path.join(__dirname, 'style.css');
const mainHtml = path.join(__dirname, 'index.html');

app.get('/', (req, res) => { 
  res.status(200);
  res.sendFile(mainHtml); 
  res.sendFile(styles);
});

app.listen(port, () => { console.log(`Example app listening on port ${port}!`) });
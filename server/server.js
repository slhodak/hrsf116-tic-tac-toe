const express = require('express');
const app = express();
const port = 3000;
app.use(express.static('public'));

app.get('/', (req, res) => { 
  res.status(200);
  console.log('heard ya!');
  res.end('heard ya!');
});

app.listen(port, () => { console.log(`Example app listening on port ${port}!`) });
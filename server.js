const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

const mainHtml = path.join(__dirname, 'index.html');
app.get('/', (req, res) => { res.sendFile(mainHtml) });

app.listen(port, () => { console.log(`Example app listening on port ${port}!`) });
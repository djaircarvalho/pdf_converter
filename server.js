const express        = require('express');
const bodyParser     = require('body-parser');
const app            = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

const port = process.env.PORT || 8080;
require('./app/routes')(app);
app.listen(port, () => {
  console.log('We are live on ' + port);
});

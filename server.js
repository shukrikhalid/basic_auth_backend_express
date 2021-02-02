require('dotenv').config()

const express = require('express')

const bodyParser = require('body-parser');
const cors = require("cors")

const { hideSecret } = require('./services')

const app = express();
var server = require('http').Server(app);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Middleware function for show request log
app.use(function(req, res, next){

  let params = Object.assign(req.body, req.query, req.params);

  res.locals.params = Object.assign({}, params);

  console.log(`${new Date().toISOString()} - ${req.method} ${req.url} -- Params : ${JSON.stringify(hideSecret(params) ) }`);
  params = null
  next();
});


const routes = require('./routes')
routes(app)


const port = process.env.SERVER_PORT;
server.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});

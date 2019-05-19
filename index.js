const express = require("express");
const http = require("http");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const exphbs  = require('express-handlebars');
const helpers = require("./helpers/handlebarsHelpers");

const app = express();
app.use(morgan("dev"));

/************************************************/
//             ---View Engine setup---
/************************************************/
const publicFiles = path.join(__dirname, "public/");
// const assetFiles = path.join(__dirname, "public/assets/");
app.use(express.static(publicFiles)) //serve static files (CSS, javascript, images)
// app.use(express.static(assetFiles)) //serve static files (CSS, javascript, images)
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    helpers: helpers,
    partialsDir: ["views/partials/"],
    layoutsDir: path.join(__dirname, '/views/layouts/') }));
app.set('view engine', 'handlebars');

/************************************************/
//             ---Routes---
/************************************************/
require("./routes/botRoutes")(app);


const server = http.Server(app);

const PORT = process.env.PORT || 5000;
server.on('listening',function(){
    console.log('server is running');
});
server.listen(PORT, () => console.log(`listening on port: ${PORT}`));

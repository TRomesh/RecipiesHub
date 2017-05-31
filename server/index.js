const express = require('express');
const app =express();
const path = require('path');
const server = require('http').Server(app);
const cors = require('cors')();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const webpack = require('webpack');
const webpackmiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../webpack.config');
const AppRoutes = require('./routes/AppRoutes');
const UserRoutes = require('./routes/UserRoutes');
const RecipeRoutes = require('./routes/RecipeRoutes');


const port =process.env.PORT || 3000;;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/recipeshub');

const compile = webpack(webpackConfig);

app.use(webpackmiddleware(compile,{
  hot:true,
  publicPath: webpackConfig.output.publicPath,
  noInfo:true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended:true
}));

app.use(cors);

app.use(webpackHotMiddleware(compile));

AppRoutes(app);
UserRoutes(app);
RecipeRoutes(app);

app.use('/', express.static(__dirname));

app.get('*',(req,res) => {
   res.sendFile(path.resolve(__dirname,'../client/index.html'));
});

server.listen(port,()=> console.log('Running on port: '+port));

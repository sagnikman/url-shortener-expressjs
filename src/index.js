const express = require('express');
const bodyParser = require('body-parser');

const { ServerConfig } = require("./config");
const webRoutes = require('./web');
const apiRoutes = require('./routes');

const app = express();


app.use(bodyParser.urlencoded({ extended: false}));

app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use('/', webRoutes);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server on PORT: ${ServerConfig.PORT}`);
});
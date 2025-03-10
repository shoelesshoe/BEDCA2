const express = require('express');
const mainRoutes = require('./routes/mainRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", mainRoutes);

app.use("/", express.static('public'));

module.exports = app;

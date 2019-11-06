"use strict";
//configurarion de express y body-parser

//cargar modulos
const express = require("express");
const bodyParser = require("body-parser");

const app = express(); //ejecuto express

//cargar archivos de rutas
const project_routes = require("./rutes/project");
//middlewares
app.use(bodyParser.urlencoded({ extended: false })); //convertir lo q me llegue en json con body-parser
app.use(bodyParser.json());

//CORS
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//rutas
app.use("/api", project_routes);

//exportar
module.exports = app;

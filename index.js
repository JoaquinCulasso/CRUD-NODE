"use strict";

//conexión a mongodb
const moongose = require("mongoose");
moongose.Promise = global.Promise;
const app = require("./app");
const port = 3700;

moongose
  .connect("mongodb://localhost:27017/portafolio", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("Conexión exitosa a portafolio");

    //creacion del servidor
    app.listen(port, () => {
      console.log("servidor corriendo con exito en localhost:3700");
    });
  })
  .catch(err => {
    console.log(err);
  });

//crear servidor

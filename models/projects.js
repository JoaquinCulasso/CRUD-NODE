"use strict";

const mongoose = require("mongoose"); //importamos moongose
const Schema = mongoose.Schema; // cargamos un esquema

const ProjectSchema = Schema({
  //Molde u objeta sobre cual se va a trabajar
  name: String,
  description: String,
  category: String,
  year: Number,
  langs: String,
  image: String
});

module.exports = mongoose.model("Project", ProjectSchema);
//projects --> guarda los docs en la coleccion. pasa a minuscula y pluraliza

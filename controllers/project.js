"use strict";

const Project = require("../models/projects");
const fs = require("fs");
const path = require("path");

const controller = {
  home: function(req, res) {
    return res.status(200).send({
      message: "Soy la HOME"
    });
  },
  test: function(req, res) {
    return res.status(200).send({
      message: "Soy el metodo o accion TEST del controlador de proyecto"
    });
  },

  saveProject: function(req, res) {
    const project = new Project();
    const params = req.body;
    project.name = params.name;
    project.description = params.description;
    project.category = params.category;
    project.year = params.year;
    project.langs = params.langs;
    project.image = null;

    project.save((err, projecStored) => {
      //Guarda un nuevo proyecto en la base de datos
      if (err) return res.status(500).send({ message: "Error al guardar" });

      if (!projecStored)
        return res
          .status(404)
          .send({ message: "No se ha podido guardar el proyecto" });

      return res.status(200).send({ project: projecStored });
    });
  },

  getProject: function(req, res) {
    //Buscar un proyecto según id que se le pasa por parametro
    const projectId = req.params.id;

    Project.findById(projectId, (err, project) => {
      if (err)
        return res.status(500).send({ message: "Error al devolver los datos" });

      if (!project)
        return res.status(404).send({ message: "El documento no existe" });

      return res.status(200).send({ project });
    });
  },

  getProjects: function(req, res) {
    //Listar los proyectos de la base de datos
    Project.find({})
      .sort("-year")
      .exec((err, projects) => {
        if (err)
          return res
            .status(500)
            .send({ message: "Error al devolver los datos" });

        if (!projects)
          return res
            .status(404)
            .send({ message: "No hay proyectos para mostrar" });

        return res.status(200).send({ projects });
      });
  },

  updateProject: function(req, res) {
    //actualizar proyecto según id
    const projectId = req.params.id;
    const update = req.body;

    Project.findByIdAndUpdate(
      projectId,
      update,
      { new: true },
      (err, projectUpdate) => {
        if (err)
          return res.status(500).send({ message: "Error al actualizar" });
        if (!projectUpdate)
          return res.status(404).send({
            message: "No existe el projecto con ese Id para actualizar"
          });

        return res.status(200).send({ project: projectUpdate });
      }
    );
  },

  deleteProject: function(req, res) {
    const projectId = req.params.id;

    Project.findByIdAndDelete(projectId, (err, projectRemove) => {
      if (err)
        return res.status(500).send({ message: "Error al borrar documento" });
      if (!projectRemove)
        return res
          .status(404)
          .send({ message: "No existe el documento con el Id a borrar" });
      return res.status(200).send({ project: projectRemove });
    });
  },

  uploadImage: function(req, res) {
    const projectId = req.params.id;

    if (req.files) {
      const filePath = req.files.image.path;
      const fileSplit = filePath.split("\\");
      const fileName = fileSplit[1];
      const extSplit = fileName.split(".");
      const fileExt = extSplit[1];

      if (
        fileExt == "png" ||
        fileExt == "jpg" ||
        fileExt == "jpeg" ||
        fileExt == "gif"
      ) {
        Project.findByIdAndUpdate(
          projectId,
          { image: fileName },
          { new: true },
          (err, projecUpdate) => {
            if (err)
              return res
                .status(500)
                .send({ message: "La imagen no se ha subido" });

            if (!projecUpdate)
              return res
                .status(404)
                .send({ message: "No se encuentra el Id a subir la iamgen" });

            return res.status(200).send({ projecUpdate });
          }
        );
      } else {
        fs.unlink(filePath, err => {
          return res.status(200).send({ message: "La extension no es valida" });
        });
      }
    }
  },

  getImageFile: function(req, res) {
    let file = req.params.image;
    let path_file = "./uploads/" + file;

    fs.exists(path_file, exists => {
      if (exists) {
        return res.sendFile(path.resolve(path_file));
      } else {
        return res.status(200).send({ message: "no existe la imagen.." });
      }
    });
  }
};

module.exports = controller;

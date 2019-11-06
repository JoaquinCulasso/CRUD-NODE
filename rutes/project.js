"use strict";

const express = require("express"); //importamos express
const projectController = require("../controllers/project"); //importar el controller

const router = express.Router();

//middleware de connect-multiparty para subir archivos a mongodb
const multipart = require("connect-multiparty");
const multipartMiddleware = multipart({ uploadDir: "./uploads" });

router.get("/home", projectController.home);
router.post("/test", projectController.test);
router.post("/save-project", projectController.saveProject);
router.get("/project/:id", projectController.getProject);
router.get("/projects", projectController.getProjects);
router.put("/project/:id", projectController.updateProject);
router.delete("/project/:id", projectController.deleteProject);
router.post(
  "/upload-image/:id",
  multipartMiddleware,
  projectController.uploadImage
);
router.get("/get-image/:image", projectController.getImageFile),
  (module.exports = router);

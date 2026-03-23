const express = require("express");
const router = express.Router();
const UsuariosController = require("../controllers/usuarios.controller");


router.get("/", UsuariosController.obtenerUsuarios);
router.post("/", UsuariosController.crearUsuario);
router.get("/:id", UsuariosController.borrarUsuario);

module.exports = router;

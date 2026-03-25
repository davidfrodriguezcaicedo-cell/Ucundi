const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routes");
const usuariosRoutes = require("./usuarios.routes");

router.use("/auth", authRoutes);
router.use("/usuarios", usuariosRoutes);

router.get("/", (req, res) =>{
  console.log("api funcionando");
  res.send("API funcionando");
});

module.exports = router;
const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/", (req, res) => {
    res.sendFile(path.join(process.cwd(), "../../../frontend/Login/login.html"))
});
router.get("/inicio", (req, res) => {
    res.sendFile(path.join(process.cwd(), "../../../frontend/inicio.html"))
});
router.get("/login", (req, res) => {
    res.sendFile(path.join(process.cwd(), "../../../frontend/Login/login.html"))
});
router.get("/crud", (req, res) => {
    res.sendFile(path.join(process.cwd(), "../../../frontend/Crud/CrudPage.html"))
});
router.get("/map", (req, res) => {
    res.sendFile(path.join(process.cwd(), "../../../frontend/map.html"))
});
router.get("/register", (req, res) => {
    res.sendFile(path.join(process.cwd(), "../../../frontend/Register/register.html"))
});
const Apiroutes = require("./api.routes");
router.use("/api", Apiroutes);

module.exports = router;
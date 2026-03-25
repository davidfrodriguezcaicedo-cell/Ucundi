const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../../frontend/Login/login.html"))
});
router.get("/inicio", (req, res) => {
    res.sendFile(path.join(__dirname, "../../../frontend/inicio.html"))
});
router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../../../frontend/Login/login.html"))
});
router.get("/crud", (req, res) => {
    res.sendFile(path.join(__dirname, "../../../frontend/Crud/CrudPage.html"))
});
router.get("/map", (req, res) => {
    res.sendFile(path.join(__dirname, "../../../frontend/map.html"))
});
router.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "../../../frontend/Register/register.html"))
});
const Apiroutes = require("./api.routes");
router.use("/api", Apiroutes);

module.exports = router;
const express = require("express");
const authService = require("../Service/auth.service");
exports.login = async (req , res) => {
    try {
        const { email, password} = req.body;
        const resultado = await authService(email,password);
        if(resultado.success){
            return res.redirect("/inicio");
        }
        return res.status(401).json(resultado);
    } catch (error) {
        return res.status(500).json({
            success:false,
            mensaje:"error en el incio de sesion",
            error: error.message
        })
    }
};
exports.register = async (req, res) =>{
    try {
        const data = req.body;
        const resultado = await authService.register(data);
        if(resultado.success){
           return res.redirect("/incio");
        }
        return res.status(400).json(resultado);
    } catch (error) {
        return res.status(500).json({
            success:false,
            mensaje:"error a la hora de registrarse",
            error: error.message
        })
    }
};
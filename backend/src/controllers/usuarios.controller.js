const usuariosService = require("../Service/usuarios.service");


exports.obtenerUsuarios = async (req, res ) =>{
    try {
       const usuarios = await usuariosService.obtenerUsuarios();
       res.json(usuarios);

    } catch (error) {
        res.status(500).json({
            success:false,
            mensaje:"error al obtener usuarios",
            error: error.message
        })
    }
}
exports.crearUsuario = async (req, res ) =>{
try {
    const resultado = await usuariosService.crearUsuario(req.body);
    res.json(resultado);
} catch (error) {
    res.status(500).json({
            success:false,
            mensaje:"error al crear usuario",
            error: error.message
        })
}
}
exports.borrarUsuario = async(req, res) =>{
try {
    const resultado = await usuariosService.eliminarUsuario(req.params.id);
    res.json(resultado);
    
} catch (error) {
     res.status(500).json({
            success:false,
            mensaje:"error al eliminar usuario",
            error: error.message
        })
}
}
const usuariosRepositorio = require("../repository/usuarios.repository");
exports.login = async (email, password) => {
    if (!email || !password ) {
        return {
            success: false,
            mensaje: "Email y password son obligatorios"
        }
    }
    
    if(email == "admin" && password == "1234"){
        return{
            successAdmin:true,
            mensaje:"Acceso de admin",
            usuario: { email: "admin" }
        }
    }
    
    const usuario = await usuariosRepositorio.findByEmail(email);
    if(!usuario){
        return{
            success:false,
            mensaje:"usuario no existe"
        }
    }
    if(usuario.password != password){
        return{
            success:false,
            mensaje:"contraseña incorrecta"
        }
    }
    const { password: _, ...usuarioSinPassword } = usuario;
     
    return {
        success: true,
        mensaje: 'Login correcto',
        usuario: usuarioSinPassword
    };

}
exports.register = async(data) =>{
    const { nombre, documento, telefono, email, password } = data;

  
    if (!nombre || !documento || !telefono || !email || !password) {
        return {
            success: false,
            mensaje: 'Todos los campos son obligatorios'
        };
    }
    const usuarioExistente = await usuariosRepositorio.findByEmail(email)
    if(usuarioExistente){
      return {
            success: false,
            mensaje: 'Ya existe un usuario con ese correo'
        };
    }
     const nuevoUsuario = await usuariosRepositorio.create({
        nombre,
        documento,
        telefono,
        email,
        password
    });
    return {
        success: true,
        mensaje: 'Usuario registrado correctamente',
        data: nuevoUsuario
    };
}
const usuariosRepository = require("../repository/usuarios.repository");

exports.obtenerUsuarios = async () => {
    return await usuariosRepository.getall();
};


exports.crearUsuario = async (data) => {
    const { nombre, documento, telefono, email, password } = data;

    if (!nombre || !documento || !telefono || !email || !password) {
        return {
            success: false,
            mensaje: 'Todos los campos son obligatorios'
        };
    }

    const usuario = await usuariosRepository.create({
        nombre,
        documento,
        telefono,
        email,
        password
    });

    return {
        success: true,
        mensaje: 'Usuario creado correctamente',
        data: usuario
    };
};


exports.eliminarUsuario = async (id) => {
    if (!id) {
        return {
            success: false,
            mensaje: 'ID obligatorio'
        };
    }

    await usuariosRepository.deleteById(id);

    return {
        success: true,
        mensaje: 'Usuario eliminado correctamente',
        id
    };
};
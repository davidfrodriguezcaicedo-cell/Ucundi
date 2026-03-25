const db = require("../config/conexion");
exports.findByEmail = async (email) => {
    const [rows] = await db.query(
        'SELECT * FROM usuarios WHERE email = ? LIMIT 1',
        [email]
    );

    return rows[0] || null;
};

exports.getall = async () => {
    const[rows] =  await db.query("SELECT * FROM usuarios");
    return rows;
};
exports.create = async (data) => {
    const { nombre, documento, telefono, email, password } = data;

    const [result] = await db.query(
        `INSERT INTO usuarios (nombre, documento, telefono, email, password)
         VALUES (?, ?, ?, ?, ?)`,
        [nombre, documento, telefono, email, password]
    );

    return {
        id: result.insertId,
        nombre,
        documento,
        telefono,
        email,
        password
    };
};
exports.deleteById = async (id) => {
    await db.query('DELETE FROM usuarios WHERE id = ?', [id]);
};

/*async function getAllUsers() { const[rows] =  await db.query("SELECT * FROM usuarios");
    return rows;}
async function prueba(){
    console.log("prueba");
    const usuarios = await getAllUsers();
    console.log(usuarios);

}
prueba();
*/
const API_URL = "/api/usuarios";

// Formulario
const form = document.querySelector("#crud-card-form form");
const nombreInput = document.querySelector("#nombre");
const documentoInput = document.querySelector("#documento");
const correoInput = document.querySelector("#correo");
const telefonoInput = document.querySelector("#telefono");

// Tabla
const tbody = document.querySelector("#crud-card-table tbody");

// Botón guardar
const guardarBtn = document.querySelector('#crud-card-form input[type="submit"]');

// Estado para edición
let idEditando = null;

// ===============================
// CARGAR USUARIOS AL ABRIR LA PÁGINA
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    cargarUsuarios();
});

// ===============================
// OBTENER USUARIOS DESDE EL BACKEND
// ===============================
async function cargarUsuarios() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("No se pudieron obtener los usuarios");
        }

        const data = await response.json();

        // Soporta respuesta tipo array o tipo { data: [...] }
        const usuarios = Array.isArray(data) ? data : (data.data || []);

        renderizarUsuarios(usuarios);
    } catch (error) {
        console.error("Error cargando usuarios:", error);
        tbody.innerHTML = `
            <tr>
                <td colspan="6">Error cargando usuarios</td>
            </tr>
        `;
    }
}

// ===============================
// RENDERIZAR LA TABLA
// ===============================
function renderizarUsuarios(usuarios) {
    tbody.innerHTML = "";

    if (usuarios.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6">No hay usuarios registrados</td>
            </tr>
        `;
        return;
    }

    usuarios.forEach((usuario) => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${usuario.id ?? ""}</td>
            <td>${usuario.nombre ?? ""}</td>
            <td>${usuario.documento ?? ""}</td>
            <td>${usuario.email ?? ""}</td>
            <td>${usuario.telefono ?? ""}</td>
            <td>
                <button class="accion editar" data-id="${usuario.id}">Editar</button>
                <button class="accion eliminar" data-id="${usuario.id}">Eliminar</button>
            </td>
        `;

        tbody.appendChild(fila);
    });

    // Capturamos eventos de botones dinámicos
    agregarEventosBotones();
}

// ===============================
// CAPTURAR BOTONES DE LA TABLA
// ===============================
function agregarEventosBotones() {
    const botonesEliminar = document.querySelectorAll(".accion.eliminar");
    const botonesEditar = document.querySelectorAll(".accion.editar");

    botonesEliminar.forEach((boton) => {
        boton.addEventListener("click", async (e) => {
            const id = e.target.dataset.id;
            await eliminarUsuario(id);
        });
    });

    botonesEditar.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            const id = e.target.dataset.id;
            prepararEdicion(id);
        });
    });
}

// ===============================
// CREAR O ACTUALIZAR USUARIO
// ===============================
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const usuario = {
        nombre: nombreInput.value.trim(),
        documento: documentoInput.value.trim(),
        email: correoInput.value.trim(),
        telefono: telefonoInput.value.trim()
    };

    try {
        let response;

        // Si estamos editando, usamos PUT
        if (idEditando) {
            response = await fetch(`${API_URL}/${idEditando}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usuario)
            });
        } else {
            // Si no, creamos con POST
            response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usuario)
            });
        }

        if (!response.ok) {
            throw new Error("Error guardando usuario");
        }

        // Limpia el formulario y recarga la tabla
        form.reset();
        idEditando = null;
        guardarBtn.value = "Guardar";

        cargarUsuarios();
    } catch (error) {
        console.error("Error:", error);
        alert("No se pudo guardar el usuario");
    }
});

// ===============================
// ELIMINAR USUARIO
// ===============================
async function eliminarUsuario(id) {
    const confirmar = confirm("¿Seguro que deseas eliminar este usuario?");
    if (!confirmar) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Error eliminando usuario");
        }

        cargarUsuarios();
    } catch (error) {
        console.error("Error:", error);
        alert("No se pudo eliminar el usuario");
    }
}

// ===============================
// PREPARAR EDICIÓN
// ===============================
function prepararEdicion(id) {
    // Aquí puedes traer el usuario desde la tabla si ya lo tienes visible
    // o hacer un fetch a /api/usuarios/:id si luego creas esa ruta GET por id.
    //
    // Por ahora dejamos la estructura lista para cuando conectes el PUT real.

    idEditando = id;
    guardarBtn.value = "Actualizar";

    alert("Modo edición activado. Si ya tienes PUT en el backend, este botón actualizará.");
}
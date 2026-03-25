const submitButton = document.querySelector('input[type="submit"]');
submitButton.addEventListener('click', async function(event) {
    event.preventDefault();
    const email = document.getElementById('Email').value;
    const password = document.getElementById('Password').value;
    const nombre = document.getElementById('nombre').value;
    const documento = document.getElementById('documento').value;
    const telefono = document.getElementById('telefono').value;
   
    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password,nombre, documento, telefono })
        });
        const result = await response.json();
        if (response.ok) {

            if (result.success) {
                window.location.href = '/inicio';
            } else {
                alert(result.mensaje);
            }

        }
            
    } catch (error) {
        alert('Error al iniciar sesión: ' + error.message);
    }
});

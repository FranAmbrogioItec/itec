const form = document.getElementById('formulario');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const usuario = document.getElementById('usuario').value;
    const edad = document.getElementById('edad').value;
    const password = document.getElementById('password').value;

    const errorUsuario = document.getElementById("errorUsuario");
    const errorEdad = document.getElementById("errorEdad");
    const errorPassword = document.getElementById("errorPassword");
    const mensaje = document.getElementById("mensaje");

    errorUsuario.innerText = '';
    errorEdad.innerText = '';
    errorPassword.innerText = '';
    mensaje.innerText = '';

    let tieneError = false;

    if (usuario === '') { 
        errorUsuario.innerText = 'El nombre de usuario es requerido';
        tieneError = true;
    }

    else if (edad < 18) {
        errorEdad.innerText = 'La edad debe ser mayor o igual a 18';
        tieneError = true;
    }

    else if (password.length < 6) {
        errorPassword.innerText = 'La contraseña debe tener al menos 6 caracteres';
        tieneError = true;
    }

    else if (!tieneError) {
        mensaje.innerText = `Bienvenido ${usuario} su registro se ha realizado con éxito!`;
    }

})

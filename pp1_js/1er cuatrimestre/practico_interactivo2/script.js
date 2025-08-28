// Usuario y contraseña predefinidos
const usuarioValido = "admin";
const contrasenaValida = "1234";


const usuarioIngresado = prompt("Ingrese su usuario:(admin)");
const contrasenaIngresada = prompt("Ingrese su contraseña:(1234)");


if (usuarioIngresado === usuarioValido && contrasenaIngresada === contrasenaValida) {
    alert("¡Bienvenido!");
} else {
    alert("Usuario o contraseña incorrectos");  
}

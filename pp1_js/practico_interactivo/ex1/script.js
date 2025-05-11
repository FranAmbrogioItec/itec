// TODO: Pedir el nombre con prompt
// TODO: Pedir la edad
// TODO: Calcular el precio de la entrada según la edad
// TODO: Mostrar un mensaje personalizado con alert

// Ejemplo final esperado:
// "Hola Juan, tenés 16 años. Tu entrada cuesta $1500"

const nombre = prompt("Ingrese su nombre")
alert("Su nombre es: " + nombre)
const edad = parseInt(prompt("Ingrese su edad"))

if (edad < 5 || edad >= 80) {
    alert("Su entrada es gratis")
} else if (edad < 13 ) {
    alert("Su entrada cuesta $1000")
} else if (edad >= 13 && edad <= 17) {
    alert("Su entrada cuesta $1500")
} else {
    alert("Su entrada cuesta $2000")
}

console.log(nombre);
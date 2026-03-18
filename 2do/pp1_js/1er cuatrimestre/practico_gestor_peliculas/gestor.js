// Array para almacenar las películas
let peliculas = [];

// Obtener referencias a los elementos del DOM (se pueden obtener fuera de las funciones)
const entradaPelicula = document.getElementById('entradaPelicula');
const listaPeliculas = document.getElementById('listaPeliculas');
const entradaIndiceEliminar = document.getElementById('entradaIndiceEliminar');

// Función para renderizar la lista de películas en el DOM
// Esta función se llamará automáticamente al cargar la página (ver al final)
// y por las funciones de agregar/eliminar.
function renderizarPeliculas() {
    listaPeliculas.innerHTML = ''; // Limpiar la lista actual en el HTML

    if (peliculas.length === 0) {
        listaPeliculas.innerHTML = '<li>No hay películas en tu lista. ¡Agrega una!</li>';
        return;
    }

    peliculas.forEach((pelicula, indice) => {
        const elementoLista = document.createElement('li');
        // Usamos indice + 1 para que la numeración visible empiece desde 1
        elementoLista.textContent = `${indice + 1}. ${pelicula}`;
        listaPeliculas.appendChild(elementoLista);
    });
}

// 1. Agregar películas
// recibe el objeto 'event' para poder usar event.preventDefault()
function agregarPelicula(evento) {
    evento.preventDefault(); // evita que el formulario recargue la página

    const nombrePelicula = entradaPelicula.value.trim(); // .trim obtiene el valor limpio sin espacios

    if (nombrePelicula === '') {
        alert('Por favor, ingresa un nombre de película válido.');
        return;
    }

    peliculas.push(nombrePelicula); // Agregar la película al array
    entradaPelicula.value = ''; // Limpiar el campo de texto
    renderizarPeliculas(); // Volver a renderizar la lista para mostrar la nueva película
}

// 3. Eliminar una película
// Recibe el objeto 'event' para poder usar event.preventDefault()
function eliminarPelicula(evento) {
    evento.preventDefault(); // Evitar que el formulario recargue la página

    const indiceAEliminar = parseInt(entradaIndiceEliminar.value) - 1; // Obtener el índice (ajustar de 1-based a 0-based)

    // Validaciones
    if (isNaN(indiceAEliminar) || indiceAEliminar < 0 || indiceAEliminar >= peliculas.length) {
        alert('Por favor, ingresa un número de película válido para eliminar.');
        return;
    }

    // Eliminar la película del array
    peliculas.splice(indiceAEliminar, 1); // Elimina 1 elemento desde la posición indiceAEliminar
    entradaIndiceEliminar.value = ''; // Limpiar el campo de texto
    renderizarPeliculas(); // Actualizar la lista en pantalla
}

// 4. Ver lista numerada (uso de .map())
// Esta función se llama directamente desde el onclick del botón
function verListaNumerada() {
    if (peliculas.length === 0) {
        alert('Tu lista de películas está vacía.');
        return;
    }

    // Usar .map() para crear un nuevo array con las películas numeradas
    const peliculasNumeradas = peliculas.map((pelicula, indice) => {
        return `${indice + 1}. ${pelicula}`;
    });

    // Mostrar la lista numerada en un alert
    alert('Películas numeradas:\n' + peliculasNumeradas.join('\n'));
}

// Renderizar la lista inicialmente cuando la página carga
// Llamamos a la función directamente ya que no dependemos de DOMContentLoaded
renderizarPeliculas();
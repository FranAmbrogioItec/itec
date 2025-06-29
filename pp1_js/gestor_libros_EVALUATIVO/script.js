// Variables globales
let libros = JSON.parse(localStorage.getItem('libros')) || [];
let editando = false;
let indiceEditar = null;
let ordenAnioAscendente = false; // Variable para controlar el orden de la tabla

const formLibro = document.getElementById('bookForm');
const inputTitulo = document.getElementById('title');
const inputAutor = document.getElementById('author');
const inputAnio = document.getElementById('year');
const inputGenero = document.getElementById('genre');
const botonGuardar = formLibro.querySelector('button[type="submit"]');
const botonCancelar = document.getElementById('cancelEditBtn');
const cuerpoTablaLibros = document.getElementById('booksTableBody');
const inputBusquedaTitulo = document.getElementById('searchTitle');
const selectFiltroGenero = document.getElementById('filterGenre');
const botonOrdenarAsc = document.getElementById('sortByYearAsc');
const botonOrdenarDesc = document.getElementById('sortByYearDesc');
const mensajeNoLibros = document.getElementById('noBooksMessage');

// Referencias para el resumen estadístico
const totalLibrosSpan = document.getElementById('totalBooks');
const promedioAnioSpan = document.getElementById('avgYear');
const posteriores2010Span = document.getElementById('after2010');
const libroMasAntiguoSpan = document.getElementById('oldestBook');
const libroMasRecienteSpan = document.getElementById('recentBook');



const agregarLibro = () => {
    const titulo = inputTitulo.value.trim();
    const autor = inputAutor.value.trim();
    const anio = parseInt(inputAnio.value);
    const genero = inputGenero.value.trim();

    if (!titulo || !autor || !anio || !genero) {
        alert('Todos los campos son obligatorios.');
        return;
    }

    const anioActual = new Date().getFullYear(); // Lógica para obtener el año actual
    if (anio < 1900 || anio > anioActual) {
        alert(`El año debe estar entre 1900 y ${anioActual}.`);
        return;
    }

    if (editando) {
        // Lógica para EDICIÓN de un libro existente
        
        // Validación de duplicados al editar
        const yaExiste = libros.some((libro, index) =>
            index !== indiceEditar &&
            libro.titulo.toLowerCase() === titulo.toLowerCase() &&
            libro.autor.toLowerCase() === autor.toLowerCase()
        );
        if (yaExiste) {
            alert('Ya existe un libro con el mismo título y autor.');
            return;
        }

        libros[indiceEditar] = { titulo, autor, anio, genero };
        editando = false;
        indiceEditar = null;
        botonGuardar.innerText = 'Guardar Libro';
        botonCancelar.style.display = 'none'; // Ocultar botón cancelar
        alert('Libro actualizado exitosamente.');
    } else {
        // Lógica para AGREGAR un nuevo libro

        // Validación para no permitir duplicados
        const yaExiste = libros.some(libro =>
            libro.titulo.toLowerCase() === titulo.toLowerCase() &&
            libro.autor.toLowerCase() === autor.toLowerCase()
        );
        if (yaExiste) {
            alert('Este libro ya se encuentra cargado en el listado.');
            return;
        }
        
        // Creamos y guardamos el libro en nuestro array local
        libros.push({
            id: Date.now(), // Usamos un ID único para cada libro
            titulo,
            autor,
            anio,
            genero
        });
        alert('Libro agregado exitosamente.');
    }

    // 3. Guardar libros en localStorage
    localStorage.setItem('libros', JSON.stringify(libros));

    // Actualizar la interfaz de usuario
    renderizarLibros();
    mostrarResumen();
    actualizarSelectGenero();

    // Limpiar el formulario
    formLibro.reset();
};


/**
 * @function renderizarLibros
 * @description Muestra los libros en la tabla del HTML.
 * @param {Array} lista - Array de libros a renderizar. Por defecto, usa el array global 'libros'.
 */
const renderizarLibros = (lista = libros) => {
    cuerpoTablaLibros.innerHTML = ''; // Limpiar la tabla

    if (lista.length === 0) {
        cuerpoTablaLibros.innerHTML = `<tr><td colspan="6" class="text-center">No hay libros registrados.</td></tr>`;
        mensajeNoLibros.style.display = 'block';
        return;
    }

    mensajeNoLibros.style.display = 'none';

    lista.forEach((libro, index) => {
        // Para obtener el índice real del array 'libros' original (útil para editar/eliminar)
        const indexReal = libros.indexOf(libro);

        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${indexReal + 1}</td>
            <td>${libro.titulo}</td>
            <td>${libro.autor}</td>
            <td>${libro.anio}</td>
            <td>${libro.genero}</td>
            <td>
                <button type="button" class="btn btn-sm btn-warning me-1" onclick="editarLibro(${indexReal})">
                    <i class="bi bi-pencil-fill"></i> Editar
                </button>
                <button type="button" class="btn btn-sm btn-danger" onclick="eliminarLibro(${indexReal})">
                    <i class="bi bi-trash-fill"></i> Eliminar
                </button>
            </td>
        `;
        cuerpoTablaLibros.appendChild(fila);
    });
};


/**
 * @function editarLibro
 * @description Carga los datos de un libro en el formulario para su edición.
 * @param {number} index - Índice del libro en el array 'libros'.
 */
const editarLibro = (index) => {
    const libro = libros[index];
    inputTitulo.value = libro.titulo;
    inputAutor.value = libro.autor;
    inputAnio.value = libro.anio;
    inputGenero.value = libro.genero;
    
    // Cambiar estado del formulario a modo edición 
    botonGuardar.innerText = 'Actualizar Libro';
    botonCancelar.style.display = 'inline-block';
    editando = true;
    indiceEditar = index;

    //focusea y scroll al formulario de edicion
    inputTitulo.focus();
    formLibro.scrollIntoView({ behavior: 'smooth', block: 'start' });
};


/**
 * @function eliminarLibro
 * @description Elimina un libro del array y de localStorage.
 * @param {number} index - Índice del libro a eliminar en el array 'libros'.
 */
const eliminarLibro = (index) => {
    if (confirm('¿Estás seguro de que quieres eliminar este libro?')) {
        // Eliminar el libro del array
        libros.splice(index, 1);

        // Actualizar localStorage
        localStorage.setItem('libros', JSON.stringify(libros));

        // Actualizar la interfaz de usuario
        renderizarLibros();
        mostrarResumen();
        actualizarSelectGenero();
        alert('Libro eliminado exitosamente.');
    }
};


/**
 * @function filtrarLibrosPorTitulo
 * @description Filtra la tabla de libros por coincidencia en el título.
 */
const filtrarLibrosPorTitulo = () => {
    const textoBusqueda = inputBusquedaTitulo.value.toLowerCase().trim();
    
    // Filtramos primero por título
    let librosFiltrados = libros.filter(libro =>
        libro.titulo.toLowerCase().includes(textoBusqueda)
    );
    
    // Luego, aplicamos el filtro de género si está seleccionado
    const generoSeleccionado = selectFiltroGenero.value;
    if (generoSeleccionado !== 'todos') {
        librosFiltrados = librosFiltrados.filter(libro => libro.genero === generoSeleccionado);
    }
    
    renderizarLibros(librosFiltrados);
};


/**
 * @function filtrarLibrosPorGenero
 * @description Filtra la tabla de libros por género seleccionado.
 */
const filtrarLibrosPorGenero = () => {
    const generoSeleccionado = selectFiltroGenero.value;
    
    // Filtramos primero por el texto de búsqueda
    const textoBusqueda = inputBusquedaTitulo.value.toLowerCase().trim();
    let librosFiltrados = libros.filter(libro =>
        libro.titulo.toLowerCase().includes(textoBusqueda)
    );
    
    // Luego, aplicamos el filtro de género
    if (generoSeleccionado !== 'todos') {
        librosFiltrados = librosFiltrados.filter(libro => libro.genero === generoSeleccionado);
    }
    
    renderizarLibros(librosFiltrados);
};


/**
 * @function ordenarPorAnio
 * @description Ordena la tabla de libros por año de publicación (ascendente/descendente).
 */
const ordenarPorAnio = () => {
    const librosOrdenados = [...libros].sort((a, b) => {
        return ordenAnioAscendente ? a.anio - b.anio : b.anio - a.anio;
    });

    // Invertir el orden para la próxima vez
    ordenAnioAscendente = !ordenAnioAscendente;
    
    renderizarLibros(librosOrdenados);
};


/**
 * @function mostrarResumen
 * @description Calcula y muestra las estadísticas de la biblioteca.
 */
const mostrarResumen = () => {
    if (libros.length === 0) {
        totalLibrosSpan.innerText = 0;
        promedioAnioSpan.innerText = 'N/A';
        posteriores2010Span.innerText = 0;
        libroMasAntiguoSpan.innerText = 'N/A';
        libroMasRecienteSpan.innerText = 'N/A';
        return;
    }

    // 1. Total de libros registrados
    const total = libros.length;

    // 2. Promedio del año de publicación
    const sumaAnios = libros.reduce((acum, libro) => acum + parseInt(libro.anio), 0);
    const promedio = Math.round(sumaAnios / total);

    // 3. Libros posteriores a 2010
    const posterioresA2010 = libros.filter(libro => libro.anio > 2010).length;

    // 4. Libro más antiguo
    const libroMasAntiguo = libros.reduce((minLibro, libro) =>
        (libro.anio < minLibro.anio ? libro : minLibro), libros[0]
    );

    // 5. Libro más reciente
    const libroMasReciente = libros.reduce((maxLibro, libro) =>
        (libro.anio > maxLibro.anio ? libro : maxLibro), libros[0]
    );

    // Actualizar los elementos en el HTML
    totalLibrosSpan.innerText = total;
    promedioAnioSpan.innerText = promedio;
    posteriores2010Span.innerText = posterioresA2010;
    libroMasAntiguoSpan.innerText = `${libroMasAntiguo.titulo} (${libroMasAntiguo.anio})`;
    libroMasRecienteSpan.innerText = `${libroMasReciente.titulo} (${libroMasReciente.anio})`;
};


/**
 * @function actualizarSelectGenero
 * @description Rellena el select de filtro de género con los géneros únicos de los libros.
 */
const actualizarSelectGenero = () => {
    const generosUnicos = [...new Set(libros.map(libro => libro.genero))].sort();

    selectFiltroGenero.innerHTML = `<option value="todos">Todos los Géneros</option>`;
    generosUnicos.forEach(genero => {
        const option = document.createElement("option");
        option.value = genero;
        option.text = genero;
        selectFiltroGenero.appendChild(option);
    });
};


/**
 * @function inicializar
 * @description Función que se ejecuta al cargar el DOM para inicializar la aplicación.
 */
const inicializar = () => {
    // 2. Cargar libros desde localStorage al inicio
    libros = JSON.parse(localStorage.getItem('libros')) || [];

    // Validar el año máximo del input
    document.getElementById('year').max = new Date().getFullYear();

    // Renderizar la UI con los datos cargados
    renderizarLibros();
    mostrarResumen();
    actualizarSelectGenero();
};


// --- Event Listeners ---
document.addEventListener('DOMContentLoaded', inicializar);
formLibro.addEventListener('submit', (e) => {
    e.preventDefault(); // Evitar la recarga de la página
    agregarLibro();
});
inputBusquedaTitulo.addEventListener('input', filtrarLibrosPorTitulo);
selectFiltroGenero.addEventListener('change', filtrarLibrosPorGenero);
botonOrdenarAsc.addEventListener('click', ordenarPorAnio);
botonOrdenarDesc.addEventListener('click', ordenarPorAnio); // Ambos botones llaman a la misma función
botonCancelar.addEventListener('click', () => {
    // Restablecer el formulario y el estado de edición
    formLibro.reset();
    editando = false;
    indiceEditar = null;
    botonGuardar.innerText = 'Guardar Libro';
    botonCancelar.style.display = 'none';
});
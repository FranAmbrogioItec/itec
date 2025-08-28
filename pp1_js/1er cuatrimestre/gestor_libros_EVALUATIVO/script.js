let libros = JSON.parse(localStorage.getItem('libros')) || [];
let editando = false;
let indiceEditar = null;
let ordenAnioAscendente = false; //variable para controlar el orden de la tabla

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

    const anioActual = new Date().getFullYear(); //obtengo el año actual
    if (anio < 1900 || anio > anioActual) {
        alert(`El año debe estar entre 1900 y ${anioActual}.`);
        return;
    }

    if (editando) {
        const yaExiste = libros.some((libro, index) => //validacion de duplicados al editar
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
        botonCancelar.style.display = 'none'; //oculta boton cancelar
        alert('Libro actualizado exitosamente.');
    } else {
        const yaExiste = libros.some(libro => //validacion de duplicados al agregar
            libro.titulo.toLowerCase() === titulo.toLowerCase() &&
            libro.autor.toLowerCase() === autor.toLowerCase()
        );
        if (yaExiste) {
            alert('Este libro ya se encuentra cargado en el listado.');
            return;
        }
        
        libros.push({
            id: Date.now(),
            titulo,
            autor,
            anio,
            genero
        });
        alert('Libro agregado exitosamente.');
    }

    localStorage.setItem('libros', JSON.stringify(libros));

    //actualiza iu
    renderizarLibros();
    mostrarResumen();
    actualizarSelectGenero();

    formLibro.reset();
};



const renderizarLibros = (lista = libros) => {
    cuerpoTablaLibros.innerHTML = ''; 

    if (lista.length === 0) {
        cuerpoTablaLibros.innerHTML = `<tr><td colspan="6" class="text-center">No hay libros registrados.</td></tr>`;
        mensajeNoLibros.style.display = 'block';
        return;
    }

    mensajeNoLibros.style.display = 'none';

    lista.forEach((libro, index) => {
        //para obtener el indice de [libros]
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


const editarLibro = (index) => {
    const libro = libros[index];
    inputTitulo.value = libro.titulo;
    inputAutor.value = libro.autor;
    inputAnio.value = libro.anio;
    inputGenero.value = libro.genero;
    
    botonGuardar.innerText = 'Actualizar Libro';
    botonCancelar.style.display = 'inline-block';
    editando = true;
    indiceEditar = index;

    //focusea y scroll al formulario de edicion
    inputTitulo.focus();
    formLibro.scrollIntoView({ behavior: 'smooth', block: 'start' });
};


const eliminarLibro = (index) => {
    if (confirm('¿Estás seguro de que quieres eliminar este libro?')) {
        //elimina el libro del array
        libros.splice(index, 1);

        //actualiza localStorage
        localStorage.setItem('libros', JSON.stringify(libros));

        //actualiza la interfaz de usuario
        renderizarLibros();
        mostrarResumen();
        actualizarSelectGenero();
        alert('Libro eliminado exitosamente.');
    }
};



const filtrarLibrosPorTitulo = () => {
    const textoBusqueda = inputBusquedaTitulo.value.toLowerCase().trim();
    
    let librosFiltrados = libros.filter(libro =>
        libro.titulo.toLowerCase().includes(textoBusqueda)
    );
    
    const generoSeleccionado = selectFiltroGenero.value;
    if (generoSeleccionado !== 'todos') {
        librosFiltrados = librosFiltrados.filter(libro => libro.genero === generoSeleccionado);
    }
    
    renderizarLibros(librosFiltrados);
};


const filtrarLibrosPorGenero = () => {
    const generoSeleccionado = selectFiltroGenero.value;
    
    const textoBusqueda = inputBusquedaTitulo.value.toLowerCase().trim();
    let librosFiltrados = libros.filter(libro =>
        libro.titulo.toLowerCase().includes(textoBusqueda)
    );
    
    if (generoSeleccionado !== 'todos') {
        librosFiltrados = librosFiltrados.filter(libro => libro.genero === generoSeleccionado);
    }
    
    renderizarLibros(librosFiltrados);
};


const ordenarPorAnio = () => {
    const librosOrdenados = [...libros].sort((a, b) => {
        return ordenAnioAscendente ? a.anio - b.anio : b.anio - a.anio;
    });

    ordenAnioAscendente = !ordenAnioAscendente;
    
    renderizarLibros(librosOrdenados);
};


const mostrarResumen = () => {
    if (libros.length === 0) {
        totalLibrosSpan.innerText = 0;
        promedioAnioSpan.innerText = 'N/A';
        posteriores2010Span.innerText = 0;
        libroMasAntiguoSpan.innerText = 'N/A';
        libroMasRecienteSpan.innerText = 'N/A';
        return;
    }

    //total de libros registrados
    const total = libros.length;

    //promedio del año de publicación
    const sumaAnios = libros.reduce((acum, libro) => acum + parseInt(libro.anio), 0);
    const promedio = Math.round(sumaAnios / total);

    const posterioresA2010 = libros.filter(libro => libro.anio > 2010).length;

    const libroMasAntiguo = libros.reduce((minLibro, libro) =>
        (libro.anio < minLibro.anio ? libro : minLibro), libros[0]
    );

    const libroMasReciente = libros.reduce((maxLibro, libro) =>
        (libro.anio > maxLibro.anio ? libro : maxLibro), libros[0]
    );

    //actualiza el html.
    totalLibrosSpan.innerText = total;
    promedioAnioSpan.innerText = promedio;
    posteriores2010Span.innerText = posterioresA2010;
    libroMasAntiguoSpan.innerText = `${libroMasAntiguo.titulo} (${libroMasAntiguo.anio})`;
    libroMasRecienteSpan.innerText = `${libroMasReciente.titulo} (${libroMasReciente.anio})`;
};


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


const inicializar = () => {
    libros = JSON.parse(localStorage.getItem('libros')) || [];

    document.getElementById('year').max = new Date().getFullYear();

    renderizarLibros();
    mostrarResumen();
    actualizarSelectGenero();
};


document.addEventListener('DOMContentLoaded', inicializar);
formLibro.addEventListener('submit', (e) => {
    e.preventDefault(); //evita la recarga de la pagina
    agregarLibro();
});
inputBusquedaTitulo.addEventListener('input', filtrarLibrosPorTitulo);
selectFiltroGenero.addEventListener('change', filtrarLibrosPorGenero);
botonOrdenarAsc.addEventListener('click', ordenarPorAnio);
botonOrdenarDesc.addEventListener('click', ordenarPorAnio); 
botonCancelar.addEventListener('click', () => {
    // reestablece el formulario y el estado de edicion
    formLibro.reset();
    editando = false;
    indiceEditar = null;
    botonGuardar.innerText = 'Guardar Libro';
    botonCancelar.style.display = 'none';
});
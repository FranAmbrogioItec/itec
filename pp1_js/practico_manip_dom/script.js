const agregarParticipanteButton = document.getElementById('agregarParticipante');
const nombreParticipanteInput = document.getElementById('nombreParticipante');
const listaParticipantes = document.getElementById('listaParticipantes');


function agregarParticipante(event) {
    event.preventDefault();  //para q la pagina no refresque cuando se haga click en agregar participante

    const nombre = nombreParticipanteInput.value.trim();

    if (nombre === '') {
        alert('Por favor, ingresa un nombre');
        return;
    }

    const li = document.createElement('li'); //crea elemento li con el nombre asignado en el input
    li.textContent = nombre;

    const btnPresente = document.createElement('button');
    btnPresente.textContent = 'Marcar como presenteXD';
    btnPresente.onclick = function() { //cuando el button esta onclick le agrega la class 'presente'
        li.classList.toggle('presente');
    };

    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'x';
    btnEliminar.onclick = function() {
        listaParticipantes.removeChild(li); // boton X onclick elimina el 'li' creado
    };

    // Agregar los botones al participante
    li.appendChild(btnPresente);
    li.appendChild(btnEliminar);

    // Agregar el nuevo participante a la lista
    listaParticipantes.appendChild(li);

    // Limpiar el campo de texto
    nombreParticipanteInput.value = '';
}

// Evento de clic para agregar el participante
agregarParticipanteButton.addEventListener('click', agregarParticipante);

// Evento para presionar Enter y agregar el participante
nombreParticipanteInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        agregarParticipante(event);
    }
});

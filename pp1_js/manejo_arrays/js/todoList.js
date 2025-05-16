const boton = document.getElementById("agregarTarea")
const input = document.getElementById('tareaInput')
const errorMensaje = document.getElementById("mensajeError")
const lista = document.getElementById("listaTareas")

boton.addEventListener("click", (e) => {
    const text = input.value.trim()
    if (text === "") {
        errorMensaje.innerText = 'Complete este campo'
        return
    } else {
        errorMensaje.innerText = ''
    }

    const li = document.createElement('li')
    li.innerText = text

    li.addEventListener('click', () => {
        li.classList.toggle("completada")
    })

    const btnEliminar = document.createElement("button")
    btnEliminar.innerText = "Eliminar"
    btnEliminar.style.marginLeft = '10px'

    btnEliminar.addEventListener("click", (e) => {
        e.stopPropagation()
        lista.removeChild(li)
    })

    li.appendChild(btnEliminar)
    lista.appendChild(li)
    input.value = ''
})
let autos = JSON.parse(localStorage.getItem('autos')) || [] //busca lo q haya en la localStorage || o en caso de q no haya nada en la localStorage, define el array vacio, son 2 opciones q tiene segun lo q encuentre

const agregarAuto = () => {
    const marca = document.getElementById('marca').value.trim()
    const modelo = document.getElementById('modelo').value.trim()
    const anio = document.getElementById('anio').value

    if (marca !== '' && modelo !== '' && anio !== '') {

        // Guardamos en nuestro array local autos que vamos creando
        autos.push({ marca, modelo, anio })

        // Guardamos dentro de la local storage los autos que vamos creando - Utilizos autos que es nuestro array local
        localStorage.setItem('autos', JSON.stringify(autos))

        renderizarAutos()

        document.getElementById('marca').value = ''
        document.getElementById('modelo').value = ''
        document.getElementById('anio').value = ''
    }
}

const filtrarAutos = () => {
    const texto = document.getElementById('busqueda').value.toLowerCase()

    const autosFiltrados = autos.filter(auto => auto.marca.toLowerCase().includes(texto))

    console.log(autosFiltrados)
}

const renderizarAutos = () => {
    const tabla = document.getElementById('tablaAutos').querySelector('tbody')

    tabla.innerText = ''

    autos.forEach((auto, index) => {
        const fila = document.createElement('tr')

        fila.innerHTML = `
            <td>${index + 1}</td>
            <td>${auto.marca}</td>
            <td>${auto.modelo}</td>
            <td>${auto.anio}</td>
            <td>
                <button onclick="eliminarAuto(${index})">Eliminar</button>
            </td>
            `

        tabla.appendChild(fila)

    })
}

const eliminarAuto = (index) => {

    // Eliminar el auto del array
    autos.splice(index, 1)

    // Actualizar local storage
    localStorage.setItem('autos', JSON.stringify(autos))

    renderizarAutos()

}

// Evento que sirve para renderizar contenido una vez cardado el dom de la pagina inicial
document.addEventListener('DOMContentLoaded', () => {
    renderizarAutos()
})
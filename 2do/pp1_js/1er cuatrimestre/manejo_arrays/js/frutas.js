let frutas = ["banana", "manzana", "pera"]


const mostrarFrutas = () => {
    const listaFrutas = document.getElementById("listaFrutas")
    listaFrutas.innerHTML = '' //limpio la lista para q cada vez q muestro el array no me repita todos los elementos de la lista, y solo agregue el nuevo
    frutas.forEach(fruta => {
        const li = document.createElement('li')
        li.innerText = fruta
        listaFrutas.appendChild(li)
    })         
}

const agregarFruta = () => {
    const nuevaFruta = document.getElementById('nuevaFruta').value
    frutas.push(nuevaFruta)
    alert(`Nueva fruta agregada: ${nuevaFruta}`)
    console.log("frutas", frutas);
    mostrarFrutas()
}

const eliminarFruta = () => {
    const posicionFruta = document.getElementById('posicionFruta').value
    const cantidadFrutas = document.getElementById('cantidadFruta').value
    frutas.splice(posicionFruta, cantidadFrutas)
    console.log("frutas", frutas);
}


const transformarFrutas = () => {
    const resultadoFrutas = document.getElementById('resultadoFrutas')
    const listaFrutasEnMayuscula = frutas.map(item => item.toUpperCase())
    console.log(listaFrutasEnMayuscula);
    resultadoFrutas.innerText = "Frutas en mayuscula: " + listaFrutasEnMayuscula.join(', ')
}


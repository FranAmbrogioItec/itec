let listaNumeros = [2, -5, 16, 4, -3, 7, 12, -8, 1]

const obtenerMayorMenor = (lista) => {
    const mayor = lista[0]
    const menor = lista[0]

    for (num of lista) {
        menor = num < menor ? num : menor
        mayor = num > mayor ? num : mayor
    }
    return { mayor, menor }
}

let numeros = obtenerMayorMenor(listaNumeros)
console.log(numeros)

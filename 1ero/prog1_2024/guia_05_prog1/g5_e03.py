#En los primeros 5 ejercicios trabajamos con el texto: “Quiero comer manzanas, solamente manzanas.”, considerar que una palabra es toda secuencia de caracteres diferentes de los separadores (los caracteres separadores son el espacio, la coma y el punto).
#3) Contar la cantidad de letras (mayúsculas, minúsculas, acentuadas, eñes). El resultado es el total general.

def contar_letras(cadena):
    contador = 0
    for caracter in cadena:
        if caracter.isalpha():
            contador +=1
    return contador

cadena = "Quiero comer manzanas, solamente manzanas."
resultado = contar_letras(cadena)
print (f"La cantidad total de caracteres son: {resultado}")
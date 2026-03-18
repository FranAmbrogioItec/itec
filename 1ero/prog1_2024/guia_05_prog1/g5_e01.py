#En los primeros 5 ejercicios trabajamos con el texto: “Quiero comer manzanas, solamente manzanas.”, considerar que una palabra es toda secuencia de caracteres diferentes de los separadores (los caracteres separadores son el espacio, la coma y el punto).
#1)  Cuántas veces se repite una letra cualquiera. Parámetros: letra, cadena.

def contar_letra(letra, cadena):
    contador = 0
    for caracter in cadena:
        if caracter == letra:
            contador += 1
    return contador
    
cadena = "Quiero comer manzanas, solamente manzanas."
letra = input("Que letra quiere ver si se repite?: ")
resultado = contar_letra(letra, cadena.lower()) #llamo a la funcion

print(f"La letra '{letra}' se repite {resultado} veces en el texto.")

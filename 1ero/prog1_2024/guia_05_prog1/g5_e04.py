#En los primeros 5 ejercicios trabajamos con el texto: “Quiero comer manzanas, solamente manzanas.”, considerar que una palabra es toda secuencia de caracteres diferentes de los separadores (los caracteres separadores son el espacio, la coma y el punto).
#4) Contar la cantidad de palabras.

def contar_palabras(cadena):
    cadena = cadena.split()
    palabras = len(cadena)
    return palabras

cadena = "Quiero comer manzanas, solamente manzanas."
resultado = contar_palabras(cadena)
print (f"La cantidad de palabras en el texto son: {resultado}")
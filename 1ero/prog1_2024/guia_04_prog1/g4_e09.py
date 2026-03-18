#En los siguientes ejercicios (6 a 11) trabajamos con el texto: “Quiero comer manzanas, solamente manzanas.”, considerar que una palabra es toda secuencia de caracteres diferentes de los separadores (los caracteres separadores son el espacio, la coma y el punto).
#9: Contar la cantidad de palabras.

texto = "Quiero comer manzanas, solamente manzanas."
texto = texto.split()
print(texto)

palabras = len(texto)
print (f"La cantidad de palabras que tiene el texto son: {palabras}")
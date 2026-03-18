#En los primeros 5 ejercicios trabajamos con el texto: “Quiero comer manzanas, solamente manzanas.”, considerar que una palabra es toda secuencia de caracteres diferentes de los separadores (los caracteres separadores son el espacio, la coma y el punto).
#2) Buscar una palabra y reemplazarla por otra todas las veces que aparezca. Ej.: ‘peras’ en lugar de ‘manzanas’ quedaría 'Quiero comer peras, solamente peras.'

def reemplazar_palabra(cadena, palabra_a_buscar, palabra_a_reemplazar):
    return cadena.replace(palabra_a_buscar, palabra_a_reemplazar)

cadena = "Quiero comer manzanas, solamente manzanas."
palabra_a_buscar = "manzanas"
palabra_a_reemplazar = input("Ingrese la palabra que quiere agregar al texto: ")
resultado = reemplazar_palabra(cadena, palabra_a_buscar, palabra_a_reemplazar)
print(resultado)
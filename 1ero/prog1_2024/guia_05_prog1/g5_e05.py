#En los primeros 5 ejercicios trabajamos con el texto: “Quiero comer manzanas, solamente manzanas.”, considerar que una palabra es toda secuencia de caracteres diferentes de los separadores (los caracteres separadores son el espacio, la coma y el punto).
#5) Averiguar qué cantidad de letras tiene la palabra más larga.  Para ello, primero cargar cada palabra en una lista y luego obtener la solicitada. Usar dos funciones.

def separar_palabras(texto):
    palabras = texto.split()
    return palabras

def encontrar_palabra_mas_larga(palabras):

    longitud_maxima = 0
    palabra_mas_larga = ""
    for palabra in palabras:
        longitud_palabra = len(palabra)
        if longitud_palabra > longitud_maxima:
            longitud_maxima = longitud_palabra
        palabra_mas_larga = palabra
    return palabra_mas_larga

# Texto de ejemplo
texto = "Quiero comer manzanas, solamente manzanas."

# Separar las palabras
lista_palabras = separar_palabras(texto)

# Encontrar la palabra más larga
palabra_mas_larga = encontrar_palabra_mas_larga(lista_palabras)

# Imprimir el resultado
print("La palabra más larga es:", palabra_mas_larga)
print("Y su longitud es:", len(palabra_mas_larga))
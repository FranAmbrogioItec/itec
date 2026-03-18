""" Dada una serie de números, construir otra serie con los promedios parciales, es decir que debo obtener en la primera posición de la salida el promedio del primer valor de la serie de entrada, en la segunda posición, el promedio de los dos primeros números de la entrada, en la tercera posición, el promedio de los tres primeros números de la entrada y así sucesivamente.
Ejemplo:
Entrada = 1, 2, 3
Salida = 1, 1.5, 2
"""

def promedios_parciales(serie):
    promedios = []
    suma = 0
    for i, num in enumerate(serie):
        suma += num
        promedio = suma / (i + 1)
        promedios.append(promedio)
    return promedios

entrada = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
salida = promedios_parciales(entrada)
print(salida)

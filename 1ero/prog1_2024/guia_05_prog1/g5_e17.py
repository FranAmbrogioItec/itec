#17 Escribe una función que encuentre el número que más se repite en una lista.

def numero_mas_repetido(lista):

    conteo = {}
    for numero in lista:
        if numero in conteo:
            conteo[numero] += 1
        else:
            conteo[numero] = 1

    numero_mas_repetido = max(conteo, key=conteo.get)
    return numero_mas_repetido

lista_numeros = [2, 3, 2, 4, 5, 2, 3, 3]
resultado = numero_mas_repetido(lista_numeros)
print("El numero que mas se repite es:", resultado)
#9) Dada una lista cargada con números enteros, obtener el promedio de ellos. Mostrar por pantalla dicho promedio y los números ingresados que sean mayores que él. Dos funciones: promedio y mayorQue.

def promedio(lista):
    contador = 0
    for i in range(len(lista)):
        contador += lista[i]
        promedio = contador / len(lista)
    return promedio

lista = [123, 151, 245, 451, 214]
resultado = promedio(lista)
print(f"El promedio es {resultado}")
""" En matemáticas, un número primo es un número natural mayor que 1 que tiene únicamente dos divisores positivos distintos: él mismo y el 1.​ Dado un entero positivo, verificar si es primo o no. """

def es_primo_simple(numero):
    if numero <= 1:
        return False
    for i in range(2, numero):
        if numero % i == 0:
            return False
    return True

numero = int(input("Ingrese el numero que desea saber si es primo o no: "))
resultado = es_primo_simple(numero)
if resultado:
    print(f"{numero} es un numero primo.")
else:
    print(f"{numero} no es un numero primo.")

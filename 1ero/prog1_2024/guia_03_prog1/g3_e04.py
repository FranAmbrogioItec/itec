#4 Dada una lista con números, crear otra con los cuadrados de esos valores. 

lista_numeros = []
lista_numeros_cuadrados = []
ingreso = "si"

while ingreso == "si":
    numeros = int(input("Ingrese un numero: "))
    ingreso = input ("Desea ingresar otro numero?: ")
    lista_numeros.append(numeros)
    lista_numeros_cuadrados.append(numeros**2)
print ("La lista de numeros es: ", lista_numeros, "y los resultados al cuadrado respectivamente son: ", lista_numeros_cuadrados)
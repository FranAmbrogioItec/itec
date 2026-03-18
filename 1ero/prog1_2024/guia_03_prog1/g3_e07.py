#7 Eliminar todos los valores iguales de una lista. Previamente, solicitar el valor y si no está, mostrar un cartel diciendo que no lo ha encontrado.

def eliminar_valores_iguales(lista, valor):
    nueva_lista = [elemento for elemento in lista if elemento != valor]
    if len(nueva_lista) == len(lista):
        print("No se encontró el valor.")
        return nueva_lista

# Ejemplo de uso:
lista = [11,11,1,2,2,3,3,3,4,5,6,6,6,6,7,8,9,10,11,11,11]
solicitar = int(input("Ingrese el valor que quiere buscar: "))

resultado = eliminar_valores_iguales(lista, solicitar)
print(resultado)
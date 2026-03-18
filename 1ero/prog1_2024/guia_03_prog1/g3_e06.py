#6 Ingresar nombres en una lista sin repetir, luego buscar un nombre y de encontrarlo decir en qué posición está.

def ingresar_nombres():
    nombres = []
    while True:
        nombre = input("Ingrese un nombre (o 'salir' para finalizar): ").capitalize()
        if nombre.lower() == 'salir':
            break
        if nombre not in nombres:
            nombres.append(nombre)
        else:
            print("Ese nombre ya ha sido ingresado.")
    return nombres

def buscar_nombre(lista_nombres, nombre_a_buscar):
    if nombre_a_buscar in lista_nombres:
        return lista_nombres.index(nombre_a_buscar)
    else:
        return -1

lista_nombres = ingresar_nombres()

while True:
    nombre_a_buscar = input("Ingrese el nombre a buscar (o 'salir' para finalizar): ").capitalize()
    if nombre_a_buscar.lower() == 'salir':
        break
    indice = buscar_nombre(lista_nombres, nombre_a_buscar)
    if indice != -1:
        print(f"El nombre {nombre_a_buscar} se encuentra en la posición {indice+1}.")
    else:
        print("El nombre no se encuentra en la lista.")
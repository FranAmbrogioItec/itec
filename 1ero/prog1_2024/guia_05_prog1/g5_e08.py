#8) Ingresar nombres, luego buscar un nombre y de encontrarlo decir en qué posición está. 

def buscar_nombres(lista):
    nombre = input("Ingrese el nombre que quiere buscar: ")
    posi = lista.index(nombre)
    return posi+1
    


lista = ["Juan", "Jose", "Pedro", "Agustin", "Susana", "Miriam", "Demichelis"]
resultado = buscar_nombres(lista)
print (f"El nombre buscado se encuentra en la posicion {resultado}")
#3 Primer bucle: Almacenar en dos listas paralelas, nombres y sexos de personas hasta que el usuario diga que no hay más. Segundo bucle: Recorrerlas y guardar los nombres de las mujeres en una nueva lista. 
#Tercer bucle: Mostrar los elementos de la lista resultante.

lista_nombres = []
lista_sexos = []
lista_mujeres = []

ingreso = input("Desea ingresar datos a una lista (Si/No)?: ")

while ingreso.lower() == 'si':
    nombre = input("Ingrese el nombre: ")
    sexo = input("Ingrese el sexo (F/M): ")
    ingreso = input("Desea ingresar otro nombre? (si/no): ")
    lista_nombres.append(nombre)
    lista_sexos.append(sexo)

for i in range (len(lista_nombres)):
    if lista_sexos[i] == "f":
        lista_mujeres.append(lista_nombres[i])

print ("Lista de nombres: ", lista_nombres, "y lista de mujeres: ", lista_mujeres)

#12 Pedir nombres y sexo de personas y mostrar al final el total de mujeres y el nombre de cada una.

lista_nombres_f = []
lista_nombres_m = []
sigue = "si"

while sigue == "si":
    nombre = input("Ingrese el nombre:")
    sexo = input("Ingrese el sexo(f/m): ")
    sigue = input("Desea seguir ingresando nombres?(si/no): ")
    if sexo == "f":
        lista_nombres_f.append(nombre)
    elif sexo == "m":
        lista_nombres_m.append(nombre)
        
total_mujeres = len(lista_nombres_f)

print("El total de mujeres ingresadas fueron: ", total_mujeres, "y los nombres son: ", lista_nombres_f)
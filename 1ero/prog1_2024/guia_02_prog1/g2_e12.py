#12 Pedir nombres y sexo de personas y mostrar el total de mujeres y el nombre de cada una.

contador_mujeres = 0
contador_nombres = " "
pregunta = input("Quiere agregar nombres de personas? (si/no): ")

while pregunta.lower() == 'si':
    nombre = input("Ingrese el nombre de la persona: ")
    nombre = nombre.capitalize()
    sexo = input("Ingrese el sexo de la persona (M/F): ")
    if sexo.lower() == 'f':
        contador_mujeres += 1
        contador_nombres = contador_nombres + " " + nombre
    pregunta = input("Quedan personas por agregar?: ")
print ("La cantidad de mujeres son:", contador_mujeres, "y sus nombres son:", contador_nombres)


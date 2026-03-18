#11 Cargar en listas los nombres y fechas de nacimiento de varias personas, luego recorrerlo y mostrar los nombres de los mayores de edad.

from datetime import datetime

lista_personas = []

while True:
    nombre = input("Ingrese el nombre (o 'salir' para finalizar): ")
    if nombre.lower() == 'salir':
        break
    
    dia = int(input("Ingrese el día (número): "))
    mes = int(input("Ingrese el mes (número): "))
    año = int(input("Ingrese el año (número): "))

    try:
        fecha_nacimiento = datetime(año, mes, dia)
        edad = datetime.now().year - fecha_nacimiento.year - ((datetime.now().month, datetime.now().day) < (fecha_nacimiento.month, fecha_nacimiento.day))
        lista_personas.append((nombre, edad))
    except ValueError:
        print("Fecha inválida. Por favor, ingrese una fecha válida.")

# Separar en listas de mayores y menores
lista_mayores = [nombre for nombre, edad in lista_personas if edad >= 18]
lista_menores = [nombre for nombre, edad in lista_personas if edad < 18]

print(f"Los nombres de las personas mayores de edad son: {lista_mayores}")
print(f"Los nombres de las personas menores de edad son: {lista_menores}")
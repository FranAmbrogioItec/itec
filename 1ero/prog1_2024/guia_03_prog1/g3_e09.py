#9 Cargar en dos listas paralelas nombres y sueldos. Luego mostrar los nombres de las personas que ganan más de $1_850_000.      

lista_nombre_sueldo_pobre = []
lista_nombre_sueldo_guitudo = []
ingreso = input("Desea ingresar algun sueldo?(si/no): ")

while ingreso == "si":
    nombre = input("Ingrese el nombre: ")
    sueldo = int(input("Ingrese el sueldo de la persona: "))
    ingreso = input("Desea seguir ingresando sueldos (si/no)?: ")
    if sueldo > 1850000:
        lista_nombre_sueldo_guitudo.append(nombre)
    elif sueldo < 1850000:
        lista_nombre_sueldo_pobre.append(nombre)

print (f"Las personas que ganan mas de $1850000 son: {lista_nombre_sueldo_guitudo} y los que cobran menos de este monton son: {lista_nombre_sueldo_pobre}")


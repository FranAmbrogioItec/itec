#10 Dada una lista de nombres y de salarios respectivos, 
#determinar el salario mínimo y mostrar el nombre de la persona que menos gana.

nombre_salario_minimo = " "
salario_minimo = 100000000000000000000000000000000000000000000000000
pregunta = input("Hay algun empleado para cargar (si/no)?: ")

while pregunta.lower() == "si":
    nombre = input("Ingrese el nombre: ")
    salario = int(input("Ingrese el salario: "))
    if salario < salario_minimo:
        salario_minimo = salario
        nombre_salario_minimo = nombre
    pregunta = input("Hay algun empleado para cargar (si/no): ")
print("El empleado con menor salario es:", nombre_salario_minimo, "y cobra", salario_minimo)


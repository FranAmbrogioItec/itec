#6 Preguntar cuántas personas se van a cargar y luego solicitar sus edades, mostrando al final la edad promedio.

acumulador = 0

personas = int(input("Cuantas personas se van a cargar?: "))

for i in range(personas):
    edad = int(input("Ingrese la edad: "))
    acumulador += edad
    promedio = acumulador / personas
print ("El promedio de las edades es:", promedio) 
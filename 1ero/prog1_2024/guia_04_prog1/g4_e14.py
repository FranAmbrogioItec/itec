#Pedir dos nombres y edades respectivas y luego construir una sola cadena con un texto que muestre el nombre del mayor y cuanto le lleva al menor. (Ejemplo:  entrada -> 'Juan' 30 'Pedro' 23 / salida -> 'Juan le lleva 7 años a Pedro')

# salida -> 'Juan le lleva 7 años a Pedro'

nombre1 = input("Ingrese el nombre 1: ")
edad1 = int(input("Ingrese la edad del nombre 1: "))
nombre2 = input("Ingrese el nombre 2: ")
edad2 = int(input("Ingrese la edad del nombre 2: "))

if edad1 > edad2:
    salida = f'{nombre1} le lleva {edad1-edad2} años a {nombre2}'
else:
    salida = nombre2 + " le lleva " + str(edad2-edad1) + " años a " + nombre1

print(salida)
#ejercicio 11:

pasaje = 2000
nombre = input('Nombre: ')
edad = int(input('Edad: '))
if (5 <= edad <= 10) or edad >= 65:
    pasaje = pasaje * 0.6
    
    
print(nombre, 'paga', pasaje, 'pesos')
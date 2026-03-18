#Preguntar si hay datos para ingresar, en caso afirmativo solicitar un número entero y decir si es negativo o no. 
# Preguntar si repite.

respuesta = input("hay datos para ingresar (si/no)?: ")
lista = []

while respuesta == 'si': 
    numero_entero = int(input("bueno, ingrese un numero entero: "))
    if numero_entero > 0:
        print ("el numero q ingresaste es positivo pibe")
    elif numero_entero < 0:
        print ("y, me estas poniendo un negativo")
    elif numero_entero == 0:
        print("estas poniendo un cero amigo")
    respuesta = input("tiene mas datos para ingresar (si/no)?: ")
        
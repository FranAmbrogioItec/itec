    #Ingresar 7 números enteros y en el caso de que sean naturales de una sola cifra mostrar un cartel en cada uno.
    
def verificar_numero(numero):
    return numero > 0 and numero < 10

numeros = []
for i in range(7):
    numero = int(input("Ingrese el numero {}: ".format(i+1)))
    numeros.append(numero)

for numero in numeros:
    if verificar_numero(numero):
        print("El numero", numero, "es un numero natural de una sola cifra.")
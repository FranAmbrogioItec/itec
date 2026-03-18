#3 Pedir el ingreso de 5 números. Contar los mayores de 23. Mostrar el resultado.

contador_mayores = 0
contador_menores = 0
lista_num_mayores = []
lista_num_menores = []

# Pedimos al usuario que ingrese 5 números
for i in range(5):
    numero = int(input("Ingrese el número: "))
    if numero > 23:
        contador_mayores += 1
        lista_num_mayores.append(numero)
    elif numero <=23:
        contador_menores+=1
        lista_num_menores.append(numero)
        
print(f"Hay {contador_mayores} números mayores de 23 y son {lista_num_mayores} y los menores a 23 son {lista_num_menores}")

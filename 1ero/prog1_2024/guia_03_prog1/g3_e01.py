#1 Pedir el ingreso de 10 números. Contar los mayores de 23 y almacenar los que cumplen la condición.  
# Mostrar la cantidad y los números guardados.

mayores_23 = []
menores_23 = []


for i in range (10):
    num = int(input(f"Ingrese el numero {i + 1}: "))
    if num > 23:
        mayores_23.append(num)
    elif num < 23:
        menores_23.append(num)
print (f"Los numeros mayores a 23 son: {mayores_23}, los menores son {menores_23} y la cantidad de mayores a 23 son: {len(mayores_23)}")
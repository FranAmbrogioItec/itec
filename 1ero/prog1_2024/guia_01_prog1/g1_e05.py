#ejercicio numero 5

numero1 = float(input("Ingrese el primer numero real: "))
numero2 = float(input("Ingrese el segundo numero real: "))

if numero1 > numero2: 
    mayor = numero1
    menor = numero2
else:
    mayor = numero2
    menor = numero1
    
print("Los numeros en orden creciente son:", menor, ",", mayor)
    
#Mostrar por pantalla una lista de 10 números enteros consecutivos, comenzando con un número ingresado por teclado.

valor_inicial = int (input("Ingrese un valor numerico: "))
valor_final = valor_inicial + 10
for num in range (valor_inicial, valor_final):
    print(num)
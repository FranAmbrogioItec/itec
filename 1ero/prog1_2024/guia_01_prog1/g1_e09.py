#ejercicio 9:

num = int(input("Ingrese el dato numerico a evaluar aqui: "))

if 9 < num < 100:
    print ("El numero ingresado es de positivo (+) y de dos digitos.")
elif num >= 100:
    print("El numero ingresado es positivo, pero tiene mas de 2 digitos.")
else:
    print ("El numero ingresado es negativo")
#ejercicio numero 6

numero1 = float(input("Ingrese el primer numero: "))
numero2 = float(input("Ingrese el segundo numero: "))

opcion = input("Ingrese la operacion que quiere realizar (+ para sumar ; - para restar): ")

if opcion == '+' : 
    resultado = numero1 + numero2
    signo = 'suma'      
elif opcion == '-':
    resultado = numero1 - numero2
    signo = 'resta'

print("El resultado de la", signo, "es:", resultado)
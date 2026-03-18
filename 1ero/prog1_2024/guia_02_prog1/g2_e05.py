#5 Pedir los montos de sueldos de los empleados de una empresa hasta que no haya más y mostrar el total.

dato = input("Desea ingresar los sueldos de los empleados (Si/No)?: ")
valor_total = 0

while dato.lower() == 'si':
    sueldo = int(input("Sueldo a ingresar: "))
    valor_total = valor_total + sueldo
    dato = input("Queres poner mas sueldos o no?(si/no): ")
    if dato == 'no':
        print("El valor total de los sueldos es: ", valor_total)
print ('listo wachin')
    
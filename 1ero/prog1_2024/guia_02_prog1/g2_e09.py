#Dada una serie de números reales positivos, determinar el valor máximo y mostrarlo al final. 
#Se deberá ir preguntando si hay más números para ingresar.

acumulador = 0
pregunta = input("Tiene datos para ingresar?(si/no): ")
lista_num = []

while pregunta == "si":
    num = int(input("ingrese un numero real positivo: "))
    pregunta = input("desea ingresar otro numero? (si/no): ")
    acumulador = num + acumulador
    lista_num.append(num)
    numero_mas_grande = max(lista_num)
print(f"Los numeros reales positivos son: {lista_num} y el numero mas grande es {numero_mas_grande}")
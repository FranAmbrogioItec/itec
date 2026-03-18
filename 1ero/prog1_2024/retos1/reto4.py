# Tablero de ajedrez: Solicitar al usuario número de fila y de columna y devolver el color de la casilla (blanca o negra).
# Si el usuario ingresa un número que no corresponde a una casilla mostrar "afuera".

def es_par(numero):
    return numero % 2 == 0

fila = int(input("Ingrese el número de la fila: "))
columna = int(input("Ingrese el número de la columna: "))
lista_valores = [0, 1, 2, 3, 4, 5, 6, 7]

if fila not in lista_valores or columna not in lista_valores:
    print("Esta afuera, ingresa bien los valores.")
else:
    if es_par(fila + columna):
        print("Es blanca")
    else:
        print("Es negra")

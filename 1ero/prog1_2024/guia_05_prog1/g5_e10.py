#10) Ingresar la lluvia caída en milímetros para cada día de la semana. Mostrar al final el total de lluvia caída y el nombre del día que más llovió.

def calcular_lluvia():
    lluvia_total = 0
    dias_sin_lluvia = 0

    for dia in range(1, 8):
        mm_lluvia = float(input(f"Ingrese la cantidad de lluvia en mm para el día {dia}: "))
        lluvia_total += mm_lluvia
        if mm_lluvia == 0:
            dias_sin_lluvia += 1

    return lluvia_total, dias_sin_lluvia

total_lluvia, dias_sin_lluvia = calcular_lluvia()

print(f"La lluvia total de la semana fue de {total_lluvia} mm.")
print(f"Hubo {dias_sin_lluvia} dias sin lluvia.")
salario = 47000
dias_no_trabajados = int(input('Días no trabajados: '))
año_ingreso = int(input('Año de ingreso a la empresa: '))

if dias_no_trabajados == 0 and (2024 - año_ingreso) > 5:
    salario = salario * 1.3
    print("El salario a cobrar sera: ", salario)
else:
    print("El salario a cobrar sera: ", salario)

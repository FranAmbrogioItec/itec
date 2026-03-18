#12: Mostrar el valor doble del número de dos cifras (que es el único número) encontrado en la cadena. Ej.: 'Juan tiene 25 años' mostraría el número 50.

frase = 'Juan tiene 25 años'
numero = ""

i = 0
while frase[i] not in "123456789":
    i += 1
print(f'El doble del número contenido en la frase "{frase}" es:', end = ' ')
print(int(frase[i] + frase[i+1])*2)

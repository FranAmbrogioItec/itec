#1 Transformar la cadena "Curso de Python" en la cadena "Curso de Programación en Python". Cortar la cadena original, agregarle el literal "Programación en" y concatenar.

cadena_original = "Curso de Python"
cadena_2 = "Curso de Programación en Python"

cadena_nueva = cadena_original[:9] + cadena_2[9:25] + cadena_original[9:15]

print(cadena_nueva)
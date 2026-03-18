#18 Hacer una función que determine si una cadena de texto contiene todas las vocales.

def contiene_todas_las_vocales(cadena):
    cadena = cadena.lower()
    vocales = set('aeiou')
    vocales_en_cadena = set(cadena)
    return vocales.issubset(vocales_en_cadena)

cadena1 = "euforia"
cadena2 = "computadora"

print(contiene_todas_las_vocales(cadena1))  
print(contiene_todas_las_vocales(cadena2))  
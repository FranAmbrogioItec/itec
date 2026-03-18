#2) Escribe una función que cuente la cantidad de ocurrencias de una subcadena en una cadena de texto, permitiendo especificar si se debe realizar una búsqueda sin distinguir mayúsculas y minúsculas. Se pueden usar los métodos lower() y upper() del objeto string. Por ejemplo, si tengo la cadena:
#   s = 'River Plate', al aplicar s.lower() obtengo 'river plate' y si aplico s.upper(), obtengo 'RIVER PLATE'.
""" Ejemplo de uso de la función:
frase = 'Desde niña me encanta mirar la luna, por eso es que le puse de nombre Luna a mi hija'
print(contarSubCadena(frase, 'luna')) # 2
print(contarSubCadena(frase, 'luna', ignorarMayusculas=False)) # 1
"""

def contar_subcadena(cadena, subcadena, ignorar_mayusculas=True):
    if ignorar_mayusculas == True:
        cadena = cadena.lower()
        subcadena = subcadena.lower()
    return cadena.count(subcadena)

# Ejemplo de uso de la función:
frase = 'Desde niña me encanta mirar la luna, por eso es que le puse de nombre Luna a mi hija'
print(contar_subcadena(frase, 'luna'))  # 2
print(contar_subcadena(frase, 'luna', ignorar_mayusculas=False))  # 1

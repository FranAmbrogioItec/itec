#13 Hacer una función que dibuje una raya con un caracter y una longitud dada.

def dibujar_raya(caracter, longitud):
    if isinstance(caracter, str) and isinstance(longitud, int) and len(caracter) == 1 and longitud >= 0:
        print(caracter * longitud)
    else:
        print("Flaco me estas poniendo cualquier cosa, fijate que el caracter sea 1 solo y no pongas longitud negativa.")

# Ejemplo de uso:
longitud = int(input("ingrese la longitud que quiere la linea: "))
dibujar_raya('_', longitud)

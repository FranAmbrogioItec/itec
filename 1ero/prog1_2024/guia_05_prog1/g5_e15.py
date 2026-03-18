#15 Escribe una función que determine si dos listas tienen algún elemento en común.

def tienen_elementos_en_comun(lista1, lista2):
    conjunto1 = set(lista1)
    conjunto2 = set(lista2)
    interseccion = conjunto1.intersection(conjunto2)
    return len(interseccion) > 0

lista1 = ["Cocker", "Caniche", "Labrador", "Herrera"]
lista2 = ["Dogo", "Chihuahua", "Labrador", "Funes Mori"]
resultado = tienen_elementos_en_comun(lista1, lista2)
print(resultado)
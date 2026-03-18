#16 Implementa una función que determine si una cadena de texto contiene solo caracteres numéricos (es decir, si es un entero).

def es_entero(cadena):
    return cadena.isdigit()

cadena = "124623"
cadena2 = "241f21a"
resultado = es_entero(cadena)
resultado2 = es_entero(cadena2)
print (f"La cadena ingresada posee todos numeros enteros? Resultado: {resultado}")
print (f"La cadena 2 ingresada posee todos numeros enteros? Resultado: {resultado2}")

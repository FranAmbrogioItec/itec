#6) Definir una lista con 10 letras. Contar las vocales y mostrar el total.

def contar_vocales(lista):
    vocales = "aeiouAEIOU"
    contador = 0  
    for letra in lista:
        if letra in vocales:
            contador += 1
    return contador  

lista = ["a", "b", "c", "d", "f","i", "j", "o", "A", "E"]
resultado = contar_vocales(lista)
print(f"La cantidad de vocales que hay son: {resultado}")
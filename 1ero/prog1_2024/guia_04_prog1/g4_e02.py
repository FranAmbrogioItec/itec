#2 Decir cuántas veces se repite una letra cualquiera, en un texto dado. Por recorrido.

texto = "si no ganamos la libertadores este año me reviento"
letra = "l"
posi = 0

for caracter in range (len(texto)):
    if texto[caracter] == letra:
        posi += 1
print (f"La letra {letra} se repite {posi} veces dentro del texto.")

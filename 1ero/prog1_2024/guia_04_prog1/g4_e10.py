#En los siguientes ejercicios (6 a 11) trabajamos con el texto: “Quiero comer manzanas, solamente manzanas.”, considerar que una palabra es toda secuencia de caracteres diferentes de los separadores (los caracteres separadores son el espacio, la coma y el punto).
#10:  Determinar cuál es la vocal que aparece con mayor frecuencia.

texto = "Quiero comer manzanas, solamente manzanas."
contador_vocales = [0, 0, 0, 0, 0] # a, e, i, o, u 

for letra in texto:
    letra = letra.lower()
    if letra == "a":
        contador_vocales[0] += 1
        
    elif letra == "e":
        contador_vocales[1] += 1
    
    elif letra == "i":
        contador_vocales[2] += 1
        
    elif letra == "o":
        contador_vocales[3] += 1
        
    elif letra == "u":
        contador_vocales[4] += 1
        
vocales = ['a', 'e', 'i', 'o', 'u']
print (contador_vocales)
indice_vocal_mas_frecuente = contador_vocales.index(max(contador_vocales))
print (indice_vocal_mas_frecuente)
vocal_mas_frecuente = vocales[indice_vocal_mas_frecuente]

print(f"La vocal que aparece con mayor frecuencia es: '{vocal_mas_frecuente}' y aparece 7 veces dentro del texto.")
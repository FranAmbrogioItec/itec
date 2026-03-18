#En los siguientes ejercicios (6 a 11) trabajamos con el texto: “Quiero comer manzanas, solamente manzanas.”, considerar que una palabra es toda secuencia de caracteres diferentes de los separadores (los caracteres separadores son el espacio, la coma y el punto).
#8: Contar la cantidad de letras (no incluir los separadores).

texto = "Quiero comer manzanas, solamente manzanas."
separadores = [' ', ',', '.']
contador_letras = 0
contador_separadores = 0

for letra in texto:
    if letra.isalpha() and letra not in separadores:
        contador_letras +=1
    elif letra in separadores:
        contador_separadores +=1
print (f"La cantidad de letras en el texto son: {contador_letras}, y los separadores son: {contador_separadores}")
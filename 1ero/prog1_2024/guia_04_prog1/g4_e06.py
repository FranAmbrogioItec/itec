#En los siguientes ejercicios (6 a 11) trabajamos con el texto: “Quiero comer manzanas, solamente manzanas.”, considerar que una palabra es toda secuencia de caracteres diferentes de los separadores (los caracteres separadores son el espacio, la coma y el punto).
#Buscar una palabra completa en un texto y contar cuántas veces está.

frase = "Quiero comer comer comer manzanas, solamente manzanas."
palabra = input("Ingrese la palabra que quiere buscar: ")
contador = 0
posicion = 0

while posicion != -1:
    posicion = frase.find(palabra, posicion)
    if posicion != -1:
        contador += 1
        posicion += 1
    
print ("La cantidad de veces que aparece la palabra son: ", contador)

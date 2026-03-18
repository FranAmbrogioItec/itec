#7 En los siguientes ejercicios (6 a 11) trabajamos con el texto: “Quiero comer manzanas, solamente manzanas.”, considerar que una palabra es toda secuencia de caracteres diferentes de los separadores (los caracteres separadores son el espacio, la coma y el punto). 
#Trabajando con el texto "Quiero comer manzanas, solamente manzanas." Buscar una palabra y reemplazarla por otra todas las veces que aparezca. Ej.: ‘peras’ en lugar de ‘manzanas’ quedaría 'Quiero comer peras, solamente peras.' Sin usar replace.

frase = "Quiero comer manzanas, solamente manzanas."
palabraVieja = input("Que palabra quiere reemplazar?: ")
palabraNueva = input("Ingrese la palabra que quiere agregar al texto: ")

while palabraVieja in frase:
    posicionPalabraVieja = frase.find(palabraVieja)
    inicio = frase[:posicionPalabraVieja]
    final = frase[posicionPalabraVieja+len(palabraVieja):]
    frase = inicio + palabraNueva + final
print(frase)

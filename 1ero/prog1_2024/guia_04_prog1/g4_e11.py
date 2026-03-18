#En los siguientes ejercicios (6 a 11) trabajamos con el texto: “Quiero comer manzanas, solamente manzanas.”, considerar que una palabra es toda secuencia de caracteres diferentes de los separadores (los caracteres separadores son el espacio, la coma y el punto). 
#11: Averiguar qué cantidad de letras tiene la palabra más larga y cual es.

frase = "Quiero comer manzanas, solamente manzanas."
fraseLimpia = ''
# limpio de NO letras, dejo espacios
for caracter in frase:
    if caracter not in ',.':
        fraseLimpia += caracter
palabras = fraseLimpia.split()

masLarga = ''
for palabra in palabras:
    if len(palabra) > len(masLarga):
        masLarga = palabra
print(f'la palabra más larga es "{masLarga}" y su longitud es {len(masLarga)}')
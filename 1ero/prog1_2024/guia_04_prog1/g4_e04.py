#4 Pasar una palabra a mayúsculas cambiando los caracteres uno por uno usando la tabla ASCII de referencia (googlear la tabla y las funciones de conversión en Python).

"""
mouse = 109, 111, 117, 115, 101

for palabra in range(mouse):
    mouse = palabra[palabra].upper()
print(mouse) """

palabra = input("Ingrese una palabra: ")
palabra= palabra.lower()
result = ''

for i in palabra:
    letra = ord(i) #devuelve el caracter al valor en codigo ascii 
    letra = letra - 32
    transf = chr(letra) #chr transforma un numero a un caracter del ascii
    result += transf
print (result)    

#Con chr() and ord() podemos convertir entre carácter y su valor numérico que lo representa y viceversa. El segundo sólo función con caracteres, es decir, un string con un solo elemento.
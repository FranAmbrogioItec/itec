#1)Concatenar un número indeterminado de strings con unos caracteres específicos (por defecto un espacio).

def concatenar(cadena, *strings):
    nueva_cadena = cadena
    for string in strings:
        nueva_cadena += " " + str (string)
    return nueva_cadena

cadena = "River Plate"
string = "va a ganar la proxima copa libertadores.", "de la mano del Diablito"
print(concatenar(cadena, string))

""" Ejemplo de uso de la función:
print(concatenar('hola', 'pibe'))
print(concatenar('hola', 'pibe', conector='@'))
print(concatenar('techo', 'mesa', 'árbol', conector='###'))
print(concatenar('techo', 'mesa', 'árbol', conector='|||||||')) """

#19 Hacer una función que reciba una cadena de texto, y la recuadre

def recu(texto):
    # Calcular la longitud de la cadena más larga
    max_length = max(len(line) for line in texto.split('\n'))
    
    # Crear el borde superior e inferior
    borde = '+' + '-' * (max_length + 2) + '+'
    
    # Imprimir el borde superior
    print(borde)
    
    # Imprimir cada línea de texto con los bordes laterales
    for line in texto.split('\n'):
        print(f'| {line.ljust(max_length)} |')
    
    # Imprimir el borde inferior
    print(borde)

# Ejemplo de uso
recu('gallardo')
recu('si no ganamos la libertadores este año me pondre muy triste')

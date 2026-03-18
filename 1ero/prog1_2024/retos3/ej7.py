""" Realizar una función para truncar un número real a la cantidad de decimales pedida. La función round() de Python es parecida, pero no hace lo que pedimos. 
Ejemplo:
print(round(3.156, 1)) -> 3.2
print(round(3.156, 2)) -> 3.16
En cambio, nuestra función debería hacer esto:
print(trunc(3.156, 1)) -> 3.1
print(trunc(3.156, 2)) -> 3.15 """

def truncar(numero, decimales):
    cadena_numero = str(numero)
    punto_decimal = cadena_numero.find('.')
    
    if punto_decimal == -1:
        return numero
    
    truncamiento = punto_decimal + decimales + 1
    return float(cadena_numero[:truncamiento])

print(truncar(8.18999, 3))  
print(truncar(7.72424, 4))  

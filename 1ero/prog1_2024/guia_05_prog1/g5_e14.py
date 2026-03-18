#14 Crea una función que calcule la suma de los dígitos de un número entero.

def suma_digitos(numero):
    suma = 0
    while numero:
        suma += numero % 10  # Añadir el dígito menos significativo a la suma
        numero //= 10        # Eliminar el dígito menos significativo
    return suma

# Ejemplo de uso
numero = int(input("ingresa un numero entero grande, yo te lo sumo: "))
print(f"La suma de los dígitos de {numero} es {suma_digitos(numero)}")
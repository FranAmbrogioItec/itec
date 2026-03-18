""" Conversor de números romanos al sistema métrico decimal. 
Los números romanos combinan los siguientes valores:
I = 1
V = 5
X = 10
L = 50
C = 100
D = 500
M = 1000
Dado un número romano, obtener su equivalente. 
Ejemplo: Entrada=MCMLXV. Salida=1965 """

def romano_a_decimal(romano):
    valores = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    }
    
    total = 0
    ultimo_valor = 0
    
    for simbolo in romano[::-1]: #de derecha a izquierda
        valor = valores[simbolo]
        if valor < ultimo_valor:
            total -= valor
        else:
            total += valor
        ultimo_valor = valor
    
    return total

entrada = input("Ingrese el numero en romano: ").upper()
salida = romano_a_decimal(entrada)
print(f"Entrada={entrada}. Salida={salida}")

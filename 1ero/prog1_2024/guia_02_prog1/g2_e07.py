#7 Mostrar los primeros 12 múltiplos de 5.

multiplos_de_5 = []
valor = 5

for valor in range(12):
    multiplos =  valor * 5
    multiplos_de_5.append(multiplos)
print(f"Los primeros 12 multiplos de 5 son: {multiplos_de_5}")
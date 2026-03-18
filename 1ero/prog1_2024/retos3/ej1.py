""" Una cafetería de cafés para llevar tiene un costo de 800 pesos por cada café que vende a 1300. Cada 4 cafés que compra un cliente el quinto va gratis. A lo largo del día realiza numerosas ventas y al final de la jornada quiere saber el costo que ha tenido.
Tener en cuenta que el costo real varía al obsequiar algunos cafés.
Simular varias ventas de un día y obtener el costo real por café al final. """

import random #libreria para tirar numeros al azar

costo_por_cafe = 800
precio_por_cafe = 1300
cafes_para_tener_uno_gratis = 4

#simulacion de ventas en un dia
def simular_ventas(num_clientes):
    ventas = []
    for _ in range(num_clientes): #uso "_" xq no es relevante para el procesamiento dentro del bucle
        cafes_comprados = random.randint(1, 10) #cada cliente puede comprar entre 1 y 10 cafes 
        ventas.append(cafes_comprados)
    return ventas

#funcion p calcular costo real 
def calcular_costo_real(ventas):
    total_cafes_vendidos = sum(ventas)
    
#calculo de total de cafes gratis
    cafes_gratis = 0
    for cg in ventas:
        cafes_gratis += cg // cafes_para_tener_uno_gratis
        
#calculo cantidad de cafes reales pagados (descarto los gratis)
    cafes_reales = total_cafes_vendidos - cafes_gratis

#calculo costo final por dia
    costo_real = cafes_reales * costo_por_cafe

#resultados 
    return costo_real, total_cafes_vendidos, cafes_gratis

#simulacion 1 dia de ventas con "X" cantidad de clientes    
num_clientes = 100  #100 clientes ejemplo
ventas = simular_ventas(num_clientes)
costo_real, total_cafes_vendidos, cafes_gratis = calcular_costo_real(ventas)

print(f"El total de cafes vendidos en el dia es: {total_cafes_vendidos}")
print(f"Los cafes gratis fueron: {cafes_gratis}")
print(f"El costo real al final del dia fue de: ${costo_real} pesos")
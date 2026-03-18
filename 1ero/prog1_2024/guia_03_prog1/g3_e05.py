#5 Guardar en una lista los números pares mayores que 0 y menores que 31. 

lista_num_pares = []
num = 2

for num in range (16):
    print ("---Ciclo " +str(num+1)+"---")
    num = num*2
    lista_num_pares.append(num)
    print ("Numero par mayor que 0 y menor que 31: ", lista_num_pares)
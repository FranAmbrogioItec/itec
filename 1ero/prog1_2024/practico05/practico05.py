#DNI, nombre y apellido, monto de deuda en pesos y localidad.
#Quiero obtener:
#La cantidad de clientes de La Carlota y de otra localidad solicitada al usuario.
#El total de deuda acumulada de los clientes que deben más de 90 mil pesos.
#Los apellidos de los clientes cuyos DNI sean mayores a 40 millones.

datos = [
'37572991#Shauna Romanov#137345#Villa María',
'43666785#Brenden Raynard#48176#Villa María',
'33950484#Ronna Massingham#187725#Villa María',
'31735292#Mirabella Fitzpayn#111838#Sampacho',
'44444776#Amabelle Dominetti#39495#Villa María',
'42872667#Grady Aronsohn#34119#La Carlota',
'36482697#Kalinda Lamplough#134823#Sampacho',
'39917430#Clemmy Grigorian#37985#Sampacho',
'47692622#Arley Farrell#105085#Río Cuarto',
'20765699#Elmore Godber#130063#La Carlota',
'43509224#Tessa Dumingo#94858#Villa María',
'22334742#Wheeler Tetford#53174#La Carlota',
'35595922#Eachelle Ronaghan#157894#Río Cuarto',
'30420756#Drucy Corriea#109433#La Carlota',
'35296538#Beatrisa Wanden#157237#Río Cuarto',
'38077386#Debi Shine#38621#Río Cuarto',
'36431955#Timothea Simonson#165769#Río Cuarto',
'34528663#Chrissy Sainsbury#104154#Sampacho',
'43839759#Leonid Mingauld#106125#Sampacho',
'19987470#Rasla Frankiewicz#139459#Villa María'
]

def contar_clientes(datos):
    def contar_en_ciudad(ciudad):
        contador = 0
        for dato in datos:
            if ciudad in dato:
                contador += 1
        return contador
    ciudad = "La Carlota"
    resultado = contar_en_ciudad(ciudad)
    print(f"La cantidad de clientes nacidos en La Carlota son: {resultado}") 
    
    while True:
        ciudad_usuario = input("Ingrese la ciudad sobre la que quiere saber la cantidad de nacidos: ") #Hago una validacion para que no ingrese lo mismo.
        if ciudad_usuario == "La Carlota":
            print ("Ya te dije papa, decime otra ciudad.")
        else: 
            break
    resultado2 = contar_en_ciudad(ciudad_usuario)
    print(f"La cantidad de personas nacidas en {ciudad_usuario} son {resultado2}")
contar_clientes(datos) #Llamo a la funcion.

def total_deuda_mayor_90k(datos):
    total_deuda = 0
    for dato in datos:
        partes = dato.split('#')
        deuda = int(partes[2])
        if deuda > 90000:
            total_deuda += deuda
    return total_deuda

total_deuda = total_deuda_mayor_90k(datos)
print(f"El total de deuda acumulada de los clientes que deben más de 90.000 pesos es ${total_deuda}")

def apellidos_por_rango_dni(datos):
    apellidos_mayores_40m = []    
    apellidos_menores_30m = []
    for dato in datos:
        partes = dato.split("#")
        dni = int(partes[0])
        posi_espacio = partes[1].find(" ")
        apellido = partes[1][posi_espacio:]
        if dni > 40000000:
            apellidos_mayores_40m.append(apellido)
        elif dni < 30000000:
            apellidos_menores_30m.append(apellido)
            
    return apellidos_mayores_40m, apellidos_menores_30m
    
apellidos_mayor_40m, apellidos_menor_30m = apellidos_por_rango_dni(datos)
print(f"Apellidos de los clientes con DNI mayor a 40 millones: {apellidos_mayor_40m} y los menores a 30 millones: {apellidos_menor_30m}")


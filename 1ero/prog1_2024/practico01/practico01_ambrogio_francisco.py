nombres = [
        "Torres, Ana",
        "Hudson, Kate",
        "Quesada, Benicio",
        "Campoamores, Susana", 
        "Santamaría, Carlos",
        "Skarsgard, Azul", 
        "Catalejos, Walter"
        ] 

sexos = ["f","f","m","f","m","f","m"]

fechas = [
"02/05/1943",
"07/04/1984",
"10/02/1971",
"21/12/1967",
"30/01/1982",
"30/08/1995",
"18/07/1959"
]

print('1) Iniciales y apellidos')
for i in range(len(nombres)):
        nombreCompleto = nombres[i]
        apellido, nombre = nombreCompleto.split(', ')
        inicialYapellido = nombre[0] + '. ' + apellido
        print(inicialYapellido)
        
print('2) El nombre de pila más largo es: ')
nombreMasLargo = ''
for i in range(len(nombres)):
        nombreCompleto = nombres[i]
        apellido, nombre = nombreCompleto.split(', ') # _, lo usa para descartar el primer valor (en ese caso el apellido, solo quiere el nombre)
        if len(nombre) > len(nombreMasLargo):
                nombreMasLargo = nombre
print(nombreMasLargo)

print('3) El promedio de edad de las mujeres')
diaHoy, mesHoy, aniHoy = 17, 5, 2024
contadorMujeres = 0
totalEdades = 0
for x in range(len(fechas)):
        if sexos[x] == 'f':
                contadorMujeres += 1
                fecha = fechas[x]
                diaNac = int(fecha[:2])
                mesNac = int(fecha[3:5])
                aniNac = int(fecha[6:])
                edad = aniHoy - aniNac
        if (mesNac > mesHoy) or (mesNac == mesHoy and diaNac > diaHoy):
                edad -= 1
        totalEdades += edad
print(int(totalEdades/contadorMujeres))

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

print('3) El promedio de edad de las mujeres')
diaHoy, mesHoy, aniHoy = 8, 5, 2024
contadorMujeres = 0
totalEdades = 0
for i in range(len(fechas)):
        if sexos[i] == 'f':
                contadorMujeres += 1
                fecha = fechas[i]
                diaNac = int(fecha[:2])
                mesNac = int(fecha[3:5])
                aniNac = int(fecha[6:])
                edad = aniHoy - aniNac
        if (mesNac > mesHoy) or (mesNac == mesHoy and diaNac > diaHoy):
                edad -= 1
        totalEdades += edad
print(totalEdades // contadorMujeres)
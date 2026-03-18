""" "Dar la mano". Dados varios nombres de personas, mostrar como salida textos mostrando sus saludos. Si por ejemplo tenemos a Juan, Ana y Pedro, la salida puede ser:
Juan le da la mano a Ana
Ana le da la mano a Pedro
Pedro le da la mano a Juan
No importa el orden, pero deben contemplarse todos los saludos sin repetición (en este ejemplo, no tiene sentido agregar Ana le da la mano a Juan) """

from itertools import combinations

nombres = ["Paulo Diaz", "Echeverri","Mastantuono", "Miguelito Borja"]

def generar_saludos(nombres):
    for nombre1, nombre2, nombre3, nombre4 in combinations(nombres, 4):
        print(f"{nombre1} le da la mano a {nombre2}")
        print(f"{nombre2} le da la mano a {nombre3}")
        print(f"{nombre3} le da la asistencia al colibri y GOOOOOOOOOOOOOOOL de {nombre4}")
        
generar_saludos(nombres)

    
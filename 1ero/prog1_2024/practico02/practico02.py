#Quiero obtener:
#Los apellidos de las personas nacidas antes de un año solicitado al usuario.
#La cantidad de personas nacidas en un país ingresado por el usuario.
#El nombre de pila de la persona más joven de Europe.

personas = [
    "Josefa Taponales,France(Europe),30-01-2000",
    "Virgie Brach,Argentina(America),04-02-1994",
    "Adeline Quispe,United States(America),18-06-2002",
    "Willy Branscombe,Norway(Europe),21-11-2007",
    "Diane Piffe,France(Europe),07-08-1993",
    "Britta Causbey,Germany(Europe),24-01-2000",
    "Elisabeth Cleeve,Norway(Europe),04-03-1991",
    "Sasha Ivanchenkov,Argentina(America),28-04-2002",
    "Zerk Milsom,Norway(Europe),03-12-1994",
    "Kathryn Backshell,United States(America),04-01-2000"
]

año_solicitado = int(input("Ingrese el año (se le mostraran las personas nacidas antes del año colocado): "))
print(f'Los apellidos de las personas nacidas antes del {año_solicitado} son:')
for persona in personas: # para cada persona en la lista personas
    anioNac = int(persona[-4:])
    if anioNac < año_solicitado:
        posiEspacio = persona.find(' ')
        posiComa = persona.find(',')
        apellido = persona[posiEspacio+1: posiComa]
        print(apellido)
        

print('2) La cantidad de personas nacidas en un país ingresado por el usuario.')
pais_solicitado = input("Ingrese el pais: ")
contador = 0
for persona in personas:
    if pais_solicitado in persona:
        contador += 1
print(f'La cantidad de personas de {pais_solicitado} es {contador}')

print('3) El nombre de pila de la persona más joven de Europe.')
# 30-10-2007 --> 20_071_030
fMr = 0
nombreMasJovenDeEuropa = ''
for p in personas:
    if 'Europe' in p:
        fNac = int(p[-4:] + p[-7:-5] + p[-10:-8]) 
        if fNac > fMr:
            fMr = fNac
            nombreMasJovenDeEuropa = p[:p.find(' ')]
print(f'La persona más joven de Europe es {nombreMasJovenDeEuropa}.')
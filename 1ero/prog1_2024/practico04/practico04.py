#Quiero obtener:
#1) La cantidad de personas de Argentina
#2) La cantidad de personas de un país ingresado por el usuario 
#3) Las edades de las personas cuyo apellido comience con una letra solicitada al usuario
#Para los puntos 1) y 2) se requiere usar la misma función

from datetime import datetime #importo la libreria para usarla en el punto 3

personas = [
    "Vikki Tewkesbury,France,30-01-2000",
    "Virgie Brach,France,04-02-1994",
    "Adeline LaPadula,France,18-06-2002",
    "Willy Branscombe,Argentina,21-11-1997",
    "Diane Piffe,France,07-08-1993",
    "Britta Causbey,France,24-04-1991",
    "Elisabeth Cleeve,France,04-03-1991",
    "Rafael Ivanchenkov,France,28-04-2002",
    "Zerk Milsom,Norway,03-12-1994",
    "Adorne Ovington,United States,17-08-1991",
    "Kathryn Backshell,United States,04-03-1992",
    "Blake Colbeck,United States,18-01-1999",
    "Arron Bresnahan,United States,03-07-2001",
    "Deloria Dominguez,France,31-07-1990",
    "Grenville Aldersea,Argentina,11-01-2001",
    "Jemimah Haughian,Argentina,30-11-1998",
    "Con Gethen,United States,06-06-1992",
    "Roxie Igoe,France,31-03-2002",
    "Hollyanne Mottley,United States,05-01-1996",
    "Ambrosio Cadore,Norway,09-12-2002"
]

def contar_nacidos_en_paises(personas):
    def nacidos_en_pais(personas, pais):
        contador = 0
        for persona in personas:
            if pais in persona:
                contador += 1
        return contador

    nacidos_arg = nacidos_en_pais(personas, "Argentina")
    print(f"Las personas nacidas en Argentina son: {nacidos_arg}")

    while True: #pido al usuario q ingrese otro pais q no sea argentina
        pais_usuario = input("Ingrese un país [Norway, France, United States]: ")
        if pais_usuario == "Argentina":
            print("Por favor, ingrese un país diferente a Argentina.")
        elif pais_usuario not in ("Norway", "France", "United States"):
            print("Asegurese de estar ingresando el pais correcto (distingue mayusculas y minusculas).")
        else:
            break
        
    contador_pais_usuario = nacidos_en_pais(personas, pais_usuario) #cuento las personas nacidas en el pais q puso el usuario
    print(f"Las personas nacidas en {pais_usuario} son {contador_pais_usuario}")

contar_nacidos_en_paises(personas) #ejecuto la funcion

today = datetime.today().date()

def calcular_edad(fecha_nacimiento):
    dia, mes, año = map(int, fecha_nacimiento.split("-"))
    fecha_nacimiento_dt = datetime(año, mes, dia).date()
    edad = today.year - fecha_nacimiento_dt.year - ((today.month, today.day) < (fecha_nacimiento_dt.month, fecha_nacimiento_dt.day))
    return edad

def edad_por_inicial(personas, inicial_apellido):
    inicial_apellido = inicial_apellido.upper()
    encontrado = False #con esta variable verifico si se encuentran coincidencias (pasaria a True)
    for persona in personas:
        posi_primera_coma = persona.find(",")
        posi_segunda_coma = persona.index(",", posi_primera_coma + 1)
        nombre_completo = persona[:posi_primera_coma]
        fecha_nacimiento = persona[posi_segunda_coma + 1:].strip()
        apellido = nombre_completo.split()[1]
        
        if apellido[0].upper() == inicial_apellido:
            edad = calcular_edad(fecha_nacimiento)
            print(f"{nombre_completo} tiene {edad} años.")
            encontrado = True
    
    if not encontrado:
        print ("No se han encontrado coincidencias con la inicial que ingreso.")
        inicial_apellido

inicial_apellido = input("Ingrese la inicial del apellido del cual quiere saber la edad: ")
edad_por_inicial(personas, inicial_apellido)
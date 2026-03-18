#7) input con opciones (Ejemplo: ‘Quiere ingresar datos (si/no)”?)

def input_choice():
    pregunta = input("Desea ingresar el color Rojo o Verde (rojo/verde)?: ")
    pregunta = pregunta.lower()
    while pregunta not in ["rojo", "verde"]:
        print("Asegúrese de haber ingresado el dato solicitado.")
        pregunta = input("Desea ingresar el color Rojo o Verde (rojo/verde)?: ")
        pregunta = pregunta.lower()
    return pregunta

color = input_choice()
print(f"Usted ha ingresado el color {color}.")





""" q = inputChoice('si/no/a veces')
print(q)
r = inputChoice('rojo/verde', 'Elija un color')
print(r)
"""
from random import choice
computerChoice = choice(['piedra', 'papel', 'tijera'])

opcion = input("Ingrese su opcion (Piedra/Papel/Tijera): ")
opcion = opcion.lower()
if opcion == "piedra" and computerChoice == "piedra":
    print (f"La computadora eligio {computerChoice}. Resultado = Empate")
elif opcion == "piedra" and computerChoice == "papel":
    print (f"La computadora eligio {computerChoice}. Resultado = Usted pierde")
elif opcion == "piedra" and computerChoice == "tijera":
    print (f"La computadora eligio {computerChoice}. Resultado = Usted gana")
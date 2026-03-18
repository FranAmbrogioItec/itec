#3) Definir una clase Persona cuyo constructor reciba nombre y edad. El programa principal pedirá en forma repetitiva (hasta que no haya más) los mismos datos, hará la instanciación de un objeto y lo agregará en una lista. Por lo tanto, los elementos de dicha lista serán objetos y podrá mostrarse con recorrido por elemento o por índices.

class Persona:
    def __init__(self, nombre, edad):
        self.nombre = nombre
        self.edad = edad

    def __str__(self):
        return f"Nombre: {self.nombre}, Edad: {self.edad}"

hay_mas = "s"
personas = []
while hay_mas == "s":
    nombre = input("Ingrese el nombre (o 'salir' para finalizar): ")
    edad = int(input("Ingrese la edad: "))
    persona = Persona(nombre, edad)
    personas.append(persona)
    hay_mas = input("Desea ingresar otra persona? (s/n): ")

print("\nPersonas ingresadas:")
for persona in personas:
    print(persona)
#5) Redefinir la clase Persona con dos métodos: uno para saber si es mayor de edad y el otro para determinar si es varón o mujer. En el programa principal instanciarlo, tomar nombre, edad y sexo, y finalmente mostrar un cartel que diga por ejemplo ‘Juan es mayor de edad y es varón’.	

class Persona:
    def __init__(self, nombre, edad, sexo):
        self.nombre = nombre
        self.edad = edad
        self.sexo = sexo.lower() 

    def mayor_menor(self):
        return "Es mayor" if self.edad >= 18 else "Es menor"

    def varon_mujer(self):
        if self.sexo == "m":
            return "masculino"
        elif self.sexo == "f":
            return "femenino"
        else:
            return "genero no especificado"

    def mostrar_datos(self):
        return f"{self.nombre} tiene {self.edad} años y es sexo {self.varon_mujer()}"

nombre = input("Ingrese su nombre: ")
edad = int(input("Ingese la edad: "))
sexo = input("Ingrese el sexo: ")
persona = Persona(nombre, edad, sexo)
print(persona.mostrar_datos())
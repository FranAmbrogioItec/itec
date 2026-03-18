class Animal:
    def __init__(self, identificador) -> None:
        self.identificador = identificador
        
    def esta_sano(self):
        pass

class Puma(Animal):
    def __init__(self, identificador, peso, edad) -> None:
        super().__init__(identificador)
        self.peso = peso
        self.edad = edad
    
    def esta_sano(self):
        return self.peso >= 200

    def es_adulto(self):
        return self.edad > 5

class Venado(Animal):
    def __init__(self, identificador, peso) -> None:
        super().__init__(identificador)
        self.peso = peso
        
    def esta_sano(self):
        return self.peso >= 120

class Jaula:
    def __init__(self, tipo_animal, cantidad):
        self.tipo_animal = tipo_animal
        self.animales = []
        for i in range(cantidad):
            if tipo_animal == "puma":
                peso = int(input(f"Ingrese el peso del puma {i+1}: "))
                edad = int(input(f"Ingrese la edad del puma {i+1}: "))
                animal = Puma(i+1, peso, edad)
            elif tipo_animal == "venado":
                peso = int(input(f"Ingrese el peso del venado {i+1}: "))
                animal = Venado(i+1, peso)
            self.animales.append(animal)

    def cantidad_adultos(self):
        if self.tipo_animal == "puma":
            return sum(1 for animal in self.animales if animal.es_adulto())
        else:
            return 0

    def obtener_datos(self):
        return [(animal.identificador, 'sano' if animal.esta_sano() else 'enfermo') for animal in self.animales]

    def cantidad_adultos(self):
        if self.tipo_animal.lower() != "Puma":
            return 0
        return sum(1 for puma in self.animales if puma.es_adulto())

tipo_animal = input("Ingrese el animal sobre el que quiere crear una jaula (Puma/Venado): ")
cantidad_de_animales = int(input(f"Ingrese la cantidad de {tipo_animal}s que desea ingresar a la jaula: "))
jaula = Jaula(tipo_animal, cantidad_de_animales)
datos = jaula.obtener_datos()
print(datos) 
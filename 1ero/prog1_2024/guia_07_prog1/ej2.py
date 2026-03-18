#2) Definir una clase Auto con un método que le permita poner la marca y el año. En el programa principal declarar dos instancias (objetos), cargarlas y mostrar las marcas de los dos autos.

class Auto:
    def __init__(self):
        self.marca = ""
        self.año = 0
        self.cargar_datos()

    def cargar_datos(self):
        self.marca = input("Ingrese la marca del auto: ")
        self.año = int(input("Ingrese el año del auto: "))

    def mostrar_datos(self):
        print(f"Auto marca: {self.marca} y año: {self.año}")

auto1 = Auto()
auto2 = Auto()
auto1.mostrar_datos()
auto2.mostrar_datos()
#6) Agregar al ejercicio 2 (clase Auto) un método que obtenga la antigüedad. En el programa principal mostrar cuáles autos tienen más de 5 años.

class Auto:
    def __init__(self):
        self.marca = ""
        self.año = 0
        self.cargar_datos()

    def cargar_datos(self):
        self.marca = input("Ingrese la marca del auto: ")
        self.año = int(input("Ingrese el año del auto: "))
    
    def antiguedad(self):
        return f"tiene {2024 - self.año} años de antiguedad." if self.año <= 2019 else "su modelo salio hace menos de 5 años"

    def mostrar_datos(self):
        print(f"Auto marca: {self.marca} y modelo: {self.año}, {self.antiguedad()}")
    
    
    
auto1 = Auto()
auto2 = Auto()
auto1.mostrar_datos()
auto2.mostrar_datos()
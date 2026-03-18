#7) Redefinir la clase Auto con los atributos marca, modelo y año. Hacer una clase heredera TuAuto que agrega dueño y color. Hacer un método que devuelve el color y en el programa principal preguntar por un color y mostrar sólo los autos que cumplan esa condición.

class Auto:
    def __init__(self, marca, modelo, año):
        self.marca = marca
        self.modelo = modelo
        self.año = año

    def antiguedad(self):
        return f"tiene {2024 - self.año} años de antiguedad." if self.año <= 2019 else "su modelo salió hace menos de 5 años"

    def mostrar_datos(self):
        print(f"Auto marca: {self.marca}, modelo: {self.modelo}, año: {self.año}, {self.antiguedad()}")

class TuAuto(Auto):
    def __init__(self, marca, modelo, año, dueño, color):
        super().__init__(marca, modelo, año)
        self.dueño = dueño
        self.color = color

    def mostrar_datos(self):
        super().mostrar_datos()
        print(f"Dueño: {self.dueño}, Color: {self.color}")

mi_auto = TuAuto("Toyota", "Corolla", 2012, "Juan Perez", "Negro")
mi_auto.mostrar_datos()
#4 Definir una clase que al ser instanciada reciba un valor numérico y cargue una lista de nombres hasta esa cantidad. Hacer también un método que muestre la lista completa.

class Lista_de_nombres:
    def __init__(self, cantidad) -> None:
        self.nombres = []
        for _ in range(cantidad):
            nombre = input("Ingrese un nombre: ")
            self.nombres.append(nombre)
            
    def mostrar_lista(self):
        print("La lista de nombres es: ")
        for nombre in self.nombres:
            print(nombre)
            
cantidad = int(input("Ingrese el numero de personas que desea ingresar: "))
lista = Lista_de_nombres(cantidad)
lista.mostrar_lista()
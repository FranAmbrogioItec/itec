#1) Hacer una clase Teléfono con los atributos marca, modelo y costo mensual y un método que muestre (o devuelva) el costo anual.

class Telefono():
    def __init__(self, marca, modelo, costo_mensual):
        self.marca = marca
        self.modelo = modelo
        self.costo_mensual = costo_mensual

def costo_anual(self):
    return self.costo_mensual * 12

celufran = Telefono("motorola","g30",1000)
print (f"El telefono {celufran.marca} modelo {celufran.modelo} tiene un costo de {celufran.costo_mensual} pesos")
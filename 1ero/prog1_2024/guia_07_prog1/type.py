import datetime

class Persona:
    def __init__(self, nombre, fecha_nacimiento):
        self.nombre = nombre
        self.fecha_nacimiento = fecha_nacimiento

    def edad(self):
        hoy = datetime.date.today()
        edad = hoy.year - self.fecha_nacimiento.year - ((hoy.month, hoy.day) < (self.fecha_nacimiento.month, self.fecha_nacimiento.day))
        return edad

class Alumno(Persona):
    def __init__(self, nombre, fecha_nacimiento, promedio):
        super().__init__(nombre, fecha_nacimiento)
        self.promedio = promedio

class Docente(Persona):
    def __init__(self, nombre, fecha_nacimiento, materia):
        super().__init__(nombre, fecha_nacimiento)
        self.materia = materia

# Instanciando objetos
alumno1 = Alumno("Juan Pérez", datetime.date(2000, 1, 15), 8.5)
alumno2 = Alumno("María López", datetime.date(2002, 5, 10), 9.2)
docente1 = Docente("Pedro Gómez", datetime.date(1975, 3, 20), "Matemáticas")

# Mostrando datos
print(f"Alumno: {alumno1.nombre}, Edad: {alumno1.edad()}, Promedio: {alumno1.promedio}")
print(f"Alumno: {alumno2.nombre}, Edad: {alumno2.edad()}, Promedio: {alumno2.promedio}")
print(f"Docente: {docente1.nombre}, Edad: {docente1.edad()}, Materia: {docente1.materia}")
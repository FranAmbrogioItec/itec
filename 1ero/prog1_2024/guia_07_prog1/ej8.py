#8) Volver a redefinir la clase Persona, con atributos nombre y fecha de nacimiento. Agregar clases hijas Alumno (con atributo promedio y método edad) y Docente (con atributo materia). Instanciar varios alumnos y docentes y mostrar sus datos.

class Persona:
    def __init__(self, nombre, fecha_nacimiento):
        self.nombre = nombre
        self.fecha_nacimiento = fecha_nacimiento
    
class Alumno(Persona):
    def __init__(self, nombre, fecha_nacimiento, promedio, edad):
        super().__init__(nombre, fecha_nacimiento)
        self.promedio = promedio
    
    def get_age(self):
        edad = int(input("Ingrese la edad: "))
        return edad
                
    def mostrar_alumno(self):
        return f"El alumno se llama {self.nombre}, nacio el {self.fecha_nacimiento} y tiene {self.edad} años. Su promedio es {self.promedio}"
        
class Docente(Persona):
    def __init__(self, nombre, fecha_nacimiento, materia):
        super().__init__(nombre, fecha_nacimiento)
        self.materia = materia
        
    def mostrar_docente(self):
        return f"El docente se llama {self.nombre} nacio el {self.fecha_nacimiento} y la materia que dicta es {self.materia}"
    
    
    
class Empleado:
    def __init__(self, nombre, sueldo) -> None:
        self.nombre = nombre
        self.sueldo = sueldo

class Programador(Empleado):
    def __init__(self, nombre, sueldo, lenguaje):
        super().__init__(nombre, sueldo)
        self.lenguaje = lenguaje

    def asignar_proyecto(self, proyecto):
        self.proyecto = proyecto

    def get_info(self):
        return f"Nombre: {self.nombre}. Salario: {self.sueldo}. Sistema: {self.proyecto}. Lenguaje: {self.lenguaje}"

class Empresa:
    def __init__(self, nombre, rubro):
        self.nombre = nombre
        self.rubro = rubro
        self.lista_programadores = []
        self.lista_proyectos = ["Web Pollitos", "Sistema Gallina SRL"]
        self.lista_lenguajes = ["Python", "Javascript", "C#", "HTML y CSS"]

    def agregar_empleado(self):
        hay_mas = "s"
        while hay_mas == "s":
            lenguaje = input("Ingrese el lenguaje de programacion: ")
            if lenguaje in self.lista_lenguajes:
                nombre = input("Ingrese el nombre del programador: ")
                sueldo = 3475000 if lenguaje == "Python" else 615000
                proyecto = input("Ingrese el proyecto: \n Proyectos disponibles: 'Web Pollitos' o 'Sistema Gallina SRL': ")
                nuevo_programador = Programador(nombre, sueldo, lenguaje)
                nuevo_programador.asignar_proyecto(proyecto)
                self.lista_programadores.append(nuevo_programador)
                hay_mas = input("Desea ingresar otro programador? (s/n): ").strip().lower() #strip para q lo tome igual, aunque agregue un espacio o cualquier otra cosa erronea
                if hay_mas != 's':
                    break
            else:
                print(f"Lenguaje {lenguaje} no valido. Los lenguajes validos son: {self.lista_lenguajes}")

    def mostrar_todo(self):
        print(f"Empresa: {self.nombre}. Rubro: {self.rubro}")
        print("Programadores:")
        for programador in self.lista_programadores:
            print(programador.get_info())

empresa = Empresa("Google", "Informatica")
empresa.agregar_empleado()
empresa.mostrar_todo()
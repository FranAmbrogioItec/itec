#Cargar en listas los nombres y fechas de nacimiento de varias personas, luego recorrerlo y mostrar los nombres de los mayores de edad. Funciones de carga y cálculo de edad.

def carga(nombres,edades):
    ingreso = int(input("Cuantas personas va a ingresar?: "))
    for i in range(ingreso):
        nombre = input("Ingrese el nombre de la persona: ")
        nombres.append(nombre)
        edad = int(input("Ingrese la edad de la persona: "))
        edades.append(edad)        
    return nombres,edades

nombres = []
edades = []
resultado = carga(nombres, edades)

def calculo_edad(nombres, edades):
    lista_mayores = []
    lista_menores = []
    for i in range(len(edades)):
        if edades[i] >= 18:
            lista_mayores.append(nombres[i])
        else:
            lista_menores.append(nombres[i])
    return lista_mayores

mayores = calculo_edad(nombres,edades)
print (f"Los mayores de edad son: {mayores}")       

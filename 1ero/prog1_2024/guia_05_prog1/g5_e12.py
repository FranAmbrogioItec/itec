#12 Pedir el ingreso de un nombre completo (Juan Pérez) y mostrarlo invertido y con coma (Pérez, Juan).

def invertir(nombre):
    posi_espacio = nombre.index(" ")
    nombre_invertido = nombre[posi_espacio:] + ", " + nombre[:posi_espacio]
    return nombre_invertido

nombre = input("Ingrese su nombre completo: ")
resultado = invertir(nombre)

print (f"Su nombre es invertido es:{resultado}")
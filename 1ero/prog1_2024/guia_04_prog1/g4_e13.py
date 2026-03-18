#Pedir el ingreso de un nombre completo en la forma <nombre> <apellido> (ejemplo: Juan Pérez) y mostrarlo invertido y con coma <apellido>,<nombre> (ejemplo: Perez, Juan).

ingreso_usuario = [input("Ingrese su nombre y apellido: ")]

for nombrecompleto in ingreso_usuario:
    #print(nombrecompleto)
    posi_espacio = nombrecompleto.find(" ")
    #print(posi_espacio)
    ap_coma_i = nombrecompleto[posi_espacio:] + ", " + nombrecompleto[:posi_espacio]
    print (ap_coma_i)

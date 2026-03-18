#EJERCICIO NUMERO 10:

cuota_base = 7000

nombre = (input("Ingrese su nombre aqui: "))
carrera_que_se_inscribe = (input("Ingrese a la carrera que desea inscribirse: "))
ciudad_donde_vive = (input("Ingrese el nombre de su ciudad: "))

if carrera_que_se_inscribe == 'Electromecanica' and ciudad_donde_vive != "Rio Cuarto":
    cuota_base = cuota_base * 0.85
    
else:
    cuota_base = cuota_base
    

    
print ("La cuota sera", cuota_base)
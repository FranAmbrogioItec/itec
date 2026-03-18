#ejercicio 8: Pasar un período expresado en segundos a un período expresado en días, horas, minutos y segundos.

valor = int(input("Ingrese el valor en segundos que quiera expresar aqui: "))

dia = valor // 86400
hora = valor // 3600
minuto = valor // 60
segundos = valor

if dia <= 1:
    print("El valor expresado en dias, horas y minutos respectivamente es igual a: ", dia, "dia,", hora, "horas,", 
minuto, "minutos y", segundos, "segundos")
else: 
    print("El valor expresado en dias, horas y minutos respectivamente es igual a: ", dia, "dias,", hora, "horas,", 
minuto, "minutos y", segundos, "segundos") 
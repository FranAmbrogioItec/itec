#5 Recibir por teclado una cadena de números, dejarlo en formato string e insertar  un punto cada 3 dígitos como divisorio de miles. Ej.  “1234567890” debería devolver “1.234.567.890” 
    
n = (input("Ingrese un numero: "))
nConPuntos = ''
for i in range(len(n)):
    digito = n[(i+1)*-1] 
    nConPuntos = digito + nConPuntos
    if ((i+1) % 3 == 0) and i < len(n)-1:
        nConPuntos = '.'+ nConPuntos
print(nConPuntos)

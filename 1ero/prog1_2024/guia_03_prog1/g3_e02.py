#Cargar letras en una lista hasta que el usuario ingrese un asterisco. 
#Luego hacer otra iteración para contar las vocales. Al final mostrar el total.

lista_letras= []
cant_l= 0
vocales= 'aeiouAEIOU'
ingreso = input('desea arancar (si/no)?: ')

while ingreso != "*":
    letras = input('ingrese una letra: ')
    ingreso = input('desea ingresar otra letra? (para cancelar ingrese *): ')
    lista_letras.append(letras)

for i in range(len(lista_letras)):
    print(lista_letras[i])
    if lista_letras[i] in vocales:
        cant_l = cant_l + 1

print ('la cantidad de vocales son: ', cant_l)

nacidos2008 = "Eva,17039,f,Daniel,19005,m,Emily,17434,f,Emma,18813,f,Ethan,20216,m,Julia,18616,f,Jacob,22594,m,Joshua,19205,m,Michael,20626,m,Olivia,17081,f"
nacidos2008 = nacidos2008.split(',')
m2008 = []
v2008 = []
for i in range(len(nacidos2008)):
    if nacidos2008[i] == 'f':
        m2008.append([int(nacidos2008[i-1]), nacidos2008[i-2]])
    elif nacidos2008[i] == 'm':
        v2008.append([int(nacidos2008[i-1]), nacidos2008[i-2]])

m2008.sort(reverse=True)
v2008.sort(reverse=True)

v2018 = [[19837, 'Liam'], [18267, ' Noah'], [14516, 'Michael'], [13525, 'James'], [13389, 'Oliver']]
m2018 = [[18688, 'Emma'], [17921, 'Olivia'], [14924, 'Ava'], [14464, 'Isabella'], [13928, 'Sophia']]

ranking = int(input("Ingrese el puesto sobre el que quiere saber la diferencia: "))
sexo = 'm'
print()
print(f'Diferencia entre la cantidad de bebés de sexo "{sexo}" en el puesto número #{ranking}')
if sexo == 'm':
    dife = v2018[ranking-1][0] - v2008[ranking-1][0]
    if dife < 0:
        mayor = v2008[ranking-1][1]
        menor = v2018[ranking-1][1]
        aM = 2008
        am = 2018
        dife *= -1
    else:
        mayor = v2018[ranking-1][1]
        menor = v2008[ranking-1][1]
        aM = 2018
        am = 2008
elif sexo == 'f':
    dife = m2018[ranking-1][0] - m2008[ranking-1][0]
    if dife < 0:
        mayor = m2008[ranking-1][1]
        menor = m2018[ranking-1][1]
        aM = 2008
        am = 2018
        dife *= -1
    else:
        mayor = m2018[ranking-1][1]
        menor = m2008[ranking-1][1]
        aM = 2018
        am = 2008



print(f'{dife} a favor de {mayor}({aM}) sobre {menor}({am})')
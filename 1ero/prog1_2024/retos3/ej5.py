""" Hacer un programa que, dadas dos personas en estricto orden, se devuelva si se puede realizar la transfusión. """

def es_compatible(donante, receptor):
    compatibilidad = {
        '0-': ['0-', '0+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
        '0+': ['0+', 'A+', 'B+', 'AB+'],
        'A-': ['A-', 'A+', 'AB-', 'AB+'],
        'A+': ['A+', 'AB+'],
        'B-': ['B-', 'B+', 'AB-', 'AB+'],
        'B+': ['B+', 'AB+'],
        'AB-': ['AB-', 'AB+'],
        'AB+': ['AB+'] 
    }
    
    return receptor in compatibilidad[donante]

donante = input("Ingrese un posible donante: ")
receptor = input("Ingrese el receptor de la sangre: ")

if es_compatible(donante, receptor):
    print(f"{donante} a {receptor} -> Sí es compatible")
else:
    print(f"{donante} a {receptor} -> No es compatible")

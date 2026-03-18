#8 Ingresar autos y sus precios y contar cuantos valen entre $17.460.000 y $23.850.000. 
#Terminar la carga cuando el valor ingresado sea 0.

acumulador = 0
sigue = "si"
lista_autos = []
lista_precios = []

while sigue != "0":
    auto = input("Ingrese la marca y el modelo del auto: ")
    precio = int(input("Ingrese el precio del vehiculo: "))
    lista_precios.append(precio)
    acumulador = precio + acumulador
    sigue = input("Desea ingresar otro vehiculo? (si) De lo contrarario escriba ('0'): ")
    if 17_460_000 <= precio < 23_850_000:
        lista_autos.append(auto)
        
print (f"Los autos que valen entre  $17.460.000 y $23.850.000 son: {len(lista_autos)} y son {lista_autos}")
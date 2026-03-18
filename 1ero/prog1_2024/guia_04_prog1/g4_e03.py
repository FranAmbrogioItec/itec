#3 Eliminar el plural en esta frase: “Real Madrid gana las copas.” Recorrer y quitar las eses, construyendo una nueva string.
""" frase = "Real Madrid gana las copas."
nueva_frase = ""

for palabra in (frase):
    nueva_frase = frase[:19] + " " + frase[21:25] + "."
print (nueva_frase) """

frase = "Real Madrid gana las copas."

nueva_frase = ""
for palabra in (frase):
    nueva_frase = frase.replace("s", "") 
print (nueva_frase)

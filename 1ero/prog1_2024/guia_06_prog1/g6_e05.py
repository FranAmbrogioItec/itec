#5) Usando inputStr(la función realizada en el ejercicio anterior), escribir una función que valide un nombre de usuario, agregando restricciones específicas, como por ejemplo que tenga al menos 8 caracteres en total, al menos una letra, al menos 1 dígito numérico y al menos 1 caracter especial entre estos: # $ % &. 





""" Ejemplo de uso de la función:
usuario = inputUser('Ingrese un nombre de usuario válido (debe contener como mínimo una letra, un dígito y al menos uno de estos caracteres especiales:  #, $, %,&): ')
1$1$1$1$1$1 # wrong - no tiene una letra
abc%abc% # wrong - no tiene un dígito
abc#123 # wrong - no llega a 8 caracteres
quic0*grosso # wrong - el * es especial pero no es uno de los 4 requeridos
qwerty9& # yes!
No hace falta que tire ningún mensaje de error! """
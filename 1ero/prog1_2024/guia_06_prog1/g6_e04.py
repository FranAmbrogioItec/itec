#inputStr: input de strings (validar largo por mínimo y/o máximo).

def password(clave):
        while True:
                clave = input("Ingrese su clave: ")
                try:
                        if (len(clave)) < 5:
                                print("Su constraseña no supera los 5 caracteres, porfavor ingrese una contraseña mas larga.")
                        elif (len(clave)) > 8:
                                print ("Su contraseña supera los caracteres establecidos, porfavor ingrese una contraseña mas corta.")
                        elif 5 >= (len(clave)) <= 8:
                                print ("Contraseña válida.")
                        return clave
                except:
                        print ("Ha ocurrido un error, asegurese de ingresar valores numericos.")


"""Ejemplo de uso de la función:
password0 = inputStr('Password (entre 5 y 8 caracteres): ', 5, 8)
password1 = inputStr('Password (al menos 4): ', 4)
password2 = inputStr('Password (a lo sumo 5): ', maxi=5)
password3 = inputStr('Password (sin rango): ') """

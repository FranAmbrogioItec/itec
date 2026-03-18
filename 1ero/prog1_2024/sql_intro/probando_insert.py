import sqlite3

conn = sqlite3.connect('BD1.db')
print("Opened database successfully")
nombre = "Luis"
fecha = "10-11-2000"


conn.execute(f"INSERT INTO personas (nombre,fecha) VALUES ('{nombre}','{fecha}');")

conn.commit()
print("Records created successfully")
conn.close()
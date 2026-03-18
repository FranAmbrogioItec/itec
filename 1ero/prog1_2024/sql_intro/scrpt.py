import sqlite3
conn=sqlite3.connect("intro_sql.db")
#conn.execute ("CREATE TABLE personas (id INTEGER PRIMARY KEY,nombre TEXT,fecha date);")
#conn.execute ("insert into personas (nombre,fecha) values ('Juan','2020-01-01');")
#conn.execute("drop table personas;")
#conn.execute("select * FROM personas;")
conn.commit()
print("Records created successfully")
conn.close()
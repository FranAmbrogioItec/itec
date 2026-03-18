from itertools import count 
import sqlite3

conn = sqlite3.connect('BD1.db')
print ("Opened database successfully")

cursor = conn.execute("SELECT id,nombre,fecha from personas")
for row in cursor:
   print ("ID = ", row[0])
   print ("NAME = ", row[1])
   print ("ADDRESS = ", row[2]),"\n"
   

print("Operation done successfully");
conn.close()
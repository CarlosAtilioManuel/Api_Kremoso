import sqlite3
from random import randint

connection = sqlite3.connect("Kremoso.db")
cursor = connection.cursor()
# deleting the table usuario
# cursor.execute("drop table usuario")

# craeting the table usuario
cursor.execute("""create table if not exists usuario (id_usuario integer not null primary key autoincrement,nome varchar(45))""")
# creating the table product
cursor.execute("""create table if not exists product (
    id_product integer not null primary key autoincrement,
    name varchar(45),
    price decimal)""")

randomItem = randint(1,1000)
# inserting a new user into the table usuario 
cursor.execute("insert into usuario (nome) values ('{nome}')" .format(nome = "Gustavo {item}" .format(item = randomItem)))

# geting all the users from the table usuario
products = cursor.execute("select * from product")

print("Produtos")
for product in products:
    print(product)

usuarios = cursor.execute("select * from usuario")
print("Usuarios: ")
for usuario in usuarios:
    print(usuario)

connection.commit()
connection.close()
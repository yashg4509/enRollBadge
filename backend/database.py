import sqlite3

connection = sqlite3.connect('enroll.db')
cursor = connection.cursor()

cursor.execute('''CREATE TABLE IF NOT EXISTS USERS
                (
                    ID INTEGER PRIMARY KEY AUTOINCREMENT, 
                    USER_EMAIL TEXT
                );''')

cursor.execute('''CREATE TABLE IF NOT EXISTS CLASSES
                (
                    ID INTEGER PRIMARY KEY AUTOINCREMENT, 
                    CLASS_NAME TEXT,
                    STATUS INT
                );''')

cursor.execute('''CREATE TABLE IF NOT EXISTS USER_CLASS
                (
                    ID INTEGER PRIMARY KEY AUTOINCREMENT, 
                    USER_ID INTEGER,
                    CLASS_ID INTEGER,
                    FOREIGN KEY(USER_ID) REFERENCES USERS(ID),
                    FOREIGN KEY(CLASS_ID) REFERENCES CLASSES(ID)
                );''')

connection.commit()
connection.close()

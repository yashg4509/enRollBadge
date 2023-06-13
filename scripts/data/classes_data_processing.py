import json
import sqlite3

#Establishing database connection
DATABASE = '../enroll.db'
conn = sqlite3.connect(DATABASE)
cursor = conn.cursor()

#Opening JSON file
f = open('Classes.json')
  
data = json.load(f)

hits = data['hits']

#looping through each class and adding it
for h in hits:
	course = h['courseDesignation']
	cursor.execute("SELECT * FROM CLASSES WHERE CLASS_NAME = ?", (course,))
	row = cursor.fetchone()

	if(row):
		pass
	else:
		cursor.execute("INSERT INTO CLASSES (CLASS_NAME) VALUES (?)", (course,))

conn.commit()
conn.close()
  

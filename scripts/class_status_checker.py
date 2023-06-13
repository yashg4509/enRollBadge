import sqlite3
import concurrent_madison, madison

conn = sqlite3.connect('enroll.db')
cursor = conn.cursor()
cursor.execute("SELECT * FROM ACTIVE_CLASSES")
rows = cursor.fetchall()

class_dict = {}

for r in rows:
	class_dict[r[1]] = True if r[2] == 1 else False

new_class_dict = concurrent_madison.classes_to_api(class_dict)
# new_class_dict = {'COMP SCI 400': False, 'MATH 222': True, 'ENGL 140': False}
print(class_dict)
print(new_class_dict)

changes = {}

#writing code to track changes
for c in class_dict:
	if(class_dict[c] != new_class_dict[c]):
		changes[c] = new_class_dict[c]

temp_changes = {}
for c in changes:

	cursor.execute("SELECT ID FROM CLASSES WHERE CLASS_NAME = ?", (c,))
	class_id = cursor.fetchone()[0]

	temp_changes[class_id] = changes[c]

changes = temp_changes #re-assigning


#now finding the list of users to notify and what to notify them with
notifications = [] #list with each element like - {"userID": ___, "classID": ___}

for c in changes:
	cursor.execute("SELECT USER_ID FROM USER_CLASS WHERE CLASS_ID = ?", (c,))
	rows = cursor.fetchall()

	for r in rows:
		notifications.append({"userID": r[0], "classID": c})
print(notifications)


conn.close()















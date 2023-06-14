import sqlite3
import concurrent_madison, madison, batched_calls, email_notif

conn = sqlite3.connect('enroll.db')
cursor = conn.cursor()

#getting disctinct classes
cursor.execute("SELECT DISTINCT CLASS_ID FROM USER_CLASS")
rows = cursor.fetchall()

classes = []

class_dict = {}

for r in rows:
	cursor.execute("SELECT CLASS_NAME, STATUS FROM CLASSES WHERE ID = ?", (r[0],))
	row = cursor.fetchone()

	class_name = row[0]
	status = row[1]

	class_dict[class_name] = True if status == 1 else False

print(class_dict)


new_class_dict = batched_calls.classes_to_api(class_dict)
# new_class_dict = {'COMP SCI 400': False, 'MATH 222': True, 'ENGL 140': False}
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
		notifications.append({"userID": r[0], "classID": c, "status": changes[c]})

print(notifications)
#after sending notifications
for n in new_class_dict:
	status_ = 1 if new_class_dict[n] == True else 0

	cursor.execute("UPDATE CLASSES SET STATUS = ? WHERE CLASS_NAME = ?", (status_, n))

for n in notifications:
	email_notif.send_sub_notif(n)


conn.commit()

conn.close()















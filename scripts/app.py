from flask import Flask, jsonify, request
import sqlite3
import traceback
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

DATABASE = 'enroll.db'

def connect_to_database():
    return sqlite3.connect(DATABASE)

# Adds the user's email to the database when they first create an account
@app.route('/createacct', methods=['POST'])
def createAcct():
    conn = connect_to_database()
    cursor = conn.cursor()
    try:
        data = request.get_json() # {"email": "fred@gmail.com"}
        email = data["email"] # grabs the user's email

        # finds if the user exists already in the table
        cursor.execute("SELECT COUNT(*) FROM USERS WHERE USER_EMAIL = ?", (email,))
        count = cursor.fetchone()[0]

        # if the user email is already in the db then there is an error
        if count >=1:
            conn.close()
            return jsonify({"error": "email already exists"}), 409
        
        # if they don't exist(meaning new user) then add them to the db
        cursor.execute("INSERT INTO USERS (USER_EMAIL) VALUES (?)", (email,))
        conn.commit()
        conn.close()
        return jsonify({"message": "success"}), 200
    except Exception:
        conn.close()
        return jsonify({"error": "failure"}), 400 

# Adds the to user-class table per class they are subscribed for
@app.route('/signup', methods=['POST'])
def signUpClasses():
    conn = connect_to_database()
    cursor = conn.cursor()
    try:
        data = request.get_json() # {"classes": [array of classes], "email": "fred@gmail.com"}
        classes = data["classes"]
        email = data["email"]

        # checks the user exists
        cursor.execute("SELECT COUNT(*) FROM USERS WHERE USER_EMAIL = ?", (email,))
        count = cursor.fetchone()[0]

        # if the user appears more than 1 time or no times in the table
        if count != 1:
            conn.close()
            return jsonify({"error": "email either does not exist or exists multiple times"}), 409
        
        # gets the equivalent user unique ID
        cursor.execute("SELECT * FROM USERS WHERE USER_EMAIL = ?", (email,))
        user_id = cursor.fetchone()[0]

        # gets the equivalent classes unique IDs
        class_ids = []
        for aclass in classes:
            cursor.execute("SELECT * FROM CLASSES WHERE CLASS_NAME = ?", (aclass,))
            class_ids.append(cursor.fetchone()[0])

        # grabs all the rows that contain all the classes the user is subscribed to before the new json
        cursor.execute("SELECT * FROM USER_CLASS WHERE USER_ID = ?", (user_id,))
        currentSub = cursor.fetchall()
        # Unsubscribing Process: go through all the classes and if they are not in the new json subscribed list, then remove them
        for row in currentSub:
            if row[2] not in class_ids:
                # remove the current row
                cursor.execute("DELETE FROM USER_CLASS WHERE CLASS_ID = ? AND USER_ID = ?", (row[2], user_id))

        # Subscribing Process:
        for classid in class_ids:
            # this means that if the query can't find that class in the user_table, that means the user just subscribed to that class
            if cursor.execute("SELECT * FROM USER_CLASS WHERE CLASS_ID = ? AND USER_ID = ?", (classid,user_id)).fetchone() == None:
                cursor.execute("INSERT INTO USER_CLASS (USER_ID, CLASS_ID) VALUES(?, ?)", (user_id, classid))

        conn.commit()
        conn.close()
        return jsonify({"message": "success"}), 200
    except Exception:
        print(traceback.print_exc())
        conn.close()
        return jsonify({"error": "failure"}), 400 


if __name__ == '__main__':
    app.run(debug=True, port=8000)
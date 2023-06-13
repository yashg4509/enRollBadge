from flask import Flask, jsonify, request
import sqlite3
import traceback

app = Flask(__name__)

DATABASE = 'enroll.db'

def connect_to_database():
    return sqlite3.connect(DATABASE)


@app.route('/signup', methods=['POST'])
def signup():
    conn = connect_to_database()
    cursor = conn.cursor()
    try:
        data = request.get_json() # {"email": "amitav554@gmail.com"}
        email = data["email"] # grabs the user's email
        print(email)

        # finds if the user exists already in the table
        cursor.execute("SELECT COUNT(*) FROM USERS WHERE USER_EMAIL = ?", (email,))
        count = cursor.fetchone()[0]
        print(count)

        # if the user email is already in the db then there is an error
        if count >=1:
            conn.close()
            print('2')
            return jsonify({"error": "email already exists"}), 409
        
        # if they don't exist(meaning new user) then add them to the db
        cursor.execute("INSERT INTO USERS (USER_EMAIL) VALUES (?)", (email,))
        conn.commit()
        conn.close()
        return jsonify({"message": "success"}), 200
    except Exception:
        print(traceback.format_exc())
        conn.close()
        return jsonify({"error": "failure"}), 400 

# {"classes": [array of classes], "email": "x"}



if __name__ == '__main__':
    app.run(debug=True, port=8000)
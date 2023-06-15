from email.message import EmailMessage
import ssl
import smtplib
import sqlite3
import traceback

DATABASE = "enroll.db"

email_sender = 'badgeenroll@gmail.com'
email_password = 'etjqnwpoxwonfwkb'

def send_sub_notif(email, classes):
	try:
		conn = sqlite3.connect(DATABASE)
		cursor = conn.cursor()

		newclasses = []

		cursor.execute("SELECT ID FROM USERS WHERE USER_EMAIL = ?", (email,))
		userID = cursor.fetchone()[0]

		for c in classes:
			cursor.execute("SELECT ID FROM CLASSES WHERE CLASS_NAME = ?", (c,))
			classID = cursor.fetchone()[0]

			cursor.execute("SELECT * FROM USER_CLASS WHERE CLASS_ID = ? AND USER_ID = ?", (classID, userID))
			row = cursor.fetchone()
			if(row):
				pass
			else:
				newclasses.append(c)

		print(newclasses)

		if(len(newclasses) != 0):
			subject = f"You have signed up for notifications for {newclasses[0]}!"

			body = f"""

			You have now signed up for a notification for when {newclasses[0]} opens for enrollment.
			We will email you if the status of the class changes

			Thanks,
			enRollBadge.com
			"""

			em = EmailMessage()
			em['From'] = email_sender
			em['To'] = email
			em['subject'] = subject
			em.set_content(body)

			context = ssl.create_default_context()
			context.check_hostname = False
			context.verify_mode = ssl.CERT_NONE

			with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
				smtp.login(email_sender, email_password)
				smtp.sendmail(email_sender, email, em.as_string())
				print("Email sent successfully to " + email)

		return True

	except Exception:
		traceback.print_exc()
		return False
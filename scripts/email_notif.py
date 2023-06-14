from email.message import EmailMessage
import ssl
import smtplib
import sqlite3
import traceback

DATABASE = "enroll.db"

email_sender = 'badgeenroll@gmail.com'
email_password = 'etjqnwpoxwonfwkb'

def send_sub_notif(notif):
	try:
		conn = sqlite3.connect(DATABASE)
		cursor = conn.cursor()
		cursor.execute("SELECT USER_EMAIL FROM USERS WHERE ID = ?" , (notif['userID'],))
		email_receiver = cursor.fetchone()[0]

		cursor.execute("SELECT CLASS_NAME FROM CLASSES WHERE ID = ?" , (notif['classID'],))
		class_name = cursor.fetchone()[0]

		if(notif['status'] == True):
			subject = f"{class_name} is now open for enrollment!"

			body = f"""

			You signed up for a notification for when {class_name} opens for enrollment.
			Now it is, please check public.enroll.wisc.edu.

			Thanks,
			enRollBadge.com
			"""

			em = EmailMessage()
			em['From'] = email_sender
			em['To'] = email_receiver
			em['subject'] = subject
			em.set_content(body)

			context = ssl.create_default_context()
			context.check_hostname = False
			context.verify_mode = ssl.CERT_NONE

			with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
				smtp.login(email_sender, email_password)
				smtp.sendmail(email_sender, email_receiver, em.as_string())
				print("Email sent successfully to " + email_receiver)
		
		else:
			subject = f"{class_name} is now closed for enrollment"

			body = f"""

			You signed up for a notification for when {class_name} opens or closes for enrollment.
			It is now closed.

			Thanks,
			enRollBadge.com
			"""

			em = EmailMessage()
			em['From'] = email_sender
			em['To'] = email_receiver
			em['subject'] = subject
			em.set_content(body)

			context = ssl.create_default_context()
			context.check_hostname = False
			context.verify_mode = ssl.CERT_NONE

			with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
				smtp.login(email_sender, email_password)
				smtp.sendmail(email_sender, email_receiver, em.as_string())
				print("Email sent successfully to " + email_receiver)

		return True

	except Exception:
		traceback.print_exc()
		return False
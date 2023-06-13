from email.message import EmailMessage
import ssl
import smtplib
import sys

def send_email(class_name, action, email_receiver):
    email_sender = 'badgeenroll@gmail.com'
    email_password = 'etjqnwpoxwonfwkb'
    subject = 'Subscription Notification'
    body = f"You have {action} class: {class_name}"

    em = EmailMessage()
    em['From'] = email_sender
    em['To'] = email_receiver
    em['Subject'] = subject
    em.set_content(body)

    context = ssl.create_default_context()

    with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
        smtp.login(email_sender, email_password)
        smtp.sendmail(email_sender, email_receiver, em.as_string())
        print("Email sent successfully!")

if __name__ == '__main__':
    class_name = sys.argv[1]  # Get class name from command line argument
    action = sys.argv[2]  # Get action (subscribe or unsubscribe) from command line argument
    email_receiver = sys.argv[3]  # Get user email from command line argument

    send_email(class_name, action, email_receiver)

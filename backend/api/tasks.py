from celery import shared_task
import time
from django.core.mail import send_mail

@shared_task
def test_task():
    time.sleep(5)
    print("Wiadomość została przetworzona asynchronicznie.")
    return "Gotowe"

@shared_task
def send_welcome_email(username, email):
    subject = "Welcome to Bookly"
    message = f"Hi {username},\n\nThanks for registering at Bookly! We're excited to have you on board. Happy reading! 📖"
    from_email = "noreply@bookly.local"  
    recipient_list = [email]
    send_mail(subject, message, from_email, recipient_list)

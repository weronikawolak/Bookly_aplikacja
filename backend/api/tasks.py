from celery import shared_task
import time

@shared_task
def test_task():
    time.sleep(5)
    print("Wiadomość została przetworzona asynchronicznie.")
    return "Gotowe"

@shared_task(queue='emails')  
def send_welcome_email(user_email):
    print(f"Wysyłam e-mail powitalny do: {user_email}")
    return True
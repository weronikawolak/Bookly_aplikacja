# # backend/celery.py

# import os
# from celery import Celery

# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

# app = Celery('celery')
# app.config_from_object('django.conf:settings', namespace='CELERY')
# app.autodiscover_tasks()

# backend/celery_app.py

import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

app = Celery('backend')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()

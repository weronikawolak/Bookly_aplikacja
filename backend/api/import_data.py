import csv
import os
from api.models import Author, Book, Category

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, 'data')

def import_authors():
    with open(os.path.join(DATA_DIR, 'authors.csv'), newline='', encoding='utf-8') as csvfile:
        for row in csv.DictReader(csvfile):
            Author.objects.get_or_create(id=row['id'], name=row['name'])

def import_categories():
    with open(os.path.join(DATA_DIR, 'categories.csv'), newline='', encoding='utf-8') as csvfile:
        for row in csv.DictReader(csvfile):
            Category.objects.get_or_create(id=row['id'], name=row['name'])

def import_books():
    with open(os.path.join(DATA_DIR, 'books.csv'), newline='', encoding='utf-8') as csvfile:
        for row in csv.DictReader(csvfile):
            author = Author.objects.get(id=row['author_id'])
            category = Category.objects.get(name=row['category'])
            Book.objects.get_or_create(title=row['title'], author=author, category=category)

def run():
    import_authors()
    import_categories()
    import_books()
    print(" Dane zostały zaimportowane.")

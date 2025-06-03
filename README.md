# Bookly – Twój osobisty menedżer książek i celów czytelniczych

**Bookly** to nowoczesna, kompleksowa aplikacja webowa stworzona z myślą o miłośnikach książek, którzy chcą w uporządkowany sposób zarządzać swoją biblioteką, postępami w czytaniu, celami czytelniczymi oraz recenzjami.

---

## Spis treści
- [Funkcjonalności](#funkcjonalności)
- [Architektura](#architektura)
- [Uruchamianie projektu](#uruchamianie-projektu)
- [Technologie i uzasadnienie](#technologie-i-uzasadnienie)
- [Dokumentacja API](#dokumentacja-api)
- [Testy](#testy)

---

## Funkcjonalności

-  **Rejestracja i logowanie użytkowników** (Token Authentication)
-  **Zarządzanie książkami**: tworzenie, edycja, usuwanie, filtrowanie, wyszukiwanie
-  **Cele czytelnicze** na dany rok
-  **Recenzje książek z oceną**
-  **Listy książek** (custom lists)
-  **Role użytkownika**: `ROLE_USER`, `ROLE_ADMIN`
-  **Asynchroniczne wysyłanie maili powitalnych** z użyciem **Celery**
-  **Interaktywna dokumentacja API** (Swagger/OpenAPI)

---

 ## Architektura
Aplikacja składa się z dwóch głównych części – backendu (Django + DRF) i frontendu (React). Poniżej przedstawiono strukturę katalogów projektu:


📁 backend/
│   ├── api/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── permissions.py
│   │   └── tests/
│   ├── bookly/
│   └── manage.py

📁 frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── vite.config.js

---

## Uruchamianie projektu

### Wymagania:
- Python 3.10+
- Node.js + npm
- Redis (dla Celery)
- `virtualenv` lub `venv`

Backend:

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
celery -A bookly worker --loglevel=info  # uruchom Celery
python manage.py runserver
 API: http://localhost:8000/
 Swagger: http://localhost:8000/api/docs/
```
Frontend:
```bash
cd frontend
npm install
npm run dev
```
 UI: http://localhost:5173/


## Technologie i uzasadnienie

| Technologia            | Rola                         | Uzasadnienie wyboru                                               |
|------------------------|------------------------------|-------------------------------------------------------------------|
| Django                 | Backend, ORM                 | Stabilny framework, szybki rozwój, silna społeczność              |
| Django REST Framework  | API REST                     | Elastyczne, szybkie tworzenie REST API                            |
| Celery + Redis         | Kolejki zadań (maile)        | Skalowalna, asynchroniczna obsługa zadań                          |
| PostgreSQL / SQLite    | Baza danych                  | Relacyjna, dobrze wspierana przez Django                          |
| drf-spectacular        | Dokumentacja API             | Automatyczne generowanie OpenAPI/Swagger                          |
| Pytest / unittest      | Testy jednostkowe            | Testowanie logiki, endpointów                                     |
| React / JavaScript     | Frontend                     | Nowoczesny UI, szybki development                                 |

---

## Dokumentacja API

**Endpoint:** `/api/docs`  
Generowana automatycznie przez `drf-spectacular`.

Zawiera:
- Opis wszystkich endpointów
- Parametry zapytań i odpowiedzi
- Przykłady odpowiedzi w formacie JSON
- Kody odpowiedzi: `200`, `201`, `400`, `401`, `403`, `404`, `422`

---

## Testy

### Przykładowe uruchomienie:

```bash
python manage.py test api.tests.repository.test_book_repository
python manage.py test api.tests.services.test_book_service
``` 
Serwisy, repozytoria, uprawnienia i błędy 404, 403






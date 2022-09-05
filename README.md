# Job-Application-Review

## Setup

### Backend

```
cd backend/
virtualenv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 8002
```

backend server should run on port 8002 only because base url is hardcoded in frontend

### Frontend

```
cd frontend/
npm install
npm start
```

## Features

1. feature to reject or accept candidate
2. feature to add new candidate
3. handled all the edge cases such as already registered email or mobile, required fields, email regex and phone number 10 digit check, etc.
4. Used sqlite DB to store the candidate data

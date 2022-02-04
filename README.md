# How to Play a Quiz

To get a local copy of the code, clone it using git:

```
git clone git@github.com:olivia-ivadolabs/quiz_me.git

cd quiz_me
```

Create virtual env (only run it for the first time):

```
python -m venv quiz_me_env
```

Activate virtual env:
```
source quiz_me_env/bin/activate
```

## Run backend
```
cd quiz_me_be
```

Install dependencies:

```
pip install requirements.txt
```

Run migrations:
```
python manage.py makemigrations

python manage.py migrate
```

Create superuser:
```
python manage.py createsuperuser
```

Run backend:
```
python manage.py runserver
```

Now you can open http://localhost:8000/admin and add quiz and questions on the admin page, and then see the quiz list on http://localhost:8000/quiz/quiz and question list on http://localhost:8000/quiz/questions/quiz_id={quiz id}.

## Run frontend
Open another console, then run:
```
cd quiz_me_fe
```

Install dependencies:

```
npm install
```

Start a local web server by running:

```
npm start
```

And then open http://localhost:3000 to view it in the browser and play the quiz
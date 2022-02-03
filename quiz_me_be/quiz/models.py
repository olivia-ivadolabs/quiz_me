from django.db import models


class Quiz(models.Model):
    quiz_id = models.CharField(primary_key=True, max_length=200)
    quiz_title = models.CharField(max_length=200)


class Question(models.Model):
    question_id = models.CharField(primary_key=True, max_length=200)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    question = models.CharField(max_length=200)
    correct_answer = models.CharField(max_length=200)
    incorrect_answers = models.CharField(max_length=200)


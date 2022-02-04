from django.db import models


class Quiz(models.Model):
    id = models.BigAutoField(primary_key = True, auto_created=True)
    quiz_title = models.CharField(max_length=200)

    def __str__(self):
        return self.quiz_title


class Question(models.Model):
    id = models.BigAutoField(primary_key = True, auto_created=True)
    quiz = models.ForeignKey('Quiz', null=False, on_delete=models.CASCADE)
    question = models.CharField(max_length=200)
    correct_answer = models.CharField(max_length=200)
    incorrect_answers = models.CharField(max_length=200)


from rest_framework import serializers
from .models import Question, Quiz


class QuestionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Question 
        fields = ('question_id', 'quiz', 'question', 'correct_answer', 'incorrect_answers')


class QuizSerializer(serializers.ModelSerializer):

    class Meta:
        model = Quiz 
        fields = ('quiz_id', 'quiz_title')
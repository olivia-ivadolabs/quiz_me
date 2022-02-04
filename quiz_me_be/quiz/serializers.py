from rest_framework import serializers
from .models import Question, Quiz


class QuestionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Question 
        fields = ('id', 'quiz', 'question', 'correct_answer', 'incorrect_answers')

    def to_representation(self, instance):
        rep = super(QuestionSerializer, self).to_representation(instance)
        rep['quiz'] = instance.quiz.quiz_title
        return rep


class QuizSerializer(serializers.ModelSerializer):

    class Meta:
        model = Quiz 
        fields = '__all__'
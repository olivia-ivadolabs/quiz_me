from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Question, Quiz
from .serializers import *


@api_view(['GET', 'POST'])
def Questions_list(request, quiz_id: str):
    if request.method == 'GET':
        data = Question.objects.filter(quiz=quiz_id)
        serializer = QuestionSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = QuestionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def Quiz_list(request):
    if request.method == 'GET':
        data = Quiz.objects.all()
        serializer = QuizSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = QuizSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

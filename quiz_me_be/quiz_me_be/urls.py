from django.contrib import admin
from django.urls import path
from quiz.views import Questions_list, Quiz_list


urlpatterns = [
    path('admin/', admin.site.urls),
    path('quiz/questions/', Questions_list),
    path('quiz/quiz/', Quiz_list),
]

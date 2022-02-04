from django.contrib import admin
from django.urls import re_path, path
from quiz.views import Questions_list, Quiz_list


urlpatterns = [
    path('admin/', admin.site.urls),
    path('quiz/quiz/', Quiz_list),
    re_path(r'^quiz/questions/quiz_id=(?P<quiz_id>\w{0,50})$', Questions_list),
]

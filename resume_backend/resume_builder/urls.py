from django.urls import path
from . import views

urlpatterns = [
    path('resumes/', views.resume_list, name='resume-list'),
    path('resumes/<int:pk>/', views.resume_detail, name='resume-detail'),
    path('auth/login/', views.login_view, name='login'),
    path('auth/register/', views.register_view, name='register'),
]

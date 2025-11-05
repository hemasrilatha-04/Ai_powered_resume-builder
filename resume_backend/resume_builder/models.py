from django.db import models

class Resume(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    address = models.TextField(blank=True)
    linkedin = models.URLField(blank=True)
    github = models.URLField(blank=True)
    summary = models.TextField(blank=True)
    education = models.JSONField(default=list)
    experience = models.JSONField(default=list)
    skills = models.JSONField(default=list)
    projects = models.JSONField(default=list)
    ai_enhanced_summary = models.TextField(blank=True)
    ai_suggested_skills = models.JSONField(default=list)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.full_name
from django.db import models

class Comment(models.Model):
    text = models.TextField()
    author = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now_add=True)
    likes = models.IntegerField(default=0)
    image = models.URLField(blank=True, null=True)

    def __str__(self):
        return f"{self.author} - {self.date}"
from django.db import models
from jsonfield import JSONField


class Bookmark(models.Model):
    url = models.CharField(max_length=200, null=True)
    tags = models.CharField(max_length=500, null=True)
    image = models.CharField(max_length=500, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return self.url

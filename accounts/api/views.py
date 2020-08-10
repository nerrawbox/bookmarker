from rest_framework import viewsets
from .serializers import BookmarkSerializer
from accounts.models import Bookmark


class BookmarkViewSet(viewsets.ModelViewSet):
    serializer_class = BookmarkSerializer
    queryset = Bookmark.objects.all()

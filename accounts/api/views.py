from rest_framework import viewsets, status
from .serializers import BookmarkSerializer
from .screenshot import get_screenshot
from accounts.models import Bookmark
from rest_framework.response import Response
import cloudinary
from cloudinary import uploader
import json


class BookmarkViewSet(viewsets.ModelViewSet):
    serializer_class = BookmarkSerializer
    queryset = Bookmark.objects.all()

    def create(self, request):
        data = json.loads(request.body)
        screenshot_url = get_screenshot(data.get('url'))
        if screenshot_url != '':
            request.data['image'] = screenshot_url

        serializer = BookmarkSerializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        data = json.loads(request.body)
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)

        a = data.get('url') or None
        b = instance.url or None

        isScreenShot = str(a) != str(b)

        if isScreenShot:
            screenshot_img = get_screenshot(data.get('url'))
            if screenshot_img != '':
                result_cloudinary = cloudinary.uploader.upload(screenshot_img)
                request.data['image'] = result_cloudinary['url']

        if serializer.is_valid():
            self.perform_update(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

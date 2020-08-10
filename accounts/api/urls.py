from rest_framework.routers import DefaultRouter
from accounts.api.views import BookmarkViewSet

router = DefaultRouter()
router.register(r'bookmark', BookmarkViewSet, basename='bookmark')
urlpatterns = router.urls

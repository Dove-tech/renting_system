from django.urls import path
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'user-signin', SignInViewSet, basename="signin")
router.register(r'user-signup', SignUpViewSet, basename="signup")
router.register(r'reset-password', ResetPasswordViewSet, basename="resetpassword")
# router.register(r'add-to-favorite', addToFavoriteViewSet, basename="addtofavorite")
router.register(r'search',SearchViewSet, basename='search')
router.register(r'favorite', FavoriteViewSet, basename="favorite")
router.register(r'compare', CompareViewSet, basename="compare")


urlpatterns = router.urls

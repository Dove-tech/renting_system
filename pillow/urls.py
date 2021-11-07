from django.urls import path
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r'user-signup', SignUpViewSet, basename = "signup")
router.register(r'reset-password', ResetPasswordViewSet, basename = "resetpassword")

urlpatterns = router.urls
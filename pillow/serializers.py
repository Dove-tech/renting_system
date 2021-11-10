from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('name', 'password')


class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
        fields = ('user', 'room')

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('bedroom_num' ,'bathroom_num','price','start_time' ,'end_time')



class ApartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Apartment
        fields = '__all__'



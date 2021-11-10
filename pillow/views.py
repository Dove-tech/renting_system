from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse

from .serializers import *
from rest_framework import viewsets, status
from rest_framework.response import Response
from django.db import connection, transaction


def executeSQL(sql):
    with connection.cursor() as cursor:
        cursor.execute(sql)
        columns = [col[0] for col in cursor.description]
        return [
            dict(zip(columns, row))
            for row in cursor.fetchall()
        ]
    # 输入是一个string类型的sql语句，返回值是一个map


class SignUpViewSet(viewsets.ModelViewSet):
    # This viewset automatically provides `list`, `create`, `retrieve`,
    # `update` and `destroy` actions.
    serializer_class = UserSerializer

    # override get_queryset or create queryset
    def get_queryset(self):
        queryset = User.objects.all()
        return queryset

    def create(self, request):
        # id = request.data.get('id')
        name = request.data.get('name', None)
        password = request.data.get('password', None)

        # sql = "SELECT * FROM User_user WHERE username = {};".format(username)
        # res = executeSQL(sql)
        # 如果采用上面的方式来获取数据库的返回值，那么要注意res是一个map的形式，需要进行转换才能变成response里面能直接写进去的内容


        cursor = connection.cursor()
        user = cursor.execute('SELECT * FROM User where name = %s', [name])


        # instance = User.objects.raw('Update User SET name = %s, password = %s', [name, password])
        if user == 0:
            user = cursor.execute('SELECT MAX(id) as maxid FROM User')
            result_set = cursor.fetchone()
            max_id = result_set[0]
            instance = User(id=int(max_id)+1, name=name, password=password)
            instance.save()
            return Response(
                {"response": {"error": "OK", "id":int(max_id)+1, "name": instance.name, "password": instance.password},
                 "status": 201}, status=status.HTTP_201_CREATED)
        else:
            return Response({"response": {"error": "This username have already existed"}, "status": 400}, status=status.HTTP_400_BAD_REQUEST)


class ResetPasswordViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer

    # override get_queryset or create queryset
    def get_queryset(self):
        queryset = User.objects.all()
        return queryset

    def create(self, request):
        # id = request.data.get('id')
        name = request.data.get('name', None)
        password = request.data.get('password', None)

        # sql = "SELECT * FROM User_user WHERE username = {};".format(username)
        # res = executeSQL(sql)
        # 如果采用上面的方式来获取数据库的返回值，那么要注意res是一个map的形式，需要进行转换才能变成response里面能直接写进去的内容


        cursor = connection.cursor()
        user = cursor.execute('SELECT * FROM User where name = %s', [name])

        if user == 0:
            return Response({"response": {"error": "This username doesn't exist"}, "status": 400},
                        status=status.HTTP_400_BAD_REQUEST)
        # instance = User(username=username, password=password, email=email, firstname=firstname, lastname=lastname)

        else:
            cursor.execute('Update User SET password = %s WHERE NAME = %s', [password, name])
            return Response(
                {"response": {"error": "OK", "name": name, "password": password},
                 "status": 201}, status=status.HTTP_201_CREATED)


class addToFavoriteViewSet(viewsets.ModelViewSet):
    serializer_class = FavoriteSerializer
    # serializer_class_user = UserSerializer

    # override get_queryset or create queryset
    def get_queryset(self):
        queryset = Favorite.objects.all()
        return queryset

    def create(self, request):
        # id = request.data.get('id')
        user_id = request.data.get('user', None)
        room_id = request.data.get('room', None)
        print("user_id:" + str(user_id))
        print("room_id:" + str(room_id))

        cursor = connection.cursor()
        cursor.execute('SELECT * FROM Favorite WHERE user_id = %s AND room_id = %s', [user_id, room_id])
        result_set = cursor.fetchall()
        print(result_set)

        if not result_set:
            cursor.execute('SELECT * FROM User WHERE id = %s', [user_id])
            user_set = cursor.fetchone()
            instance_user = User(id=user_set[0], name=user_set[1], password=user_set[2])
            cursor.execute('SELECT * FROM Room WHERE id = %s', [room_id])
            room_set = cursor.fetchone()
            instance_room = Room(id=room_set[0], apartment_id=room_set[1], bedroom_num=room_set[2],bathroom_num=room_set[3], price=room_set[4],start_time=room_set[5], end_time=room_set[6], description=room_set[7])
            instance = Favorite(user=instance_user, room=instance_room)
            instance.save()
            return Response(
                {"response": {"error": "OK", "user": user_set[0], "room": room_set[0]},
                 "status": 201}, status=status.HTTP_201_CREATED)

        else:
            return Response({"response": {"error": "You have added this room to Favorite"}, "status": 400}, status=status.HTTP_400_BAD_REQUEST)



class FavoriteViewSet(viewsets.ModelViewSet):
    serializer_class = FavoriteSerializer
    def get_queryset(self):
        queryset = Favorite.objects.all()
        return queryset

    def create(self, request):
        # id = request.data.get('id')
        user_id = request.data.get('user', None)
        room_id = request.data.get('room', None)
        print(user_id)
        print(room_id)


        cursor = connection.cursor()
        cursor.execute('SELECT * FROM Favorite WHERE user_id = %s AND room_id = %s', [user_id, room_id])
        result_set = cursor.fetchone()
        print(result_set)

        if result_set:
            cursor.execute('DELETE  FROM Favorite WHERE room_id = %s AND user_id = %s ', [result_set[1], result_set[0]])
            return Response(
                {"response": {"error": "OK", "user": user_id, "room": room_id},
                 "status": 201}, status=status.HTTP_201_CREATED)

        else:
            return Response({"response": {"error": "This room is not in favorite list"}, "status": 400}, status=status.HTTP_400_BAD_REQUEST)
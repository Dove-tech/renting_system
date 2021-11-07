from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse

from .serializers import *
from rest_framework import viewsets, status
from rest_framework.response import Response
from django.db import connection


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
        id = request.data.get('id')
        name = request.data.get('name', None)
        password = request.data.get('password', None)

        # sql = "SELECT * FROM User_user WHERE username = {};".format(username)
        # res = executeSQL(sql)
        # 如果采用上面的方式来获取数据库的返回值，那么要注意res是一个map的形式，需要进行转换才能变成response里面能直接写进去的内容

        try:
            #user = User.objects.raw('SELECT * FROM User where name = %s', [name])
            user = User.objects.get(name=name)
            print("user: " + str(user))

        except User.DoesNotExist:
            # instance = User.objects.raw('Update User SET name = %s, password = %s', [name, password])
            instance = User(id=id, name=name, password=password)
            instance.save()
            return Response(
                {"response": {"error": "OK", "id": instance.id, "name": instance.name, "password": instance.password},
                 "status": 201}, status=status.HTTP_201_CREATED)
        else:
            return Response({"response": {"error": "???"}, "status": 400}, status=status.HTTP_400_BAD_REQUEST)


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

        try:
            #user = User.objects.raw('SELECT * FROM User where name = %s', [name])
            user = User.objects.get(name=name)
            # print("user:  "+ str(user))

        except User.DoesNotExist:
            return Response({"response": {"error": "THE USER DOES NOT EXIST"}, "status": 400},
                            status=status.HTTP_400_BAD_REQUEST)

        else:
            # print("id:" + (id))
            instance = User.objects.raw('Update User SET  password = %s where id = 0', [password])
            print("instance:    "+ str(instance))
            # instance = User(username=username, password=password, email=email, firstname=firstname, lastname=lastname)
            for object in instance:
                object.save()
            return Response(
                {"response": {"error": "OK", "name": instance.name, "password": instance.password},
                 "status": 201}, status=status.HTTP_201_CREATED)


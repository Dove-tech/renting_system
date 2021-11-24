from django.http.response import JsonResponse
from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse

from .serializers import *
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db import connection, transaction
from itertools import chain
from django.db.models import Q

import json


def executeSQL(sql):
    with connection.cursor() as cursor:
        cursor.execute(sql)
        columns = [col[0] for col in cursor.description]
        return [
            dict(zip(columns, row))
            for row in cursor.fetchall()
        ]
    # 输入是一个string类型的sql语句，返回值是一个map


class SignInViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer

    def get_queryset(self):
        queryset = User.objects.all()
        return queryset

    def create(self, request):
        name = request.data.get('name', None)
        password = request.data.get('password', None)
        cursor = connection.cursor()
        cursor.execute('SELECT * FROM User where name = %s', [name])
        real_user = cursor.fetchone()
        if password == real_user[2]:
            return Response(
                {"response": {"error": "OK", "id": real_user[0], "name": real_user[1]},
                 "status": 201}, status=status.HTTP_201_CREATED)
        else:
            return Response({"response": {"error": "Password is not correct"}, "status": 400},
                            status=status.HTTP_400_BAD_REQUEST)


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
            # instance = User(id=int(max_id) + 1, name=name, password=password)
            # instance.save()

            cursor.execute("INSERT INTO User VALUE(%s, %s, %s)",
                           [int(max_id) + 1, name, password])
            return Response({"response": {"error": "OK", "id": int(max_id) + 1, "name": name,
                                          "password": password}, "status": 201}, status=status.HTTP_201_CREATED)

            # return Response(
            #     {"response": {"error": "OK", "id": int(max_id) + 1, "name": instance.name,
            #                   "password": instance.password},
            #      "status": 201}, status=status.HTTP_201_CREATED)
        else:
            return Response({"response": {"error": "This username have already existed"}, "status": 400},
                            status=status.HTTP_400_BAD_REQUEST)


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

        cursor = connection.cursor()
        user = cursor.execute('SELECT * FROM User where name = %s', [name])

        if user == 0:
            return Response({"response": {"error": "This username doesn't exist"}, "status": 400},
                            status=status.HTTP_400_BAD_REQUEST)
        # instance = User(username=username, password=password, email=email, firstname=firstname, lastname=lastname)

        else:
            cursor.execute('Update User SET password = %s WHERE NAME = %s', [
                password, name])
            return Response(
                {"response": {"error": "OK", "name": name, "password": password},
                 "status": 201}, status=status.HTTP_201_CREATED)


class SearchViewSet(viewsets.ModelViewSet):
    serializer_class = ApartmentSerializer

    def get_queryset(self):
        queryset = Apartment.objects.all()
        return queryset

    def create(self, request):
        name = request.data.get('name')
        gym = request.data.get('gym')
        parking = request.data.get('parking')
        utility = request.data.get('utility')
        laundry = request.data.get('laundry')
        swimming_pool = request.data.get('swimming_pool')
        min_price = request.data.get('min_price')
        max_price = request.data.get('max_price')
        start_date = request.data.get('start_date')

        query = "SELECT * FROM Apartment a WHERE "
        if name != '':
            query += "name = '{}'".format(name)
        else:
            query += "name = a.name"
        if gym != None:
            query += " and gym = {}".format(gym)
        else:
            query += " and gym = a.gym"
        if parking != None:
            query += " and parking = {}".format(parking)
        else:
            query += " and parking = a.parking"
        if utility != None:
            query += " and utility = {}".format(utility)
        else:
            query += " and utility = a.utility"
        if laundry != None:
            query += " and laundry = {}".format(laundry)
        else:
            query += " and laundry = a.laundry"
        if swimming_pool != None:
            query += " and swimming_pool = {}".format(swimming_pool)
        else:
            query += " and swimming_pool = a.swimming_pool"
        if start_date != None:
            query += " and start_date > {}".format(start_date)
        else:
            query += " and start_date = a.start_date"
        if min_price != None:
            query += " and min_price > {} and max_price < {}".format(
                min_price, max_price)

        cursor = connection.cursor()
        cursor.execute(query)
        r = [dict((cursor.description[i][0], str(value))
                  for i, value in enumerate(row)) for row in cursor.fetchall()]

        try:
            ret = json.dumps(r[0])
        except:
            return Response({"response": {"error": "No search result"}, "status": 400},
                            status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(
                {"response": {"error": "OK", "results": ret},
                 "status": 201}, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['POST'])
    def adv_search(self, request):
        name = request.data.get('name')
        gym = request.data.get('gym')
        parking = request.data.get('parking')
        utility = request.data.get('utility')
        laundry = request.data.get('laundry')
        swimming_pool = request.data.get('swimming_pool')
        min_price = request.data.get('min_price')
        max_price = request.data.get('max_price')
        start_date = request.data.get('start_date')
        mean_rate = request.data.get('mean_rate')
        bedroom_num = request.data.get('bedroom_num')
        bathroom_num = request.data.get('bathroom_num')
        
        query = "SELECT * FROM Apartment a JOIN Room rm on a.id = rm.apartment_id WHERE "
        if name != None:
            query += "name = '{}'".format(name)
        else:
            query += "name = a.name"
        if gym != None:
            query += " and gym = {}".format(gym)
        else:
            query += " and gym = a.gym"
        if parking != None:
            query += " and parking = {}".format(parking)
        else:
            query += " and parking = a.parking"
        if utility != None:
            query += " and utility = {}".format(utility)
        else:
            query += " and utility = a.utility"
        if laundry != None:
            query += " and laundry = {}".format(laundry)
        else:
            query += " and laundry = a.laundry"
        if swimming_pool != None:
            query += " and swimming_pool = {}".format(swimming_pool)
        else:
            query += " and swimming_pool = a.swimming_pool"
        if start_date != None:
            query += " and start_date > {}".format(start_date)
        else:
            query += " and start_date = a.start_date"
        if min_price != None:
            query += " and min_price > {} and max_price < {}".format(
                min_price, max_price)
        else:
            query += " and min_price = a.min_price and max_price = a.max_price"

        if bedroom_num != None:
            query += " and rm.bedroom_num in ("
            for i in bedroom_num:
                query += str(i)
                query += ","
            query = query[0:-1]
            query += ")"

        if bathroom_num != None:
            query += " and rm.bathroom_num in ("
            for i in bathroom_num:
                query += str(i)
                query += ","
            query = query[0:-1]
            query += ")"

        if mean_rate != None:
            query += " and id in (select apartment_id from Rating group by apartment_id having AVG(star) >= {})".format(mean_rate)
        

        cursor = connection.cursor()
        cursor.execute(query)
        r = [dict((cursor.description[i][0], str(value))
                  for i, value in enumerate(row)) for row in cursor.fetchall()]
        try:
            ret = r
        except:
            return Response({"response": {"error": "NONE", "message": "No search result"}, "status": 200},
                            status=status.HTTP_200_OK)
        else:
            return Response(
                {"response": {"error": "OK", "results": ret},
                 "status": 200}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['POST'])
    def addToFavorite(self, request):
        user_id = request.data.get('user', None)
        room_id = request.data.get('room', None)
        cursor = connection.cursor()
        cursor.execute(
            'SELECT * FROM Favorite WHERE user_id = %s AND room_id = %s', [user_id, room_id])
        result_set = cursor.fetchall()
        print(result_set)

        if not result_set:
            cursor.execute('SELECT * FROM User WHERE id = %s', [user_id])
            user_set = cursor.fetchone()
            instance_user = User(
                id=user_set[0], name=user_set[1], password=user_set[2])
            cursor.execute('SELECT * FROM Room WHERE id = %s', [room_id])
            room_set = cursor.fetchone()
            cursor.execute('INSERT INTO Favorite VALUE(%s, %s)',
                           [user_id, room_id])
            return Response(
                {"response": {"error": "OK", "user": user_set[0], "room": room_set[0]},
                 "status": 201}, status=status.HTTP_201_CREATED)

        else:
            return Response({"response": {"error": "You have added this room to Favorite"}, "status": 400},
                            status=status.HTTP_400_BAD_REQUEST)


class FavoriteViewSet(viewsets.ModelViewSet):
    serializer_class = FavoriteSerializer

    @action(detail=False, methods=['POST'])
    def query_all_favorite(self, request):
        user_id = request.data.get('user', None)
        cursor = connection.cursor()
        string = 'SELECT * FROM Favorite WHERE user_id =' + str(user_id)
        print(string)
        cursor.execute(
            'SELECT * FROM Favorite WHERE user_id = %s', [user_id])
        result_set = cursor.fetchall()
        all_rooms = []
        for item in result_set:
            all_rooms.append(item[1])
        return Response(
            {"response": {"error": "OK", "results": all_rooms},
             "status": 201}, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['POST'])
    def deleteFavorite(self, request):
        print(request)
        user_id = request.data.get('user', None)
        room_id = request.data.get('room', None)
        cursor = connection.cursor()
        cursor.execute(
            'SELECT * FROM Favorite WHERE user_id = %s AND room_id = %s', [user_id, room_id])
        result_set = cursor.fetchone()
        print(result_set)

        if result_set:
            cursor.execute('DELETE  FROM Favorite WHERE room_id = %s AND user_id = %s ', [
                result_set[1], result_set[0]])
            return Response(
                {"response": {"error": "OK", "user": user_id, "room": room_id},
                 "status": 201}, status=status.HTTP_201_CREATED)

        else:
            return Response({"response": {"error": "This room is not in favorite list"}, "status": 400},
                            status=status.HTTP_400_BAD_REQUEST)

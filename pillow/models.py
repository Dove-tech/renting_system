# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Apartment(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=30, blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    landlord = models.ForeignKey('Landlord', models.DO_NOTHING, blank=True, null=True)
    gym = models.IntegerField(blank=True, null=True)
    parking = models.IntegerField(blank=True, null=True)
    utility = models.IntegerField(blank=True, null=True)
    laundry = models.IntegerField(blank=True, null=True)
    swimming_pool = models.IntegerField(blank=True, null=True)
    description = models.CharField(max_length=255, blank=True, null=True)
    min_price = models.IntegerField(blank=True, null=True)
    max_price = models.IntegerField(blank=True, null=True)
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'apartment'


class Favorite(models.Model):
    user = models.OneToOneField('User', models.DO_NOTHING, primary_key=True)
    room = models.ForeignKey('Room', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'favorite'
        unique_together = (('user', 'room'),)


class Landlord(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=30, blank=True, null=True)
    email = models.CharField(max_length=50, blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'landlord'


class Photo(models.Model):
    photo_id = models.IntegerField(primary_key=True)
    come_from = models.IntegerField(blank=True, null=True)
    photo_link = models.CharField(max_length=255, blank=True, null=True)
    property_apartment = models.ForeignKey(Apartment, models.DO_NOTHING, blank=True, null=True)
    property_room = models.ForeignKey('Room', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'photo'


class Rating(models.Model):
    user = models.OneToOneField('User', models.DO_NOTHING, primary_key=True)
    apartment = models.ForeignKey(Apartment, models.DO_NOTHING)
    star = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'rating'
        unique_together = (('user', 'apartment'),)


class Room(models.Model):
    id = models.IntegerField(primary_key=True)
    apartment = models.ForeignKey(Apartment, models.DO_NOTHING, blank=True, null=True)
    bedroom_num = models.IntegerField(blank=True, null=True)
    bathroom_num = models.IntegerField(blank=True, null=True)
    price = models.FloatField(blank=True, null=True)
    start_time = models.DateField(blank=True, null=True)
    end_time = models.DateField(blank=True, null=True)
    description = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'room'


class User(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=30, blank=True, null=True)
    password = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user'

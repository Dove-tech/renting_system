from django.db import models


class User(models.Model):
    # id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=30)
    password = models.CharField(max_length=30)


class Rating(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    apartment_id = models.IntegerField()
    star = models.IntegerField()

    class Meta:
        unique_together = ("user_id", "apartment_id")
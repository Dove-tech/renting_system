# Generated by Django 3.2.9 on 2021-11-05 20:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Apartment',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(blank=True, max_length=30, null=True)),
                ('location', models.CharField(blank=True, max_length=255, null=True)),
                ('address', models.CharField(blank=True, max_length=255, null=True)),
                ('landlord_id', models.IntegerField(blank=True, null=True)),
                ('gym', models.IntegerField(blank=True, null=True)),
                ('parking', models.IntegerField(blank=True, null=True)),
                ('utility', models.IntegerField(blank=True, null=True)),
                ('laundry', models.IntegerField(blank=True, null=True)),
                ('swimming_pool', models.IntegerField(blank=True, null=True)),
                ('description', models.CharField(blank=True, max_length=255, null=True)),
            ],
            options={
                'db_table': 'apartment',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Landlord',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(blank=True, max_length=30, null=True)),
                ('email', models.CharField(blank=True, max_length=50, null=True)),
                ('phone', models.CharField(blank=True, max_length=20, null=True)),
            ],
            options={
                'db_table': 'landlord',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Photo',
            fields=[
                ('photo_id', models.IntegerField(primary_key=True, serialize=False)),
                ('come_from', models.IntegerField(blank=True, null=True)),
                ('photo_link', models.CharField(blank=True, max_length=255, null=True)),
                ('property_apartment_id', models.IntegerField(blank=True, null=True)),
                ('property_room_id', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'photo',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('apartment_id', models.IntegerField(blank=True, null=True)),
                ('bedroom_num', models.IntegerField(blank=True, null=True)),
                ('bathroom_num', models.IntegerField(blank=True, null=True)),
                ('price', models.FloatField(blank=True, null=True)),
                ('start_time', models.DateField(blank=True, null=True)),
                ('end_time', models.DateField(blank=True, null=True)),
                ('description', models.CharField(blank=True, max_length=255, null=True)),
            ],
            options={
                'db_table': 'room',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(blank=True, max_length=30, null=True)),
                ('password', models.CharField(blank=True, max_length=50, null=True)),
            ],
            options={
                'db_table': 'user',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Favorite',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.DO_NOTHING, primary_key=True, serialize=False, to='pillow.user')),
            ],
            options={
                'db_table': 'favorite',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Rating',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.DO_NOTHING, primary_key=True, serialize=False, to='pillow.user')),
                ('star', models.FloatField(blank=True, null=True)),
            ],
            options={
                'db_table': 'rating',
                'managed': False,
            },
        ),
    ]

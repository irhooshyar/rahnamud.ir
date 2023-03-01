from django.db import connections

with connections["Fa_DataBase"].cursor() as cursor:
    cursor.execute("delete from django_migrations;")


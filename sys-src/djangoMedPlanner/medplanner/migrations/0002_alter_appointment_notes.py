# Generated by Django 3.2.3 on 2021-05-15 18:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('medplanner', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='notes',
            field=models.TextField(),
        ),
    ]
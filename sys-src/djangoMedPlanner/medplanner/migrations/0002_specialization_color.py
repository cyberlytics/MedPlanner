# Generated by Django 3.2.4 on 2021-07-01 20:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('medplanner', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='specialization',
            name='color',
            field=models.CharField(default='#80cbc4', max_length=7),
        ),
    ]

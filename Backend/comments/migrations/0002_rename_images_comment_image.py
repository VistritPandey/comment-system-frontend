# Generated by Django 4.2.7 on 2023-12-01 15:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('comments', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='comment',
            old_name='images',
            new_name='image',
        ),
    ]
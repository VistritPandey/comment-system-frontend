# Generated by Django 4.2.7 on 2023-12-01 15:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('comments', '0002_rename_images_comment_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='image',
            field=models.URLField(blank=True, null=True),
        ),
    ]
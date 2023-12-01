# comments/management/commands/populate_comments.py
import json
import os
from django.core.management.base import BaseCommand
from comments.models import Comment

class Command(BaseCommand):
    help = 'Populate comments from JSON data'

    def handle(self, *args, **options):
        json_file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'comments.json')

        with open(json_file_path) as f:
            data = json.load(f)
            comments = data.get('comments', [])
            
            for comment_data in comments:
                # Remove the "id" key from comment_data
                comment_data.pop("id", None)
                Comment.objects.create(**comment_data)

        self.stdout.write(self.style.SUCCESS('Comments successfully populated'))

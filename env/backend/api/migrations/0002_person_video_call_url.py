# Generated by Django 5.1.1 on 2024-09-17 08:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='person',
            name='video_call_url',
            field=models.CharField(blank=True, max_length=1000, null=True),
        ),
    ]

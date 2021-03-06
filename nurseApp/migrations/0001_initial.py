# Generated by Django 2.2.12 on 2020-05-20 12:42

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Patient',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(help_text='Name and last name of the patient.', max_length=100, verbose_name='Name and Last name')),
                ('age', models.PositiveSmallIntegerField(help_text="specify the patient's age.", validators=[django.core.validators.MaxValueValidator(150)], verbose_name='Age')),
                ('custom_id', models.CharField(help_text='Later he/she will use it to access his/her historical data (e.g. ID Card number or Passport number)', max_length=20, validators=[django.core.validators.RegexValidator('^[0-9a-zA-Z]*$', 'Only alphanumeric characters are allowed.')], verbose_name='ID')),
                ('status', models.CharField(default='active', max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Record',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('id_responsible', models.CharField(default='', max_length=50)),
                ('id_patient', models.CharField(default='', max_length=50)),
                ('bp_systolic', models.PositiveSmallIntegerField(help_text='Systolic blood pressure. (upper #) - Normal: < 120', validators=[django.core.validators.MaxValueValidator(300)])),
                ('bp_diastolic', models.PositiveSmallIntegerField(help_text='Diastolic blood pressure. (lower #) - Normal: < 80', validators=[django.core.validators.MaxValueValidator(300)])),
                ('heart_rate', models.PositiveSmallIntegerField(help_text='Beats per minutes. (bpm) - Normal: 60 to 100 bmp at rest', validators=[django.core.validators.MaxValueValidator(300)])),
                ('ts', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]

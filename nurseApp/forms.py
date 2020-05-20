from django import forms
from django.forms import ModelForm
from nurseApp.models import *

class PatientForm(ModelForm):
    class Meta:
        model = Patient
        exclude = ['status']

        widgets = {
            'name': forms.TextInput(
                attrs={'class': 'form-control',
                       'placeholder': 'Name and Last name',
                       'required': 'required'}
            ),
            'age': forms.NumberInput(
                attrs={'class': 'form-control',
                       'placeholder': 'Age',
                       'required': 'required'}
            ),
            'custom_id': forms.TextInput(
                attrs={'class': 'form-control',
                       'placeholder': 'Some Personal ID',
                       'pattern':'[0-9A-Za-z]+',
                       'required': 'required'}
            ),
        }

class RecordForm(ModelForm):
    class Meta:
        model = Record
        exclude = ['id_responsible', 'ts']

        widgets = {
            'id_patient': forms.TextInput(
                attrs={'class': 'form-control',
                       'required': 'required',
                       'hidden': 'hidden'}
            ),'bp_systolic': forms.NumberInput(
                attrs={'class': 'form-control',
                       'required': 'required'}
            ),
            'bp_diastolic': forms.NumberInput(
                attrs={'class': 'form-control',
                       'required': 'required'}
            ),
            'heart_rate': forms.NumberInput(
                attrs={'class': 'form-control',
                       'required': 'required'}
            ),
        }
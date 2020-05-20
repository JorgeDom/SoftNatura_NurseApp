from django.urls import path
from nurseApp.views import *

urlpatterns = [
    path('', index, name='index'),
    path('add_patient/', add_patient, name='add_patient'),
    path('view_patients/', view_patients, name='view_patients'),
    path('patient/<str:patient_id>/', edit_patient_profile),
    path('history/<str:patient_id>/', view_historical_data),

    # urls for Datatable/Graphs get functions
    path('get_patients_datatable/', get_patients_datatable, name='get_patients_datatable'),
    path('get_patient_historical_data/', get_patient_historical_data, name='get_patient_historical_data'),

    # urls for other functions
    path('add_vital_signs/', add_vital_signs, name='add_vital_signs'),
    path('delete_vital_signs_record/', delete_vital_signs_record, name='delete_vital_signs_record'),
    path('change_patient_status/', change_patient_status, name='change_patient_status'),
    path('delete_patient_profile/', delete_patient_profile, name='delete_patient_profile'),
]

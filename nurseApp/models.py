from djongo import models
from django.core.validators import MaxValueValidator, RegexValidator

class Record(models.Model):
    id_responsible = models.CharField(default='',
                                      max_length=50,
                                      blank=False)

    id_patient = models.CharField(default='',
                                  max_length=50,
                                  blank=False)

    bp_systolic = models.PositiveSmallIntegerField(blank=False,
                                                   help_text="Systolic blood pressure. (upper #) - Normal: < 120",
                                                   validators=[MaxValueValidator(300)])

    bp_diastolic = models.PositiveSmallIntegerField(blank=False,
                                                    help_text="Diastolic blood pressure. (lower #) - Normal: < 80",
                                                    validators=[MaxValueValidator(300)])

    heart_rate = models.PositiveSmallIntegerField(blank=False,
                                                  help_text="Beats per minutes. (bpm) - Normal: 60 to 100 bmp at rest",
                                                  validators=[MaxValueValidator(300)])

    ts = models.DateTimeField(auto_now_add=True, blank=False)

    def __str__(self):
        return self.ts, self.id_patient


class Patient(models.Model):
    alphanumeric = RegexValidator(r'^[0-9a-zA-Z]*$', 'Only alphanumeric characters are allowed.')

    name = models.CharField(max_length=100,
                            blank=False,
                            help_text="Name and last name of the patient.",
                            verbose_name="Name and Last name")

    age = models.PositiveSmallIntegerField(blank=False,
                                           help_text="specify the patient\'s age.",
                                           verbose_name='Age',
                                           validators=[MaxValueValidator(150)])
    # it should be unique. The index is create in the BD directly and not with the model
    custom_id = models.CharField(max_length=20,
                                 blank=False,
                                 help_text="Later he/she will use it to access his/her historical data "
                                           "(e.g. ID Card number or Passport number)",
                                 verbose_name='ID',
                                 validators=[alphanumeric])

    status = models.CharField(max_length=10,
                              default='active')

    def __str__(self):
        return self.name
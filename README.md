# SoftNatura_NurseApp
App written with Django Web Framework and a NoSQL DataBase for Software Natura Challenge

## Getting Started
This tutorial intent to guide the user through the tasks of installation and set up for local usage of the present project.

## NurseApp Features
- User authentication (for Nurses), allows to:
  - Register a Patient.
  - Edit a patient's profile.
  - Delete a patient's profile and all records related.
  - Register the patient's vital signs.
  - Edit a specific vital sign record.
  - Delete a vital sign record.
  - See the Graph containing the patient's historical data.
  - First glance evaluation after a vital signs data is registered (Blood pressure and Heart rate)
- Patient's Status
  - Allow nurses to change the status of the patient.
  - If the patient is **active** the patient's profile can be edited or deleted, and vital signs registered.
  - If the patient is **inactive** the patient's profile appears at the bottom of the list, and let the patients with 
  the most urgent priority appear at the top of the list.
- Patient's historical data
  - In the login screen the patient can access his o her historical data, providing the personal ID 
  given to the nurse at the time of the registration.
  - The historical data can be seen if the patient is either **active** or **inactive**

## Prerequisites
- For the App to run, only `Python 3.7.2` is needed.
- For the DataBase, no set up is required. The App uses a **Django-MongoDB** backend for query transactions.
  All the data is saved in the cloud thanks to `MongoDB Atlas`.

## Preparation and Start
### Instaling a virtual environment
For the containment, installation, and usage of specific python packages for each project, 
a virtual environment comes handy, allowing to not install packages globally and affect the behavior of other projects.
Then, the first step is to install the virtualenv python package.
> python3 -m pip install virtualenv
### Creating a virtual environment 
The second step is to create a virtual environment where all the packages for the project will be installed. To do that,
first we have to move to the folder where the project is and access it. (the file `manage.py` should be visible), 
then type the next command line.
> python3 -m venv myenv
### Activating the virtual environment
The next step is to activate the recently created environment (a new folder with the name `myenv` just appeared in the folder where
we are working). To do the activation, type:
> .\myenv\Scripts\activate

A `(myenv)` should appear at the beginning of the command line. That means we are currently working in a fresh virtual environment
and ready to install all the needed packages.
In case we need to deactivate and exit the virtual environment, type:
> deactivate
### Installing all requirements
Now that the virtual environment is active and ready to use, all required packages can be installed, achieve that by typing the next line:
>python3 -m pip install -r requirenments.txt

### Database Initalization
This step is not necessary  because the database is all set up in the cloud, thanks to `MongoDB Atlas` and its free-hosting basic 
service for small clusters.

### Server start
Final step. After the installation of the required packages, everything is ready for the server to start. 
For that porpuse, run the following command:
> python3 manage.py runserver

Now, in a web browser, copy the next URL:
> http://127.0.0.1:8000/login/

The Login screen should appear and look like this:
![Login](/images/login.PNG)

Use the following credentials for testing:
- As a nurse: `username: nurse1` - `password: challenge1`
- As a patient: `personal ID: 123456`

### Other Examples
- Form to register a patient
![Register a Patient](/images/register_a_patient.PNG)

- List of patient ordered by the priority based on their blood pressure data:
![List of Patients](/images/list_of_patients.PNG)

- Graph and Table showing a patient historical data:
![Patient Historical Data](/images/patient_History_data.PNG)


## Built With
[Django](https://www.djangoproject.com/) - Python Web Framework

[MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Cloud Database Service

[DataTables](https://datatables.net/) - For the tables

[HighCharts](https://www.highcharts.com/) - For the Graph

## Author
- **Jorge Dominguez**

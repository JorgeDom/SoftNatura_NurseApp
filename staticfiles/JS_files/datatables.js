/**
 * Created by JorgeD on 05/05/2020.
 */
$(document).ready(function(){
    // template: nurseApp/view_patients.html
    $('#patientsList').DataTable({
        "scrollCollapse": true,
        "bInfo": true,
        "order": [[0, "desc"]],
        "language": {
             "processing": "Loading records..."
        },
        "ajax": "/get_patients_datatable/",
        "columns": [
            { "data": "priority"},
            { "data": "name" },
            { "data": "age" },
            { "data": "custom_id" },
            { "data": "date" },
            { "data": "blood_pressure" },
            { "data": "heart_rate" },
            { "data": "tasks" },
            { "data": "status" }
        ],
        "columnDefs": [
            {"className": "tasks", "targets": [7]}
        ]
    });

    if (window.location.pathname.search('/history/') == 0){
        var patient_id = $('input#input_patient_id_historical_data').val();
        // template: nurseApp/view_patients.html
        $('#tableHistoricalDataNurse').DataTable({
            "scrollCollapse": true,
            "bInfo": true,
            "order": [[0, "desc"]],
            "language": {
                 "processing": "Loading records..."
            },
            "ajax": {
                url: '/get_patient_historical_data/',
                type: 'POST',
                data:{
                    patient_id: patient_id,
                    petitioner: 'table'
                }
            },
            "columns": [
                { "data": "date"},
                { "data": "bp" },
                { "data": "bp_category" },
                { "data": "hr" },
                { "data": "hr_info" },
                { "data": "tasks" }
            ],
             "columnDefs": [
                {"className": "tasks", "targets": [5]}
        ]
        });

        // template: nurseApp/view_patients.html
        $('#tableHistoricalDataPatient').DataTable({
            "scrollCollapse": true,
            "bInfo": true,
            "order": [[0, "desc"]],
            "language": {
                 "processing": "Loading records..."
            },
            "ajax": {
                url: '/get_patient_historical_data/',
                type: 'POST',
                data:{
                    patient_id: patient_id,
                    petitioner: 'table'
                }
            },
            "columns": [
                { "data": "date"},
                { "data": "bp" },
                { "data": "bp_category" },
                { "data": "hr" },
                { "data": "hr_info" }
            ]
        });
    }
});
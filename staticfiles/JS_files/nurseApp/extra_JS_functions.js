/**
 * Created by JorgeD on 14/05/2020.
 */

$(document).ready(function(){

    $(window).on('load', function(){
        drawHistoricalDataGraph();
    });

    var alert_view_patients = $("div#alerts");
    alert_view_patients.on("close.bs.alert", function () {
          alert_view_patients.hide();
          return false;
    });

    $('a#btnViewHistoricalData').on('click', function(){
        var patient_id = $('input#patient_custom_id').val();

        if(patient_id != ''){
            console.log(patient_id);
            $('a#btnViewHistoricalData').attr("href", "../history/" + patient_id);
        }else{
            console.log('por favor degite su id')
        }

    });

    // MODAL: modalAddVitalSigns
    var modalAddVitalSigns = $('#modalAddVitalSigns');
    modalAddVitalSigns.bind('show.bs.modal', function(event){
        var patient_id = $(event.relatedTarget).attr('data-patient_id');
        var patient_name = $(event.relatedTarget).attr('data-patient_name');
        var patient_custom_id = $(event.relatedTarget).attr('data-patient_custom_id');
        var record_date = $(event.relatedTarget).attr('date-record_date');

        $('input#id_bp_systolic').trigger('focus');

        var modal = $(this);
        modal.find('input#id_id_patient').val(patient_id);
        modal.find('h6#patient_name').html(patient_name + " (ID: " + patient_custom_id + ")");
    });

    $('#formModalAddVitalSigns').on('submit', function(event){
        event.preventDefault();

        addVitalSigns($(this));
    });

    modalAddVitalSigns.bind('hide.bs.modal', function(event){
        var modal = $(this);

        modal.find('input#id_id_patient').val('');
        modal.find('input#id_bp_systolic').val('');
        modal.find('input#id_bp_diastolic').val('');
        modal.find('input#id_heart_rate').val('');
    });

    //MODAL: modalEditVitalSigns
    var modalEditVitalSigns = $('#modalEditVitalSigns');
    modalEditVitalSigns.bind('show.bs.modal', function(event){
        var record_id = $(event.relatedTarget).attr('data-record_id');
        var record_date = $(event.relatedTarget).attr('data-record_date');

        var modal = $(this);
        modal.find('input#id_id_record').val(record_id);
        modal.find('h6#record_date').html(record_date);
    });

    $('#formModalEditVitalSigns').on('submit', function(event){
        event.preventDefault();

        editVitalSigns($(this));
    });

    modalEditVitalSigns.bind('hide.bs.modal', function(event){
        var modal = $(this);

        modal.find('input#id_id_record').val('');
        modal.find('input#id_bp_systolic').val('');
        modal.find('input#id_bp_diastolic').val('');
        modal.find('input#id_heart_rate').val('');
    });

    // MODAL: modalDeleteVitalSignsRecord
    $('#modalDeleteVitalSignsRecord').bind('show.bs.modal', function(event){
        var record_id = $(event.relatedTarget).attr('data-record_id');
        var record_date = $(event.relatedTarget).attr('data-record_date');


        var modal = $(this);
        modal.find('input#record_id').val(record_id);
        modal.find('span#record_date').html(record_date);
    });

    $('#formModalDeleteVitalSignsRecord').on('submit', function(event){
        event.preventDefault();

        deleteVitalSignsRecord($(this));
    });

    // MODAL: modalDeleteStatus
    $('#modalChangeStatus').bind('show.bs.modal', function(event){
        var patient_id = $(event.relatedTarget).attr('data-patient_id');
        var patient_name = $(event.relatedTarget).attr('data-patient_name');
        var patient_custom_id = $(event.relatedTarget).attr('data-patient_custom_id');

        var modal = $(this);
        modal.find('input#patient_id').val(patient_id);
        modal.find('span#patient_name').html(patient_name + " (ID: " + patient_custom_id + ")");
    });

    $('#formModalChangeStatus').on('submit', function(event){
        event.preventDefault();

        changePatientStatus($(this));
    });

    // MODAL: modalDeleteProfile
    $('#modalDeleteProfile').bind('show.bs.modal', function(event){
        var patient_id = $(event.relatedTarget).attr('data-patient_id');
        var patient_name = $(event.relatedTarget).attr('data-patient_name');
        var patient_custom_id = $(event.relatedTarget).attr('data-patient_custom_id');

        var modal = $(this);
        modal.find('input#patient_id').val(patient_id);
        modal.find('span#patient_name').html(patient_name + " (ID: " + patient_custom_id + ")");
    });

    $('#formModalDeleteProfile').on('submit', function(event){
        event.preventDefault();

        deletePatientProfile($(this));
    });
});

function drawHistoricalDataGraph(){
    var patient_id = $('input#input_patient_id_historical_data').val();

    if (window.location.pathname.search('/history/') == 0){
        $.ajax({
            url:"/get_patient_historical_data/",
            type:"POST",
            data:{
                petitioner:'graphs',
                patient_id: patient_id},
            success: function(data){

                Highcharts.stockChart('graphHistoricalData', {
                    zoomType: 'xy',
                    rangeSelector: {
                        selected: 4
                    },

                    title: {
                        text: 'Dialy record of Vital Signs'
                    },

                    yAxis: [{ // Primary yAxis
                        labels: {
                            align: 'right',
                            x: -3
                        },
                        title: {
                            text: 'Blood Pressure'
                        },
                        height: '60%',
                        lineWidth: 2,
                        resize: {
                            enabled: true
                        }
                    }, {
                        labels: {
                            align: 'right',
                            x: -3
                        },
                        title: {
                            text: 'Heart Rate'
                        },
                        top: '65%',
                        height: '35%',
                        offset: 0,
                        lineWidth: 2,
                        resize: {
                            enabled: true
                        }
                    }],

                    tooltip: {
                        shared: true
                    },

                    plotOptions: {
                        series: {
                            showInNavigator: true
                        }
                    },

                    series: [{
                        type: 'column',
                        name: 'Heart Rate',
                        data: data['hr'],
                        yAxis:1,
                        tooltip: {
                            valueSuffix: ' bpm'
                        },
                        dataGrouping: {
                            units: [[
                                'week',                         // unit name
                                [1]                             // allowed multiples
                            ], [
                                'month',
                                [1, 2, 3, 4, 6]
                            ]]
                        }
                    },{
                        type: 'spline',
                        name: 'Blood Pressure (Systolic)',
                        data: data['bp_sys'],
                        dataGrouping: {
                            units: [[
                                'week',                         // unit name
                                [1]                             // allowed multiples
                            ], [
                                'month',
                                [1, 2, 3, 4, 6]
                            ]]
                        }
                    },{
                        type: 'spline',
                        name: 'Blood Pressure (Diastolic)',
                        data: data['bp_dias'],
                        dataGrouping: {
                            units: [[
                                'week',                         // unit name
                                [1]                             // allowed multiples
                            ], [
                                'month',
                                [1, 2, 3, 4, 6]
                            ]]
                        }
                    }]
                });
            },
            error: function(){}
        });
    }
}

function addVitalSigns(form){
    var patient_id = form.find('input#id_id_patient').val();
    var bp_systolic = form.find('input#id_bp_systolic').val();
    var bp_diastolic = form.find('input#id_bp_diastolic').val();
    var heart_rate = form.find('input#id_heart_rate').val();

    var alert_view_patients = $('div#alerts');
    var alert_modal_add_vital_signs = $('div#results');

    $.ajax({
        url:'/add_vital_signs/',
        type: "POST",
        data: {
            patient_id: patient_id,
            bp_systolic: bp_systolic,
            bp_diastolic: bp_diastolic,
            heart_rate: heart_rate,
            task: 'addVitalSign'
        },
        success: function(json){
            alert_view_patients.addClass('alert alert-' + json['type'] + ' fade show').show();
            alert_view_patients.html("<button type='button' class='close' data-dismiss='alert'>&times;</button>" +
                       "<i class='fas fa-check'></i> &ensp;" + json['text']);

            $('#modalAddVitalSigns').modal('hide');

            if (window.location.pathname.search('/history/') == 0){
                $('#tableHistoricalDataNurse').DataTable().ajax.reload();
                drawHistoricalDataGraph();
            }else{
                $('#patientsList').DataTable().ajax.reload();
            }

            console.log(json['text']);  //sanity check
        },
        error: function(xhr,errmsg,err){
            alert_modal_add_vital_signs.addClass('alert alert-warning fade show').show();
            alert_modal_add_vital_signs.html("<button type='button' class='close' data-dismiss='alert'>&times;</button>" +
                       "<i class='fas fa-exclamation-triangle'></i> &ensp; Oops! We have encountered an error: " + errmsg);

            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
        }
    });
}

function editVitalSigns(form){
    var record_id = form.find('input#id_id_record').val();
    var bp_systolic = form.find('input#id_bp_systolic').val();
    var bp_diastolic = form.find('input#id_bp_diastolic').val();
    var heart_rate = form.find('input#id_heart_rate').val();

    var alert_view_patients = $('div#alerts');
    var alert_modal_add_vital_signs = $('div#results');

    console.log('aqui estamos');

    $.ajax({
        url:'/add_vital_signs/',
        type: "POST",
        data: {
            record_id: record_id,
            bp_systolic: bp_systolic,
            bp_diastolic: bp_diastolic,
            heart_rate: heart_rate,
            task: 'editVitalSign'
        },
        success: function(json){
            alert_view_patients.addClass('alert alert-' + json['type'] + ' fade show').show();
            alert_view_patients.html("<button type='button' class='close' data-dismiss='alert'>&times;</button>" +
                       "<i class='fas fa-check'></i> &ensp;" + json['text']);

            $('#modalEditVitalSigns').modal('hide');

            if (window.location.pathname.search('/history/') == 0){
                $('#tableHistoricalDataNurse').DataTable().ajax.reload();
                drawHistoricalDataGraph();
            }else{
                $('#patientsList').DataTable().ajax.reload();
            }

            console.log(json['text']);  //sanity check
        },
        error: function(xhr,errmsg,err){
            alert_modal_add_vital_signs.addClass('alert alert-warning fade show').show();
            alert_modal_add_vital_signs.html("<button type='button' class='close' data-dismiss='alert'>&times;</button>" +
                       "<i class='fas fa-exclamation-triangle'></i> &ensp; Oops! We have encountered an error: " + errmsg);

            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
        }
    });
}

function deleteVitalSignsRecord(form){
    var record_id = form.find('input#record_id').val();

    var alert = $('div#alerts');

    $.ajax({
        url:'/delete_vital_signs_record/',
        type: "POST",
        data: {
            record_id: record_id
        },
        success: function(json){
            $('#modalDeleteVitalSignsRecord').modal('hide');
            $('#tableHistoricalDataNurse').DataTable().ajax.reload();
            drawHistoricalDataGraph();

            alert.addClass('alert alert-' + json['type'] + ' fade show').show();
            alert.html("<button type='button' class='close' data-dismiss='alert'>&times;</button>" +
                       "<i class='fas fa-check'></i> &ensp;" + json['text']);

            console.log(json['text']);  //sanity check
        },
        error: function(xhr,errmsg,err){
            alert.addClass('alert alert-warning fade show').show();
            alert.html("<button type='button' class='close' data-dismiss='alert'>&times;</button>" +
                       "<i class='fas fa-exclamation-triangle'></i> &ensp; Oops! We have encountered an error: " + errmsg);

            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
        }
    });
}

function changePatientStatus(form){
    var patient_id = form.find('input#patient_id').val();
    var patient_status = form.find('input#patient_status').val();

    var alert_view_patients = $('div#alerts');

    $.ajax({
        url:'/change_patient_status/',
        type: "POST",
        data: {
            patient_id: patient_id
        },
        success: function(json){
            $('#modalChangeStatus').modal('hide');
            $('#patientsList').DataTable().ajax.reload();

            alert_view_patients.addClass('alert alert-' + json['type'] + ' fade show').show();
            alert_view_patients.html("<button type='button' class='close' data-dismiss='alert'>&times;</button>" +
                       "<i class='fas fa-check'></i> &ensp;" + json['text']);

            console.log(json['text']);  //sanity check
        },
        error: function(xhr,errmsg,err){
            alert_view_patients.addClass('alert alert-warning fade show').show();
            alert_view_patients.html("<button type='button' class='close' data-dismiss='alert'>&times;</button>" +
                       "<i class='fas fa-exclamation-triangle'></i> &ensp; Oops! We have encountered an error: " + errmsg);

            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
        }
    });
}

function deletePatientProfile(form){
    var patient_id = form.find('input#patient_id').val();

    var alert_view_patients = $('div#alerts');

    $.ajax({
        url:'/delete_patient_profile/',
        type: "POST",
        data: {
            patient_id: patient_id
        },
        success: function(json){
            $('#modalDeleteProfile').modal('hide');
            $('#patientsList').DataTable().ajax.reload();

            alert_view_patients.addClass('alert alert-' + json['type'] + ' fade show').show();
            alert_view_patients.html("<button type='button' class='close' data-dismiss='alert'>&times;</button>" +
                       "<i class='fas fa-check'></i> &ensp;" + json['text']);

            console.log(json['text']);  //sanity check
        },
        error: function(xhr,errmsg,err){
            alert_view_patients.addClass('alert alert-warning fade show').show();
            alert_view_patients.html("<button type='button' class='close' data-dismiss='alert'>&times;</button>" +
                       "<i class='fas fa-exclamation-triangle'></i> &ensp; Oops! We have encountered an error: " + errmsg);

            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
        }
    });
}

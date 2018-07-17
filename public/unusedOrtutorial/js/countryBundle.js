var $ = require('jquery');

$(document).ready(function(){
    $('#listCitiesBtn').click(listCities);
    $('#formBtn').click(sendEmail);
    $('#sendDataBtn').click(sendData);
    $('#countrySelect').change(postCountry);

    var select = document.getElementById('countrySelect');

    $.get('http://localhost:3000/country/country', function (data) {
        for (var i = 0; i<data.length; i++){
            var option = document.createElement('md-option');
            option.value = data[i];
            option.innerHTML = data[i];
            select.appendChild(option);
        }
    });
});
/*
$(document).on('unload', function () {
   document.cookie = 'emailAddress=""';-1;path="/";
});
$(document).on('beforeunload',function(){
    document.cookie = 'emailAddress=""';-1;path="/";
});
*/
function listCities() {
    $.get('http://localhost:3000/country/city', function (data) {
        console.log("asdasd");
        console.log(data);
        var table = document.createElement('table');
        table.classList.add('table');
        for (var i = 0; i < data.length; i++) {
            var row = document.createElement('tr');
            var city = document.createElement('td');
            city.append(data[i]);//data[i].plateNo;

            row.appendChild(city);

            table.appendChild(row);
        }
        $('#content').append(table);
    });
}
function sendEmail(){
    var emailData = document.forms["form"]["email"].value;
    $.ajax({
        type : "POST",
        contentType : "application/x-www-form-urlencoded",
        url : "http://localhost:3000/country/email",
        data : {email:emailData},
        dataType :'www-form-urlencoded',
        success : function() {
        },
        error : function(e) {
            console.log("ERROR: ", e);
        }
    });
}

function getCities(data) {
    var select = document.getElementById('citySelect');
    console.log('getCities');
    var exists = false;
    var options;
    //$.get('/country/city', function (data) {
        for (var i = 0; i < data.length; i++) {
            if(document.getElementById(data[i]+'cityID') === null) {
                    var option = document.createElement('option');
                    option.id = data[i]+'cityID';
                    option.value = data[i];
                    option.innerHTML = data[i];
                    select.appendChild(option);
            }
        }
    //});
}

function postCountry() {
    var countryData = document.forms["dataForm"]["countrySelect"].value;

    $('#citySelect').empty();

    $.ajax({
        type : "POST",
        contentType : "application/x-www-form-urlencoded",
        url : "http://localhost:3000/country/city",
        data : {country:countryData},
        dataType :'json',
        //dataType :'www-form-urlencoded',
        success : function(response) {
            console.log('Success: ' + response);
            getCities(response);
        },
        error : function(e) {
            console.log("ERROR: ", e);
        }
    });
}

function sendData() {
    var emailData = document.forms["dataForm"]["emailData"].value;
    var countryData = document.forms["dataForm"]["countrySelect"].value;
    var cityData = document.forms["dataForm"]["citySelect"].value;
    $.ajax({
        type: "POST",
        contentType: "application/x-www-form-urlencoded",
        url: "http://localhost:3000/country/data",
        data: {email: emailData,country:countryData,city: cityData},
        dataType: 'www-form-urlencoded',
        success: function () {
        },
        error: function (e) {
            console.log("ERROR: ", e);
        }
    });
}

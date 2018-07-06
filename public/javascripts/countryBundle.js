var $ = require('jquery');

$(document).ready(function(){
    alert('hello world');
    $('#listCitiesBtn').click(listCities);
    $('#formBtn').click(sendEmail);
    $('#sendDataBtn').click(sendData);
    $('#countrySelect').change(postCountry);

    var select = document.getElementById('countrySelect');

    $.get('/country/country', function (data) {
        for (var i = 0; i<data.length; i++){
            var option = document.createElement('option');
            option.value = data[i];
            option.innerHTML = data[i];
            select.appendChild(option);
        }
    });
});

function listCities() {
    $.get('/country/city', function (data) {
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
        url : window.location + "country/email",
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
    //$.get('/country/city', function (data) {
        for (var i = 0; i < data.length; i++) {
            var option = document.createElement('option');
            option.value = data[i];
            option.innerHTML = data[i];
            select.appendChild(option);
        }
    //});
}

function postCountry() {
    var countryData = document.forms["dataForm"]["countrySelect"].value;

    $.ajax({
        type : "POST",
        contentType : "application/x-www-form-urlencoded",
        url : window.location + "country/city",
        data : {country:countryData},
        dataType :'www-form-urlencoded',
        success : function(response) {
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
        url: window.location + "country/data",
        data: {email: emailData,country:countryData,city: cityData},
        dataType: 'www-form-urlencoded',
        success: function () {
        },
        error: function (e) {
            console.log("ERROR: ", e);
        }
    });
}

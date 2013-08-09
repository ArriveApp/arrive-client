
function populateSomeDropdown(dropDown, options) {
    console.log(options);
    $.each(options, function (index, option) {
        console.log(option);
        console.log(option.id);
        $(dropDown).append('<option value=\"' + option.id + '\">' + option.name + '</option>');
    });
}

function makeRequest(model_url) {
    var server_url = "http://localhost:3000";

    $.get(server_url + model_url, function(stringResponse) {
        console.log(stringResponse);
        populateSomeDropdown('#schoolDropdown', stringResponse);
    });
}

function selectSchool(){
    var schoolId = $('#schoolDropdown').val();
}
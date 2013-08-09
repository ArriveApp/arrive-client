
function populateSchoolDropdown(schools) {
    console.log(schools);
    $.each(schools, function (index, school) {
        console.log(school);
        console.log(school.id);
        $('#schoolDropdown').append('<option value=\"' + school.id + '\">' + school.name + '</option>');
    });
}

function makeRequest() {
    var server_url = "http://localhost:3000";
    var school_url = "/schools/all";

    $.get(server_url + school_url, function(stringResponse) {
        console.log(stringResponse);
        populateSchoolDropdown(stringResponse);
    });
}

function selectSchool(){
    var schoolId = $('#schoolDropdown').val();
}
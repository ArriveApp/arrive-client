function populateCourseDropdown(courses) {
    console.log(courses);
    $.each(courses, function (index, course) {
        debugger;
        console.log(course);
        console.log(course.id);
        $('#courseDropdown').append('<option value=\"' + course.id + '\">' + course.name + '</option>');
    });
}

$(document).ready(function(){
    makeRequest();
});

function makeRequest() {
    var server_url = "http://localhost:3000";
    var course_url = "/course/4";

    $.get(server_url + course_url, function(stringResponse) {
        console.log(stringResponse);
        populateCourseDropdown(stringResponse);
    });
}

function selectSchool(){
    var courseId = $('#courseDropdown').val();
}
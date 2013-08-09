function populateCourseDropdown(courses) {
    console.log(courses);
    $.each(courses, function (index, course) {
        console.log(course);
        console.log(course.id);
        $('#courseDropdown').append('<option value=\"' + course.id + '\">' + course.name + '</option>');
    });
}

function makeCoursesRequest(model_url) {
    var server_url = "http://localhost:3000";
    
    $.get(server_url + model_url + ".json", function(stringResponse) {
        console.log(stringResponse);
        populateCourseDropdown(stringResponse);
    });
}

function selectSchool(){
    var courseId = $('#courseDropdown').val();
}
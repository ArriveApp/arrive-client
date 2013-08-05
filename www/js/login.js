
$(document).ready(function(){
    $('#studentLogIn').click(function() {
        makeRequest();
    });
});

function makeRequest() {
    var server_url = "http://localhost:3000";
    var school_url = "users/sign_in";
    var request = new XMLHttpRequest();

    var username = $('email').val();
    var password = $('id').val();
    var user_info = 'username=' + username + '&password=' + password;

    var request = new XMLHttpRequest();
    request.open("POST", "http://localhost:3000/users/sign_in", true);
    request.onreadystatechange = function() {//Call a function when the state changes.
        alert(request.response);
        if (request.status == 200) {
            alert("sweet");
        }
    };
    request.send(user_info);
}

function selectSchool(){
    var schoolId = $('#schoolDropdown').val();
}
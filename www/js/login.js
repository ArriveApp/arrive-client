$(document).ready(function () {
    $('#studentLogIn').click(function () {
        makeRequest();
    });
});

function makeRequest() {
    var username = $('email').val();
    var password = $('id').val();
    var user_info = 'username=' + username + '&password=' + password;
    var request = new XMLHttpRequest();

    request.open("POST", "http://localhost:3000/users/sign_in", true);
    request.onreadystatechange = function () {
        alert(request.response);
        if (request.status == 200) {
            alert("sweet");
        }
    };
    request.send(user_info);
}

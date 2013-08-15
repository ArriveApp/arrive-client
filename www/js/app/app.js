var Router = Backbone.Router.extend({
    routes: {
        "": "login",
        "teacher_home": "teacherHome",
        "public_check_in_confirmation": "publicCheckInConfirmation",
        "check_in": "checkIn",
        "check_in_confirmation": "checkInConfirmation",

        "home_multiple": "homeMultiple",
        "location": "schoolLocation",
        'check_in_multiple': "checkInMultiple",
        'confirmation_multiple': "confirmationMultiple"
    },

    login: function () {
        new Arrive.view.Login({el: $("#main")});
    },

    teacherHome: function () {
        new Arrive.view.TeacherHome({
            el: $("#main"),
            session: Arrive.session
        });
    },

    publicCheckInConfirmation: function() {
        new Arrive.view.PublicCheckInConfirmation({
            el: $("#main"),
            session: Arrive.session,
            courseName: Arrive.courseName
        });
    },

    checkIn: function () {
        new Arrive.view.CheckIn({
            el: $("#main"),
            session: Arrive.session
        });
    },

    checkInConfirmation: function () {
        new Arrive.view.CheckInConfirmation({el: $("#main"), courseName: Arrive.courseName});
    }
});

window.Arrive = {
    vent: _.extend({}, Backbone.Events),
    router: new Router(),
    server: "http://localhost:3000",
    currentSchool: null,
    user: null,

    init: function () {
        _.bindAll(this);
        this.addListeners();
        this.navigateLogin();
    },

    addListeners: function () {
        this.vent.on("login", this.navigateLogin);
        this.vent.on("login-complete", this.loginComplete);
        this.vent.on('public-check-in-complete', this.publicCheckInComplete);
        this.vent.on('teacher-home', this.navigateTeacherHome);



        this.vent.on("check-in", this.navigateCheckIn);
        this.vent.on("check-in-complete", this.checkInComplete);
        this.vent.on("home-multiple", this.navigateHomeMultiple);
        this.vent.on("school-location", this.navigateSchoolLocation);
        this.vent.on("check-in-multiple", this.navigateCheckInMultiple);
        this.vent.on("confirmation-multiple", this.navigateConfirmationMultiple);
    },
    navigateLogin: function () {
        this.router.navigate("", {trigger: true});
    },

    loginComplete: function (session) {
        Arrive.session = session;
        if (session.get('isTeacher')) {
            this.navigateTeacherHome();
        } else {
            this.navigateCheckIn();
        }
    },

    publicCheckInComplete: function (courseName) {
        Arrive.courseName = courseName;
        this.router.navigate("public_check_in_confirmation", {trigger: true});
    },

    navigateTeacherHome: function () {
        this.router.navigate("teacher_home", {trigger: true});
    },

    navigateCheckIn: function () {
        this.router.navigate("check_in", {trigger: true});
    },

    checkInComplete: function (courseName) {
        Arrive.courseName = courseName;
        this.router.navigate("check_in_confirmation", {trigger: true});
    }
}

// Utilities

window.utils = {
    url: function (path) {
        return Arrive.server + '/api' + path;
    }
}

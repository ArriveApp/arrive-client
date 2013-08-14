var Router = Backbone.Router.extend({
    routes: {
        "": "index",
        "login": "login",
        "check_in": "checkIn",
        "new_class": "newClass",
        "home_multiple": "homeMultiple",
        "location": "schoolLocation",
        'check_in_multiple': "checkInMultiple",
        'confirmation_multiple': "confirmationMultiple"
    },

    index: function () {
        new Arrive.view.MainView({el: $("#main")});
    },

    login: function () {
        new Arrive.view.Login({el: $("#main")});
    },

    checkIn: function () {
        new Arrive.view.CheckIn({
            el: $("#main"),
            session: Arrive.session
        });
    },

    newClass: function () {
        new Arrive.view.NewClass({el: $("#main")});
    },

    homeMultiple: function () {
        new Arrive.view.HomeMultiple({el: $("#main")});
    },

    schoolLocation: function () {
        new Arrive.view.SchoolLocation({
            el: $("#main"),
            school: Arrive.currentSchool
        });
    },

    checkInMultiple: function () {
        new Arrive.view.ConfirmationMultiple({
            el: $("#main"),
            school: Arrive.currentSchool
        });
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
    },

    addListeners: function () {
        this.vent.on("navigate:login", this.navigateLogin);
        this.vent.on("login-complete", this.loginComplete);
        this.vent.on("navigate:check-in", this.navigateCheckIn);
        this.vent.on("navigate:new-class", this.navigateNewClass);
        this.vent.on("navigate:home-multiple", this.navigateHomeMultiple);
        this.vent.on("navigate:school-location", this.navigateSchoolLocation);
        this.vent.on("navigate:check-in-multiple", this.navigateCheckInMultiple);
        this.vent.on("navigate:confirmation-multiple", this.navigateConfirmationMultiple);
    },

    navigateLogin: function () {
        this.router.navigate("login", {trigger: true});
    },

    loginComplete: function(session) {
        Arrive.session = session;
    },

    navigateCheckIn: function () {
        this.router.navigate("check_in", {trigger: true});
    },

    navigateNewClass: function () {
        this.router.navigate("new_class", {trigger: true});
    },

    navigateHomeMultiple: function () {
        this.router.navigate("home_multiple", {trigger: true});
    },

    navigateSchoolLocation: function (selectedSchool) {
        this.currentSchool = selectedSchool;
        this.router.navigate("location", {trigger: true});
    },

    navigateCheckInMultiple: function (selectedSchool) {
        this.currentSchool = selectedSchool;
        this.router.navigate("check_in_multiple", {trigger: true});
    },

    navigateConfirmationMultiple: function (selectedSchool) {
        this.currentSchool = selectedSchool;
        this.router.navigate("confirmation_multiple", {trigger: true});
    }
}

// Utilities

window.utils = {
    url: function (path) {
        return Arrive.server + '/api' + path;
    }
}
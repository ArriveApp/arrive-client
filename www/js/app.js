var Router = Backbone.Router.extend({
    routes: {
        "": "index",
        "home_personal": "homePersonal",
        "login": "login",
        "check_in": "checkIn",
        "new_class": "newClass",
        "home_multiple": "homeMultiple",
        "location": "schoolLocation",
        'check_in_multiple': "checkInMultiple",
        'confirmation_multiple': "confirmationMultiple"
    },

    index: function () {
        new MainView({el: $("#main")});
    },

    homePersonal: function () {
        new HomePersonal({el: $("#main")});
    },

    login: function () {
        new CheckIn({el: $("#main")});
    },

    checkIn: function () {
        new NewClass({el: $("#main")});
    },

    newClass: function () {
        new CheckIn({el: $("#main")});
    },

    homeMultiple: function () {
        new HomeMultiple({el: $("#main")});
    },

    schoolLocation: function () {
        new SchoolLocation({el: $("#main")});
    },

    checkInMultiple: function () {
        new ConfirmationMultiple({el: $("#main")});
    }
});

var MainView = Backbone.View.extend({
    initialize: function () {
    },

    events: {
        'click #home_personal': 'homePersonal',
        'click #home_multiple': 'homeMultiple'
    },

    homePersonal: function () {
        ArriveApp.vent.trigger("navigate:home-personal");
    },

    homeMultiple: function () {
        ArriveApp.vent.trigger("navigate:home-multiple");
    }
});

var HomePersonal = Backbone.View.extend({
    initialize: function () {
        this.template = _.template($('#template-home').html());

        this.render();
    },

    events: {
        'click a[name=login]': 'login'
    },

    render: function () {
        this.$el.html(this.template());
        return this;
    },

    login: function () {
        ArriveApp.vent.trigger("navigate:login");
    }
});

var CheckIn = Backbone.View.extend({
    initialize: function () {
        this.template = _.template($('#template-student-check-in').html());
        this.render();
    },

    events: {
        'click a[name=check_in]': 'checkIn'
    },

    render: function () {
        this.$el.html(this.template());
        return this;
    },

    checkIn: function () {
        ArriveApp.vent.trigger("navigate:check-in");
    }
});

var NewClass = Backbone.View.extend({
    initialize: function () {
        this.template = _.template($('#template-student-new-class').html());
        this.render();
    },

    events: {
        'click a[name=new_class]': 'newClass'
    },

    render: function () {
        this.$el.html(this.template());
        return this;
    },

    newClass: function () {
        ArriveApp.vent.trigger("navigate:new-class");
    }
});


var HomeMultiple = Backbone.View.extend({
    initialize: function () {
        this.template = _.template($('#template-home-multiple').html());
		this.render();
		$(document).ready(function(){
			makeRequest();
		});
    },

    events: {
        'click a[name=location]': 'location'
    },

    render: function () {
        this.$el.html(this.template());
        return this;
    },

    location: function () {
        ArriveApp.vent.trigger("navigate:school-location");
    }
});

var SchoolLocation = Backbone.View.extend({
    initialize: function () {
        this.template = _.template($('#template-location').html());
        this.render();
    },

    events: {
        'click a[name=check_in_multiple]': 'checkInMultiple',
        'click a[name=home_multiple]': 'homeMultiple'
    },

    render: function () {
        this.$el.html(this.template());
        return this;
    },

    checkInMultiple: function () {
        ArriveApp.vent.trigger("navigate:check-in-multiple");
    },

    homeMultiple: function () {
        ArriveApp.vent.trigger("navigate:home-multiple");
    }
});

var ConfirmationMultiple = Backbone.View.extend({
    initialize: function () {
        this.template = _.template($('#template-confirmation-multiple').html());
        this.render();
    },

    events: {
        'click a[name=confirmation_multiple]': 'confirmationMultiple'
    },

    render: function () {
        this.$el.html(this.template());
        return this;
    },

    confirmationMultiple: function () {
        ArriveApp.vent.trigger("navigate:confirmation-multiple");
    }
});

var ArriveApp = {
    vent: _.extend({}, Backbone.Events),
    router: new Router(),

    init: function () {
        _.bindAll(this);
        this.addListeners();
    },

    addListeners: function () {
        this.vent.on("navigate:home-personal", this.navigateHomePersonal);
        this.vent.on("navigate:login", this.navigateLogin);
        this.vent.on("navigate:check-in", this.navigateCheckIn);
        this.vent.on("navigate:new-class", this.navigateNewClass);
        this.vent.on("navigate:home-multiple", this.navigateHomeMultiple);
        this.vent.on("navigate:school-location", this.navigateSchoolLocation);
        this.vent.on("navigate:check-in-multiple", this.navigateCheckInMultiple);
        this.vent.on("navigate:confirmation-multiple", this.navigateConfirmationMultiple);
    },

    navigateHomePersonal: function () {
        this.router.navigate("home_personal", {trigger: true});
    },

    navigateLogin: function () {
        this.router.navigate("login", {trigger: true});
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

    navigateSchoolLocation: function () {
        this.router.navigate("location", {trigger: true});
    },

    navigateCheckInMultiple: function () {
        this.router.navigate("check_in_multiple", {trigger: true});
    },

    navigateConfirmationMultiple: function () {
        this.router.navigate("confirmation_multiple", {trigger: true});
    }
}

ArriveApp.init();
window.App = ArriveApp;

Backbone.history.start({pushState: true});
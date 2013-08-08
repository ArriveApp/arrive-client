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

    homeMultiple: function() {
        new HomeMultiple({el: $("#main")});
    },

    schoolLocation: function() {
        new SchoolLocation({el: $("#main")});
    },

    checkInMultiple: function() {
        new ConfirmationMultiple({el: $("#main")});
    }
});

var MainView = Backbone.View.extend({
    initialize: function () {
    },

    goToHomePersonal: function () {
        router.navigate("home_personal", {trigger: true, replace: true});
    },

    goToHomeMultiple: function () {
        router.navigate("home_multiple", {trigger: true, replace: true});
    },

    events: {
        'click #home_personal': 'goToHomePersonal',
        'click #home_multiple': 'goToHomeMultiple'
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
        router.navigate("login", {trigger: true, replace: true});
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
        router.navigate("check_in", {trigger: true, replace: true});
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
        router.navigate("new_class", {trigger: true, replace: true});
    }
});

var HomeMultiple = Backbone.View.extend({
    initialize: function () {
        this.template = _.template($('#template-home-multiple').html());
        this.render();
    },

    events: {
        'click a[name=location]': 'location'
    },

    render: function () {
        this.$el.html(this.template());
        return this;
    },

    location: function () {
        router.navigate("location", {trigger: true, replace: true});
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
        router.navigate("check_in_multiple", {trigger: true, replace: true});
    },

    homeMultiple: function () {
        router.navigate("home_multiple", {trigger: true, replace: true});
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
        router.navigate("confirmation_multiple", {trigger: true, replace: true});
    }
});

var router = new Router();
window.router = router;

Backbone.history.start({pushState: true});

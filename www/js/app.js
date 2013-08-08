var Router = Backbone.Router.extend({
    routes: {
        "": "index",
        "home_personal": "homePersonal",
        "login" : "login",
        "check_in": "checkIn"
    },

    index: function () {
        new MainView({el: $("#main")});
    },

    homePersonal: function () {
        new HomePersonal({el: $("#main")});
    },

    login: function(){
       new CheckIn({el: $("#main")});
    },

    checkIn: function(){
    }
});

var MainView = Backbone.View.extend({
    initialize: function () {
    },

    goToHomePersonal: function () {
        router.navigate("home_personal", {trigger: true, replace: true});
    },

    events: {
        'click #home_personal': 'goToHomePersonal'
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
    login: function() {
        console.log("navigating to /login");
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

    checkIn: function() {
        router.navigate("check_in", {trigger: true, replace: true});
    }
});

var router = new Router();
window.router = router;

Backbone.history.start({pushState: true});

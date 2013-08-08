var Router = Backbone.Router.extend({
    routes: {
        "": "index",
        "home_personal": "homePersonal"
    },

    index: function() {
        new MainView({el: $("#main")});
    },

    homePersonal: function() {
        new HomePersonal({el: $("#main")});
    }
});

var MainView = Backbone.View.extend({
    initialize: function () {
    },

    goToHomePersonal: function () {
        router.navigate("home_personal", {trigger: true});
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
    render: function() {
        this.$el.html(this.template());
        return this;
    }
});

var router = new Router();
window.router = router;


Backbone.history.start({pushState: false});

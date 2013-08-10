Arrive.view = {};

Arrive.view.MainView = Backbone.View.extend({
    initialize: function () {
    },

    events: {
        'click #home_personal': 'homePersonal',
        'click #home_multiple': 'homeMultiple'
    },

    homePersonal: function () {
        Arrive.vent.trigger("navigate:home-personal");
    },

    homeMultiple: function () {
        Arrive.vent.trigger("navigate:home-multiple");
    }
});

Arrive.view.HomePersonal = Backbone.View.extend({
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
        Arrive.vent.trigger("navigate:login");
    }
});

Arrive.view.CheckIn = Backbone.View.extend({
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
        Arrive.vent.trigger("navigate:check-in");
    }
});

Arrive.view.NewClass = Backbone.View.extend({
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
        Arrive.vent.trigger("navigate:new-class");
    }
});


Arrive.view.HomeMultiple = Backbone.View.extend({
    initialize: function () {
        this.template = _.template($('#template-home-multiple').html());
        this.render();
        $(document).ready(function(){
            makeRequest("/schools/all", "#schoolDropdown");
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
        Arrive.vent.trigger("navigate:school-location");
    }
});

Arrive.view.SchoolLocation = Backbone.View.extend({
    initialize: function () {
        this.template = _.template($('#template-location').html());
        this.render();
        $(document).ready(function(){
            makeRequest("/schools/2/courses/all","#courseDropdown");
        });
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
        Arrive.vent.trigger("navigate:check-in-multiple");
    },

    homeMultiple: function () {
        Arrive.vent.trigger("navigate:home-multiple");
    }
});

Arrive.view.ConfirmationMultiple = Backbone.View.extend({
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
        Arrive.vent.trigger("navigate:confirmation-multiple");
    }
});
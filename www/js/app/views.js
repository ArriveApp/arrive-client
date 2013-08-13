Arrive.view = {};

Arrive.view.MainView = Backbone.View.extend({
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
        _.bindAll(this);

        this.loadSchools();
        this.render();
    },

    loadSchools: function () {
        this.schools = new Arrive.collection.Schools();
        this.schools.fetch({
            success: this.selectedSchool
        });
    },

    events: {
        'click a[name=login]': 'login'
    },

    render: function () {
        this.$el.html(this.template());
        return this;
    },

    login: function () {
        var inputFields = {
            email: this.$el.find('input[name=email]').val(),
            password: this.$el.find('input[name=pin]').val()
        }

        var callback = {
            success: function (model, response) {
                console.log('success');
                var selectedSchool = this.schools.get(1);
                selectedSchool.courses.fetch({
                    success: function () {Arrive.vent.trigger("navigate:login", selectedSchool);}
                });
            },
            error: function (model, response) {
                console.log('error');
            }
        }

        var userModel = new Arrive.model.User();
        userModel.save(inputFields, callback);
    }
});

Arrive.view.CheckIn = Backbone.View.extend({
    initialize: function (options) {
        this.template = _.template($('#template-student-check-in').html());
        _.bindAll(this);

        this.school = options.school;
        this.render();
    },

    events: {
        'click a[name=check_in]': 'checkIn'
    },

    render: function () {
        var school = this.school.toJSON();
        school.courses = this.school.courses.toJSON();

        this.$el.html(this.template(school));
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
        _.bindAll(this);
        this.loadSchools();
        this.render();
    },

    loadSchools: function () {
        this.schools = new Arrive.collection.Schools();
        this.schools.fetch({
            success: this.renderSchools
        });
    },

    events: {
        'click a[name=location]': 'location'
    },

    render: function () {
        this.$el.html(this.template());
        return this;
    },

    renderSchools: function () {
        var $schools = this.$("#schools");
        this.schools.forEach(function (school) {
            $schools.append($('<option></option>')
                .attr('value', school.get('id'))
                .text(school.get('name'))
            );
        });
    },

    location: function () {
        var selectedSchool = this.selectedSchool();

        selectedSchool.courses.fetch({
            success: function () {
                Arrive.vent.trigger("navigate:school-location", selectedSchool);
            }
        });
    },

    selectedSchool: function () {
        var id = $("#schools option:selected").val();
        return this.schools.get(id);
    }
});

Arrive.view.SchoolLocation = Backbone.View.extend({
    initialize: function (options) {
        this.template = _.template($('#template-location').html());
        _.bindAll(this);

        this.school = options.school;
        this.render();
    },

    events: {
        'click a[name=check_in_multiple]': 'checkInMultiple',
        'click a[name=home_multiple]': 'homeMultiple'
    },

    render: function () {
        var school = this.school.toJSON();
        school.courses = this.school.courses.toJSON();

        this.$el.html(this.template(school));
        return this;
    },

    checkInMultiple: function () {
        Arrive.vent.trigger("navigate:check-in-multiple", this.school);
    },

    homeMultiple: function () {
        Arrive.vent.trigger("navigate:home-multiple");
    }
});

Arrive.view.ConfirmationMultiple = Backbone.View.extend({
    initialize: function (options) {
        this.template = _.template($('#template-confirmation-multiple').html());
        _.bindAll(this);

        this.school = options.school;
        this.school.courses.fetch({
            success: this.renderCourses
        });
        this.render();
    },

    events: {
        'click a[name=confirmation_multiple]': 'confirmationMultiple'
    },

    render: function () {
        var school = this.school.toJSON();
        school.courses = this.school.courses.toJSON();

        this.$el.html(this.template(school));
        return this;
    },

    renderCourses: function () {
        var $courses = this.$("#courses");
        this.schools.courser.forEach(function (course) {
            $courses.append($('<option></option>')
                .attr('value', course.get('id'))
                .text(course.get('name'))
            );
        });
    },


    confirmationMultiple: function () {
        Arrive.vent.trigger("navigate:confirmation-multiple");
    }
});
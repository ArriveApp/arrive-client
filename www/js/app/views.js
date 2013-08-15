Arrive.view = {};

Arrive.view.Login = Backbone.View.extend({
    initialize: function () {
        this.template = _.template($('#template-home').html());
        _.bindAll(this);
        this.addListeners();
        this.render();
    },

    events: {
        'click a[name=login]': 'login'
    },

    addListeners: function () {
        this.user = new Arrive.model.User();
        this.user.on('invalid', this.showValidationError);
    },

    render: function () {
        this.$el.html(this.template());
        return this;
    },

    showValidationError: function (model, errors) {
        _.forEach(errors, this.invalidateField);
    },

    invalidateField: function (field) {
        this.$el.find('input[name=' + field + ']').addClass('validation-error');
    },

    clearValidationErrors: function () {
        this.$el.find('input[name=email]').removeClass('validation-error');
        this.$el.find('input[name=pin]').removeClass('validation-error');
        this.$el.find('#error_message').hide();
    },

    login: function () {
        this.clearValidationErrors();

        this.user.set(this.readInputValues());

        if (this.user.isValid()) {
            this.user.save()
                .done(this.onLoginSuccess)
                .error(this.onLoginError);
        }
    },

    readInputValues: function () {
        return {
            session: {
                email: this.$el.find('input[name=email]').val(),
                password: this.$el.find('input[name=pin]').val()
            }
        };
    },

    onLoginSuccess: function (response) {
        var session = new Arrive.model.Session(this.user, response);
        Arrive.vent.trigger('login-complete', session);
    },

    onLoginError: function () {
        this.$el.find('#error_message').show();
    }
});

Arrive.view.TeacherHome = Backbone.View.extend({
    initialize: function (options) {
        this.template = _.template($('#template-teacher-home').html());
        _.bindAll(this);

        this.session = options.session;
        this.render();
    },

    events: {
        'click a[name=check_in]': 'checkIn'
    },

    render: function () {
        var session = this.session.toJSON();
        this.$el.html(this.template({
            schoolName: session.school.get('name'),
            courses: session.courses.toJSON()
        }));
        return this;
    },

    checkIn: function () {
        this.checkin = new Arrive.model.CheckIn(this.readSelectionValues());

        this.checkin.save()
            .done(this.onCheckInSuccess)
            .error(this.onCheckInFailed)
            .always(this.onCheckInSuccess);
    },

    readSelectionValues: function () {
        var $course = this.$el.find('#courses option:selected');
        return {
            authToken: this.session.get('authenticationToken'),
            schoolId: this.session.get('school').get('id'),
            courseId: $course.attr("id"),
            courseName: $course.val()
        };
    },

    onCheckInSuccess: function () {
        var courseName = this.checkin.courseName;
        Arrive.vent.trigger('public-check-in-complete', courseName);
    },

    onCheckInFailed: function () {
        console.log('check in failed');
    }
});

Arrive.view.PublicCheckInConfirmation = Backbone.View.extend({
    initialize: function(options) {
        this.template = _.template($('#template-public-check-in-confirmation').html());
        _.bindAll(this);

        this.session = options.session;
        this.courseName = options.courseName;
        this.render();
    },

    events: {
        'click a[name=new_class]': 'checkIn'
    },

    render: function() {
        this.$el.html(this.template({
            userName: this.session.get('user').get('userName'),
            courseName: this.courseName
        }));
        return this;
    },

    checkIn: function() {
        Arrive.vent.trigger('teacher-home');
    }
});




Arrive.view.CheckIn = Backbone.View.extend({
    initialize: function (options) {
        this.template = _.template($('#template-student-check-in').html());
        _.bindAll(this);

        this.session = options.session;
        this.render();
    },

    events: {
        'click a[name=check_in]': 'checkIn'
    },

    render: function () {
        this.$el.html(this.template({
            schoolName: this.session.get('school').get('name'),
            courses: this.session.get('courses').toJSON(),
            userName: this.session.get('user').get('userName')
        }));
        return this;
    },

    readSelectionValues: function () {
        var $course = this.$el.find('#courses option:selected');
        return {
            authToken: this.session.get('authenticationToken'),
            schoolId: this.session.get('school').get('id'),
            courseId: $course.attr("id"),
            courseName: $course.val()
        };
    },

    checkIn: function () {
        this.checkin = new Arrive.model.CheckIn(this.readSelectionValues());

        this.checkin.save()
            .done(this.onCheckInSuccess)
            .error(this.onCheckInFailed)
            .always(this.onCheckInSuccess);
    },

    onCheckInSuccess: function () {
        var courseName = this.checkin.courseName;
        Arrive.vent.trigger('check-in-complete', courseName);
    },

    onCheckInFailed: function () {
        console.log('check in failed');
    }
});

Arrive.view.CheckInConfirmation = Backbone.View.extend({
    initialize: function (options) {
        this.template = _.template($('#template-student-check-in-confirmation').html());

        this.courseName = options.courseName;
        this.render();
    },

    events: {
        'click a[name=new_class]': 'checkIn'
    },

    render: function () {
        this.$el.html(this.template({
            courseName: this.courseName
        }));
        return this;
    },

    checkIn: function () {
        Arrive.vent.trigger("check-in");
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
        this.schools.fetch().done(this.renderSchools);
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

        selectedSchool.courses.fetch().done(function () {
            Arrive.vent.trigger("school-location", selectedSchool);
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
        Arrive.vent.trigger("check-in-multiple", this.school);
    },

    homeMultiple: function () {
        Arrive.vent.trigger("home-multiple");
    }
});

Arrive.view.ConfirmationMultiple = Backbone.View.extend({
    initialize: function (options) {
        this.template = _.template($('#template-confirmation-multiple').html());
        _.bindAll(this);

        this.school = options.school;
        this.school.courses.fetch().done(this.renderCourses);
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
        this.schools.courses.forEach(function (course) {
            $courses.append($('<option></option>')
                .attr('value', course.get('id'))
                .text(course.get('name'))
            );
        });
    },

    confirmationMultiple: function () {
        Arrive.vent.trigger("home-multiple");
    }
});
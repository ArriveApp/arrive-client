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
            userName: this.session.get("user").get("user").firstname,
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
            userName: this.session.get("user").get("user").firstname,
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
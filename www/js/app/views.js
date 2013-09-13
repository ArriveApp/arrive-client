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
        this.addListeners();
        this.render();
    },

    addListeners: function () {
        this.checkin = new Arrive.model.PublicCheckIn();
        this.checkin.on('invalid', this.showValidationError);
    },

    showValidationError: function (model, errors) {
        if (_.contains(errors, 'pin')) {
            this.$el.find('input[name=pin]').addClass('validation-error');
        }

        if (_.contains(errors, 'course')) {
            this.$el.find('#courses').addClass('validation-error');
        }
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

    clearValidationErrors: function () {
        this.$el.find('input[name=pin]').removeClass('validation-error');
        this.$el.find('#courses').removeClass('validation-error');
        this.$el.find('#error_message').hide();
    },

    checkIn: function () {
        this.clearValidationErrors();

        this.checkin.set(this.readSelectionValues());

        if (this.checkin.isValid()) {
            this.checkin.save()
                .done(this.onCheckInSuccess)
                .error(this.onCheckInFailed);
        }
    },
    readSelectionValues: function () {
        var $course = this.$el.find('#courses option:selected');
        var $pin = this.$el.find('input[name=pin]');
        window.$course = $course;
        return {
            authToken: this.session.get('authenticationToken'),
            schoolId: this.session.get('school').get('id'),
            courseId: $course.attr("id"),
            courseName: $course.val(),
            pin: $pin.val()
        };
    },

    onCheckInSuccess: function (response) {
        var courseName = this.checkin.get('courseName');
        Arrive.vent.trigger('public-check-in-complete', courseName, response.firstname);
    },

    onCheckInFailed: function (model, xhr, options) {

        var error_message = model.responseJSON.error_message;
        console.log(error_message);
        this.$el.find('#error_message h5').text(error_message);
        this.$el.find('#error_message').show();
    }
});

Arrive.view.PublicCheckInConfirmation = Backbone.View.extend({
    initialize: function (options) {
        this.template = _.template($('#template-public-check-in-confirmation').html());
        _.bindAll(this);

        this.session = options.session;
        this.courseName = options.courseName;
        this.student = options.student;
        this.render();
    },

    events: {
        'click a[name=new_class]': 'checkIn'
    },

    render: function () {
        this.$el.html(this.template({
            courseName: this.courseName,
            userName: this.student
        }));
        return this;
    },

    checkIn: function () {
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
            userName: this.session.get('user').get('user').firstname
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

        if (this.checkin.isValid()) {
            this.checkin.save()
                .done(this.onCheckInSuccess)
                .error(this.onCheckInFailed);
        }
    },

    onCheckInSuccess: function () {
        var options = {
            "courseName": this.checkin.get('courseName'),
            "userName": this.session.get('user').get('user').firstname
        };
        Arrive.vent.trigger('check-in-complete', options);
    },

    onCheckInFailed: function (model ) {
        var error_message = model.responseJSON.error_message;
        console.log(error_message);
        this.$el.find('#error_message h5').text(error_message);
        this.$el.find('#error_message').show();
    }
});

Arrive.view.CheckInConfirmation = Backbone.View.extend({
    //TODO: Change the name of variable this.options.courseName to something else 
    initialize: function (options) {
        this.template = _.template($('#template-student-check-in-confirmation').html());
        this.courseName = this.options.courseName.courseName;
        this.userName = this.options.courseName.userName;
        this.render();
    },

    events: {
        'click a[name=new_class]': 'checkIn'
    },

    render: function () {
        this.$el.html(this.template({
            courseName: this.courseName,
            userName: this.userName
        }));
        return this;
    },

    checkIn: function () {
        Arrive.vent.trigger("check-in");
    }
});
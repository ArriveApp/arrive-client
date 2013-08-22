Arrive.model = {};

Arrive.model.School = Backbone.Model.extend({
    defaults: {
        id: null,
        name: null
    },

    initialize: function () {
        this.courses = new Backbone.Collection();
        this.courses.url = utils.url('/schools/' + this.id + '/courses');
    }
});

Arrive.model.User = Backbone.Model.extend({
    url: utils.url('/session'),

    defaults: {
        session: null
    },

    validate: function (attrs) {
        var errors = [];

        if (_.isEmpty(attrs.session.email)) {
            errors.push('email');
        }
        if (_.isEmpty(attrs.session.password)) {
            errors.push('pin');
        }

        if (!_.isEmpty(errors)) {
            return errors;
        }
    }
});

Arrive.model.CheckIn = Backbone.Model.extend({
    url: function () {
        var schoolId = this.get('schoolId');
        var courseId = this.get('courseId');
        var authToken = this.get('authToken');
        var path = '/schools/' + schoolId + '/courses/' + courseId + '/check_in?auth_token=' + authToken;
        return utils.url(path);
    },

    defaults: {
        authToken: null,
        schoolId: null,
        courseId: null,
        courseName: ''
    },

    validate: function (attrs) {
        var errors = [];

        if (_.isUndefined(attrs.courseId)) {
            errors.push("course");
        }

        if (!_.isEmpty(errors)) {
            return errors;
        }
    }
});

Arrive.model.PublicCheckIn = Arrive.model.CheckIn.extend({
    //TODO figure out how to call super
    validate: function (attrs) {
        var errors = [];

        if (_.isUndefined(attrs.courseId)) {
            errors.push("course");
        }

        if (!_.isUndefined(attrs.pin) && _.isEmpty(attrs.pin)) {
            errors.push("pin");
        }

        if (!_.isEmpty(errors)) {
            return errors;
        }
    }
});

Arrive.model.Session = Backbone.Model.extend({
    defaults: {
        school: null,
        courses: null,
        user: null,
        userName: null,
        authenticationToken: null,
        isTeacher: false
    },

    initialize: function (user, values) {
        this.set({
            user: user,
            authenticationToken: values.user['authentication_token'],
            isTeacher: values.user['is_teacher'],
            school: new Backbone.Model(values.school),
            courses: new Backbone.Collection(values.courses)
        });
    }
});

Arrive.collection = {};

Arrive.collection.Schools = Backbone.Collection.extend({
    model: Arrive.model.School,
    url: utils.url('/schools')
});

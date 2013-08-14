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
    url: function(){
        var path = '/schools/' + this.schoolId + '/courses/' + this.courseId + '/check_in'
        return utils.url(path);
    },

    defaults: {
        schoolId: null,
        courseId: null,
        courseName: ''
    },

    initialize: function (values) {
        this.schoolId = values.schoolId;
        this.courseId = values.courseId;
        this.courseName = values.courseName;
    }
});

Arrive.model.Session = Backbone.Model.extend({
    defaults: {
        school: null,
        courses: null,
        user: null,
        authenticationToken: null,
        isTeacher: false
    },

    initialize: function (user, values) {
        this.user = user;
        this.authenticationToken = values.user['authentication_token'];
        this.isTeacher = values.user['is_teacher'];
        this.school = new Arrive.model.School(values.school);
        this.courses = new Backbone.Collection(values.courses);
    }
});

Arrive.collection = {};

Arrive.collection.Schools = Backbone.Collection.extend({
    model: Arrive.model.School,
    url: utils.url('/schools')
});

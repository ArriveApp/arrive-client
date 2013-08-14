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
        email: '',
        password: ''
    },

    validate: function (attrs) {
        if (_.isEmpty(attrs.email)) {
            return 'Please fill email field.';
        }
        if (_.isEmpty(attrs.password)) {
            return 'Please fill password field.';
        }
    }
});

Arrive.collection = {};

Arrive.collection.Schools = Backbone.Collection.extend({
    model: Arrive.model.School,
    url: utils.url('/schools')
});

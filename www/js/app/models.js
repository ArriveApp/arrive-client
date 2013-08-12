Arrive.model = {};

Arrive.model.School = Backbone.Model.extend({
    defaults: {
        id: null,
        name: null
    },

    initialize: function () {
        this.courses = new Backbone.Collection();
        this.courses.url = utils.url('/api/schools/' + this.id + '/courses');
    }
});

Arrive.model.User = Backbone.Model.extend({
    url: utils.url('/users/sign_in'),

    defaults: {
        email: '',
        password: ''
    },

    validate: function (attrs) {
        if (!attrs.email) {
            return 'Please fill email field.';
        }
        if (!attrs.password) {
            return 'Please fill feedback field.';
        }
    }
});

Arrive.collection = {};

Arrive.collection.Schools = Backbone.Collection.extend({
    model: Arrive.model.School,
    url: utils.url('/api/schools')
});

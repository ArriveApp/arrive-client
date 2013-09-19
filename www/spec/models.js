describe('Describe school model', function(){
    var school;

    beforeEach(function() {
        school = new Arrive.model.School();
    });

    describe('when school is initialize', function(){

        it ('should has a collection of courses' , function(){
            school.initialize();
            expect(school.courses).toBeDefined();
        }) ;

    });
});


describe('Describe user model', function(){

    var user;

    beforeEach(function(){
       user = new Arrive.model.User();
    });


    describe ('when model is validating', function(){

        describe('when user email and password are empty', function(){

            var errors = [];
            beforeEach(function(){
               errors = user.validate({ session: {}});
            });

            it('should save two errors', function(){
                 expect(errors.length).toBe(2);
            });
        });


        describe('when user email is empty', function(){

            var errors = [];

            beforeEach(function(){
                errors = user.validate({session: {pin: '1234'}});
            });

            it('should save two errors', function(){
                expect(errors[0]).toBe('email');
            });
        });



        describe('when user pin is empty', function(){

            var errors = [];

            beforeEach(function(){
                errors = user.validate({session: {email: 'user@test.com'}});
            });

            it('should save two errors', function(){
                expect(errors[0]).toBe('pin');
            });
        });


    });

});


describe('describe checkin model', function(){

    var checkin;


});






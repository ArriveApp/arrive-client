describe('Describe view teacher home', function(){

    var model, view;
    var userData, session;


    userData = { user: { authenticationToken: 'ooo' } }
    session = new Arrive.model.Session('ue', userData );

    beforeEach(function () {

        view = new Arrive.view.TeacherHome({ session: session });

    });

    describe('when view is constructing', function () {

        it ('should exist', function () {
            expect(view).toBeDefined();
        });

    });

    describe('when check in is submitted',function(){



        describe('course selected and pin filled and are validate', function () {

            beforeEach(function () {
                spyOn(view, 'checkIn').andCallThrough();
                spyOn(view.checkin, 'save').andCallThrough();
                spyOn(view.checkin, 'isValid').andReturn(true);


            });

            it('should call checkin method', function () {
                view.checkIn();
                expect(view.checkIn).toHaveBeenCalled();
            });



        });


    });

});
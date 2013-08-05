
describe('app', function() {
    describe('', function() {
        it('should bind deviceready', function() {
            var data = "[{\"id\":1,\"name\":\"Hogwarts\",\"created_at\":\"2013-08-04T02:38:27.237Z\",\"updated_at\":\"2013-08-04T02:38:27.237Z\"},{\"id\":2,\"name\":\"Winterfell\",\"created_at\":\"2013-08-04T02:38:27.245Z\",\"updated_at\":\"2013-08-04T02:38:27.245Z\"},{\"id\":3,\"name\":\"Nightengale\",\"created_at\":\"2013-08-04T02:38:27.248Z\",\"updated_at\":\"2013-08-04T02:38:27.248Z\"}]";
            populateSchoolDropdown(data);
            expect($("#schoolDropdown").innerHTML).toEqual("");
        });
    });

    describe('onDeviceReady', function() {
        it('should report that it fired', function() {
            spyOn(app, 'receivedEvent');
            app.onDeviceReady();
            expect(app.receivedEvent).toHaveBeenCalledWith('deviceready');
        });
    });

    describe('receivedEvent', function() {
        beforeEach(function() {
            var el = document.getElementById('stage');
            el.innerHTML = ['<div id="deviceready">',
                '    <p class="event listening">Listening</p>',
                '    <p class="event received">Received</p>',
                '</div>'].join('\n');
        });

        it('should hide the listening element', function() {
            app.receivedEvent('deviceready');
            var displayStyle = helper.getComputedStyle('#deviceready .listening', 'display');
            expect(displayStyle).toEqual('none');
        });

        it('should show the received element', function() {
            app.receivedEvent('deviceready');
            var displayStyle = helper.getComputedStyle('#deviceready .received', 'display');
            expect(displayStyle).toEqual('block');
        });
    });
});

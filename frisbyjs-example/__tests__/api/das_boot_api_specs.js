const frisby = require('frisby')

it('should get list of shipwrecks', function() {
    return frisby.get('http://localhost:9999/api/v1/shipwrecks')
        .expect('status', 200);
});
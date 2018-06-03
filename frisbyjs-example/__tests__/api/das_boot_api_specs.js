const frisby = require('frisby')

it('should get list of shipwrecks', function() {
    return frisby.get('http://localhost:9999/api/v1/shipwrecks')
        .expect('status', 200);
});

it ('should create a shipwrecks record', function () {
    return frisby
      .post('http://localhost:9999/api/v1/shipwrecks', {
        name: "U Boat 66",
        description: "German U Boat 66",
        condition: "Fair",
        yearDiscovered: "2000",
        depth: "1000",
        latitude: "49.395203",
        longitude: "-37.302391"
      })
      .expect('status', 200)
  });
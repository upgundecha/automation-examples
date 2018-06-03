const frisby = require('frisby')

let ship = {
    name: "U Boat 66",
    description: "German U Boat 66",
    condition: "Fair",
    yearDiscovered: "2000",
    depth: "1000",
    latitude: "49.395203",
    longitude: "-37.302391"
}

it('should get list of shipwrecks', function() {
    return frisby.get('http://localhost:9999/api/v1/shipwrecks')
        .expect('status', 200);
});

it ('should create a shipwrecks record', function () {
    return frisby
      .post('http://localhost:9999/api/v1/shipwrecks', ship)
      .expect('status', 200)
      .then(function (res){
          let id = res.json.id;
         return frisby.get(`http://localhost:9999/api/v1/shipwrecks/${id}`)
          .expect('status', 200)
          .expect('json', 'name', ship.name)
          .expect('json', 'description', ship.description)
          .expect('json', 'condition', ship.condition)
          .expect('json', 'yearDiscovered', ship.yearDiscovered)
          .expect('json', 'depth', ship.depth)
          .expect('json', 'latitude', ship.latitude)    
          .expect('json', 'longitude', ship.longitude)
      })
  });
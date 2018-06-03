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

let updateShip = {
    name: "U Boat 66",
    description: "German U Boat 66",
    condition: "Fair",
    yearDiscovered: "2002",
    depth: "1000",
    latitude: "49.395203",
    longitude: "-37.302391"
}

it('should create & view a shipwrecks record', function () {
    return frisby
        .post('http://localhost:9999/api/v1/shipwrecks', ship)
        .expect('status', 200)
        .then(function (res) {
            let id = res.json.id;
            console.info(id)
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

it('should get list of shipwrecks', function () {
    return frisby.get('http://localhost:9999/api/v1/shipwrecks')
        .expect('status', 200)
        .then(function (res) {
            let ships = res.json;
            expect(ships.length).toBeGreaterThanOrEqual(1);
        })
});

it('should update a shipwrecks record', function () {
    return frisby
        .post('http://localhost:9999/api/v1/shipwrecks', ship)
        .expect('status', 200)
        .then(function (res) {
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
            return frisby.
                put(`http://localhost:9999/api/v1/shipwrecks/${id}`, updateShip)
                .expect('status', 200)
                .expect('json', 'name', updateShip.name)
                .expect('json', 'description', updateShip.description)
                .expect('json', 'condition', updateShip.condition)
                .expect('json', 'yearDiscovered', updateShip.yearDiscovered)
                .expect('json', 'depth', updateShip.depth)
                .expect('json', 'latitude', updateShip.latitude)
                .expect('json', 'longitude', updateShip.longitude)
        })
});

it('should delete a shipwrecks record', function () {
    return frisby
        .post('http://localhost:9999/api/v1/shipwrecks', ship)
        .expect('status', 200)
        .then(function (res) {
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
            return frisby.
                del(`http://localhost:9999/api/v1/shipwrecks/${id}`)
                .expect('status', 200)
        })
});
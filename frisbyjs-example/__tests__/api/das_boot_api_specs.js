const frisby = require('frisby')

let endpoint_url = 'http://localhost:9999/api/v1';

let ship = {
    name: "U Boat 66",
    description: "German U Boat 66",
    condition: "Fair",
    yearDiscovered: "2000",
    depth: "1000",
    latitude: "49.395203",
    longitude: "-37.302391"
}

it('should create & view a shipwrecks record', function () {
    return frisby
        .post(`${endpoint_url}/shipwrecks`, ship)
        .expect('status', 200)
        .then(function (res) {
            let id = res.json.id;
            return frisby.get(`${endpoint_url}/shipwrecks/${id}`)
                .expect('status', 200)
                .expect('header', 'Content-Type', 'application/json;charset=UTF-8')
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
    return frisby.get(`${endpoint_url}/shipwrecks`)
        .expect('status', 200)
        .expect('header', 'Content-Type', 'application/json;charset=UTF-8')
        .then(function (res) {
            let ships = res.json;
            expect(ships.length).toBeGreaterThanOrEqual(1);
        })
});

it('should update a shipwrecks record', function () {
    return frisby
        .post(`${endpoint_url}//shipwrecks`, ship)
        .expect('status', 200)
        .expect('header', 'Content-Type', 'application/json;charset=UTF-8')
        .then(function (res) {
            let id = res.json.id;
            return frisby.get(`${endpoint_url}/shipwrecks/${id}`)
                .expect('status', 200)
                .expect('header', 'Content-Type', 'application/json;charset=UTF-8')
                .expect('json', 'name', ship.name)
                .expect('json', 'description', ship.description)
                .expect('json', 'condition', ship.condition)
                .expect('json', 'yearDiscovered', ship.yearDiscovered)
                .expect('json', 'depth', ship.depth)
                .expect('json', 'latitude', ship.latitude)
                .expect('json', 'longitude', ship.longitude)
                .then(function (res) {
                    let id = res.json.id;
                    return frisby.
                        put(`${endpoint_url}/shipwrecks/${id}`,{
                            id: id,
                            name: "U Boat 66",
                            description: "German U Boat 66",
                            condition: "Fair",
                            yearDiscovered: "2002",
                            depth: "1000",
                            latitude: "49.395203",
                            longitude: "-37.302391"
                        })
                        .expect('status', 200)
                        .expect('header', 'Content-Type', 'application/json;charset=UTF-8')
                        .expect('json', 'yearDiscovered', '2002')
                })
        })
});

it('should delete a shipwrecks record', function () {
    return frisby
        .post(`${endpoint_url}/shipwrecks`, ship)
        .expect('status', 200)
        .expect('header', 'Content-Type', 'application/json;charset=UTF-8')
        .then(function (res) {
            let id = res.json.id;
            return frisby.get(`${endpoint_url}/shipwrecks/${id}`)
                .expect('status', 200)
                .expect('header', 'Content-Type', 'application/json;charset=UTF-8')
                .expect('json', 'name', ship.name)
                .expect('json', 'description', ship.description)
                .expect('json', 'condition', ship.condition)
                .expect('json', 'yearDiscovered', ship.yearDiscovered)
                .expect('json', 'depth', ship.depth)
                .expect('json', 'latitude', ship.latitude)
                .expect('json', 'longitude', ship.longitude)
            return frisby.
                del(`${endpoint_url}/shipwrecks/${id}`)
                .expect('status', 200)
                .expect('header', 'Content-Type', 'application/json;charset=UTF-8')
        })
});
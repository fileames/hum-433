/* eslint import/no-webpack-loader-syntax: off */
import mapboxgl from '!mapbox-gl';

var turf = require('@turf/turf');


const participants = [{ "lng": 5.74629904893754, "lat": 46.167051492570636 },
    { "lng": 7.74629904893754, "lat": 42.167051492570636 },
    { "lng": 3.74629904893754, "lat": 50.167051492570636 }];

const meetings = [{ "lng": 8.74629904893754, "lat": 40.167051492570636 }, 
{ "lng": 9.74629904893754, "lat": 41.167051492570636 }];

const hardcoded_meetings = []

for (var part of meetings) {

    //const el = document.createElement('div');
    //el.className = 'marker-meeting';

    hardcoded_meetings.push(
        new mapboxgl.Marker({
            "color": "#ff2c2c"
        }).setLngLat([part.lng, part.lat])
    )
}

const hardcoded_participants = []

for (var part2 of participants) {
    const el = document.createElement('div');
    el.className = 'marker-participant';
    hardcoded_participants.push(
        new mapboxgl.Marker(el).setLngLat([part2.lng, part2.lat])
    )
}

const hardcoded_lines = []

var options = {
    units: 'kilometers'
};

for (var parti of participants) {
    var temp = []
    for (var meet of meetings) {
        const origin = [parti.lng, parti.lat];
        const destination = [meet.lng, meet.lat];


        const route = {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [origin, destination]
                    }
                }
            ]
        };

        const lineDistance = turf.length(route.features[0]);

        const arc = [];

        // Number of steps to use in the arc and animation, more steps means
        // a smoother arc and animation, but too many steps will result in a
        // low frame rate
        const steps = 500;

        // Draw an arc between the `origin` & `destination` of the two points
        for (let i = 0; i < lineDistance; i += lineDistance / steps) {
            const segment = turf.along(route.features[0], i);
            arc.push(segment.geometry.coordinates);
        }

        // Update the route with calculated arc coordinates
        route.features[0].geometry.coordinates = arc;

        const point = {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'properties': {},
                    'geometry': {
                        'type': 'Point',
                        'coordinates': arc[250]
                    }
                }
            ]
        };

        var distance = turf.distance(origin, destination, options);

        console.log(distance)
        
        temp.push([route, point, distance])

    }
    hardcoded_lines.push(temp)
}

const hardcoded_values = { "part": hardcoded_participants ,
    "meet": hardcoded_meetings,
    "line": hardcoded_lines}

export default hardcoded_values;

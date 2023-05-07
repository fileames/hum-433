/* eslint import/no-webpack-loader-syntax: off */
import mapboxgl from '!mapbox-gl';

var turf = require('@turf/turf');


const participants = [{ "lng": 5.74629904893754, "lat": 46.167051492570636 },
    { "lng": 7.74629904893754, "lat": 42.167051492570636 },
    { "lng": 3.74629904893754, "lat": 50.167051492570636 },
    {"lng":8.617646,"lat":48.808365},
    {"lng":7.772721,"lat":48.591679},
    {"lng":1.324502,"lat":43.558473},
    {"lng":12.487513,"lat":41.950516}, 
    {"lng":9.197836,"lat":45.440606},
    {"lng":7.745989,"lat":45.018280},
    {"lng":2.158168,"lat":41.420474},
    {"lng":-3.686448,"lat":40.398159},
    {"lng":-9.166849,"lat":38.839832},
    {"lng":-8.393255,"lat":41.525763},
    {"lng":-4.506016,"lat":36.707902},
    {"lng":9.564020,"lat":47.126234},
    {"lng":14.368481,"lat":49.986883},
    {"lng":13.272803,"lat":52.441997},
    {"lng":8.791596,"lat":50.067350},
    {"lng":4.930813,"lat":52.286521},
    {"lng":4.350695,"lat":50.781027},
    {"lng":6.071044,"lat":49.602868},
    {"lng":2.215824,"lat":48.688459},
    {"lng":18.038695,"lat":59.240836},
    {"lng":24.806535,"lat":60.180945},
    {"lng":-6.414777,"lat":53.299368},
    {"lng":-8.959687,"lat":53.281875},
    {"lng":-3.023607,"lat":48.056883},
    {"lng":2.166392,"lat":48.608524},
    {"lng":2.456938,"lat":47.064907},
    {"lng":8.472889,"lat":47.358680},
    {"lng":6.198728,"lat":46.214710},
    {"lng":9.643943,"lat":53.551541},
    {"lng":-0.612534,"lat":39.411847},
    {"lng":13.336866,"lat":38.058003},
    {"lng":14.881605,"lat":37.449687},
    {"lng":14.376985,"lat":40.852582},
    {"lng":11.307015,"lat":43.708265},
    {"lng":7.225181,"lat":43.725765},
    {"lng":7.421104,"lat":43.739279},
    {"lng":9.542742,"lat":44.913382},
    {"lng":1.069203,"lat":45.335558},
    {"lng":-1.375358,"lat":43.503984},
    {"lng":2.803328,"lat":44.870702},
    {"lng":4.847143,"lat":45.756005},
    {"lng":16.247862,"lat":48.180893},
    {"lng":19.532269,"lat":48.604418},
    {"lng":21.001234,"lat":52.156123},
    {"lng":23.415409,"lat":38.117724},
    {"lng":21.559062,"lat":39.619286}];

const meetings = [{ "lng": 8.74629904893754, "lat": 40.167051492570636 }, 
{ "lng": 9.74629904893754, "lat": 41.167051492570636 },
{ "lng": 2.344629, "lat": 48.845497 },
{ "lng": 11.758047, "lat": 48.089948 },
{ "lng": -3.761893, "lat": 40.282722 },
{ "lng": 9.203153, "lat": 45.394958 }];

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

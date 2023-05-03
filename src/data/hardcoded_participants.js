/* eslint import/no-webpack-loader-syntax: off */
import mapboxgl from '!mapbox-gl';

const data = [{"lng":-74.74629904893754,"lat":40.167051492570636},
{"lng":-76.74629904893754,"lat":40.167051492570636},
{"lng":-78.74629904893754,"lat":40.167051492570636}];

const hardcoded_participants = []

for (var part of data) {
   hardcoded_participants.push(
    new mapboxgl.Marker().setLngLat([part.lng, part.lat])
   )
}

export default hardcoded_participants

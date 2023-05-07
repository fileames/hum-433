/* eslint import/no-webpack-loader-syntax: off */
import mapboxgl from '!mapbox-gl';

const data = [{"lng":5.74629904893754,"lat":46.167051492570636},
{"lng":7.74629904893754,"lat":42.167051492570636},
{"lng":3.74629904893754,"lat":50.167051492570636}];


const hardcoded_participants = []

for (var part of data) {
   hardcoded_participants.push(
    new mapboxgl.Marker().setLngLat([part.lng, part.lat])
   )
}

export default hardcoded_participants

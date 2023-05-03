/* eslint import/no-webpack-loader-syntax: off */
import mapboxgl from '!mapbox-gl';
import './Map.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import hardcoded_values from '../data/hardcoded_values.js'
import React, { useRef, useEffect, useState } from 'react';


mapboxgl.accessToken = '';

function add_lines(map, added, setAdded, currentLines) {

    var hardcoded_lines = hardcoded_values["line"]
    var hardcoded_participants = hardcoded_values["part"]
    var hardcoded_meetings = hardcoded_values["meet"]

    map.on('load', function () {
        for (var i = 0; i < hardcoded_participants.length; i++) {
            for (var j = 0; j < hardcoded_meetings.length; j++) {
                var route = hardcoded_lines[i][j][0];
                var point = hardcoded_lines[i][j][1];

                var id = (i + 1) + "-" + (j + 1);
                console.log(id)

                if (!map.getSource('route' + id)) {
                    map.addSource('route' + id, {
                        'type': 'geojson',
                        'data': route
                    });
                }


                if (!map.getSource('point' + id)) {
                    map.addSource('point' + id, {
                        'type': 'geojson',
                        'data': point
                    });
                }

                if (!map.getLayer(id + "r")) {
                    map.addLayer({
                        'id': id + "r",
                        'source': 'route' + id,
                        'type': 'line',
                        'paint': {
                            'line-width': 2,
                            'line-color': '#007cbf'
                        },
                        'layout': {
                            'visibility': "none"
                        }
                    });
                }

                if (!map.getLayer(id + "p")) {

                    map.addLayer({
                        'id': id + "p",
                        'source': 'point' + id,
                        'type': 'symbol',
                        'layout': {
                            'icon-image': 'airport',
                            'icon-size': 1.5,
                            'icon-rotate': ['get', 'bearing'],
                            'icon-rotation-alignment': 'map',
                            'icon-allow-overlap': true,
                            'icon-ignore-placement': true,
                            'visibility': "none"
                        }
                    });
                }
            }
        }

    })

}

function Map({ num_participants, num_meetings }) {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(5.34);
    const [lat, setLat] = useState(46.358);
    const [zoom, setZoom] = useState(4);
    const [currentNumPart, setcurrentNumPart] = useState(1);
    const [currentNumMeet, setcurrentNumMeet] = useState(1);
    const [added, setAdded] = useState(false);
    const [currentLines, setcurrentLines] = useState(new Set(["1-1r", "1-1p"]));

    useEffect(() => {
        console.log(num_participants)
        console.log(num_meetings)
        var hardcoded_participants = hardcoded_values["part"]
        var hardcoded_meetings = hardcoded_values["meet"]


        if (currentNumPart != num_participants) {
            for (var i = 0; i < hardcoded_participants.length; i++) {
                if (i < num_participants)
                    hardcoded_participants[i].addTo(map.current);
                else
                    hardcoded_participants[i].remove();
            }
            setcurrentNumPart(num_participants)
        }

        if (currentNumMeet != num_meetings) {
            for (var i = 0; i < hardcoded_meetings.length; i++) {
                if (i < num_meetings)
                    hardcoded_meetings[i].addTo(map.current);
                else
                    hardcoded_meetings[i].remove();
            }
            setcurrentNumMeet(num_meetings)
        }

        var sett = currentLines

        if (!map.current) return
        if (!map.current.isStyleLoaded()) return

        for (var i = 0; i < hardcoded_participants.length; i++) {
            for (var j = 0; j < hardcoded_meetings.length; j++) {
                var id = (i + 1) + "-" + (j + 1);
                if ((i < num_participants) && (j < num_meetings)) {
                    map.current.setLayoutProperty(id + "r", 'visibility', 'visible');
                    map.current.setLayoutProperty(id + "p", 'visibility', 'visible');
                }
                else {
                    map.current.setLayoutProperty(id + "r", 'visibility', 'none');
                    map.current.setLayoutProperty(id + "p", 'visibility', 'none');
                }
            }
        }
        setcurrentLines(sett)



    }, [num_participants, num_meetings])

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });



    }, [lng, lat, zoom]);


    useEffect(() => {

        var hardcoded_participants = hardcoded_values["part"]
        var hardcoded_meetings = hardcoded_values["meet"]


        for (var i = 0; i < hardcoded_participants.length; i++) {
            if (i < currentNumPart)
                hardcoded_participants[i].addTo(map.current);
            else
                hardcoded_participants[i].remove();
        }

        for (var i = 0; i < hardcoded_meetings.length; i++) {
            if (i < currentNumMeet)
                hardcoded_meetings[i].addTo(map.current);
            else
                hardcoded_meetings[i].remove();
        }

        add_lines(map.current, added, setAdded, currentLines)




        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });


        //map.setFilter('layer', ['in', ['get', 'id'], currentLines])
        map.setFilter('layer', ['match', 'id', currentLines, true, false])


    }, []);

    return (
        <div className="Map">
            <div className="map" id="map" >
                <div ref={mapContainer} className="map-container" />
            </div>
        </div>
    );
}

export default Map;

/* eslint import/no-webpack-loader-syntax: off */
import mapboxgl from '!mapbox-gl';
import './Map.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import hardcoded_values from '../data/hardcoded_values.js'
import costs from '../data/costs.js'
import React, { useRef, useEffect, useState } from 'react';
import { calculate_min_max, ONLINE_HOUR } from './helpers.js'


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

function return_icon(i, km) {
    var icon = ""
    var cost = 0.0
    switch (i) {
        case 0:
            icon = "paris-transilien"
            cost = costs["train"] * km
            break;
        case 1:
            icon = "airport"
            cost = costs["plane"] * km
            break;
        case 2:
            icon = "car"
            cost = costs["car"] * km
            break;
        case 3:
            icon = "border-dot-13"
            cost = costs["online"] * ONLINE_HOUR
            break;
        default:
            icon = "border-dot-13"
            cost = costs["online"]
    }
    return [icon, cost]
}

function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;

    var seed = 1;
    function random() {
        var x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    }


    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}



function calc_nums(data, num_participants, num_meetings) {
    var total_lines = num_participants * num_meetings

    var total_perc = data["travel_data"]["plane_perc"] + data["travel_data"]["online_perc"] + data["travel_data"]["train_perc"] + data["travel_data"]["car_perc"]

    if (total_perc == 0) {
        total_perc = 0.000005
    }
    var t = 100.0 * total_lines / (total_perc);
    var num_train = parseInt(data["travel_data"]["train_perc"] * t / 100)
    var num_plane = parseInt(data["travel_data"]["plane_perc"] * t / 100)
    var num_car = parseInt(data["travel_data"]["car_perc"] * t / 100)
    var num_online = total_lines - num_train - num_plane - num_car

    if (num_online != 0 && data["travel_data"]["online_perc"] == 0) {
        if (num_train != 0) {
            num_train += num_online
        }
        else if (num_plane != 0) {
            num_plane += num_online
        }
        else if (num_car != 0) {
            num_car += num_online
        }
        num_online = 0
    }

    var which_t = shuffleArray(Array(num_train).fill(0).concat(Array(num_plane).fill(1), Array(num_car).fill(2), Array(num_online).fill(3)))
    return {
        "num_train": num_train,
        "num_plane": num_plane,
        "num_car": num_car,
        "num_online": num_online,
        "which_t": which_t,
        "all_zero": (num_train == 0) && (num_plane == 0) && (num_car == 0) && (num_online == 0)
    }
}

function Map({ data, update_ch, setUpdateData, setTotalCostData, setMinCostData, setMaxCostData }) {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(5.34);
    const [lat, setLat] = useState(46.358);
    const [zoom, setZoom] = useState(4);
    const [currentNumPart, setcurrentNumPart] = useState(0);
    const [currentNumMeet, setcurrentNumMeet] = useState(0);
    const [added, setAdded] = useState(false);
    const [currentLines, setcurrentLines] = useState(new Set(["1-1r", "1-1p"]));

    /*
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
    */
    useEffect(() => {


        if (!update_ch) {
            return
        }

        var num_participants = data["num_participants"]
        var num_meetings = data["num_meetings"]

        var hardcoded_participants = hardcoded_values["part"]
        var hardcoded_meetings = hardcoded_values["meet"]
        var hardcoded_online = hardcoded_values["online"]
        var hardcoded_lines = hardcoded_values["line"]

        for (var i = 0; i < hardcoded_participants.length; i++) {
            if (i < num_participants)
                hardcoded_participants[i].addTo(map.current);
            else {
                hardcoded_participants[i].remove();
                hardcoded_online[i].remove();
            }

        }

        for (var i = 0; i < hardcoded_meetings.length; i++) {
            if (i < num_meetings)
                hardcoded_meetings[i].addTo(map.current);
            else
                hardcoded_meetings[i].remove();
        }

        var nums = calc_nums(data, num_participants, num_meetings)
        var which_t = nums["which_t"]
        var count = 0

        

        if (!map.current) return
        if (!map.current.isStyleLoaded()) return

        var total_cost = 0.0;

        var a = calculate_min_max(num_participants, num_meetings);
        setMinCostData(a[0]);
        setMaxCostData(a[1]);

        var added = Array(num_participants).fill(false);

        for (var i = 0; i < hardcoded_participants.length; i++) {
            for (var j = 0; j < hardcoded_meetings.length; j++) {
                var id = (i + 1) + "-" + (j + 1);

                if (nums["all_zero"] ){
                    map.current.setLayoutProperty(id + "r", 'visibility', 'none');
                    map.current.setLayoutProperty(id + "p", 'visibility', 'none');
                    hardcoded_online[i].remove();
                    continue
                }

                if ((i < num_participants) && (j < num_meetings)) {

                    var i_c = return_icon(which_t[count], hardcoded_lines[i][j][2])
                    total_cost += i_c[1];

                    if (which_t[count] != 3) {
                        if (!added[i])
                            hardcoded_online[i].remove();
                        map.current.setLayoutProperty(id + "p", 'icon-image', i_c[0]);
                        map.current.setLayoutProperty(id + "r", 'visibility', 'visible');
                        map.current.setLayoutProperty(id + "p", 'visibility', 'visible');
                    }
                    else {
                        if (!added[i])
                            hardcoded_online[i].addTo(map.current);
                        added[i] = true
                        map.current.setLayoutProperty(id + "r", 'visibility', 'none');
                        map.current.setLayoutProperty(id + "p", 'visibility', 'none');
                    }
                    count += 1
                }
                else {
                    //
                    if (!added[i])
                        hardcoded_online[i].remove();
                    map.current.setLayoutProperty(id + "r", 'visibility', 'none');
                    map.current.setLayoutProperty(id + "p", 'visibility', 'none');
                }



            }
        }

        if (nums["all_zero"]) {
            setTotalCostData(0)
        }
        else{
            setTotalCostData(total_cost)
        }
        setUpdateData(false)

    }, [update_ch])

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

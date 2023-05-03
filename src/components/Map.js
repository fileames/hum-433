/* eslint import/no-webpack-loader-syntax: off */
import mapboxgl from '!mapbox-gl';
import './Map.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import hardcoded_participants from '../data/hardcoded_participants.js'
import React, { useRef, useEffect, useState } from 'react';

mapboxgl.accessToken = '';

function Map({num_participants}) {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-74.34);
    const [lat, setLat] = useState(40.358);
    const [zoom, setZoom] = useState(9);
    const [currentNumPart, setcurrentNumPart] = useState(0);
    const position = [52.51, 13.38]

    useEffect(() => {
        console.log("hey")
        console.log(num_participants)
        for(var i=0;i<hardcoded_participants.length;i++){
            if (i < num_participants)
                hardcoded_participants[i].addTo(map.current);
            else
                hardcoded_participants[i].remove();
        }
    },[num_participants]) 

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
    container: mapContainer.current,
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [lng, lat],
    zoom: zoom
    });
    },[lng, lat, zoom]);
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
    container: mapContainer.current,
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [lng, lat],
    zoom: zoom
    });
    },[]);

  return (
    <div className="Map">
      <div className="map" id="map" >
        <div ref={mapContainer} className="map-container" />
        </div>  
    </div>
  );
}

export default Map;

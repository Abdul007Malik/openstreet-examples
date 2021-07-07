import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

const Example1 = (props) => {
  const [map, setMap] = useState(null),
    mapRef = useRef(null);
  useEffect(() => {
    let mapObject = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 0,
      }),
    });
    setMap(mapObject);

    return () => mapObject.setTarget(undefined);
  }, []);

  return (
    <div className="example-1">
      <Link to="/">Home</Link>
      <h2>Map Setup</h2>
      <div className="map" ref={mapRef} id="example-1-map"></div>
    </div>
  );
};

export default Example1;

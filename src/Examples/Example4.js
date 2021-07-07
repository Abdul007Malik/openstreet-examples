import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import Draw from "ol/interaction/Draw";
import {Icon, Stroke, Style} from "ol/style";
import Point from "ol/geom/Point";

const Example4 = (props) => {
  const [map, setMap] = useState(null),
    mapRef = useRef(null);

  const styleFunction = (feature) => {
    var geometry = feature.getGeometry();
    var styles = [
      // linestring
      new Style({
        stroke: new Stroke({
          color: '#ffcc33',
          width: 2,
        }),
      })];

    geometry.forEachSegment(function (start, end) {
      var dx = end[0] - start[0];
      var dy = end[1] - start[1];
      var rotation = Math.atan2(dy, dx);
      // arrows
      styles.push(
        new Style({
          geometry: new Point(end),
          image: new Icon({
            src: '/static/images/arrow.png',
            anchor: [0.75, 0.5],
            rotateWithView: true,
            rotation: -rotation,
          }),
        })
      );
    });

    return styles;
  };
  useEffect(() => {
    let source = new VectorSource(),
      mapObject = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          new VectorLayer({
            source: source,
            style: styleFunction,
          })
        ],
        view: new View({
          center: [0, 0],
          zoom: 4,
        }),
      });
    setMap(mapObject);

    mapObject.addInteraction(
      new Draw({
        source: source,
        type: 'LineString',
      })
    );
    return () => mapObject.setTarget(undefined);
  }, []);

  return (
    <div className="example-4">
      <Link to="/">Home</Link>
      <h2>LineString arrows</h2>
      <div className="map" ref={mapRef} id="example-4-map"></div>
    </div>
  );
};

export default Example4;

import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import "ol/ol.css";
import Draw, { createBox, createRegularPolygon } from "ol/interaction/Draw";
import Map from "ol/Map";
import Polygon from "ol/geom/Polygon";
import View from "ol/View";
import { OSM, Vector as VectorSource } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";

// https://openlayers.org/en/latest/examples/draw-shapes.html
const Example2 = (props) => {
    const [map, setMap] = useState(null),
        [source, setSource] = useState(new VectorSource({ wrapX: false })),
        [type, setType] = useState("Circle"),
        mapRef = useRef(null),
        draw = useRef(null);

    const onUndo = () => {
        draw.current.removeLastPoint()
    }
    const addInteraction = () => {
        let value = type
        if (value !== 'None') {
            let geometryFunction;
            if (value === 'Square') {
                value = 'Circle';
                geometryFunction = createRegularPolygon(4);
            } else if (value === 'Box') {
                value = 'Circle';
                geometryFunction = createBox();
            } else if (value === 'Star') {
                value = 'Circle';
                geometryFunction = function (coordinates, geometry) {
                    let center = coordinates[0];
                    let last = coordinates[coordinates.length - 1];
                    let dx = center[0] - last[0];
                    let dy = center[1] - last[1];
                    let radius = Math.sqrt(dx * dx + dy * dy);
                    let rotation = Math.atan2(dy, dx);
                    let newCoordinates = [];
                    let numPoints = 12;
                    for (let i = 0; i < numPoints; ++i) {
                        let angle = rotation + (i * 2 * Math.PI) / numPoints;
                        let fraction = i % 2 === 0 ? 1 : 0.5;
                        let offsetX = radius * fraction * Math.cos(angle);
                        let offsetY = radius * fraction * Math.sin(angle);
                        newCoordinates.push([center[0] + offsetX, center[1] + offsetY]);
                    }
                    newCoordinates.push(newCoordinates[0].slice());
                    if (!geometry) {
                        geometry = new Polygon([newCoordinates]);
                    } else {
                        geometry.setCoordinates([newCoordinates]);
                    }
                    return geometry;
                };
            }
            draw.current = new Draw({
                source: source,
                type: value,
                geometryFunction: geometryFunction,
            });
          map.addInteraction(draw.current);
        }
    }

    useEffect(() => {
        let mapObject = new Map({
                target: mapRef.current,
                layers: [
                    new TileLayer({
                        source: new OSM(),
                    }),
                    new VectorLayer({
                        source
                    }),
                ],
                view: new View({
                    center: [-1100000, 4600000],
                    zoom: 5,
                }),
            });
        setSource(source)
        setMap(mapObject);

        return () => mapObject.setTarget(undefined);
    }, []);

    useEffect(() => {
        if (map) {
            map.removeInteraction(draw.current);
            addInteraction();
        }
    }, [type])
    useEffect(()=>map && addInteraction(), [map])

    return (
        <div className="example-1">
            <Link to="/">Home</Link>
            <h2>Draw Shapes</h2>
            <select value={type || ""} onChange={e => setType(e.target.value)}>
                <option value="" disabled>Select Shape Type</option>
                <option value="Circle">Circle</option>
                <option value="Box">Box</option>
                <option value="Square">Square</option>
                <option value="Star">Star</option>
            </select>
            <button type="button" onClick={onUndo}>Undo</button>
            <div className="map" ref={mapRef} id="example-2-map"></div>
        </div>
    );
};

export default Example2;

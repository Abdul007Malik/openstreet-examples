import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

const Example3 = (props) => {
    const [map, setMap] = useState(null),
        mapRef = useRef(null);
    useEffect(() => {
        let osm = new TileLayer({
            source: new OSM(),
        }),
        osm2 = new TileLayer({
            source: new OSM(),
        }),
            mapObject = new Map({
                target: mapRef.current,
                layers: [
                    osm,osm2
                ],
                view: new View({
                    center: [0, 0],
                    zoom: 0,
                }),
            });
        setMap(mapObject);

        // osm.on('prerender', function (event) {
        //     var ctx = event.context;

        //     // calculate the pixel ratio and rotation of the canvas
        //     var matrix = event.inversePixelTransform;
        //     // console.log(matrix);
        //     // it is use to transform from css pixels to rendered pixel on this event's context 
        //     var canvasPixelRatio = Math.sqrt(
        //         matrix[0] * matrix[0] + matrix[1] * matrix[1]
        //     );
        //     var canvasRotation = -Math.atan2(matrix[1], matrix[0]);
        //     ctx.save();
        //     // center the canvas and remove rotation to position clipping
        //     ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
        //     // ctx.rotate(-canvasRotation);

        //     ctx.scale(3 * canvasPixelRatio, 3 * canvasPixelRatio);
        //     ctx.translate(-75 - 60, -80);
        //     ctx.beginPath();
        //     ctx.moveTo(90 - 60, 130);
        //     ctx.lineTo(95 - 60, 25);
        //     ctx.lineTo(150 - 60, 80);
        //     ctx.lineTo(205 - 60, 25);
        //     ctx.lineTo(210 - 60, 130);
        //     ctx.clip();
        //     ctx.translate(75 - 60, 80);
        //     ctx.scale(1 / 3 / canvasPixelRatio, 1 / 3 / canvasPixelRatio);

        //     // reapply canvas rotation and position
        //     // ctx.rotate(canvasRotation);
        //     ctx.translate(-ctx.canvas.width / 2, -ctx.canvas.height / 2);
        // });

        osm2.on('prerender', function (event) {
            var ctx = event.context;

            // calculate the pixel ratio and rotation of the canvas
            var matrix = event.inversePixelTransform;
            // console.log(matrix);
            // it is use to transform from css pixels to rendered pixel on this event's context 
            var canvasPixelRatio = Math.sqrt(
                matrix[0] * matrix[0] + matrix[1] * matrix[1]
            );
            var canvasRotation = -Math.atan2(matrix[1], matrix[0]);
            ctx.save();
            // center the canvas and remove rotation to position clipping
            ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
            // ctx.rotate(-canvasRotation);

            ctx.scale(3 * canvasPixelRatio, 3 * canvasPixelRatio);
            ctx.translate(-75, -80);
            ctx.beginPath();
            // ctx.moveTo(75, 40);
            ctx.moveTo(90, 130);
            ctx.lineTo(95, 25);
            ctx.lineTo(150, 80);
            ctx.lineTo(205, 25);
            ctx.lineTo(210, 130);
            ctx.stroke();
            ctx.clip();
            ctx.translate(75, 80);
            ctx.scale(1 / 3 / canvasPixelRatio, 1 / 3 / canvasPixelRatio);

            // reapply canvas rotation and position
            // ctx.rotate(canvasRotation);
            ctx.translate(-ctx.canvas.width / 2, -ctx.canvas.height / 2);
        });

        return () => mapObject.setTarget(undefined);
    }, []);

    return (
        <div className="example-3">
            <Link to="/">Home</Link>
            <h2>Layer Clipping</h2>
            <div className="map" ref={mapRef} id="example-3-map"></div>
        </div>
    );
};

export default Example3;

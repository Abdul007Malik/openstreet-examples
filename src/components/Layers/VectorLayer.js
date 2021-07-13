import { useContext, useEffect, useRef } from "react";
import OLVectorLayer from "ol/layer/Vector";
import { Fill, Stroke, Style } from "ol/style";
import CircleStyle from "ol/style/Circle";
import MultiPoint from "ol/geom/MultiPoint";
import Point from "ol/geom/Point";
import { Select, Modify, Snap } from "ol/interaction";
import GeometryType from "ol/geom/GeometryType";
import KML from "ol/format/KML";

const VectorLayer = ({
    map,
    visible,
    source,
    style,
    zIndex = 0,
    layerType,
}) => {
    const vectorLayer = useRef(null),
        select = useRef(null),
        modify = useRef(null),
        snap = useRef(null);
    useEffect(() => {
        if (!map) return;
        vectorLayer.current = new OLVectorLayer({
            source,
            style: [
                new Style({
                    stroke: new Stroke({ color: style.stroke, width: 2 }),
                    fill: new Fill({ color: style.fill }),
                }),
                new Style({
                    image: new CircleStyle({
                        radius: 3,
                        fill: new Fill({
                            color: "blue",
                        }),
                    }),
                    geometry: function (feature) {
                        // return the coordinates of the first ring of the polygon
                        var coordinates = feature.getGeometry().getCoordinates()[0];
                        console.log(
                            feature.getGeometry().getType() === GeometryType.POLYGON
                        );
                        return feature.getGeometry().getType() === GeometryType.POLYGON
                            ? new MultiPoint(coordinates)
                            : null;
                    },
                }),
            ],
        });
        map.addLayer(vectorLayer.current);
        select.current = new Select();
        modify.current = new Modify({ features: select.current.getFeatures() });
        map.addInteraction(select.current);
        map.addInteraction(modify.current);
        vectorLayer.current.setZIndex(zIndex);

        return () => {
            if (map) {
                map.removeLayer(vectorLayer.current);
                map.removeInteraction(select.current);
                map.removeInteraction(modify.current);
                vectorLayer.current = null;
            }
        };
    }, [map, source]);

    useEffect(() => {
        if (vectorLayer.current) vectorLayer.current.setVisible(visible);
    }, [visible]);

    useEffect(() => {
        if (
            vectorLayer.current &&
            style.stroke !==
            vectorLayer.current.getStyle()?.[0]?.getStroke?.()?.getColor?.()
        ) {
            vectorLayer.current.getStyle()?.[0].getStroke().setColor(style.stroke);
            vectorLayer.current.changed();
        }
        if (
            vectorLayer.current &&
            style.fill !==
            vectorLayer.current.getStyle()?.[0]?.getFill?.()?.getColor?.()
        ) {
            vectorLayer.current.getStyle()?.[0].getFill().setColor(style.fill);
            vectorLayer.current.changed();
        }
    }, [style?.stroke, style?.fill]);
    return null;
};
export default VectorLayer;

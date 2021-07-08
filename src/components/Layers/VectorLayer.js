import { useContext, useEffect, useRef } from "react";
import OLVectorLayer from "ol/layer/Vector";
import { Fill, Stroke, Style } from "ol/style";

const VectorLayer = ({ map, visible, source, style, zIndex = 0 }) => {
    const vectorLayer = useRef(null);
    useEffect(() => {
        if (!map) return;
        vectorLayer.current = new OLVectorLayer({
            source,
            style: new Style({
                stroke: new Stroke({ color: style.stroke, width: 2 }),
                fill: new Fill({ color: style.fill }),
            }),
        });
        map.addLayer(vectorLayer.current);
        vectorLayer.current.setZIndex(zIndex);
        return () => {
            if (map) {
                map.removeLayer(vectorLayer.current);
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
            vectorLayer.current.getStyle()?.getStroke?.()?.getColor?.()
        ) {
            vectorLayer.current.getStyle().getStroke().setColor(style.stroke);
            vectorLayer.current.changed();
        }
        if (
            vectorLayer.current &&
            style.fill !== vectorLayer.current.getStyle()?.getFill?.()?.getColor?.()
        ) {
            vectorLayer.current.getStyle().getFill().setColor(style.fill);
            vectorLayer.current.changed();
        }
    }, [style?.stroke, style?.fill]);
    return null;
};
export default VectorLayer;

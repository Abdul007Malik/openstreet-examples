import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
// import Point from "ol/geom/Point";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
// import Feature from "ol/Feature";
import { Circle, Fill, Style, Stroke } from "ol/style";
import ColorPicker from "../components/ColorPicker/ColorPicker";

const India = require("../geojson/India.json"),
  Spain = require("../geojson/Spain.json"),
  Egypt = require("../geojson/Egypt.json"),
  Random = require("../geojson/Random.json");

const IndiaLayer = new VectorLayer({
    visible: false,
    source: new VectorSource({
      features: new GeoJSON().readFeatures(India, {
        dataProjection: "EPSG:4326",
        featureProjection: "EPSG:3857",
      }),
    }),
  }),
  SpainLayer = new VectorLayer({
    visible: false,
    source: new VectorSource({
      features: new GeoJSON().readFeatures(Spain, {
        dataProjection: "EPSG:4326",
        featureProjection: "EPSG:3857",
      }),
    }),
  }),
  EgyptLayer = new VectorLayer({
    visible: false,
    source: new VectorSource({
      features: new GeoJSON().readFeatures(Egypt, {
        dataProjection: "EPSG:4326",
        featureProjection: "EPSG:3857",
      }),
    }),
  });

const Example5 = (props) => {
  const [map, setMap] = useState(null),
    [selectedLayers, setSelectedLayers] = useState({
      India: {},
      Spain: {},
      Egypt: {},
    }),
    mapRef = useRef(null),
    onChangeVisibility = (e) => {
      setSelectedLayers((prev) => ({
        ...prev,
        [e.target.value]: {
          ...prev[e.target.value],
          visible: e.target.checked,
        },
      }));
    },
    onChangeStroke = (type) => (stroke) => {
      setSelectedLayers((prev) => ({
        ...prev,
        [type]: {
          ...prev[type],
          stroke,
        },
      }));
    },
    onChangeFill = (type) => (fill) => {
      setSelectedLayers((prev) => ({
        ...prev,
        [type]: {
          ...prev[type],
          fill,
        },
      }));
    };

  useEffect(() => {
    IndiaLayer.setStyle(
      new Style({
        stroke: new Stroke({
          color: selectedLayers.India.stroke,
          width: 2,
        }),
        fill: new Fill({
          color: selectedLayers.India.fill,
        }),
      })
    );
    SpainLayer.setStyle(
      new Style({
        stroke: new Stroke({
          color: selectedLayers.Spain.stroke,
          width: 2,
        }),
        fill: new Fill({
          color: selectedLayers.Spain.fill,
        }),
      })
    );
    EgyptLayer.setStyle(
      new Style({
        stroke: new Stroke({
          color: selectedLayers.Egypt.stroke,
          width: 2,
        }),
        fill: new Fill({
          color: selectedLayers.Egypt.fill,
        }),
      })
    );

    let source = new VectorSource({
        features: new GeoJSON().readFeatures(India, {
          dataProjection: "EPSG:4326",
          featureProjection: "EPSG:3857",
        }),
      }),
      Delhi = [-110, 45],
      mapObject = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          IndiaLayer,
          EgyptLayer,
          SpainLayer,
        ],
        view: new View({
          zoom: 2,
          center: [0, 0],
        }),
      });
    setMap(mapObject);

    // mapObject.getView().fit(IndiaLayer.getExtent(), { duration: 300, maxZoom: 21, size: mapObject.getSize() })

    return () => mapObject.setTarget(undefined);
  }, []);

  useEffect(() => {
    // visiblity toggle
    if (selectedLayers.India.visible !== IndiaLayer.getVisible()) {
      IndiaLayer.setVisible(selectedLayers.India.visible);
    }
    if (selectedLayers.Spain.visible !== SpainLayer.getVisible()) {
      SpainLayer.setVisible(selectedLayers.Spain.visible);
    }
    if (selectedLayers.Egypt.visible !== EgyptLayer.getVisible()) {
      // debugger;
      EgyptLayer.setVisible(selectedLayers.Egypt.visible);
    }

    //stroke change
    if (
      selectedLayers.India.stroke !==
      IndiaLayer.getStyle()?.getStroke?.()?.getColor?.()
    ) {
      IndiaLayer.getStyle().getStroke().setColor(selectedLayers.India.stroke);
      IndiaLayer.changed();
    }
    if (
      selectedLayers.Spain.stroke !==
      SpainLayer.getStyle()?.getStroke?.()?.getColor?.()
    ) {
      SpainLayer.getStyle().getStroke().setColor(selectedLayers.Spain.stroke);
      SpainLayer.changed();
    }
    if (
      selectedLayers.Egypt.stroke !==
      EgyptLayer.getStyle()?.getStroke?.()?.getColor?.()
    ) {
      // debugger;
      EgyptLayer.getStyle().getStroke().setColor(selectedLayers.Egypt.stroke);
      EgyptLayer.changed();
    }

    //fill change
    if (
      selectedLayers.India.fill !==
      IndiaLayer.getStyle()?.getFill?.()?.getColor?.()
    ) {
      IndiaLayer.getStyle().getFill().setColor(selectedLayers.India.fill);
      IndiaLayer.changed();
    }
    if (
      selectedLayers.Spain.fill !==
      SpainLayer.getStyle()?.getFill?.()?.getColor?.()
    ) {
      SpainLayer.getStyle().getFill().setColor(selectedLayers.Spain.fill);
      SpainLayer.changed();
    }
    if (
      selectedLayers.Egypt.fill !==
      EgyptLayer.getStyle()?.getFill?.()?.getColor?.()
    ) {
      // debugger;
      EgyptLayer.getStyle().getFill().setColor(selectedLayers.Egypt.fill);
      EgyptLayer.changed();
    }
  }, [selectedLayers]);

  return (
    <div className="example-5">
      <Link to="/">Home</Link>
      <h2>Apply Layers</h2>
      <div className="options">
        <div className="opt">
          <div>
            <input
              type="checkbox"
              id="India"
              value="India"
              onChange={onChangeVisibility}
            />
            <label htmlFor="India">India</label>
          </div>
          <ColorPicker
            title={"Stroke"}
            /* color={selectedLayers.India.color} */ onChange={onChangeStroke(
              "India"
            )}
          />
          <ColorPicker
            title={"Fill"}
            isLight
            /* color={selectedLayers.India.color} */ onChange={onChangeFill(
              "India"
            )}
          />
        </div>
        <div className="opt">
          <div>
            <input
              type="checkbox"
              id="Egypt"
              value="Egypt"
              onChange={onChangeVisibility}
            />
            <label htmlFor="Egypt">Egypt</label>
          </div>
          <ColorPicker
            title={"Stroke"}
            /* color={selectedLayers.Spain.color} */ onChange={onChangeStroke(
              "Egypt"
            )}
          />
          <ColorPicker
            title={"Fill"}
            isLight
            /* color={selectedLayers.Spain.color} */ onChange={onChangeFill(
              "Egypt"
            )}
          />
        </div>
        <div className="opt">
          <div>
            <input
              type="checkbox"
              id="Spain"
              value="Spain"
              onChange={onChangeVisibility}
            />
            <label htmlFor="Spain">Spain</label>
          </div>
          <ColorPicker
            title={"Stroke"}
            /* color={selectedLayers.Egypt.color} */ onChange={onChangeStroke(
              "Spain"
            )}
          />
          <ColorPicker
            title={"Fill"}
            isLight
            /* color={selectedLayers.Egypt.color} */ onChange={onChangeFill(
              "Spain"
            )}
          />
        </div>
      </div>
      <div className="map" ref={mapRef} id="example-5-map"></div>
    </div>
  );
};

export default Example5;

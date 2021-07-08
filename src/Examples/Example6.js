import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
// import Point from "ol/geom/Point";
import OLVectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
// import Feature from "ol/Feature";
import { Circle, Fill, Style, Stroke } from "ol/style";
import ColorPicker from "../components/ColorPicker/ColorPicker";
import VectorLayer from "../components/Layers/VectorLayer";

const India = require("../geojson/India.json"),
  Spain = require("../geojson/Spain.json"),
  Egypt = require("../geojson/Egypt.json"),
  Random = require("../geojson/Random.json");

const Example6 = (props) => {
  const [map, setMap] = useState(null),
    [form, setForm] = useState({
      stroke: "#000000",
      fill: "rgb(0, 0, 0, 0.4)",
    }),
    [formLayerSource, setFormLayerSource] = useState(),
    [layers, setLayers] = useState([
      {
        name: "India",
        source: new VectorSource({
          features: new GeoJSON().readFeatures(India, {
            dataProjection: "EPSG:4326",
            featureProjection: "EPSG:3857",
          }),
          style: { stroke: "#000000", fill: "rgb(0, 0, 0, 0.4)" },
        }),
        visible: true,
        style: { stroke: "#000000", fill: "rgb(0, 0, 0, 0.4)" },
      },
      {
        name: "Spain",
        source: new VectorSource({
          features: new GeoJSON().readFeatures(Spain, {
            dataProjection: "EPSG:4326",
            featureProjection: "EPSG:3857",
          }),
        }),
        visible: true,
        style: {
          stroke: "#000000",
          fill: "rgb(0, 0, 0, 0.4)",
        },
      },
      {
        name: "Egypt",
        source: new VectorSource({
          features: new GeoJSON().readFeatures(Egypt, {
            dataProjection: "EPSG:4326",
            featureProjection: "EPSG:3857",
          }),
          style: {
            stroke: "#000000",
            fill: "rgb(0, 0, 0, 0.4)",
          },
        }),
        visible: true,
        style: { stroke: "#000000", fill: "rgb(0, 0, 0, 0.4)" },
      },
    ]),
    mapRef = useRef(null),
    onChangeVisibility = (index) => (e) => {
      setLayers((prev) =>
        Object.assign([], prev, {
          [index]: {
            ...prev[index],
            visible: e.target.checked,
          },
        })
      );
    },
    onChangeStroke = (index) => (stroke) => {
      setLayers((prev) =>
        Object.assign([], prev, {
          [index]: Object.assign({}, prev[index], {
            style: { ...prev[index]?.style, stroke },
          }),
        })
      );
    },
    onChangeFill = (index) => (fill) => {
      setLayers((prev) =>
        Object.assign([], prev, {
          [index]: Object.assign({}, prev[index], {
            style: { ...prev[index]?.style, fill },
          }),
        })
      );
    },
    addLayer = (e) => {
      e.preventDefault();
      console.log(
        document.querySelector('input[name="layer_name"]')?.value,
        document.querySelector('input[name="stroke"]')?.value,
        document.querySelector('input[name="stroke"]')?.value
      );
      let source;
      if (!form.name || !form.file) {
        return alert("Name or Geo Json file is missing");
      }
      if (form.file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            console.log(JSON.parse(event.target.result));
            source = new VectorSource({
              features: new GeoJSON().readFeatures(
                JSON.parse(event.target.result),
                {
                  dataProjection: "EPSG:4326",
                  featureProjection: "EPSG:3857",
                }
              ),
            });
            setLayers((prev) =>
              prev.concat({
                name: form.name,
                source,
                style: { stroke: form.stroke, fill: form.fill },
                visible: true,
              })
            );
            setFormLayerSource(null);
            setForm({});
          } catch (error) {
            source = null;
            console.log(error);
            return alert("Geo Json file is invalid");
          }
        };
        reader.readAsText(form.file);
      }
    },
    onDelete = (index) => {
      setLayers((prev) => prev.filter((_, inx) => inx !== index));
    };

  useEffect(() => {
    let mapObject = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
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
    let source;
    if (form.file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          console.log(JSON.parse(event.target.result));
          source = new VectorSource({
            features: new GeoJSON().readFeatures(
              JSON.parse(event.target.result),
              {
                dataProjection: "EPSG:4326",
                featureProjection: "EPSG:3857",
              }
            ),
          });
        } catch (error) {
          source = null;
          console.log(error);
        }
        setFormLayerSource(source);
      };
      reader.readAsText(form.file);
    } else if (!Object.keys(form).length) {
      document.querySelector("form").reset();
    }

    // return () => {
    //   if(source)
    // }
  }, [form]);

  return (
    <div className="example-6">
      <Link to="/">Home</Link>
      <h2>Apply Layers</h2>
      <div className="options">
        {layers.map((_, inx) => {
          return (
            <div className="opt">
              <VectorLayer map={map} {..._} />
              <div className="row">
                <input
                  className="col"
                  type="checkbox"
                  id={_.name}
                  value={_.name}
                  onChange={onChangeVisibility(inx)}
                  checked={_.visible}
                />
                <label className="col" htmlFor={_.name}>
                  {_.name}
                </label>
              </div>
              <ColorPicker title={"Stroke"} onChange={onChangeStroke(inx)} />
              <ColorPicker
                title={"Fill"}
                isLight
                onChange={onChangeFill(inx)}
              />
              <button
                className="btn btn-outline-danger"
                type="button"
                onClick={() => onDelete(inx)}
              >
                <i className="far fa-trash-alt" />
              </button>
            </div>
          );
        })}
      </div>
      <h4>Add Layer (+) </h4>
      <form onSubmit={addLayer}>
        <div className="col-md-10 col-lg-8 col-xl-6 fields">
          <input
            placeholder="Layer Name"
            name="layer_name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <ColorPicker
            title="Stroke"
            name="stroke"
            onChange={(color) => setForm({ ...form, stroke: color })}
          />
          <ColorPicker
            title="Fill"
            isLight
            name="fill"
            onChange={(color) => setForm({ ...form, fill: color })}
          />
          <input
            type="file"
            name="geojson_file"
            onChange={(e) => setForm({ ...form, file: e.target.files[0] })}
          />
          <button className="btn btn-outline-primary btn-plus">
            <i className="fas fa-plus" />
          </button>
          {form.file && (
            <VectorLayer
              map={map}
              source={formLayerSource}
              visible
              style={{ stroke: form.stroke, fill: form.fill }}
            />
          )}
        </div>
      </form>
      <div className="map" ref={mapRef} id="example-6-map"></div>
    </div>
  );
};

export default Example6;

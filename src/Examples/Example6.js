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
import KML from "ol/format/KML";
import {
  Select,
  Modify,
  DragAndDrop,
  defaults as defaultInteractions,
} from "ol/interaction";
// import Feature from "ol/Feature";
import { Circle, Fill, Style, Stroke } from "ol/style";
import ColorPicker from "../components/ColorPicker/ColorPicker";
import VectorLayer from "../components/Layers/VectorLayer";
import JSZip, { file } from "jszip";

const India = require("../geojson/India.json"),
  Spain = require("../geojson/Spain.json"),
  Egypt = require("../geojson/Egypt.json");

function getLayerType(file) {
  let ext =
    file.name.substring(file.name.lastIndexOf(".") + 1, file.name.length) ||
    file.name;
  switch (ext) {
    case "kml":
    case "KML":
      return "KML";

    default:
      return "GEOJSON";
  }
}

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
        }),
        visible: true,
        layerType: "GEOJSON",
        style: { stroke: "rgb(173, 20, 87)", fill: "rgb(235, 128, 174, 0.4)" },
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
        layerType: "GEOJSON",
        style: {
          stroke: "rgb(242, 72, 34)",
          fill: "rgb(228, 159, 144, 0.4)",
        },
      },
      {
        name: "Egypt",
        source: new VectorSource({
          features: new GeoJSON().readFeatures(Egypt, {
            dataProjection: "EPSG:4326",
            featureProjection: "EPSG:3857",
          }),
        }),
        visible: true,
        layerType: "GEOJSON",
        style: { stroke: "rgb(228, 196, 65)", fill: "rgb(236, 224, 173, 0.4)" },
      },
    ]),
    mapRef = useRef(null),
    select = useRef(null),
    modify = useRef(null),
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
    getSource = (file, event, options = {}) => {
      if (!file) return null;
      let features,
        ext =
          file.name.substring(
            file.name.lastIndexOf(".") + 1,
            file.name.length
          ) || file.name;

      console.log("extention", ext);
      switch (ext) {
        case "KML":
        case "kml":
          features = new KML(
            options.extractStyles === false
              ? { extractStyles: false }
              : undefined
          ).readFeatures(event.target.result, {
            dataProjection: "EPSG:4326",
            featureProjection: "EPSG:3857",
          });
          break;

        default:
          features = new GeoJSON().readFeatures(
            JSON.parse(event.target.result),
            {
              dataProjection: "EPSG:4326",
              featureProjection: "EPSG:3857",
            }
          );
          break;
      }
      return new VectorSource({
        features,
      });
    },
    addLayer = (e) => {
      e.preventDefault();
      // console.log(
      //   document.querySelector('input[name="layer_name"]')?.value,
      //   document.querySelector('input[name="stroke"]')?.value,
      //   document.querySelector('input[name="stroke"]')?.value
      // );
      let source,
        name = document.querySelector('input[name="layer_name"]')?.value;
      if (!name || !form.file) {
        return alert("Name or file is missing");
      }
      // if (form.isDragged) {
      //   setLayers((prev) =>
      //     prev.concat({
      //       name,
      //       source: form.file,
      //       extractStyles: form.hasStyles,
      //       layerType: getLayerType(form.file),
      //       style: { stroke: form.stroke, fill: form.fill },
      //       visible: true,
      //     })
      //   );
      //   setFormLayerSource(null);
      //   setForm({});
      //   return
      // }
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          // console.log(JSON.parse(event.target.result));
          source = getSource(form.file, event, {
            extractStyles: form.hasStyles,
          });
          setLayers((prev) =>
            prev.concat({
              name,
              source,
              extractStyles: form.hasStyles,
              layerType: getLayerType(form.file),
              style: { stroke: form.stroke, fill: form.fill },
              visible: true,
            })
          );
          setFormLayerSource(null);
          setForm({});
        } catch (error) {
          source = null;
          console.log(error);
          return alert("Geo Json/kml file is invalid");
        }
      };
      reader.readAsText(form.file);
    },
    onDelete = (index) => {
      setLayers((prev) => prev.filter((_, inx) => inx !== index));
    };

  //init map
  useEffect(() => {
    let dragAndDropInteraction = new DragAndDrop({
      formatConstructors: [GeoJSON, KML],
    }),
      mapObject = new Map({
        target: mapRef.current,
        interactions: defaultInteractions().extend([dragAndDropInteraction]),
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

    select.current = new Select();
    modify.current = new Modify({ features: select.current.getFeatures() });
    mapObject.addInteraction(select.current);
    mapObject.addInteraction(modify.current);

    dragAndDropInteraction.on("addfeatures", function (event) {
      setForm((prev) => ({
        ...prev,
        file: event.file,
        isDragged: true,
        layerType: getLayerType(event.file),
        hasStyles: getLayerType(event.file) === "KML",
        fill: (form.fill !== "#000000" && form.fill) || "rgb(0,0,0, 0.4)",
      }));
    });
    // mapObject.getView().fit(IndiaLayer.getExtent(), { duration: 300, maxZoom: 21, size: mapObject.getSize() })

    // delete key bind
    document.addEventListener("keydown", (e) => {
      if (e.key === "Delete" && select.current?.getFeatures?.()) {
        mapObject.getLayers().forEach((layer) => {
          if (!(layer instanceof OLVectorLayer)) return;
          select.current.getFeatures().forEach((_) => {
            let s = layer.getSource();
            if (s.hasFeature(_)) s.removeFeature(_);
          });
        });
      }
    });

    return () => {
      mapObject.setTarget(undefined);
      // dragAndDropInteraction.off("addfeatures")
      mapObject.removeInteraction(select.current);
      mapObject.removeInteraction(modify.current);
    };
  }, []);

  //set source on file change
  useEffect(() => {
    if (!form.file) return;
    let source;
    // if (form.isDragged) {
    //   source = new VectorSource({
    //     features: form.file,
    //   });
    //   if (map) map.getView().fit(source.getExtent());
    //   setFormLayerSource(source);
    //   return
    // }
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        // debugger;
        source = getSource(form.file, event, {
          extractStyles: form.hasStyles,
        });
        if (map) map.getView().fit(source.getExtent());
      } catch (error) {
        source = null;
        console.log(error);
      }
      setFormLayerSource(source);
    };
    reader.readAsText(form.file);
  }, [form.file, form.hasStyles]);

  //reset form data
  useEffect(() => {
    if (!Object.keys(form).length) {
      document.querySelector("form").reset();
    }
  }, [form]);

  return (
    <div className="example-6">
      <Link to="/">Home</Link>
      <h2>Apply Layers</h2>
      <div className="options">
        {layers.map((_, inx) => {
          return (
            <div className="opt" key={inx}>
              <VectorLayer map={map} {..._} />
              <div className="">
                <input
                  className=""
                  type="checkbox"
                  id={_.name}
                  value={_.name}
                  onChange={onChangeVisibility(inx)}
                  checked={_.visible}
                />
                <label className="" htmlFor={_.name}>
                  {_.name}
                </label>
              </div>
              <ColorPicker
                disabled={_.extractStyles}
                title={"Stroke"}
                color={_.style?.stroke}
                onChange={onChangeStroke(inx)}
              />
              <ColorPicker
                disabled={_.extractStyles}
                title={"Fill"}
                color={_.style?.fill}
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
        <div className="col fields mb-3">
          <input
            placeholder="Layer Name"
            name="layer_name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          {form.layerType === "KML" && (
            <div className="row ms-2">
              <span className="mr-2">Disable Kml Styles</span>
              <div>
                <input
                  className="mx-2"
                  name="extract_styles"
                  id="extract_styles1"
                  type="radio"
                  value={1}
                  checked={!form.hasStyles}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, hasStyles: false }))
                  }
                />
                <label htmlFor="extract_styles1">Yes</label>
                <input
                  className="mx-2"
                  name="extract_styles"
                  id="extract_styles0"
                  type="radio"
                  value={0}
                  checked={form.hasStyles}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, hasStyles: true }))
                  }
                />
                <label htmlFor="extract_styles0">No</label>
              </div>
            </div>
          )}

          <ColorPicker
            title="Stroke"
            name="stroke"
            color={form.stroke || "#000000"}
            disabled={form.hasStyles}
            onChange={(color) => setForm({ ...form, stroke: color })}
          />
          <ColorPicker
            title="Fill"
            isLight
            name="fill"
            color={form.fill || "rgb(0,0,0, 0.4)"}
            disabled={form.hasStyles}
            onChange={(color) => setForm({ ...form, fill: color })}
          />

          <input
            type="file"
            name="geojson_file"
            onChange={(e) =>
              setForm({
                ...form,
                file: e.target.files[0],
                isDragged: false,
                layerType: getLayerType(e.target.files[0]),
                hasStyles: getLayerType(e.target.files[0]) === "KML",
                fill:
                  (form.fill !== "#000000" && form.fill) || "rgb(0,0,0, 0.4)",
              })
            }
          />
          <button className="btn btn-outline-primary btn-plus">
            <i className="fas fa-plus" />
          </button>
          <button
            type="button"
            className="btn btn-outline-warning ms-2"
            onClick={() => setForm({})}
          >
            <i className="fas fa-redo" />
          </button>
          {form.file && (
            <VectorLayer
              map={map}
              source={formLayerSource}
              layerType={getLayerType(form.file)}
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

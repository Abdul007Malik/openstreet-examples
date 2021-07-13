import React, { useEffect, useRef, useState } from "react";
import useOutside from "../../shared/hooks/outsideClick";
import colors from "./Color.json";
import "./ColorPicker.css";

const ColorPicker = ({
  name,
  className,
  containerClassName,
  color,
  isLight,
  defaultColor = "#000000",
  onChange,
  title,
  disabled
}) => {
  const [open, setOpen] = useState(false),
    [value, setValue] = useState(defaultColor),
    ref = useRef(),
    isUndefined = typeof color == "undefined";

  const onClickColor = (c) => {
    if (!isUndefined) {
      if (c !== color) onChange(c);
    } else setValue(c);
  };

  useOutside(ref, () => setOpen(false));

  if (!isUndefined) {
    useEffect(() => {
      setValue(color);
    }, [color]);
  }

  if (isUndefined) {
    useEffect(() => {
      if (typeof onChange === "function" && !disabled) onChange(value);
    }, [value, disabled, onChange]);
  }

  return (
    <div ref={ref} className={`cp-container  ${containerClassName}`}>
      <div className={`cp-swatch-head ${className}  ${disabled && "disabled"}`}>
        <label>{title}</label>
        <div className={`cp-swatch ${disabled && "disabled"}`} onClick={() => setOpen(!open)}>
          <Box color={value} disabled={disabled} />
          <input
            value={value}
            name={name}
            hidden
            readOnly
            onChange={(e) => !e.target.value && setValue(defaultColor)}
          />
        </div>
      </div>

      {open && (
        <div className="cp-opts">
          <div className="list">
            {/* <div className="fixed"></div> */}
            <div className="cp-colors">
              {colors[isLight ? "light" : "dark"].map((c) => (
                <Box
                  isSelected={c === value}
                  key={c}
                  color={c}
                  onClick={() => onClickColor(c)}
                />
              ))}
              <div className="cp-code">
                <span>#</span>
                <input value={value} readOnly />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Box = ({ color, onClick, isSelected }) => (
  <div className={`cp-box ${isSelected ? "checked" : ""}`}>
    <div
      className="cp-content"
      style={{ background: color }}
      data-color={color}
      onClick={onClick}
    ></div>
  </div>
);

export default ColorPicker;

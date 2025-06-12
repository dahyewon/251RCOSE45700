import React from "react";
import { DROPDOWN_OPTIONS } from "../constants";

interface RendererProps {
  name: string;
  value: string | number | boolean;
  onChange: (newValue: string | number | boolean) => void;
}

export const ColorRenderer: React.FC<RendererProps> = ({ name, value, onChange }) => (
  <div className="propertyItem" key={name}>
    <span>{name}:</span>
    <input
      type="color"
      value={value as string}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export const TextRenderer: React.FC<RendererProps> = ({ name, value, onChange }) => (
  <div className="propertyItem" key={name}>
    <span>{name}:</span>
    <input
      type="text"
      value={value as string}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export const NumberRenderer: React.FC<RendererProps> = ({ name, value, onChange }) => (
  <div className="propertyItem" key={name}>
    <span>{name}:</span>
    <input
      type="number"
      value={value as number}
      onChange={(e) => onChange(Number(e.target.value))}
    />
  </div>
);

export const DropdownRenderer: React.FC<RendererProps> = ({ name, value, onChange }) => {
  const options = DROPDOWN_OPTIONS[name] || [];

  return <div className="propertyItem" key={name}>
    <span>{name}:</span>
    <select
      value={value as string}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
};

export const ReadOnlyRenderer: React.FC<RendererProps> = ({ name, value }) => (
  <div className="propertyItem" key={name}>
    <span>{name}:</span>
    <strong>{value}</strong>
  </div>
);

export const BooleanRenderer: React.FC<RendererProps> = ({ name, value, onChange }) => (
  <div className="propertyItem" key={name}>
    <button
      className={value ? "active" : ""}
      onClick={() => onChange(!value)}
      type="button"
      style={{
        fontWeight: name === "B" ? "bold" : undefined,
        fontStyle: name === "I" ? "italic" : undefined,
        background: value ? "#ddd" : "#fff",
        border: "1px solid #ccc",
        width: 32,
        height: 32,
        margin: 2,
        cursor: "pointer",
      }}
    >
      {name}
    </button>
  </div>
);
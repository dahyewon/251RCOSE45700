import React from "react";
import { DROPDOWN_OPTIONS } from "../constants";

interface RendererProps {
  name: string;
  value: string | number;
  onChange: (newValue: string | number) => void;
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
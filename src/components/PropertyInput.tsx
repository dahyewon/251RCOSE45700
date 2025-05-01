import React from "react";
import { PROPERTY_TYPES } from "../constants/";

interface PropertyInputProps {
  name: string;
  value: string | number;
  type: string;
  options?: string[];
  onChange: (newValue: string | number) => void;
}

const PropertyInput: React.FC<PropertyInputProps> = ({
  name,
  value,
  type,
  options,
  onChange,
}) => {
  switch (type) {
    case PROPERTY_TYPES.COLOR:
      return (
        <div className="propertyItem">
          <span>{name}:</span>
          <input
            type="color"
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      );
    case PROPERTY_TYPES.TEXT:
      return (
        <div className="propertyItem">
          <span>{name}:</span>
          <input
            type="text"
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      );
    case PROPERTY_TYPES.NUMBER:
      return (
        <div className="propertyItem">
          <span>{name}:</span>
          <input
            type="number"
            value={value as number}
            onChange={(e) => onChange(Number(e.target.value))}
          />
        </div>
      );
    case PROPERTY_TYPES.DROPDOWN:
      return (
        <div className="propertyItem">
          <span>{name}:</span>
          <select
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
          >
            {options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      );
    default:
      return null;
  }
};

export default PropertyInput;
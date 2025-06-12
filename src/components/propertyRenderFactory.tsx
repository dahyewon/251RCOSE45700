import React from "react";
import {
  ColorRenderer,
  DropdownRenderer,
  NumberRenderer,
  ReadOnlyRenderer,
  TextRenderer,
  BooleanRenderer,
} from "./propertyRenderers";
import { PROPERTY_TYPES, PROPERTY_NAMES } from "../constants";

type RendererProps = {
  name: string;
  value: string | number | boolean;
  onChange: (newValue: string | number | boolean) => void;
};

type PropertyItem = {
  type: string;
  name: string;
  value: string | number | boolean;
};

type GroupedProperties = Record<string, PropertyItem[]>;

function getPropertyKeyByName(name: string): string | undefined {
  return Object.keys(PROPERTY_NAMES).find(
    (key) => PROPERTY_NAMES[key as keyof typeof PROPERTY_NAMES] === name
  );
}

function groupPropertiesByKeyPrefix(
  properties: PropertyItem[]
): GroupedProperties {
  const groupMap: GroupedProperties = {};
  properties.forEach((prop) => {
    const key = getPropertyKeyByName(prop.name) || prop.name;
    const match = key.match(/^[A-Z]+/);
    const group = match ? match[0] : "기타";
    if (!groupMap[group]) groupMap[group] = [];
    groupMap[group].push(prop);
  });
  return groupMap;
}

const rendererMap: Record<string, (props: RendererProps) => React.ReactNode> = {
  [PROPERTY_TYPES.COLOR]: ({ name, value, onChange }) => (
    <ColorRenderer name={name} value={value} onChange={onChange} />
  ),
  [PROPERTY_TYPES.TEXT]: ({ name, value, onChange }) => (
    <TextRenderer name={name} value={value} onChange={onChange} />
  ),
  [PROPERTY_TYPES.NUMBER]: ({ name, value, onChange }) => (
    <NumberRenderer
      name={name}
      value={typeof value === "number" ? Math.abs(value) : value}
      onChange={onChange}
    />
  ),
  [PROPERTY_TYPES.DROPDOWN]: ({ name, value, onChange }) => (
    <DropdownRenderer name={name} value={value} onChange={onChange} />
  ),
  [PROPERTY_TYPES.READ]: ({ name, value }) => (
    <ReadOnlyRenderer name={name} value={value} onChange={() => {}} />
  ),
  [PROPERTY_TYPES.BOOLEAN]: ({ name, value, onChange }) => (
    <BooleanRenderer name={name} value={value} onChange={onChange} />
  ),
};

export class PropertyRendererFactory {
  static createRenderer(
    type: string,
    name: string,
    value: string | number | boolean,
    onChange: (newValue: string | number | boolean) => void
  ): React.ReactNode {
    const renderer = rendererMap[type];
    return renderer ? renderer({ name, value, onChange }) : null;
  }

  static renderGroupedProperties(
    properties: PropertyItem[],
    onChange: (name: string, value: string | number | boolean) => void
  ): React.ReactNode {
    const grouped = groupPropertiesByKeyPrefix(properties);
    return Object.entries(grouped).map(([group, props]) => (
      <div key={group} className="propertyGroup">
        <div className="groupTitle">{group}</div>
        {props.map((prop) =>
          PropertyRendererFactory.createRenderer(
            prop.type,
            prop.name,
            prop.value,
            (value) => onChange(prop.name, value)
          )
        )}
      </div>
    ));
  }
}

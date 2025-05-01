import React from "react";
import { ColorRenderer, DropdownRenderer, NumberRenderer, ReadOnlyRenderer, TextRenderer } from "./propertyRenderers";
import { PROPERTY_TYPES } from "../constants";


type RendererProps = {
    name: string;
    value: string | number;
    options?: string[];
    onChange: (newValue: string | number) => void;
};

const rendererMap: Record<string, (props: RendererProps) => React.ReactNode> = {
    [PROPERTY_TYPES.COLOR]: ({ name, value, onChange }) => (
      <ColorRenderer name={name} value={value} onChange={onChange} />
    ),
    [PROPERTY_TYPES.TEXT]: ({ name, value, onChange }) => (
      <TextRenderer name={name} value={value} onChange={onChange} />
    ),
    [PROPERTY_TYPES.NUMBER]: ({ name, value, onChange }) => (
      <NumberRenderer name={name} value={value} onChange={onChange} />
    ),
    [PROPERTY_TYPES.DROPDOWN]: ({ name, value, options, onChange }) => (
      <DropdownRenderer name={name} value={value} options={options} onChange={onChange} />
    ),
    [PROPERTY_TYPES.READ]: ({ name, value }) => (
      <ReadOnlyRenderer name={name} value={value} onChange={() => {}} />
    ),
};
  

export class PropertyRendererFactory {
    static createRenderer(
        type: string,
        name: string,
        value: string | number,
        options: string[] | undefined,
        onChange: (newValue: string | number) => void
    ): React.ReactNode {
        const renderer = rendererMap[type];
        return renderer
            ? renderer({ name, value, options, onChange })
            : null;
    }
}
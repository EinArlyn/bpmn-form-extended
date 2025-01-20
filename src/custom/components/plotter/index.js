import { IFrame } from "@bpmn-io/form-js";
import { html } from "diagram-js/lib/ui";
import classNames from "classnames";
import "../../../assets/js/bundle.js";

export const plotterType = "plotter";

export function PlotterRenderer(props) {
  // #region Constants
  const { field } = props;
  const { plotter } = field;
  //#endregion

  if (plotter !== null && plotter !== undefined) {
    const model = jsonParse(plotter.model);
    if (model !== null) {
      // document.querySelector('configurator-component').setAttribute('model', JSON.stringify(model));
      setTimeout(() => {
        document.querySelector('configurator-component').setAttribute('model', JSON.stringify(model));
      }, 2000);
    } else {
      console.warn("Model is not an object", plotter.model);
    }
  }

  const styles = {
    height: `600px`,
  };

  return html`<div style=${styles} class=${formFieldClasses(plotterType)}>
    <configurator-component></configurator-component>
  </div>`;
}

function formFieldClasses() {
  return classNames("fjs-form-field");
}

function jsonParse(value) {
  if (value == null) {
    console.warn("Value is null or undefined");
    return null;
  }

  try {
    const result = JSON.parse(value);
    return typeof result === "object" && result !== null ? result : null;
  } catch (error) {
    console.warn("Invalid JSON:", error.message);
    return null;
  }
}

PlotterRenderer.config = {
  ...IFrame.config,
  group: "container",
  type: plotterType,
  label: "Plotter",
  // iconUrl: `data:image/svg+xml,${encodeURIComponent(RangeIcon)}`,
  propertiesPanelEntries: [
    "key",
    "label",
    "description",
    "disabled",
    "readonly",
  ],
};

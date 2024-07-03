import { IFrame } from "@bpmn-io/form-js";
import { html } from "diagram-js/lib/ui";
import classNames from "classnames";
import "../../../assets/css/plotter.css";
import "../../../assets/js/plotter.js";

export const plotterType = "plotter";

export function PlotterRenderer(props) {
  console.log("PlotterRenderer", props);

  // #region Constants
  const { field } = props;
  const { plotter = { height: 600 } } = field;
  const { height } = plotter;
  //#endregion

  console.log("Plotter", plotter);

  const styles = {
    height: `${height}px`,
  };

  return html`<div style=${styles} class=${formFieldClasses(plotterType)}>
    <configurator-editor-component
      view-mode="select"
      edit-mode="true"
    ></configurator-editor-component>
  </div>`;
}

const webcomponent = document.querySelector("configurator-editor-component");
console.log("webcomponent", webcomponent);

function formFieldClasses() {
  return classNames("fjs-form-field");
}

PlotterRenderer.config = {
  ...IFrame.config,
  group: "container",
  type: plotterType,
  label: "Plotter",
  // iconUrl: `data:image/svg+xml,${encodeURIComponent(RangeIcon)}`,
  propertiesPanelEntries: [
    "key",
    "height",
    "label",
    "description",
    "disabled",
    "readonly",
  ],
};

console.log("PlotterRenderer.config", PlotterRenderer.config);

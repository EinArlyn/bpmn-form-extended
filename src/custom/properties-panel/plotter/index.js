import { get, set } from "min-dash";
import {
  NumberFieldEntry,
  isNumberFieldEntryEdited,
  FeelTemplatingEntry
} from "@bpmn-io/properties-panel";
import { html } from "diagram-js/lib/ui";

export class PlotterPropertiesProvider {
  constructor(propertiesPanel) {
    propertiesPanel.registerProvider(this, 500);
  }

  //#region Function
  getGroups(field, editField) {
    return (groups) => {
      if (field.type !== "plotter") {
        return groups;
      }

      const layoutGroup = groups.find((item) => item.id === "layout");
      if (layoutGroup) {
        layoutGroup.entries = [
          ...layoutGroup.entries,
          ...PlotterEntries(field, editField),
        ];
      }

      return groups;
    };
  }
  //#endregion
}

PlotterPropertiesProvider.$inject = ["propertiesPanel"];

// #region Function
function PlotterEntries(field, editField) {
  const onChange = (key) => {
    return (value) => {
      const plotter = get(field, ["plotter"], {});

      editField(field, ["plotter"], set(plotter, [key], value));
    };
  };

  const getValue = (key) => {
    return () => {
      return get(field, ["plotter", key]);
    };
  };

  return [
    // {
    //   id: "plotter-height",
    //   component: Height,
    //   getValue,
    //   field,
    //   isEdited: isNumberFieldEntryEdited,
    //   onChange,
    // },
    {
      id: "plotter-add-model",
      component: AddModel,
      getValue,
      field,
      onChange
    }
  ];
}

function Height(props) {
  const { field, getValue, id, onChange } = props;

  const debounce = (fn) => fn;

  return html`<${NumberFieldEntry}
    id=${id}
    element=${field}
    getValue=${getValue("height")}
    min=${600}
    label="Height"
    setValue=${onChange("height")}
    value=${600}
    debounce=${debounce}
  />`;
}

function AddModel(props) {
  const { field, id, getValue, onChange, show } = props;

  const debounce = (fn) => fn;

  return html`<${FeelTemplatingEntry}
    element=${field}
    id=${id}
    label="Add model"
    debounce=${debounce}
    getValue=${getValue("model")}
    setValue=${onChange("model")}
  />`;
}

function findGroupIdx(groups, id) {
  return groups.findIndex((g) => g.id === id);
}
// #endregion

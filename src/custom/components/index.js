import { RangeRenderer, rangeType } from "./range";
import { PlotterRenderer, plotterType } from "./plotter";

class RangeField {
  constructor(formFields) {
    formFields.register(rangeType, RangeRenderer);
  }
}

class PlotterField {
  constructor(formFields) {
    formFields.register(plotterType, PlotterRenderer);
  }
}

export const RenderExtension = {
  __init__: ["rangeField", "plotterField"],
  rangeField: ["type", RangeField],
  plotterField: ["type", PlotterField],
};

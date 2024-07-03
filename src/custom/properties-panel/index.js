import { RangePropertiesProvider } from "./range";
import { PlotterPropertiesProvider } from "./plotter";
import { DictionaryAttributesPropertiesProvider } from "./dictionary-attributes";

export const PropertiesPanelExtension = {
  __init__: [
    "rangePropertiesProvider",
    "dictionaryAttributesPropertiesProvider",
    "plotterPropertiesProvider",
  ],
  rangePropertiesProvider: ["type", RangePropertiesProvider],
  dictionaryAttributesPropertiesProvider: [
    "type",
    DictionaryAttributesPropertiesProvider,
  ],
  plotterPropertiesProvider: ["type", PlotterPropertiesProvider],
};

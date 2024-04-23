import { RangePropertiesProvider } from './range';
import { DictionaryAttributesPropertiesProvider } from './dictionary-attributes';

export const PropertiesPanelExtension = {
    __init__: ['rangePropertiesProvider', 'dictionaryAttributesPropertiesProvider'],
    rangePropertiesProvider: ['type', RangePropertiesProvider],
    dictionaryAttributesPropertiesProvider: ['type', DictionaryAttributesPropertiesProvider]
};
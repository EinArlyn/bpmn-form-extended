import {get, set } from 'min-dash';
import { TextFieldEntry, SelectEntry } from '@bpmn-io/properties-panel';
import { html } from 'diagram-js/lib/ui';

export class DictionaryAttributesPropertiesProvider {
    constructor(propertiesPanel) {
        propertiesPanel.registerProvider(this, 500);
    }

    //#region Function
    /**
     * Return the groups provided for the given field.
     *
     * @param {any} field
     * @param {function} editField
     *
     * @return {(Object[]) => (Object[])} groups middleware
     */
    getGroups(field, editField) {
        /**
         * We return a middleware that modifies
         * the existing groups.
         *
         * @param {Object[]} groups
         *
         * @return {Object[]} modified groups
         */
        return (groups) => {

            if (field.type === 'range') {
                return groups;
            }
            //console.log('field customSettingsDictionary', field)

            if (field.customSettingsDictionary !== undefined) {
                const type = get(field, ['type']);
                const generalIdx = findGroupIdx(groups, 'general');
                const typeCompute = {
                    'string': ['textfield', 'textarea'],
                    'number': ['number'],
                    'boolean': ['checkbox'],
                    'Date': ['datetime'],
                }
                const indexVal = get(field, ['customDictionaryFields']).findIndex(element => {
                    // check type in dictionary-attributes and type in forms
                    if (type === 'select' && element.ref !== undefined) {
                        return true;
                    } else {
                        const isValid = typeCompute[element.type].includes(type) && element.ref === undefined;
                        return isValid;
                    }
                });
                if (indexVal !== -1) {
                    /* insert dictionary-attributes group after general */
                    groups.splice(generalIdx + 1, 0, {
                        id: 'datafield',
                        label: 'Data Field',
                        entries: DictionaryAttributesEntries(field, editField)
                    });
                }

                return groups;
            } else {
                return groups;
            }

        };
    }
}

DictionaryAttributesPropertiesProvider.$inject = ['propertiesPanel'];

function DictionaryAttributesEntries(field, editField) {
    let refDictionary = '';
    let refDictionaryField = '';
    let typeDictionaryField = '';

    const getValue = (key) => {
        return () => {
            const labels = get(field, ['label']);
            const indexVal = get(field, [key]).findIndex(element => element.value === labels);
            if (indexVal !== -1) {
                if (get(field, ['refDictionary']) !== undefined) refDictionary = get(field, ['refDictionary']);
                if (get(field, ['refDictionaryField']) !== undefined) refDictionaryField = get(field, ['refDictionaryField']);
                if (get(field, ['typeDictionaryField']) !== undefined) typeDictionaryField = get(field, ['typeDictionaryField']);
                return labels;
            };
        };
    };

    const getOptions = (key) => {
        const types = get(field, ['type']);
        let arrElement = [];
        const typeCompute = {
            'string': ['textfield', 'textarea'],
            'number': ['number'],
            'boolean': ['checkbox'],
            'Date': ['datetime'],
        }
        get(field, ['customDictionaryFields']).map(element => {
            if (types === 'select' && element.ref !== undefined) {
                arrElement.push({ value: element.name, label: element.name });
            } else {
                const isValid = typeCompute[element.type].includes(types) && element.ref === undefined;
                if (isValid) arrElement.push({ value: element.name, label: element.name });
            }
        });
        return () => {
            return arrElement
        };
    };

    const setValue = (key) => {
        return (value) => {
            editField(field, set(field, [key], value));
            const labels = get(field, ['label']);
            const types = get(field, ['type']);
            const indexVal = get(field, ['customDictionaryFields']).findIndex(element => element.label === labels);
            if (indexVal !== -1) {
                const indexRefDictionary = get(field, ['customDictionaryFields']).findIndex(element => element.ref !== undefined && element.name === labels && types === 'select');
                if (indexRefDictionary === -1) {
                    refDictionary = '';
                    refDictionaryField = '';
                    editField(field, set(field, ['refDictionary'], refDictionary)); // Editing a field with the addition of {refDictionary, refDictionaryField} parameter
                    editField(field, set(field, ['refDictionaryField'], refDictionaryField));
                } else {
                    get(field, ['customDictionaryFields']).map(el => {
                        if (el.ref !== undefined && el.ref !== undefined && el.name === labels) {
                            refDictionary = el.ref;
                            refDictionaryField = el.field;
                            editField(field, set(field, ['refDictionary'], refDictionary));
                            editField(field, set(field, ['refDictionaryField'], refDictionaryField));
                        }
                    });
                }
                get(field, ['customDictionaryFields']).map(elem => {
                    if (elem.name === labels) {
                        typeDictionaryField = elem.type;
                        editField(field, set(field, ['typeDictionaryField'], typeDictionaryField));
                    };
                });
            }
        }
    };

    const getValueTypeDictionary = (key) => {
        return () => {
            return typeDictionaryField;
        }
    }

    const getValueDictRef = (key) => {
        return () => {
            return refDictionary;
        }
    }

    const getValueDictRefField = (key) => {
        return () => {
            return refDictionaryField;
        }
    }

    const getDictionaryOutputTable = () => {
        const types = get(field, ['type']);
        if (types === 'select') {
            return [{
                id: 'select-dictionary-field',
                component: selectDictionaryFieldComponent,
                field,
                label: 'Dictionary fields',
                getOptions,
                getValue,
                setValue,
            }, {
                id: 'textfield-dictionary-type',
                component: dictionaryFieldType,
                field,
                label: 'Field dictionary type',
                getValueTypeDictionary,
                disabled: 'true',
            }, {
                id: 'textfield-dictionary-ref',
                component: dictionaryRef,
                field,
                label: 'Name Dictionary ref',
                getValueDictRef,
                disabled: 'true',
            }, {
                id: 'textfield-dictionary-ref-field',
                component: dictionaryRefField,
                field,
                label: 'Field Dictionary ref',
                getValueDictRefField,
                disabled: 'true',
            }]
        } else {
            return [{
                id: 'select-dictionary-field',
                component: selectDictionaryFieldComponent,
                field,
                label: 'Dictionary fields',
                getOptions,
                getValue,
                setValue,
            }, {
                id: 'textfield-dictionary-type',
                component: dictionaryFieldType,
                field,
                label: 'Field dictionary type',
                getValueTypeDictionary,
                disabled: 'true',
            }]
        }

    }

    return getDictionaryOutputTable();
}

function selectDictionaryFieldComponent(props) {
    const {
        id,
        field,
        label,
        element,
        getOptions,
        getValue,
        setValue,
    } = props;

    return html `<${SelectEntry}
    id=${id}
    element=${field}
    label=${label}
    value='name'
    getOptions=${getOptions('customDictionarySelect')}
    getValue=${getValue('customDictionarySelect')}
    setValue=${setValue('label')}
    />`;
    // return html `<label for="bio-properties-panel-columns" class="bio-properties-panel-label">Dictionary fields</label><select id="bio-properties-panel-columns" name="columns" class="bio-properties-panel-input"><option value="">name</option><option value="2">TestExit1</option></select>`
}

function dictionaryFieldType(props) {
    const {
        id,
        label,
        field,
        disabled,
        element,
        getValueTypeDictionary,
    } = props;

    const debounce = (fn) => fn;

    return html `<${TextFieldEntry}
    id=${id}
    label=${label}
    element=${ field }
    getValue=${getValueTypeDictionary('type')}
    disabled=${disabled}
    debounce=${ debounce }
    />`;
}

function dictionaryRef(props) {
    const {
        id,
        label,
        field,
        disabled,
        element,
        getValueDictRef,
    } = props;

    const debounce = (fn) => fn;

    return html `<${TextFieldEntry}
    id=${id}
    label=${label}
    element=${ field }
    getValue=${getValueDictRef('ref')}
    disabled=${disabled}
    debounce=${ debounce }
    />`;
}

function dictionaryRefField(props) {
    const {
        id,
        label,
        field,
        disabled,
        element,
        getValueDictRefField,
    } = props;

    const debounce = (fn) => fn;

    return html `<${TextFieldEntry}
    id=${id}
    label=${label}
    element=${ field }
    getValue=${getValueDictRefField('field')}
    disabled=${disabled}
    debounce=${ debounce }
    />`;
}

export const propertiesPanelExtension = {
    __init__: ['dictionaryAttributesPropertiesProvider'],
    dictionaryAttributesPropertiesProvider: ['type', DictionaryAttributesPropertiesProvider]
};

function findGroupIdx(groups, id) {
    return groups.findIndex(g => g.id === id);
}
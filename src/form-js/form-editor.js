import { FormEditor as FE } from '@bpmn-io/form-js-editor';
import { RenderExtension, PropertiesPanelExtension } from '../custom';

class FormEditor {
    constructor(options) {
        options.additionalModules = [...(options.additionalModules || []), RenderExtension, PropertiesPanelExtension];
        this.customFormEditor = new FE(options);
    }

    importSchema(schema) {
        return this.customFormEditor.importSchema(schema);
    }

    saveSchema() {
        return this.customFormEditor.saveSchema();
    }

    on(event, callback) {
        this.customFormEditor.on(event, callback);
    }
}

export default FormEditor;
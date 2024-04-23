import { RenderExtension, PropertiesPanelExtension } from '../custom';

class BaseForm {
    constructor(FormClass, options, isAdditionalModules = true) {
        if (isAdditionalModules) {
            options.additionalModules = [...(options.additionalModules || []), RenderExtension, PropertiesPanelExtension];
        }
        this.customForm = new FormClass(options);
    }

    importSchema(schema, data) {
        return this.customForm.importSchema(schema, data);
    }

    saveSchema() {
        // saveSchema может отсутствовать в Form, поэтому проверим его наличие
        return this.customForm.saveSchema ? this.customForm.saveSchema() : null;
    }

    on(event, ...args) {
        // Унифицируем метод on для обработки возможной перегрузки
        if (typeof args[0] === 'function') {
            this.customForm.on(event, args[0]); // Только колбэк
        } else {
            this.customForm.on(event, args[0], args[1]); // Приоритет и колбэк
        }
    }
}

export default BaseForm;

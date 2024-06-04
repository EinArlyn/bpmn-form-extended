import { RenderExtension, PropertiesPanelExtension } from "../custom";

class BaseForm {
  constructor(FormClass, options, isAdditionalModules = true) {
    console.log("Initializing BaseForm with options:", options);
    if (isAdditionalModules) {
      options.additionalModules = [
        ...(options.additionalModules || []),
        RenderExtension,
        PropertiesPanelExtension,
      ];
    }
    this.customForm = new FormClass(options);
  }

  importSchema(schema, data) {
    console.log("Importing schema with data:", data);
    return this.customForm.importSchema(schema, data);
  }

  saveSchema() {
    console.info("Saving schema...");
    // saveSchema может отсутствовать в Form, поэтому проверим его наличие
    const result = this.customForm.saveSchema
      ? this.customForm.saveSchema()
      : null;
    console.info("Schema saved:", result);
    return result;
  }

  on(event, ...args) {
    console.log(`Registering event: ${event}`);
    // Унифицируем метод on для обработки возможной перегрузки
    if (typeof args[0] === "function") {
      this.customForm.on(event, args[0]); // Только колбэк
    } else {
      this.customForm.on(event, args[0], args[1]); // Приоритет и колбэк
    }
  }
}

export default BaseForm;

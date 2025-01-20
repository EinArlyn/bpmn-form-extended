import { RenderExtension, PropertiesPanelExtension } from "../custom";

class BaseForm {
  constructor(FormClass, options, type, isAdditionalModules = true) {
    if (isAdditionalModules) {
      options.additionalModules = [
        ...(options.additionalModules || []),
        RenderExtension,
      ];
      if (type !== "Form") {
        options.additionalModules.push(PropertiesPanelExtension);
      }
    }
    this.customForm = new FormClass(options);
  }

  importSchema(schema, data) {
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
    // Унифицируем метод on для обработки возможной перегрузки
    if (typeof args[0] === "function") {
      this.customForm.on(event, args[0]); // Только колбэк
    } else {
      this.customForm.on(event, args[0], args[1]); // Приоритет и колбэк
    }
  }
}

export default BaseForm;

import { FormEditor as FE } from "@bpmn-io/form-js";
import BaseForm from "./base-form";

export class FormEditor extends BaseForm {
  constructor(options, isAdditionalModules = true) {
    super(FE, options, "FormEditor", isAdditionalModules);
  }
}

export default FormEditor;

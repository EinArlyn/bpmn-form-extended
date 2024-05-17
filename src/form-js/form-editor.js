import { FormEditor as FE } from "@bpmn-io/form-js";
import BaseForm from "./base-form";

export class FormEditor extends BaseForm {
  constructor(options, isAdditionalModules = true) {
    console.log("Initializing FormEditor with options:", options);
    super(FE, options, isAdditionalModules);
  }
}

export default FormEditor;

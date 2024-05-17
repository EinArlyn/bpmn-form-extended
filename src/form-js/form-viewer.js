import { Form as F } from "@bpmn-io/form-js";
import BaseForm from "./base-form";

export class Form extends BaseForm {
  constructor(options, isAdditionalModules = true) {
    console.log("Initializing FormViewer with options:", options);
    super(F, options, isAdditionalModules);
  }
}

export default Form;

import { Form as F } from "@bpmn-io/form-js";
import BaseForm from "./base-form";

export class Form extends BaseForm {
  constructor(options, isAdditionalModules = true) {
    super(F, options, "Form", isAdditionalModules);
  }
}

export default Form;

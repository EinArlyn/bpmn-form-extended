import { Form as F } from '@bpmn-io/form-js-viewer';
import BaseForm from './base-form';

export class Form extends BaseForm {
    constructor(options, isAdditionalModules = true) {
        super(F, options, isAdditionalModules);
    }
}

export default Form;
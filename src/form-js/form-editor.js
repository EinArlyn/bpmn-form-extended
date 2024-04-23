import { FormEditor as FE } from '@bpmn-io/form-js-editor';
import BaseForm from './base-form';

export class FormEditor extends BaseForm {
    constructor(options, isAdditionalModules = true) {
        super(FE, options, isAdditionalModules);
    }
}

export default FormEditor;
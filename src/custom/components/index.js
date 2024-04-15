import { RangeRenderer, rangeType } from './range';

class RangeField {
    constructor(formFields) {
        formFields.register(rangeType, RangeRenderer);
    }
}

export const RenderExtension = {
    __init__: [ 'rangeField' ],
    rangeField: [ 'type', RangeField ]
};
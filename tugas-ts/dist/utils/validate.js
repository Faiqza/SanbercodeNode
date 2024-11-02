"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
function validate(data, schema) {
    for (let key in schema) {
        if (typeof data[key] !== schema[key]) {
            return false;
        }
    }
    return true;
}
exports.validate = validate;

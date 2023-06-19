"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotNullException = void 0;
const common_1 = require("@nestjs/common");
class NotNullException extends common_1.HttpException {
    constructor(message) {
        super(message, 705);
    }
}
exports.NotNullException = NotNullException;
//# sourceMappingURL=notnull.exception.js.map
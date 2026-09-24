"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParkhausBaselError = void 0;
class ParkhausBaselError extends Error {
    isParkhausBaselError = true;
    sdk = 'ParkhausBasel';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.ParkhausBaselError = ParkhausBaselError;
//# sourceMappingURL=ParkhausBaselError.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var memesSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    creater: {
        type: String,
        required: true
    }
});
exports.default = mongoose_1.model("Memes", memesSchema);
//# sourceMappingURL=memes.js.map
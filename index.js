"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var memesRouter_1 = __importDefault(require("./routes/memesRouter"));
var mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect("mongodb://localhost/memes", { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose_1.default.connection;
db.on("open", function () {
    console.log("connected to database");
});
db.on("error", function (error) {
    console.error("error connecting to database: " + error);
});
var app = express_1.default();
app.use(express_1.default.json());
app.use("/images", express_1.default.static("images"));
app.use(cors_1.default());
app.use("/memes", memesRouter_1.default);
app.listen(5000, function () {
    console.log("listing on port 5000");
});
//# sourceMappingURL=index.js.map
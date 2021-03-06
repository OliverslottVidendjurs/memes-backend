"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var memes_1 = __importDefault(require("../models/memes"));
var multer_1 = __importStar(require("multer"));
var v1_1 = __importDefault(require("uuid/v1"));
var storage = multer_1.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, "images");
    },
    filename: function (_req, _file, cb) {
        cb(null, v1_1.default() + ".jpg");
    }
});
var upload = multer_1.default({
    storage: storage,
    fileFilter: function (_req, file, cb) {
        if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
            cb(null, true);
        }
        else {
            cb(null, false);
        }
    }
});
var router = express_1.default.Router();
var getMeme = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var meme, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, memes_1.default.findById(req.params.id)];
            case 1:
                meme = _a.sent();
                if (!meme) {
                    return [2 /*return*/, res.status(404).send({ message: "Could not find meme" })];
                }
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(500).send({ message: error_1 })];
            case 3:
                res.meme = meme;
                next();
                return [2 /*return*/];
        }
    });
}); };
router.get("/", function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _b = (_a = res).send;
                return [4 /*yield*/, memes_1.default.find()];
            case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
        }
    });
}); });
router.get("/:id", getMeme, function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, res.send(res.meme)];
    });
}); });
router.post("/", upload.single("image"), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newMeme;
    return __generator(this, function (_a) {
        newMeme = new memes_1.default({
            name: req.body.name,
            creater: req.body.creater,
            img: {
                fileName: req.file.filename,
                description: req.body.description
            }
        });
        newMeme.save(function (err) {
            if (err) {
                return res.status(400).send({ message: err });
            }
            return res.status(201).json(newMeme);
        });
        return [2 /*return*/];
    });
}); });
router.patch("/:id", getMeme, upload.single("image"), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var updatedMeme, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (req.body.name)
                    res.meme.name = req.body.name;
                if (req.body.creater)
                    res.meme.creater = req.body.creater;
                if (req.body.description)
                    res.meme.img.description = req.body.description;
                if (req.file)
                    res.meme.img.fileName = req.file.filename;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, res.meme.save()];
            case 2:
                updatedMeme = _a.sent();
                return [2 /*return*/, res.send(updatedMeme)];
            case 3:
                error_2 = _a.sent();
                console.error(error_2);
                return [2 /*return*/, res.status(400).send({ message: error_2 })];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.delete("/:id", getMeme, function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            res.meme.remove();
            return [2 /*return*/, res.send({ message: "Meme deleted" })];
        }
        catch (error) {
            console.error(error);
            return [2 /*return*/, res.status(500).send({ message: error })];
        }
        return [2 /*return*/];
    });
}); });
exports.default = router;
//# sourceMappingURL=memesRouter.js.map
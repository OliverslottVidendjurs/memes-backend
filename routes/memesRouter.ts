import express, { Request, Response } from "express";
import Memes, { IMemes } from "../models/memes";
import multer, { diskStorage } from "multer";
import uuidv1 from "uuid/v1";

const storage = diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, "images");
    },
    filename: (_req, _file, cb) => {
        cb(null, uuidv1() + ".jpg");
    }
});

const upload = multer({
    storage,
    fileFilter: (_req, file, cb) => {
        if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
});

const router = express.Router();

interface ResponseWithMeme extends Response {
    meme?: IMemes
}

const getMeme = async (req: Request, res: ResponseWithMeme, next: () => void) => {
    let meme: IMemes | null;
    try {
        meme = await Memes.findById(req.params.id);
        if (!meme) {
            return res.status(404).send({ message: "Could not find meme" });
        }
    } catch (error) {
        return res.status(500).send({ message: error });
    }
    res.meme = meme;
    next();
}

router.get("/", async (_req, res) => {
    return res.send(await Memes.find());
});

router.get("/:id", getMeme, async (_req, res: ResponseWithMeme) => {
    return res.send(res.meme);
});

router.post("/", upload.single("image"), async (req, res) => {
    const newMeme = new Memes({
        name: req.body.name,
        creater: req.body.creater,
        img: {
            fileName: req.file.filename,
            description: req.body.description
        }
    });
    newMeme.save((err) => {
        if (err) {
            return res.status(400).send({ message: err });
        }
        return res.status(201).json(newMeme);
    });
});

router.patch("/:id", getMeme, upload.single("image"), async (req, res: ResponseWithMeme) => {
    if (req.body.name)
        res.meme!.name = req.body.name;

    if (req.body.creater)
        res.meme!.creater = req.body.creater;

    if (req.body.description)
        res.meme!.img.description = req.body.description;

    if (req.file)
        res.meme!.img.fileName = req.file.filename;

    try {
        const updatedMeme = await res.meme!.save();
        return res.send(updatedMeme);
    } catch (error) {
        console.error(error);
        return res.status(400).send({ message: error });
    }
});

router.delete("/:id", getMeme, async (_req, res: ResponseWithMeme) => {
    try {
        res.meme!.remove();
        return res.send({ message: "Meme deleted" });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error });
    }
});

export default router;
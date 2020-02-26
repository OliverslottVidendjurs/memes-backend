import { Schema, model, Document } from "mongoose";
import fs from "fs";

export interface IImage extends Document, IPreviousProps {
    fileName: string,
    description: string
}

export interface IMemes extends Document {
    name: string,
    creater: string,
    img: IImage
}

interface IPreviousProps {
    _fileName: string,
}

const imgSchema = new Schema({
    fileName: {
        type: String,
        required: true,
        set: function (this: IImage, fileName: string) {
            this._fileName = this.fileName;
            return fileName;
        }
    },
    description: {
        type: String
    }
});

const memesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    creater: {
        type: String,
        required: true
    },
    img: imgSchema
}, { timestamps: true });

memesSchema.pre<IMemes>("remove", async function () {
    fs.unlink("./images/" + this.img.fileName, () => { });
});

memesSchema.pre<IMemes>("save", async function () {
    if(this.img.isModified("fileName")){
        if(this.img._fileName){
            fs.unlink("./images/" + this.img._fileName, () => { });
        }
    }
});

export default model<IMemes>("Memes", memesSchema);
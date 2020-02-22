import mongoose, {Schema, model, Document} from "mongoose";

export interface IMemes extends Document{
    name: string,
    creater: string
}

const memesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    creater: {
        type: String,
        required: true
    }
});

export default model<IMemes>("Memes", memesSchema);
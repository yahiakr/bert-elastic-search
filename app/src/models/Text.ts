import mongoose, { Schema, Document } from 'mongoose';
const mongoosastic = require('mongoosastic');

export interface IText extends Document{
    title: {
        fr: string;
    };
    cleanContent: {
        fr: string;
    };
    vector: Array<number>;
}

const TextSchema: Schema = new Schema({
    title: {
        fr: { type: String }
    },
    cleanContent: {
        fr: { type: String },
    },
    vector: { type: [{ type: Number }], required: true },
});

TextSchema.plugin(mongoosastic);

// Export the model and return your IText interface
export const Texts = mongoose.model<IText>('Text', TextSchema);
import mongoose, { Schema, Document } from 'mongoose';
const mongoosastic = require('mongoosastic');

export interface IText extends Document{
    title: string;
    vector: Array<number>;
}

const TextSchema: Schema = new Schema({
    title: { type: String, required: true, es_type: "text" },
    vector: { type: [{ type: Number }], required: true, es_type: "dense_vector" },
});

TextSchema.plugin(mongoosastic);

// Export the model and return your IText interface
export const Texts = mongoose.model<IText>('Text', TextSchema);
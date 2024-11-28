import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    title: { type: String, required: true },
    body: { type: String, required: true }
})

const chatModel = mongoose.models.chat || mongoose.model('chat', Schema);

export default chatModel;

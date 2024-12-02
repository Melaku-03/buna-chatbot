import chatModel from "../models/chatModel.js";
import asyncHandler from "express-async-handler";
import Joi from "joi";


// get chat with ID
export const getChat = asyncHandler(async (req, res) => {
    const Schema = Joi.object({
        userId: Joi.string().length(24).required(),
        id: Joi.string().length(24).required()
    })


    const { error, value } = Schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const chat = await chatModel.findOne({ $and: [{ userId: value.userId }, { _id: value.id }] }).lean().exec();

    if (!chat) return res.status(404).json({ message: 'No chat' });

    res.json({ message: chat });
});

// get all user's chats
export const getChats = asyncHandler(async (req, res) => {
    const userId = Joi.string().length(24);
    const { error, value } = userId.validate(req.body.userId);

    if (error) return res.status(400).json({ message: error.message });

    const chats = await chatModel.find({ userId: value }).lean().exec();

    res.json({ length: chats.length, message: chats })
});

// create new-chat
export const newChat = asyncHandler(async (req, res) => {
    const Schema = Joi.object({
        userId: Joi.string().length(24).required(),
        title: Joi.string().trim().lowercase().required(),
        body: Joi.string().required()
    });

    const { error, value } = Schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const chats = await chatModel.find({ userId: value.userId }).lean().exec();

    for (let chat of chats) {
        if (chat && chat.title === value.title) return res.status(409).json({ message: 'chat already exists' });
    }

    const result = await chatModel.create(value);
    await result.save();

    res.json({ message: result._id });
});

// update chat with ID
export const updateChat = asyncHandler(async (req, res) => {
    const Schema = Joi.object({
        userId: Joi.string().length(24).required(),
        id: Joi.string().length(24).required(),
        body: Joi.string().required()
    });

    const { error, value } = Schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const chat = await chatModel.findOne({ $and: [{ userId: value.userId }, { _id: value.id }] }).lean().exec();
    if (!chat) return res.status(404).json({ message: 'No chat' });

    const result = await chatModel.updateOne({ $and: [{ userId: value.userId }, { _id: value.id }] }, { body: `${chat.body} * ${value.body}` })
    res.json({ message: `Chat updated` });
});

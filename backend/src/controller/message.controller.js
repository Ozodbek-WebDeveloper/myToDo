const Message = require("../models/message.model");

class messageController {
    // 1. eski xabarlarni olish
    getMessages = async (req, res) => {
        try {
            const userId = req.user.id;
            const receiverId = req.params.userId;

            const messages = await Message.find({
                $or: [
                    { senderId: userId, receiverId },
                    { senderId: receiverId, receiverId: userId }
                ]
            }).sort({ createdAt: 1 });

            res.status(200).json(messages);
        } catch (err) {
            res.status(500).json({ message: "Xabarlarni olishda xatolik", error: err });
        }
    };

    // 2. yangi xabar yuborish (socket orqali emas, API orqali)
    sendMessage = async (req, res) => {
        try {
            const newMessage = new Message({
                senderId: req.user.id,
                receiverId: req.body.receiverId,
                text: req.body.text
            });

            await newMessage.save();
            res.status(201).json(newMessage);
        } catch (err) {
            res.status(500).json({ message: "Xabar yuborishda xatolik", error: err });
        }
    };

}

module.exports = new messageController()
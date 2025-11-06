// src/router/message.route.js

const express = require('express');
const router = express.Router();
const Message = require('../models/message.model'); // Message modelni import qilamiz
// const authMiddleware = require('../middleware/auth.Middleware'); // Agar middleware kerak bo'lsa

// Chat tarixini olish
router.get('/history/:receiverId', async (req, res) => {
    // 💡 Eslatma: Haqiqiy ilovada 'userId'ni auth tokenidan olish kerak!
    const senderId = req.user.id; // Agar authMiddleware ishlatilsa va foydalanuvchi IDsi req.user.id da bo'lsa
    const receiverId = req.params.receiverId;

    try {
        // 1. Ikkala tomon orasidagi xabarlarni topish shartini yaratamiz
        const messages = await Message.find({
            $or: [
                // 1-shart: Jonatuvchi = biz, Qabul qiluvchi = sherik
                { senderId: senderId, receiverId: receiverId },
                // 2-shart: Jonatuvchi = sherik, Qabul qiluvchi = biz
                { senderId: receiverId, receiverId: senderId }
            ]
        })
        .sort({ createdAt: 1 }) // Eng eski xabar tepada bo'lishi uchun tartiblaymiz
        .limit(50); // Oxirgi 50 ta xabarni olish (optimallashtirish uchun)

        res.status(200).json(messages);

    } catch (error) {
        console.error("Chat tarixini olishda xato:", error);
        res.status(500).json({ message: "Server xatosi" });
    }
});

module.exports = router;
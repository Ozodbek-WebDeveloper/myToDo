// src/socket/socketHandler.js (Yangi fayl)

const Message = require("../models/message.model"); // Message Modelni import qiling

// Bu funksiya asosiy server faylidan "io" obyekti (Socket.IO serveri) ni qabul qiladi
const initializeSocketIO = (io) => {

    io.on("connection", (socket) => {
        console.log("Socket.IO: Yangi foydalanuvchi ulandi:", socket.id);

        // ----------------- Xabar Yuborish Logikasi -----------------
        socket.on("sendMessage", async (msg) => {
            console.log("Socket.IO: Clientdan xabar keldi:", msg);

            try {
                const newMessage = new Message({
                    senderId: msg.senderId,      // 💡 msg.senderId dan olish
                    receiverId: msg.receiverId,  // 💡 msg.receiverId dan olish
                    text: msg.text               // 💡 msg.text dan olish
                });

                const savedMessage = await newMessage.save();
                io.emit("message", savedMessage);
                console.log("Socket.IO: Xabar saqlandi va tarqatildi:", savedMessage._id);

            } catch (error) {
                console.error("Socket.IO Xatosi: Xabarni saqlash/yuborish:", error.message);
                // ...
            }
        });

        // ----------------- Uzilish Logikasi -----------------
        socket.on("disconnect", () => {
            console.log("Socket.IO: Foydalanuvchi uzildi:", socket.id);
        });

        // ----------------- Boshqa Chat Logikalari (qo'shimcha) -----------------
        // socket.on("typing", (user) => { ... });
        // socket.on("joinRoom", (room) => { ... });
    });
};

module.exports = initializeSocketIO;
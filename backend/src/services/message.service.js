
const Message = require("../models/message.model");

class messageService {
	initializeSocketIO = (io) => {
		io.on("connection", (socket) => {
			console.log("Socket.IO: Yangi foydalanuvchi ulandi:", socket.id);

			socket.on("sendMessage", async (msg) => {
				console.log("Socket.IO: Clientdan xabar keldi:", msg);

				try {
					const newMessage = new Message({
						senderId: msg.senderId,
						text: msg.text
					});

					const savedMessage = await newMessage.save();
					io.emit("message", savedMessage);
					console.log("Socket.IO: Xabar saqlandi va tarqatildi:", savedMessage._id);

				} catch (error) {
					console.error("Socket.IO Xatosi: Xabarni saqlash/yuborish:", error.message);
					// ...
				}
			});

			socket.on("disconnect", () => {
				console.log("Socket.IO: Foydalanuvchi uzildi:", socket.id);
			});

			// socket.on("typing", (user) => { ... });
			// socket.on("joinRoom", (room) => { ... });
		});
	};

	async getHistory() {
		const res = await Message.find()
		return res
	}
}
module.exports = new messageService();
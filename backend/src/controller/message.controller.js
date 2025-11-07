const messageService = require("../services/message.service")
class messageController {
	async getMessages(req, res) {
		try {
			const data = await messageService.getHistory()
			return res.status(200).json(data)
		} catch (error) {
			console.log(error);
			return res.status(500).json(error)
		}
	};

}

module.exports = new messageController()
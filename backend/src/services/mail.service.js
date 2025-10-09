const nodeMailer = require("nodemailer");

class mailService {
  constructor() {
    this.transport = nodeMailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendMail(email, activationsLink) {
    await this.transport.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: `Activation account link`,
      html: `
        <a href="${activationsLink}" >Click to activate account</>
        `,
    });
  }
}

module.exports = new mailService();

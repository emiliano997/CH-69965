import { mailService } from "../services/mail.service.js";
import { smsService } from "../services/sms.service.js";

// DB
const users = [];

export class UserController {
  static async getAll(req, res) {
    return res.json(users);
  }

  static async create(req, res) {
    const { name, email, phone } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const user = { name, email, phone };

    users.push(user);

    await mailService.sendMail({
      to: email,
      subject: "New user registered",
      // html: `<h1>New user registered</h1><p>Name: ${name}</p><p>Email: ${email}</p><p>Phone: ${phone}</p>`,
      type: "welcome",
    });

    await smsService.sendMessage(
      phone,
      "Bienvenido a nuestro servicio de mensajes masivos"
    );

    return res.status(201).json(user);
  }

  static async activate(req, res) {
    const { code } = req.params;

    if (code !== "codigoSecreto") {
      return res.status(400).json({ error: "Invalid code" });
    }

    // Buscan al usuario
    if (users[0].activate) {
      return res.status(400).json({ error: "User already activated" });
    }

    // Lo activan si existe
    users[0].activate = true;

    return res.status(200).json(users[0]);
  }
}

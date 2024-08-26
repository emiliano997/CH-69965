import twilio from "twilio";
import { config } from "../config/config.js";

class SmsService {
  constructor() {
    this.client = twilio(config.sms.sid, config.sms.authToken);
  }

  async sendMessage(to, message) {
    try {
      const info = await this.client.messages.create({
        body: message,
        from: config.sms.smsNumber,
        to,
      });

      console.log(info);
    } catch (error) {
      console.log(error);
    }
  }
}

export const smsService = new SmsService();

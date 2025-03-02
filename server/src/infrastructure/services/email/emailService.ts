import { injectable } from "tsyringe";
import { IEmailService } from "./IEmailService.interface";
import nodemailer from 'nodemailer'

@injectable()
export class EmailService implements IEmailService {
    private transporter;

    constructor() {
        this.transporter =nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })
    }
   async sendEmail(to: string, subject: string, text: string, html?: string): Promise<void> {
       const mailOptions = {
        from: "The Trek Tribe",
        to,
        subject,
        text,
        html
       }
       await this.transporter.sendMail(mailOptions);
    }

}
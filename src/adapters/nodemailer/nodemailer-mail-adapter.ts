import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "c96eb3ffd9b847",
        pass: "bd7fd846e2d9cf"
    }
});

export class NodemailerMailAdapter implements MailAdapter{
    async sendMail({body,subject}: SendMailData){
    await transport.sendMail({
        from: 'Feedget Team <hello@feedget.com>',
        to: 'Luca Alfaro Rampinelli <site.owner@site.com>',
        subject,
        html: body
    })
    }
}